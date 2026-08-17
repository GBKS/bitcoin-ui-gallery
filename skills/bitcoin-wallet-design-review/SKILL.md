---
name: bitcoin-wallet-design-review
description: Router for automated product/design reviews of bitcoin wallets, using the Bitcoin UI Gallery (github.com/GBKS/bitcoin-ui-gallery) as the screenshot source and the Bitcoin Design Guide (bitcoin.design) as the reference standard. Use this whenever someone asks to review, critique, audit, or evaluate a bitcoin wallet's UX, onboarding, copy, positioning, or product design — even if they just paste a wallet name and a link to this skill without further detail. Also trigger on requests like "run today's wallet review," "do a design pass on [wallet]," or "check [wallet] against the Bitcoin Design Guide." This skill does not do the review itself — it selects one of the specific review modes below and hands off to it.
---

# Bitcoin Wallet Design Review — Router

This is the entry point. Its only job is: figure out what's being reviewed, pick a mode, load shared context, dispatch, then log the result. Do not attempt review logic here — that lives in the mode-specific skills under `reviews/`.

Paths in this file come in two kinds. Anything starting `_shared/` or `reviews/` is relative to this skill's own folder. Anything starting `app/` or `public/` is relative to the repository root.

## Step 0 — Preflight

Two things must be true before you start. Check both; don't assume.

**You can see the screenshots.** The Gallery's per-screen JSON records a filename, a title derived from that filename, and a tag. It records *nothing about what is on the screen*. Open the first screenshot of the flow and confirm you can describe something in it that isn't derivable from the filename. If you can't read images, there is no text substrate to fall back on and no review is possible.

**You can read the shared files.** `_shared/personas.md` and `_shared/output-format.md` at minimum.

If either fails, do not write a review. Emit this and stop:

```markdown
## Preflight failed — no review produced

| Required input | Status |
|---|---|
| Screenshots for <wallet>/<flow> | <what happened> |
| _shared/personas.md | OK / failed |
| _shared/output-format.md | OK / failed |

**Why there's no review below:** this skill reviews what is actually on the screens.
The Gallery's JSON records only a filename and a tag per screen, so without the images
there is nothing to review against, and any findings would be recalled from prior
knowledge of this app rather than observed.
```

Two things you may be tempted to do instead. Both are wrong:

- **Writing the review anyway with a caveat at the end.** A reader sees a structured report with findings, a table, and a bottom line; the caveat does not undo that. You cannot flag your way out of not having the data.
- **Substituting something else for a file you couldn't read** — the Bitcoin Design Guide's published personas in place of `_shared/personas.md`, for instance. The fixed persona set is what makes runs comparable; swapping in a different one produces a report that looks right and is silently incomparable to every other run.

Running over HTTP without the repo checked out is a separate situation with its own constraints, and is not currently supported — see `_shared/remote-access.md`.

## Step 1 — Resolve the target

From the request, determine:

- **Wallet**: a specific wallet in the Gallery. If none is named, pick one not reviewed recently — check `_shared/review-log.md` first. `app/data/projects.json` lists the wallet ids; each wallet's `app/data/<id>.json` holds its flows, screen sequence, and curated Design Guide links. Screenshots are in `public/screens/<folder>/`, where `folder` comes from the wallet's data file.
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

After the mode skill produces its report, append one row to `_shared/review-log.md` per the format described there. This is what makes tomorrow's run build on today's instead of starting cold — don't skip it even if the person doesn't ask for it. A run that produces no log row is an incomplete run.

## Notes on scope

Run **one wallet, one flow, one mode** per invocation, even if the request sounds broad ("do a full review of X"). If someone genuinely wants full coverage, run the modes as separate sequential passes and say so, rather than blending them into one unfocused report — blended output is the main way this kind of review degrades into generic, unactionable advice.
