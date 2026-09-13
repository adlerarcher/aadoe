/**
 * Curated public candidate inventory for MILDEV.
 * Unclassified open sources only. Incomplete by design.
 * Not an authoritative basing map. Not DoD/DOE official.
 */

export const REGIONS = [
  { id: 'europe', label: 'Europe' },
  { id: 'indo-pacific', label: 'Indo-Pacific' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'africa', label: 'Africa' },
  { id: 'americas', label: 'Americas' },
]

/**
 * @typedef {Object} Candidate
 * @property {string} id
 * @property {string} name
 * @property {string} hostCountry
 * @property {string} region
 * @property {string} serviceNote short public descriptor
 * @property {boolean} geothermalLens
 * @property {boolean} smrLens
 * @property {string} note honest screening note
 * @property {string[]} sources short source labels
 */

/** @type {Candidate[]} */
export const CANDIDATES = [
  {
    id: 'ramstein-ab',
    name: 'Ramstein Air Base',
    hostCountry: 'Germany',
    region: 'europe',
    serviceNote: 'Major USAF hub in Rhineland-Palatinate',
    geothermalLens: true,
    smrLens: true,
    note: 'Large enduring load center in a geothermal-active European market. Candidate for energy-resilience screening only.',
    sources: ['Public USAFE / installation pages', 'CRS overseas basing materials'],
  },
  {
    id: 'spangdahlem-ab',
    name: 'Spangdahlem Air Base',
    hostCountry: 'Germany',
    region: 'europe',
    serviceNote: 'USAF fighter wing installation',
    geothermalLens: true,
    smrLens: false,
    note: 'Enduring German host-nation location. Geothermal tag reflects regional resource context, not a project claim.',
    sources: ['Public USAFE / installation pages'],
  },
  {
    id: 'usag-bavaria',
    name: 'U.S. Army Garrison Bavaria',
    hostCountry: 'Germany',
    region: 'europe',
    serviceNote: 'Grafenwoehr / Hohenfels training complex',
    geothermalLens: true,
    smrLens: true,
    note: 'Large training footprint with sustained power and heat demand. Listed as a named garrison, not every subordinate site.',
    sources: ['Public USAREUR-AF / garrison pages'],
  },
  {
    id: 'usag-stuttgart',
    name: 'U.S. Army Garrison Stuttgart',
    hostCountry: 'Germany',
    region: 'europe',
    serviceNote: 'Headquarters and supporting installations',
    geothermalLens: true,
    smrLens: false,
    note: 'Headquarters load profile. Candidate class only.',
    sources: ['Public USAG Stuttgart pages'],
  },
  {
    id: 'usag-wiesbaden',
    name: 'U.S. Army Garrison Wiesbaden',
    hostCountry: 'Germany',
    region: 'europe',
    serviceNote: 'Army headquarters campus',
    geothermalLens: true,
    smrLens: false,
    note: 'Enduring host-nation garrison in public materials.',
    sources: ['Public USAG Wiesbaden pages'],
  },
  {
    id: 'raf-lakenheath',
    name: 'RAF Lakenheath',
    hostCountry: 'United Kingdom',
    region: 'europe',
    serviceNote: 'USAF wing at RAF station',
    geothermalLens: false,
    smrLens: true,
    note: 'Major UK-hosted fighter location. SMR lens reflects dense load / resilience interest framing, not a siting claim.',
    sources: ['Public USAFE / RAF host pages'],
  },
  {
    id: 'raf-mildenhall',
    name: 'RAF Mildenhall',
    hostCountry: 'United Kingdom',
    region: 'europe',
    serviceNote: 'USAF air mobility / tanker presence',
    geothermalLens: false,
    smrLens: false,
    note: 'Public UK-hosted installation. Included for inventory completeness in Europe.',
    sources: ['Public USAFE / RAF host pages'],
  },
  {
    id: 'aviano-ab',
    name: 'Aviano Air Base',
    hostCountry: 'Italy',
    region: 'europe',
    serviceNote: 'USAF fighter wing in northern Italy',
    geothermalLens: true,
    smrLens: false,
    note: 'Italy has an established geothermal power sector. Tag is regional context only.',
    sources: ['Public USAFE pages', 'Public Italian geothermal sector materials'],
  },
  {
    id: 'nas-sigonella',
    name: 'Naval Air Station Sigonella',
    hostCountry: 'Italy',
    region: 'europe',
    serviceNote: 'U.S. Navy air station in Sicily',
    geothermalLens: true,
    smrLens: false,
    note: 'Mediterranean logistics and aviation load. Geothermal tag is regional only.',
    sources: ['Public U.S. Navy installation pages'],
  },
  {
    id: 'nsa-naples',
    name: 'Naval Support Activity Naples',
    hostCountry: 'Italy',
    region: 'europe',
    serviceNote: 'Navy support / headquarters presence',
    geothermalLens: true,
    smrLens: false,
    note: 'Public Italian host-nation support installation.',
    sources: ['Public U.S. Navy installation pages'],
  },
  {
    id: 'ns-rota',
    name: 'Naval Station Rota',
    hostCountry: 'Spain',
    region: 'europe',
    serviceNote: 'U.S. Navy / Marine presence at Spanish naval base',
    geothermalLens: false,
    smrLens: true,
    note: 'Strategic Atlantic / Mediterranean logistics node in public materials.',
    sources: ['Public U.S. Navy / Spanish host pages'],
  },
  {
    id: 'moron-ab',
    name: 'Morón Air Base',
    hostCountry: 'Spain',
    region: 'europe',
    serviceNote: 'Contingency and mobility support air base',
    geothermalLens: false,
    smrLens: false,
    note: 'Public Spanish host-nation air base used by U.S. forces.',
    sources: ['Public USAF / Spanish host pages'],
  },
  {
    id: 'lajes-field',
    name: 'Lajes Field',
    hostCountry: 'Portugal',
    region: 'europe',
    serviceNote: 'Azores airfield access',
    geothermalLens: true,
    smrLens: false,
    note: 'Azores sit in a volcanic province. Geothermal tag is geologic context, not a project.',
    sources: ['Public USAF / Portuguese host pages'],
  },
  {
    id: 'nsa-souda-bay',
    name: 'Naval Support Activity Souda Bay',
    hostCountry: 'Greece',
    region: 'europe',
    serviceNote: 'Crete naval / air support',
    geothermalLens: true,
    smrLens: false,
    note: 'Eastern Mediterranean support location. Greece has geothermal resource discussion in public energy materials.',
    sources: ['Public U.S. Navy pages'],
  },
  {
    id: 'mk-air-base',
    name: 'Mihail Kogălniceanu Air Base',
    hostCountry: 'Romania',
    region: 'europe',
    serviceNote: 'Black Sea region support hub',
    geothermalLens: false,
    smrLens: false,
    note: 'Publicly described NATO / U.S. presence location in Romania.',
    sources: ['Public USAREUR-AF / Romanian host materials'],
  },
  {
    id: 'incirlik-ab',
    name: 'Incirlik Air Base',
    hostCountry: 'Turkey',
    region: 'europe',
    serviceNote: 'USAF presence at Turkish air base',
    geothermalLens: true,
    smrLens: false,
    note: 'Turkey has substantial geothermal power capacity in public energy statistics. Tag is national resource context only.',
    sources: ['Public USAFE materials', 'Public Turkish geothermal sector statistics'],
  },
  {
    id: 'kadena-ab',
    name: 'Kadena Air Base',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'Major USAF base on Okinawa',
    geothermalLens: true,
    smrLens: true,
    note: 'Japan is a volcanic arc with commercial geothermal. Large enduring load. Candidate screening only.',
    sources: ['Public USAF / USFJ pages', 'Public Japanese geothermal materials'],
  },
  {
    id: 'yokota-ab',
    name: 'Yokota Air Base',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'USAF airlift hub near Tokyo',
    geothermalLens: true,
    smrLens: true,
    note: 'Enduring Japanese host-nation air base with dense regional load.',
    sources: ['Public USAF / USFJ pages'],
  },
  {
    id: 'misawa-ab',
    name: 'Misawa Air Base',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'Northern Honshu fighter / joint presence',
    geothermalLens: true,
    smrLens: false,
    note: 'Tohoku region has public geothermal development history. Tag is regional only.',
    sources: ['Public USAF / USFJ pages'],
  },
  {
    id: 'mcas-iwakuni',
    name: 'MCAS Iwakuni',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'Marine Corps air station',
    geothermalLens: true,
    smrLens: false,
    note: 'Public Japanese host-nation Marine air station.',
    sources: ['Public USMC / USFJ pages'],
  },
  {
    id: 'cfay-yokosuka',
    name: 'Commander Fleet Activities Yokosuka',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'U.S. Navy fleet concentration',
    geothermalLens: true,
    smrLens: true,
    note: 'Major naval load and waterfront energy demand in public descriptions.',
    sources: ['Public U.S. Navy / USFJ pages'],
  },
  {
    id: 'cfas-sasebo',
    name: 'Commander Fleet Activities Sasebo',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'U.S. Navy fleet activities',
    geothermalLens: true,
    smrLens: false,
    note: 'Public Japanese host-nation Navy location.',
    sources: ['Public U.S. Navy / USFJ pages'],
  },
  {
    id: 'camp-zama',
    name: 'Camp Zama',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'U.S. Army Japan headquarters area',
    geothermalLens: true,
    smrLens: false,
    note: 'Public Army headquarters installation in Japan.',
    sources: ['Public USARJ pages'],
  },
  {
    id: 'camp-foster',
    name: 'Camp Foster',
    hostCountry: 'Japan',
    region: 'indo-pacific',
    serviceNote: 'Marine Corps base Camp Smedley D. Butler (Okinawa)',
    geothermalLens: true,
    smrLens: false,
    note: 'Named major Okinawa Marine camp in public materials. Not a full subordinate-site list.',
    sources: ['Public USMC / USFJ pages'],
  },
  {
    id: 'camp-humphreys',
    name: 'Camp Humphreys',
    hostCountry: 'South Korea',
    region: 'indo-pacific',
    serviceNote: 'Largest U.S. overseas Army garrison by many public accounts',
    geothermalLens: false,
    smrLens: true,
    note: 'Very large enduring load center. SMR lens is resilience / density framing only.',
    sources: ['Public USAG Humphreys / USFK pages'],
  },
  {
    id: 'osan-ab',
    name: 'Osan Air Base',
    hostCountry: 'South Korea',
    region: 'indo-pacific',
    serviceNote: 'USAF fighter wing in ROK',
    geothermalLens: false,
    smrLens: true,
    note: 'Major ROK-hosted air base in public materials.',
    sources: ['Public USAF / USFK pages'],
  },
  {
    id: 'kunsan-ab',
    name: 'Kunsan Air Base',
    hostCountry: 'South Korea',
    region: 'indo-pacific',
    serviceNote: 'USAF fighter wing on west coast',
    geothermalLens: false,
    smrLens: false,
    note: 'Public ROK-hosted air base.',
    sources: ['Public USAF / USFK pages'],
  },
  {
    id: 'camp-casey',
    name: 'Camp Casey',
    hostCountry: 'South Korea',
    region: 'indo-pacific',
    serviceNote: 'Army installation north of Seoul',
    geothermalLens: false,
    smrLens: false,
    note: 'Named public USFK Army installation. Representative, not exhaustive for Korea.',
    sources: ['Public USFK pages'],
  },
  {
    id: 'al-udeid-ab',
    name: 'Al Udeid Air Base',
    hostCountry: 'Qatar',
    region: 'middle-east',
    serviceNote: 'Major air and command presence',
    geothermalLens: false,
    smrLens: true,
    note: 'High-visibility public CENTCOM-related location. Extreme cooling loads; SMR lens is density / resilience framing only.',
    sources: ['Public USAF / host-nation materials'],
  },
  {
    id: 'nsa-bahrain',
    name: 'Naval Support Activity Bahrain',
    hostCountry: 'Bahrain',
    region: 'middle-east',
    serviceNote: 'U.S. Navy Fifth Fleet support',
    geothermalLens: false,
    smrLens: true,
    note: 'Enduring naval headquarters / support presence in public materials.',
    sources: ['Public U.S. Navy pages'],
  },
  {
    id: 'ali-al-salem-ab',
    name: 'Ali Al Salem Air Base',
    hostCountry: 'Kuwait',
    region: 'middle-east',
    serviceNote: 'Air mobility and support presence',
    geothermalLens: false,
    smrLens: false,
    note: 'Public Kuwait-hosted location used by U.S. forces.',
    sources: ['Public USAF / host materials'],
  },
  {
    id: 'camp-lemonnier',
    name: 'Camp Lemonnier',
    hostCountry: 'Djibouti',
    region: 'africa',
    serviceNote: 'U.S. Navy-led installation; AFRICOM support',
    geothermalLens: true,
    smrLens: true,
    note: 'East African Rift geothermal province is public geology. Tag is regional resource context next to a named enduring base.',
    sources: ['Public U.S. Navy / AFRICOM materials', 'Public East Africa geothermal literature'],
  },
  {
    id: 'pituffik-sb',
    name: 'Pituffik Space Base',
    hostCountry: 'Greenland (Denmark)',
    region: 'americas',
    serviceNote: 'Formerly Thule Air Base; USSF installation',
    geothermalLens: false,
    smrLens: true,
    note: 'Arctic enduring presence with extreme logistics. Energy resilience is a standing public theme; no project claim.',
    sources: ['Public USSF / Danish host materials'],
  },
  {
    id: 'soto-cano-ab',
    name: 'Soto Cano Air Base',
    hostCountry: 'Honduras',
    region: 'americas',
    serviceNote: 'Joint Task Force-Bravo support',
    geothermalLens: true,
    smrLens: false,
    note: 'Central America has public geothermal power history. Tag is regional only.',
    sources: ['Public USAF / SOUTHCOM materials'],
  },
  {
    id: 'guantanamo-nb',
    name: 'Naval Station Guantanamo Bay',
    hostCountry: 'Cuba',
    region: 'americas',
    serviceNote: 'U.S. Navy station',
    geothermalLens: false,
    smrLens: false,
    note: 'Long-standing public U.S. installation. Included as a named Americas location in open sources.',
    sources: ['Public U.S. Navy pages'],
  },
]

export function regionLabel(id) {
  return REGIONS.find((r) => r.id === id)?.label || id
}

export function hostCountries() {
  return [...new Set(CANDIDATES.map((c) => c.hostCountry))].sort((a, b) => a.localeCompare(b))
}

export function filterCandidates({ region = 'all', country = 'all', lens = 'all', q = '' } = {}) {
  const query = q.trim().toLowerCase()
  return CANDIDATES.filter((c) => {
    if (region !== 'all' && c.region !== region) return false
    if (country !== 'all' && c.hostCountry !== country) return false
    if (lens === 'geothermal' && !c.geothermalLens) return false
    if (lens === 'smr' && !c.smrLens) return false
    if (query) {
      const hay = `${c.name} ${c.hostCountry} ${c.serviceNote} ${c.note}`.toLowerCase()
      if (!hay.includes(query)) return false
    }
    return true
  })
}

export function inventoryStats() {
  const byRegion = {}
  const byCountry = {}
  for (const c of CANDIDATES) {
    byRegion[c.region] = (byRegion[c.region] || 0) + 1
    byCountry[c.hostCountry] = (byCountry[c.hostCountry] || 0) + 1
  }
  return {
    total: CANDIDATES.length,
    geothermal: CANDIDATES.filter((c) => c.geothermalLens).length,
    smr: CANDIDATES.filter((c) => c.smrLens).length,
    countries: Object.keys(byCountry).length,
    byRegion,
    byCountry,
  }
}
