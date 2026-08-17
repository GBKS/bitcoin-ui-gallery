---
name: bitcoin-wallet-positioning-review
description: Evaluates a bitcoin wallet's apparent target audience, value proposition, and market differentiation by reading its onboarding and marketing-adjacent screens against other wallets in the Bitcoin UI Gallery. Use when someone asks about target segment, positioning, "who is this for," value proposition, differentiation versus competitors, or wants a product-strategy-level read rather than a screen-by-screen usability critique. Normally reached via the bitcoin-wallet-design-review router.
---

# Positioning Review

Whole-wallet, not screen-by-screen. This mode asks what the wallet is *for* and *for whom*, based on the choices visible in its own screens — not on the wallet's marketing website or press coverage, since the goal is to check whether the in-product experience actually delivers the positioning it implies, or drifts from it.

## Before you start

Read `../../_shared/personas.md`, `../../_shared/output-format.md`, and `../../_shared/sources.md` if you haven't already this session.

If you reached this file over HTTP rather than from disk, those relative paths won't resolve — and if your fetch tool only accepts URLs that appeared verbatim in an earlier result, you cannot build them by joining a base to a path either. Use these complete URLs:

- https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/personas.md
- https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/output-format.md
- https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/sources.md
- https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/skills/bitcoin-wallet-design-review/_shared/screen-urls.md

If `raw.githubusercontent.com` is unreachable, the same files are at `https://github.com/GBKS/bitcoin-ui-gallery/blob/main/skills/bitcoin-wallet-design-review/_shared/personas.md` (content inside the HTML) and on `https://bitcoin-ui-gallery.netlify.app/skills/bitcoin-wallet-design-review/_shared/personas.md`. Try each before calling a file unreachable. If a file won't load, name it and stop rather than improvising its contents.

You also need to be able to **see the screenshots** — the Gallery JSON carries only filenames and tags, no screen content. If your tools can't return image content, stop and say so rather than reviewing from memory of the app.

## Steps

1. **Infer the implied target segment from the wallet's own choices**, primarily onboarding: What assumptions does it make about the user's prior bitcoin knowledge? What does it explain vs. take for granted? What's the first thing it asks the user to care about (security? speed? a specific use case like Lightning payments?)? Which of the three personas does this wallet seem built for, and how confidently?

2. **Identify the implied value proposition** — the thing the wallet is betting users will choose it *for*. Look for what gets the most prominent placement and explanation in onboarding: is it self-custody/control, simplicity/speed, Lightning-native payments, multisig/institutional-grade security, something else? State it as a sentence, e.g. "This wallet is positioned as the fast, low-friction way to receive Lightning payments as a small business," and note how confident that inference is.

3. **Check for mismatch between implied audience and actual flow demands.** This is usually the most useful finding in this mode: a wallet that visually/verbally signals "built for beginners" but then requires understanding of concepts (UTXOs, channel liquidity, fee bumping) without scaffolding, or one that signals "for power users" but hides advanced controls. Anchor each mismatch to specific screens.

4. **Compare against at least one other wallet in the Gallery** that appears to target a similar or adjacent segment. Pull that wallet's onboarding data too. The comparison should answer: where does this wallet differentiate itself clearly, and where does it look interchangeable with the alternative? Interchangeable-with-a-competitor is itself a finding worth reporting even if nothing is "broken."

5. **Sanity-check the segment/positioning inference against the Bitcoin Design Guide's guidance** on designing for different user sophistication levels, if such guidance exists — fetch rather than assume.

6. **Write the report** per `../../_shared/output-format.md`. The findings table entries here will often be at the "flow" or "wallet" level rather than a single screen — that's fine for this mode, but still name the specific screens that support each claim in the "Screen/Step" column rather than leaving it blank.

## Explicitly out of scope for this mode

- Line-level copy suggestions — flag tone/audience mismatches, but leave specific rewrites to copy-review
- Step-by-step friction inside a flow — that's persona-walkthrough; this mode can reference it but shouldn't re-derive it
- Claims about the wallet's actual user base, funding, or team — this is inference from the product surface only, not market research; say so explicitly if the report might otherwise read as asserting real market data
