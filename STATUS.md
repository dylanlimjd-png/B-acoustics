# Project Status — b-acoustics.com

**Single consolidated view of everything outstanding across all trackers.**
Check this file first at the start of a session instead of opening
`SEO_RECOMMENDATIONS.md`, `CONTINUOUS_IMPROVEMENT.md`, `DESIGN_FEEDBACK.md`,
and `Photo request list.md` separately — those remain the detailed logs
(method, findings, reasoning) for their respective activities; this file is
just the rollup of what's still open, updated whenever any of them change.

Last updated: 2026-08-01.

**2026-08-01 session:** shipped the final 2 of the "2-4 more blog posts" item
(home theatre soundproofing cost + a new neighbour-noise/party-wall guide —
see `SEO_RECOMMENDATIONS.md`'s 2026-08-01 entry). Ran a live GBP existence
check at the user's request: **no Google Business Profile named B-Acoustics
is findable on Google Search or Maps at all** — a stronger/different finding
than "no reviews yet" (open item #1 below updated accordingly). Then ran a
brainstorm session with the user (`CONTINUOUS_IMPROVEMENT.md` Week of
2026-08-01) off a specific observation: blog posts had no imagery. Built and
shipped 2 of that brainstorm's 5 items same session — 6 original SVG
diagrams (one per blog post) and a new `/blog/` index hub page, linked into
every page's nav/footer and `sitemap.xml`. The other 3 brainstorm items
(`BreadcrumbList` schema, a post-change Lighthouse re-check, a content
freshness pass on the two oldest posts) are queued below as the next
actionable-by-me work. Finally, compiled `Pending Assets - B-Acoustics.pdf`
(committed, root of repo) — a consolidated, detailed checklist of every
real-world asset (GBP setup/photos, reviews, testimonials/case studies)
still needed from the user, gathered from every tracker into one document.

**Session paused here — user is stopping for the day.** Everything above is
committed and pushed to `main` (`98193eb`), CI green. Nothing mid-flight.
Pick up next session with items #12-14 below (all fully actionable without
the user), or check whether the user has made progress on #1/#2/#6/the new
PDF's checklist in the meantime.

## Open items — ranked 2026-07-28

Ranked by impact vs. effort (same method as `CONTINUOUS_IMPROVEMENT.md`'s
weekly ranking), with an explicit **Actionable** column since two of the
highest-impact items require you personally (a site visit, client
outreach) and can't be started in a coding session.

| Rank | Item | Impact | Effort | Actionable by me now? | Source |
|---|---|---|---|---|---|
| 1 | First GBP reviews — solicit from real clients | Very High | Low (for you) | **No — needs you.** Updated 2026-08-01: a live Google Search/Maps check found no GBP listing named B-Acoustics at all — check whether one exists/is verified in Google Business Profile Manager before soliciting reviews on it | `CONTINUOUS_IMPROVEMENT.md` Item 3, `DESIGN_FEEDBACK.md`, `SEO_RECOMMENDATIONS.md` 2026-08-01 entry |
| 2 | Real GBP photos — shot list ready, not yet taken/uploaded | High | Medium (for you) | **No — needs you** | `Photo request list.md` |
| ~~3~~ | ~~Mobile nav has no hamburger/collapse~~ — **FIXED 2026-07-28**, commit `2f817d6` | High | Low-Medium | Done | `DESIGN_FEEDBACK.md` |
| ~~4~~ | ~~WCAG pass~~ — **FIXED 2026-07-28**, commit `b570422`: label/for association, focus-visible outlines, chat input accessible name (real failures found via direct audit — alt text was already complete, checked and confirmed) | Med-High | Medium | Done | `CONTINUOUS_IMPROVEMENT.md` Item 4 |
| ~~5~~ | ~~4-6 more blog posts~~ — **DONE**: 2026-07-28 commit `bd31a0c` (NEA boundary noise limits, HDB vs Condo) + 2026-08-01 (home theatre soundproofing cost, neighbour-noise/party-wall guide). Item fully closed. | Medium | High | Done | `SEO_RECOMMENDATIONS.md` |
| 6 | Off-page authority: SG directory listings, MIOA, outreach, press | High ceiling, slow | Very High, ongoing, partly needs your relationships | **Research done** (`Backlink Targets.md`, commit `a302e1a`) — actual submission needs you | `SEO_RECOMMENDATIONS.md` |
| 7 | `AggregateRating`/`Review` schema | Low until #1 exists | Low | Blocked on #1 | `SEO_RECOMMENDATIONS.md` |
| ~~8~~ | ~~Dead Instagram footer link~~ — **FIXED 2026-07-28**, commit `b570422` (removed until a real profile URL exists) | Trivial | Trivial | Done | `DESIGN_FEEDBACK.md` |
| 9 | Optional H1 A/B test | Low, needs analytics infra we don't have | Medium | No — no infra | `SEO_RECOMMENDATIONS.md` |
| ~~10~~ | ~~Service/blog page performance~~ — **FIXED 2026-07-31**, commit `5f8dc50`: root cause was two oversized logo PNGs embedded as inline base64 in every `services/*.html`/`blog/*.html` page (~350KB of dead weight per page, invisible to `check-site.js` since it skips `data:` URIs) plus the hero photo on service pages being `loading="lazy"` and fetched from an absolute production URL instead of the local static file. Replaced with the same relative-path + eager-hero pattern the homepage already used. Local Lighthouse: office-acoustics page 0.86 perf/2.6s LCP (was 0.78–0.83/up to 4.1s), stc-vs-nrc blog page 0.96 perf/2.3s LCP. `lighthouserc.json`'s generic budget tightened (0.72→0.78 min score, 4500→3800ms max LCP). | Medium | Medium | Done | This session |
| ~~11~~ | ~~Blog posts had no visuals~~ — **DONE 2026-08-01**: 6 original SVG diagrams (one per post) + new `/blog/` index hub page, wired into nav/footer/sitemap sitewide. | Med-High | Low-Med | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01 |
| 12 | `BreadcrumbList` schema on blog/service pages | Low-Med | Low | **Yes** — queued next | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01 |
| 13 | Re-run Lighthouse now that new posts + inline SVG diagrams have landed | Med | Low | **Yes** — queued next | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01 |
| 14 | Content freshness pass on the 2 oldest posts (office cost guide, STC vs NRC — both dated 2026-07-02) | Low-Med | Low | **Yes** — queued next | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01 |

**Remaining actionable-by-me items: #12, #13, #14** (all from this session's
brainstorm — cheap, low-risk follow-ups). Everything else open needs you
(#1, #2, actual directory/association submissions from #6) or is blocked on
something outside this session's control (#7, #9).

## Watch items (not actionable yet, just checking periodically)

- **Homepage indexing gap** — structural fix shipped 2026-07-28 (commit `70de168`). `site:b-acoustics.com` still didn't show the homepage or any service page as of the 2026-07-31 SEO ranking check, 3 days post-fix (still expected — normal re-crawl windows run longer than this). **Re-check on the next SEO ranking run**; if still absent by ~2026-08-11 (~2 weeks post-fix), consider a manual indexing request (needs GSC access, still blocked). On the positive side, the quoted branded query `"B-Acoustics" acoustic consultant` now returns both blog posts as the top two organic results, up from further down the page last week.
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

- Final 2 blog posts of the "4-6 more" item — home theatre soundproofing cost
  and a new neighbour-noise/party-wall guide, both cross-linked and added to
  `sitemap.xml`/every footer (2026-08-01, not yet committed as of this
  writing — see `SEO_RECOMMENDATIONS.md`'s 2026-08-01 entry).
- GBP existence check (2026-08-01) — live Search/Maps confirm no B-Acoustics
  listing is findable; reframes open item #1 above.
- Service/blog page Lighthouse performance — removed ~350KB of inline base64 logo images per page, fixed the service-page hero photo to load eagerly from a relative path instead of lazily from an absolute production URL, tightened `lighthouserc.json`'s generic budget accordingly (2026-07-31, commit `5f8dc50`).
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
