import { CANDIDATES, REGIONS } from './candidates.js'
import {
  GEOTHERMAL_RANK,
  RING_OF_FIRE_GEO,
  compareByGeothermalRank,
  geothermalRank,
  isRingOfFire,
} from './ranking.js'

export const COUNTRY_SLUGS = {
  Germany: 'germany',
  'United Kingdom': 'united-kingdom',
  Italy: 'italy',
  Spain: 'spain',
  Portugal: 'portugal',
  Greece: 'greece',
  Romania: 'romania',
  Turkey: 'turkey',
  Japan: 'japan',
  'South Korea': 'south-korea',
  Qatar: 'qatar',
  Bahrain: 'bahrain',
  Kuwait: 'kuwait',
  Djibouti: 'djibouti',
  'Greenland (Denmark)': 'greenland',
  Honduras: 'honduras',
  Cuba: 'cuba',
  Indonesia: 'indonesia',
  Philippines: 'philippines',
  'New Zealand': 'new-zealand',
  Mexico: 'mexico',
  Chile: 'chile',
  'El Salvador': 'el-salvador',
  'Costa Rica': 'costa-rica',
  'Papua New Guinea': 'papua-new-guinea',
  Taiwan: 'taiwan',
  Peru: 'peru',
  Guatemala: 'guatemala',
  Nicaragua: 'nicaragua',
  Ecuador: 'ecuador',
  Colombia: 'colombia',
}

const COUNTRY_PAGES = {
  germany: {
    energy: [
      'Germany produces geothermal electricity and district heat under federal mining and renewable-energy law.',
      'U.S. Army and Air Force garrisons operate in Rhineland-Palatinate, Bavaria, Baden-Württemberg, and Hesse.',
    ],
    pocs: [
      { office: 'Federal Ministry for Economic Affairs and Climate Action', url: 'https://www.bmwk.de/Navigation/EN/Home/home.html' },
      { office: 'U.S. Embassy Berlin', url: 'https://de.usembassy.gov/' },
      { office: 'U.S. Air Forces in Europe and Air Forces Africa', url: 'https://www.usafe.af.mil/' },
    ],
  },
  'united-kingdom': {
    energy: [
      'The Department for Energy Security and Net Zero administers UK energy and heat policy.',
      'RAF Lakenheath and RAF Mildenhall are major U.S. Air Force installations in East Anglia.',
    ],
    pocs: [
      { office: 'Department for Energy Security and Net Zero', url: 'https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero' },
      { office: 'U.S. Embassy London', url: 'https://uk.usembassy.gov/' },
      { office: 'RAF Lakenheath Public Affairs', url: 'https://www.lakenheath.af.mil/' },
    ],
  },
  italy: {
    energy: [
      'Italy operates commercial geothermal power in Tuscany. The Ministry of Environment and Energy Security administers energy policy.',
      'U.S. Air Force and Navy installations operate in the north, in Naples, and in Sicily.',
    ],
    pocs: [
      { office: 'Ministry of Environment and Energy Security', url: 'https://www.mase.gov.it/' },
      { office: 'U.S. Embassy Rome', url: 'https://it.usembassy.gov/' },
      { office: 'Aviano Air Base Public Affairs', url: 'https://www.aviano.af.mil/' },
    ],
  },
  spain: {
    energy: [
      'Spain administers electricity and heat policy through the Ministry for the Ecological Transition.',
      'Naval Station Rota and Morón Air Base are Atlantic and Mediterranean logistics nodes.',
    ],
    pocs: [
      { office: 'Ministry for the Ecological Transition and the Demographic Challenge', url: 'https://www.miteco.gob.es/en.html' },
      { office: 'U.S. Embassy Madrid', url: 'https://es.usembassy.gov/' },
    ],
  },
  portugal: {
    energy: [
      'The Azores are a volcanic province with operating geothermal plants on São Miguel.',
      'Lajes Field is U.S. airfield access in the mid-Atlantic.',
    ],
    pocs: [
      { office: 'Portuguese Directorate-General for Energy and Geology', url: 'https://www.dgeg.gov.pt/' },
      { office: 'U.S. Embassy Lisbon', url: 'https://pt.usembassy.gov/' },
    ],
  },
  greece: {
    energy: [
      'Greece has documented high-enthalpy geothermal resources on several islands and in the north.',
      'Naval Support Activity Souda Bay is the U.S. Navy support location on Crete.',
    ],
    pocs: [
      { office: 'Hellenic Ministry of Environment and Energy', url: 'https://ypen.gov.gr/' },
      { office: 'U.S. Embassy Athens', url: 'https://gr.usembassy.gov/' },
    ],
  },
  romania: {
    energy: [
      'Romania produces heat from geothermal wells in the west and has a civil nuclear fleet at Cernavodă.',
      'Mihail Kogălniceanu Air Base is the named Black Sea support hub in public materials.',
    ],
    pocs: [
      { office: 'Romanian Ministry of Energy', url: 'https://energie.gov.ro/' },
      { office: 'U.S. Embassy Bucharest', url: 'https://ro.usembassy.gov/' },
    ],
  },
  turkey: {
    energy: [
      'Turkey is among the largest geothermal electricity producers. The Ministry of Energy and Natural Resources publishes capacity statistics.',
      'Incirlik Air Base is the named USAF presence at a Turkish air base.',
    ],
    pocs: [
      { office: 'Ministry of Energy and Natural Resources', url: 'https://enerji.gov.tr/' },
      { office: 'U.S. Embassy Ankara', url: 'https://tr.usembassy.gov/' },
    ],
  },
  japan: {
    energy: [
      'Japan produces commercial geothermal power. The Ministry of Economy, Trade and Industry administers geothermal policy.',
      'U.S. air, naval, Marine, and Army installations operate on Okinawa, in Kanto, at Iwakuni, at Sasebo, and in northern Honshu.',
    ],
    pocs: [
      { office: 'Ministry of Economy, Trade and Industry', url: 'https://www.meti.go.jp/english/' },
      { office: 'U.S. Embassy Tokyo', url: 'https://jp.usembassy.gov/' },
      { office: 'U.S. Forces Japan', url: 'https://www.usfj.mil/' },
      { office: 'Kadena Air Base Public Affairs', url: 'https://www.kadena.af.mil/' },
    ],
  },
  'south-korea': {
    energy: [
      'The Republic of Korea operates a large civil nuclear fleet. The Ministry of Trade, Industry and Energy administers energy policy.',
      'Camp Humphreys, Osan Air Base, Kunsan Air Base, and Camp Casey are major U.S. installations.',
    ],
    pocs: [
      { office: 'Ministry of Trade, Industry and Energy', url: 'https://www.motie.go.kr/english/' },
      { office: 'U.S. Embassy Seoul', url: 'https://kr.usembassy.gov/' },
      { office: 'United States Forces Korea', url: 'https://www.usfk.mil/' },
      { office: 'U.S. Army Garrison Humphreys', url: 'https://home.army.mil/humphreys' },
    ],
  },
  qatar: {
    energy: [
      'Qatar’s energy program is built on natural gas and a growing solar fleet under the Ministry of State for Energy Affairs.',
      'Al Udeid Air Base is a major air and command location with high cooling demand.',
    ],
    pocs: [
      { office: 'U.S. Embassy Doha', url: 'https://qa.usembassy.gov/' },
    ],
  },
  bahrain: {
    energy: [
      'The Electricity and Water Authority operates Bahrain’s power and water system.',
      'Naval Support Activity Bahrain supports U.S. Navy Fifth Fleet headquarters.',
    ],
    pocs: [
      { office: 'Electricity and Water Authority', url: 'https://www.ewa.bh/' },
      { office: 'U.S. Embassy Manama', url: 'https://bh.usembassy.gov/' },
    ],
  },
  kuwait: {
    energy: [
      'The Ministry of Electricity, Water and Renewable Energy operates Kuwait’s power system.',
      'Ali Al Salem Air Base is the named air mobility and support location.',
    ],
    pocs: [
      { office: 'U.S. Embassy Kuwait', url: 'https://kw.usembassy.gov/' },
    ],
  },
  djibouti: {
    energy: [
      'Djibouti sits on the East African Rift. The national energy program includes geothermal exploration in the Asal-Ghoubbet rift.',
      'Camp Lemonnier is the named U.S. Navy-led AFRICOM support installation.',
    ],
    pocs: [
      { office: 'U.S. Embassy Djibouti', url: 'https://dj.usembassy.gov/' },
    ],
  },
  greenland: {
    energy: [
      'Greenland energy policy is administered in Nuuk. Isolated Arctic settlements run on imported fuel and local hydro where built.',
      'Pituffik Space Base is an isolated U.S. Space Force installation with extreme logistics.',
    ],
    pocs: [
      { office: 'Government of Greenland, Ministry of Agriculture, Self-Sufficiency, Energy and Environment', url: 'https://naalakkersuisut.gl/en' },
      { office: 'U.S. Embassy Copenhagen', url: 'https://dk.usembassy.gov/' },
      { office: 'Pituffik Space Base', url: 'https://www.petersonschriever.spaceforce.mil/Pituffik-SB-Greenland/' },
    ],
  },
  honduras: {
    energy: [
      'Honduras operates geothermal plants at Platanares and has a civil geothermal concession regime.',
      'Soto Cano Air Base supports Joint Task Force-Bravo.',
    ],
    pocs: [
      { office: 'U.S. Embassy Tegucigalpa', url: 'https://hn.usembassy.gov/' },
    ],
  },
  cuba: {
    energy: [
      'Naval Station Guantanamo Bay is an isolated U.S. Navy station with an on-base power system.',
    ],
    pocs: [
      { office: 'Naval Station Guantanamo Bay Public Affairs', url: 'https://cnrse.cnic.navy.mil/Installations/NS-Guantanamo-Bay/' },
    ],
  },
  indonesia: {
    energy: [
      'Indonesia is among the largest geothermal electricity producers. The Ministry of Energy and Mineral Resources administers geothermal policy.',
      'This inventory records no named U.S. installation in Indonesia.',
    ],
    pocs: [
      { office: 'Ministry of Energy and Mineral Resources', url: 'https://www.esdm.go.id/' },
      { office: 'U.S. Embassy Jakarta', url: 'https://id.usembassy.gov/' },
    ],
  },
  philippines: {
    energy: [
      'The Philippines operates a large conventional geothermal electricity fleet. The Department of Energy publishes installed-capacity statistics.',
      'This inventory records no named U.S. installation in the Philippines.',
    ],
    pocs: [
      { office: 'Department of Energy', url: 'https://www.doe.gov.ph/' },
      { office: 'U.S. Embassy Manila', url: 'https://ph.usembassy.gov/' },
    ],
  },
  'new-zealand': {
    energy: [
      'New Zealand operates high-temperature geothermal fields for electricity and direct heat. The Ministry of Business, Innovation and Employment publishes geothermal strategy.',
      'This inventory records no named U.S. installation in New Zealand.',
    ],
    pocs: [
      { office: 'Ministry of Business, Innovation and Employment', url: 'https://www.mbie.govt.nz/' },
      { office: 'U.S. Embassy Wellington', url: 'https://nz.usembassy.gov/' },
    ],
  },
  mexico: {
    energy: [
      'Mexico produces geothermal electricity from long-running public and utility-owned fields. Implementing regulations issued in 2025 govern geothermal activity.',
      'This inventory records no named U.S. installation in Mexico.',
    ],
    pocs: [
      { office: 'U.S. Embassy Mexico City', url: 'https://mx.usembassy.gov/' },
    ],
  },
  chile: {
    energy: [
      'Chile sits on the Andean volcanic arc. Law 21.711 amends the geothermal concessions framework, including a simplified path for shallow heat projects.',
      'This inventory records no named U.S. installation in Chile.',
    ],
    pocs: [
      { office: 'U.S. Embassy Santiago', url: 'https://cl.usembassy.gov/' },
    ],
  },
  'el-salvador': {
    energy: [
      'El Salvador operates a public geothermal electricity program through LaGeo.',
      'This inventory records no named U.S. installation in El Salvador.',
    ],
    pocs: [
      { office: 'U.S. Embassy San Salvador', url: 'https://sv.usembassy.gov/' },
    ],
  },
  'costa-rica': {
    energy: [
      'Instituto Costarricense de Electricidad operates geothermal plants on the volcanic cordillera, including Miravalles.',
      'This inventory records no named U.S. installation in Costa Rica.',
    ],
    pocs: [
      { office: 'Instituto Costarricense de Electricidad', url: 'https://www.grupoice.com/' },
      { office: 'U.S. Embassy San José', url: 'https://cr.usembassy.gov/' },
    ],
  },
  'papua-new-guinea': {
    energy: [
      'Lihir Island hosts a geothermal power plant that serves the mine. The Mineral Resources Authority lists geothermal among Geological Survey energy activities.',
      'This inventory records no named U.S. installation in Papua New Guinea.',
    ],
    pocs: [
      { office: 'U.S. Embassy Port Moresby', url: 'https://pg.usembassy.gov/' },
    ],
  },
  taiwan: {
    energy: [
      'The Ministry of Economic Affairs maintains geothermal exploration and development regulations.',
      'This inventory records no named U.S. installation in Taiwan.',
    ],
    pocs: [
      { office: 'American Institute in Taiwan', url: 'https://www.ait.org.tw/' },
    ],
  },
  peru: {
    energy: [
      'Peru sits on the Andean volcanic arc. The Ministry of Energy and Mines administers geothermal concessions.',
      'This inventory records no named U.S. installation in Peru.',
    ],
    pocs: [
      { office: 'U.S. Embassy Lima', url: 'https://pe.usembassy.gov/' },
    ],
  },
  guatemala: {
    energy: [
      'Guatemala produces geothermal electricity on the Central American volcanic arc, including the Amatitlán and Zunil fields.',
      'This inventory records no named U.S. installation in Guatemala.',
    ],
    pocs: [
      { office: 'U.S. Embassy Guatemala City', url: 'https://gt.usembassy.gov/' },
    ],
  },
  nicaragua: {
    energy: [
      'Nicaragua produces geothermal electricity at Momotombo and San Jacinto-Tizate.',
      'This inventory records no named U.S. installation in Nicaragua.',
    ],
    pocs: [
      { office: 'U.S. Embassy Managua', url: 'https://ni.usembassy.gov/' },
    ],
  },
  ecuador: {
    energy: [
      'Ecuador sits on the Andean volcanic arc. CELEC EP publishes geothermal development work.',
      'This inventory records no named U.S. installation in Ecuador.',
    ],
    pocs: [
      { office: 'U.S. Embassy Quito', url: 'https://ec.usembassy.gov/' },
    ],
  },
  colombia: {
    energy: [
      'Colombia sits on the Andean volcanic arc. Public energy planning includes geothermal resource areas.',
      'This inventory records no named U.S. installation in Colombia.',
    ],
    pocs: [
      { office: 'U.S. Embassy Bogotá', url: 'https://co.usembassy.gov/' },
    ],
  },
}

const REGION_PAGES = {
  europe: {
    energy: [
      'Host-nation geothermal production is established in Germany, Italy, Turkey, and the Azores. The United Kingdom is a civil nuclear market.',
      'The largest U.S. installations in the region are in Germany and the United Kingdom.',
    ],
  },
  'indo-pacific': {
    energy: [
      'Japan produces commercial geothermal power. Neighboring volcanic-arc markets include the Philippines, Indonesia, Taiwan, Papua New Guinea, and New Zealand.',
      'U.S. air, naval, Marine, and Army installations concentrate in Japan and South Korea.',
    ],
  },
  'middle-east': {
    energy: [
      'Host-nation programs are dominated by gas and expanding solar. Installation energy demand is cooling-heavy.',
      'Named locations are in Qatar, Bahrain, and Kuwait.',
    ],
  },
  africa: {
    energy: [
      'The East African Rift is a documented high-enthalpy geothermal province.',
      'Camp Lemonnier in Djibouti is the named U.S. installation.',
    ],
  },
  americas: {
    energy: [
      'Americas geothermal markets include Mexico, Chile, El Salvador, Costa Rica, Peru, Guatemala, Nicaragua, Ecuador, and Colombia.',
      'Honduras operates geothermal plants. Pituffik and Guantanamo Bay are isolated installations with self-contained logistics.',
    ],
  },
}

const REGION_MAP = {
  europe: { lon: 14, lat: 52 },
  'indo-pacific': { lon: 138, lat: 28 },
  'middle-east': { lon: 48, lat: 26 },
  africa: { lon: 38, lat: 8 },
  americas: { lon: -75, lat: 18 },
}

export function countrySlug(name) {
  return COUNTRY_SLUGS[name] || String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function nameForSlug(slug) {
  const key = decodeURIComponent(String(slug || '')).toLowerCase()
  const fromMap = Object.keys(COUNTRY_SLUGS).find((n) => COUNTRY_SLUGS[n] === key)
  if (fromMap) return fromMap
  const names = new Set([
    ...CANDIDATES.map((c) => c.hostCountry),
    ...GEOTHERMAL_RANK,
  ])
  return [...names].find((n) => countrySlug(n) === key) || null
}

export function basesForCountry(name) {
  return CANDIDATES.filter((c) => c.hostCountry === name)
}

export function basesForRegion(regionId) {
  return CANDIDATES.filter((c) => c.region === regionId)
}

export function getCountry(slug) {
  const name = nameForSlug(slug)
  if (!name) return null
  const bases = basesForCountry(name)
  const resolved = countrySlug(name)
  const page = COUNTRY_PAGES[resolved] || { energy: [], pocs: [] }
  const regionId = bases[0]?.region || RING_OF_FIRE_GEO[name]?.region
  const region = REGIONS.find((r) => r.id === regionId)
  const rank = geothermalRank(name)
  return {
    slug: resolved,
    name,
    regionId: regionId || '',
    regionLabel: region?.label || regionId || '',
    energy: page.energy,
    pocs: page.pocs || [],
    bases,
    rank,
    ranked: rank != null,
    ringOfFire: isRingOfFire(name),
  }
}

/** Static HTML copies so GitHub Pages and vite preview return 200 for nested routes. */
export function deepLinkPaths() {
  const slugs = new Set()
  for (const name of Object.keys(COUNTRY_SLUGS)) slugs.add(COUNTRY_SLUGS[name])
  for (const c of CANDIDATES) slugs.add(countrySlug(c.hostCountry))
  for (const name of GEOTHERMAL_RANK) slugs.add(countrySlug(name))
  return [
    'inventory',
    'sources',
    'method',
    ...[...slugs].sort().map((s) => `country/${s}`),
    ...REGIONS.map((r) => `region/${r.id}`),
  ]
}

export function getRegion(id) {
  const region = REGIONS.find((r) => r.id === id)
  if (!region) return null
  const bases = basesForRegion(id)
  const countries = [...new Set(bases.map((b) => b.hostCountry))]
    .sort(compareByGeothermalRank)
    .map((name) => ({
      name,
      slug: countrySlug(name),
      count: bases.filter((b) => b.hostCountry === name).length,
      rank: geothermalRank(name),
      ranked: geothermalRank(name) != null,
      ringOfFire: isRingOfFire(name),
    }))
  const page = REGION_PAGES[id] || { energy: [] }
  const ringCountries = GEOTHERMAL_RANK
    .filter((name) => RING_OF_FIRE_GEO[name]?.region === id)
    .map((name) => ({
      name,
      slug: countrySlug(name),
      count: bases.filter((b) => b.hostCountry === name).length,
      rank: geothermalRank(name),
      ranked: true,
      ringOfFire: true,
      hasInstallations: bases.some((b) => b.hostCountry === name),
    }))
  return {
    id,
    label: region.label,
    energy: page.energy,
    countries,
    ringCountries,
    bases,
  }
}

export function countryMarkers() {
  const byCountry = new Map()
  for (const c of CANDIDATES) {
    if (!byCountry.has(c.hostCountry)) byCountry.set(c.hostCountry, [])
    byCountry.get(c.hostCountry).push(c)
  }
  return [...byCountry.entries()]
    .map(([name, bases]) => {
      const rank = geothermalRank(name)
      return {
        slug: countrySlug(name),
        name,
        count: bases.length,
        lon: bases.reduce((s, b) => s + b.lon, 0) / bases.length,
        lat: bases.reduce((s, b) => s + b.lat, 0) / bases.length,
        region: bases[0].region,
        rank,
        ranked: rank != null,
        ringOfFire: isRingOfFire(name),
        hasInstallations: true,
      }
    })
    .sort((a, b) => compareByGeothermalRank(a.name, b.name))
}

/** Volcanic-arc countries without installation pins (legacy helper). */
export function ringOfFireMarkers() {
  const hosted = new Set(CANDIDATES.map((c) => c.hostCountry))
  return GEOTHERMAL_RANK
    .filter((name) => !hosted.has(name) && RING_OF_FIRE_GEO[name])
    .map((name) => {
      const geo = RING_OF_FIRE_GEO[name]
      return {
        slug: countrySlug(name),
        name,
        count: 0,
        lon: geo.lon,
        lat: geo.lat,
        region: geo.region,
        rank: geothermalRank(name),
        ranked: true,
        ringOfFire: true,
        hasInstallations: false,
      }
    })
}

export function ringOfFireStrip() {
  const byCountry = new Map()
  for (const c of CANDIDATES) {
    byCountry.set(c.hostCountry, (byCountry.get(c.hostCountry) || 0) + 1)
  }
  return GEOTHERMAL_RANK.map((name) => ({
    name,
    slug: countrySlug(name),
    rank: geothermalRank(name),
    count: byCountry.get(name) || 0,
    hasInstallations: byCountry.has(name),
  }))
}

export function regionMarkers() {
  return REGIONS.map((r) => ({
    id: r.id,
    label: r.label,
    count: CANDIDATES.filter((c) => c.region === r.id).length,
    ...REGION_MAP[r.id],
  })).filter((r) => r.count > 0)
}
