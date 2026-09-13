/**
 * Geothermal country order for MILDEV.
 * Source: MDEV Asia-Pacific priority markets in apps/mdev/src/content/geothermal.js
 * (September 2026 brief; nine markets from S. 4610 engagement provision),
 * then the remaining published MDEV geothermal markets in file order.
 * No separate Irina ranking found in-repo.
 */

export const RANK_SOURCE =
  'MDEV Asia-Pacific priority markets, September 2026 brief.'

/** Ranked names in priority order (1 = highest). */
export const GEOTHERMAL_RANK = [
  'Taiwan',
  'Philippines',
  'Japan',
  'Australia',
  'Indonesia',
  'India',
  'New Zealand',
  'Papua New Guinea',
  'Thailand',
  'Kenya',
  'Ethiopia',
  'Mexico',
  'Chile',
  'El Salvador',
  'Dominica',
]

const RANK_INDEX = new Map(GEOTHERMAL_RANK.map((name, i) => [name, i + 1]))

export function geothermalRank(name) {
  return RANK_INDEX.get(name) || null
}

export function compareByGeothermalRank(a, b) {
  const ra = geothermalRank(a) ?? 999
  const rb = geothermalRank(b) ?? 999
  if (ra !== rb) return ra - rb
  return a.localeCompare(b)
}
