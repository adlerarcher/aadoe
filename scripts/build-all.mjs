#!/usr/bin/env node
/**
 * Build the hub, then build nested Vite apps into dist/mdev and dist/guide.
 * Static apps under public/{sepi,gpcp,gpic,odev} are copied by Vite automatically.
 */
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

function run(cmd, args, cwd) {
  console.log(`\n> ${cmd} ${args.join(' ')}  (${cwd})`)
  const res = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.status !== 0) {
    process.exit(res.status || 1)
  }
}

function listTop(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((name) => {
    try {
      return statSync(join(dir, name)).isDirectory() || name.endsWith('.html')
    } catch {
      return false
    }
  })
}

// 1) Rebuild static hackathons pages (public/gpic → copied into dist by Vite)
run('python3', ['scripts/build-pages.py'], join(root, 'public', 'gpic'))

// 2) Hub
run('npm', ['run', 'build:hub'], root)

// 3) Nested SPAs
const spas = [
  { name: 'mdev', out: join(dist, 'mdev') },
  { name: 'guide', out: join(dist, 'guide') },
]

for (const spa of spas) {
  const appDir = join(root, 'apps', spa.name)
  if (!existsSync(appDir)) {
    console.error(`Missing apps/${spa.name}`)
    process.exit(1)
  }
  if (!existsSync(join(appDir, 'node_modules'))) {
    run('npm', ['ci'], appDir)
  }
  run('npm', ['run', 'build'], appDir)
  const built = join(appDir, 'dist')
  rmSync(spa.out, { recursive: true, force: true })
  mkdirSync(dirname(spa.out), { recursive: true })
  cpSync(built, spa.out, { recursive: true })
  console.log(`Copied apps/${spa.name}/dist → dist/${spa.name}`)
}

// 4) Verify required nested roots exist (avoid silent 404s)
const required = ['sepi', 'gpcp', 'gpic', 'odev', 'mdev', 'guide']
const missing = required.filter((name) => !existsSync(join(dist, name)))
if (missing.length) {
  console.error('\nBuild incomplete. Missing nested apps in dist:', missing.join(', '))
  console.error('Top-level dist entries:', listTop(dist).join(', '))
  process.exit(1)
}

console.log('\nBuild OK. Nested apps:', required.join(', '))
