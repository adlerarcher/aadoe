import { getPermittingNote } from './content.jsx'
import { getDrillingTopicSection } from './drillingContent.jsx'

export const SITE = {
  name: 'The Thermal Underground',
  url: 'https://thermalunderground.org',
  author: 'Adler Archer',
  authorUrl: 'https://adlerarcher.com/',
  locale: 'en_US',
  defaultDescription:
    'A geothermal field guide by Adler Archer. Primer, underground thermal energy storage, federal toolbox, permitting, international deployment, and where the industry stands now.',
  defaultImage: '/adler-archer.png',
  sameAs: [
    'https://adlerarcher.com/',
    'https://adlerarcher.com/pif/',
    'https://helloadler.com/',
    'https://presidentialinnovationfellows.gov/fellows/adler-archer/',
    'https://linkedin.com/in/adlerarcher',
  ],
}

const PAGE_META = {
  '/': {
    title: 'The Thermal Underground | Geothermal field guide',
    description:
      'Geothermal heat, production technology, federal permitting, underground storage, and development data.',
  },
  '/primer': {
    title: 'Geothermal primer | The Thermal Underground by Adler Archer',
    description:
      'A scroll-driven introduction to geothermal energy by Adler Archer. The gradient, direct use, and links to hydrothermal, EGS, AGS, and supercritical.',
  },
  '/toolbox/primer': {
    title: 'Geothermal primer | The Thermal Underground by Adler Archer',
    description:
      'A scroll-driven introduction to geothermal energy by Adler Archer. The gradient, direct use, and links to hydrothermal, EGS, AGS, and supercritical.',
  },
  '/toolbox/hydrothermal': {
    title: 'Hydrothermal geothermal | The Thermal Underground overview',
    description:
      'How conventional hydrothermal geothermal works: heat, water, and permeable rock in one place, and why it remains the most mature commercial path.',
  },
  '/toolbox/egs': {
    title: 'Enhanced Geothermal Systems (EGS) | The Thermal Underground overview',
    description:
      'Enhanced Geothermal Systems explained: engineering permeability in hot dry rock so geothermal works where nature did not pre-build a reservoir.',
  },
  '/toolbox/ags': {
    title: 'Advanced Geothermal Systems (AGS) | The Thermal Underground overview',
    description:
      'Closed-loop advanced geothermal systems: sealed pipes, controlled circulation, and where the approach fits in the next wave of deployment.',
  },
  '/toolbox/supercritical': {
    title: 'Supercritical geothermal | The Thermal Underground overview',
    description:
      'Superhot and supercritical geothermal: the frontier of extreme temperature, higher energy density, and the materials challenge at depth.',
  },
  '/toolbox/glossary': {
    title: 'Geothermal glossary | The Thermal Underground by Adler Archer',
    description: 'Geothermal terms used across the site, with one-line definitions.',
  },
  '/glossary': {
    title: 'Geothermal glossary | The Thermal Underground by Adler Archer',
    description: 'Geothermal terms used across the site, with one-line definitions.',
  },
  '/toolbox': {
    title: 'Geothermal overview | The Thermal Underground by Adler Archer',
    description:
      'Federal geothermal data sources, maps, and modeling tools.',
  },
  '/toolbox/portals': {
    title: 'Geothermal helpful links | The Thermal Underground',
    description:
      'Federal hubs, data catalogs, modeling tools, regional datasets, reports, and numbered references for geothermal work.',
  },
  '/citations': {
    title: 'References & citations | The Thermal Underground',
    description:
      'Numbered bibliography for statistics, regional datasets, and claims cited in The Thermal Underground field guide.',
  },
  '/toolbox/data-and-modeling': {
    title: 'Geothermal data & modeling | The Thermal Underground overview',
    description:
      'Federal subsurface data catalogs, heat-flow databases, maps, GETEM, GEOPHIRES, SAM, and other modeling tools explained for geothermal scoping and early design.',
  },
  '/toolbox/data-sources': {
    title: 'Geothermal data & modeling | The Thermal Underground overview',
    description:
      'Federal subsurface data catalogs, heat-flow databases, maps, and geothermal project datasets for site scoping.',
  },
  '/toolbox/modeling-tools': {
    title: 'Geothermal data & modeling | The Thermal Underground overview',
    description:
      'GETEM, GEOPHIRES, SAM, CREST, and other federal modeling tools for geothermal performance and economics.',
  },
  '/toolbox/guides': {
    title: 'Geothermal guides & protocols | The Thermal Underground overview',
    description:
      'GeoRePORT, induced seismicity protocols, market reports, and other reference documents for geothermal work.',
  },
  '/workforce': {
    title: 'Geothermal workforce | The Thermal Underground',
    description:
      'Field skills, permitting professional pathways, Tribal workforce programs, PACT consortia, and training resources for geothermal deployment.',
  },
  '/workforce/field': {
    title: 'Field skills | Workforce | The Thermal Underground',
    description:
      'Oil-and-gas crossover, GEODE, PACT consortia, well control certification, and geothermal-specific rig hazards.',
  },
  '/workforce/permitting': {
    title: 'Permitting workforce | Permitting | The Thermal Underground',
    description:
      'NEPA, NHPA, ESA, groundwater review skills, and environmental consulting pipelines for geothermal projects.',
  },
  '/workforce/community': {
    title: 'Community & Tribal workforce | The Thermal Underground',
    description:
      'Local hire, Tribal energy capacity, and PACT funding for Tribal Colleges and Universities building regional training consortia.',
  },
  '/workforce/programs': {
    title: 'Workforce programs | The Thermal Underground',
    description:
      'DOE HGEO workforce hub: MLEF, ORISE, Geothermal INTERN, GEODE, UTR, PACT, Collegiate Competition, plus trade and state training pathways.',
  },
  '/toolbox/workforce': {
    title: 'Geothermal workforce | The Thermal Underground',
    description:
      'Field skills, permitting professional pathways, Tribal workforce programs, and training resources for geothermal deployment.',
  },
  '/utes': {
    title: 'Underground thermal energy storage | Overview | The Thermal Underground',
    description:
      'Underground thermal energy storage: ATES, BTES, RTES, systems and design, benefits, case studies, and resources for building and district decarbonization.',
  },
  '/underground-thermal-energy-storage': {
    title: 'Underground thermal energy storage | Overview | The Thermal Underground',
    description:
      'Overview of underground thermal energy storage: seasonal charge and discharge, ATES, BTES, RTES, and how UTES fits building and district decarbonization.',
  },
  '/toolbox/energy-storage': {
    title: 'Underground thermal energy storage | Overview | The Thermal Underground',
    description:
      'Overview of underground thermal energy storage: seasonal charge and discharge, ATES, BTES, RTES, and how UTES fits building and district decarbonization.',
  },
  '/international': {
    title: 'International geothermal | The Thermal Underground',
    description:
      'Global deployment leaders, market trends, two-way knowledge exchange, and where the U.S. fits in the international geothermal picture.',
  },
  '/projects': {
    title: 'Geothermal projects | Production | The Thermal Underground',
    description:
      'From lease to operation: five-stage lifecycle and risk profile, plus parallel lanes for exploration, permitting, water rights, grid, drilling, supply chain, and financing.',
  },
  '/projects/drilling': {
    title: 'Drilling 101 | Production | The Thermal Underground',
    description:
      'Geothermal well primer: drilling basics, well construction after TD, well control, BOPE, MPD matrices, and reference links for field training.',
  },
  '/projects/drilling/basics': {
    title: 'Drilling basics | Drilling 101 | The Thermal Underground',
    description:
      'Rotary drilling, mud circulation, casing overview, geothermal vs. oil-and-gas crossover, and logging before the safety depth.',
  },
  '/projects/drilling/construction': {
    title: 'Well construction | Drilling 101 | The Thermal Underground',
    description:
      'Geothermal well construction: casing program, cement and bond logs, wellhead tie-in, completions, testing, integrity, and plugging and abandonment.',
  },
  '/projects/drilling/safety': {
    title: 'Drilling safety | Drilling 101 | The Thermal Underground',
    description:
      'Geothermal well control: kicks from steam flashing and lost circulation, MPD operations matrix, BOP elastomer limits, and CalGEM references.',
  },
  '/permitting': {
    title: 'Geothermal permitting | The Thermal Underground',
    description:
      'Federal environmental review for geothermal: NEPA, ESA, NHPA, agency coordination, people in the relay, and permitting workforce pathways.',
  },
  '/permitting/problem': {
    title: 'The permitting relay | Permitting | The Thermal Underground',
    description:
      'Why federal geothermal projects take five to seven years, where the schedule accumulates, and why the bottleneck is paperwork, not physics.',
  },
  '/permitting/opportunity': {
    title: 'Permitting opportunity | Permitting | The Thermal Underground',
    description:
      'Shared data, modern tooling, and better handoffs. How improved coordination can reduce permitting time and cost while preserving statutory protections.',
  },
  '/permitting/people': {
    title: 'Who is in the permitting relay | Permitting | The Thermal Underground',
    description:
      'Federal offices, land agencies, national laboratories, and partners in the geothermal permitting relay, plus short notes on NEPA, FAST-41, Section 106, and PermitAI.',
  },
  '/adler-archer': {
    title: 'About this site | The Thermal Underground',
    description:
      'Who built The Thermal Underground, why geothermal, and links to related work. Personal site—not an official DOE publication.',
  },
}

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function metaForPath(path) {
  if (path.startsWith('/permitting/notes/')) {
    const slug = path.slice('/permitting/notes/'.length)
    const entry = getPermittingNote(slug)
    if (entry) {
      const excerpt = entry.body[0]
      return {
        title: `${entry.title} | Permitting · Notes | The Thermal Underground`,
        description: excerpt.length > 155 ? `${excerpt.slice(0, 155)}…` : excerpt,
        path,
      }
    }
  }
  const drillingMatch = path.match(/^\/projects\/drilling\/(basics|construction|safety)\/([^/]+)$/)
  if (drillingMatch) {
    const topic = getDrillingTopicSection(drillingMatch[1], drillingMatch[2])
    if (topic) {
      const parentLabels = {
        basics: 'Drilling basics',
        construction: 'Well construction',
        safety: 'Drilling safety',
      }
      const parent = parentLabels[drillingMatch[1]] || 'Drilling 101'
      const excerpt = topic.body[0]
      return {
        title: `${topic.title} | ${parent} | The Thermal Underground`,
        description: excerpt.length > 155 ? `${excerpt.slice(0, 155)}…` : excerpt,
        path,
      }
    }
  }
  const base = PAGE_META[path] || PAGE_META['/']
  return { ...base, path }
}

export function applyPageMeta(path) {
  const meta = metaForPath(path)
  const url = `${SITE.url}${meta.path === '/' ? '' : meta.path}`
  const image = `${SITE.url}${SITE.defaultImage}`

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('name', 'author', SITE.author)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', SITE.name)
  setMeta('property', 'og:locale', SITE.locale)
  setMeta('property', 'og:image', image)
  setMeta('name', 'twitter:card', 'summary')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', image)
  setCanonical(url)
}

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.defaultDescription,
        inLanguage: 'en-US',
        author: { '@id': `${SITE.url}/adler-archer#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/adler-archer#person`,
        name: SITE.author,
        url: SITE.authorUrl,
        sameAs: SITE.sameAs,
        jobTitle: 'Presidential Innovation Advisor',
        worksFor: {
          '@type': 'Organization',
          name: 'U.S. Department of Energy',
        },
        description:
          'Engineer, scientist, and Presidential Innovation Advisor working on geothermal energy, federal permitting, and energy infrastructure.',
      },
    ],
  }
}
