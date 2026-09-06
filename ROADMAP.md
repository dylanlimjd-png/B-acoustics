# Long-Term Roadmap — b-acoustics.com

Forward-looking strategy, distinct from `STATUS.md` (which is the backward-
looking rollup of what's done/open right now). This file answers "what
should we build/pursue next, and in what order" across SEO, Ads, design,
and business development — pulling together threads from
`SEO_RECOMMENDATIONS.md`, `CONTINUOUS_IMPROVEMENT.md`, `DESIGN_FEEDBACK.md`,
and `Backlink Targets.md` into one prioritized view.

Created 2026-08-28, at the user's request, after a session that fixed
Google Ads conversion tracking and diagnosed the homepage indexing gap.

## How to read this file

Five phases, roughly chronological but overlapping — later phases aren't
blocked on earlier ones finishing, just naturally follow once the
groundwork is in place. Each phase lists concrete actions with an
**Actionable by me (Claude)** note, since several of the highest-impact
items need the user personally (relationships, real project material,
business decisions) and can't be done in a coding session. Update phase
status inline as items move from planned → in progress → done; move
finished phases to the bottom once fully closed rather than deleting them,
so the reasoning stays visible.

---

## Phase 1 — Let current work land (next 2-4 weeks)

**Phase 1 — done as of 2026-09-06** for everything actionable by me; two
items still need you.

| Action | Actionable by me? |
|---|---|
| ~~Re-check GSC indexing coverage~~ — **done 2026-09-06**: real progress, `site:` now shows 3 pages (up from 2); sitemap + all 3 service-page indexing requests re-submitted. | Done |
| ~~Re-check Ads Goals > Summary~~ — **done 2026-09-06**: confirmed, the conversion action has recorded 2 real conversions. New issue found instead: an "Account is paused: Complete advertiser verification" banner needs you directly (`STATUS.md` item #33). | Done (surfaced a new user-action item) |
| Keep soliciting GBP reviews (still just 2) | No — needs you |
| Upload GBP photo gallery (website side done, all raw photos archived and ready) | No — needs you, ~10 minutes |
| ~~Finish the RSS feed~~ — **done 2026-09-06**. | Done |
| **NEW**: Resolve Google Ads advertiser verification before it blocks the campaign | No — needs you |

## Phase 2 — Authority & trust (1-3 months)

The site's biggest structural gap is a young domain with almost no
backlinks or third-party proof — this is what actually moves indexing and
organic rankings, more than further code changes will.

| Action | Actionable by me? |
|---|---|
| Submit to SG business/industry directories, MIOA, press outreach — research already done in `Backlink Targets.md` | No — needs you (relationships/submissions) |
| Turn "Selected Work" tiles into full case-study pages (problem → approach → result) once more real project photos exist — also gives Google more unique indexable content | Yes, once source material exists |
| Replace remaining 2 stock "Selected Work" tiles (Home Theatre, Industrial Plant) with real project photos as they become available | Yes, once photos exist |
| Revisit `AggregateRating`/`Review` schema once GBP review count justifies it (currently thin at 2) | Yes — judgment call on timing |

## Phase 2b — Marketing channel diversification (1-6 months, runs alongside Phase 2/3)

**Added 2026-09-06**, at the user's request for a long-term marketing plan
beyond SEO/Ads. B-Acoustics' actual buying pattern is relationship- and
referral-driven B2B — architects, interior designers, contractors, MCST/
facilities managers — more than pure organic search discovery, which the
site-only roadmap above doesn't fully address. These channels are lower
code-effort but higher relationship-effort; most need you.

| Action | Actionable by me? |
|---|---|
| **Referral/partnership channel**: reach out to architects, ID firms, and contractors who repeatedly need an acoustic consultant on their projects — a standing referral relationship (formal fee or informal reciprocal) compounds faster than cold SEO for B2B trades | No — needs your relationships |
| **Structured review-solicitation process**: turn review-asking from ad hoc into a standard step at project handoff (e.g., a short WhatsApp/email template sent to every client at completion) — the 2 existing reviews both came from real happy clients, the gap is process, not client satisfaction | Yes — I can draft the template; sending it each time needs you |
| **LinkedIn organic content**: B2B decision-makers (architects, developers, facilities managers) are more reachable there than via search for a young domain — post project case studies, before/after acoustic-treatment photos (once consented), and short "what we learned" technical notes | Partial — I can draft post copy, you post/own the account and relationships |
| **Case-study content marketing**: expand "Selected Work" tiles into full narrative case studies (problem → approach → measured result) — doubles as indexable content (Phase 3) and as LinkedIn/outreach material | Yes, once source material exists (ties to Phase 2's case-study item) |
| **Industry credibility**: MIOA membership/directory listing, SG business directories — research already done in `Backlink Targets.md`, submission needs you | No — needs you |
| **Press/PR angle**: the real, named Ultraband testimonial (a music studio client) is a usable local-press or trade-press hook ("local band builds custom studio") — more interesting to a journalist than generic B2B copy | No — needs you to pitch it, I can help draft |
| **Retargeting / remarketing**: once Ads advertiser verification is resolved and enough site traffic exists, a low-cost remarketing campaign to past site visitors is cheaper per lead than pure prospecting PMax | Yes, once verification is resolved and traffic justifies it |

## Phase 3 — Content & SEO expansion (3-6 months)

Deliberately paced after Phase 1/2 — no point compounding new content
before Google is reliably indexing what already exists.

| Action | Actionable by me? |
|---|---|
| New blog posts, once the current 6 show real ranking traction | Yes |
| New service/vertical pages, if search data reveals demand not covered by the existing 3 | Yes, once demand is identified |
| Revisit the GA4 decision (currently deliberately not installed — Cloudflare Web Analytics + Ads conversion pixel only) only if a specific question comes up neither can answer | No — business/privacy decision for you |

## Phase 4 — Paid growth (ongoing, once Ads data accumulates)

| Action | Actionable by me? |
|---|---|
| Let Performance Max run a few weeks on real conversion data before making bidding/budget changes | N/A — just needs time |
| Review ad strength/Quality Score once real data exists; consider a Search campaign alongside PMax for more control | Yes, with Ads access |
| Landing-page A/B testing — currently blocked (item #9 in `STATUS.md`), needs both enough Ads traffic and an analytics signal to test against | Blocked until infra exists |
| Clean up the two old misconfigured conversion actions in Ads once the new one is confirmed working | Yes, with Ads access |

## Phase 5 — Platform maintenance (ongoing, low-effort)

| Action | Actionable by me? |
|---|---|
| Keep CI green (visual regression, Lighthouse, schema/link validation) | Yes |
| Periodic design-feedback-loop runs (now covers graphic/editorial too, not just look/UX) | Yes, when triggered |
| Watch for blog cadence outgrowing hand-authored static HTML — not a problem at current scale, just a scaling flag | N/A — monitoring only |

---

## The recurring theme

Most of what's actually blocking growth needs the user personally — real
reviews, outreach relationships, project photos/case-study material — not
more code. The technical foundation (CI, schema, performance, now Ads
tracking) is in solid shape; the constraint has shifted to real-world
business inputs.

**Update 2026-09-06**: this held up under a fresh ranking check. Non-branded
target keywords are still at zero — including a page that's indexed but
still doesn't rank for its own exact topic, which is direct evidence the
bottleneck really is off-page authority, not content or indexing mechanics.
The one genuinely positive movement (branded-query visibility recovering,
`SEO_RECOMMENDATIONS.md`'s 2026-09-06 entry) came from real-world signals
(the new GBP review, direct traffic), not a code change — reinforcing why
Phase 2b above leans on relationships and referrals rather than more
technical SEO work.

## How to keep this current

Update phase tables inline as items move status. When a phase is fully
closed, add a `**Phase N — done as of YYYY-MM-DD**` note at its heading
rather than deleting it — this file is a living strategy doc, not just a
checklist, so the reasoning behind sequencing should stay legible over
time. Re-derive priorities from `STATUS.md`'s open items and the individual
tracker files' latest entries at the start of a new phase, rather than
assuming this file's phase order is still right — priorities can shift
(e.g. a new blocker, a business decision, real data changing the picture).
