#!/usr/bin/env node
// Catches the class of bug that shipped 2026-07-28: a broken link, a dead
// same-page anchor, or invalid JSON-LD that a manual diff review missed.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlDirs = ['.', 'blog', 'services'];

const htmlFiles = [];
for (const dir of htmlDirs) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full)) {
    if (f.endsWith('.html')) htmlFiles.push(path.join(dir, f));
  }
}

const errors = [];

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

function idsIn(content) {
  const ids = new Set();
  const re = /\sid="([^"]+)"/g;
  let m;
  while ((m = re.exec(content))) ids.add(m[1]);
  return ids;
}

const fileContentCache = new Map();
function readCached(fullPath) {
  if (!fileContentCache.has(fullPath)) {
    fileContentCache.set(fullPath, fs.readFileSync(fullPath, 'utf8'));
  }
  return fileContentCache.get(fullPath);
}

for (const relPath of htmlFiles) {
  const fullPath = path.join(root, relPath);
  const content = readCached(fullPath);
  const ownIds = idsIn(content);

  // JSON-LD validity
  const ldRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = ldRegex.exec(content))) {
    const ln = lineOf(content, m.index);
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${relPath}:${ln}: invalid JSON-LD — ${e.message}`);
      continue;
    }
    const items = Array.isArray(parsed) ? parsed : Array.isArray(parsed.mainEntity) ? [parsed, ...parsed.mainEntity] : [parsed];
    for (const item of items) {
      if (!item['@type']) errors.push(`${relPath}:${ln}: JSON-LD item missing @type`);
    }
    if (!parsed['@context']) errors.push(`${relPath}:${ln}: JSON-LD root missing @context`);
  }

  // href/src targets
  const attrRegex = /\s(?:href|src)="([^"]*)"/g;
  while ((m = attrRegex.exec(content))) {
    const val = m[1];
    const ln = lineOf(content, m.index);
    if (val === '') continue;
    if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(val)) continue; // absolute / protocol-relative
    if (/^(mailto:|tel:|javascript:|data:)/i.test(val)) continue;

    const hashIdx = val.indexOf('#');
    const pathPart = hashIdx === -1 ? val : val.slice(0, hashIdx);
    const anchorPart = hashIdx === -1 ? null : val.slice(hashIdx + 1);

    if (pathPart === '') {
      if (anchorPart && !ownIds.has(anchorPart)) {
        errors.push(`${relPath}:${ln}: anchor "#${anchorPart}" has no matching id="" in this file`);
      }
      continue;
    }

    const targetPath = pathPart.startsWith('/')
      ? path.join(root, pathPart)
      : path.join(root, path.dirname(relPath), pathPart);

    if (!fs.existsSync(targetPath)) {
      errors.push(`${relPath}:${ln}: broken link — "${val}" resolves to missing file ${path.relative(root, targetPath)}`);
      continue;
    }

    if (anchorPart && targetPath.endsWith('.html')) {
      const targetIds = idsIn(readCached(targetPath));
      if (!targetIds.has(anchorPart)) {
        errors.push(`${relPath}:${ln}: anchor "#${anchorPart}" not found in target ${path.relative(root, targetPath)}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`check-site: ${errors.length} problem(s) found across ${htmlFiles.length} files:\n`);
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}

console.log(`check-site: ${htmlFiles.length} HTML files checked — no broken links, dead anchors, or invalid JSON-LD.`);
