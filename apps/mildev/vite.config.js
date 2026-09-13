import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { deepLinkPaths } from './src/content/places.js'

// Nested under aadoe.thermalunderground.org/mildev/
const root = dirname(fileURLToPath(import.meta.url))

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

export default defineConfig({
  base: '/mildev/',
  plugins: [react(), writeDeepLinks()],
  server: {
    host: '127.0.0.1',
    port: 5178,
  },
  preview: {
    host: '127.0.0.1',
    port: 5178,
  },
})
