---
name: bitcoin-wallet-copy-review
description: Reviews the actual on-screen text of a bitcoin wallet flow — button labels, headings, error messages, tooltips, terminology — for clarity, consistency, and jargon, using Bitcoin UI Gallery screenshots and Bitcoin Design Guide terminology conventions. Use when someone asks about wording, microcopy, labels, tone, terminology consistency, or plain-language quality in a bitcoin wallet, or asks for a "copy review" or "copywriting pass." Normally reached via the bitcoin-wallet-design-review router.
---

# Copy Review

Narrow and literal: this mode only judges words. It should be possible to do this review from a transcript of every string on screen, without needing to see the layout — if a finding depends on visual hierarchy rather than word choice, it belongs in persona-walkthrough mode instead.

## Before you start

Read `../../_shared/personas.md`, `../../_shared/output-format.md`, and `../../_shared/sources.md` if you haven't already this session.

## Steps

1. **Transcribe every piece of visible text** from the flow's screens, in order: headings, body copy, button/CTA labels, form labels and placeholders, error/warning messages, tooltips or inline help, confirmation messages. Missing microcopy (e.g. an error state not captured in the screenshots) goes in the report's "Gaps" section, not skipped silently.

2. **Check terminology consistency within the flow and, where visible, across flows for the same wallet.** Common failure pattern in bitcoin wallets: mixing "seed phrase" / "recovery phrase" / "backup phrase," or "sats" / "satoshis" / no unit at all, or switching between "send" and "pay" for the same action. Flag every inconsistency found, with the exact strings and where each appears.

3. **Check against Bitcoin Design Guide terminology guidance** where it exists — fetch the relevant page rather than relying on memory. Note agreement or conflict explicitly.

4. **Evaluate each piece of copy against the target persona** (use whichever persona the flow is normally reviewed for, per the persona-walkthrough default mapping, unless told otherwise):
   - Would this term be understood on first read, or does it require prior crypto knowledge?
   - Does a button label describe the actual consequence of tapping it, or just a generic verb ("Continue," "Next") where a specific one would reduce hesitation ("Generate my backup")?
   - Do error/warning messages say what happened and what to do next, or just that something went wrong?
   - Is the tone consistent (e.g. not casual in onboarding and suddenly clinical/legalistic at the backup step, which can itself read as a trust signal problem)?

5. **For every finding, write the actual suggested replacement copy** — not just "make this clearer." A copy review that doesn't propose the better line isn't finished. Keep suggestions short enough to plausibly fit the existing UI element.

6. **Write the report** per `../../_shared/output-format.md`. In the findings table, the "Suggested fix" column should contain the proposed copy verbatim, e.g. `Change "Continue" → "Generate my backup phrase"`.

## Explicitly out of scope for this mode

- Whether the flow's *structure* or step order is right — that's persona-walkthrough
- Whether the target audience or value proposition is right — that's positioning-review
- Visual treatment of text (size, contrast, placement) — flag only if it's severe enough to affect legibility, otherwise leave to a visual/usability pass
