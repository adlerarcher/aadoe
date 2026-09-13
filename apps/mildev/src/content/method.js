export const DISCLOSURE =
  'Not an official U.S. government, Department of Defense, or Department of Energy publication.'

export const SCOPE = {
  kicker: 'A Thermal Underground venture',
  titleLine: 'Overseas military',
  titleAccent: 'Energy development',
  lede:
    'MILDEV frames overseas U.S. military installations as a candidate class of host sites and load centers for geothermal and small modular reactors. It is a public research inventory, not a basing map and not a procurement channel.',
  points: [
    'Unclassified open sources only. No CUI or classified claims.',
    'Public counts of overseas presence vary by definition: CRS-style tallies of major bases often land near ~128; broader site inventories can exceed ~800. This starter set is neither.',
    'Entries are candidates for energy-development screening, not assertions that a project exists or is planned.',
  ],
}

export const COUNT_FRAMING = {
  sitesBallpark: '~800+',
  basesBallpark: '~128',
  starterNote:
    'Ballpark figures from public commentary and CRS-style base tallies. They are not MILDEV claims about current force posture. This release seeds a curated public subset and labels incompleteness.',
}

export const SOURCES = [
  {
    id: 'crs-bases',
    title: 'Congressional Research Service reports on U.S. overseas basing',
    note: 'Use for high-level host-country presence and the distinction between major installations and broader site lists. Cite the specific CRS product when quoting figures.',
    url: 'https://crsreports.congress.gov/',
  },
  {
    id: 'dod-bsr',
    title: 'DoD Base Structure Report (public editions)',
    note: 'Periodic public inventory of DoD sites. Definitions of installation, site, and location change across editions; treat counts carefully.',
    url: 'https://www.acq.osd.mil/eie/BSI/BEI_BSR.html',
  },
  {
    id: 'dod-oe',
    title: 'DoD operational energy and installation energy resilience materials',
    note: 'Public policy framing for energy assurance at installations. Does not imply site-specific geothermal or SMR projects.',
    url: 'https://www.acq.osd.mil/eie/OE/OE_index.html',
  },
  {
    id: 'doe-gto',
    title: 'DOE Geothermal Technologies Office public resources',
    note: 'Technology and resource context for geothermal. Not a military basing authority.',
    url: 'https://www.energy.gov/eere/geothermal/geothermal-technologies-office',
  },
  {
    id: 'nrc-smr',
    title: 'NRC and DOE public SMR program materials',
    note: 'Licensing and technology context for small modular reactors. Not authorization for overseas military deployment.',
    url: 'https://www.nrc.gov/reactors/new-reactors/advanced.html',
  },
  {
    id: 'host-public',
    title: 'Host-nation and command public affairs pages',
    note: 'Installation names, host countries, and open descriptions of major bases used only when published for the public.',
  },
]

export const METHOD = [
  'Include only locations that appear in open, unclassified public materials as U.S. military presence overseas (outside the 50 states). U.S. territories may be noted separately when relevant; this starter set focuses on host-nation locations.',
  'Prefer named major installations over informal site sprawl. One installation can contain many subordinate sites; MILDEV does not invent site rows to reach 800.',
  'Record host country and region for filtering. Geothermal and SMR tags mark screening relevance, not project status.',
  'Omit precise coordinates, sensitive infrastructure detail, and anything that is not already public.',
  'Label the inventory incomplete. Add rows only when a public source supports the name and host country.',
]

export const GEOTHERMAL_LENS = {
  title: 'Geothermal lens',
  lede:
    'Geothermal is a candidate for firm, on-site or near-site heat and power where geology, water, drilling access, and host-nation rules allow. Overseas bases concentrate load and raise energy-security requirements that differ from grid-only commercial projects.',
  points: [
    'Screen by regional resource potential and drilling logistics, not by branding a base as a project.',
    'Host-nation permitting, environmental review, and status-of-forces arrangements shape what is feasible.',
    'Building heat, campus microgrids, and deeper power projects are different products; keep them separate in any later diligence.',
    'Country-market geothermal context lives in MDEV. MILDEV holds the installation-facing inventory.',
  ],
}

export const SMR_LENS = {
  title: 'SMR lens',
  lede:
    'Small modular reactors appear in public defense and energy policy as a possible path to resilient, high-density power for demanding loads. MILDEV records that framing at the installation class level. It does not assert that any listed site hosts or will host a reactor.',
  points: [
    'SMR relevance here means load density, resilience interest, or public policy discussion, not a siting decision.',
    'Licensing, nuclear cooperation, and host-nation consent are separate gates from military energy interest.',
    'Treat SMR tags as a lens for research, not as a project list.',
  ],
}
