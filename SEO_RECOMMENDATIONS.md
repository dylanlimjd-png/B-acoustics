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

## Update — 2026-07-28 (2 new blog posts + backlink research)

- **2 of the 4-6 recommended blog posts shipped**: `blog/nea-boundary-noise-limits-singapore.html`
  and `blog/hdb-vs-condo-soundproofing-singapore.html`. Both grounded in real,
  sourced facts fetched this session (NEA's actual dB(A) limit table; real HDB
  renovation-permit timing rules) rather than invented figures, with their own
  `FAQPage` schema, cross-linked to the relevant service page and each other,
  and added to `sitemap.xml` and every page's footer. Commit `bd31a0c`.
  Remaining candidate topics for a future batch: home theatre soundproofing
  cost, and 1-2 more depending on what's converting.
- **Off-page authority** — moved from "not started" to "researched." See
  `Backlink Targets.md` (new file, commit `a302e1a`) for a sourced shortlist of
  real SG business directories and architecture/interior-design industry
  bodies. Actual submission still needs the user (account creation, association
  outreach) — this only closes the research half of the item.

## SEO ranking check — 2026-07-31

Live organic Google search via browser (Singapore locale `gl=sg`, no account/login
used — see `seo-ranking-routine-2026-07` project memory). Ran 3 days after the
homepage re-platform (`70de168`) and the service/blog Lighthouse performance fix
(`5f8dc50`, same session). Query set expanded per last run's note: added
"party-wall soundproofing Singapore" and "industrial noise compliance Singapore"
(the two remaining service pages' own target terms) — full rotation now covers
all 3 service pages and both indexed blog posts.

### Findings

1. **`site:b-acoustics.com` still shows only the 2 blog posts** — homepage and
   all 3 service pages still not indexed, unchanged from 2026-07-28. Only 3 days
   post-fix; still within a normal re-crawl window, not a signal the fix failed.
2. **Still no organic visibility** on page 1 for "acoustic consultant Singapore",
   "soundproofing Singapore", "office soundproofing cost Singapore", or "office
   acoustics Singapore" — unchanged from last week. (Page 2 not re-checked this
   run; long-running zero-visibility trend made it low-value to repeat.)
3. **Both new query terms show zero visibility too** — "party-wall soundproofing
   Singapore" and "industrial noise compliance Singapore" (the party-wall and
   industrial service pages' own target terms) don't surface b-acoustics.com
   anywhere on page 1, organic or local pack. Expected given those pages aren't
   indexed yet (see #1) — same root cause, not a separate problem.
4. **Brand-name collision persists** for the bare "b-acoustics" query — same
   unrelated audio-equipment brands (BS Acoustic, SB Acoustics, BE Acoustics)
   plus dB Acoustics crowd out every result; b-acoustics.com doesn't appear at
   all, not even as a "missing" partial match.
5. **Positive signal continues to strengthen**: the quoted query `"B-Acoustics"
   acoustic consultant` now returns *both* blog posts as the top two organic
   web results (previously they appeared further down the results). Direction
   is right and improving for exact-brand-match queries specifically.
6. **GBP still has zero local-pack visibility** — checked across "soundproofing
   Singapore", "office soundproofing cost Singapore", "office acoustics
   Singapore", "party-wall soundproofing Singapore", and the branded query; every
   local pack shows only competitors (NoiseStop, JD Acoustic, Aural-Aid, TC
   Acoustic, ArteCoustic, Advanced Acoustics, dB Acoustics). No change — still
   blocked on the open GBP photo/review action item.

### Resolution plans

1. **Indexing gap** — no new action; same wait as documented 2026-07-28. If
   `site:b-acoustics.com` still excludes the homepage by roughly 2026-08-11
   (~2 weeks post-fix), that's the point to consider a manual indexing request
   (needs GSC access, still blocked).
2. **No organic visibility / brand collision / new query terms** — same as
   prior runs: expected this early, primary lever is backlinks (still zero
   known inbound links) and time. No new action this week.
3. **Branded-query improvement** — no action needed, just keep tracking; if this
   keeps strengthening while generic-term visibility stays flat, it's a useful
   signal that content quality isn't the blocker, indexing/authority is.
4. **GBP local-pack visibility** — same open item: needs the real photos from
   `Photo request list.md` shot and uploaded, plus first reviews. Nothing to do
   here from this session.

**Next run:** re-check `site:b-acoustics.com` for the homepage specifically —
now the single concrete pass/fail signal being tracked across runs.

## Update — 2026-08-01 (2 more blog posts + GBP existence check)

- **2 more of the recommended blog posts shipped**, closing out the "2-4 more
  blog posts" item: `blog/home-theatre-soundproofing-cost-singapore.html` (the
  named candidate topic from 2026-07-28) and `blog/neighbour-noise-singapore.html`
  (new — fills a real content gap, since `services/party-wall-soundproofing-singapore.html`
  had no dedicated blog companion before this). Both grounded in real, sourced
  facts (STC targets and the room-within-a-room/low-frequency principles for
  home theatres; the Community Disputes Resolution Act's Nov 2024 amendment,
  Community Mediation Centre, the piloted Community Relations Unit, and the
  ~2,500/month neighbour-noise complaint volume for the second), each with its
  own `Article`+`FAQPage` schema, cross-linked to the relevant service page(s)
  and other posts, and added to `sitemap.xml` and every page's footer.
  `party-wall-soundproofing-singapore.html`'s "related" section now leads with
  the new neighbour-noise post instead of the STC vs NRC link. Verified clean
  with `npm run check-site` and `npm run validate-html` before committing.
- **GBP existence check** (requested this session, not a scheduled item): live
  Google Search and Google Maps search for "B-Acoustics Singapore" returns zero
  results named B-Acoustics — only unrelated businesses (SB Acoustics, dB
  Acoustics, TC Acoustic, Advanced Acoustics, NoiseStop Systems, etc.). This is
  a stronger finding than "no reviews yet" — it suggests **no Google Business
  Profile exists for B-Acoustics at all**, or it exists but isn't verified/live,
  rather than merely lacking reviews. Updates the framing of Open Item #1: the
  first actionable step may be creating/verifying the GBP listing itself, not
  just soliciting reviews on an existing one. Needs the user to check Google
  Business Profile Manager directly.

## SEO ranking check — 2026-08-03

Full query rotation re-run (all 3 service-page terms, 2 broad terms, `site:`,
both brand-name variants) — 3 days after the 2026-07-31 run and 2 days after
the 2 new blog posts shipped (2026-08-01).

### Findings

1. **`site:b-acoustics.com` unchanged** — still only the same 2 original blog
   posts (STC vs NRC, office soundproofing cost). Homepage, all 3 service
   pages, and both of the 2026-08-01 posts (home-theatre cost, neighbour-noise)
   are still not indexed. The 2 newest posts are only 2 days old so that part
   is expected; the homepage/service-page gap is now ~6 days post-fix
   (`70de168`, 2026-07-28) with zero movement.
2. **Zero organic page-1 visibility**, unchanged: "acoustic consultant
   Singapore", "soundproofing Singapore", "office soundproofing cost
   Singapore", "office acoustics Singapore", "party-wall soundproofing
   Singapore", "industrial noise compliance Singapore" — b-acoustics.com
   doesn't appear in any of them.
3. **GBP local-pack visibility still zero** — checked every query that
   surfaced a local pack ("soundproofing Singapore", "office acoustics
   Singapore", "party-wall soundproofing Singapore", the branded query); same
   competitor set as prior runs (NoiseStop, TC Acoustic, Aural-Aid, ArteCoustic,
   Advanced Acoustics, dB Acoustics). Consistent with the 2026-08-01 finding
   that no GBP listing may exist at all.
4. **Bare "b-acoustics" query** — same brand collision as every prior run
   (SB Acoustics, BE Acoustics, BS Acoustic dominate); b-acoustics.com absent
   entirely.
5. **Regression on the quoted branded query** — `"B-Acoustics" acoustic
   consultant` previously (2026-07-31) returned *both* blog posts as the top
   two organic web results, read as a strengthening signal. This run it
   returns only **one** result (the office-soundproofing-cost post), ranked
   *below* an unrelated Australian competitor confusingly named "a/b
   acoustics" (Brisbane) that now occupies the top organic slot and both
   "People also ask" entries. Net visibility for this exact-brand query went
   down, not up. Likely just SERP volatility/re-ranking noise given the small
   sample (one query, one snapshot), not a real trend yet — but worth
   confirming on the next run before concluding anything.

### Resolution plans

1. **Indexing gap** — the 2026-08-11 checkpoint from the last run still
   stands (~2 weeks post `70de168`). No new action yet.
2. **Zero organic visibility** — unchanged root cause (no backlinks, low
   domain age/authority) and unchanged plan: this is a backlink/time problem,
   not a content problem. No action this run.
3. **GBP** — still fully blocked on the user (Item #1/#2 in `STATUS.md`).
4. **Branded-query regression** — no action; flagged to re-check specifically
   next run. If "a/b acoustics" keeps outranking b-acoustics.com on its own
   brand-adjacent query across multiple runs, that's a signal worth a closer
   look (e.g. whether it's worth clarifying the brand name in title tags), but
   one data point isn't enough to act on.

**Next run:** re-check the branded-query ranking specifically (item 5) in
addition to the standing `site:b-acoustics.com` homepage-indexing watch.
