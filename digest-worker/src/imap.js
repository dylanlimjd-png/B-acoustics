// Minimal read-only IMAP client over Cloudflare TCP sockets. Only what the
// digest needs: LOGIN, SELECT, UID SEARCH, UID FETCH BODY.PEEK[] (PEEK so
// nothing gets marked as read in the shared mailbox).
import { connect } from 'cloudflare:sockets';

const CRLF = new Uint8Array([13, 10]);
const enc = new TextEncoder();
const dec = new TextDecoder();

function concat(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function indexOfCrlf(buf, from = 0) {
  for (let i = from; i < buf.length - 1; i++) {
    if (buf[i] === 13 && buf[i + 1] === 10) return i;
  }
  return -1;
}

function quote(s) {
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

export class ImapClient {
  constructor(host, port = 993) {
    this.socket = connect({ hostname: host, port }, { secureTransport: 'on' });
    this.reader = this.socket.readable.getReader();
    this.writer = this.socket.writable.getWriter();
    this.buf = new Uint8Array(0);
    this.tagN = 0;
  }

  async fill() {
    const { value, done } = await this.reader.read();
    if (done) throw new Error('IMAP connection closed unexpectedly');
    this.buf = concat(this.buf, value);
  }

  async readLine() {
    let i;
    while ((i = indexOfCrlf(this.buf)) === -1) await this.fill();
    const line = dec.decode(this.buf.subarray(0, i));
    this.buf = this.buf.slice(i + 2);
    return line;
  }

  async readBytes(n) {
    while (this.buf.length < n) await this.fill();
    const out = this.buf.slice(0, n);
    this.buf = this.buf.slice(n);
    return out;
  }

  // Sends a command and collects untagged lines plus any {N} literals until
  // the tagged completion. Throws on NO/BAD.
  async command(text) {
    const tag = `a${++this.tagN}`;
    await this.writer.write(concat(enc.encode(`${tag} ${text}`), CRLF));
    const lines = [];
    const literals = [];
    for (;;) {
      let line = await this.readLine();
      let m;
      while ((m = line.match(/\{(\d+)\}$/))) {
        literals.push(await this.readBytes(parseInt(m[1], 10)));
        line += '\u0000' + (await this.readLine());
      }
      if (line.startsWith(tag + ' ')) {
        const status = line.slice(tag.length + 1);
        if (!status.startsWith('OK')) {
          // Never echo the LOGIN line (it carries the password).
          const verb = text.split(' ')[0];
          throw new Error(`IMAP ${verb} failed: ${status}`);
        }
        return { lines, literals };
      }
      lines.push(line);
    }
  }

  async open(user, pass) {
    const greeting = await this.readLine();
    if (!greeting.startsWith('* OK')) throw new Error(`Unexpected IMAP greeting: ${greeting}`);
    await this.command(`LOGIN ${quote(user)} ${quote(pass)}`);
  }

  async selectInbox() {
    return this.examine('INBOX');
  }

  async examine(mailbox) {
    const { lines } = await this.command(`EXAMINE ${quote(mailbox)}`);
    const v = lines.map((l) => l.match(/\[UIDVALIDITY (\d+)\]/)).find(Boolean);
    return { uidValidity: v ? v[1] : null };
  }

  // Finds the Sent folder: the \Sent special-use flag if advertised, else by name.
  async findSentMailbox() {
    const { lines } = await this.command('LIST "" "*"');
    const boxes = lines
      .map((l) => l.match(/^\* LIST \(([^)]*)\) (?:"[^"]*"|NIL) (.+)$/))
      .filter(Boolean)
      .map(([, flags, name]) => ({ flags, name: name.replace(/^"(.*)"$/, '$1').replace(/\\(["\\])/g, '$1') }));
    const flagged = boxes.find((b) => /\\Sent\b/i.test(b.flags));
    if (flagged) return flagged.name;
    const named = boxes.find((b) => /^(INBOX[./])?Sent( Items| Messages)?$/i.test(b.name));
    return named ? named.name : null;
  }

  async hasSentTo(address, since) {
    const uids = await this.searchUids(`SINCE ${imapDate(since)} TO ${quote(address)}`);
    return uids.length > 0;
  }

  async searchUids(criteria) {
    const { lines } = await this.command(`UID SEARCH ${criteria}`);
    const uids = [];
    for (const l of lines) {
      if (l.startsWith('* SEARCH')) {
        for (const n of l.slice(8).trim().split(/\s+/)) if (n) uids.push(parseInt(n, 10));
      }
    }
    return uids.sort((a, b) => a - b);
  }

  async fetchRaw(uid) {
    const { literals } = await this.command(`UID FETCH ${uid} (BODY.PEEK[])`);
    if (!literals.length) throw new Error(`IMAP returned no body for UID ${uid}`);
    return literals[0];
  }

  async close() {
    try {
      await this.command('LOGOUT');
    } catch {
      // Server may drop the connection on LOGOUT; nothing to recover.
    }
    try {
      await this.socket.close();
    } catch {}
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function imapDate(d) {
  return `${d.getUTCDate()}-${MONTHS[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
}
