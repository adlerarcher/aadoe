/** Nested mount under aadoe: /mildev/ */

export const BASE_URL = import.meta.env.BASE_URL || '/'
export const BASE = BASE_URL.replace(/\/$/, '')

export function asset(path) {
  const clean = String(path || '').replace(/^\//, '')
  return `${BASE_URL}${clean}`
}

/** Strip /mildev so app routes stay /inventory etc. internally. */
export function stripBase(pathname) {
  const path = pathname || '/'
  if (!BASE) return path
  if (path === BASE || path === `${BASE}/`) return '/'
  if (path.startsWith(`${BASE}/`)) return path.slice(BASE.length) || '/'
  return path
}

/** Prefix app path with /mildev for history URLs. */
export function withBase(appPath) {
  const raw = appPath || '/'
  if (!BASE) return raw
  if (raw === '/') return `${BASE}/`
  return `${BASE}${raw.startsWith('/') ? raw : `/${raw}`}`
}
