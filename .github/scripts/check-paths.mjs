#!/usr/bin/env node
// The agent's change boundary: an allowlist, enforced by CI rather than by the
// prompt. A run talked into touching anything else fails here, rather than
// presenting a plausible diff for a human to rubber-stamp.
//
// Reads `git diff --cached --raw --no-renames -z` on stdin. The publish job runs
// this from a checkout of `main`, never from the patch it is judging.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const CODE = /\.(tsx?|s?css)$/
const IMAGE = /\.(jpe?g|png|webp|gif|avif|pdf)$/i

// SVG and HTML stay out of `public/`: both can run script on the site's origin.
const ALLOWED = [
  { prefix: 'pages/', file: CODE },
  { prefix: 'components/', file: CODE },
  { prefix: 'public/images/', file: IMAGE },
  { prefix: 'public/pdf/', file: /\.pdf$/i },
  { prefix: 'public/css/', file: /\.css$/ },
]

const ALLOWED_MODES = new Set(['100644', '000000'])

export function violations(entries) {
  const found = []
  for (const { newMode, path } of entries) {
    if (!ALLOWED.some(({ prefix, file }) => path.startsWith(prefix) && file.test(path))) {
      found.push({ path, reason: 'path not allowed' })
    } else if (!ALLOWED_MODES.has(newMode)) {
      found.push({ path, reason: `mode ${newMode} not allowed` })
    }
  }
  return found
}

export function parseRawDiff(raw) {
  const fields = raw.split('\0')
  const entries = []
  for (let i = 0; i + 1 < fields.length; i += 2) {
    const header = fields[i].match(/^:(\d{6}) (\d{6}) /)
    if (!header) throw new Error(`unparseable raw diff header: ${fields[i]}`)
    entries.push({ oldMode: header[1], newMode: header[2], path: fields[i + 1] })
  }
  return entries
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const found = violations(parseRawDiff(readFileSync(0, 'utf8')))
  for (const { path, reason } of found) console.error(`::error::${reason}: ${JSON.stringify(path)}`)
  process.exit(found.length ? 1 : 0)
}
