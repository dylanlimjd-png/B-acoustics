# AI Chat Agent Integration — Planning Notes

Status: **planning only, not implemented.** Started 2026-07-26 per request to scope
integrating an AI chat agent into the site, in the context of the wider continuous
improvement stream (see `CONTINUOUS_IMPROVEMENT.md`, item 5).

## Important finding first: the contact form has no backend today

While tracing how a chat agent's captured leads would need to be delivered, I checked
the existing enquiry form's `submit` handler (in `index.html`'s decoded dc-runtime
component). **It only validates fields and sets local UI state (`submitted: true`) —
there is no `fetch()`, no email send, no data leaves the browser at all.** Visitors
see a genuine "Enquiry received" confirmation, but B-Acoustics never actually receives
anything. This predates this session and is unrelated to the chat agent, but it means
**the site is currently losing every lead submitted through the form** — worth fixing
independently of chat-agent work, and the fix is a prerequisite building block for chat
anyway (see architecture below). Recommend treating this as a high-priority item
alongside the ranked list in `CONTINUOUS_IMPROVEMENT.md`.

## Why now (market context)

AI chat converts significantly better than static forms for lead capture (~4x in
industry data), and 80% of B2B marketing/sales orgs have or plan to deploy chatbots.
For a boutique consultancy where every enquiry is high-value and low-volume, a well-
scoped assistant that qualifies the enquiry (commercial/residential/industrial, rough
scope) before a human ever sees it is a good fit — not a generic support bot.

## Architecture options

1. **Third-party hosted widget** (Intercom, Tidio, Chatbase, Crisp+AI, etc.)
   - Fastest to ship, no backend work.
   - Ongoing subscription cost; adds a third-party script to a site that currently has
     zero third-party scripts besides Google Fonts — a real privacy/performance
     tradeoff worth weighing given how deliberately lean this site is.
   - Limited control over voice/brand and exactly what it's allowed to say.

2. **Custom widget + Cloudflare Worker proxy to the Claude API** (recommended)
   - The repo already has an **open, unmerged PR (#1, "Add Cloudflare Workers
     configuration")** adding `wrangler.jsonc` for static deployment — meaning
     Cloudflare Workers is already the intended hosting path, not a new platform to
     introduce. A `/api/chat` Worker route calling the Anthropic API server-side (API
     key never exposed to the browser) is a natural extension of that same
     infrastructure, not a separate system.
   - Same Worker can also finally fix the contact-form backend (e.g. a `/api/enquiry`
     route that emails the studio or writes to KV/D1) — one small piece of backend
     infrastructure solves both the existing broken form and the new chat feature.
   - More engineering effort than option 1, but full control over brand voice, content
     scope, and no recurring third-party fee beyond Claude API usage + Cloudflare's
     generous free tier.

3. **Static FAQ-bot (no live model calls)**
   - Cheapest possible option, but the site already has strong FAQ content on the new
     service pages — a canned-answer bot adds little over just having good FAQ pages
     with real search visibility. Noted as a floor option, not recommended.

**Recommendation: option 2**, sequenced after (or alongside) fixing the contact form,
since they'd likely share the same Worker.

## Content/knowledge scope (if option 2 is chosen)

- Ground the assistant in the site's actual content — services, FAQ sections, blog
  posts, materials — via a system prompt (a lightweight approach is sufficient at this
  content volume; no need for a vector DB/RAG pipeline yet).
- Explicit boundaries: the assistant should qualify enquiries (space type, size, rough
  problem) and answer general acoustics questions already covered by the site, but
  **not** quote firm pricing or commit to appointment times — hand off to a human via
  the existing enquiry flow for anything requiring judgment or scheduling.
- Every chat session that reaches "ready to talk to someone" should feed into the same
  lead pipeline as the fixed contact form, not a separate untracked channel.

## Technical note specific to this codebase

`index.html` is a bundler export — real page content lives inside an escaped JSON
string, not plain HTML (see `index_html_bundler_format` memory/prior sessions). Adding
a chat widget script tag means editing the decoded template (same decode → edit →
JSON.stringify → escape `</script>` → verify round-trip workflow used for every prior
`index.html` change this project), not just the static outer shell.

## Suggested phasing

1. Fix the contact form backend (Cloudflare Worker + KV/D1 or email send) — small,
   high-value, unblocks lead capture regardless of chat-agent timeline.
2. Ship a narrowly-scoped chat widget (option 2) reusing that Worker, with a tight
   system prompt and a hard handoff-to-human boundary.
3. Measure: does chat engagement correlate with enquiry submissions? Only expand scope
   (richer qualification, CRM handoff, multi-language) if the pilot earns it.

## Open questions for the user before implementation starts

- Confirm Cloudflare Workers is the desired hosting path (vs. merging PR #1 as-is,
  which only configures static deployment, not an API backend).
- Where should qualified leads actually go — email inbox, a spreadsheet/CRM, Slack?
  (This also applies to fixing the plain contact form.)
- Budget/appetite for Claude API usage cost (likely small at this site's traffic
  volume, but worth confirming before committing to option 2 over option 1).
