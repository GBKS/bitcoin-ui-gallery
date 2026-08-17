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
- If you reached this file **over HTTP**, relative paths will not resolve. Prepend this base to every one of them:
  `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/`
  So `_shared/personas.md` becomes `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/personas.md`. The same files are also served at `https://www.bitcoin-ui-gallery.com/skills/bitcoin-wallet-design-review/`.

Never substitute your own invention for a file you failed to load. If a referenced file 404s or your tools can't fetch it, say which file and stop — a review run with made-up personas or a made-up report format is worse than no review.

**Reading the screenshots — this is a hard requirement.** The Gallery's per-screen JSON entries contain only a filename, a title derived from that filename, and a tag. They contain *no description of what is on the screen*. That means:

> If you cannot load and actually look at the screenshot images, you cannot do this review. There is no text substrate to fall back on.

Before proceeding, confirm your tools can return image content (a vision-capable fetch, a browser you can screenshot, or local image reads). If they can only return text/HTML, **stop and tell the person** that this skill needs image-capable tooling, and offer the one workable alternative: they paste or attach the screens themselves. Do not proceed on filename inference or on your own memory of the shipped app, and do not produce a hedged review with caveats about what you couldn't see — that output reads as a real review while being unfalsifiable, which is the worst possible failure mode here.

**Writing output.** If you have filesystem write access, write reports and log rows to disk as described below. If you don't, produce both inline in your response, clearly marked, so the person can commit them — and say that's what you're doing.

## Step 1 — Resolve the target

From the request, determine:

- **Wallet**: a specific wallet in the Bitcoin UI Gallery (e.g. Muun, Phoenix). If none is named, pick one not reviewed recently — check `_shared/review-log.md` first. If the Gallery hasn't been fetched yet this session, get the wallet index from `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/projects.json`, and that wallet's detail file from `https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/<wallet>.json`. Screenshots live under `public/screens/<wallet>/` in the same repo — construct raw URLs the same way, or browse the live site at `https://www.bitcoin-ui-gallery.com` if raw fetches are awkward for images.
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
