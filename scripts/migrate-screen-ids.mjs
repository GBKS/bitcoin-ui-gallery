// One-shot migration: give every screen and flow a stable id.
//
// Ids are derived ONCE from current filenames/names and then frozen. Never run
// this again after the first pass — regenerating ids from filenames is exactly
// the coupling this removes.
//
//   screen.id  = filename minus extension  (matches today's URL slug, so no URLs change)
//   flow.id    = slug of flow name         (matches today's flow URL slug)
//   flow.screens -> screen ids instead of filenames
//   screen.addedAt = date the file first landed in git, for staleness checks
//
// Run: node scripts/migrate-screen-ids.mjs [--dry]

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dry = process.argv.includes('--dry')

const idFromFile = (f) => f.replace(/\.[^.]+$/, '')
const slug = (name) => name.toLowerCase().replace(/\s+/g, '-')

function addedAt(path) {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--format=%as', '--', path], {
      cwd: root,
      encoding: 'utf8'
    })
      .trim()
      .split('\n')
      .filter(Boolean)
    return out.at(-1) || null // last line = oldest commit that added it
  } catch {
    return null
  }
}

const wallets = readdirSync(join(root, 'app/data'))
  .filter((f) => f.endsWith('.json') && f !== 'projects.json')

let warnings = 0

for (const file of wallets) {
  const path = join(root, 'app/data', file)
  const data = JSON.parse(readFileSync(path, 'utf8'))
  const folder = data.folder || file.replace('.json', '')

  if (data.screens?.some((s) => s.id)) {
    console.log(`${file}: already migrated, skipping`)
    continue
  }

  // Screens: add id + addedAt, keeping file as the storage pointer.
  const byFile = new Map()
  data.screens = (data.screens || []).map((s) => {
    const id = idFromFile(s.file)
    byFile.set(s.file, id)
    const { title, file: f, ...rest } = s
    return {
      id,
      file: f,
      title,
      addedAt: addedAt(`public/screens/${folder}/${f}`),
      ...rest
    }
  })

  // Flows: add id, and reference screens by id.
  data.flows = (data.flows || []).map((flow) => {
    const screens = (flow.screens || []).map((f) => {
      const id = byFile.get(f)
      if (!id) {
        console.warn(`  ! ${file}: flow "${flow.name}" references ${f}, absent from screens[]`)
        warnings++
        return idFromFile(f)
      }
      return id
    })
    const { name, screens: _drop, ...rest } = flow
    return { id: slug(name), name, screens, ...rest }
  })

  if (!dry) writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `${file}: ${data.screens.length} screens, ${data.flows.length} flows${dry ? ' (dry run)' : ''}`
  )
}

console.log(warnings ? `\n${warnings} warning(s) — review before committing.` : '\nNo warnings.')
