const ALLOWED_ORIGINS = ['https://b-acoustics.com', 'http://localhost:8123'];

const SYSTEM_PROMPT = `You are the website assistant for B-Acoustics, an acoustic engineering and soundproofing consultancy based in Singapore. You help visitors on b-acoustics.com understand our services and qualify their enquiry before a human takes over.

What we do, organized by category:
- Commercial: room acoustics & reverb control, speech privacy & masking, mechanical noise reduction & isolation. For offices, F&B, retail, hospitality, and worship spaces.
- Residential: party-wall & floor sound isolation, window & facade upgrades, home theatre tuning. For condos, landed homes, and home studios.
- Industrial: boundary noise reduction & compliance (against NEA limits), plant & duct attenuation, vibration & structure-borne noise control. For plants, data centres, and workshops.

Background you can share if asked:
- We assess every project with a site survey and baseline measurement before recommending a target NRC (Noise Reduction Coefficient, for absorption/echo) or STC (Sound Transmission Class, for blocking sound between rooms) rating, rather than quoting a generic figure.
- Our principal acoustic engineer, Thomas Ee, holds an MIOA (Institute of Acoustics) credential.
- Contact: studio@b-acoustics.com, +65 8784 7481.

Strict boundaries — do not cross these:
- Never quote firm pricing. Cost depends on site conditions and target rating, which only a real site survey can determine. If asked about cost, briefly explain what drives it and point them to the enquiry form for a tailored quote.
- Never commit to appointment times, site visit dates, or promise a specific person will respond by a specific time.
- Never invent case studies, project names, client names, or specific measured results — we don't publish those. If asked for examples, describe our general approach instead.
- If a question needs a real person's judgment (scoping, pricing, scheduling, anything you're unsure about), say so plainly and direct them to submit the enquiry form on this page (or email/call the contact above) rather than guessing.

Tone: professional, concise, helpful — matching a boutique engineering consultancy, not a generic sales bot. Keep replies short (a few sentences unless genuinely more detail is needed).`;

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function json(data, status, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
  });
}

function isValidEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

async function handleEnquiry(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400, request);
  }

  // Honeypot: real visitors never see or fill this field. A filled value means a bot —
  // report success without sending an email or consuming rate-limit budget, so the bot
  // gets no signal it was caught.
  if ((body.website || '').trim()) {
    return json({ ok: true }, 200, request);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env, ip, 'enq', 8);
  if (!allowed) {
    return json({ ok: false, error: "You've reached today's enquiry limit — please email studio@b-acoustics.com directly." }, 429, request);
  }

  const name = (body.name || '').trim();
  const company = (body.company || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const type = (body.type || 'Not sure yet').trim();
  const message = (body.message || '').trim();

  if (!name) return json({ ok: false, error: 'Name is required' }, 400, request);
  if (!email || !isValidEmail(email)) return json({ ok: false, error: 'A valid email is required' }, 400, request);
  if (!message) return json({ ok: false, error: 'Please tell us about the space' }, 400, request);

  const text = [
    `New enquiry from b-acoustics.com`,
    ``,
    `Name: ${name}`,
    `Company: ${company || '(none given)'}`,
    `Email: ${email}`,
    `Phone: ${phone || '(none given)'}`,
    `Setting: ${type}`,
    ``,
    `Message:`,
    message,
  ].join('\n');

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'B-Acoustics Website <noreply@b-acoustics.com>',
      to: ['studio@b-acoustics.com'],
      reply_to: email,
      subject: `New enquiry — ${type}`,
      text,
    }),
  });

  if (!resendRes.ok) {
    const detail = await resendRes.text().catch(() => '');
    console.error('Resend error', resendRes.status, detail);
    return json({ ok: false, error: 'Could not send enquiry right now — please email studio@b-acoustics.com directly.' }, 502, request);
  }

  return json({ ok: true }, 200, request);
}

async function checkRateLimit(env, ip, prefix = 'rl', limit = 30) {
  const dateKey = new Date().toISOString().slice(0, 10);
  const key = `${prefix}:${ip}:${dateKey}`;
  const current = parseInt((await env.CHAT_RATE_LIMIT.get(key)) || '0', 10);
  if (current >= limit) return false;
  await env.CHAT_RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 60 * 60 * 26 });
  return true;
}

async function handleChat(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const allowed = await checkRateLimit(env, ip, 'rl', 30);
  if (!allowed) {
    return json({ ok: false, error: "You've reached today's message limit — please email studio@b-acoustics.com or try again tomorrow." }, 429, request);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400, request);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) return json({ ok: false, error: 'No message provided' }, 400, request);
  if (messages.length > 20) return json({ ok: false, error: 'Conversation too long — please start a new chat.' }, 400, request);

  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (!cleaned.length) return json({ ok: false, error: 'No valid message provided' }, 400, request);

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: cleaned,
    }),
  });

  if (!anthropicRes.ok) {
    const detail = await anthropicRes.text().catch(() => '');
    console.error('Anthropic error', anthropicRes.status, detail);
    return json({ ok: false, error: 'The assistant is unavailable right now — please use the enquiry form below.' }, 502, request);
  }

  const data = await anthropicRes.json();
  const reply = (data.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  return json({ ok: true, reply: reply || "Sorry, I didn't catch that — could you rephrase?" }, 200, request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (url.pathname === '/api/enquiry' && request.method === 'POST') {
      return handleEnquiry(request, env);
    }

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleChat(request, env);
    }

    if (url.pathname === '/' && request.method === 'GET') {
      return new Response('B-Acoustics API', { status: 200 });
    }

    return json({ ok: false, error: 'Not found' }, 404, request);
  },
};
