export const WORKFORCE_SECTIONS = [
  { id: 'overview', to: '/workforce', label: 'Overview', default: true },
  { id: 'field', to: '/workforce/field', label: 'Field skills' },
  { id: 'community', to: '/workforce/community', label: 'Community & Tribal' },
  { id: 'programs', to: '/workforce/programs', label: 'Programs' },
]

export const WORKFORCE = {
  stats: [
    { value: '300k+', label: 'Transferable workers', note: 'DOE estimate of oil-and-gas-adjacent skills that map to geothermal, 2024', cite: [3] },
    { value: '<9k', label: 'U.S. geothermal jobs today', note: 'Current employment base relative to projected project demand', cite: [1] },
    { value: '3', label: 'Hiring lanes', note: 'Field, review, and community capacity' },
  ],
  pipeline: {
    heading: 'How skills move into the field',
    steps: [
      { label: 'Adjacent experience', detail: 'Oil and gas, mining, utilities, building trades' },
      { label: 'Targeted retraining', detail: 'GEODE, PACT consortia, colleges, union pathways' },
      { label: 'Project work', detail: 'Pilot wells, environmental review, community partnerships' },
      { label: 'Operating fleet', detail: 'Repeatable hiring, local supply chains, institutional memory' },
    ],
  },
  programCategories: ['All', 'Internships & fellowships', 'Student competitions', 'Field skills', 'Permitting practice', 'Tribal workforce', 'State pipelines', 'Professional community', 'Direct use & GHP', 'Federal grants'],
  hgeoCatalog: {
    heading: 'DOE HGEO workforce programs',
    intro: 'The Hydrocarbons and Geothermal Energy Office maintains one hub for internships, grants, and student competitions spanning coal, oil, natural gas, and geothermal careers. The groups below mirror that page; check it for current deadlines.[29]',
    hub: {
      label: 'HGEO Workforce Programs (DOE)',
      url: 'https://www.energy.gov/hgeo/hgeo-workforce-programs',
      cite: [29],
    },
    factSheets: [
      {
        label: 'HGEO Workforce Development Opportunities fact sheet',
        url: 'https://www.energy.gov/hgeo/articles/fact-sheet-hgeo-workforce-development-opportunities',
      },
      {
        label: 'PACT Initiative fact sheet',
        url: 'https://www.energy.gov/hgeo/articles/fact-sheet-partnerships-academic-industry-career-training-pact-initiative',
        cite: [28],
      },
    ],
    groups: [
      {
        title: 'Internship and fellowship opportunities',
        items: [
          {
            name: 'Mickey Leland Energy Fellowship (MLEF)',
            url: 'https://orise.orau.gov/mlef/',
            note: '10-week paid summer research fellowship for undergraduate and graduate STEM students at DOE national laboratories or headquarters. Stipend plus possible travel and housing support.',
          },
          {
            name: 'ORISE Programs (DOE)',
            url: 'https://orise.orau.gov/doe/',
            note: 'Oak Ridge Institute for Science and Education fellowships and research appointments supporting DOE missions, including HGEO policy and technology work.',
          },
        ],
      },
      {
        title: 'Grant programs and planning initiatives',
        items: [
          {
            name: 'Geothermal INTERN (NSF\u2013DOE)',
            url: 'https://new.nsf.gov/funding/opportunities/intern-supplements-non-academic-research-interns',
            note: 'Graduate students on active NSF grants design custom non-academic internships with geothermal industry hosts. Rolling NSF applications; 10\u201320 internships supported per year.',
          },
          {
            name: 'Geothermal Energy from Oil and Gas Demonstrated Engineering (GEODE)',
            url: 'https://www.energy.gov/articles/doe-invest-165-million-advance-domestic-geothermal-energy-deployment',
            note: 'Roadmaps O&G knowledge into geothermal deployment. Includes workforce surveys, internships, Student Days workshops, and a Geothermal Innovation Summit.',
            cite: [3],
          },
          {
            name: 'University Training and Research (UTR)',
            url: 'https://www.energy.gov/hgeo/funding-notice-university-training-and-research-fossil-energy-and-carbon-management',
            note: 'Competitive university grants for early-stage research, student training, and workforce development. Includes University Coal Research, University Carbon Research, and HBCU\u2013MSI sub-programs.',
          },
          {
            name: 'Partnerships for Academic-Industry Career Training (PACT)',
            url: 'https://www.energy.gov/hgeo/funding-notice-partnerships-academic-industry-career-training-pact',
            note: 'Regional consortia building stackable credentials for geothermal and hydrocarbon careers. Up to $2.3M reserved for Tribal Colleges and Universities.',
            cite: [28],
          },
        ],
      },
      {
        title: 'Other student opportunities',
        items: [
          {
            name: 'Geothermal Collegiate Competition',
            url: 'https://www.energy.gov/hgeo/geothermal/geothermal-collegiate-competition',
            note: 'Annual DOE competition for college teams to design real-world geothermal solutions. Technical and policy tracks; funded for 10+ years as part of American-Made prizes.',
          },
        ],
      },
    ],
  },
  programs: [
    {
      name: 'HGEO Workforce Programs (DOE)',
      url: 'https://www.energy.gov/hgeo/hgeo-workforce-programs',
      category: 'Federal grants',
      featured: true,
      note: 'Official hub listing MLEF, ORISE, Geothermal INTERN, GEODE, UTR, PACT, and the Geothermal Collegiate Competition.',
      cite: [29],
    },
    {
      name: 'Mickey Leland Energy Fellowship (MLEF)',
      url: 'https://orise.orau.gov/mlef/',
      category: 'Internships & fellowships',
      featured: true,
      note: '10-week paid summer STEM research at DOE labs or headquarters. Managed through HGEO\u2019s university and talent pipeline programs.',
      cite: [29],
    },
    {
      name: 'ORISE Programs (DOE)',
      url: 'https://orise.orau.gov/doe/',
      category: 'Internships & fellowships',
      note: 'Research appointments and fellowships for students, postgraduates, and faculty supporting DOE energy and policy missions.',
      cite: [29],
    },
    {
      name: 'Geothermal INTERN (NSF\u2013DOE)',
      url: 'https://new.nsf.gov/funding/opportunities/intern-supplements-non-academic-research-interns',
      category: 'Internships & fellowships',
      featured: true,
      note: 'Graduate students on NSF grants design industry internships advancing geothermal technologies. Students work with companies, national labs, or agencies.',
      cite: [29],
    },
    {
      name: 'Geothermal Collegiate Competition',
      url: 'https://www.energy.gov/hgeo/geothermal/geothermal-collegiate-competition',
      category: 'Student competitions',
      featured: true,
      note: 'Collegiate teams develop geothermal heating, cooling, or policy proposals with community partners. Cash prizes and resume experience.',
      cite: [29],
    },
    {
      name: 'University Training and Research (UTR)',
      url: 'https://www.energy.gov/hgeo/funding-notice-university-training-and-research-fossil-energy-and-carbon-management',
      category: 'Federal grants',
      note: 'Multi-year university grants for early-stage energy research and student training, including HBCU\u2013MSI and carbon research tracks.',
      cite: [29],
    },
    {
      name: 'HGEO Workforce Development fact sheet',
      url: 'https://www.energy.gov/hgeo/articles/fact-sheet-hgeo-workforce-development-opportunities',
      category: 'Federal grants',
      note: 'June 2026 overview of HGEO internships, grants, and student competitions across hydrocarbon and geothermal careers.',
      cite: [29],
    },
    {
      name: 'PACT Initiative (DOE HGEO / TechWerx)',
      url: 'https://www.energy.gov/hgeo/funding-notice-partnerships-academic-industry-career-training-pact',
      category: 'Federal grants',
      featured: true,
      note: 'Up to $11.3M for regional consortia of colleges, employers, and workforce boards to build stackable credentials in geothermal and hydrocarbon careers. Up to $2.3M set aside for Tribal Colleges and Universities.',
      cite: [28],
    },
    {
      name: 'GEODE initiative (DOE)',
      url: 'https://www.energy.gov/articles/doe-invest-165-million-advance-domestic-geothermal-energy-deployment',
      category: 'Field skills',
      featured: true,
      note: 'Moves oil-and-gas drilling expertise into geothermal; centers of excellence, workforce surveys, Student Days, and retraining partnerships.',
      cite: [3],
    },
    {
      name: 'Handbook of Best Practices for Geothermal Drilling (Sandia/DOE)',
      url: 'https://www.osti.gov/servlets/purl/1325261',
      category: 'Field skills',
      featured: true,
      note: 'Federal field reference on rig selection, casing, mud, lost circulation, well control, and logging.',
      cite: [26],
    },
    {
      name: 'Well Control School',
      url: 'https://wellcontrolschool.com',
      category: 'Field skills',
      featured: true,
      note: 'IADC WellCAP/WellSHARP and IWCF well control certification training, plus an open glossary of more than 1,300 drilling and well control terms.',
      cite: [36],
    },
    {
      name: 'Geothermal Rising',
      url: 'https://geothermal.org/',
      category: 'Professional community',
      featured: true,
      note: 'Main U.S. trade organization: conferences, working groups, and the professional network many developers hire from.',
    },
    {
      name: 'Project InnerSpace',
      url: 'https://projectinnerspace.org',
      category: 'Professional community',
      featured: true,
      note: 'Philanthropy-funded nonprofit working to scale global geothermal by 2030. Open GeoMap prospecting data, GeoFund community pilots, PIVOT convenings, and GEODE consortium partner.',
      cite: [32],
    },
    {
      name: 'PermitAI (PNNL / DOE Policy)',
      url: 'https://www.pnnl.gov/projects/permitai',
      category: 'Permitting practice',
      note: 'AI-assisted NEPA document tooling built with the permitting workforce in mind: search, assembly, and drafting support.',
    },
    {
      name: 'CEQ Permitting Innovation Center',
      url: 'https://www.whitehouse.gov/ceq/',
      category: 'Permitting practice',
      note: 'Government-wide NEPA modernization and practitioner resources as agencies update their own procedures.',
    },
    {
      name: 'DOE Office of Indian Energy',
      url: 'https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs',
      category: 'Tribal workforce',
      note: 'Technical assistance and capacity building for Tribal energy development, including geothermal where resources align. Co-funds PACT awards for TCUs.',
      cite: [28],
    },
    {
      name: 'NASEO Geothermal Power Accelerator',
      url: 'https://naseo.org/',
      category: 'State pipelines',
      note: 'Thirteen-state network connecting state energy offices, workforce, and geothermal deployment planning.',
    },
    {
      name: 'Environmental Careers Organization (ECO)',
      url: 'https://www.eco.org/',
      category: 'Permitting practice',
      note: 'Nonprofit placing early-career environmental professionals with agencies and consultancies, a common entry path into NEPA work.',
    },
    {
      name: 'Geo-Heat Center (Oregon IT)',
      url: 'https://geoheat.oit.edu/',
      category: 'Direct use & GHP',
      note: 'Long-running direct-use and ground-source heat pump training; relevant to shallow heat and UTES-adjacent skills.',
    },
    {
      name: 'TechWerx PACT opportunity page',
      url: 'https://www.techwerx.org/opportunities/HGEO-IE-PACT',
      category: 'Federal grants',
      note: 'Application portal, templates, teaming list, and webinar materials for PACT consortia.',
      cite: [28],
    },
  ],
  related: [
    { label: 'Projects overview', to: '/projects', note: 'Full project path from lease to operation.' },
    { label: 'Drilling 101', to: '/projects/drilling', note: 'Basics, well control, BOPE, and safety references.' },
    { label: 'Permitting guide: People', to: '/permitting/people', note: 'Who is in the federal geothermal relay.' },
    { label: 'Overview: Helpful links', to: '/toolbox/portals', note: 'Federal hubs and reference documents.' },
  ],
  coda: 'Additions and corrections welcome via the About section.',
}

export const WORKFORCE_PAGES = {
  overview: {
    kicker: 'Workforce',
    titleLead: 'The people',
    titleEmphasis: 'who build it',
    lede: 'Geothermal needs drillers, subsurface engineers, environmental reviewers, and community partners. Much of that capacity already exists. The work is targeted upskilling, better pipelines, and hiring lanes that run in parallel.',
    sections: [
      {
        id: 'capacity',
        depth: 'Overview · 01',
        kicker: 'Adjacent industries',
        title: 'Capacity already exists',
        body: [
          'Much of the required drilling and subsurface expertise already exists in adjacent industries. Directional drillers, mud engineers, completions crews, and subsurface geologists bring transferable skills. Reservoir logic, the regulatory stack, and community participation differ from oil and gas work.',
        ],
        visual: 'skillCrossover',
      },
      {
        id: 'federal',
        depth: 'Overview · 02',
        kicker: 'Federal programs',
        title: 'Training consortia and competitions',
        body: [
          'Federal programs are starting to fund regional training consortia, not just single-company retraining. DOE\u2019s HGEO office lists internships, university grants, and student competitions on one workforce hub, including PACT consortia, GEODE, MLEF, Geothermal INTERN, and the Collegiate Competition.[29] Philanthropy-funded groups such as Project InnerSpace run parallel deployment work: open GeoMap prospecting data, GeoFund pilots, and PIVOT convenings that engage oil-and-gas entities on geothermal scale-up.[32]',
          'The programs page maps those entries directly. The pages in this section follow three hiring lanes: field skills, permitting practice, and community and Tribal capacity.',
        ],
        visual: 'workforcePipeline',
      },
      {
        id: 'lanes',
        depth: 'Overview · 03',
        kicker: 'Three hiring lanes',
        title: 'Where to go next',
        body: [
          'Field skills cover rig crossover, well control, and geothermal-specific hazards. Permitting practice covers NEPA, NHPA, ESA, and groundwater review. Community and Tribal capacity covers local hire, Tribal energy programs, and PACT funding for Tribal Colleges and Universities.',
        ],
        visual: 'threeLanes',
        relatedLinks: [
          { label: 'Field skills', to: '/workforce/field' },
          { label: 'Permitting practice', to: '/workforce/permitting' },
          { label: 'Community & Tribal', to: '/workforce/community' },
          { label: 'Programs directory', to: '/workforce/programs' },
        ],
      },
    ],
  },
  field: {
    kicker: 'Workforce · Field skills',
    titleLead: 'Subsurface',
    titleEmphasis: 'and field skills',
    lede: 'Directional drillers, mud engineers, completions crews, and subsurface geologists already exist in adjacent industries. Geothermal adds high-temperature hardware, different kick scenarios, and a smaller repeat-hire base.',
    sections: [
      {
        id: 'crossover',
        depth: 'Field · 01',
        kicker: 'Oil & gas crossover',
        title: 'Moving rig skills into geothermal',
        body: [
          'DOE\u2019s GEODE initiative and related funding aim to move oil-and-gas know-how into geothermal drilling and completions. Project InnerSpace helped form the GEODE consortium with SPE International and Geothermal Rising.[3,32] GEODE also runs workforce-facing activities such as stakeholder surveys, Student Days workshops, and a Geothermal Innovation Summit.[3] Developer-led training, community college partnerships, and union apprenticeship routes are showing up in western states as EGS and closed-loop pilots scale.',
          'Graduate students can enter through the NSF\u2013DOE Geothermal INTERN program, designing custom industry internships while on active NSF grants.[29] That path builds research-to-industry bridges separate from rig crossover hiring.',
        ],
        visual: 'rigCrossover',
      },
      {
        id: 'consortia',
        depth: 'Field · 02',
        kicker: 'Regional pipelines',
        title: 'PACT consortia and credentials',
        body: [
          'PACT consortia can fund new or enhanced training programs that lead to stackable credentials and employer placement in geothermal as well as oil, gas, and coal. A typical consortium includes at least one two-year college or trade school, two industry employers, and a workforce development board.[28] That structure is designed for regional pipelines, not one-off company academies.',
        ],
        visual: 'credentialStack',
      },
      {
        id: 'well-control',
        depth: 'Field · 03',
        kicker: 'Under pressure',
        title: 'Well control and geothermal hazards',
        body: [
          'For field fundamentals, the Sandia/DOE drilling handbook covers rig selection, high-temperature capability, mud programs, and common geothermal hazards such as lost circulation and stuck pipe.[26] The Projects drilling page covers how geothermal kick scenarios differ from standard oil-and-gas well control, including BOP elastomer temperature limits on annular preventers.',
          'Rig crews crossing from hydrocarbons typically hold current well control certification through IWCF, IADC, or operator-equivalent schools such as Well Control School. The WCS glossary is a useful reference for standard O&G drilling vocabulary before you layer on geothermal hazards such as steam flashing, H\u2082S gas, high-temperature BOPE hardware, and managed-pressure drilling matrices that must be rebuilt for hot geothermal returns.[26,35,36]',
        ],
        aside: {
          label: 'Field rule',
          text: 'This lane requires directional control, well integrity, fluids, shut-in discipline, and\u2014on MPD wells\u2014a project-specific operations matrix that defines when to stay in MPD mode versus transition to conventional well control.',
        },
        visual: 'wellControl',
        signals: ['GEODE centers of excellence', 'PACT regional consortia', 'HT BOP elastomers', 'MPD operations matrix', 'Union and community college partnerships', 'Oil-and-gas crossover hiring'],
        relatedLinks: [
          { label: 'Projects · Lifecycle & risk', to: '/projects#lifecycle' },
          { label: 'Projects · Drilling & safety', to: '/projects/drilling/safety' },
          { label: 'BOP elastomers', to: '/projects/drilling/safety/elastomers' },
          { label: 'MPD operations matrix', to: '/projects/drilling/safety/mpd-matrix' },
          { label: 'Programs directory', to: '/workforce/programs' },
          { label: 'Sandia drilling handbook', url: 'https://www.osti.gov/servlets/purl/1325261' },
          { label: 'Well Control School glossary', url: 'https://wellcontrolschool.com/glossary' },
        ],
      },
    ],
  },
  permitting: {
    kicker: 'Permitting · Workforce',
    titleLead: 'Environmental',
    titleEmphasis: 'review skills',
    lede: 'Permitting is a skilled profession, not clerical work. Geothermal projects stack federal environmental law, state groundwater rules, and technology-specific review in ways that take years to learn on the job.',
    sections: [
      {
        id: 'review-stack',
        depth: 'Permitting · 01',
        kicker: 'The review stack',
        title: 'NEPA, NHPA, ESA, and groundwater',
        body: [
          'Consultants, agency staff, and Tribal historic-preservation officers need fluency in NEPA, NHPA, ESA, and state groundwater rules. ATES and open-loop systems add hydrogeology to a stack that was already deep.',
          'Federal modernization efforts such as PermitAI are built to support practitioners, not replace them. Training still lives in agencies, consultancies, and professional societies.',
        ],
        visual: 'reviewStack',
      },
      {
        id: 'pathways',
        depth: 'Permitting · 02',
        kicker: 'Entry paths',
        title: 'Consulting pipelines and consortium models',
        body: [
          'PACT awards focus on production-side occupations, but the same consortium model, community colleges, and workforce boards also matter for environmental consulting pipelines. ECO and similar placement programs remain common entry paths into NEPA work.',
        ],
        visual: 'permittingPath',
        signals: ['NEPA and NHPA fluency', 'Tribal consultation practice', 'Environmental consulting pipelines', 'PermitAI and agency modernization'],
        relatedLinks: [
          { label: 'Permitting guide', to: '/permitting/problem' },
          { label: 'Agencies in the relay', to: '/permitting/people' },
          { label: 'PermitAI note', to: '/permitting/notes/permitai' },
          { label: 'THPO note', to: '/permitting/notes/thpo' },
        ],
      },
    ],
  },
  community: {
    kicker: 'Workforce · Community & Tribal',
    titleLead: 'Community',
    titleEmphasis: 'and Tribal capacity',
    lede: 'Projects succeed when local and Tribal partners help shape workforce plans early, not after the hire list is written. Training dollars only matter if the skills stay in the community.',
    sections: [
      {
        id: 'relationships',
        depth: 'Community · 01',
        kicker: 'Early partnership',
        title: 'Who gets the jobs, who keeps the skills',
        body: [
          'DOE Office of Indian Energy, Tribal energy programs, and community benefit frameworks tied to large infrastructure all touch this lane. The work is relationship, translation, and long-term capacity: who gets the jobs, who owns the skills, and who stays when the pilot ends.',
        ],
        visual: 'communityNetwork',
      },
      {
        id: 'pact-tcu',
        depth: 'Community · 02',
        kicker: 'PACT & TCUs',
        title: 'Tribal college funding and consortia',
        body: [
          'PACT includes up to $2.3 million in awards reserved for Tribal Colleges and Universities, co-funded by the Office of Indian Energy.[28] Consortia must include at least one two-year institution such as a TCU, two industry employers, and a workforce development entity. Phase 1 is planning; Phase 2 delivers training, stackable credentials, and tracked job placement.',
          'Topic A consortia enhance existing programs with new credentials, courses, or equipment. Topic B consortia stand up new programs with at least three courses and hands-on training. Both tracks require enrollment, retention, graduation, and placement metrics for two years after launch.[28]',
        ],
        bullets: [
          'Up to $11.3M total; managed by TechWerx under a DOE Partnership Intermediary Agreement',
          'Regional consortia: 2-year college or trade school + 2 employers + workforce development entity',
          'Geothermal is an eligible technology area alongside oil, gas, and coal',
          'Stackable credentials and measured job placement, not classroom-only certificates',
        ],
        visual: 'consortiumModel',
        signals: ['Tribal energy development', 'PACT TCU set-aside', 'Community benefit agreements', 'Local hire and training targets'],
        relatedLinks: [
          { label: 'Permitting note: THPO', to: '/permitting/notes/thpo' },
          { label: 'What is a THPO? (NATHPO)', url: 'https://www.nathpo.org/what-is-a-thpo/' },
          { label: 'NPS Tribal Historic Preservation Office Program', url: 'https://www.nps.gov/subjects/historicpreservationfund/tribal-historic-preservation-office-program.htm' },
          { label: 'PACT funding notice (DOE)', url: 'https://www.energy.gov/hgeo/funding-notice-partnerships-academic-industry-career-training-pact' },
          { label: 'Programs directory', to: '/workforce/programs' },
        ],
      },
    ],
  },
  programs: {
    kicker: 'Workforce · Programs',
    titleLead: 'Programs',
    titleEmphasis: 'and pathways',
    lede: 'Grouped by lane. None of these replace time on a real project, but each shows where to start.',
    sections: [
      {
        id: 'hgeo-hub',
        depth: 'Programs · 01',
        kicker: 'DOE HGEO',
        title: 'The federal program map',
        body: [
          'DOE\u2019s HGEO Workforce Programs page is the authoritative list of federal internships, grants, and competitions.[29] The catalog below mirrors its three sections; the filterable directory adds trade organizations, state networks, and college programs.',
        ],
        visual: 'programHub',
      },
      {
        id: 'internships',
        depth: 'Programs · 02',
        kicker: 'Internships & fellowships',
        title: 'MLEF, ORISE, and Geothermal INTERN',
        body: [
          'Mickey Leland Energy Fellowships place STEM students at DOE labs for paid summer research. ORISE runs broader research appointments across DOE missions. Geothermal INTERN lets graduate students on NSF grants design custom industry internships advancing geothermal technologies.[29]',
        ],
        visual: 'internPipeline',
      },
      {
        id: 'grants',
        depth: 'Programs · 03',
        kicker: 'Grants & competitions',
        title: 'GEODE, UTR, PACT, and Collegiate Competition',
        body: [
          'GEODE moves O&G drilling expertise into geothermal. University Training and Research funds multi-year university grants. PACT builds regional consortia with stackable credentials. The Geothermal Collegiate Competition gives students real-world design experience with industry mentors.[3,28,29]',
        ],
        visual: 'grantFlow',
      },
    ],
  },
}
