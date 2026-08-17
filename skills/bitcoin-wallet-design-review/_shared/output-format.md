# Output Format

Every review mode produces a single markdown report following this shape. Consistency here is what makes reports comparable across days and modes — don't improvise a different structure per run.

## File naming

Save each report as `reports/<YYYY-MM-DD>-<wallet>-<flow>-<mode>.md` (create the `reports/` folder alongside this skill if it doesn't exist). Example: `reports/2026-08-17-muun-onboarding-persona-walkthrough.md`.

## Required frontmatter block

```markdown
- **Date:** 2026-08-17
- **Wallet:** Muun
- **Flow:** Onboarding
- **Mode:** Persona walkthrough
- **Persona (if applicable):** Priya — bitcoin-curious newcomer
- **Screens reviewed:** [list screenshot filenames/identifiers actually used, from the Gallery data]
- **Prior runs on this wallet+flow:** [reference log entries, or "none"]
```

## Summary

2–4 sentences. What's the single most important thing about this flow, stated plainly enough that someone who reads only this paragraph gets the point. Not a recap of every finding — the headline.

## Findings

A table. Every finding needs a specific screen/step reference — no finding should be so general it could apply to any wallet.

| # | Screen/Step | Finding | Impact type | Severity | Suggested fix |
|---|---|---|---|---|---|
| 1 | Screen 3, seed phrase display | ... | Confusion | High | ... |

**Impact type** (pick one, the closest fit):
- **Confusion** — user doesn't understand what's being asked or shown
- **Friction** — user understands but the path to complete the action is harder than it needs to be
- **Trust erosion** — something makes the wallet feel less credible, safe, or transparent
- **Drop-off risk** — plausible point where the target persona abandons the flow
- **Missed opportunity** — not broken, but a clear chance to do meaningfully better

**Severity**:
- **High** — likely causes abandonment, a support ticket, or a real risk to funds/security understanding
- **Medium** — causes hesitation or a repeated question, but the user likely pushes through
- **Low** — polish; wouldn't change user behavior but worth fixing

## What's working

At least one entry, even in a critical review. This isn't padding — comparative reviews are only useful if they can tell you not to break something that's already good. Reference specific screens.

## Gaps in this review

Note anything the Gallery screenshots couldn't show — error states, loading states, edge cases, live interaction timing, anything inferred rather than observed. This keeps the report honest about what's a screenshot-based inference versus an observed fact, and flags what a live-app review would need to confirm.

## Carried forward

If the log shows this wallet+flow was reviewed before (same or different mode), note whether prior High/Medium findings appear to still be present in the current screenshots, appear resolved, or can't be determined from screenshots alone. Don't re-argue old findings at length — one line each is enough.
