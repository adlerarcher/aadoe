/** Map coordinates along the Pacific volcanic arcs (visual path only). */

export const RANK_SOURCE =
  'Pacific volcanic-arc geography for map animation.'

/** Ranked names in priority order (1 = highest). */
export const GEOTHERMAL_RANK = [
  'Indonesia',
  'Philippines',
  'Japan',
  'New Zealand',
  'Mexico',
  'Chile',
  'El Salvador',
  'Costa Rica',
  'Papua New Guinea',
  'Taiwan',
  'Peru',
  'Guatemala',
  'Nicaragua',
  'Ecuador',
  'Colombia',
]

/** Map positions along the Pacific volcanic arcs (path glow anchors). */
export const RING_OF_FIRE_GEO = {
  Indonesia: { lon: 118, lat: -2, region: 'indo-pacific' },
  Philippines: { lon: 122, lat: 12, region: 'indo-pacific' },
  Japan: { lon: 138, lat: 36, region: 'indo-pacific' },
  'New Zealand': { lon: 174, lat: -41, region: 'indo-pacific' },
  Mexico: { lon: -102, lat: 23, region: 'americas' },
  Chile: { lon: -71, lat: -30, region: 'americas' },
  'El Salvador': { lon: -89, lat: 13.7, region: 'americas' },
  'Costa Rica': { lon: -84, lat: 10, region: 'americas' },
  'Papua New Guinea': { lon: 147, lat: -6, region: 'indo-pacific' },
  Taiwan: { lon: 121, lat: 24, region: 'indo-pacific' },
  Peru: { lon: -75, lat: -10, region: 'americas' },
  Guatemala: { lon: -90.5, lat: 15, region: 'americas' },
  Nicaragua: { lon: -85, lat: 13, region: 'americas' },
  Ecuador: { lon: -78.5, lat: -1.5, region: 'americas' },
  Colombia: { lon: -74, lat: 5, region: 'americas' },
}

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

export function isRingOfFire(name) {
  return RANK_INDEX.has(name)
}
