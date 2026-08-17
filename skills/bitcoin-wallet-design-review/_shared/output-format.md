# Output Format

Every review mode produces a single markdown report following this shape. Consistency here is what makes reports comparable across days and modes — don't improvise a different structure per run.

## File naming

Save each report as `reports/<YYYY-MM-DD>-<wallet>-<flow>-<mode>.md` (create the `reports/` folder alongside this skill if it doesn't exist). Example: `reports/2026-08-17-muun-onboarding-persona-walkthrough.md`.

If you're running without filesystem write access — e.g. you fetched this skill over HTTP — you can't save anything. Output the complete report inline in your response instead, under a heading naming the file it should be saved as, and state plainly that you couldn't write it yourself. Same structure either way; only the destination changes.

## Required frontmatter block

Real YAML frontmatter, first thing in the file, delimited by `---`. Not a bulleted list — the site parses this to index reports, so a malformed block means the report won't appear anywhere.

```yaml
---
date: 2026-08-17
wallet: muun                      # wallet id, matching app/data/<id>.json
flow: onboarding                  # flow id from the wallet data file, not the display name
mode: persona-walkthrough         # persona-walkthrough | copy-review | positioning-review
persona: Priya                    # omit entirely if the mode doesn't use one
status: New                       # New | Recurring | Improved | Regressed
priorReports:                     # filenames of earlier reports on this wallet+flow
  - 2026-07-02-muun-onboarding-copy-review.md

screens:                          # ids of every screen actually examined, in flow order
  - welcome-screen-with-wallet-creation-options
  - pin-creation-screen-with-numeric-keypad

walkthrough:                      # persona-walkthrough mode only; omit for other modes
  - screen: welcome-screen-with-wallet-creation-options
    text: >
      What the persona thinks is happening, what they're being asked to decide,
      and where they'd hesitate. One entry per screen, in flow order.

findings:
  - screens: [pin-creation-screen-with-numeric-keypad]
    observed: "Write down these 12 words. Anyone with them can spend your bitcoin."
    finding: >
      What's wrong and why it matters to this persona.
    impact: Confusion       # Confusion | Friction | Trust erosion | Drop-off risk | Missed opportunity
    severity: high          # high | medium | low
    fix: >
      What to do instead. Concrete enough to act on.
---
```

Rules that matter for indexing:

- `wallet` and `flow` are **ids** (`muun`, `onboarding`), not display titles (`Muun`, `Onboarding`). Ids are stable across renames; titles aren't, and a report keyed on a title silently orphans itself the day someone rewords a flow.
- `screens` lists screen **ids** — the `id` field, not the filename. Filenames change when screenshots are re-captured; ids don't, which is what lets a later run compare its findings against yours.
- List only what you actually looked at. If you examined four of a flow's five screens, list four and say why in "Gaps in this review" — don't copy the full list from the data file.
- Every `screen` in `walkthrough` and every id in a finding's `screens` must also appear in the top-level `screens` list. The build fails loudly otherwise.
- Severity counts are **derived** from the `findings` list, never written by hand. Don't add a counts field.
- Omit `persona`, `priorReports` and `walkthrough` when they don't apply. Don't emit them empty.

## Why walkthrough and findings live in frontmatter

They're structured data, not prose. The site renders each walkthrough step beside the screenshot it describes, and each finding as a card with a severity pill — neither of which is possible if they're baked into a markdown table, and a seven-column table is unreadable on a phone regardless.

Write the prose sections below as normal markdown. Everything else goes in the frontmatter.

## Summary

Start the markdown body with this heading — no `# Title` above it. The page renders the title from the frontmatter, so an `h1` in the body just duplicates it.

2–4 sentences. What's the single most important thing about this flow, stated plainly enough that someone who reads only this paragraph gets the point. Not a recap of every finding — the headline.

## Findings

Each entry in the `findings` list needs a specific screen reference — no finding should be so general it could apply to any wallet. Order them most severe first.

**`observed` is mandatory and must be quoted verbatim from the screenshot you actually looked at.** Not paraphrased, not reconstructed from the filename, not recalled from your own knowledge of the app. It exists to make this report falsifiable: anyone can open the same screenshot and check the quote. If a finding is about a visual rather than text (layout, hierarchy, a missing element), describe precisely what is and isn't visible in the frame — still from the image in front of you.

If you cannot fill `observed` for an entry, that entry is not a finding and must not appear. If you cannot fill it for any entry, you do not have a review — see the preflight rules in the router's Step 0.

Use `screens: [a, b]` when a finding genuinely spans more than one screen — a promise made on one screen and broken on another, say. Don't pad it with screens that merely relate.

**Impact type** (pick one, the closest fit):
- **Confusion** — user doesn't understand what's being asked or shown
- **Friction** — user understands but the path to complete the action is harder than it needs to be
- **Trust erosion** — something makes the wallet feel less credible, safe, or transparent
- **Drop-off risk** — plausible point where the target persona abandons the flow
- **Missed opportunity** — not broken, but a clear chance to do meaningfully better

**Severity**:
- **high** — likely causes abandonment, a support ticket, or a real risk to funds/security understanding
- **medium** — causes hesitation or a repeated question, but the user likely pushes through
- **low** — polish; wouldn't change user behavior but worth fixing

## Walkthrough

Persona-walkthrough mode only. One `walkthrough` entry per screen examined, in flow order. The site pairs each entry with its screenshot, so don't describe what the screen looks like — the reader can see it. Describe what the persona *thinks*, what they're being asked to do, and where they'd hesitate.

Silence is allowed: if a screen is unremarkable for this persona, say so in a sentence rather than manufacturing tension.

## What's working

At least one entry, even in a critical review. This isn't padding — comparative reviews are only useful if they can tell you not to break something that's already good. Reference specific screens.

## Gaps in this review

Note anything the Gallery screenshots couldn't show — error states, loading states, edge cases, live interaction timing, transitions between screens. This flags what a live-app review would need to confirm.

**This section is not a disclaimer bin.** It covers what the screenshots themselves don't capture. It does *not* cover screenshots you were unable to open — "I couldn't see the images, so treat the above as unverified" is not a gap note, it's an admission that the report shouldn't exist. In that situation you emit the preflight-failure block from the router's Step 0 and nothing else. A review whose findings are footnoted as unverified is more dangerous than no review: it carries the authority of a report while resting on your prior impressions of the app, and the reader has no way to tell which claims came from the screen.

## Carried forward

If the log shows this wallet+flow was reviewed before (same or different mode), note whether prior High/Medium findings appear to still be present in the current screenshots, appear resolved, or can't be determined from screenshots alone. Don't re-argue old findings at length — one line each is enough.
