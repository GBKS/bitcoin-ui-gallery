---
name: bitcoin-wallet-design-review
description: Router for automated product/design reviews of bitcoin wallets, using the Bitcoin UI Gallery (github.com/GBKS/bitcoin-ui-gallery) as the screenshot source and the Bitcoin Design Guide (bitcoin.design) as the reference standard. Use this whenever someone asks to review, critique, audit, or evaluate a bitcoin wallet's UX, onboarding, copy, positioning, or product design — even if they just paste a wallet name and a link to this skill without further detail. Also trigger on requests like "run today's wallet review," "do a design pass on [wallet]," or "check [wallet] against the Bitcoin Design Guide." This skill does not do the review itself — it selects one of the specific review modes below and hands off to it.
---

# Bitcoin Wallet Design Review — Router

This is the entry point. Its only job is: figure out what's being reviewed, pick a mode, load shared context, dispatch, then log the result. Do not attempt review logic here — that lives in the mode-specific skills under `reviews/`.

## How to invoke this skill

For whoever is *starting* a run, rather than the agent executing it. How the request is phrased has repeatedly mattered more than the skill's own wording.

A prompt that works:

```
Follow the skill at
https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/SKILL.md

Review <wallet>'s <flow> flow. Start with Step 0 and run the preflight before
anything else. Use only URLs written literally in the skill files — do not
construct URLs by pattern. If you cannot fetch the screenshot images, emit the
preflight-failure block and stop.
```

Three things to avoid, each of which has caused a fabricated review in practice:

- **Don't point at the Netlify copy of this file.** Some fetch tools only permit URLs that appeared verbatim in an earlier result, so whichever host you name becomes the anchor for everything that follows. Naming `raw.githubusercontent.com` puts the shared files, the mode skills, and `screen-urls.md` one hop away on the same host. Naming the site instead invites the agent to invent sibling URLs there.
- **Don't also hand over the wallet's gallery page** (e.g. `.../phoenix`). It's a rendered HTML page carrying screen titles and tags — enough to *look* like a data source, not remotely enough to review. Its presence lets an agent that can't read the screenshots keep going instead of stopping, and titles get padded out with half-remembered knowledge of the app. The skill fetches the wallet data itself.
- **Don't name the review mode if you can avoid it.** Doing so signals that Step 1 is already settled, and the preflight above it tends to get skimmed along with it. Describe what you want reviewed and let the router dispatch.

## Step 0 — Establish your runtime, before anything else

This skill runs in two different environments and behaves differently in each. Determine which you're in first.

**Resolving the other files in this skill.** Every path below (`_shared/personas.md`, `reviews/<mode>/SKILL.md`) is written relative to this file's folder.

- If you have **filesystem access** to this repo, read them as relative paths — normal skill behavior.
- If you reached this file **over HTTP**, relative paths will not resolve, and you may also be running a fetch tool that only accepts URLs which appeared *verbatim* in an earlier result. Such a tool cannot join a base to a relative path. So every file is listed below as a complete URL. Use these exactly as written — copy, don't construct.

  | File | URL |
  |---|---|
  | `_shared/personas.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/personas.md |
  | `_shared/output-format.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/output-format.md |
  | `_shared/sources.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/sources.md |
  | `_shared/review-log.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/review-log.md |
  | `_shared/screen-urls.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/screen-urls.md |
  | `reviews/persona-walkthrough/SKILL.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/reviews/persona-walkthrough/SKILL.md |
  | `reviews/copy-review/SKILL.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/reviews/copy-review/SKILL.md |
  | `reviews/positioning-review/SKILL.md` | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/reviews/positioning-review/SKILL.md |

  Mirrors, if `raw.githubusercontent.com` is unreachable from your sandbox — same paths, different host:
  - `https://github.com/GBKS/bitcoin-ui-gallery/blob/main/skills/bitcoin-wallet-design-review/_shared/personas.md` (served from `github.com` with no redirect; content is inside the HTML)
  - `https://bitcoin-ui-gallery.netlify.app/skills/bitcoin-wallet-design-review/_shared/personas.md`

Never substitute your own invention for a file you failed to load. If a referenced file 404s or your tools can't fetch it, say which file and stop — a review run with made-up personas or a made-up report format is worse than no review.

**Reading the screenshots — this is a hard requirement.** The Gallery's per-screen JSON entries contain only a filename, a title derived from that filename, and a tag. They contain *no description of what is on the screen*. That means:

> If you cannot load and actually look at the screenshot images, you cannot do this review. There is no text substrate to fall back on.

**Getting screenshot URLs.** Do not build them from the filenames in the wallet JSON — a constructed URL will be rejected outright by any fetch tool that requires URLs to have appeared verbatim in a prior result. Instead fetch this file first:

https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/screen-urls.md

It lists every screenshot in the Gallery as a complete URL, grouped by wallet and flow, on two hosts each. Once you've fetched it, those URLs have appeared in a result and are fetchable. Take the ones for your wallet and flow from there.

Note that `github.com/GBKS/bitcoin-ui-gallery/raw/main/<path>` is **not** an alternative host — it 302-redirects to `raw.githubusercontent.com`. Image bytes are not served from `github.com` itself under any URL form.

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

- **Wallet**: a specific wallet in the Bitcoin UI Gallery. If none is named, pick one not reviewed recently — check `_shared/review-log.md` first. Each wallet's data file holds its flows, screen sequence, and Design Guide links. Complete URLs, to copy rather than construct:

  | Wallet | Data file |
  |---|---|
  | Muun | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/muun.json |
  | Phoenix | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/phoenix.json |
  | OKX | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/okx.json |
  | Padawan | https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/padawan.json |

  The index at https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/projects.json lists wallet ids only — no URLs — so it can't get you to a data file on its own. If a wallet exists in the Gallery but isn't in the table above, this file is out of date: say so rather than guessing its URL.

  **Screenshots are not addressed from this data.** The data file gives filenames only. Get the image URLs from `_shared/screen-urls.md` as described in Step 0, and never assemble one from a folder path and a filename.
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
