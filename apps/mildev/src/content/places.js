import { CANDIDATES, REGIONS } from './candidates.js'

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
}

const COUNTRY_PAGES = {
  germany: {
    energy: [
      'Germany produces geothermal electricity and district heat under federal mining and renewable-energy law.',
      'U.S. Army and Air Force garrisons in Rhineland-Palatinate, Bavaria, Baden-Württemberg, and Hesse are enduring load centers.',
    ],
    pocs: [
      { office: 'Federal Ministry for Economic Affairs and Climate Action', url: 'https://www.bmwk.de/Navigation/EN/Home/home.html' },
      { office: 'U.S. Embassy Berlin', url: 'https://de.usembassy.gov/' },
      { office: 'U.S. Air Forces in Europe and Air Forces Africa', url: 'https://www.usafe.af.mil/' },
    ],
  },
  'united-kingdom': {
    energy: [
      'The Department for Energy Security and Net Zero administers UK energy policy, including nuclear new-build and heat.',
      'RAF Lakenheath and RAF Mildenhall are dense U.S. Air Force loads in East Anglia.',
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
      'U.S. Air Force and Navy loads sit in the north, in Naples, and in Sicily.',
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
      'Japan is a volcanic-arc nation with commercial geothermal generation. The Ministry of Economy, Trade and Industry administers geothermal policy.',
      'U.S. air, naval, Marine, and Army loads concentrate on Okinawa, in Kanto, at Iwakuni, at Sasebo, and in northern Honshu.',
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
      'Camp Humphreys, Osan Air Base, Kunsan Air Base, and Camp Casey are high-density U.S. loads.',
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
      'Al Udeid Air Base is a high cooling-load air and command location.',
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
}

const REGION_PAGES = {
  europe: {
    energy: [
      'Host-nation geothermal production is established in Germany, Italy, Turkey, and the Azores. The United Kingdom is a civil nuclear market.',
      'The largest U.S. loads are in Germany and the United Kingdom.',
    ],
  },
  'indo-pacific': {
    energy: [
      'Japan produces commercial geothermal power. The Republic of Korea operates a large civil nuclear fleet.',
      'U.S. air, naval, Marine, and Army loads concentrate in Japan and South Korea.',
    ],
  },
  'middle-east': {
    energy: [
      'Host-nation programs are dominated by gas and expanding solar. Installation loads are cooling-heavy.',
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

export function basesForCountry(name) {
  return CANDIDATES.filter((c) => c.hostCountry === name)
}

export function basesForRegion(regionId) {
  return CANDIDATES.filter((c) => c.region === regionId)
}

export function getCountry(slug) {
  const name = Object.keys(COUNTRY_SLUGS).find((n) => COUNTRY_SLUGS[n] === slug)
  if (!name) return null
  const bases = basesForCountry(name)
  if (!bases.length) return null
  const page = COUNTRY_PAGES[slug] || { energy: [], pocs: [] }
  const region = REGIONS.find((r) => r.id === bases[0].region)
  return {
    slug,
    name,
    regionId: bases[0].region,
    regionLabel: region?.label || bases[0].region,
    energy: page.energy,
    pocs: page.pocs || [],
    bases,
  }
}

export function getRegion(id) {
  const region = REGIONS.find((r) => r.id === id)
  if (!region) return null
  const bases = basesForRegion(id)
  const countries = [...new Set(bases.map((b) => b.hostCountry))]
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      name,
      slug: countrySlug(name),
      count: bases.filter((b) => b.hostCountry === name).length,
    }))
  const page = REGION_PAGES[id] || { energy: [] }
  return {
    id,
    label: region.label,
    energy: page.energy,
    countries,
    bases,
  }
}

export function countryMarkers() {
  const byCountry = new Map()
  for (const c of CANDIDATES) {
    if (!byCountry.has(c.hostCountry)) byCountry.set(c.hostCountry, [])
    byCountry.get(c.hostCountry).push(c)
  }
  return [...byCountry.entries()].map(([name, bases]) => ({
    slug: countrySlug(name),
    name,
    count: bases.length,
    lon: bases.reduce((s, b) => s + b.lon, 0) / bases.length,
    lat: bases.reduce((s, b) => s + b.lat, 0) / bases.length,
    region: bases[0].region,
  }))
}

export function regionMarkers() {
  return REGIONS.map((r) => ({
    id: r.id,
    label: r.label,
    count: CANDIDATES.filter((c) => c.region === r.id).length,
    ...REGION_MAP[r.id],
  }))
}
