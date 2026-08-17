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

  // Walkthrough steps and findings must point at screens the report says it examined,
  // otherwise the page would render a step with no screenshot beside it.
  const inScreens = new Set(screens)
  const checkRef = (id, where) => {
    if (!inScreens.has(id)) {
      console.warn(`  ! ${file}: ${where} references "${id}", which is not in screens[]`)
      problems++
      return false
    }
    return true
  }

  const walkthrough = (meta.walkthrough || []).filter((step) => {
    if (!step?.screen || !step?.text) {
      console.warn(`  ! ${file}: walkthrough entry missing screen or text`)
      problems++
      return false
    }
    return checkRef(step.screen, 'walkthrough')
  })

  const findings = (meta.findings || []).filter((finding, i) => {
    for (const key of ['observed', 'finding', 'severity']) {
      if (!finding?.[key]) {
        console.warn(`  ! ${file}: finding ${i + 1} missing "${key}"`)
        problems++
        return false
      }
    }
    if (!['high', 'medium', 'low'].includes(finding.severity)) {
      console.warn(`  ! ${file}: finding ${i + 1} has severity "${finding.severity}"`)
      problems++
      return false
    }
    const refs = finding.screens || []
    if (!refs.length) {
      console.warn(`  ! ${file}: finding ${i + 1} references no screen`)
      problems++
      return false
    }
    return refs.every((id) => checkRef(id, `finding ${i + 1}`))
  })

  // Counts are derived, never taken from the frontmatter, so they can't disagree
  // with the findings actually listed.
  const counts = { high: 0, medium: 0, low: 0 }
  for (const finding of findings) counts[finding.severity]++

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
    findings: counts,
    status: meta.status || 'New'
  })
}

// Newest first, so a wallet page can show the latest review without sorting.
reports.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1))

writeFileSync(out, JSON.stringify({ reports }, null, 2) + '\n')
console.log(
  `Wrote ${out} — ${reports.length} report(s)` + (problems ? `, ${problems} problem(s)` : '')
)
