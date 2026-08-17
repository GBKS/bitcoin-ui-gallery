# Review Log

Append one row per completed review run, most recent last. This is what the router and each mode skill read before starting a new run — it's how the project accumulates instead of restarting cold each day.

| Date | Wallet | Flow | Mode | Findings (H/M/L) | Key theme | Status vs. prior | Report |
|---|---|---|---|---|---|---|---|
| 2026-08-17 | phoenix | initial-onboarding | persona-walkthrough | 1/4/1 | Strong self-custody disclosure, but "keep it safe" assigns a duty the flow never lets the user discharge | New | reports/2026-08-17-phoenix-initial-onboarding-persona-walkthrough.md |
| 2026-08-17 | muun | backup | copy-review | 3/6/2 | Three genuinely distinct backup methods, but "Back up your wallet" titles three of them and the Recovery Code carries four names; "recovery phrase" is never used on screen | New | reports/2026-08-17-muun-backup-copy-review.md |
| 2026-08-17 | muun | onboarding | positioning-review | 2/3/1 | Muun's real position — Lightning with no channels or liquidity to manage — is visible only as an absence in a four-row Settings screen; onboarding's one line is a category label Phoenix could print unedited (compared against phoenix/initial-onboarding) | New | reports/2026-08-17-muun-onboarding-positioning-review.md |

**Status vs. prior** — one of: `New` (first review of this wallet+flow), `Recurring` (repeats a prior High/Medium finding), `Improved` (a prior finding appears resolved), `Regressed` (something that looked fine before now looks worse).

**Report** — relative path to the file in `reports/`, e.g. `reports/2026-08-17-muun-onboarding-persona-walkthrough.md`.

Keep entries terse — this table is for scanning, not reading in full. The detail lives in the individual reports.
