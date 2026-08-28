# Design Feedback Loop — b-acoustics.com

A manually-triggered look/design/UX audit of the live site, done from the
perspective of a prospective customer browsing the site cold — not a
technical SEO or performance audit (those live in `SEO_RECOMMENDATIONS.md`
and `CONTINUOUS_IMPROVEMENT.md`). Run this whenever asked; there is no fixed
cadence.

## How to read an entry

Each run appends a new `## Run — YYYY-MM-DD` section with: method used,
findings (strengths + issues, ranked by real impact), and the actions
decided on. Update an issue's status inline (e.g. `[FIXED YYYY-MM-DD]`)
rather than duplicating it in a later run.

---

## Run — 2026-07-28

**Method:** Live desktop screenshots of the full homepage (all 10 sections,
scrolled section-by-section via `claude-in-chrome`, 1440x900 viewport) plus
one service page and one blog page for a cross-page consistency check.
Backed up qualitative impressions with real WCAG contrast-ratio math (relative
luminance formula) on the accent-orange color pairs actually used in the
code, rather than eyeballing accessibility. Attempted a live mobile-viewport
pass but the browser resize tool did not change the rendered viewport in
this environment — mobile nav finding below is based on direct markup
review instead (no `<sc-if>`/media-query/hamburger pattern exists anywhere
in the codebase), not a live screenshot.

### Strengths (keep doing these)

- Hero + alternating dark/light section rhythm reads confident and editorial.
- **Materials section** — real macro photography of felt/timber/resilient
  channel/MLV/anti-vibration mount, each with a spec line. Best trust-builder
  on the site.
- "Reading the numbers" NRC/STC/dB/RT60 key — explains jargon without being
  condescending, good for a technical B2B buyer.
- 5-step process section — clear and exactly what a facilities manager wants
  to see before enquiring.

### Issues, ranked by impact

1. **Service/blog pages have no design system.** The homepage's bold
   typography, eyebrow labels, card grids, and numbered badges disappear
   entirely on `services/*.html`/`blog/*.html` — those pages are plain
   prose with zero imagery or visual rhythm. Highest-impact issue since
   these are the primary SEO landing pages for cold organic traffic.
2. **Accent-orange text fails WCAG AA contrast on light backgrounds.**
   Measured: `#F73E1B` text/button-background on `#F1EDE4` cream ≈
   **3.2:1**, below the 4.5:1 AA minimum for normal text (the same orange
   on dark `#16140F` sections measures ~5:1 and is fine). Affects every
   light-section eyebrow label, "Learn more →" link, and every accent-colored
   CTA button site-wide (button text-on-orange has the same ratio,
   independent of section).
3. **No mobile navigation pattern.** Nav is a plain `flex-wrap:wrap` row
   with no hamburger/collapse — on a narrow viewport the 5 nav items wrap
   onto multiple lines above the hero, pushing content down. Verified from
   markup (no responsive nav code exists anywhere in the codebase), not
   from a live mobile screenshot (tooling limitation this run).
4. **"Selected Work" section has no independent proof.** Three generic,
   unnamed category cards (Open-Plan Office / Home Theatre / Industrial
   Plant), no client names, no testimonials, no logos — combined with zero
   GBP reviews currently, there is no third-party trust signal anywhere on
   the site.
5. **Footer Instagram icon is a dead link** (`href="#"`, marked `TODO` in
   the source) — small, but reads as neglect to a visitor who clicks it.

### Actions decided

| Priority | Action | Status |
|---|---|---|
| High | Fix accent-orange contrast (darken for light-bg/button use) | **FIXED 2026-07-28** — commit `78799bf` |
| High | Extend homepage visual language to the 3 service pages | **FIXED 2026-07-28** — commit `3352352` (hero photo, A/B/C step tags, FAQ dividers, dark closing CTA band, all reusing existing assets/copy) |
| Medium | Add mobile nav (hamburger/collapse) | **FIXED 2026-07-28** — commit `2f817d6` |
| Medium | Surface real GBP reviews near "Selected Work" once they exist | **FIXED 2026-08-26** — new homepage testimonial section quoting the real GBP review, near the "Selected Work"/key-numbers area |
| Low | Fix or remove the dead Instagram footer link | **FIXED 2026-07-28** — commit `b570422` (removed until a real profile URL exists) |

---

## Run — 2026-08-28

**Trigger:** user-reported spacing bug (screenshot) on the NEA boundary noise
limits blog diagram, which prompted a wider ask — check for other
design/graphic/editorial errors, not just the one reported. Scope expanded
beyond the original look/UX loop to cover three categories: **graphic**
(the 6 inline SVG diagrams shipped since the last run), **editorial**
(prose typos/grammar/factual consistency), and **design/visual** (live
screenshot pass over everything not covered 2026-07-28).

**Method:**
1. Diagnosed the reported bug directly from the SVG markup (computed label
   pixel-width vs. actual group spacing) rather than guessing from the
   screenshot alone — confirmed the root cause before touching code.
2. Same mechanical check applied to the other 5 blog-post diagrams (all
   built with the same fixed-pixel-spacing technique) to catch more of the
   *same bug class* cheaply, without needing a browser for each one.
3. Read the full rendered text of all 14 pages (`get_page_text` via
   `claude-in-chrome`) for typos, grammar, and cross-page factual
   consistency (phone number, prices, legal caveats, internal links).
4. Live desktop screenshots of homepage sections not covered in the
   2026-07-28 run (testimonial, materials, work grid, studio/team, process)
   plus the blog hub index, full-page.

**Tooling note:** a screenshot taken immediately after a JS `scrollTo()`
(not a real scroll gesture) caught the Materials section's `loading="lazy"`
images mid-load, rendering as flat color blocks — looked exactly like
broken/missing images at first glance. Confirmed via `img.complete` /
`naturalWidth` in the page that they were fully loaded, then a second
screenshot showed the real photography. Same class of false-positive the
2026-07-28 run's tooling note warned about for post-timeout screenshots —
**always take a second screenshot before concluding an image is broken.**
Did not attempt a mobile-viewport pass this run (the 2026-07-28 run found
`resize_window` didn't affect actual viewport in this environment; not
re-tested this time — still an open tooling gap, not a site finding).

### Findings

1. **[FIXED 2026-08-28]** Bar-chart x-axis labels overlapping on the NEA
   boundary noise limits diagram (`blog/nea-boundary-noise-limits-singapore.html`)
   — "Noise-sensitive" (99px wide at font-size 11) was wider than the 80px
   gap between bar groups, overlapping "Residential" next to it.
   User-reported via screenshot. Widened group spacing 80px→100px and
   shifted bars/labels/legend to match; verified in a live render. Commit
   `0a3c90b`.
2. **The other 5 diagrams checked out clean** — no other instance of the
   same bug class. They use different layout patterns (single-line text
   inside bounded boxes, or left-anchored legend rows with real margin)
   that don't have the same competing-adjacent-label failure mode as a
   center-anchored grouped bar chart.
3. **No editorial errors found** — read every page's full prose top to
   bottom; no typos, no grammar issues, no broken or non-reciprocal
   cross-links, no inconsistent facts (phone number, legal caveats, and
   cross-referenced figures all match across pages).
4. **Minor naming wrinkle, not an error:** the new homepage testimonial
   quotes a client review naming the project "Ultrastudio Live, our second
   music studio," while the Selected Work tile directly above it is
   labeled "Ultra Studio" (the client's *first* project, per memory). Two
   real, different projects for the same client — factually correct — but
   the near-identical names read as a possible typo to a visitor without
   that context. Worth a small disambiguating word (e.g. "Ultra Studio II"
   or similar) if/when that testimonial copy is next touched, but not
   urgent enough to edit a live customer quote unprompted.
5. **No new visual/layout bugs found** in the homepage sections re-screenshotted
   this run (testimonial, materials grid, work grid, studio/team list,
   5-step process) or on the blog hub index — all render cleanly at desktop
   viewport.

### Actions decided

| Priority | Action | Status |
|---|---|---|
| High | Fix the reported diagram label overlap | **FIXED 2026-08-28** — commit `0a3c90b` |
| Low | Disambiguate "Ultra Studio" vs. "Ultrastudio Live" naming in testimonial/work-grid copy | Not started — cosmetic, flagged for next content touch, not urgent |
| — | Re-attempt a live mobile-viewport pass (tooling gap since 2026-07-28) | Not started — still unverified whether `resize_window` works in this environment |
