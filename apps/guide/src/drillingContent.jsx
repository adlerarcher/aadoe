export const DRILLING_SECTIONS = [
  { id: 'overview', to: '/projects/drilling', label: 'Drilling 101', default: true },
  { id: 'basics', to: '/projects/drilling/basics', label: 'Basics' },
  { id: 'construction', to: '/projects/drilling/construction', label: 'Construction' },
  { id: 'safety', to: '/projects/drilling/safety', label: 'Safety' },
]

export const DRILLING_RESOURCES = {
  heading: 'Reference documents',
  intro: 'Use these alongside coursework and field training. They describe geothermal context; certification programs cover kill math and procedures.',
  links: [
    {
      label: 'Well Control School glossary',
      url: 'https://wellcontrolschool.com/glossary',
      note: 'More than 1,300 alphabetized drilling and well control terms; standard O&G definitions.',
      cite: [36],
    },
    {
      label: 'Sandia drilling handbook',
      url: 'https://www.osti.gov/servlets/purl/1325261',
      note: 'Finger and Blankenship. Planning, casing, mud, lost circulation, well control, and logging for geothermal wells.',
      cite: [26],
    },
    {
      label: 'CalGEM instruction manuals (BOPE & H\u2082S)',
      url: 'https://www.conservation.ca.gov/calgem/pubs_stats/Pages/instruction_manuals.aspx',
      note: 'California blowout prevention and H\u2082S drilling manuals (M07, M10).',
      cite: [27],
    },
    {
      label: 'IADC WellSHARP: MPD Operations Matrix (API RP 92M)',
      url: 'https://iadc.org/wp-content/uploads/2021/12/WSP-MPDOperationsMatrix-per-API-RP-92M.pdf',
      note: 'Example matrix, operating/planned/back-pressure limits, and transition to well control.',
      cite: [35],
    },
    {
      label: 'DOE Induced Seismicity Protocol',
      url: 'https://www.energy.gov/hgeo/geothermal/articles/doe-releases-updated-induced-seismicity-protocol',
      note: 'Traffic-light monitoring for stimulation projects.',
      cite: [18],
    },
  ],
}

/** @deprecated use DRILLING_PAGES.overview */
export const DRILLING = {
  kicker: 'Production · Drilling',
  titleLead: 'Drilling',
  titleEmphasis: '101',
  lede: 'How geothermal wells get drilled, and what changes when the target is heat instead of hydrocarbons.',
}

export const DRILLING_PAGES = {
  overview: {
    kicker: 'Production · Drilling 101',
    titleLead: 'Drilling',
    titleEmphasis: '101',
    lede: 'A field primer on geothermal wells: drilling basics, construction after total depth, and well control hazards.',
    intro: [
      'Most geothermal wells use oil-and-gas rig hardware adapted for temperature, chemistry, and lost-circulation conditions. You do not need a petroleum engineering degree to follow the project path, but you do need a shared vocabulary for what happens from spud through completion and into operations.',
      'This section splits that story in three. Basics covers the rig, the hole, mud, and how geothermal targets differ from standard hydrocarbon wells. Construction covers casing, cement, wellhead tie-in, completions, and life-of-well integrity after the bit stops. Safety covers kicks, blowout preventers, elastomer limits, MPD matrices, and the permits that govern them. None of it replaces IWCF, IADC, or operator well control training.[36]',
    ],
    tracks: [
      {
        label: 'Basics',
        to: '/projects/drilling/basics',
        note: 'Rig, drill string, mud, logging, and geothermal vs. oil-and-gas crossover.',
      },
      {
        label: 'Construction',
        to: '/projects/drilling/construction',
        note: 'Casing program, cement, wellhead, completions, testing, and abandonment.',
      },
      {
        label: 'Safety',
        to: '/projects/drilling/safety',
        note: 'Well control, BOPE, high-temperature seals, MPD, and regulatory requirements.',
      },
    ],
    sections: [
      {
        id: 'on-the-path',
        kicker: 'Project context',
        title: 'Where drilling sits on the schedule',
        body: [
          'Exploration and slim holes prove the resource. Development drilling feeds the power plant. Both run on rig contracts, supply-chain lead times, and permits that may or may not align with the NEPA clock. The Projects overview maps that work against a five-stage lifecycle and risk profile.[37]',
          'Environmental clearance and a permit to drill are separate documents. BOPE must be on location, pressure-tested, and matched to expected return temperatures before the bit tags bottom on a production well.',
        ],
        image: {
          src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
          alt: 'Workers in hard hats reviewing plans at an industrial site',
        },
        relatedLinks: [
          { label: 'Projects · Lifecycle & risk', to: '/projects#lifecycle' },
          { label: 'Projects · Drilling lane', to: '/projects#drilling' },
        ],
      },
      {
        id: 'learn-more',
        kicker: 'Go deeper',
        title: 'Basics, construction, and safety',
        body: [
          'Start with Basics if you are new to rig operations or crossing from a desk role into project review. Construction covers what happens after total depth: how the well is lined, sealed, completed, and tied to surface facilities. Start with Safety if you already hold well control certification and need the geothermal-specific kick and BOPE story.',
        ],
        visual: 'rigSchematic',
        relatedLinks: [
          { label: 'Basics', to: '/projects/drilling/basics' },
          { label: 'Construction', to: '/projects/drilling/construction' },
          { label: 'Safety', to: '/projects/drilling/safety' },
          { label: 'Workforce · Field skills', to: '/workforce/field' },
        ],
      },
    ],
  },
  basics: {
    kicker: 'Drilling 101 · Basics',
    titleLead: 'The rig,',
    titleEmphasis: 'the hole',
    lede: 'Rotary drilling, fluids, casing, and the ways geothermal targets differ from a standard oil-and-gas well.',
    sections: [
      {
        id: 'rig-and-hole',
        navLabel: 'Rig & hole',
        depth: 'Basics · 01',
        kicker: 'Rotary drilling',
        title: 'From spud to total depth',
        body: [
          'A geothermal well is drilled the same way most deep holes are: a rig turns drill pipe, a bit cuts rock at the bottom, and cuttings return to surface through the annulus between pipe and open hole. Spud is the first penetration; total depth (TD) is where the drilling program stops for that section.',
          'Exploration wells may be slim or deviated to test temperature and permeability. Production wells are sized for flow, reinjection pairing, and decades of operation. EGS and deep closed-loop projects often need directional drilling and high-temperature bottom-hole assemblies borrowed from shale and deep gas experience.[26]',
        ],
        bullets: [
          'Kelly or top drive: surface equipment that rotates the string',
          'Derrick or mast: structure that handles pipe stands and running casing',
          'Exploration vs. production: different diameter, deviation, and logging programs',
        ],
        visual: 'rigSchematic',
        relatedLinks: [
          { label: 'Drill string & bits', to: '/projects/drilling/basics/string-and-bit' },
        ],
      },
      {
        id: 'string-and-bit',
        navLabel: 'String & bits',
        depth: 'Basics · 02',
        kicker: 'Bottom-hole assembly',
        title: 'Drill string, collars, and bits',
        body: [
          'The drill string is everything the rig rotates and lifts: drill pipe, heavy-weight drill pipe (HWDP), drill collars, and the bottom-hole assembly (BHA) at the end. Drill pipe is threaded steel in stands that the crew makes up and breaks out as the hole deepens. Collars are thick-walled pipe that add weight on the bit so the cutters can bite into hard rock.',
          'The BHA is the business end: the bit, stabilizers that keep the hole straight, and on directional wells a mud motor or rotary steerable system that builds angle without sliding the whole string. Measurement-while-drilling (MWD) and logging-while-drilling (LWD) tools in the BHA send trajectory and formation data uphole in real time.',
          'Bit choice depends on the rock. Roller-cone (tricone) bits with tungsten-carbide inserts are common in hard, abrasive volcanic and basement rock on geothermal programs. Polycrystalline diamond compact (PDC) bits cut faster in softer formations. Geothermal adds wear from abrasive cuttings, lost-circulation pills, and bottom-hole temperatures that limit elastomer seals in downhole motors. Bit trips to change cutters or BHA layout are a major schedule and cost line on deep wells.[26]',
        ],
        bullets: [
          'Drill pipe: thin-walled API joints that transmit rotation and mud flow',
          'Drill collars & HWDP: weight concentrated near the bit for efficient cutting',
          'BHA: bit, stabilizers, mud motor (directional), and MWD/LWD tools',
          'Roller-cone vs. PDC: formation hardness and abrasivity drive selection',
          'Bit trips: pulling the string to replace worn cutters or change the BHA',
        ],
        aside: {
          label: 'Standard vocabulary',
          text: 'The Well Control School glossary defines drill string components, bit types, and BHA hardware in full oil-and-gas detail.[36]',
        },
        visual: 'bhaDiagram',
        relatedLinks: [
          { label: 'Well Control School glossary', url: 'https://wellcontrolschool.com/glossary' },
          { label: 'Mud & circulation', to: '/projects/drilling/basics/mud-circulation' },
        ],
      },
      {
        id: 'mud-circulation',
        navLabel: 'Mud & circulation',
        depth: 'Basics · 03',
        kicker: 'Drilling fluids',
        title: 'Mud, hydrostatic head, and returns',
        body: [
          'Drilling fluid, usually called mud, cools the bit, carries cuttings out of the hole, and stabilizes the wellbore wall. Its density sets the hydrostatic pressure acting on the formation. Too little pressure and formation fluid can enter; too much and you fracture the rock and lose returns.',
          'Geothermal programs often fight lost circulation in vuggy or fractured volcanic rock. Losing mud to the formation drops the fluid level in the hole, which cuts hydrostatic head and can precede a kick. Mud chemistry must also tolerate high temperature and corrosive brines on many western U.S. fields.[26]',
        ],
        bullets: [
          'Mud pits and shakers: where returns are measured and cuttings are separated',
          'Flow in vs. flow out: the baseline balance for kick detection',
          'Lost circulation materials: pills and plugs to seal thief zones',
          'High-temperature and corrosion additives where brine and heat demand them',
        ],
        visual: 'mudCirculation',
      },
      {
        id: 'casing-cement',
        navLabel: 'Casing & cement',
        depth: 'Basics · 04',
        kicker: 'Well integrity',
        title: 'Casing strings and cement',
        body: [
          'Casing is steel pipe set and cemented in the hole to isolate formations, carry wellhead loads, and define the pressure envelope for later drilling. A typical deep well runs conductor, surface, intermediate, and production strings, each sized for collapse, burst, and tension at temperature.',
          'Cement bonds casing to rock and seals off groundwater or weak zones. Geothermal cement jobs must survive thermal cycling and hot brine. The Construction track goes deeper on running strings, bond evaluation, wellhead tie-in, and completions after the hole is drilled.[26]',
        ],
        bullets: [
          'Conductor through production: each string isolates a section of the hole',
          'Casing design: collapse and burst ratings at expected flowing temperature',
          'Long-lead procurement: production casing often ordered months ahead of rig arrival',
        ],
        image: {
          src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80',
          alt: 'Construction crane and steel structure at a building site',
        },
        relatedLinks: [
          { label: 'Construction · Casing program', to: '/projects/drilling/construction/casing-program' },
          { label: 'Construction · Cement & bond', to: '/projects/drilling/construction/cement-bond' },
          { label: 'Projects · Supply chain', to: '/projects#supply' },
        ],
      },
      {
        id: 'geothermal-vs-og',
        navLabel: 'Geothermal vs O&G',
        depth: 'Basics · 05',
        kicker: 'Same rigs, different target',
        title: 'What changes for geothermal',
        body: [
          'Geothermal projects hire the same rig contractors, directional drillers, and mud engineers as oil and gas. The difference is what you are chasing: hot water, steam, or engineered fracture networks rather than hydrocarbon pay zones.',
          'Return temperatures run higher. Brine chemistry attacks steel and elastomers. Open-hole logging suites from oil and gas are not always run, which means gas above a reservoir can go undetected. Horizontal and multilateral drilling from shale development now shows up in EGS and closed-loop pilots.[26,32]',
        ],
        aside: {
          label: 'Crossover hiring',
          text: 'GEODE and regional training programs exist because the rig skill set transfers. The geothermal-specific hazards are what field upskilling must add on top.',
        },
        image: {
          src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80',
          alt: 'Power lines and transmission towers at dusk',
        },
        relatedLinks: [
          { label: 'Workforce · Field skills', to: '/workforce/field' },
          { label: 'Primer · EGS', to: '/toolbox/egs' },
        ],
      },
      {
        id: 'logging-ops',
        navLabel: 'Logging & ops',
        depth: 'Basics · 06',
        kicker: 'Before safety depth',
        title: 'Logging, temperature, and operational hazards',
        body: [
          'Temperature logs, spinner surveys, and flow tests tell you whether the hole found useful heat and permeability. Many geothermal fields are underpressured, but drilling breaks, lost returns, and stuck pipe still show up in the chapters before well control in the Sandia handbook.[26]',
          'Those operational problems matter because they change the pressure picture. Lost circulation lowers mud level. Stuck pipe stops circulation. Both can precede a kick. The Safety page covers what happens when formation fluid enters the hole and how geothermal returns differ from oil and gas.',
        ],
        bullets: [
          'Temperature and pressure logs: confirm gradient and flowing conditions',
          'Lost circulation and stuck pipe: operational hazards that can lead to kicks',
          'Well testing: flow and injectivity before completion and handoff to the plant',
        ],
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
          alt: 'Engineer reviewing equipment in an industrial control setting',
        },
        relatedLinks: [
          { label: 'Construction · Testing & P&A', to: '/projects/drilling/construction/testing-integrity' },
          { label: 'Safety · Well control', to: '/projects/drilling/safety/well-control' },
          { label: 'Sandia drilling handbook', url: 'https://www.osti.gov/servlets/purl/1325261' },
        ],
      },
    ],
  },
  construction: {
    kicker: 'Drilling 101 · Construction',
    titleLead: 'After',
    titleEmphasis: 'total depth',
    lede: 'Casing, cement, wellhead, completions, and the integrity work that turns a drilled hole into a production or injection well.',
    intro: [
      'Well construction begins when the drilling rig finishes a hole section. The crew pulls the drill string, runs casing, pumps cement, pressure-tests the barrier, and only then drills the next section or moves to completion. On a geothermal field development, that sequence repeats for every producer and injector in the pad.',
      'Geothermal construction differs from standard oil and gas mainly in temperature, brine chemistry, and the production\u2013reinjection pairing. Strings, cements, wellhead seals, and completion hardware must survive decades of thermal cycling. The Sandia drilling handbook treats casing and cement in the chapters between mud programs and well control; this track follows that arc with geothermal context.[26]',
    ],
    sections: [
      {
        id: 'casing-program',
        navLabel: 'Casing program',
        depth: 'Construction · 01',
        kicker: 'String design',
        title: 'Casing program and running',
        body: [
          'A casing program lists every steel string from conductor to production: diameter, weight, grade, connection type, and setting depth for each. The conductor stabilizes the top of the hole and carries the wellhead load. Surface casing isolates shallow groundwater and weak formations. Intermediate strings hold back overpressured or unstable zones before the production interval. The production string (or liner) is the pressure boundary for flowing geothermal fluid.',
          'Engineering sizes each string for collapse, burst, and tension at the temperatures expected during drilling, completion, and production. Geothermal brine and steam accelerate corrosion on carbon steel; many programs specify higher grades or corrosion-resistant alloys in the production interval. Collapse rating matters on injectors when cold fluid is pumped against hot rock; burst rating matters when steam or gas expands in the annulus.',
          'Running casing is a rig operation: centralizers keep pipe off the wall, float equipment at the shoe controls cement placement, and the crew circulates before pumping slurry. A poor run\u2014keyed pipe, insufficient centralization, or debris in the hole\u2014shows up later as a bad cement job or a stuck completion. Production casing and liners are long-lead items; ordering after final investment decision is a common schedule mistake on the Projects supply-chain lane.[1,26]',
        ],
        bullets: [
          'Conductor, surface, intermediate, production: each isolates a hole section',
          'Liner vs. full string: liners hang from the previous casing shoe to save cost',
          'Collapse, burst, and tension at flowing temperature and injectivity pressure',
          'Corrosion-resistant alloys where brine chemistry and heat attack carbon steel',
          'Centralizers, shoe track, and float equipment for a clean primary cement job',
        ],
        relatedLinks: [
          { label: 'Construction · Cement & bond', to: '/projects/drilling/construction/cement-bond' },
          { label: 'Projects · Supply chain', to: '/projects#supply' },
          { label: 'Basics · Casing overview', to: '/projects/drilling/basics/casing-cement' },
        ],
      },
      {
        id: 'cement-bond',
        navLabel: 'Cement & bond',
        depth: 'Construction · 02',
        kicker: 'Primary barrier',
        title: 'Cementing and bond evaluation',
        body: [
          'Primary cementing fills the annulus between casing and rock, bonds the string in place, and seals off permeable zones and groundwater. The slurry is designed for density, thickening time, and compressive strength at downhole temperature. Geothermal programs often specify cements that tolerate thermal shock when cold drilling fluid is replaced by hot production brine.',
          'A channel behind pipe or a short top of cement (TOC) can leak for the life of the well. Cement bond logs\u2014cement bond log (CBL) and variable density log (VDL) are common\u2014confirm acoustic coupling before the next hole section is drilled. Remedial squeeze jobs pump slurry through perforations to fix voids; they add rig time but beat discovering a leak during production.',
          'Lost circulation during drilling can leave washed-out zones that are hard to cement. Geothermal fields in volcanic rock fight this routinely. The Basics page covers lost returns as a drilling hazard; here the consequence is an incomplete barrier that complicates both well control and environmental isolation.[26]',
        ],
        bullets: [
          'Primary cement job: slurry pumped down casing, returns up the annulus',
          'Geothermal slurries: thermal cycling, high temperature, and brine compatibility',
          'CBL/VDL logs: confirm bond before drilling the next section',
          'Squeeze and remedial cement: fix channels and short TOC after the fact',
          'Bad cement: behind-pipe flow, groundwater communication, and well control risk',
        ],
        relatedLinks: [
          { label: 'Construction · Casing program', to: '/projects/drilling/construction/casing-program' },
          { label: 'Safety · Well control', to: '/projects/drilling/safety/well-control' },
        ],
      },
      {
        id: 'wellhead-surface',
        navLabel: 'Wellhead & surface',
        depth: 'Construction · 03',
        kicker: 'Surface tie-in',
        title: 'Wellhead and surface equipment',
        body: [
          'The wellhead anchors the casing strings at surface and carries the blowout preventer stack during drilling. Casing hangers seal each string in the head assembly. When drilling finishes, the BOP is removed and a geothermal wellhead or Christmas tree is installed for production or injection. Master valves and wing valves control flow to pipelines or silencers.',
          'Geothermal fields usually drill matched pairs: producers that extract hot fluid and injectors that return cooled brine to maintain reservoir pressure. Surface manifolds, flow lines, and separators must handle two-phase flow, scale, and corrosion. Wellhead flange ratings and elastomer seals face the same high-temperature logic as BOP annular elements on the Safety page.',
          'Surface construction runs on a different contractor and schedule from the rig. Pipelines to the power plant or direct-use facility, electrical tie-in, and monitoring instrumentation often lag the well if not planned in parallel with the drilling program.[26]',
        ],
        bullets: [
          'Casing hangers and wellhead: load path from production string to surface',
          'BOP removal and completion tree installation after drilling',
          'Master valve and flow lines for production and reinjection pairs',
          'Separator, silencer, and two-phase handling at the well pad',
          'Surface facilities on a separate schedule from the drilling rig',
        ],
        relatedLinks: [
          { label: 'Safety · BOP elastomers', to: '/projects/drilling/safety/elastomers' },
          { label: 'Projects · Grid & interconnection', to: '/projects#grid' },
        ],
      },
      {
        id: 'completions',
        navLabel: 'Completions',
        depth: 'Construction · 04',
        kicker: 'Connecting hole to reservoir',
        title: 'Completions for hydrothermal and EGS',
        body: [
          'Completion is the hardware that connects the cased wellbore to the reservoir. In open-hole hydrothermal wells, the production interval may be barefoot rock or a slotted liner across the permeable zone. In cased holes, perforating guns shoot holes through casing and cement into the formation. Packers isolate zones; tubing strings convey fluid on some injectors and workover-ready producers.',
          'Hydrothermal completions emphasize flow capacity, sand control where needed, and chemistry compatible with scaling brine. Acidizing can restore injectivity on carbonate or clogged intervals. EGS and other stimulation projects add a different toolkit: multistage hydraulic fracturing, proppant, and tracer programs adapted from shale development. Fervo Energy\u2019s Cape Station and similar builds use horizontal wells and staged completions to engineer fracture networks in hot dry rock.[26,32]',
          'Stimulation carries induced seismicity oversight separate from well control. DOE\u2019s traffic-light protocol governs how operations scale back when seismic metrics cross thresholds.[18] Completion design, stimulation plan, and monitoring belong in the same project review as the drilling program.',
        ],
        bullets: [
          'Open hole, slotted liner, or cased-and-perforated: matched to reservoir type',
          'Packers and tubing: zone isolation and workover access on injectors',
          'Acidizing: common on hydrothermal injectors with scaling or skin damage',
          'EGS multistage fracturing: horizontal wells and proppant from O&G crossover',
          'Stimulation monitoring: traffic-light protocol alongside well integrity',
        ],
        relatedLinks: [
          { label: 'Primer · EGS', to: '/toolbox/egs' },
          { label: 'EGS · Induced seismicity', to: '/toolbox/egs#seismicity' },
          { label: 'Workforce · Field skills', to: '/workforce/field' },
        ],
      },
      {
        id: 'testing-integrity',
        navLabel: 'Testing & P&A',
        depth: 'Construction · 05',
        kicker: 'Life of the well',
        title: 'Testing, integrity, and abandonment',
        body: [
          'Before handoff to the plant, crews run deliverability or injectivity tests, spinner surveys, and temperature logs to confirm the well meets design. Tracer tests track connection between injectors and producers in a field. Those measurements feed reservoir models and lender diligence the same way exploration logs feed the feasibility study.',
          'Operating wells need ongoing integrity management: mechanical integrity tests (MIT), annulus pressure monitoring, corrosion and scale inspection, and workovers when casing or completion hardware fails. Geothermal brine attacks steel and deposits minerals in tubing and surface lines. A producer that loses injectivity in its paired injector can draw down the whole field.',
          'When a well reaches end of life, plugging and abandonment (P&A) sets cement plugs across productive zones and cuts casing at the required depth. State oil-and-gas or geothermal agencies specify P&A plans, often tied to bonding and financial assurance on the original permit. Incomplete abandonment leaves legacy leakage and liability on the landowner and the state.[26]',
        ],
        bullets: [
          'Deliverability and injectivity tests before commercial operation',
          'Tracer and temperature surveys: confirm field connectivity',
          'Mechanical integrity tests and workovers during decades of operation',
          'Scaling, corrosion, and paired producer\u2013injector performance',
          'Plugging and abandonment: regulatory plugs, cut casing, site restoration',
        ],
        relatedLinks: [
          { label: 'Basics · Logging & ops', to: '/projects/drilling/basics/logging-ops' },
          { label: 'Projects · Lifecycle & risk', to: '/projects#lifecycle' },
          { label: 'Safety · Related risks', to: '/projects/drilling/safety/related' },
        ],
      },
    ],
  },
  safety: {
    kicker: 'Drilling 101 · Safety',
    titleLead: 'Well control',
    titleEmphasis: 'and geothermal hazards',
    lede: 'Kicks, blowout preventers, high-temperature seals, and the MPD decisions that sit on top of standard certification training.',
    intro: [
      'Well control training covers shut-in, kill methods, and blowout preventer operation. This page does not replace that coursework. It explains what is different when the target is a geothermal reservoir rather than a hydrocarbon zone, and where federal and state references sit on the project path.[37]',
      'For step-by-step kill procedures, use your well control school materials and Sandia National Laboratories\u2019 drilling handbook, Chapter 8.[26] The Well Control School publishes an open glossary of more than 1,300 drilling and well control terms for standard O&G vocabulary; this page adds geothermal context on top.[36]',
    ],
    sections: [
      {
        id: 'well-control',
        navLabel: 'Well control',
        depth: 'Safety · 01',
        kicker: 'The baseline',
        title: 'Kicks, blowouts, and well control',
        body: [
          'Well control means keeping formation fluids out of the wellbore, and safely removing them if they enter. When pore pressure exceeds the static head of the drilling fluid, fluid flows in. That influx is a kick. If the flow is not contained, the result is a blowout: lost rig, environmental damage, and risk to people on site.',
          'Oil-and-gas well control schools teach standard responses such as shut-in and circulated kills. The Well Control School glossary defines that baseline vocabulary, from kicks and BOPE to choke lines and kill sheets.[36] Those methods still apply on geothermal rigs. The difference is what triggers the kick and what may be in the influx.',
        ],
        bullets: [
          'Kick: formation fluid entering the wellbore while the well can still be shut in and killed',
          'Blowout: uncontrolled flow at the surface after well control is lost',
          'Well control training (IWCF, IADC, or operator equivalents) is standard for rig crews crossing from hydrocarbons',
        ],
        visual: 'wellControl',
      },
      {
        id: 'geothermal-kicks',
        navLabel: 'Geothermal kicks',
        depth: 'Safety · 02',
        kicker: 'Not the same as oil & gas',
        title: 'Why geothermal kicks differ',
        body: [
          'Many geothermal fields are underpressured relative to a full column of drilling fluid. Kicks still happen when wellbore pressure drops suddenly. Circulating hot fluid to the surface can flash to steam, cutting hydrostatic head and triggering further boiling. Lost circulation can drop the fluid level in the hole enough to do the same.',
          'Gas caps or gas zones above a reservoir are often missed because geothermal programs rarely run the same open-hole logging suites used in oil and gas. If gas enters the hole, crews should treat the kick as a gas kick until proven otherwise. Geothermal gas may include lethal H\u2082S concentrations. Assuming hot liquid and pumping cold water can fail badly when the influx is actually gas.[26]',
          'Some fields are overpressured at shallow depth, including parts of the Salton Sea in California and Tiwi in the Philippines. A few areas also produce both geothermal fluids and hydrocarbons, which means BOPE and procedures must cover both environments.[26]',
        ],
        aside: {
          label: 'Field rule',
          text: 'Sandia\u2019s handbook states the operating assumption plainly: every kick should be treated as a gas kick until confirmed otherwise.',
        },
        image: {
          src: 'https://images.unsplash.com/photo-1611273426858-450bf5eb5580?w=900&q=80',
          alt: 'Steam rising from a geothermal field',
        },
      },
      {
        id: 'bope',
        navLabel: 'BOPE',
        depth: 'Safety · 03',
        kicker: 'Surface equipment',
        title: 'Blowout preventers and detection',
        body: [
          'The blowout preventer stack sits at the wellhead. Typical components include annular preventers, pipe rams, blind rams, and sometimes shear rams. Choke and kill lines connect below the stack so fluid can be controlled or pumped during a kill.',
          'Kick detection relies on comparing flow in and flow out, usually through pit-volume gains and return-line flow. Geothermal operations benefit from accurate metering when well control is expected to be an issue. Rapid return temperature rise, gas at the shakers, or drilling breaks with lost returns are warning signs alongside pit gain.[26]',
        ],
        bullets: [
          'Annular preventer: seals around drill pipe, collars, or irregular string components',
          'Pipe rams: seal around the pipe body (variable-bore rams handle tool joints)',
          'Blind rams: close an open hole when pipe is out',
          'Pit volume and return flow: primary kick indicators on most rigs',
        ],
        image: {
          src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80',
          alt: 'Industrial piping and structural steel at a heavy equipment site',
        },
        relatedLinks: [
          { label: 'High-temperature seals', to: '/projects/drilling/safety/elastomers' },
          { label: 'MPD operations matrix', to: '/projects/drilling/safety/mpd-matrix' },
        ],
      },
      {
        id: 'elastomers',
        navLabel: 'Elastomers',
        depth: 'Safety · 04',
        kicker: 'High-temperature hardware',
        title: 'BOP elastomers and seal ratings',
        body: [
          'Annular preventers depend on flexible elastomer elements to seal around moving drill pipe. Those rubber-like packings are temperature-sensitive. Standard BOP elastomers are often rated near 121\u00b0C (about 250\u00b0F). High-temperature variants may reach roughly 177\u00b0C (about 350\u00b0F). Pipe and blind rams rely mainly on metal-to-metal sealing, but the annular is usually the limiting component when hot fluid reaches the stack.[26]',
          'That matters on geothermal rigs because kick response itself can heat the BOP. Circulating out a hot influx, flashing steam at the surface, or flowing high-temperature formation fluid through the choke line can exceed standard elastomer limits while crews are still shutting in or killing the well. A seal that has softened or extruded may not close cleanly on pipe, which turns a materials problem into a well-control problem.[26]',
          'Mitigations described in the Sandia handbook include specifying high-temperature elastomers when well temperatures warrant it, monitoring return temperature during operations, and pumping cooling water through the BOP stack during a kill when circulating temperatures run high. Those choices belong in the drilling program and equipment spec early, not after the first hot return.[26]',
          'Downhole, packers, wellhead seals, and other elastomer-bearing components face the same temperature ceiling logic. Rig crews crossing from oil and gas may hold current well control certification without ever having sized a stack for geothermal return temperatures. Field training covers procedures; project engineering covers whether the hardware can survive them.',
        ],
        bullets: [
          'Standard annular elastomers: often rated near 121\u00b0C; HT variants near 177\u00b0C',
          'Hot kick circulation and steam at the stack can exceed standard ratings during the kill itself',
          'Cooling water through the BOP and HT elastomer spec are common mitigations',
          'Procure and pressure-test the rated stack before spud, alongside casing and mud planning',
        ],
        aside: {
          label: 'Project path',
          text: 'BOPE rating, elastomer type, and pressure-test records are part of the permit-to-drill package in many states. California\u2019s CalGEM blowout-prevention manual is a common reference for operators there.[27]',
        },
        image: {
          src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80',
          alt: 'Industrial piping and structural steel at a heavy equipment site',
        },
        relatedLinks: [
          { label: 'Workforce · Field skills', to: '/workforce/field' },
          { label: 'Projects · Supply chain', to: '/projects#supply' },
        ],
      },
      {
        id: 'mpd-matrix',
        navLabel: 'MPD matrix',
        depth: 'Safety · 05',
        kicker: 'Managed pressure drilling',
        title: 'The MPD operations matrix',
        body: [
          'Managed pressure drilling (MPD) holds bottom-hole pressure steady with surface back-pressure and tighter hydraulic control, instead of changing mud weight alone. On planned MPD wells, crews do not jump straight from pit gain to a full shut-in every time. They use a pre-written MPD operations matrix: a decision table that maps influx size and surface pressure state to the next action.[35]',
          'API RP 92M defines three limits for each hole section. The operating limit is the band where drilling can continue while the MPD system manages a small influx inside the primary barrier. The planned limit is where MPD stops and the crew transitions to conventional well control. The back-pressure limit is the maximum allowable wellhead pressure, set by casing, stack ratings, formation fracture gradient, and separator capacity.[35]',
          'An influx below the planned limit is often handled inside the MPD envelope, not classified as a full well-control event. At or above the planned limit, the matrix calls to secure the well and switch to shut-in and kill procedures. Many projects now use an Influx Management Envelope, a graphical version of the same limits showing acceptable influx volume and intensity in green, yellow, and red zones.[35]',
          'Geothermal adds constraints the standard O&G matrix may not cover: hot returns during circulation, steam flashing, H\u2082S gas, and annular elastomer temperature limits on the stack. A matrix copied from a hydrocarbon well without re-running hydraulics and equipment ratings for geothermal temperatures is not sufficient. It belongs in the drilling program with the BOPE spec, before spud.[26,35]',
        ],
        bullets: [
          'Operating limit: continue MPD while adjusting back-pressure inside the primary barrier',
          'Planned limit: stop MPD and transition to conventional shut-in and kill',
          'Back-pressure limit: maximum wellhead pressure the equipment and formation can take',
          'Influx Management Envelope: graphical matrix of volume vs. intensity limits',
          'Project-specific: based on actual MPD equipment, well geometry, and geothermal return temperatures',
        ],
        aside: {
          label: 'Not a substitute for certification',
          text: 'MPD matrix use sits on top of well control training (IWCF, IADC, or operator equivalents). The matrix tells you when to stay in MPD mode and when to shut in; your school materials cover the kill math once you cross the planned limit.',
        },
        visual: 'riskProfile',
        relatedLinks: [
          { label: 'BOP elastomers', to: '/projects/drilling/safety/elastomers' },
          { label: 'Kicks and well control', to: '/projects/drilling/safety/well-control' },
        ],
      },
      {
        id: 'regulatory',
        navLabel: 'Regulatory',
        depth: 'Safety · 06',
        kicker: 'On the project path',
        title: 'Permits, plans, and BOPE requirements',
        body: [
          'Environmental clearance and a permit to drill are separate threads on the project schedule. Applications for permit to drill, state commission filings, and site-specific safety plans can run ahead of or behind NEPA depending on how the project is phased.',
          'State rules set BOPE ratings, testing, and high-temperature equipment requirements, including elastomer type where annular preventers are specified. California\u2019s CalGEM publishes instruction manuals on blowout prevention and drilling in H\u2082S environments that geothermal operators in the state use as reference.[27] Other western states with geothermal activity maintain their own oil-and-gas or geothermal commission rules.',
          'BOPE must be installed, pressure-tested, and maintained before drilling operations begin. That work sits alongside rig selection, casing design, and mud program planning covered in the Sandia handbook.[26]',
        ],
        image: {
          src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80',
          alt: 'Gavel and law books for state BOPE and drilling permit requirements',
        },
      },
      {
        id: 'related',
        navLabel: 'Related risks',
        depth: 'Safety · 07',
        kicker: 'Adjacent risks',
        title: 'Well control is not the only subsurface safety thread',
        body: [
          'EGS and other stimulation projects carry a separate safety discipline: induced seismicity. DOE\u2019s traffic-light protocol governs how operations scale back when seismic metrics cross thresholds.[18] That protocol addresses public and regulatory concern about felt events. It does not replace well control, but project teams need both.',
          'Lost circulation, stuck pipe, wellbore stability, and difficult cement jobs are operational hazards that can precede a kick. The Basics page covers how those show up before the well control event; the Sandia handbook treats them in the chapters before and after well control.[26]',
        ],
        relatedLinks: [
          { label: 'Construction · Cement & bond', to: '/projects/drilling/construction/cement-bond' },
          { label: 'Basics · Operational hazards', to: '/projects/drilling/basics/logging-ops' },
          { label: 'EGS · Induced seismicity', to: '/toolbox/egs#seismicity' },
          { label: 'Projects overview · Drilling lane', to: '/projects#drilling' },
          { label: 'Workforce · Field skills', to: '/workforce/field' },
        ],
      },
    ],
  },
}

export function buildDrillingTopics(section) {
  const page = DRILLING_PAGES[section]
  if (!page?.sections) return []
  return page.sections.map(s => ({
    id: s.id,
    label: s.navLabel || s.title,
    kicker: s.kicker,
    note: s.depth,
    to: `/projects/drilling/${section}/${s.id}`,
  }))
}

export function getDrillingTopicSection(section, topicId) {
  if (!topicId) return null
  return DRILLING_PAGES[section]?.sections?.find(s => s.id === topicId) ?? null
}

export function parseDrillingPath(path) {
  if (path === '/projects/drilling') return { section: 'overview', topic: null }
  if (path === '/projects/drilling/basics') return { section: 'basics', topic: null }
  if (path === '/projects/drilling/construction') return { section: 'construction', topic: null }
  if (path === '/projects/drilling/safety') return { section: 'safety', topic: null }
  const match = path.match(/^\/projects\/drilling\/(basics|construction|safety)\/([^/]+)$/)
  if (match && getDrillingTopicSection(match[1], match[2])) {
    return { section: match[1], topic: match[2] }
  }
  return null
}
