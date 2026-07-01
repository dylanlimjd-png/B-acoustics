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

## Remaining recommendations (not yet applied — need your input or content)

1. **Canonical URL**: not added, since the live domain wasn't confirmed. Once
   `b-acoustics.sg` (or whatever domain) is live, add:
   `<link rel="canonical" href="https://YOUR-DOMAIN/">`
2. **Physical address / phone number**: the JSON-LD schema currently has no
   `telephone` or `address` field because none exist on the page. Local SEO (Google
   Business Profile parity, map-pack ranking) benefits significantly from a real
   registered address and phone number in schema — add these once available.
3. **Google Business Profile**: not a code change, but for local-intent terms like
   "acoustic consultant Singapore," a verified GBP listing usually outranks organic
   page SEO alone. Worth setting up in parallel.
4. **Blog/resource content**: the page is a single static page. If ranking for
   long-tail terms like "office soundproofing cost Singapore" or "STC vs NRC explained"
   matters, that needs dedicated content pages — this site has no routing for that today.
5. **Team `[ name ]` placeholders**: three roles (Principal Acoustic Engineer, Lead
   Architect, Project Delivery) still show `[ name ]` instead of actual names. This is a
   content gap, not an SEO or asset-generation issue, but real named experts with
   credentials (e.g. MIOA) support E-E-A-T (Google's expertise/authority signals) more
   than placeholder text.
6. **Image sitemap / real photography**: the 3 "project photo" and 5 "texture" slots
   now have descriptive inline SVG illustrations with real alt text, which is
   accessible and crawlable — but they are illustrative placeholders, not real project
   photography. Swapping in actual project photos (with the same alt-text pattern
   already in place) will improve both credibility and Google Images traffic for
   "acoustic panels Singapore" / "soundproofing Singapore" image search.

## Target keyword coverage after this pass

| Keyword | Where it now appears |
|---|---|
| soundproofing | title, meta description, OG tags, hero paragraph, materials intro, expertise intro, image captions |
| acoustics / acoustic | throughout (pre-existing, strong) |
| noise reduction | commercial/industrial service bullets, expertise intro, image captions |
| acoustic panels | materials intro, schema `knowsAbout`, image captions/alt text |
| sound isolation | hero paragraph, residential service bullet, expertise intro, image alt text |
