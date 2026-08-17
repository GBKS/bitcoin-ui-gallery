# Personas

Fixed set, reused across runs and modes so findings stay comparable over time. Don't invent new personas per run — if none of these fit a review, note that as a finding about the wallet's audience mismatch rather than switching personas.

The site shows readers a one-line description of whichever persona a report used. That copy lives in `app/data/review-meta.json` and is the canonical reader-facing version — **don't restate a persona's description inside a report**, or two reports on the same persona will describe her differently. Add new personas to both files.

---

## Priya — bitcoin-curious newcomer

- Heard about bitcoin from a friend or the news within the last few months. Has never held any cryptocurrency.
- Downloading her first wallet, on iOS, moderate general tech literacy (comfortable with banking apps) but zero crypto-specific vocabulary — "seed phrase," "sats," "on-chain," "Lightning," "UTXO" mean nothing to her going in.
- Primary emotional state: cautious, slightly anxious about losing money or being scammed. Has read one article about people losing their bitcoin.
- Will abandon a flow if it asks her to understand something before telling her why it matters, or if it uses jargon without a plain-language fallback.
- Success for her looks like: she finishes onboarding, understands in her own words what she just did, and feels safe rather than merely finished.

## Dave — self-custody veteran migrating off an exchange

- Has used a centralized exchange (Coinbase-style) for 3+ years. Comfortable with the general concepts, prices, and market context, but has never personally held keys.
- Moving to self-custody after a scare (an exchange outage, a friend's story, general FUD about counterparty risk). Motivated, a little impatient, doesn't want to be over-explained to.
- Knows the vocabulary loosely but wants the wallet to prove, not just claim, that backup and recovery actually work — he's specifically wary of being told "you're now in control" without evidence the control is real and recoverable.
- Will judge the wallet harshly on anything that feels like it's hiding complexity rather than handling it — he wants transparency, not hand-holding.
- Success for him looks like: he trusts the backup flow enough to actually move meaningful funds, and can find advanced settings (fee control, node/server choice, coin control) without hunting.

## Marisol — small merchant accepting bitcoin/Lightning payments

- Runs a small shop or café. Thinks in terms of daily operations, not bitcoin ideology. Time-pressured; often has a customer waiting.
- Cares about: fast, reliable invoice creation, a QR code that's easy to display and scan, clear confirmation that payment landed, and being able to reconcile what came in at the end of the day.
- Doesn't care about self-custody philosophy, node choice, or advanced settings unless they directly affect getting paid reliably.
- Will judge harshly on latency, ambiguity about whether a payment succeeded, and anything that requires her to context-switch away from the customer interaction (e.g. leaving the receive screen to check something).
- Success for her looks like: she can generate a request and confirm receipt in under the time it takes to hand someone a receipt.

---

## Using these in a review

- **Persona-walkthrough mode**: pick the persona that matches the flow being reviewed (Priya for onboarding, Dave for backup/advanced settings, Marisol for receive/payments), unless the request specifies otherwise.
- **Copy and positioning modes**: these personas are useful lenses for judging whether language and framing land, but the report format for those modes doesn't require a persona walkthrough structure — reference the persona briefly where it clarifies a finding ("this label would read as jargon to Priya"), don't force a full narrative.
