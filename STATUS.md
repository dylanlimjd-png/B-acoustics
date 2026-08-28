# Project Status — b-acoustics.com

**Single consolidated view of everything outstanding across all trackers.**
Check this file first at the start of a session instead of opening
`SEO_RECOMMENDATIONS.md`, `CONTINUOUS_IMPROVEMENT.md`, `DESIGN_FEEDBACK.md`,
and `Photo request list.md` separately — those remain the detailed logs
(method, findings, reasoning) for their respective activities; this file is
just the rollup of what's still open, updated whenever any of them change.

Last updated: 2026-08-28 (GSC/Ads diagnostics + a full design/graphic/editorial audit, both shipped, CI green).

**2026-08-28 session, part 2 (design/graphic/editorial audit):** user
reported a spacing bug via screenshot (overlapping x-axis labels on the NEA
boundary noise limits blog diagram) and asked for a wholistic check for
other design/graphic/editorial errors site-wide. Root cause diagnosed
directly from the SVG markup (a text label wider than its allotted bar-group
spacing) and fixed — commit `0a3c90b`, verified in a live render. Extended
the check to: the other 5 blog diagrams (same technique, all clean — no
other instance of the bug class), a full read-through of every page's prose
for typos/grammar/factual consistency (none found), and a live screenshot
pass over homepage sections not covered by the 2026-07-28 design review
(testimonial, materials, work grid, studio, process — all clean). One
cosmetic, non-urgent naming wrinkle flagged: the new testimonial names the
project "Ultrastudio Live, our second music studio" right next to a
"Ultra Studio" work-grid tile (the client's *first*, different project) —
factually correct but reads as a possible typo without context. Full
findings and method in `DESIGN_FEEDBACK.md`'s 2026-08-28 entry.

**2026-08-28 session, part 1 (GSC/Ads diagnostics):** user asked for a full diagnostic pass on both
the indexing gap and Google Ads, with a one-time exception to the standing
"no Google login" policy for GSC and Ads specifically (their explicit call, asked
first, not assumed). Real findings, not guesses:
1. **GSC diagnostics.** `site:` was still showing only 2 pages (item #29,
   unchanged for ~32 days). Root cause found: the sitemap was last read by
   Google on **21 Jul** despite being updated repeatedly since, discovering
   only 3 of 13 URLs. **Resubmitted the sitemap** to force a fresh read.
   Homepage: crawled twice (most recently 4 Aug), fully crawlable/indexable —
   Google simply hasn't chosen to index it (authority/trust judgment on a
   young, low-backlink domain — 6 total organic clicks in 90 days — not a
   bug). The 3 service pages were **completely unknown to Google**, never
   crawled at all. **Submitted manual indexing requests for the homepage +
   all 3 service pages.** Technical basics all confirmed clean: robots.txt,
   canonical tags, meta robots, http/www→https redirects.
2. **Google Ads diagnostics — root cause of item #25 found and fixed.**
   Account: single Performance Max campaign "B-Acoustics", SGD15/day,
   spending and getting impressions/clicks normally (SGD175/7,069 impr. over
   28 days) — the ads themselves are fine. But **0 conversions ever
   recorded**. Two pre-existing conversion actions ("Submit lead form" via
   GA4 import, "Contact" via Website auto-detection) were both
   Misconfigured/never received data — root cause: the enquiry form submits
   via `fetch()` with no page navigation, so Google's auto-detection (which
   watches for a navigation/URL change) never fires. This is exactly what
   item #25 was blocked on. **Fixed live**: created a new manual "Submit lead
   form" conversion action in Ads (event snippet, not GA4/auto-detect),
   wired `gtag('event','conversion',{'send_to':'AW-18350815493/R4F8CJ_4rekcEIXyrK5E'})`
   into `index.html` right after a successful `/api/enquiry` response
   (commit `1c49c25`). Verified two ways before considering it done: the
   exact snippet executed cleanly in a live browser with no exception, and
   the resulting network beacon to `google.com/pagead/1p-conversion/...`
   carried the correct label `R4F8CJ_4rekcEIXyrK5E`. A real end-to-end form
   submission wasn't used to verify (would have emailed a real notification
   to the business inbox from a local test origin the Worker's CORS
   would've rejected anyway). Deployed and confirmed live via `curl` against
   the production homepage post-deploy. The two old misconfigured conversion
   actions were left in place (inert, never fired, low risk) rather than
   deleted — flagged below as an optional cleanup.
`check-site`/`html-validate` both clean; single-line diff.

**2026-08-26 session (full recap):** three things, all committed:
1. **SEO ranking check** (full 9-query rotation, first since 2026-08-07 — see
   `SEO_RECOMMENDATIONS.md`'s 2026-08-26 entry). Headline finding: the
   `site:b-acoustics.com` indexing gap is still unchanged, now ~29 days past the
   homepage re-platform fix and well past the 2026-08-11 checkpoint — flagged more
   strongly this run, still blocked on GSC access. Branded-query visibility has
   plateaued at zero rather than still declining. New local-pack check: B-Acoustics
   doesn't yet appear in the Places pack for non-brand local-intent queries. Real
   positive: **GBP review count grew 1→2** (new named review from a client band,
   "Ultraband," about a second studio project).
2. **Continuous-improvement Week of 2026-08-26, items 1-4 shipped** (see
   `CONTINUOUS_IMPROVEMENT.md`'s entry): a new homepage testimonial section quoting
   the real new GBP review (no `AggregateRating` schema yet — still holding off per
   the 2026-08-07 decision), `og:image`/`twitter:image` swapped from the logo to a
   real project photo, `sameAs` added to the `ProfessionalService` schema linking
   the live GBP listing, and a `Referrer-Policy` meta tag added. Item 5 (RSS feed)
   not started.
3. **Google Ads image-generation prompts, then a full round-trip to real assets.**
   User provided a screenshot of Google Ads' asset-group image picker (needs 2
   horizontal/2 square/1 vertical to reach "Excellent ad strength"); wrote 5
   prompts matched to the site's existing photo style, saved to
   `google-ads-image-prompts.md` (repo root, user's own reference — not site
   content). User then asked to mix in a residential/WFH-homeowner angle
   alongside the commercial one and to compare AI image tools for
   photorealism — prompts rewritten (2 commercial, 2 residential/WFH, 1
   neutral material shot) and a tool comparison added (Midjourney/FLUX/
   Firefly/GPT-image-1). User generated candidates from a couple of different
   tools, then decided to keep only the ChatGPT-generated set
   (`Google ads image cpt 1-5.png`) and asked to remove the rest — deleted 5
   other candidate images (`google ads pic 1-3.jpeg`, `4google ads pic
   3.jpeg`, `Google ads davinci home 1.png`) after confirming exactly which
   ones to keep. The final ChatGPT set maps cleanly onto all 5 required
   slots (two ~1.9:1 horizontals, two exact 1:1 squares, one exact 4:5
   vertical) — ready for the user to upload directly. None of these image
   files are committed to git (stay local, same convention as other loose
   reference screenshots in the repo root). Noted for the user: the ad
   account's 5 *pre-existing* images (before this session) are crops of `GBP
   photo 1/2.png`, which memory flags as AI placeholders never meant for
   public/live use — not something this session changed, just worth
   awareness next time that asset group is reviewed.

`check-site`/`html-validate` both clean after item 2's edits; new testimonial
section verified via local server + live browser screenshot before committing.

**Session-end note:** the last two STATUS.md-only commits (`5d88132`, `e068119`)
hit what looks like a transient GitHub Actions hiccup — the `CI` run for `5d88132`
came back `startup_failure` after 0 seconds (nothing in this session touched
`.github/workflows/`, and the same workflow had already run clean twice earlier
tonight), and `pages build and deployment` runs were stuck `queued` for 20+
minutes. Didn't keep polling since CI is advisory-only and doesn't gate the live
deploy. **Next session: check `gh run list` first** — re-dispatch `ci.yml`
manually if it's still red/missing for the latest commit, same as the routine
visual-baseline re-sync check.

**2026-08-19 session (full recap):** four pieces of work, all committed and
deployed:
1. **New real project photo.** User provided 10 photos of a completed
   commercial office fit-out (consent confirmed, no client name — generic
   "Corporate Office" descriptor). Cleanest shot converted to `.webp`
   (`images/commercial-office-acoustic-panels.webp`) and added as a **new
   4th tile** in the homepage work grid, alongside Ultra Studio (the only
   other real photo — Home Theatre/Industrial Plant tiles are still
   generic/stock). All 10 raw originals archived `photos/project-3/`.
   Commit `bcb1a75`.
2. **Team listing rename** — "Ivan Cheong" → "Mr Cheong" in the homepage
   Studio section, same commit. (Historical GBP-reviewer references to
   "Ivan Cheong" elsewhere left as-is — factual record of who reviewed, not
   the team roster.)
3. **CI housekeeping** — `visual-regression` failed sitewide after the
   above push. Root cause: baselines hadn't been regenerated since
   2026-08-01 despite 10 real content commits since (not a bug — see
   [[ci_visual_baseline_maintenance_2026-08]] in memory for the full
   diagnostic method). Re-baselined twice this session (once after the
   photo/rename push, again after item 4 below added a WhatsApp link);
   `ci.yml` manually re-dispatched both times to confirm green (bot pushes
   don't auto-trigger workflows).
4. **Continuous-improvement Week of 2026-08-19, all 5 items shipped**
   (commit `99dfde6`): `sitemap.xml` lastmod fix, `/api/enquiry` spam
   protection (honeypot + rate limit — **Worker deployed live**), `llms.txt`
   false-claim fix, WhatsApp click-to-chat CTA, partial CSP via `<meta>` on
   all 14 pages (a naive allowlist would have silently broken the Google
   Ads conversion pixel — caught via a real headless-browser test before
   shipping, not guessed). Full detail in `CONTINUOUS_IMPROVEMENT.md`'s
   2026-08-19 entry.

Item #25 (Google Ads conversion-action label) checked again this session —
still no new screenshot in the working directory (only file present is the
already-handled base-tag one from 08-11). User will provide it later; no
change to that item's status below.

**End state: working tree clean, `main` fully pushed, CI all-green
(`lint-and-links`, `lighthouse`, `visual-regression`).**

**2026-08-11 session:** installed the Google Ads base tag (`gtag.js`, `AW-18350815493`)
in `<head>` on all 14 pages, per a screenshot the user saved of Google Ads' manual-install
instructions (commit `c9d944c`). Verified live on the deployed site (not just committed) —
polled the GitHub Pages build API until the deploy finished, then confirmed the tag renders
correctly on the homepage, privacy page, blog index, a service page, and 404. `check-site`/
`html-validate` both clean. Google Ads dashboard-side "tag detected" status wasn't checked
(requires being logged into the user's Google Ads account — standing preference from
[[seo_ranking_routine_2026-07]] is no Google account logins by Claude; user needs to confirm
that side themselves).

**Session paused here — user is stopping for the day, mid-task on the next item.**
User then asked to add conversion-action tracking for the enquiry-form submission
(the exact JS hook point is already identified: `index.html` lines ~634-636, right
after a successful `/api/enquiry` POST where the form is hidden and the success
message shown — just needs one `gtag('event', 'conversion', {'send_to': '...'})`
call inserted there). **Blocked on getting the real per-conversion label from the
user** — they pasted three different wrong values in a row (the placeholder example
text verbatim, the account-level `AW-18350815493` ID we already have, and a `GT-`
prefixed container ID) rather than the actual label. Asked the user to screenshot
the conversion action's "Tag setup" panel (same method as the original tag
screenshot) instead of retyping it, to stop the mix-ups. **Next session: check the
working directory for a new screenshot before asking again** — if one's there, read
the label off it directly and wire in the event snippet.

**2026-08-05 session:** at the user's request, reduced legal/liability exposure
in the guide content: the blog posts and service pages state real Singapore
laws/regulations (Community Disputes Resolution Act, NEA boundary noise
limits, HDB/MCST approval rules) and, in one case, a specific fine amount
(S$1,500) — risky to assert as settled fact since these can change and the
business could be implicated if a reader relied on stale figures. Added a
"general information, not legal/compliance/cost advice" callout to all 6 blog
posts and all 3 service pages, softened the highest-risk specific claims
(removed the stated S$1,500 fine figure and a specific "November 2024
amendment" date in the neighbour-noise post, added "confirm current limits
with NEA" caveats around the NEA dB(A) table and HDB permit hours), and kept
project cost-range figures as-is (user's call — those are our own business
estimates, not legal facts, and are the reason those two pages exist). Named
laws/regulations themselves were kept (naming what something is called isn't
the risky part) — only exact figures/dates/fines got hedged. Added a new
sitewide `disclaimer.html` page (linked from every page's footer: "General
information, not legal advice") laying out the general-information/no-liability
position in full. `check-site.js` and `html-validate` both pass clean across
all 12 pages including the new one. **Committed and pushed** (`5f65aa8`).

Also this session: the user added real completed-project photos to the repo
root (`Project 1 - 1.jpeg` through `Project 1 - 6.jpeg`, `Project 2 - 1.jpeg`
through `Project 2 - 9.jpg` — both projects office/commercial). These are
**not yet usable on GBP or the website — client consent to publish them
publicly has not been confirmed yet.** See
`gbp_photo_files_still_placeholders_2026-08` in memory for the full plan once
consent is confirmed (replace the 3 generic stock photos in `index.html`'s
"Selected work" section; add to GBP gallery once the listing itself exists).
Item #2 below updated to reflect this.

**Session paused here — user is stopping for the day.** The legal-liability
work above is committed and pushed to `main` (`d06dd97`). One thing was still
mid-flight at pause time: the SEO ranking check (9-query rotation, kicked off
this session) was running in the background and had not reported results yet
— **pick this up first next session**, check `SEO_RECOMMENDATIONS.md`/this
file for whether it completed unattended, and if not, re-run it. Also check
whether the user has confirmed client consent on the Project 1/2 photos in
the meantime.

**2026-08-03 session:** ran the two recurring check-in activities. SEO ranking
check (full 9-query rotation): indexing gap unchanged (`site:` still shows
only the original 2 blog posts), organic/GBP visibility still zero everywhere,
and a new watch item — the quoted branded query `"B-Acoustics" acoustic
consultant` regressed from 2 organic results last run to 1, now outranked by
an unrelated same-initial competitor ("a/b acoustics", Brisbane); see
`SEO_RECOMMENDATIONS.md`'s 2026-08-03 entry. Continuous-improvement weekly
idea generation produced a new ranked 5-item list (`CONTINUOUS_IMPROVEMENT.md`
Week of 2026-08-03) — items 3-5 from last week's list carried forward since
they were never started, plus 2 new items (complete `FAQPage`/AEO schema
coverage; a structured-data validation pass). Then built out items 1-3
from that new list same session: fixed 3 real structured-data defects (broken
`publisher.logo.url`, missing `image` fields, missing `og:image`/
`twitter:image` site-wide — see `CONTINUOUS_IMPROVEMENT.md`'s 2026-08-03
entry) and confirmed Lighthouse budgets still hold after the new content.
Also found and fixed a real bug in the SessionStart reminder hook
(`.claude/hooks/seo-ci-reminder.sh`): it was reading the *oldest* `## Week of`
heading in `CONTINUOUS_IMPROVEMENT.md` instead of the newest, because that
file prepends new entries at the top while the hook assumed the same
append-at-bottom order `SEO_RECOMMENDATIONS.md` uses. Fixed and verified.

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

**All of items #12-16 are now built out** (see the ranked table below) — the
2026-08-01/08-03 brainstorm queue is fully closed. Pick up next by checking
whether the user has made progress on #1/#2/#6/the `Pending Assets` PDF's
checklist, or run a fresh continuous-improvement idea-generation pass.

## Open items — ranked 2026-07-28

Ranked by impact vs. effort (same method as `CONTINUOUS_IMPROVEMENT.md`'s
weekly ranking), with an explicit **Actionable** column since two of the
highest-impact items require you personally (a site visit, client
outreach) and can't be started in a coding session.

| Rank | Item | Impact | Effort | Actionable by me now? | Source |
|---|---|---|---|---|---|
| 1 | First GBP reviews — solicit from real clients | Very High | Low (for you) | **Progress 2026-08-26**: review count grew 1→2 organically (new named review from client band "Ultraband", about a second studio project) — now also quoted directly on the homepage (see item 28 below). Still just 2; keep soliciting more. No address on GBP is deliberate (no physical studio) — confirmed by user. | `SEO_RECOMMENDATIONS.md` 2026-08-26 entry |
| ~~2~~ | ~~Real GBP photos~~ — **PARTIALLY DONE 2026-08-07**: client consent confirmed (both branding/name visibility and individuals in-frame). Website side shipped, commit `a6c4a9d` — the homepage's "Selected Work" grid now shows a real completed installation (Ultra Studio, a recording/rehearsal studio) instead of a stock photo. GBP-side still blocked on item #1 (no verified listing exists yet to add photos to). All 14 raw originals archived under `photos/` for that future use. | High | Low (just need consent confirmed) | Done (website); GBP side blocked on #1 | `Photo request list.md`, memory `gbp_photo_files_still_placeholders_2026-08` |
| ~~3~~ | ~~Mobile nav has no hamburger/collapse~~ — **FIXED 2026-07-28**, commit `2f817d6` | High | Low-Medium | Done | `DESIGN_FEEDBACK.md` |
| ~~4~~ | ~~WCAG pass~~ — **FIXED 2026-07-28**, commit `b570422`: label/for association, focus-visible outlines, chat input accessible name (real failures found via direct audit — alt text was already complete, checked and confirmed) | Med-High | Medium | Done | `CONTINUOUS_IMPROVEMENT.md` Item 4 |
| ~~5~~ | ~~4-6 more blog posts~~ — **DONE**: 2026-07-28 commit `bd31a0c` (NEA boundary noise limits, HDB vs Condo) + 2026-08-01 (home theatre soundproofing cost, neighbour-noise/party-wall guide). Item fully closed. | Medium | High | Done | `SEO_RECOMMENDATIONS.md` |
| 6 | Off-page authority: SG directory listings, MIOA, outreach, press | High ceiling, slow | Very High, ongoing, partly needs your relationships | **Research done** (`Backlink Targets.md`, commit `a302e1a`) — actual submission needs you | `SEO_RECOMMENDATIONS.md` |
| 7 | `AggregateRating`/`Review` schema | Low until #1 exists | Low | GBP now has 2 real reviews (5.0★). Still holding off on the schema-level claim per the 2026-08-07 decision (thin count) — but added a plain visible testimonial quote instead 2026-08-26 (item 28), which carries no such risk. Revisit the schema once review count grows further. | `SEO_RECOMMENDATIONS.md` |
| ~~8~~ | ~~Dead Instagram footer link~~ — **FIXED 2026-07-28**, commit `b570422` (removed until a real profile URL exists) | Trivial | Trivial | Done | `DESIGN_FEEDBACK.md` |
| 9 | Optional H1 A/B test | Low, needs analytics infra we don't have | Medium | No — no infra | `SEO_RECOMMENDATIONS.md` |
| ~~10~~ | ~~Service/blog page performance~~ — **FIXED 2026-07-31**, commit `5f8dc50`: root cause was two oversized logo PNGs embedded as inline base64 in every `services/*.html`/`blog/*.html` page (~350KB of dead weight per page, invisible to `check-site.js` since it skips `data:` URIs) plus the hero photo on service pages being `loading="lazy"` and fetched from an absolute production URL instead of the local static file. Replaced with the same relative-path + eager-hero pattern the homepage already used. Local Lighthouse: office-acoustics page 0.86 perf/2.6s LCP (was 0.78–0.83/up to 4.1s), stc-vs-nrc blog page 0.96 perf/2.3s LCP. `lighthouserc.json`'s generic budget tightened (0.72→0.78 min score, 4500→3800ms max LCP). | Medium | Medium | Done | This session |
| ~~11~~ | ~~Blog posts had no visuals~~ — **DONE 2026-08-01**: 6 original SVG diagrams (one per post) + new `/blog/` index hub page, wired into nav/footer/sitemap sitewide. | Med-High | Low-Med | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01 |
| ~~12~~ | ~~`BreadcrumbList` schema on blog/service pages~~ — **DONE 2026-08-03**: added to all 6 blog posts, the blog hub index, and all 3 service pages (Home > Guides > post for blog; Home > service for service pages). Homepage deliberately excluded — root page, no breadcrumb needed. `check-site`/`html-validate` clean. | Low-Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01, carried to Week of 2026-08-03 |
| ~~13~~ | ~~Re-run Lighthouse~~ — **DONE 2026-08-03**: all budgets still clear comfortably (homepage 0.92 perf/2.8s LCP, office-acoustics 0.93/2.7s, STC-vs-NRC blog 0.94/2.5s). `lhci autorun` hit a Windows-only `chrome-launcher` cleanup bug (EPERM, unrelated to site changes, CI's Linux runners unaffected); worked around via direct `lighthouse` CLI calls. | Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-03 |
| ~~14~~ | ~~Content freshness pass on the 2 oldest posts~~ — **DONE 2026-08-03**: both posts predated 2 newer topically-relevant posts (NEA boundary noise limits, home theatre cost) that didn't exist when they were written, so added real cross-links rather than just bumping a date — STC-vs-NRC gained a new section clarifying STC/NRC vs. NEA's dB(A) boundary limits (a genuine, common point of confusion) plus 2 new related-reading links; office-cost guide gained a sentence + link pointing industrial readers to the NEA limits guide. `dateModified` and `sitemap.xml` `lastmod` both bumped to 2026-08-03 to reflect the real edit. | Low-Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-01, carried to Week of 2026-08-03 |
| ~~15~~ | ~~Complete `FAQPage`/AEO schema coverage~~ — **turned out already done**: homepage + all 6 blog posts + all 3 service pages already have matching visible-FAQ + schema (fixed in an earlier, unlogged session). No action needed. | Med-High | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-03 |
| ~~16~~ | ~~Structured-data validation pass~~ — **DONE 2026-08-03**: found and fixed 3 real defects — broken `Article.publisher.logo.url` (URL fragment, not an image) on all 6 blog posts; missing `image` field on `Article`/`ProfessionalService` schema site-wide; zero pages had `og:image`/`twitter:image` despite `twitter:card=summary_large_image` (no link-preview image anywhere). Fixed with the real logo (not AI-placeholder photos). Also fixed a mismatched headline in `blog/index.html`'s `hasPart` array. | Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-03 |
| ~~17~~ | ~~Phone number field on the enquiry form~~ — **DONE 2026-08-07**, commits `5d634e7`/`d337f99`. Added to `index.html` form + `worker/src/index.js` (now included in the notification email). Verified end-to-end live (real browser submission + API call). | Med | Low | Done | This session |
| ~~18~~ | ~~PDPA privacy policy page~~ — **DONE 2026-08-07**, commit `4110f6a`. New `privacy.html` (data collected, why, third-party processors — Resend/Anthropic, retention, PDPA rights), linked from every page footer + a consent line under the enquiry form submit button. Timely given item 17 expanded the PII the form collects. | Med-High | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-07 |
| ~~19~~ | ~~`llms.txt` + custom 404 page~~ — **DONE 2026-08-07**, commit `4110f6a`. Both confirmed missing before adding. | Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-07 |
| ~~20~~ | ~~Internal cross-link gaps~~ — **DONE 2026-08-07**, commit `4110f6a`. `industrial-noise-compliance` service page now links to the NEA boundary noise limits guide (previously missing, despite that guide linking back); `office-acoustics` service page gained a second related link. | Low-Med | Low | Done | `CONTINUOUS_IMPROVEMENT.md` Week of 2026-08-07 |
| ~~21~~ | ~~Phone NAP mismatch (GBP vs. website)~~ — **DONE 2026-08-07**, commit `c98d77a`. User confirmed 8784 7481 is correct; website + chat-assistant Worker updated to match, redeployed. | Med | Low | Done | This session |
| ~~22~~ | ~~"Studio" address label implied a walk-in physical location~~ — **DONE 2026-08-07**, commit `f020eb2`. User confirmed no physical studio exists; relabeled to "Registered Office" on the homepage contact block. | Low | Low | Done | This session |
| ~~23~~ | ~~Text-overlap spacing bug on `/blog/` guides index~~ — **DONE 2026-08-07**, commit `f020eb2`. User-reported (screenshot) — a hardcoded `-24px` negative margin under the dek paragraph overlapped its last line whenever it wrapped to 4 lines. Fixed with normal non-negative margins; reproduced and confirmed fixed locally. Audited the rest of the site for the same pattern — it was the only instance. | Med | Low | Done | This session |
| ~~24~~ | ~~Google Ads base tag (`gtag.js`, `AW-18350815493`) install~~ — **DONE 2026-08-11**, commit `c9d944c`. Added to all 14 pages, verified live post-deploy. | Med | Low | Done | This session |
| ~~25~~ | ~~Google Ads conversion action for enquiry-form submission~~ — **DONE 2026-08-28**, commit `1c49c25`. Root cause: existing conversion actions relied on auto-detection that needs page navigation; the form uses `fetch()` so it never fired. Created a manual "Submit lead form" conversion action and wired its event snippet into the success handler. Verified live. | Med | Low | Done | This session |
| ~~26~~ | ~~Second real project photo (Corporate Office) added to homepage work grid~~ — **DONE 2026-08-19**. New 4th tile, `images/commercial-office-acoustic-panels.webp`, raw originals archived `photos/project-3/`. | Med | Low | Done | This session |
| ~~27~~ | ~~Continuous-improvement Week of 2026-08-19 (5 items)~~ — **DONE 2026-08-19**, same session. `sitemap.xml` lastmod fix, `/api/enquiry` spam protection (honeypot + rate limit, Worker deployed), `llms.txt` false-claim fix, WhatsApp CTA, partial CSP via meta tag (all 14 pages) — CSP required a real Playwright test to catch a broken Google Ads pixel allowlist before shipping. See `CONTINUOUS_IMPROVEMENT.md`'s 2026-08-19 entry for full detail. | Med-High | Low-Med | Done | This session |
| ~~28~~ | ~~Continuous-improvement Week of 2026-08-26, items 1-4~~ — **DONE 2026-08-26**, same session. New homepage testimonial section (real GBP review quote), `og:image`/`twitter:image` swapped to a real project photo, `sameAs` added to `ProfessionalService` schema (links the live GBP listing), `Referrer-Policy` meta tag. Item 5 (RSS feed) not started. See `CONTINUOUS_IMPROVEMENT.md`'s 2026-08-26 entry. | Med-High | Low | Done | This session |
| 29 | Homepage indexing gap — `site:b-acoustics.com` still only shows 2 blog posts | High | Low (given GSC access) | **Progress 2026-08-28**: user granted a one-time GSC login exception. Real root cause found — Google's sitemap read was stuck at 21 Jul (discovering only 3/13 URLs) despite repeated updates since; resubmitted it. Homepage crawled fine (4 Aug) but not indexed — authority/trust judgment on a young domain, not a bug. Submitted manual indexing requests for the homepage + all 3 service pages. Next check: does indexing actually improve after this — re-check `site:` in a week or two. | `SEO_RECOMMENDATIONS.md` 2026-08-26 entry, this session's diagnostics, watch items below |
| ~~30~~ | ~~Diagram spacing bug (NEA boundary noise limits blog post)~~ — **FIXED 2026-08-28**, commit `0a3c90b`. User-reported. Same wholistic session also swept all 5 other diagrams + full editorial copy + a homepage screenshot pass — no other real bugs found. | Med | Low | Done | This session, `DESIGN_FEEDBACK.md` 2026-08-28 entry |
| 31 | "Ultra Studio" vs. "Ultrastudio Live" naming wrinkle in the new testimonial | Low | Low | Cosmetic, factually correct (two different real projects for the same client) — flagged for next time that testimonial copy is touched, not urgent enough to edit a live customer quote unprompted. | `DESIGN_FEEDBACK.md` 2026-08-28 entry |

**All actionable-by-me items through 2026-08-26 are done, plus #2 partially
(website side) and #7 now technically unblocked (still thin on review count, holding
off the schema).** Everything remaining open needs you (#1's ongoing review
solicitation, the GBP-gallery half of #2, actual directory/association submissions
from #6, #29's GSC-access decision) or is a judgment call worth asking about (#7 —
add `AggregateRating` now with 2 reviews, or wait) or blocked on something outside
this session's control (#9). Next session: check whether the user has made progress
on those, pick up item 5 (RSS feed) from this week's list, or run a fresh
continuous-improvement idea-generation pass for new candidates.

## Watch items (not actionable yet, just checking periodically)

- **Homepage indexing gap** — tracked as open item **#29** above. 2026-08-28: real root cause found (stale sitemap read + authority judgment, not a bug) and manual indexing requests submitted for 4 pages — re-check `site:` in a week or two to see if it actually moves; if not, the sitemap/GSC side is now doing everything it can and the remaining lever is off-page authority (item #6).
- **Google Ads conversion data** — new 2026-08-28 conversion action (`R4F8CJ_4rekcEIXyrK5E`) just went live; check back in a few days that it's actually reporting conversions in Ads (Goals > Summary) and that Performance Max starts optimizing off real signal instead of flying blind.
- **Old misconfigured Ads conversion actions** — "Submit lead form" (GA4-based) and "Contact" (auto-detect-based) were left in place 2026-08-28 rather than deleted since they're inert (never fired) — optional cleanup: disable or delete them in Ads > Goals > Conversions once the new one is confirmed working, so they don't clutter the account.
- **Branded-query visibility** — downgraded from "active regression" to "stable at zero": the quoted query `"B-Acoustics" acoustic consultant` and bare `b-acoustics` have both shown 0 organic results across 3 consecutive runs now (2026-08-07, and again 2026-08-26). No longer needs flagging as newly-worsening each run, but still worth a periodic check.
- **Local pack absence** — new 2026-08-26 finding: a Places local pack now appears on 3 of the 6 target-keyword searches, but B-Acoustics isn't among the top-3 shown results on any of them. Same root cause as the indexing/authority gap above, not a separate issue — re-check alongside the next full rotation.
- **GSC-capable MCP connector** — not connected as of last check (2026-08-26). Would unblock real daily/weekly SEO data automation. Ask "is a Search-Console connector available now?" next session.
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

- SEO ranking check, full 9-query rotation (2026-08-26) — indexing gap unchanged
  (flagged more strongly, past checkpoint), branded-query decline plateaued at
  zero, GBP reviews grew 1→2. See `SEO_RECOMMENDATIONS.md`'s 2026-08-26 entry.
- Continuous-improvement Week of 2026-08-26, items 1-4 (2026-08-26) — homepage
  testimonial section, real-photo `og:image`, schema `sameAs`, `Referrer-Policy`.
- New Corporate Office project photo + team-listing rename (2026-08-19, `bcb1a75`).
- Continuous-improvement Week of 2026-08-19, all 5 items (2026-08-19, `99dfde6`) —
  sitemap freshness, enquiry-form spam protection, `llms.txt` fix, WhatsApp CTA,
  partial CSP.

*(Everything older than 2026-08-19 has been stable across several sessions —
dropped from this list per the file's own upkeep rule. Full history lives in
git log and the individual tracker files.)*

## How to keep this current

Whenever a tracker's action-table changes (an item gets fixed, a new one is
found, priority shifts), update this file's **Open items** table in the same
commit. When resolving something, move its line from "Open items" into
"Recently resolved" with the date/commit, and delete "Recently resolved"
lines once they've been confirmed stable for a session or two — this file
should stay short enough to read in one glance, it is not meant to be a full
history (the individual tracker files already are that).
