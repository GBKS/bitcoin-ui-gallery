---
name: bitcoin-wallet-persona-walkthrough
description: Walks a fixed persona (from the bitcoin-wallet-design-review skill set) step-by-step through a real bitcoin wallet flow using Bitcoin UI Gallery screenshots, narrating confusion, hesitation, and drop-off risk in the persona's own terms. Use when someone wants a usability read, "how would a newcomer/user experience this," or asks for a general design review of a bitcoin wallet flow without specifying copy or positioning. Normally reached via the bitcoin-wallet-design-review router, but can be used directly if a wallet, flow, and persona are already specified.
---

# Persona Walkthrough

Simulates one persona moving through one real flow, screen by screen, using actual Gallery screenshots — not a generic heuristic checklist. The value is specificity: every finding should be traceable to something the persona would plausibly think or feel at a *specific* screen, not a general UX principle.

## Before you start

Read `../../_shared/personas.md`, `../../_shared/output-format.md`, and `../../_shared/sources.md` if you haven't already this session.

## Steps

1. **Pick the persona.** Default mapping if not specified: Priya for onboarding, Dave for backup/security/advanced settings, Marisol for receive/send/payments. If the flow doesn't map cleanly, pick whichever persona has the most at stake in that flow and say why.

2. **Pull the flow's screens in order.** Use the wallet's Gallery data file to get the actual screen sequence for the flow — don't reconstruct a guessed flow from memory of "how onboarding usually goes." If the sequence in the data is ambiguous, note that as a gap rather than guessing.

3. **Walk it screen by screen, in the persona's voice internally (not necessarily in the final output verbatim).** For each screen, ask:
   - What does this persona think is happening right now?
   - What decision or action are they being asked to make?
   - Is there anything here that would make them hesitate, misread, or want to stop?
   - Does the screen tell them why this step matters, in terms they'd already understand at this point in the flow?

4. **Convert hesitation points into findings**, each anchored to a specific screen, using the shared output format's table. Don't report a finding for every screen if most are fine — silence on a screen is itself informative (see "What's working").

5. **Pay particular attention to:**
   - The first screen a jargon term appears without explanation
   - Any step where the persona can't tell if something succeeded or failed
   - Any point where continuing requires trusting something the flow hasn't yet earned (e.g. asking for a backup before explaining why, for Priya; asking Dave to trust the app without showing him a way to independently verify)
   - Places where the persona would need to leave the flow (search, ask someone, read outside docs) to continue

6. **Write the report** per `../../_shared/output-format.md`, save to `../../reports/`.

## Explicitly out of scope for this mode

- Visual polish, color, typography — unless it directly causes the confusion/friction being described (this isn't a general aesthetics critique)
- Copy-level wording suggestions — flag that copy is a problem, but leave the specific rewrite to copy-review mode; cross-reference it instead of duplicating that work
- Business/positioning judgments about who the wallet *should* target — that's positioning-review mode; this mode takes the target persona as given and reports how the experience lands for them
