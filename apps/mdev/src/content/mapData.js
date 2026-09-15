import { CANDIDATES, REGIONS, inventoryStats } from './candidates.js'
import { RING_OF_FIRE_GEO } from './ranking.js'
import { publishedMarkets } from './geothermal.js'
import { countrySlug } from './places.js'

/** Map-region id used by installation inventory → market region when needed. */
export const MAP_REGIONS = REGIONS

const MARKET_TO_MAP_REGION = {
  'asia-pacific': 'indo-pacific',
  africa: 'africa',
  americas: 'americas',
  europe: 'europe',
  'middle-east': 'middle-east',
}

/** Extra map pins for published markets without installation markers. */
const MARKET_GEO = {
  Australia: { lon: 134, lat: -25, region: 'indo-pacific' },
  India: { lon: 78, lat: 22, region: 'indo-pacific' },
  Thailand: { lon: 101, lat: 15, region: 'indo-pacific' },
  Kenya: { lon: 38, lat: 0.5, region: 'africa' },
  Ethiopia: { lon: 40, lat: 9, region: 'africa' },
  Dominica: { lon: -61.4, lat: 15.4, region: 'americas' },
  ...RING_OF_FIRE_GEO,
}

export { inventoryStats }

export function countryPath(slug) {
  return `/geothermal/markets/${encodeURIComponent(slug)}`
}

export function countryMarkers() {
  const byCountry = new Map()
  for (const c of CANDIDATES) {
    if (!byCountry.has(c.hostCountry)) byCountry.set(c.hostCountry, [])
    byCountry.get(c.hostCountry).push(c)
  }

  const installationPins = [...byCountry.entries()].map(([name, bases]) => ({
    slug: countrySlug(name),
    name: name === 'Greenland (Denmark)' ? 'Greenland' : name,
    count: bases.length,
    lon: bases.reduce((s, b) => s + b.lon, 0) / bases.length,
    lat: bases.reduce((s, b) => s + b.lat, 0) / bases.length,
    region: bases[0].region,
    hasInstallations: true,
    hasMarket: true,
  }))

  const hostedSlugs = new Set(installationPins.map((p) => p.slug))
  const marketPins = []
  for (const market of publishedMarkets()) {
    if (hostedSlugs.has(market.id)) continue
    const geo =
      MARKET_GEO[market.name] ||
      MARKET_GEO[market.hostCountry] ||
      null
    if (!geo) continue
    marketPins.push({
      slug: market.id,
      name: market.name,
      count: 0,
      lon: geo.lon,
      lat: geo.lat,
      region: geo.region || MARKET_TO_MAP_REGION[market.region] || 'indo-pacific',
      hasInstallations: false,
      hasMarket: true,
    })
  }

  return [...installationPins, ...marketPins].sort((a, b) => a.name.localeCompare(b.name))
}

export function regionMarkers() {
  return MAP_REGIONS.map((r) => {
    const count = CANDIDATES.filter((c) => c.region === r.id).length
    const markets = publishedMarkets().filter(
      (m) => MARKET_TO_MAP_REGION[m.region] === r.id || m.region === r.id,
    ).length
    return {
      id: r.id,
      label: r.label,
      count,
      markets,
      ...REGION_MAP[r.id],
    }
  }).filter((r) => r.count > 0 || r.markets > 0)
}

const REGION_MAP = {
  europe: { lon: 12, lat: 50 },
  'indo-pacific': { lon: 135, lat: 20 },
  'middle-east': { lon: 50, lat: 26 },
  africa: { lon: 20, lat: 5 },
  americas: { lon: -80, lat: 15 },
}
