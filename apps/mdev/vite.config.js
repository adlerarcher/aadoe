import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CANDIDATES } from './src/content/candidates.js'
import { ALL_MARKETS } from './src/content/geothermal.js'
import { countrySlug } from './src/content/places.js'

const root = dirname(fileURLToPath(import.meta.url))

function deepLinkPaths() {
  const slugs = new Set(ALL_MARKETS.map((m) => m.id))
  for (const c of CANDIDATES) slugs.add(countrySlug(c.hostCountry))
  return [
    'geothermal',
    'geothermal/markets',
    'geothermal/developments',
    'geothermal/methodology',
    ...[...slugs].sort().map((s) => `geothermal/markets/${s}`),
  ]
}

function writeDeepLinks() {
  return {
    name: 'write-deep-links',
    closeBundle() {
      const dist = join(root, 'dist')
      const index = readFileSync(join(dist, 'index.html'), 'utf8')
      for (const rel of deepLinkPaths()) {
        const dir = join(dist, rel)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), index)
      }
    },
  }
}

// Nested under aadoe.thermalunderground.org/mdev/
export default defineConfig({
  base: '/mdev/',
  plugins: [react(), writeDeepLinks()],
  server: {
    host: '127.0.0.1',
    port: 5177,
  },
  preview: {
    host: '127.0.0.1',
    port: 4177,
  },
})
