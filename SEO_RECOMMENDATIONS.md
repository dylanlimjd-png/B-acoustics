# SEO Recommendations — b-acoustics

Audit date: 2026-07-01. Scope: `index.html` (single-page site).

## What was missing before this pass

The `<head>` had only `charset` and `viewport` — no `<title>`, no meta description,
no Open Graph/Twitter tags, no `lang` attribute, no structured data, and no canonical
link. For a local-intent business ("acoustic consultant Singapore"), this meant the
page had nothing for search engines to use as a title/snippet, and nothing machine-
readable to signal it's a Singapore professional service.

## Changes applied

- **Title tag**: `Acoustic Consultant & Soundproofing Singapore | b-acoustics`
- **Meta description**: `Professional B2B acoustic consultancy and soundproofing solutions in Singapore. Expert noise control for offices, industrial facilities, and commercial spaces.`
- **`lang="en"`** added to `<html>`.
- **Open Graph + Twitter Card tags** mirroring the title/description, so shared links
  render properly on LinkedIn/Slack/etc. (this is a B2B site — LinkedIn share appearance matters).
- **JSON-LD `ProfessionalService` schema** with `name`, `description`, `areaServed:
  Singapore`, `email`, and a `knowsAbout` list covering soundproofing, acoustic panels,
  noise reduction, sound isolation, room acoustics, vibration control.
- **`meta robots: index, follow`** — explicit, since it was implicit before.
- Keyword integration into body copy (see table below) — done as natural phrase
  additions to existing sentences, not new keyword-stuffed blocks.
- Alt text for both logo images upgraded from generic `"B-Acoustics"` to
  `"B-Acoustics — acoustic engineering and soundproofing consultancy, Singapore"`.
- 8 image/texture placeholders replaced with inline SVGs + descriptive captions +
  `aria-label`, each carrying real alt-equivalent text (see asset section of this repo's
  chat log or the diff for exact wording — e.g. "Party-wall sound isolation — home theatre").
  *(Superseded 2026-07-13 — see below: these are now real photos, not SVGs.)*

## Heading structure (reviewed, left as-is — already sound)

- Single `<h1>`: "Space that sounds right." — good uniqueness, but relies on
  page context (hero subhead, nav, meta) to carry the literal keywords, since the H1
  itself is a brand line rather than a keyword phrase. This is a defensible design
  choice for a boutique studio; if you want the H1 itself to carry more direct keyword
  weight, consider A/B testing an alternate like "Acoustic engineering that sounds right."
- Section `<h2>`s (8 total) are each unique and descriptive: Services, Approach, Selected
  work, Materials, Expertise, Process, Studio, Enquire — good semantic hierarchy, no
  skipped levels.
- Card `<h3>`s (Commercial / Residential / Industrial) are appropriately nested under
  the Services `<h2>`.

## Update — 2026-07-08

- **Canonical URL**: done. Domain confirmed as `b-acoustics.com` (see `CNAME`);
  `<link rel="canonical" href="https://b-acoustics.com/">` is in place.
- **Blog/resource content**: two long-tail landing pages now exist under `blog/`:
  `office-soundproofing-cost-singapore.html` and `stc-vs-nrc-explained.html`. Both are
  plain static HTML (not the bundler-wrapped format `index.html` uses), each with its
  own title/meta description/canonical/OG/Twitter tags and an `Article` JSON-LD block,
  and they cross-link to each other and back to `index.html`. They were previously
  orphaned (no inbound link from the homepage) — fixed by adding footer links
  ("Office Cost Guide", "STC vs NRC") on `index.html` so they're discoverable by crawl,
  not just by URL.
- **`sitemap.xml` + `robots.txt`**: added at the repo root, listing the homepage and
  both blog posts, with `robots.txt` pointing at the sitemap.

### A structural note on `index.html`

`index.html` isn't plain static markup — it's a self-contained "bundler" export (present
since the initial commit) that inlines assets as base64 in a `script[type="__bundler/manifest"]`
block and the actual page markup as an escaped JSON string in
`script[type="__bundler/template"]`, unpacked into `document.documentElement` by JS on
`DOMContentLoaded`. The real `<title>`/meta tags/JSON-LD only exist inside that escaped
string, not in the initial static `<head>` (which just says "Bundled Page"). This has been
the working format since day one and JS-rendering crawlers do see the final unpacked head,
so it hasn't been flattened — but it makes hand-editing that string error-prone (see the
"Fix unterminated JSON string syntax error" commit). When editing `index.html` content going
forward, decode the template line as JSON, edit the resulting HTML, then re-serialize with
`JSON.stringify` rather than hand-patching escaped quotes in place — safer and is how the
footer-link change above was made.

## Update — 2026-07-13

- **Real project photography**: done. The 3 "project photo" and 5 "texture" slots
  (previously inline SVG illustrations) are now real images generated via Google
  Nano Banana, downloaded locally into `/images/`, and wired into `index.html`
  (same `alt` text/`aria-label` wording carried over from the SVG version, so no
  loss of existing alt-text SEO value). Each was compressed with `sharp`
  (resize + webp quality 78) before commit — total image weight dropped from
  18MB to ~700KB across the 8 files, keeping page-load performance in check.
  Verified rendering with no regressions via headless Chromium against the live
  site. Uncompressed source images are not in the repo (kept outside it as a
  local backup) — regenerate via Nano Banana if higher-res originals are ever
  needed for print/other use.
- This also closes out the fal.ai billing blocker noted in the prior pass —
  image generation moved to Nano Banana instead, so that dependency no longer
  applies.

## Remaining recommendations (not yet applied — need your input or content)

1. **Physical address / phone number**: the JSON-LD schema currently has no
   `telephone` or `address` field because none exist on the page. Local SEO (Google
   Business Profile parity, map-pack ranking) benefits significantly from a real
   registered address and phone number in schema — add these once available.
2. **Google Business Profile**: not a code change, but for local-intent terms like
   "acoustic consultant Singapore," a verified GBP listing usually outranks organic
   page SEO alone. Worth setting up in parallel.
3. **Team `[ name ]` placeholders**: three roles (Principal Acoustic Engineer, Lead
   Architect, Project Delivery) still show `[ name ]` instead of actual names. This is a
   content gap, not an SEO or asset-generation issue, but real named experts with
   credentials (e.g. MIOA) support E-E-A-T (Google's expertise/authority signals) more
   than placeholder text.

## Target keyword coverage after this pass

| Keyword | Where it now appears |
|---|---|
| soundproofing | title, meta description, OG tags, hero paragraph, materials intro, expertise intro, image captions |
| acoustics / acoustic | throughout (pre-existing, strong) |
| noise reduction | commercial/industrial service bullets, expertise intro, image captions |
| acoustic panels | materials intro, schema `knowsAbout`, image captions/alt text |
| sound isolation | hero paragraph, residential service bullet, expertise intro, image alt text |
