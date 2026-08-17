---
date: 2026-08-17
wallet: phoenix
flow: initial-onboarding
mode: persona-walkthrough
persona: Priya
status: New

screens:
  - 01-onboarding-1st-screen
  - 02-onboarding-2nd-screen
  - 03-onboarding-3rd-screen
  - 04-onboarding-4th-screen
  - 05-after-tapping-create-new-wallet

walkthrough:
  - screen: 01-onboarding-1st-screen
    text: >
      "With Phoenix, sending and receiving bitcoins is easy and safe." Nothing here
      requires vocabulary Priya lacks, which is rarer than it sounds — most wallets
      spend their first screen on a claim she'd have to decode. She taps Next.
  - screen: 02-onboarding-2nd-screen
    text: >
      This is where she hits her first wall. The screen's job is to explain why
      Phoenix is different, and the explanation is "payment channels" — a mechanism
      she has no referent for. She takes away only that something technical is
      happening, which is not what this screen is for.
  - screen: 03-onboarding-3rd-screen
    text: >
      The strongest screen in the flow, and the one that most affects her. "Phoenix
      is self-custodial. You take control." is plain enough to land, and it lands
      before she has created anything. Then the second line hands her a duty —
      "Keep it safe!" — for something she has not been shown and cannot reach. She
      is already anxious about losing money; this is the sentence that activates it,
      and the only button says "Get started."
  - screen: 04-onboarding-4th-screen
    text: >
      Unambiguous for Priya. She has nothing to restore, so "Create new wallet" is
      the obvious choice and she takes it without hesitating.
  - screen: 05-after-tapping-create-new-wallet
    text: >
      Her flow ends here, and it ends without telling her anything. The balance is
      denominated in a unit no screen introduced, nothing invites her to fund the
      wallet, and the backup she was told to keep safe is never mentioned again.
      Four icons sit at the top, two of which she cannot decode.

findings:
  - screens: [03-onboarding-3rd-screen, 05-after-tapping-create-new-wallet]
    observed: "You can restore your wallet at anytime using your secret key. Keep it safe!"
    finding: >
      Priya is instructed to safeguard something she is never shown. No screen in
      this flow displays the secret key or offers a path to it, and Phoenix's backup
      flow doesn't begin until screen 17, reached through a warning message. The
      Design Guide treats backup as a dedicated step early in onboarding.
    impact: Trust erosion
    severity: high
    fix: >
      Either bring the backup step into this flow, or reword to set expectations —
      "We'll help you save your recovery phrase in a moment." Don't assign a duty
      the flow gives no way to discharge.

  - screens: [03-onboarding-3rd-screen]
    observed: "You can restore your wallet at anytime using your secret key."
    finding: >
      Phoenix calls this a "secret key" here and a "backup recovery phrase" in its
      own backup flow. Priya learns one term, then has to recognise a different one
      later, at the exact moment precision matters most.
    impact: Confusion
    severity: medium
    fix: >
      Use "recovery phrase" in both places. It's also the term she'll meet
      everywhere else in the ecosystem.

  - screens: [02-onboarding-2nd-screen]
    observed: "Phoenix uses payment channels to make Bitcoin fast and private."
    finding: >
      "Payment channels" is the most technical term in the flow, and it is offered
      as the explanation rather than being explained. The screen meant to sell the
      product's core difference is the one Priya understands least.
    impact: Confusion
    severity: medium
    fix: >
      Lead with the outcome instead of the mechanism — "Send and receive instantly,
      with fees low enough for everyday amounts."

  - screens: [05-after-tapping-create-new-wallet]
    observed: "0 sat"
    finding: >
      The first balance Priya ever sees is denominated in a unit no screen has
      introduced. She has no way to judge whether a sat is a lot or a little, or how
      many she'd need. (Persona-grounded; the Design Guide's first-use page doesn't
      address units.)
    impact: Confusion
    severity: medium
    fix: >
      Show a fiat equivalent alongside, or default new wallets to BTC with a
      one-time explanation of sats.

  - screens: [05-after-tapping-create-new-wallet]
    observed: '"0 recent payments" / "full payment history"'
    finding: >
      The flow ends with no next action. The Design Guide recommends first-use offer
      "options for users who don't have any bitcoin yet, and for users who do"; the
      only affordances here are Receive and Send, both of which assume she already
      knows what to do.
    impact: Drop-off risk
    severity: medium
    fix: >
      Add an empty-state prompt for a first deposit, and surface the outstanding
      backup here rather than waiting for a warning to fire.

  - screens: [05-after-tapping-create-new-wallet]
    observed: "Four unlabeled icons in the top bar: gear, list, lightning bolt, wrench"
    finding: >
      Gear and list are guessable; bolt and wrench are not. Priya cannot predict
      what any of them does, on the one screen where she most needs orientation.
    impact: Confusion
    severity: low
    fix: >
      Label the two non-obvious ones, or move them behind the settings gear.
---

## Summary

Phoenix gets Priya from launch to a working wallet in four taps, and it does the hardest thing well: self-custody is disclosed as its own dedicated screen, in plain language, before she creates anything. The flow's weak point is the sentence immediately after that disclosure — "Keep it safe!" instructs her to protect a secret key she has not been shown, cannot reach, and is never prompted about again before the flow ends. She arrives at an empty wallet denominated in a unit no screen introduced, with no suggested next step.

## What's working

- **Screen 3 is the flow's best decision and should be protected.** A dedicated, plain-language self-custody disclosure placed *before* wallet creation is precisely what the Design Guide asks for — "these caveats mustn't be hidden" — and many wallets bury it. "Your key, your bitcoins" is memorable without being jargon.
- **Screen 1 carries no vocabulary Priya lacks.** The flow earns a few screens of attention before spending any of it.
- **Three intro screens, then a choice.** Short enough that even an impatient user reaches the wallet quickly.

## Gaps in this review

- Whether the three intro screens are skippable can't be determined from stills — no skip affordance is visible in the frames, but swipe behaviour isn't observable.
- The transition between screens 4 and 5 isn't captured. If a backup prompt appears there, the first finding weakens considerably.
- No error, loading, or permission states are in this flow's captures.
- iOS only; Android may differ.
- Screenshots entered the repo on 2025-10-23, so Phoenix may have shipped changes since.

## Carried forward

First review of this wallet and flow — nothing to compare against.

## A note on the reference link

The flow's curated Design Guide link, `bitcoin.design/guide/onboarding/first-use/`, now redirects to `bitcoin.design/guide/daily-spending-wallet/first-use/`. Worth updating in `app/data/phoenix.json`.
