// Regenerates skills/bitcoin-wallet-design-review/_shared/screen-urls.md
//
// Why this file exists: some agent sandboxes only permit fetching a URL that
// appeared *literally* in an earlier search or fetch result. Such agents cannot
// build a URL by joining a base and a relative path, so telling them "prepend
// this base" is unusable. Listing every screenshot URL in full, in a document
// they can fetch, is what makes the images reachable.
//
// Run after adding or renaming screens:  node scripts/generate-screen-urls.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = 'https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/public/screens'
const SITE = 'https://bitcoin-ui-gallery.netlify.app/screens'
const DATA = 'https://raw.githubusercontent.com/GBKS/bitcoin-ui-gallery/main/app/data'
const out = join(root, 'skills/bitcoin-wallet-design-review/_shared/screen-urls.md')

const wallets = readdirSync(join(root, 'app/data'))
  .filter((f) => f.endsWith('.json') && f !== 'projects.json')
  .map((f) => f.replace('.json', ''))

const lines = [
  '# Screenshot URLs',
  '',
  '**Generated file — do not edit by hand.** Regenerate with `node scripts/generate-screen-urls.mjs`.',
  '',
  'Every screenshot in the Gallery, listed as a complete absolute URL, grouped by wallet and flow.',
  '',
  'This exists for agents whose fetch tool only accepts URLs that appeared verbatim in an earlier',
  'result. Fetch this file first; every URL below then becomes directly fetchable. Do not construct',
  'screenshot URLs by joining a base path to a filename — if a URL is not listed here, it is not in',
  'the Gallery.',
  '',
  'Two hosts are given per screen. The first serves the raw image bytes. If your tooling cannot',
  'retrieve image content from either, you cannot run a review — see the preflight rules in the',
  "router's SKILL.md.",
  ''
]

lines.push('## Wallet data files', '')
lines.push('Flows, screen order, and Design Guide links per wallet.', '')
for (const wallet of wallets) lines.push(`- ${DATA}/${wallet}.json`)
lines.push('')

let total = 0
for (const wallet of wallets) {
  const data = JSON.parse(readFileSync(join(root, `app/data/${wallet}.json`), 'utf8'))
  lines.push(`## ${data.title || wallet}`, '')

  const folder = data.folder || wallet
  // Flows reference screens by stable id; the file is looked up from the screen entry.
  const fileById = new Map((data.screens || []).map((s) => [s.id, s.file]))
  const inFlow = new Set()

  const entry = (id) => {
    const file = fileById.get(id)
    if (!file) {
      console.warn(`  ! ${wallet}: no screen entry for id "${id}"`)
      return
    }
    lines.push(`- \`${id}\``)
    lines.push(`  - ${RAW}/${folder}/${file}`)
    lines.push(`  - ${SITE}/${folder}/${file}`)
    total++
  }

  for (const flow of data.flows || []) {
    lines.push(`### ${flow.name}`, '')
    for (const id of flow.screens || []) {
      inFlow.add(id)
      entry(id)
    }
    lines.push('')
  }

  const loose = (data.screens || []).map((s) => s.id).filter((id) => id && !inFlow.has(id))
  if (loose.length) {
    lines.push('### Not part of a defined flow', '')
    loose.forEach(entry)
    lines.push('')
  }
}

writeFileSync(out, lines.join('\n'))
console.log(`Wrote ${out} — ${total} screen entries across ${wallets.length} wallets`)
