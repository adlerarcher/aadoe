export const NODES = [
  {
    id: 'apex',
    mark: 'TU',
    name: 'The Thermal Underground',
    host: 'thermalunderground.org',
    href: 'https://thermalunderground.org/',
    status: 'live',
    district: 'guide',
    short: 'Field guide',
    x: 800,
    y: 360,
    r: 28,
    does: 'Geothermal field guide: production, permitting, workforce, and the overview that the other properties sit on.',
  },
  {
    id: 'sepi',
    mark: 'SEPI',
    name: 'Subsurface Energy Permitting Index',
    host: 'sepi.thermalunderground.org',
    href: 'https://sepi.thermalunderground.org/',
    status: 'demo',
    district: 'permitting',
    short: 'Index',
    x: 560,
    y: 620,
    r: 22,
    does: 'Index of agency systems of record. Connections are coordinated once. Other platforms read from here instead of wiring up agencies themselves.',
  },
  {
    id: 'gpcp',
    mark: 'GPCP',
    name: 'Geothermal Permitting Coordination Platform',
    host: 'gpcp.thermalunderground.org',
    href: 'https://gpcp.thermalunderground.org/',
    status: 'demo',
    district: 'permitting',
    short: 'Coordination',
    x: 800,
    y: 700,
    r: 22,
    does: 'For a specified geothermal project: what applies, who runs each review, what waits on what, and how long it takes. Built on the SEPI index.',
  },
  {
    id: 'gpic',
    mark: 'GPIC',
    name: 'Geothermal Permitting Innovation Collaborative',
    host: 'gpic.thermalunderground.org',
    href: 'https://gpic.thermalunderground.org/',
    status: 'demo',
    district: 'permitting',
    short: 'Collaborative',
    x: 1040,
    y: 620,
    r: 22,
    does: 'The living community for geothermal permitting across federal, state, Tribal, and applicant practitioners. Programs, events, and resource libraries.',
  },
  {
    id: 'mdev',
    mark: 'MDEV',
    name: 'International Market Development',
    host: 'mdev.thermalunderground.org',
    href: 'https://mdev.thermalunderground.org/',
    status: 'live',
    district: 'markets',
    short: 'Markets',
    x: 380,
    y: 250,
    r: 20,
    does: 'Country markets, recent deals, financing, and policy—so you can see where U.S. technology and services fit overseas.',
  },
  {
    id: 'odev',
    mark: 'ODEV',
    name: 'Organization Development',
    host: 'odev.thermalunderground.org',
    href: 'https://odev.thermalunderground.org/',
    status: 'building',
    district: 'markets',
    short: 'Organization',
    x: 1220,
    y: 250,
    r: 20,
    does: 'How the work is run: cycle, groups, model, and organization.',
  },
  {
    id: 'aadoe',
    mark: 'AADOE',
    name: 'Thermal Underground properties',
    host: 'aadoe.thermalunderground.org',
    href: 'https://aadoe.thermalunderground.org/',
    status: 'here',
    district: 'directory',
    short: 'This map',
    x: 800,
    y: 880,
    r: 20,
    does: 'This map. Every thermalunderground.org property, and what it does.',
  },
]

export const LINKS = [
  { from: 'apex', to: 'sepi' },
  { from: 'apex', to: 'gpcp' },
  { from: 'apex', to: 'gpic' },
  { from: 'apex', to: 'mdev' },
  { from: 'apex', to: 'odev' },
  { from: 'apex', to: 'aadoe' },
  { from: 'sepi', to: 'gpcp' },
  { from: 'gpcp', to: 'gpic' },
]

export const DISTRICTS = [
  { id: 'markets', label: 'Markets', x: 800, y: 96 },
  { id: 'guide', label: 'Field guide', x: 800, y: 210 },
  { id: 'permitting', label: 'Permitting', x: 800, y: 545 },
]

export const STATUS_LABEL = {
  live: 'Live',
  demo: 'Demo',
  building: 'Building',
  here: 'You are here',
}

export const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]))

export function nodeFromPath() {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace('#', '')
  return NODES.some((n) => n.id === hash) ? hash : null
}
