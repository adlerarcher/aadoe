export const GROUPS = [
  {
    id: 'guide',
    label: 'Field guide',
    blurb: 'The primer the rest of the network sits on.',
    items: [
      {
        id: 'apex',
        mark: 'TU',
        name: 'The Thermal Underground',
        host: 'thermalunderground.org',
        href: 'https://thermalunderground.org/',
        status: 'live',
        does: 'Geothermal field guide: production, permitting, workforce, and the overview that the other properties sit on.',
      },
    ],
  },
  {
    id: 'permitting',
    label: 'Permitting',
    blurb: 'Index, coordination, and the people who run the reviews.',
    items: [
      {
        id: 'sepi',
        mark: 'SEPI',
        name: 'Subsurface Energy Permitting Index',
        host: 'sepi.thermalunderground.org',
        href: 'https://sepi.thermalunderground.org/',
        status: 'demo',
        does: 'Index of agency systems of record. Connections are coordinated once. Other platforms read from here instead of wiring up agencies themselves.',
      },
      {
        id: 'gpcp',
        mark: 'GPCP',
        name: 'Geothermal Permitting Coordination Platform',
        host: 'gpcp.thermalunderground.org',
        href: 'https://gpcp.thermalunderground.org/',
        status: 'demo',
        does: 'For a specified geothermal project: what applies, who runs each review, what waits on what, and how long it takes. Built on the SEPI index.',
      },
      {
        id: 'gpic',
        mark: 'GPIC',
        name: 'Geothermal Permitting Innovation Collaborative',
        host: 'gpic.thermalunderground.org',
        href: 'https://gpic.thermalunderground.org/',
        status: 'demo',
        does: 'The living community for geothermal permitting across federal, state, Tribal, and applicant practitioners. Programs, events, and resource libraries.',
      },
    ],
  },
  {
    id: 'markets',
    label: 'Markets & organization',
    blurb: 'Where the work goes next, and how it is run.',
    items: [
      {
        id: 'mdev',
        mark: 'MDEV',
        name: 'International Market Development',
        host: 'mdev.thermalunderground.org',
        href: 'https://mdev.thermalunderground.org/',
        status: 'live',
        does: 'Country markets, recent deals, financing, and policy—so you can see where U.S. technology and services fit overseas.',
      },
      {
        id: 'odev',
        mark: 'ODEV',
        name: 'Organization Development',
        host: 'odev.thermalunderground.org',
        href: 'https://odev.thermalunderground.org/',
        status: 'building',
        does: 'How the work is run: cycle, groups, model, and organization.',
      },
    ],
  },
  {
    id: 'directory',
    label: 'Directory',
    blurb: 'This host. A map of the others.',
    items: [
      {
        id: 'aadoe',
        mark: 'AADOE',
        name: 'Thermal Underground properties',
        host: 'aadoe.thermalunderground.org',
        href: 'https://aadoe.thermalunderground.org/',
        status: 'here',
        does: 'This page. Every thermalunderground.org property, and what it does.',
      },
    ],
  },
]

export const STATUS_LABEL = {
  live: 'Live',
  demo: 'Demo',
  building: 'Building',
  here: 'You are here',
  infra: 'Infrastructure',
}
