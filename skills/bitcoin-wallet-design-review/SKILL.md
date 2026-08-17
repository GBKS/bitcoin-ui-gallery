---
name: bitcoin-wallet-design-review
description: Router for automated product/design reviews of bitcoin wallets, using the Bitcoin UI Gallery (github.com/GBKS/bitcoin-ui-gallery) as the screenshot source and the Bitcoin Design Guide (bitcoin.design) as the reference standard. Use this whenever someone asks to review, critique, audit, or evaluate a bitcoin wallet's UX, onboarding, copy, positioning, or product design — even if they just paste a wallet name and a link to this skill without further detail. Also trigger on requests like "run today's wallet review," "do a design pass on [wallet]," or "check [wallet] against the Bitcoin Design Guide." This skill does not do the review itself — it selects one of the specific review modes below and hands off to it.
---

# Bitcoin Wallet Design Review — Router

This is the entry point. Its only job is: figure out what's being reviewed, pick a mode, load shared context, dispatch, then log the result. Do not attempt review logic here — that lives in the mode-specific skills under `reviews/`.

## Step 0 — Establish your runtime, before anything else

This skill runs in two different environments and behaves differently in each. Determine which you're in first.

**Resolving the other files in this skill.** Every path below (`_shared/personas.md`, `reviews/<mode>/SKILL.md`) is written relative to this file's folder.

- If you have **filesystem access** to this repo, read them as relative paths — normal skill behavior.
- If you reached this file **over HTTP**, relative paths will not resolve. Prepend a base to every one of them. Try these in order — some sandboxes allowlist `github.com` but not other hosts, so if one is blocked the next may still work:

  1. `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/` — cleanest, returns raw markdown.
  2. `https://github.com/GBKS/bitcoin-ui-gallery/blob/main/skills/bitcoin-wallet-design-review/` — served from `github.com` itself with no redirect, so it survives a `github.com`-only allowlist. Returns the file rendered inside an HTML page; the full content is in there, just read it out of the markup.
  3. `https://bitcoin-ui-gallery.netlify.app/skills/bitcoin-wallet-design-review/`

  So `_shared/personas.md` becomes, under option 1, `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/personas.md`.

  Try all three before reporting a file as unreachable. "One base was blocked" is not the same as "the file doesn't exist," and these files are definitely present in the repo.

Never substitute your own invention for a file you failed to load. If a referenced file 404s or your tools can't fetch it, say which file and stop — a review run with made-up personas or a made-up report format is worse than no review.

**Reading the screenshots — this is a hard requirement.** The Gallery's per-screen JSON entries contain only a filename, a title derived from that filename, and a tag. They contain *no description of what is on the screen*. That means:

> If you cannot load and actually look at the screenshot images, you cannot do this review. There is no text substrate to fall back on.

Screenshot URLs, in order to try:

1. `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/public/screens/<wallet>/<file>.png`
2. `https://bitcoin-ui-gallery.netlify.app/screens/<wallet>/<file>.png`

Note that `github.com/GBKS/bitcoin-ui-gallery/raw/main/<path>` is **not** a third option — it 302-redirects to `raw.githubusercontent.com`, so it ends up at the same host as option 1 and offers no advantage if that host is blocked. Image bytes are not served from `github.com` itself under any URL form.

Before proceeding, confirm your tools can return image content (a vision-capable fetch, a browser you can screenshot, or local image reads). Test it on one real screenshot rather than assuming — actually open the first screen of the flow and confirm you can describe something in it that isn't derivable from the filename. Two different things can fail here, and they need different reporting: your tools may not handle images at all, or the host may be unreachable from your sandbox. Say which one it was.

**Preflight failure output.** If any required input is unavailable — the screenshots, `_shared/personas.md`, or `_shared/output-format.md` — do not write a review. Emit exactly this instead, and stop:

```markdown
## Preflight failed — no review produced

| Required input | Status | URL attempted |
|---|---|---|
| Screenshots for <wallet>/<flow> | Could not load image content | <url> |
| _shared/personas.md | OK / failed | <url> |
| _shared/output-format.md | OK / failed | <url> |

**Why there's no review below:** this skill reviews what is actually on the screens. The Gallery's JSON records only a filename and a tag per screen — no description of screen content — so without the images there is nothing to review against, and any findings would be recalled from prior knowledge of this app rather than observed.

**To get a real review:** paste or attach the screens for this flow, or re-run with tooling that can read images.
```

This block is the deliverable when preflight fails. Produce it and end your turn.

Two things you may be tempted to do instead. Both are wrong:

- **Writing the review anyway with a caveat at the end.** A reader sees a structured report with findings, a table, and a bottom line; the caveat does not undo that. You cannot flag your way out of not having the data.
- **Substituting a different source for a file you couldn't load** — using the Bitcoin Design Guide's published personas because `_shared/personas.md` didn't resolve, for instance. The fixed persona set is what makes runs comparable to each other; swapping in a different set produces a report that looks right and is silently incomparable to every other run. If `personas.md` returns 404, say so in the table above. Before concluding it's unreachable, try both bases from the paths section — the file is publicly readable at each, so a failure is far more likely a wrong URL than a missing file.

**Writing output.** If you have filesystem write access, write reports and log rows to disk as described below. If you don't, produce both inline in your response, clearly marked, so the person can commit them — and say that's what you're doing.

## Step 1 — Resolve the target

From the request, determine:

- **Wallet**: a specific wallet in the Bitcoin UI Gallery (e.g. Muun, Phoenix). If none is named, pick one not reviewed recently — check `_shared/review-log.md` first. If the Gallery hasn't been fetched yet this session, get the wallet index from `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/projects.json`, and that wallet's detail file from `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/<wallet>.json`. Screenshots live under `public/screens/<wallet>/` in the same repo — construct raw URLs the same way, or browse the live site at `https://bitcoin-ui-gallery.netlify.app` if raw fetches are awkward for images.
- **Flow**: a specific user flow (onboarding, backup, receive, send/pay, settings, etc.). If none is named, pick one that fits the mode (see each mode's SKILL.md for defaults).
- **Mode**: one of the review types below. If the person names it explicitly, use that. If they don't, default to rotating across modes — check the log for what ran most recently for this wallet and pick a different one.

If the request is genuinely too vague to resolve (no wallet nameable at all, e.g. "review a wallet"), pick the least-recently-reviewed wallet from the Gallery index and proceed — don't stall on a clarifying question for a task this low-stakes.

## Step 2 — Load shared context

Before dispatching, read:

- `_shared/personas.md` — the fixed persona set, needed for persona-walkthrough mode and useful context for the others
- `_shared/output-format.md` — the report template every mode must follow
- `_shared/review-log.md` — prior runs, so the mode skill can note recurring vs. new findings and avoid re-explaining context that hasn't changed

## Step 3 — Dispatch

| Mode | Trigger words | Skill |
|---|---|---|
| Persona walkthrough | "walk through as a user," "how would a newcomer experience this," "usability," general "review" with no mode specified | `reviews/persona-walkthrough/SKILL.md` |
| Copy review | "copy," "wording," "microcopy," "labels," "error messages," "tone" | `reviews/copy-review/SKILL.md` |
| Positioning review | "positioning," "target audience," "segment," "value prop," "differentiation," "who is this for" | `reviews/positioning-review/SKILL.md` |

Read the selected skill's SKILL.md and follow it. Each mode skill produces the report; the router doesn't write findings itself.

## Step 4 — Log the run

After the mode skill produces its report, append one row to `_shared/review-log.md` per the format described there. This is what makes tomorrow's run build on today's instead of starting cold — don't skip it even if the person doesn't ask for it.

If you're running over HTTP and can't write to the file, output the row as a markdown table line at the end of your response under the heading `## Log row — append to _shared/review-log.md`, so it can be pasted in by hand. A run that produces no log row, in either form, is an incomplete run.

## Notes on scope

Run **one wallet, one flow, one mode** per invocation, even if the request sounds broad ("do a full review of X"). If someone genuinely wants full coverage, run the modes as separate sequential passes and say so, rather than blending them into one unfocused report — blended output is the main way this kind of review degrades into generic, unactionable advice.
