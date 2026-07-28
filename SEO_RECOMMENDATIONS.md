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

1. ~~**Physical address / phone number**~~ — done. Phone added 2026-07-26
   (`telephone: "+65 9641 6999"` in schema + visible `tel:` link). Address added
   2026-07-27: `228 Changi Road #03-02, Singapore 419741` added as a `PostalAddress`
   to the JSON-LD `ProfessionalService` schema and to the visible Studio contact
   block on `index.html`, and to the `provider` object in all 3 service pages'
   `Service` schema. Per explicit user instruction, only the address/phone are
   public — the registered legal entity name is deliberately omitted from all
   visible content and schema (see project memory `business-legal-entity-2026-07`
   for why).
2. **Google Business Profile**: not a code change, but for local-intent terms like
   "acoustic consultant Singapore," a verified GBP listing usually outranks organic
   page SEO alone. *(In progress 2026-07-26 — business description and ad-image
   prompts drafted; listing setup itself is the user's action, not a code change.)*
3. ~~**Team `[ name ]` placeholders**~~ — done. Real names (Thomas Ee, Ivan Cheong,
   Delon Lee) now appear in the Studio section.

## Target keyword coverage after this pass

| Keyword | Where it now appears |
|---|---|
| soundproofing | title, meta description, OG tags, hero paragraph, materials intro, expertise intro, image captions |
| acoustics / acoustic | throughout (pre-existing, strong) |
| noise reduction | commercial/industrial service bullets, expertise intro, image captions |
| acoustic panels | materials intro, schema `knowsAbout`, image captions/alt text |
| sound isolation | hero paragraph, residential service bullet, expertise intro, image alt text |

## Update — 2026-07-26

- **Three service landing pages added** under `/services/` — the biggest topical-depth
  gap identified after connecting Google Search Console (pages ranked page 2-3 for
  target queries with no dedicated content to reinforce them). Each is plain static
  HTML (same safe pattern as `blog/*.html`, no bundler risk), with its own
  title/meta description/canonical/OG/Twitter tags and a `Service` JSON-LD block
  (new schema type, not used elsewhere on the site):
  - `services/office-acoustics-singapore.html` — Commercial (room acoustics, speech
    privacy, mechanical noise reduction)
  - `services/party-wall-soundproofing-singapore.html` — Residential (party-wall/floor
    isolation, window/façade upgrades, home theatre tuning)
  - `services/industrial-noise-compliance-singapore.html` — Industrial (boundary noise
    compliance, plant/duct attenuation, vibration control)

  Each includes an FAQ section targeting long-tail/featured-snippet queries and cross-
  links to the two existing blog posts and the other service pages.
- **Internal linking strengthened site-wide** (previously flagged as thin — only 2
  footer links existed): `index.html`'s `#services` cards now each have a "Learn more"
  link to the matching service page; `index.html`'s footer, and both existing blog
  posts' footers, now link to all 3 service pages; both blog posts' "related" sections
  gained a link to their most topically-relevant new service page.
- **`sitemap.xml`** updated with the 3 new service page URLs.
- **"Selected work" section on `index.html` genericized**: the three specific named
  projects (a Tanjong Pagar office HQ, a Bukit Timah residence, a Jurong industrial
  plant) and their claimed numeric outcomes (NRC/STC/dB figures) were removed at the
  user's request and replaced with generic category labels (Open-Plan Office / Home
  Theatre / Industrial Plant) — the section eyebrow/heading were adjusted to match
  ("Capabilities" / "Built for the environment.") since specific measured-outcome
  claims no longer apply. These project names should **not** be reintroduced in future
  copy (GBP listing, ad creative, new content) — see project memory for the decision.
  Image alt text was updated to remove the specific names while keeping descriptive
  SEO value (e.g. "commercial soundproofing project, Singapore").
- GBP business description (3 drafted variants) and Nano Banana ad-image prompts were
  produced this session but are conversation-only, not committed to the repo — see
  project memory `seo-improvement-plan-2026-07` for the chosen direction if resuming.

## Update — 2026-07-27 (AEO/GEO pass — now complete site-wide)

- **`FAQPage` JSON-LD added to all 3 service pages.** Each already had a visible
  "Frequently asked" Q&A section (added 2026-07-26) but no structured-data markup
  for it — added a second `<script type="application/ld+json">` block per page with
  a `FAQPage`/`Question`/`Answer` structure matching the visible text verbatim
  (required for AI Overviews/ChatGPT/Perplexity to safely cite it, and to avoid a
  schema-content mismatch).
- **New FAQ section + schema added to the homepage** (`index.html`, "07 / FAQ",
  between Process and Studio — Studio/Enquire renumbered 08/09 accordingly). 5
  company-level Q&As (what an acoustic consultant does, property types served, STC
  vs NRC, project timeline, verification testing) that don't overlap the 3 service
  pages' per-domain FAQs. Footer nav gained a `#faq` link.
- **FAQ sections + schema added to both blog posts.** 4 Q&As each, distilling each
  article's existing content into direct question/answer form, inserted before each
  post's closing "How B-Acoustics..." section (same placement pattern as the
  service pages).
- **Every page on the site now has `FAQPage` schema** — homepage, all 3 service
  pages, both blog posts. This closes out the AEO/GEO item from the
  continuous-improvement tracker.
- **Registered address added to schema** — see item 1 above.

## SEO ranking check — 2026-07-27 (first run; now a weekly routine, see below)

Live organic Google search via browser (Singapore locale `gl=sg`, no account/login
used — see `seo-ranking-routine-2026-07` project memory for why). This is a spot
check of real SERPs, not a rank-tracking tool or Search Console data (still not
connected — see `continuous_improvement_stream_2026-07` memory).

### Findings

1. **No organic visibility yet for any target term.** Not on page 1 or 2 for
   "acoustic consultant Singapore" (primary target), not on page 1 for "soundproofing
   Singapore" (broad, highly competitive) or "office soundproofing cost Singapore"
   (the exact blog post's target term).
2. **Indexing gap — likely the bigger issue.** `site:b-acoustics.com` shows **only
   the 2 blog posts indexed.** The homepage and all 3 service pages don't appear at
   all (caveat: the `site:` operator under-reports; treat as a signal, not proof —
   but it was consistent across every query run). Ranking is moot until Google
   actually indexes these pages.
3. **Brand-name collision.** Searching "b-acoustics" gets crowded out by unrelated
   audio-equipment brands (SB Acoustics, BE Acoustics, B-System) — the one blog post
   that does rank is buried among them.
4. **GBP has no local-pack visibility yet.** Searching the brand name directly, the
   Google Maps local pack shows competitors (Advanced Acoustics, dB Acoustics,
   NoiseStop) — consistent with the GBP listing being new (went live 2026-07-26) with
   zero reviews.

### Resolution plans

1. **No organic visibility** — expected this early (site content is <1 month old
   for the homepage, 1 day old for service pages); competitive commercial terms
   typically take 3-6+ months to gain visibility. The main lever is **backlinks**
   (currently zero known inbound links) — see the backlink-building priority already
   flagged in `seo_improvement_plan_2026-07` memory. Track via this weekly routine to
   measure real progress rather than guessing.
2. **Indexing gap** — once Search Console access exists (still blocked, see
   `continuous_improvement_stream_2026-07` memory), use URL Inspection → Request
   Indexing on the homepage and all 3 service pages, and confirm `sitemap.xml` is
   submitted there. Also worth checking GSC's "Live Test" rendered-HTML view for the
   homepage specifically — `index.html`'s bundler format requires full JS execution
   before any content exists in the DOM (see `index_html_bundler_format` memory and
   the Core Web Vitals finding above), so it's worth confirming Googlebot's renderer
   actually waits for and executes that unpack step rather than indexing a blank
   shell. Re-check after 1-2 weeks regardless, since the service pages are very new.
3. **Brand-name collision** — not much to fix structurally; low priority since
   branded search isn't the primary acquisition channel this early. Resolves
   naturally as more Singapore-specific, branded backlinks and citations accumulate
   (GBP listing, directory listings) that reinforce "B-Acoustics" + "Singapore" +
   "acoustic" co-occurrence to Google.
4. **GBP local-pack visibility** — complete GBP verification if not already done,
   add photos/description/categories/service areas (descriptions already drafted,
   see `seo_improvement_plan_2026-07` memory), and get first reviews — same lever as
   the open "Trust signals & social proof" item on `CONTINUOUS_IMPROVEMENT.md`.
   Ensure NAP consistency between the GBP listing and the site (address/phone now
   match per the 2026-07-27 update above). Local-pack visibility typically needs a
   verified listing plus reviews plus some citation building — expect weeks, not
   days.

**This check is now a weekly routine ("SEO ranking")** — see `CONTINUOUS_IMPROVEMENT.md`
for the cadence/automation approach and `seo-ranking-routine-2026-07` project memory
for the full method (exact queries run, why no Google login is used, and the
cloud-automation constraint).

## Update — 2026-07-28: homepage indexing-gap fix shipped

Resolution plan #2 above (indexing gap) is fixed. Confirmed via direct inspection
that Googlebot's first-pass raw HTML for `index.html` previously contained no real
content — only a loading spinner and a `This page requires JavaScript to display`
`<noscript>` fallback, because the entire page shipped as an escaped-JSON blob
unpacked client-side (the "bundler" format — see `index_html_bundler_format`
memory). Re-platformed `index.html` to plain static HTML (same safe pattern as
`services/*.html` and `blog/*.html`); raw HTML now contains the real hero text,
all sections, and both JSON-LD blocks with zero JS execution required. Also fixed
the related Core Web Vitals finding from `CONTINUOUS_IMPROVEMENT.md` as a side
effect (local Lighthouse mobile: performance score 74→95, LCP 5.4s→2.4s) since it
was the same root cause. Pushed to `origin/main` (commit `70de168`) and confirmed
live on b-acoustics.com.

**Next weekly "SEO ranking" check should specifically look for `b-acoustics.com`
(the homepage) appearing in `site:b-acoustics.com`**, which it did not as of
2026-07-27 — this is the signal that the fix actually resolved indexing, not just
the technical symptom.

## SEO ranking check — 2026-07-28

Live organic Google search via browser (Singapore locale `gl=sg`, no account/login
used — see `seo-ranking-routine-2026-07` project memory). Run the day after the
homepage re-platform shipped (commit `70de168`, see the update directly above),
specifically to start tracking whether that fix moves the indexing gap.

### Findings

1. **`site:b-acoustics.com` still shows only the 2 blog posts** — homepage and all
   3 service pages still not indexed, unchanged from 2026-07-27. Expected at this
   point: the fix was pushed less than 24 hours before this check, and Google's
   re-crawl/re-index cycle takes longer than that. Not a sign the fix failed —
   just too soon to see an effect yet.
2. **Still no organic visibility** for "acoustic consultant Singapore" (checked
   page 1 and page 2), "soundproofing Singapore", "office soundproofing cost
   Singapore" (the exact blog post's own target term), or "office acoustics
   Singapore" (the office service page's own target term). Unchanged from last
   week.
3. **Brand-name collision persists** for the bare "b-acoustics" query — still
   crowded out by the same unrelated audio-equipment brands (BS Acoustic, SB
   Acoustics, BE Acoustics) plus dB Acoustics (a real competitor). **Small
   positive signal:** the quoted query `"B-Acoustics" acoustic consultant` now
   surfaces *both* blog posts in web results (last week only one ranked) —
   direction is right, just early.
4. **GBP still has no local-pack visibility.** Local results for "office
   acoustics Singapore" and `"B-Acoustics" acoustic consultant` show only
   competitors (Advanced Acoustics, dB Acoustics, Aural-Aid, NoiseStop, TC
   Acoustic) — consistent with the listing still lacking reviews/citations. No
   change from last week; still blocked on the open GBP photo/review action item
   (see `Photo request list.md`).

### Resolution plans

1. **Indexing gap** — the structural cause is now fixed (see the 2026-07-28
   update above), so this is now purely a matter of waiting for Google's next
   crawl of these URLs. Re-check specifically on this next week; if
   `site:b-acoustics.com` still doesn't show the homepage after ~2 weeks post-fix,
   that would be the point to consider manually requesting indexing (needs GSC
   access, still blocked — see `continuous_improvement_stream_2026-07` memory).
2. **No organic visibility / brand collision** — same as 2026-07-27: expected
   this early, primary lever is backlinks (still zero known inbound links) and
   time. No new action this week.
3. **GBP local-pack visibility** — same open item as last week: needs the real
   photos from `Photo request list.md` shot and uploaded, plus first reviews.
   Nothing to do here from this session; flagged as the actionable next step for
   whenever those photos are taken.

**Next week:** re-run this same query set and check specifically whether
`site:b-acoustics.com` now includes the homepage — that's the concrete pass/fail
signal for the 2026-07-28 re-platform fix.
