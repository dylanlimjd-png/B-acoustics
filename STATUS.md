# Project Status — b-acoustics.com

**Single consolidated view of everything outstanding across all trackers.**
Check this file first at the start of a session instead of opening
`SEO_RECOMMENDATIONS.md`, `CONTINUOUS_IMPROVEMENT.md`, `DESIGN_FEEDBACK.md`,
and `Photo request list.md` separately — those remain the detailed logs
(method, findings, reasoning) for their respective activities; this file is
just the rollup of what's still open, updated whenever any of them change.

Last updated: 2026-07-28.

## Open items

| # | Item | Priority | Blocked on | Source |
|---|---|---|---|---|
| 1 | Real GBP photos — shot list ready, not yet taken/uploaded | High | You (needs a site visit) | `Photo request list.md` |
| 2 | First GBP reviews — solicit from real clients | High | You (client outreach) | `CONTINUOUS_IMPROVEMENT.md` Item 3, `DESIGN_FEEDBACK.md` |
| 3 | Mobile nav has no hamburger/collapse — wraps awkwardly on narrow viewports | Medium | — | `DESIGN_FEEDBACK.md` |
| 4 | Off-page authority: SG directory listings, MIOA, architecture/interior-design outreach, press | Medium | — | `SEO_RECOMMENDATIONS.md` |
| 5 | 4-6 more blog posts (candidates: home theatre soundproofing cost, NEA boundary noise limits, HDB vs condo rules) | Medium | — | `SEO_RECOMMENDATIONS.md` |
| 6 | Broader WCAG 2.2 pass (focus states, form labeling, alt-text completeness) — today's fix only covered accent-orange contrast | Medium | — | `CONTINUOUS_IMPROVEMENT.md` Item 4 |
| 7 | `AggregateRating`/`Review` schema | Low | #2 (needs real reviews to exist first) | `SEO_RECOMMENDATIONS.md` |
| 8 | Dead Instagram footer link (`href="#"`) | Low | — | `DESIGN_FEEDBACK.md` |
| 9 | Optional H1 A/B test | Low | — | `SEO_RECOMMENDATIONS.md` |

## Watch items (not actionable yet, just checking periodically)

- **Homepage indexing gap** — structural fix shipped 2026-07-28 (commit `70de168`). `site:b-acoustics.com` still didn't show the homepage as of the 2026-07-28 SEO ranking check (expected — too soon after the fix). **Re-check on the next SEO ranking run**; that's the real pass/fail signal.
- **GSC-capable MCP connector** — not connected as of last check. Would unblock real daily/weekly SEO data automation. Ask "is a Search-Console connector available now?" next session.
- **GitHub App install on `dylanlimjd-png/B-acoustics`** — not verified as of last check. Needed before the weekly tracker doc can be committed by an unattended cloud routine.
- **Blank favicon in Google search results** — not due for a recheck until ~2026-08-13 (one month after it shipped).

## Recently resolved (kept briefly for continuity, drop once confirmed stable)

- ~~Parked spacing bug before "08/Studio" section~~ — **likely moot as of 2026-07-28**: the homepage was fully re-platformed that day (see below), regenerating the whole DOM structure. The FAQ→Studio boundary looked clean in that day's design-feedback screenshots and in a direct production HTML check. Confirm on next visual pass; remove this line once confirmed.
- Homepage bundler-format → plain static HTML re-platform (2026-07-28, `70de168`) — fixed the indexing-gap root cause and a 6.6s LCP render delay (Lighthouse: 74→95, LCP 5.4s→2.4s).
- Accent-orange WCAG contrast failure on light backgrounds, site-wide (2026-07-28, `78799bf`).
- Service-page visual consistency — hero photos, step tags, FAQ dividers, dark closing CTA band (2026-07-28, `3352352`).
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
