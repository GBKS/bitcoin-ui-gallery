---
date: 2026-08-17
wallet: phoenix
flow: initial-onboarding
mode: persona-walkthrough
persona: Priya
screens:
  - 01-onboarding-1st-screen
  - 02-onboarding-2nd-screen
  - 03-onboarding-3rd-screen
  - 04-onboarding-4th-screen
  - 05-after-tapping-create-new-wallet
findings: { high: 1, medium: 4, low: 1 }
status: New
---

# Phoenix — Initial Onboarding — Persona Walkthrough

## Summary

Phoenix gets Priya from launch to a working wallet in four taps, and it does the hardest thing well: self-custody is disclosed as its own dedicated screen, in plain language, before she creates anything. The flow's weak point is the sentence right after that disclosure — "Keep it safe!" instructs her to protect a secret key she has not been shown, cannot reach, and is never prompted about again before the flow ends. She arrives at an empty wallet denominated in a unit no screen introduced, with no suggested next step.

## Walkthrough

**Screen 1 — Welcome.** "With Phoenix, sending and receiving bitcoins is easy and safe." Nothing here requires vocabulary Priya lacks. She taps Next.

**Screen 2 — Bitcoin supercharged.** "Phoenix uses payment channels to make Bitcoin fast and private." This is where she hits her first wall. The screen's job is to explain why Phoenix is different, and the explanation is a mechanism she has no referent for.

**Screen 3 — Your key, your bitcoins.** The strongest screen in the flow. "Phoenix is self-custodial. You take control." is exactly the disclosure the Design Guide insists on, and it lands before wallet creation rather than after. But the second line — "You can restore your wallet at anytime using your secret key. Keep it safe!" — hands Priya a responsibility with no accompanying action. She has not seen a secret key. She is anxious about losing money; this is the sentence that activates that anxiety, and the button says "Get started."

**Screen 4 — Create or restore.** Unambiguous for Priya. She knows she has nothing to restore.

**Screen 5 — The wallet.** "0 sat", "0 recent payments", "full payment history", and four unlabeled icons. Her flow ends here. Nothing tells her to fund the wallet, nothing returns her to the backup she was told to keep safe, and the balance is in a unit no prior screen used.

## Findings

| # | Screen/Step | Observed on screen (verbatim) | Finding | Impact type | Severity | Suggested fix |
|---|---|---|---|---|---|---|
| 1 | Screen 3 → 5 | "You can restore your wallet at anytime using your secret key. Keep it safe!" | Priya is instructed to safeguard something she is never shown. No screen in this flow displays the secret key or offers a path to it; Phoenix's backup flow begins separately at screen 17, reached via a warning message. The Design Guide treats backup as "a dedicated step" early in onboarding. | Trust erosion | High | Either add the backup step to this flow, or reword to set expectations: "We'll help you save your recovery phrase in a moment." Don't assign a duty the flow can't yet discharge. |
| 2 | Screen 3 | "using your **secret key**" | Phoenix calls this a "secret key" here and a "backup recovery phrase" in its own backup flow (screen 17). Priya learns one term, then has to recognise a different one later, at the exact moment precision matters most. | Confusion | Medium | Use "recovery phrase" in both places. It's also the ecosystem-standard term she'll meet everywhere else. |
| 3 | Screen 2 | "Phoenix uses payment channels to make Bitcoin fast and private." | "Payment channels" is the most technical term in the flow, and it's offered *as* the explanation rather than being explained. For Priya this screen conveys only that something technical is happening. | Confusion | Medium | Lead with the outcome, not the mechanism — e.g. "Send and receive instantly, with fees low enough for everyday amounts." |
| 4 | Screen 5 | "0 sat" | The first balance Priya ever sees is denominated in a unit no screen has introduced. She has no way to judge whether 0 sat is a little or a lot, or what she'd need. (Persona-grounded; the Design Guide's first-use page doesn't address units.) | Confusion | Medium | Show a fiat equivalent alongside, or default new wallets to BTC with a one-time explanation of sats. |
| 5 | Screen 5 | "0 recent payments" / "full payment history" | The flow ends with no next action. The Design Guide recommends first-use provide "options for users who don't have any bitcoin yet, and for users who do"; the only affordances here are Receive and Send, both of which assume she already knows what to do. | Drop-off risk | Medium | Add an empty-state prompt for a first deposit, and surface the outstanding backup here rather than waiting for a warning. |
| 6 | Screen 5 | Four unlabeled icons: gear, list, lightning bolt, wrench | Gear and list are guessable; bolt and wrench are not. Priya can't predict what any of them does, on the one screen where she most needs orientation. | Confusion | Low | Label the two non-obvious ones, or move them behind the settings gear. |

## What's working

- **Screen 3 is the flow's best decision and should be protected.** A dedicated, plain-language self-custody disclosure placed *before* wallet creation is precisely what the Design Guide asks for — "these caveats mustn't be hidden" — and many wallets bury it. The wording ("Your key, your bitcoins") is memorable without being jargon.
- **Screen 1 carries no vocabulary Priya lacks.** The flow earns a few screens of attention before spending any of it.
- **Three intro screens, then a choice.** Short enough that even an impatient user reaches the wallet quickly.

## Gaps in this review

- Whether the three intro screens are skippable can't be determined from stills — no skip affordance is visible in the frames, but swipe behaviour isn't observable.
- The transition between screens 4 and 5 isn't captured. If a backup prompt appears there, finding 1 weakens considerably.
- No error, loading, or permission states are in this flow's captures.
- iOS only; Android may differ.
- Screenshots entered the repo on 2025-10-23, so Phoenix may have shipped changes since.

## Carried forward

First review of this wallet and flow — nothing to compare against.

## A note on the reference link

The flow's curated Design Guide link, `bitcoin.design/guide/onboarding/first-use/`, now redirects to `bitcoin.design/guide/daily-spending-wallet/first-use/`. Worth updating in `app/data/phoenix.json`.
