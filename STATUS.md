# Project Status — b-acoustics.com

**Single consolidated view of everything outstanding across all trackers.**
Check this file first at the start of a session instead of opening
`SEO_RECOMMENDATIONS.md`, `CONTINUOUS_IMPROVEMENT.md`, `DESIGN_FEEDBACK.md`,
and `Photo request list.md` separately — those remain the detailed logs
(method, findings, reasoning) for their respective activities; this file is
just the rollup of what's still open, updated whenever any of them change.

Last updated: 2026-07-31.

## Open items — ranked 2026-07-28

Ranked by impact vs. effort (same method as `CONTINUOUS_IMPROVEMENT.md`'s
weekly ranking), with an explicit **Actionable** column since two of the
highest-impact items require you personally (a site visit, client
outreach) and can't be started in a coding session.

| Rank | Item | Impact | Effort | Actionable by me now? | Source |
|---|---|---|---|---|---|
| 1 | First GBP reviews — solicit from real clients | Very High | Low (for you) | **No — needs you** | `CONTINUOUS_IMPROVEMENT.md` Item 3, `DESIGN_FEEDBACK.md` |
| 2 | Real GBP photos — shot list ready, not yet taken/uploaded | High | Medium (for you) | **No — needs you** | `Photo request list.md` |
| ~~3~~ | ~~Mobile nav has no hamburger/collapse~~ — **FIXED 2026-07-28**, commit `2f817d6` | High | Low-Medium | Done | `DESIGN_FEEDBACK.md` |
| ~~4~~ | ~~WCAG pass~~ — **FIXED 2026-07-28**, commit `b570422`: label/for association, focus-visible outlines, chat input accessible name (real failures found via direct audit — alt text was already complete, checked and confirmed) | Med-High | Medium | Done | `CONTINUOUS_IMPROVEMENT.md` Item 4 |
| ~~5~~ | ~~2 of 4-6 more blog posts~~ — **DONE 2026-07-28**, commit `bd31a0c` (NEA boundary noise limits, HDB vs Condo). 2-4 more remain for a future batch. | Medium | High | Partially done | `SEO_RECOMMENDATIONS.md` |
| 6 | Off-page authority: SG directory listings, MIOA, outreach, press | High ceiling, slow | Very High, ongoing, partly needs your relationships | **Research done** (`Backlink Targets.md`, commit `a302e1a`) — actual submission needs you | `SEO_RECOMMENDATIONS.md` |
| 7 | `AggregateRating`/`Review` schema | Low until #1 exists | Low | Blocked on #1 | `SEO_RECOMMENDATIONS.md` |
| ~~8~~ | ~~Dead Instagram footer link~~ — **FIXED 2026-07-28**, commit `b570422` (removed until a real profile URL exists) | Trivial | Trivial | Done | `DESIGN_FEEDBACK.md` |
| 9 | Optional H1 A/B test | Low, needs analytics infra we don't have | Medium | No — no infra | `SEO_RECOMMENDATIONS.md` |
| ~~10~~ | ~~Service/blog page performance~~ — **FIXED 2026-07-31**: root cause was two oversized logo PNGs embedded as inline base64 in every `services/*.html`/`blog/*.html` page (~350KB of dead weight per page, invisible to `check-site.js` since it skips `data:` URIs) plus the hero photo on service pages being `loading="lazy"` and fetched from an absolute production URL instead of the local static file. Replaced with the same relative-path + eager-hero pattern the homepage already used. Local Lighthouse: office-acoustics page 0.86 perf/2.6s LCP (was 0.78–0.83/up to 4.1s), stc-vs-nrc blog page 0.96 perf/2.3s LCP. `lighthouserc.json`'s generic budget tightened (0.72→0.78 min score, 4500→3800ms max LCP). | Medium | Medium | Done | This session |

**Remaining fully-actionable-by-me item: 2-4 more blog posts** (see
`SEO_RECOMMENDATIONS.md` for candidate topics). Everything else left open
either needs you (#1, #2, actual directory/association submissions from
#6) or is blocked on something outside this session's control (#7, #9).

## Watch items (not actionable yet, just checking periodically)

- **Homepage indexing gap** — structural fix shipped 2026-07-28 (commit `70de168`). `site:b-acoustics.com` still didn't show the homepage as of the 2026-07-28 SEO ranking check (expected — too soon after the fix). **Re-check on the next SEO ranking run**; that's the real pass/fail signal.
- **GSC-capable MCP connector** — not connected as of last check. Would unblock real daily/weekly SEO data automation. Ask "is a Search-Console connector available now?" next session.
- **GitHub App install on `dylanlimjd-png/B-acoustics`** — not verified as of last check. Needed before the weekly tracker doc can be committed by an unattended cloud routine.
- **Blank favicon in Google search results** — not due for a recheck until ~2026-08-13 (one month after it shipped).
- **`worker-uptime.yml` scheduled workflow** — GitHub auto-disables scheduled workflows after 60 days with no repository *activity* (any push resets the clock). If pushes to this repo ever go quiet for 2 months, re-enable it manually in the Actions tab.

## CI infrastructure (added 2026-07-28)

Four pieces of build-time tooling, all wired up and confirmed green on `main` this session — see `.github/workflows/` and root `package.json`/`playwright.config.js`/`lighthouserc.json`:

- **`ci.yml`** (runs on push/PR to `main`, plus manual `workflow_dispatch`; advisory — doesn't gate the GitHub Pages deploy): `scripts/check-site.js` validates JSON-LD and internal links/anchors across all 8 pages; `html-validate` checks HTML structure (`.htmlvalidate.json` turns off rules that just reflect this site's real conventions — inline styles, implicit input/button types, etc.); a Playwright visual-regression suite screenshots all 8 pages at desktop + mobile; Lighthouse CI enforces a performance budget (strict on the homepage; the generic budget for service/blog pages was tightened 2026-07-31 once those pages were brought up to the same standard — see Recently resolved below), using `numberOfRuns: 3` (median) since GitHub's shared runners showed enough single-run variance (~0.82–0.95 on the same unchanged commit) to fail on noise alone.
- **`update-visual-baseline.yml`** (manual trigger only) — regenerates the 16 committed baseline screenshots in `tests/visual.spec.js-snapshots/`. Run this deliberately after any *intentional* visual change; otherwise a real regression should make `ci.yml`'s visual-regression job fail red.
- **`worker-uptime.yml`** — pings the Cloudflare Worker's health route every 30 min; a failure surfaces via GitHub's default scheduled-workflow-failure notification (no new alerting infra).
- Verified end-to-end: deliberately reintroduced the exact Studio-section padding bug fixed below and confirmed the visual-regression suite catches it (93px height diff, ~3-4% pixel diff) before reverting. The homepage screenshot was itself intermittently flaky at first — two real causes found and fixed: `html{scroll-behavior:smooth}` animating the scroll steps used to stitch a full-page capture, and `loading="lazy"` hero images loading mid-capture. Confirmed stable across 3 consecutive clean CI runs after both fixes.

## Recently resolved (kept briefly for continuity, drop once confirmed stable)

- Service/blog page Lighthouse performance — removed ~350KB of inline base64 logo images per page, fixed the service-page hero photo to load eagerly from a relative path instead of lazily from an absolute production URL, tightened `lighthouserc.json`'s generic budget accordingly (2026-07-31).
- Studio section (08) had zero top padding, jamming its heading against the dark FAQ section above it — a copy/paste slip from the 70de168 re-platform, not a new bug. **Fixed 2026-07-28**, commit `5a14df8`; user-verified live.
- While wiring up the new HTML checkers: fixed unescaped `&` in two service-page `<title>` tags and one blog paragraph, a `<style>` block incorrectly placed under `<body>` instead of `<head>` in `index.html`, and a couple of trivial whitespace/attribute nits (2026-07-28, PR #2).
- Homepage bundler-format → plain static HTML re-platform (2026-07-28, `70de168`) — fixed the indexing-gap root cause and a 6.6s LCP render delay (Lighthouse: 74→95, LCP 5.4s→2.4s).
- Accent-orange WCAG contrast failure on light backgrounds, site-wide (2026-07-28, `78799bf`).
- Service-page visual consistency — hero photos, step tags, FAQ dividers, dark closing CTA band (2026-07-28, `3352352`).
- Mobile hamburger nav across all 6 pages (2026-07-28, `2f817d6`).
- WCAG fixes on the homepage contact form + dead Instagram link removed (2026-07-28, `b570422`).
- 2 new blog posts (NEA boundary noise limits, HDB vs Condo) + cross-linking (2026-07-28, `bd31a0c`).
- Backlink Targets.md research doc (2026-07-28, `a302e1a`).
- Contact form + AI chat agent backend (2026-07-27).
- AEO/GEO: `FAQPage` JSON-LD site-wide (2026-07-27).
- Registered address added to schema + NAP (2026-07-27).

## How to keep this current

Whenever a tracker's action-table changes (an item gets fixed, a new one is
found, priority shifts), update this file's **Open items** table in the same
commit. When resolving something, move its line from "Open items" into
"Recently resolved" with the date/commit, and delete "Recently resolved"
lines once they've been confirmed stable for a session or two — this file
should stay short enough to read in one glance, it is not meant to be a full
history (the individual tracker files already are that).
