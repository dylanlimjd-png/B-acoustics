# Continuous Improvement Tracker — b-acoustics.com

A weekly-cadence log of generic website improvement opportunities, informed by current
market/web trends and ranked by impact vs. effort. Companion to `SEO_RECOMMENDATIONS.md`
(which tracks SEO-specific work in more depth) — this file takes a wider lens across
performance, trust, accessibility, and AI-driven discovery/conversion trends.

## How to read the ranking

Each week's 5 items are ranked by **impact vs. effort** — highest-ratio "quick wins"
first, bigger/strategic bets later even if their absolute impact ceiling is higher.

---

## Week of 2026-08-03

Items 3-5 from last week (2026-08-01) were queued but not started, so this
week's ranking carries them forward rather than duplicating them, plus 2 new
items surfaced by this week's SEO ranking check (see `SEO_RECOMMENDATIONS.md`).
Ranked by impact vs. effort:

| # | Topic | Impact | Effort | Why now |
|---|---|---|---|---|
| 1 | **Complete `FAQPage`/AEO schema coverage** — homepage and any blog posts still missing it | Med-High | Low | The 2026-07-27 AEO pass covered all 3 service pages but flagged the homepage and (at the time) both blog posts as gaps. 4 more posts have shipped since; audit which pages actually have `FAQPage` schema now and close the remainder. AI-answer-engine citation (AEO/GEO) increasingly keys off this. |
| 2 | **Structured-data validation pass** (Google Rich Results Test) across every page type | Med | Low | Schema has accumulated fast (`FAQPage`, `Article`, `ProfessionalService`, `BreadcrumbList` once #4 lands) with no single validation pass across all of it — cheap insurance against a silent markup error blocking rich results right as indexing is the active bottleneck. |
| 3 | **Re-run Lighthouse** now that the 2 new blog posts + inline SVG diagrams have landed | Med | Low | Carried over from last week (item 4) — sanity-check the perf budget (tightened 2026-07-31) still holds. |
| 4 | **`BreadcrumbList` schema** on blog/service pages | Low-Med | Low | Carried over from last week (item 3) — cheap structured-data add, no design changes needed. |
| 5 | **Content freshness pass** on the 2 oldest posts (office cost guide, STC vs NRC — both dated 2026-07-02) | Low-Med | Low | Carried over from last week (item 5) — `dateModified` hasn't moved since publish. |

**Status:** not started this session — idea generation only, per this week's
request. All 5 items are cheap/low-risk and actionable without user input;
good candidates for the next execution session.

---

## Week of 2026-08-01

Brainstormed with the user off the back of a specific observation: blog posts had zero
imagery, just unbroken text. Ranked by impact vs. effort:

| # | Topic | Impact | Effort | Why now |
|---|---|---|---|---|
| 1 | **Original diagrams for blog posts** | Med-High | Low-Med | User's own observation — every blog post was pure text (the NEA post's table was the one exception). A wall of text hurts dwell time and shareability, and a technical-diagram-heavy niche like acoustics is well-suited to Google Images traffic. Decided against stock/AI photos for the same authenticity reason flagged for GBP — original inline SVG/CSS diagrams in the site's existing flat style instead, no photography dependency. |
| 2 | **A `/blog/` index/hub page** | Med-High | Med | The site had zero page listing all posts — Google could only discover them via footer links. Reinforces topical clustering ("soundproofing Singapore") and directly supports the still-open homepage/service-page indexing gap. |
| 3 | **`BreadcrumbList` schema** on blog/service pages | Low-Med | Low | Cheap structured-data add, helps rich results and crawl clarity, no design changes needed. |
| 4 | **Re-run Lighthouse after the new posts/images land** | Med | Low | Sanity check — content and inline SVGs were just added; confirm the perf budget (tightened 2026-07-31) still holds before it drifts. |
| 5 | **Content freshness pass** on the oldest posts (office cost guide, STC vs NRC — both dated 2026-07-02) | Low-Med | Low | `dateModified` hasn't moved since publish; a light review/refresh signals freshness to crawlers without a full rewrite. |

**Progress:**
- **Items 1 and 2 — done 2026-08-01, same session.** 6 original SVG diagrams added (one
  per blog post, each with a title/desc for accessibility and matched to the post's actual
  content — a cost-vs-target curve, an STC/NRC room comparison, a grouped bar chart of the
  real NEA dB(A) table, an HDB-vs-condo approval flowchart, a wall-assembly cross-section,
  and a noise flanking-path diagram). New `blog/index.html` hub page lists all 6 posts,
  added to every page's nav (new "Guides" link) and footer ("All Guides" link), and to
  `sitemap.xml`. All verified locally via a live browser render (not just check-site/
  html-validate) before committing — caught and fixed one real bug this way (a legend
  label clipped off the edge of the home-theatre diagram's viewBox).
- **Items 3-5 — queued, not started this session.** See `STATUS.md`'s open items table.

---

## Week of 2026-07-26

| # | Topic | Impact | Effort | Why now |
|---|---|---|---|---|
| 1 | **AEO/GEO — Answer & Generative Engine Optimization** | High | Low–Med | Google AI Overviews now appear in ~60% of searches, and ChatGPT/Perplexity increasingly cite structured, question-answer content directly. We already built FAQ sections into this week's new service pages — the quick win is extending that pattern (explicit Q&A phrasing, `FAQPage` JSON-LD, concise directly-quotable answers) across the homepage and blog, since it's mostly content/schema work on a foundation that already exists. |
| 2 | **Core Web Vitals / page performance audit** | High | Low | Google's March 2026 core update folded LCP/INP/CLS into a composite score that now sits alongside content signals, not behind them. Average B2B mobile LCP is reportedly ~7s against a ~2.5s target, and bounce rate roughly quadruples between a 2s and 5s load. We already compressed images heavily in a prior pass, so this is likely a quick audit-and-confirm (PageSpeed Insights / GSC Core Web Vitals report) rather than a rebuild — but hasn't been formally checked since the image work landed. |
| 3 | **Trust signals & social proof** | Med–High | Low | GBP just went live this week with zero reviews yet — the single highest-leverage trust signal for local-intent B2B search is proof from real clients. Cheap to execute (a review-request flow, plus surfacing reviews/testimonials on-site once they exist) and compounds with the local SEO work already in flight. |
| 4 | **Accessibility (WCAG 2.2) pass** | Med | Med | Increasingly overlaps with both SEO (semantic structure Google's crawlers already reward) and legal/compliance exposure as WCAG enforcement broadens globally. The site's heading structure is already sound (audited in the original SEO pass), so this is likely a targeted pass — color contrast, focus states, form labeling, alt-text completeness — not a rebuild. |
| 5 | **AI chat agent for lead capture** | High (ceiling) | High | Industry data shows AI chat can convert visitors at roughly 4x the rate of static forms, and chatbots are trending toward table-stakes for B2B lead gen. Ranked last this week only because it's a genuine build (needs a backend, not just content/schema) — see the separate integration plan being scoped for this. Highest strategic upside on the list, but the biggest lift. |

**This week's suggested next action:** items 1–3 are all low-effort enough to likely fit
in a single session — worth tackling together. Item 4 can follow once reviews/GBP have
had a week or two to accumulate. Item 5 has its own planning doc in progress (see repo
root once drafted).

**Progress:**
- **Item 5 (AI chat agent) — done 2026-07-27.** Cloudflare Worker backend (enquiry
  email + chat API) built, deployed, wired into `index.html`, verified end-to-end, live.
  See `chat-agent-worker-backend-2026-07` project memory.
- **Item 1 (AEO/GEO) — done 2026-07-27.** `FAQPage` JSON-LD added site-wide: the 3
  service pages' existing FAQ sections, a new FAQ section on the homepage (5
  company-level Q&As), and new FAQ sections on both blog posts (4 Q&As each).
  Every page on the site now carries `FAQPage` schema. See `SEO_RECOMMENDATIONS.md`
  → Update — 2026-07-27.
- **Item 2 (Core Web Vitals) — audited 2026-07-27, bigger finding than expected.**
  This was NOT a quick audit-and-confirm as originally hoped. Live Lighthouse mobile
  scores: Performance 62, Accessibility 88, Best Practices 100, SEO 100. CLS is
  perfect (0), but **LCP is 7.6s** (target ~2.5s) — dominated by a 6.6s
  element-render-delay. Root cause is **not images** (the prior compression pass
  already fixed that) — it's structural: `index.html`'s "bundler" format ships the
  entire page as one ~420KB escaped-JSON document that must fully download, then be
  JS-decoded/decompressed/unpacked via `DOMParser` before *any* content (even plain
  hero text) can paint. Compounding it, the dc-runtime loads React/ReactDOM from an
  external `unpkg.com` CDN with no connection hint. Applied the safe, low-risk fix
  (a `preconnect` hint for `unpkg.com`, commit `de7261a`) — the real fix for the 6.6s
  delay is moving `index.html` off the bundler format onto plain static HTML (the
  same safe pattern the blog/service pages already use), which is a genuine
  re-platform of the homepage, not a quick tweak. Flagging for a dedicated future
  session if pursued.
  **RESOLVED 2026-07-28** — did the re-platform. `index.html` moved off the
  bundler format onto plain static HTML (matching `services/*.html`/`blog/*.html`);
  local Lighthouse mobile: Performance 74→95, LCP 5.4s→2.4s. This was also the
  confirmed root cause of the homepage not being indexed by Google — see the
  2026-07-28 update in `SEO_RECOMMENDATIONS.md`. Pushed as commit `70de168`.
- **Item 4 (Accessibility) — done 2026-07-28.** Direct audit (not a guess) found:
  alt text already complete site-wide (no action needed); 6 instances of
  `outline:none` on the homepage's contact-form/chat fields with no replacement
  focus style (WCAG 2.4.7 failure); none of the 5 contact-form labels had a
  `for`/`id` association (WCAG 1.3.1/4.1.2); the chat input had no accessible
  name. Fixed all three — label/for pairing, a global `:focus-visible` outline,
  and an `aria-label` on the chat input. Verified via Playwright: every field
  reachable by keyboard shows a visible focus ring and resolves to its correct
  label text. Pushed as commit `b570422`.

**PARKED — unresolved bug, 2026-07-27:** user reports a spacing issue right before
the "08 / Studio" section (on the live site) that **persists after two rounds of
attempted fixes** (commit `443e3fa` tightened the FAQ section's bottom padding and
removed a trailing border on the last FAQ item; verified via a local headless-
Chromium screenshot + raw pixel sampling that showed no stray border and a visibly
tighter gap — but the user confirmed on the real live site the same issue is still
there). This means either (a) the live site hadn't finished a CDN/cache propagation
when checked, (b) the actual issue is something other than what was diagnosed
locally (e.g. a real-browser/viewport-specific rendering difference, or a different
section boundary than assumed), or (c) the fix didn't address the root cause. Needs
a fresh look next session — ask the user for a screenshot or exact viewport/device
details rather than re-guessing blind, and hard-refresh (bypass cache) when
comparing against the live URL.

**New recurring activity — "SEO ranking" (started 2026-07-27), weekly cadence.**
A live-browser Google search check (no Google login — see
`seo-ranking-routine-2026-07` project memory for why and the exact method) of
actual organic visibility, indexing coverage, and GBP/local-pack presence. The
check itself still can't run unattended (cloud routines can't drive a browser;
session-local cron isn't durable across sessions) — but as of 2026-07-27, **a
`SessionStart` hook** (`.claude/hooks/seo-ci-reminder.sh`, wired in the personal/
gitignored `.claude/settings.local.json`) automatically checks the last-logged
date of both this activity and the weekly ranked-topics generation below, and
injects a reminder into context whenever either is ~7+ days stale — so it no
longer relies on remembering to check manually. Findings + resolution plans are
still logged in `SEO_RECOMMENDATIONS.md`, not here.

---

*Format for future weeks: append a new `## Week of YYYY-MM-DD` section above this line,
re-running the ranking against that week's current site state and market trends.*
