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
- **Item 1 (AEO/GEO) — partially done 2026-07-27.** `FAQPage` JSON-LD added to all 3
  service pages' existing FAQ sections. Homepage and the 2 blog posts still have no
  FAQ section/schema — that's the remaining increment if this item is picked back up.
  See `SEO_RECOMMENDATIONS.md` → Update — 2026-07-27.

---

*Format for future weeks: append a new `## Week of YYYY-MM-DD` section above this line,
re-running the ranking against that week's current site state and market trends.*
