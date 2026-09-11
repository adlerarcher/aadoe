export const PERMITTING_SECTIONS = [
  { id: 'problem', to: '/permitting/problem', label: 'The problem', default: true },
  { id: 'opportunity', to: '/permitting/opportunity', label: 'Opportunity' },
  { id: 'people', to: '/permitting/people', label: 'People' },
  { id: 'workforce', to: '/workforce/permitting', label: 'Workforce' },
]

/** Project overview only — appears under Production nav with Drilling 101. */
export const PROJECTS_SECTIONS = [
  { id: 'overview', to: '/projects', label: 'Projects', default: true },
  { id: 'drilling', to: '/projects/drilling', label: 'Drilling 101' },
]

export const PROJECTS = {
  kicker: 'Production · Projects',
  titleLead: 'From lease',
  titleEmphasis: 'to operation',
  lede: 'A geothermal plant requires resource confirmation, federal and state reviews, water and land rights, grid access, drilling and procurement commitments, and financing. Each step runs on its own schedule.',
  intro: [
    'The permitting guide on this site describes the federal environmental relay: NEPA, species and historic-preservation consultation, BLM lead-agency work, and handoffs between offices. That sequence is often the longest thread. Projects also wait on exploration approvals, state water rights, interconnection queues, rig availability, long-lead equipment, and financing conditions.',
    'Smaller developers face each requirement with less internal capacity than majors with standing contracts and balance-sheet depth.',
    'Developers and lenders also think in a five-stage lifecycle, from pre-exploration through decades of operation under a power purchase agreement. Feasibility studies at each gate are how teams quantify and retire risk before the next capital commitment.[37]',
  ],
  lifecycle: {
    id: 'lifecycle',
    kicker: 'Developer framing',
    title: 'Five stages and the risk profile',
    body: [
      'Geothermal power projects unfold over a 20\u201330 year PPA horizon. Risk is highest when the resource is still unproven and again when the field moves into development drilling, plant construction, and commissioning. Once the plant is operating and the reservoir is managed, technical risk falls even though long-term performance still matters.',
      'Each stage has its own feasibility question: is the area worth exploring, does the resource support a plant, can the field be developed on schedule, will commissioning prove capacity, and can production be sustained for the life of the contract. The World Bank\u2019s geothermal feasibility guidance describes that gate-by-gate logic for lenders.[37]',
      'The seven lanes below map the parallel threads that cut across those stages: permitting, water, grid, drilling, supply chain, and financing can each stall progress regardless of which lifecycle phase you are in. The National Geothermal Academy at UNR teaches this lifecycle framing in its drilling courses; the revived 2026 session is taught by Well Control School at the Redfield campus next to Steamboat Hills.[16,36]',
    ],
    stages: [
      { name: 'Pre-exploration', note: 'Area identification, early financing screens, owner staffing, and exploration planning before significant capital.' },
      { name: 'Exploration', note: 'Gradient holes, geophysics, slim and exploratory wells, and prefeasibility work to confirm whether a resource exists.' },
      { name: 'Development', note: 'Production drilling, long-lead procurement, field infrastructure, and advanced environmental and drilling permits.' },
      { name: 'Plant commissioning', note: 'Construction, quality control, grid interconnection, startup testing, and proof that the plant meets PPA capacity.' },
      { name: 'Resource maintenance & reservoir management', note: 'Long-term operation, reinjection, performance monitoring, and reservoir management for the life of the PPA.' },
    ],
    aside: {
      label: 'Risk mitigation',
      text: 'Feasibility studies are the decision tool at every stage: they translate subsurface uncertainty into cost, schedule, and revenue assumptions lenders and equity can underwrite.',
    },
    relatedLinks: [
      { label: 'World Bank feasibility guidance', url: 'https://documents.worldbank.org/en/publication/documents-reports/documentdetail/36016' },
      { label: 'National Geothermal Academy', url: 'https://gbcge.org/learn/' },
      { label: 'Drilling 101', to: '/projects/drilling' },
      { label: 'Financing lane', to: '/projects#financing' },
    ],
  },
  lanes: [
    {
      id: 'exploration',
      num: '01',
      title: 'Exploration & resource proof',
      body: [
        'Before production drilling, a project needs permission to characterize the subsurface. That can mean temperature-gradient holes, slim wells, geophysical surveys, and core or log programs, each with its own federal or state filing depending on land status. In Nevada, NBMG and the UNR Keck subsurface explorer are common regional starting points for maps and well records.[7,9,24] For international scoping, Project InnerSpace\u2019s open GeoMap platform publishes regional subsurface heat data for every major world region.[32]',
        'On Federal geothermal leases, exploration plans and drilling permits precede the full NEPA record for a commercial plant. The exploration stage is often six to eighteen months not because the holes require that long, but because approvals, seasonal access, and contractor mobilization stack sequentially.',
      ],
      bullets: [
        'Temperature-gradient and slim-hole programs to characterize the resource before production wells',
        'Federal lease terms and BLM exploration requirements on public land',
        'State geothermal or oil-and-gas rules where the resource sits on private or split estate',
        'Data packages that later support NEPA, financing, and offtake review',
      ],
    },
    {
      id: 'permitting',
      num: '02',
      title: 'Permitting & environmental review',
      body: [
        'This is the relay described in the Permitting pages. A typical Federal path from lease to operating plant runs five to seven years,[21] and most of that time is review, not construction. NEPA, ESA, NHPA, and parallel state permits each address a distinct public interest and each developed on its own timeline.',
        'Regulatory frameworks are a recurring barrier for next-generation geothermal internationally as well as domestically. The CEM GeoFuture Initiative identifies permitting, data quality, and project development rules among the cross-cutting constraints its case study series and technical assistance aim to address.[33]',
        'Compatible reviews can run in parallel when agencies share data and align schedules. FAST-41, PermitAI, and RECO coordination support that work.',
      ],
      relatedLinks: [
        { label: 'The permitting relay', to: '/permitting/problem' },
        { label: 'Coordination improvements', to: '/permitting/opportunity' },
        { label: 'Agencies in the relay', to: '/permitting/people' },
      ],
    },
    {
      id: 'water',
      num: '03',
      title: 'Water rights & extraction',
      body: [
        'Hydrothermal and many EGS designs move fluid through the subsurface. Western states especially tie geothermal to water law: rights to extract, rights to reinject, and sometimes separate approvals for consumptive use or aquifer impact. In Nevada, fluid chemistry and aquifer context often draw on NBMG geochemical databases during early review.[10]',
        'Open-loop ATES and aquifer-dependent systems face similar requirements on the building side. Closed-loop designs avoid some groundwater issues but do not eliminate land and drilling permits. Water law is often decisive even when geology appears favorable.',
      ],
      bullets: [
        'State water-rights allocation and priority systems, especially in the arid West',
        'Groundwater extraction and reinjection permits, often a different office from BLM geothermal',
        'Water quality, discharge, and monitoring conditions tied to production fluids',
        'Tribal and community concern where aquifers are shared resources',
      ],
    },
    {
      id: 'grid',
      num: '04',
      title: 'Grid & interconnection',
      body: [
        'A well field without transmission access or a power purchase agreement cannot deliver electricity to the grid. Distance to existing lines, available capacity, and utility interconnection queues affect project economics even when the geology is favorable.',
        'Geothermal projects compete for queue position with solar, wind, storage, and load growth in the same regions. Offtake agreements and study deposits often follow schedules unrelated to NEPA completion.',
      ],
      bullets: [
        'Proximity to existing transmission and substation upgrade costs',
        'Interconnection studies, network upgrades, and queue position',
        'Power purchase agreements or corporate offtake that satisfy lender requirements',
        'Firm, baseload output as a consideration for utilities and large loads',
      ],
    },
    {
      id: 'drilling',
      num: '05',
      title: 'Drilling permits & rig access',
      body: [
        'Environmental clearance and a drilling permit are not the same document. Applications for permit to drill, state geothermal or oil-and-gas commissions, and site-specific safety plans can lag behind or run ahead of the NEPA schedule depending on project phasing.',
        'Rig availability follows oil-and-gas market conditions, not the permitting calendar. When hydrocarbon activity increases, directional spreads, high-temperature tools, and experienced crews are often committed elsewhere. Geothermal draws on that supply chain but inherits its cycles.',
        'Well control on geothermal rigs is not the same problem set as on a standard oil-and-gas well: steam flashing, lost circulation, and undetected gas change the kick picture. Annular BOP elastomer temperature ratings matter when hot fluid reaches the stack during a kill. The Drilling & safety page covers what differs and where BOPE and state manuals fit on the schedule.[26]',
      ],
      bullets: [
        'APD and state drilling permits aligned with the environmental record',
        'Phased drilling: exploration vs production wells on different schedules',
        'Rig and crew scheduling against O&G demand in the same basins',
        'High-temperature and directional capability for EGS and deep targets',
        'Well control, MPD matrix, BOPE elastomers, and geothermal kick scenarios on the project path',
      ],
      relatedLinks: [
        { label: 'Drilling & safety', to: '/projects/drilling/safety' },
        { label: 'Workforce · Field skills', to: '/workforce/field' },
        { label: 'Sandia drilling handbook', url: 'https://www.osti.gov/servlets/purl/1325261' },
      ],
    },
    {
      id: 'supply',
      num: '06',
      title: 'Supply chain & long-lead equipment',
      body: [
        'Casing, wellhead assemblies, turbines, and custom high-temperature hardware require long lead times. High-temperature BOP stacks and annular elastomers belong in the same procurement window as casing design, not after the rig is booked. Purchase orders placed late can add sixteen to eighteen months even when permits are in hand.[1]',
        'Geothermal-specific alloys and sizes compete with general oilfield demand. Ordering long-lead equipment after final investment decision often adds schedule risk not visible on permitting timelines alone.',
      ],
      bullets: [
        'Production casing and liner strings sized for temperature and chemistry',
        'Wellhead, master valve, and surface facility lead times',
        'Turbine and binary ORC packages for power projects',
        'Early procurement or idle time between permitted and drill-ready status',
      ],
    },
    {
      id: 'financing',
      num: '07',
      title: 'Financing & project scale',
      body: [
        'Financing typically requires resource confirmation, permits advanced enough to withstand challenge, and a credible offtake path before debt or major equity is committed. Exploration and drilling carry high upfront cost and technical risk.',
        'Financing is also a stated barrier in the CEM GeoFuture Initiative\u2019s next-generation geothermal work, alongside nascent technologies and data availability. The initiative\u2019s case study series and industry engagement target those deployment gaps at the international level.[33]',
        'Smaller developers and regional businesses often lack internal drilling divisions or standing rig contracts. Delays in water rights, interconnection, or procurement extend carrying costs and compress the window for equity raises that fund the next project stage.',
      ],
      bullets: [
        'Resource proof and permit progress as conditions precedent to debt',
        'Equity that must cover years of pre-revenue expenditure',
        'Tax credit and incentive timing relative to placed-in-service dates',
        'Scale: smaller projects still pay fixed transaction and legal costs',
      ],
      relatedLinks: [
        { label: '2025 U.S. Geothermal Market Report', to: '/toolbox/portals' },
      ],
    },
  ],
  closing: {
    heading: 'Related pages',
    body: [
      'The Permitting pages cover the federal relay, agency roles, and notes on NEPA, FAST-41, and Section 106. State water and drilling rules are summarized in OpenEI and the RAPID Toolkit on Helpful links.',
      'The five-stage lifecycle describes how risk and feasibility evolve over a PPA; the seven lanes describe what can block progress at any point on that path. Treating them separately early tends to extend the overall timeline.',
    ],
  },
}
