# Continuous Improvement Tracker — b-acoustics.com

A weekly-cadence log of generic website improvement opportunities, informed by current
market/web trends and ranked by impact vs. effort. Companion to `SEO_RECOMMENDATIONS.md`
(which tracks SEO-specific work in more depth) — this file takes a wider lens across
performance, trust, accessibility, and AI-driven discovery/conversion trends.

## How to read the ranking

Each week's 5 items are ranked by **impact vs. effort** — highest-ratio "quick wins"
first, bigger/strategic bets later even if their absolute impact ceiling is higher.

---

## Week of 2026-08-19

Last ranking pass was 2026-08-07 (12 days stale — all 4 of that batch's items shipped,
see `STATUS.md` #17-20). This pass is grounded in direct code/live-site inspection, not
guessed. Ranked by impact vs. effort:

| # | Topic | Impact | Effort | Why now |
|---|---|---|---|---|
| 1 | **`sitemap.xml`'s homepage entry has no `<lastmod>` at all**, and every other page's `<lastmod>` is frozen at 2026-08-07 or earlier | High | Trivial | Direct inspection: the homepage `<url>` block has `<loc>`/`<changefreq>`/`<priority>` but no `<lastmod>` tag, and it's had *more* real changes than any other page since 08-07 (phone NAP fix, Google Ads tag install 08-11, today's new work-grid photo + team rename) — none reflected. `lastmod` is a real re-crawl-priority signal, and this directly bears on the site's own tracked "homepage indexing gap" watch item in `STATUS.md`. |
| 2 | **`/api/enquiry` (Worker backend) has zero spam/abuse protection** — no rate limit, no honeypot field | Med-High | Low | Code inspection of `worker/src/index.js`: `/api/chat` already has IP-based KV rate limiting (`checkRateLimit`, line 102), but `/api/enquiry` — which sends a real email via Resend and now collects name/email/phone — has no rate limit and no honeypot at all. Wide open to being spammed/abused; the rate-limit pattern already exists to reuse. |
| 3 | **`llms.txt` contains a now-false claim**: "We do not publish named client case studies (client confidentiality)" | Med | Trivial | The site now shows a real, consented, named case study (Ultra Studio) plus a second real project (Corporate Office) in the homepage work grid — added 2026-08-07 and 2026-08-19 respectively. `llms.txt` is specifically read by AI crawlers/answer engines as a trust signal; a self-contradicting claim right next to the site's own portfolio is a bad look if an LLM cites it. One-sentence fix. |
| 4 | **Security response headers (partial CSP via `<meta http-equiv>`)** | Low-Med | Low (partial) | Carried over from Week of 2026-08-07, item 5 — never implemented. Still true: GitHub Pages serves no custom HTTP headers and DNS isn't proxied through Cloudflare, so a *full* fix needs a hosting decision (flag, don't act unilaterally), but a meta-tag CSP is doable now without infra changes. |
| 5 | **No WhatsApp click-to-chat CTA** (`wa.me` link) | Med | Low | The business's canonical contact number (+65 8784 7481, confirmed real and already the GBP/site NAP) is a mobile number, and WhatsApp is the dominant informal-enquiry channel for SG SMBs — checked, no `wa.me` link exists anywhere on the site. Cheap addition next to the existing "Enquire" CTA, no backend change needed. |

**Suggested next action:** items 1-3 are mechanical, low-risk fixes (no design
judgment calls) — safe to do in the same session once confirmed. Item 5 is a small
content/markup addition. Item 4 touches every page's `<head>` and risks breaking
Google Fonts/the chat Worker's cross-origin calls if the policy is too strict — needs
careful testing (CSP report-only first, or a narrow allowlist) before shipping, more
than the others.

**All 5 items done, same session (2026-08-19).**
1. `sitemap.xml` — added the missing homepage `<lastmod>`, bumped every page's date to
   its real last-changed date per `git log`.
2. `/api/enquiry` — added a honeypot field (`ba-contact-website`, visually hidden,
   `tabindex="-1"`) and reused the existing `checkRateLimit` KV pattern from `/api/chat`
   (generalized to accept a key prefix + limit; enquiry gets its own `enq` prefix, 8/day
   per IP). Deployed to the live Worker (`npx wrangler deploy`, user-confirmed since it's
   a live-backend push) and verified end-to-end: an honeypot-filled request returns
   `{"ok":true}` without an email being sent (short-circuits before the Resend call).
3. `llms.txt` — replaced the false "we do not publish named client case studies" line
   with an accurate one reflecting the real Ultra Studio/Corporate Office case studies
   (named only with client consent, generic otherwise).
4. Added a `wa.me/6587847481` "Message us" link to the homepage contact block, next to
   Phone.
5. **CSP via `<meta http-equiv>`** — added to all 14 pages. Turned out *not* to be safe
   to ship blind, exactly as flagged: a naive `img-src 'self' https://*.google.com
   https://*.doubleclick.net` allowlist broke Google Ads' conversion pixel, because it
   loads from country-TLD domains (`google.com.sg`, etc.) that a single-level CSP
   wildcard can't cover — no way to enumerate every ccTLD Google might use. Found via a
   real test, not guesswork: served the site locally and drove it with Playwright
   (`chromium.launch()`), which surfaced the exact blocked URL and directive in the
   console. Fixed by loosening `img-src` to `'self' data: https:` (images can't execute
   code, so this is a low-risk trade). Re-tested clean (zero CSP violations across
   homepage + a service page + a blog page, plus a full enquiry-form submission through
   the live Worker). A separate cluster of `net::ERR_ABORTED` Google Ads beacon
   requests showed up in both the with-CSP and a with-CSP-stripped control run —
   confirmed pre-existing headless-browser/gtag behavior, not caused by this change.
   Note: `frame-ancestors` is deliberately not in the policy — browsers silently ignore
   that directive when set via `<meta>` (HTTP-header-only), so including it would be a
   false sense of security.

---

## Week of 2026-08-07

The 2026-08-01/08-03 batch (items 12-16 in `STATUS.md`) is fully closed, so this
week's ranking is a fresh pass rather than carried-over items. Grounded in a direct
inspection of the live site (not guessed) plus current AEO/AI-crawler trends. Ranked
by impact vs. effort:

| # | Topic | Impact | Effort | Why now |
|---|---|---|---|---|
| 1 | **PDPA-compliant Privacy Policy page + consent microcopy on the enquiry form** | Med-High | Low | Direct inspection found no privacy/data-handling page anywhere on the site — only `disclaimer.html` (content-accuracy disclaimer, unrelated to data collection). The enquiry form collects name, email, and (as of this session) phone — 3 PII fields with zero stated basis, retention, or contact point for a data-protection query, which is a real Singapore PDPA gap for a live form actively collecting data, not a hypothetical one. Cheap to add: one page following the existing `disclaimer.html` template + a one-line consent note under the submit button. |
| 2 | **`llms.txt` at site root** | Med | Low | 2026 AEO/GEO trend: ChatGPT, Perplexity, and Claude increasingly consult a site's `llms.txt` (plain-Markdown index of key pages) to decide what to cite/summarize, the same way `sitemap.xml` targets traditional crawlers. The site has strong existing FAQ/schema coverage to point to — this is a low-effort way to make that legible to LLM crawlers specifically. Doesn't exist yet — checked. |
| 3 | **Custom 404 page** | Med | Low | GitHub Pages serves its own generic 404 for any broken/old link — doesn't exist as a repo file yet, checked. A branded 404 with links back to services/blog/contact recovers otherwise-lost traffic (old backlinks, typos, removed pages) and is trivial to add once `services/*.html`'s nav/footer pattern is reused. |
| 4 | **Internal cross-linking completeness pass** across all 6 blog posts + 3 service pages | Med | Low-Med | The 2026-08-03 freshness pass added cross-links to only 2 of 6 posts (the 2 oldest). The other 4 posts and the 3 service pages haven't been audited for whether they link to topically-related posts/services — cheap topical-authority and dwell-time win, mostly editing existing pages rather than new content. |
| 5 | **Security response headers (CSP/Referrer-Policy/Permissions-Policy/HSTS)** | Low-Med | Low (partial) / higher (full) | Checked live response headers — none of these are set. GitHub Pages doesn't support custom HTTP headers, and DNS resolves directly to GitHub's IPs (not proxied through Cloudflare, confirmed via `nslookup`), so a *full* fix needs a hosting/DNS change — that's an infra decision for the user, not something to do unilaterally. A partial mitigation (CSP via `<meta http-equiv>`) is possible without infra changes and worth doing regardless. |

**Suggested next action:** items 1-4 are all low-effort content/file additions that
don't touch hosting — worth doing together in one session. Item 5's partial (meta-tag
CSP) can ride along; the full version needs the user's call on whether to proxy DNS
through Cloudflare (bigger, unrelated to this ranking) — flag it but don't act on the
full version without asking.

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

**Progress:**
- **Items 1-3 — done 2026-08-03, same session.** Item 1 turned out to already
  be satisfied (homepage `FAQPage` schema was added in a prior session not
  reflected in memory — verified all 10 content pages now have matching
  visible-FAQ + schema, only the blog hub index correctly has none). The
  actual audit for item 2 surfaced 3 real defects instead: (a) every blog
  post's `Article.publisher.logo.url` pointed at `https://b-acoustics.com/#logo`
  — a URL fragment, not a real image, invalid per Google's structured-data
  guidelines; (b) `Article`/`ProfessionalService` schema had no `image` field
  anywhere (a recommended/required property for rich results); (c) zero pages
  set `og:image`/`twitter:image` despite `twitter:card` being
  `summary_large_image` site-wide, so every shared link (WhatsApp, Slack,
  LinkedIn, X) showed no preview image at all. Fixed all three using the real
  brand logo (`images/logo-dark.png`) — deliberately not the AI-placeholder
  project photos, consistent with the site's existing no-fake-imagery stance
  (see `Photo request list.md`). Also caught and fixed a mismatched headline
  in `blog/index.html`'s `hasPart` array (office-cost post) while auditing.
  `check-site`/`html-validate` clean after. Item 3 (Lighthouse re-run): all
  budget thresholds still cleared comfortably — homepage 0.92 perf/2.8s LCP,
  office-acoustics service page 0.93/2.7s, STC-vs-NRC blog 0.94/2.5s (budget:
  ≥0.8/≤4.0s homepage, ≥0.78/≤3.8s generic). Note: `npm run lighthouse`
  (`lhci autorun`) currently crashes on this Windows machine due to a
  `chrome-launcher` temp-dir cleanup bug (EPERM after each run, unrelated to
  site changes) — worked around by invoking the `lighthouse` CLI directly
  per-URL instead. CI's Linux runners aren't affected.
- **Items 4-5 — done 2026-08-03, later same day.** Item 4 (`BreadcrumbList`):
  added to all 6 blog posts, the blog hub index, and all 3 service pages —
  `Home > Guides > [post]` for blog content, `Home > [service]` for service
  pages. Homepage deliberately skipped (root page, no breadcrumb needed).
  Item 5 (content freshness): rather than just bumping `dateModified`, found
  real value to add — both of the 2 oldest posts predate 2 newer,
  topically-relevant posts (NEA boundary noise limits, home theatre cost)
  that didn't exist when they were written. Added a new section to the STC-
  vs-NRC post clarifying how STC/NRC (assembly performance ratings) differ
  from NEA's boundary noise limits (an absolute dB(A) level) — a real,
  common point of confusion — plus 2 new related-reading links; added a
  sentence + link in the office-cost guide pointing industrial readers to
  the NEA limits guide. `dateModified` (both posts) and `sitemap.xml`
  `lastmod` bumped to 2026-08-03 to reflect the actual edit made, not an
  artificial freshness signal. `check-site`/`html-validate` clean after both.

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
