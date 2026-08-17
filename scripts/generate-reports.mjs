// Compiles skills/bitcoin-wallet-design-review/reports/*.md for the site.
//
// Markdown stays the source of truth in the repo so the review skill can write and
// diff it; compiling at build time means the site ships no markdown runtime.
//
// Output is app/data/reports.json: frontmatter only, no bodies. The store loads it
// on every visit, so it has to stay small — pages render the markdown itself via
// MarkdownRenderer, loading one report's source only when someone opens it.
//
// This step exists for the things the frontmatter can't check on its own: that the
// YAML parses, that required keys are present, and that the wallet, flow and screen
// ids actually resolve against the gallery data.
//
// Run: node scripts/generate-reports.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'skills/bitcoin-wallet-design-review/reports')
const out = join(root, 'app/data/reports.json')

const MODES = {
  'persona-walkthrough': 'Persona walkthrough',
  'copy-review': 'Copy review',
  'positioning-review': 'Positioning review'
}

if (!existsSync(dir)) {
  writeFileSync(out, JSON.stringify({ reports: [] }, null, 2) + '\n')
  console.log('No reports directory; wrote empty index.')
  process.exit(0)
}

const wallets = Object.fromEntries(
  readdirSync(join(root, 'app/data'))
    .filter((f) => f.endsWith('.json') && !['projects.json', 'reports.json'].includes(f))
    .map((f) => {
      const d = JSON.parse(readFileSync(join(root, 'app/data', f), 'utf8'))
      return [d.id, d]
    })
)

const reports = []
let problems = 0

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
  const raw = readFileSync(join(dir, file), 'utf8')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) {
    console.warn(`  ! ${file}: no YAML frontmatter — skipped`)
    problems++
    continue
  }

  let meta
  try {
    meta = parseYaml(m[1])
  } catch (e) {
    console.warn(`  ! ${file}: frontmatter is not valid YAML (${e.message}) — skipped`)
    problems++
    continue
  }

  for (const key of ['date', 'wallet', 'flow', 'mode']) {
    if (!meta?.[key]) {
      console.warn(`  ! ${file}: missing required key "${key}" — skipped`)
      problems++
      meta = null
      break
    }
  }
  if (!meta) continue

  // Validate the joins rather than trusting them: a report keyed to a wallet or
  // flow that doesn't exist would render as an orphan page nothing links to.
  const wallet = wallets[meta.wallet]
  if (!wallet) {
    console.warn(`  ! ${file}: unknown wallet "${meta.wallet}"`)
    problems++
  }
  const flow = wallet?.flows?.find((f) => f.id === meta.flow)
  if (wallet && !flow) {
    console.warn(`  ! ${file}: unknown flow "${meta.flow}" for wallet "${meta.wallet}"`)
    problems++
  }
  const knownScreens = new Set((wallet?.screens || []).map((s) => s.id))
  const screens = (meta.screens || []).filter((id) => {
    if (!knownScreens.has(id)) {
      console.warn(`  ! ${file}: references unknown screen id "${id}"`)
      problems++
      return false
    }
    return true
  })

  const f = meta.findings || {}
  reports.push({
    id: file.replace(/\.md$/, ''),
    date: String(meta.date),
    wallet: meta.wallet,
    walletTitle: wallet?.title || meta.wallet,
    flow: meta.flow,
    flowName: flow?.name || meta.flow,
    mode: meta.mode,
    modeLabel: MODES[meta.mode] || meta.mode,
    persona: meta.persona || null,
    screens,
    findings: { high: f.high || 0, medium: f.medium || 0, low: f.low || 0 },
    status: meta.status || 'New'
  })
}

// Newest first, so a wallet page can show the latest review without sorting.
reports.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1))

writeFileSync(out, JSON.stringify({ reports }, null, 2) + '\n')
console.log(
  `Wrote ${out} — ${reports.length} report(s)` + (problems ? `, ${problems} problem(s)` : '')
)
