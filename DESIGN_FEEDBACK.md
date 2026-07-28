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
| High | Extend homepage visual language to the 3 service pages | Not started |
| Medium | Add mobile nav (hamburger/collapse) | Not started |
| Medium | Surface real GBP reviews near "Selected Work" once they exist | Not started (blocked on `Photo request list.md` / GBP reviews) |
| Low | Fix or remove the dead Instagram footer link | Not started |
