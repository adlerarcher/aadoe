export const UTES = {
  overview: {
    kicker: 'Energy Storage',
    titleLead: 'Underground thermal',
    titleEmphasis: 'energy storage',
    lede: 'Storing heat and cold in rock, soil, or aquifers so buildings and districts can bank seasonal energy instead of wasting it.',
    body: [
      'Underground thermal energy storage (UTES) moves thermal energy into the subsurface when surplus is available, heat from summer cooling or solar collectors, cold from winter operations or free cooling, and extracts it when demand returns. The subsurface stores that energy with gradual losses over time.',
      'That matters because buildings still need heating and cooling on schedules that do not match when renewables produce power. A ground-source heat pump can use steady shallow temperature year-round. UTES goes further: it deliberately imbalances the ground seasonally, charging one part of the year and discharging another.',
      'The family includes open-loop aquifer storage (ATES), closed-loop borehole fields (BTES), cavern and pit systems (CTES), high-temperature rock storage (RTES), and energy geostructures. What they share is geology as the storage medium and a design life measured in decades.',
      'UTES complements hydrothermal power and EGS electricity. It applies where loads are seasonal, geology supports storage, and operators can monitor the system over years.',
    ],
  },
  systems: {
    kicker: 'Energy storage · Systems & design',
    titleLead: 'ATES, BTES, RTES,',
    titleEmphasis: 'and how they\u2019re built',
    lede: 'Most projects fall into a few families. The right choice is geology first, then scale, load balance, and a design process that front-loads site work and monitoring.',
    systems: [
      {
        abbr: 'ATES',
        name: 'Aquifer thermal energy storage',
        body: [
          'An open-loop system stores energy in groundwater within a suitable aquifer. Warm and cold wells, or warm and cold zones within a single aquifer, hold seasonal energy in the pore water itself. Where hydrogeology cooperates, ATES offers high capacity and relatively low incremental storage cost per megawatt-hour.',
          'Typical thermal recovery runs 55\u201370% when annual heating and cooling loads are roughly balanced.[19] Imbalanced sites, heavy heating-only campuses in cold climates, for example, need a strategy for surplus cold or rejected heat. The Netherlands leads deployment, with thousands of systems, because aquifer mapping, guidance, and review pathways are mature.[19]',
        ],
      },
      {
        abbr: 'BTES',
        name: 'Borehole thermal energy storage',
        body: [
          'A closed-loop field of vertical boreholes with grouted heat exchangers stores energy in the surrounding soil or rock without extracting groundwater. That makes BTES viable in more geologies, at the cost of lower energy density and higher drilling cost per stored unit.',
          'Fields are often sized with line-source or numerical models and operated over many seasons. Solar-assisted district heating is a common application: Drake Landing Solar Community in Alberta charged a BTES array with solar thermal and achieved a high solar fraction for space heat. Community-scale projects, roughly tens to hundreds of homes, appear frequently in the literature.',
        ],
      },
      {
        abbr: 'CTES',
        name: 'Cavern and pit storage',
        body: [
          'Cavern thermal energy storage uses mined or natural caverns, often filled with water, as a large-volume tank. Pit storage and insulated tank systems sit at or below grade. These appear where aquifers are unsuitable but excavation or cavern space is available, and where very large volume is needed for district networks.',
        ],
      },
      {
        abbr: 'RTES',
        name: 'Rock thermal energy storage',
        body: [
          'Rock thermal energy storage (RTES) stores heat directly in solid rock, often at higher temperatures and greater depth than shallow BTES fields. Water or steam may circulate through fractures or borehole heat exchangers in competent formations. Pilot projects target industrial heat loads and large seasonal storage where aquifers are unsuitable.',
          'RTES sits between BTES and cavern systems on the spectrum: more energy density than shallow borehole fields, but less mature commercially than ATES in favorable aquifers. Geology, temperature limits, and thermal stress on the rock frame the design.',
        ],
      },
      {
        abbr: 'Geo',
        name: 'Energy geostructures',
        body: [
          'Energy piles, tunnels, and basement slabs exchange heat with the ground as part of structural foundations. These blur the line between building systems and UTES when operated seasonally. Less standardized than ATES/BTES but worth tracking where infrastructure already touches the subsurface.',
        ],
      },
    ],
    comparison: {
      headers: ['Aspect', 'ATES', 'BTES'],
      rows: [
        ['Loop type', 'Open (groundwater extraction/injection)', 'Closed (fluid in sealed boreholes)'],
        ['Geology', 'Confined or usable aquifer; low natural flow often preferred', 'Competent drillable ground; groundwater quality less critical'],
        ['Typical thermal recovery', '55\u201370% with balanced loads', '40\u201360%, site- and operation-dependent'],
        ['Typical scale', 'Campus, district, large commercial', 'Community to medium commercial'],
        ['Capital intensity', 'Wells + treatment + monitoring', 'Drilling density drives cost'],
        ['Common failure modes', 'Thermal breakthrough, chemistry, regulatory limits on groundwater', 'Undersized field, long-term grout/conductivity drift'],
      ],
    },
    choosing: [
      'Map aquifers and groundwater flow before assuming ATES. A productive well is not the same as a good storage aquifer.',
      'Count both heating and cooling megawatt-hours annually. Balance improves recovery; imbalance needs a rejection strategy.',
      'Closed-loop BTES when groundwater use is restricted or geology is uncertain.',
      'Plan monitoring from day one. You cannot optimize what you do not measure across seasons.',
    ],
    designSubsections: [
      {
        title: 'Site selection and characterization',
        body: [
          'Start with thermal conductivity, heat capacity, and depth to competent formation. For ATES add permeability, natural groundwater gradient and direction, water chemistry, and existing wells. A fast-flowing aquifer can advect stored energy away; stagnant water can help or hurt depending on well layout.',
          'Desktop studies rarely suffice. Pilot wells, thermal response tests, and tracer work are common on serious projects. Budget them early.',
        ],
      },
      {
        title: 'Well and borehole fields',
        body: [
          'ATES layouts separate warm and cold storage spatially or temporally, with spacing set to limit thermal breakthrough between zones. BTES fields use borehole spacing and depth to match charge/discharge rates without overcooling or overheating the ground over years.',
          'Typical borehole depths span roughly 50\u2013200 m for BTES, depending on load and geology. ATES wells follow the aquifer horizon. Both need access for maintenance.',
        ],
      },
      {
        title: 'Surface plant and integration',
        body: [
          'Heat exchangers, pumps, and controls connect the subsurface to building plant. Heat pumps boost temperature for space heat or provide chilled water for cooling. UTES works best paired with waste heat, solar thermal, district loops, or data-center rejection heat, not as an isolated afterthought on a conventional boiler plant.',
        ],
      },
      {
        title: 'Modeling and sizing',
        body: [
          'Designers use analytical line-source models for first-pass BTES sizing and numerical tools for complex fields and ATES plumes. Models are only as good as load profiles and ground properties fed into them. Conservative assumptions and multi-year operation scenarios beat optimistic single-season spreadsheets.',
        ],
      },
      {
        title: 'Monitoring and operations',
        body: [
          'Track injection and extraction temperatures, flow rates, and seasonal energy balance every year. ATES systems often require groundwater monitoring for temperature and chemistry. Operators who treat UTES as set-and-forget usually get disappointing recovery by year five.',
        ],
      },
      {
        title: 'Permitting and environmental review',
        body: [
          'Open systems can trigger groundwater permitting, environmental review, and public scrutiny. Closed systems still face drilling and land-use requirements. Scope permitting early, especially where ATES is new to local regulators. The permitting guide on this site covers the federal relay; state groundwater rules add another layer for ATES.',
        ],
      },
    ],
  },
  practice: {
    kicker: 'Energy storage · Benefits & practice',
    titleLead: 'Benefits, cases,',
    titleEmphasis: 'and resources',
    lede: 'Conditions that favor UTES, known limitations, example projects, and reference materials.',
    tradeoffs: {
      benefits: [
        'High volumetric storage relative to surface tanks, with minimal land footprint once wells or boreholes are in',
        'Low operating cost after construction, especially when paired with waste heat or on-site renewables',
        'Long asset life, often 25\u201350 years for well infrastructure with proper maintenance',
        'Can shave peak heating and cooling demand, easing grid and district network constraints',
        'Meaningful CO\u2082 reductions when displacing fossil heat or grid-intensive cooling',
      ],
      challenges: [
        'High upfront capital; drilling and monitoring are not cheap',
        'Requires balanced or actively managed thermal loads for good recovery',
        'ATES: groundwater chemistry, aquifer impacts, and regulatory complexity',
        'BTES: drilling cost scales with field size; undersizing shows up slowly and painfully',
        'Skilled designers and operators are scarce in many U.S. markets compared with northwest Europe',
      ],
      risks: [
        { title: 'Thermal breakthrough', body: 'Warm and cold fronts meet early in the aquifer or borehole field, cutting recovery. Spacing, flow rates, and operational sequencing prevent it.' },
        { title: 'Groundwater impacts (ATES)', body: 'Temperature or chemistry changes beyond permitted bounds. Monitoring and conservative injection limits are standard mitigation.' },
        { title: 'Imbalanced loads', body: 'Heating-heavy sites in cold climates can monotonically cool the ground unless rejection heat or supplemental charging is planned.' },
        { title: 'Model mismatch', body: 'Actual loads or ground properties differ from design assumptions. Multi-year commissioning and model calibration reduce the gap.' },
      ],
      perspective:
        'UTES is established in parts of Europe and growing in North America. Projects that perform well share common traits: thorough site characterization, conservative sizing, integration with the rest of the plant, and seasonal monitoring.',
    },
    cases: [
      {
        title: 'Netherlands: national ATES scale-up',
        region: 'Europe',
        body: [
          'The Netherlands operates thousands of ATES systems, largely serving offices and campuses. National aquifer mapping, standardized environmental review, and established guidance lowered transaction costs. Where regulators and designers follow shared procedures, project review tends to proceed more efficiently.',
        ],
      },
      {
        title: 'Drake Landing Solar Community, BTES + solar heat',
        region: 'Alberta, Canada',
        body: [
          'A solar thermal array charges a BTES borehole field; heat pumps deliver space heat to homes. The project became the reference case for high solar fraction heating in a cold climate.[20] It proved BTES can work where aquifer ATES is not the default path.',
        ],
      },
      {
        title: 'Campus and district loops, U.S. pilots',
        region: 'United States',
        body: [
          'Universities and municipal district energy systems have piloted ATES and BTES for decades, with uneven but growing interest as decarbonization targets tighten. Projects often start with a central plant already serving multiple buildings, the load profile UTES needs.',
        ],
      },
      {
        title: 'Cold-climate district heating with seasonal storage',
        region: 'North America & Scandinavia',
        body: [
          'District systems exploring large pit storage or BTES to absorb summer solar or industrial waste heat for winter heat loads. Economics hinge on existing district infrastructure and the cost of alternative heat supply.',
        ],
      },
      {
        title: 'Office blocks with ATES cooling-dominated loads',
        region: 'Europe & Asia',
        body: [
          'Many ATES systems in temperate climates bank cold from summer cooling to support the following summer, with moderate heating use in between. Cooling-dominated balance can work when the aquifer and regulatory frame allow it.',
        ],
      },
    ],
    resources: {
      body: 'Use these alongside the primer and permitting sections here. UTES intersects shallow heat use, groundwater regulation, and district plant design.',
      links: [
        { label: 'IEA Energy Storage TCP, UTES', url: 'https://iea-es.org/activities/underground-thermal-energy-storage-utes/', note: 'International collaboration, case summaries, and research contacts.' },
        { label: 'NRL: Geothermal heat pumps', url: 'https://www.nrel.gov/research/re-geothermal-heat-pumps.html', note: 'U.S. lab work on GHPs and ground coupling.' },
        { label: 'GSHP screening tool (ORNL)', url: 'https://gshp.ornl.gov/', note: 'Entry-level screening for ground-coupled heat pumps.' },
        { label: 'Geothermal glossary', to: '/toolbox/glossary', note: 'UTES, ATES, BTES, and related terms.' },
        { label: 'Primer, direct use & shallow heat', to: '/toolbox/primer#directuse', note: 'Heat as heat, without seasonal banking.' },
        { label: 'Permitting guide: Problem', to: '/permitting/problem', note: 'Federal approvals relay; relevant when groundwater or federal land is involved.' },
      ],
      coda: 'Send additions or corrections through the About section.',
    },
  },
}
