# Continuous Improvement Tracker — b-acoustics.com

A weekly-cadence log of generic website improvement opportunities, informed by current
market/web trends and ranked by impact vs. effort. Companion to `SEO_RECOMMENDATIONS.md`
(which tracks SEO-specific work in more depth) — this file takes a wider lens across
performance, trust, accessibility, and AI-driven discovery/conversion trends.

## How to read the ranking

Each week's 5 items are ranked by **impact vs. effort** — highest-ratio "quick wins"
first, bigger/strategic bets later even if their absolute impact ceiling is higher.

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
