# Sources

## Bitcoin UI Gallery (github.com/GBKS/bitcoin-ui-gallery)

Structure (per the repo's README):

```
app/data/projects.json        # index of all wallets in the gallery
app/data/<wallet>.json        # per-wallet screens + flows + metadata
public/screens/<wallet>/      # actual screenshot images
public/logos/                 # wallet logos
```

To read data files directly without cloning: fetch the raw GitHub URL, e.g.
`https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data/projects.json`

For screenshots: either fetch the raw image URL the same way (swap in the image path from the wallet's JSON), or browse the live deployed gallery at `https://bitcoin-ui-gallery.netlify.app` if that's more reliable for viewing images in context (it also shows the flow grouping visually, which the raw JSON may not make obvious).

Each flow in a wallet's JSON is typically tagged (onboarding, backup, receive, send, settings, etc.) and carries a `links` array pointing at relevant sections of the Bitcoin Design Guide — use those exact URLs rather than re-deriving them from memory, they're already curated. Phoenix's "Initial Onboarding" flow, for example, links to `https://bitcoin.design/guide/onboarding/first-use/`. If you find yourself citing a Guide URL that wasn't in the flow's `links` array, you guessed it — go back and use the curated one, or fetch the Guide's index to confirm the path exists.

If the repo structure has changed since this was written, `view`/fetch `app/data/projects.json` first to confirm the current shape before assuming the above.

## Bitcoin Design Guide (bitcoin.design)

Use as the reference standard for what "good" looks like — terminology conventions, recommended patterns for backup/seed flows, established UX guidance for Lightning-specific concepts, etc. When a finding conflicts with or confirms specific Design Guide guidance, cite the specific page/section, not just "the Design Guide says." Fetch the relevant section live rather than relying on memory of it — the guide gets updated.

## A note on staleness

Both sources can change between runs. If a wallet's screenshots look meaningfully different from what a prior log entry describes, treat it as a new baseline rather than trying to force continuity — note in the report that the wallet appears to have shipped changes since the last review.
