// ─────────────────────────────────────────────────────────────────────────
// ALL SITE CONTENT LIVES HERE. Edit freely.
//   PRIMER   , the scroll-descent narrative (one entry = one stratum)
//   TOOLBOX  , DOE and related technical resources, grouped by category
//   GLOSSARY , quick definitions for the terms used across the site
//   PROJECTS , project path overview and permitting deep dive
//   INTERNATIONAL, global deployment and market context
//   ABOUT    , author, learning in public, fellowship context
// ─────────────────────────────────────────────────────────────────────────

export const PRIMER = [
  {
    id: 'what',
    depth: 'SURFACE',
    kicker: 'Surface',
    title: 'Heat from the Earth',
    body: [
      'Geothermal energy uses heat from inside the Earth. That heat flows outward continuously in all directions. Geothermal systems extract a portion of it for electricity, direct heat, or storage.',
      'Half of that internal heat is left over from the planet forming four and a half billion years ago. The other half is made fresh, right now, by radioactive elements decaying in the rock beneath you. It does not depend on weather, season, or time of day.',
    ],
    aside: { label: 'The scale of it', text: 'Heat flow from the Earth exceeds current human energy use. The constraint is reaching it at acceptable cost and with acceptable environmental impact.' },
  },
  {
    id: 'gradient',
    depth: '\u20131 KM',
    kicker: 'The first principle',
    title: 'It gets hotter as you go down',
    body: [
      'Everything in geothermal follows from one fact. Temperature rises with depth. Rock warms roughly 25 to 30\u00b0C for every kilometer you descend.[4,5] This gradient is the resource.',
      'In a few places the crust is thin and heat is closer to the surface, as in Iceland, the East African Rift, and parts of the American West. Nevada and the Great Basin are well mapped through the Nevada Bureau of Mines and Geology at the University of Nevada, Reno.[7,24] The research question for much of the field is whether the gradient can be developed economically outside those high-resource areas.',
    ],
    visual: 'gradient',
  },
  {
    id: 'approaches',
    depth: 'THE PATHS',
    kicker: 'Four ways in',
    title: 'Four production paths',
    body: [
      'Hydrothermal uses existing permeability and fluid. EGS creates fracture networks in hot dry rock. Advanced geothermal systems keep fluid in sealed pipes. Supercritical targets very high temperatures and pressures.',
      'Each path has its own tradeoffs, maturity, and geography. The pages below go deeper on all four.',
    ],
    relatedLinks: [
      { label: 'Hydrothermal', to: '/toolbox/hydrothermal' },
      { label: 'EGS', to: '/toolbox/egs' },
      { label: 'AGS', to: '/toolbox/ags' },
      { label: 'Supercritical', to: '/toolbox/supercritical' },
    ],
  },
  {
    id: 'directuse',
    depth: 'SHALLOW',
    kicker: 'Direct use',
    title: 'You can use the heat as heat',
    body: [
      'Electricity gets the attention, but the oldest use of geothermal skips the turbine entirely. Most of the energy a society uses is ultimately for heat, and you can take that straight from the ground.',
      'Iceland heats nearly all its buildings this way.[6] Even where the ground is merely mild, heat pumps exploit the steady temperature a few meters down to heat in winter and cool in summer at a fraction of conventional energy. No rare geology, no deep drilling.',
    ],
    visual: 'directuse',
    relatedLink: { label: 'Underground thermal energy storage', to: '/utes' },
  },
]

export const PRIMER_TOPICS = [
  {
    id: 'hydrothermal',
    to: '/toolbox/hydrothermal',
    label: 'Hydrothermal',
    kicker: 'Production · Hydrothermal',
    titleLead: 'Hydrothermal',
    titleEmphasis: 'power',
    lede: 'Heat, water, and permeable rock in one place, accessed through wells that have operated for decades in the western U.S. and elsewhere.',
    sections: [
      {
        id: 'overview',
        depth: '\u20132 KM',
        kicker: 'The proven path',
        title: 'Hydrothermal',
        body: [
          'The geothermal that exists today is almost all hydrothermal. The recipe needs three things in one place: heat, water, and permeable rock for the water to move through. Drill a well, bring up hot water or steam, spin a turbine or deliver the heat directly, send the cooled fluid back down.',
          'This is mature, commercially proven technology. Some plants have operated for more than half a century. The constraint is geography. The three ingredients rarely align outside volcanic belts, extensional basins, and selected sedimentary settings where fluids circulate through fractured rock.',
          'Hydrothermal still matters because it de-risks everything downstream. It proves the turbines work, the wells hold, and the economics close. The newer approaches mostly manufacture this lucky geology on demand.',
        ],
        aside: { label: 'Why it matters', text: 'Operating hydrothermal plants provide reference data on performance, well integrity, and cost that developers, lenders, and agencies use in later projects.' },
        visual: 'hydrothermal',
      },
      {
        id: 'ingredients',
        kicker: 'The recipe',
        title: 'Heat, water, and permeability',
        body: [
          'Heat comes from the geothermal gradient and, in the best fields, from magma or recently solidified rock close to the surface. Water may be meteoric recharge, connate fluids trapped in sediment, or a mix. Permeability is the fracture network or porous formation that lets fluid move between wells.',
          'Exploration looks for all three before committing to production drilling. Temperature logs, geochemistry, seismic surveys, and gravity or magnetics build a picture of the reservoir. A productive well is not guaranteed even when surface signs look promising.',
          'Reinjection closes the loop. Cooled brine returns to the reservoir so pressure stays stable and minerals stay underground. Fields that skip reinjection can draw down the resource or surface environmental problems quickly.',
        ],
        bullets: [
          'Heat source: gradient, upflow zones, or shallow magmatic systems',
          'Fluid: groundwater, brine, or steam in the pore space and fractures',
          'Permeability: natural fractures, faults, or porous volcanic rock',
          'Cap rock: low-permeability layers that trap heat and pressure above the reservoir',
        ],
      },
      {
        id: 'surface',
        kicker: 'At the surface',
        title: 'Dry steam, flash, and binary',
        body: [
          'Plant type follows what comes out of the well. Dry steam is rare but simple: steam drives a turbine directly. Flash plants depressurize hot brine so part of it boils instantly into steam. Binary plants run lower-temperature fluid through a heat exchanger to vaporize a secondary working fluid with a lower boiling point.',
          'The Geysers in California is the iconic dry-steam field. Much of the global fleet uses flash or binary designs because most resources are hot water, not pure steam. Binary cycles opened geothermal to moderate-temperature sites that would never have supported a flash plant.',
        ],
        bullets: [
          'Dry steam: very high temperature, little liquid. Oldest plant type, limited geology.',
          'Flash steam: hot brine flashed to steam at the surface. Common in volcanic settings.',
          'Binary-cycle: lower-temperature fluid heats a working fluid like isobutane or R245fa.',
          'Direct use: hot water piped to buildings or industry without electricity generation.',
        ],
      },
      {
        id: 'geography',
        kicker: 'Where it works',
        title: 'The map of the resource',
        body: [
          'The U.S. leads global installed capacity,[1] mostly in California, Nevada, Utah, and Hawaii. Indonesia, the Philippines, Iceland, New Zealand, Kenya, and Mexico built large fleets where plate boundaries or rifts concentrate heat and fluids.',
          'Known Geothermal Resource Areas (KGRAs) and modern atlases catalog where hydrothermal potential has been identified on Federal and state land. For Nevada and the western Great Basin, NBMG publishes downloadable GIS layers, well files, and bulletin catalogs through UNR.[7,8,25] That does not mean every mapped area is economic. Distance to transmission, land access, and water rights still decide what gets built.',
          'Co-production from oil and gas wells is a niche variant: hot produced water from active fields can generate power without a dedicated geothermal discovery well. It reuses existing infrastructure where temperatures and flow rates cooperate.',
        ],
      },
      {
        id: 'operations',
        kicker: 'Running the field',
        title: 'What a mature plant looks like',
        body: [
          'Hydrothermal ranks among the highest capacity factors of any renewable source, often above 85% and sometimes higher.[1] Output is steady, dispatchable, and not tied to weather. That is why data centers and grid operators increasingly mention geothermal alongside nuclear and gas as firm clean power.',
          'Operations mean managing scaling, corrosion, and non-condensable gases in the brine. Field maintenance includes workovers, new makeup wells, and tracer tests to see how the reservoir is responding. A field is a living system, not a set-and-forget asset.',
        ],
        aside: { label: 'The ceiling', text: 'The best hydrothermal sites are largely spoken for or hard to permit. Scaling the resource nationally means engineering reservoirs where nature did not pre-build them. That is where EGS, AGS, and supercritical research enter the picture.' },
      },
    ],
  },
  {
    id: 'egs',
    to: '/toolbox/egs',
    label: 'EGS',
    kicker: 'Production · EGS',
    titleLead: 'Engineering',
    titleEmphasis: 'permeability',
    lede: 'Enhanced Geothermal Systems. Hot rock with insufficient natural permeability, opened with hydraulic stimulation and injection/production wells.',
    sections: [
      {
        id: 'overview',
        depth: '\u20134 KM',
        kicker: 'Overview',
        title: 'Enhanced Geothermal Systems',
        body: [
          'EGS takes the one ingredient nature usually withholds, permeability, and engineers it in. The heat is down there nearly everywhere. What is missing are the cracks for water to flow through.',
          'So you make the cracks. Inject fluid at pressure to open fractures in hot dry rock, build a network for water to circulate between an injection well and a production well, then run the same surface loop as hydrothermal. The techniques borrow decades of oil and gas drilling, and that lineage is a genuine advantage.[26]',
          'The goal is not to find a rare hydrothermal field. It is to create one wherever the gradient and rock conditions allow, including much of the American West, the eastern U.S. in some models, and regions worldwide that lack volcanic surface expression.',
        ],
        aside: { label: 'The state of play', text: 'Pilot EGS projects in the American West have delivered electricity to the grid and reported early cost and performance results. Several commercial demonstrations are under construction or in early operation.' },
        visual: 'fracture',
      },
      {
        id: 'how-it-works',
        kicker: 'The loop',
        title: 'Injection, stimulation, circulation',
        body: [
          'A typical EGS project drills at least two deep wells: one to inject cold or ambient fluid, one to produce heated fluid. Between them, hydraulic stimulation opens existing fractures or creates new ones. Tracers and microseismic monitoring map where the fluid actually goes.',
          'Stimulation is not a single event. Fields may need repeated treatments, sidetracks, or additional wells as the reservoir evolves. The art is building enough connected fracture area to sustain flow rates without losing too much pressure or triggering unwanted seismicity.',
          'Once circulation is established, the surface plant looks familiar: heat exchangers, turbines, cooling towers, and reinjection. EGS changes what happens between the wells, not the basic thermodynamics at the top.',
        ],
        bullets: [
          'Injection well: pushes fluid into the stimulated zone',
          'Production well: pulls heated fluid to the surface',
          'Stimulation: hydraulic pressure opens or extends fractures',
          'Monitoring: geophones, tracers, pressure, and temperature logs',
          'Reinjection: spent fluid returns to close the loop and maintain pressure',
        ],
      },
      {
        id: 'forge',
        kicker: 'The test bed',
        title: 'FORGE and the public record',
        body: [
          'The Utah Frontier Observatory for Research in Geothermal Energy (FORGE) is DOE\u2019s dedicated EGS field laboratory near Milford, Utah. It allows researchers and developers to test stimulation methods, drilling tools, and monitoring before committing a full commercial project.',
          'Data from FORGE and other federally funded sites lands in the Geothermal Data Repository. That public record is how the field learns what worked, what failed, and what models still get wrong.',
        ],
      },
      {
        id: 'commercial',
        kicker: 'On the grid',
        title: 'From pilot to power purchase',
        body: [
          'Fervo Energy\u2019s Cape Station project in Utah is among the highest-profile commercial EGS builds, using horizontal drilling and multistage completions adapted from shale development. Google and other offtakers have signed power contracts, indicating willingness to purchase EGS output under long-term agreements.',
          'Other developers are pursuing variants in Nevada, California, and internationally. The common thread is directional wells, better subsurface imaging, and operational discipline around seismicity and flow management.',
          'At the international level, the Clean Energy Ministerial GeoFuture Initiative convenes governments, industry, and academia on next-generation geothermal barriers such as financing, regulatory frameworks, and data quality. The initiative is coordinated by the National Laboratory of the Rockies and co-led by the United States with Japan and Saudi Arabia.[33]',
        ],
      },
      {
        id: 'seismicity',
        kicker: 'The constraint',
        title: 'Induced seismicity and the protocol',
        body: [
          'Opening fractures sends tiny seismic signals. Most events are too small to feel at the surface. Occasionally, projects trigger felt events, which is why monitoring and traffic-light protocols are non-negotiable for permitted work.',
          'DOE maintains an induced seismicity protocol that funded projects must follow.[18] It sets how to scale back or pause operations when seismic metrics cross thresholds. Community trust and regulatory approval depend on taking this seriously, not treating it as a paperwork exercise.',
        ],
        aside: { label: 'Oil and gas crossover', text: 'Horizontal drilling, high-temperature tools, and completions engineering migrated from hydrocarbons. Philanthropy-funded deployment groups such as Project InnerSpace explicitly target that crossover for global scale-up.[32] The workforce and supply chain overlap is real, even if the product and permitting story differ.' },
      },
    ],
  },
  {
    id: 'ags',
    to: '/toolbox/ags',
    label: 'AGS',
    kicker: 'Production · AGS',
    titleLead: 'Fluid in the',
    titleEmphasis: 'pipe',
    lede: 'Advanced Geothermal Systems. Closed-loop designs that trade some heat transfer for total control over where the working fluid goes.',
    sections: [
      {
        id: 'overview',
        depth: '\u20135 KM',
        kicker: 'The controlled path',
        title: 'Advanced Geothermal Systems',
        body: [
          'Closed-loop geothermal seals the working fluid inside pipes so it never touches the rock directly. Heat crosses the pipe wall by conduction. You lose some transfer speed compared with open fractures, but you gain predictability: no lost circulation, no scaling in an open reservoir, no need for the three-ingredient alignment hydrothermal depends on.',
          'Advanced Geothermal Systems (AGS) is the label for this family of designs. They target regions with good heat at depth but poor natural permeability, including many sedimentary basins where oil and gas already drilled deep holes.',
          'Whether closed-loop becomes a niche complement to EGS or a parallel mainstream path is still an open question. The drilling know-how is already here. The open engineering questions are how much pipe area you need per megawatt and what working fluid works best at depth.',
        ],
        aside: { label: 'The tradeoff', text: 'Open systems move more heat per well when geology cooperates. Closed systems can be sited more broadly because they do not require natural permeability. Both remain under active development and demonstration.' },
        visual: 'loop',
      },
      {
        id: 'transfer',
        kicker: 'The physics',
        title: 'Conduction through the pipe wall',
        body: [
          'In an open EGS or hydrothermal system, fluid flows through the rock itself. In AGS, the rock never sees the working fluid. Heat moves from hot rock into the pipe, then the fluid carries it to the surface.',
          'That means designers care about pipe material, wall thickness, flow rate, and total length of hot rock contact. Horizontal laterals and multilateral loops increase surface area the way fracture networks do in EGS, but in a geometry you control from the rig.',
          'Working fluids may be water, pressurized CO2, or other media chosen for density and heat capacity at target temperatures. The choice affects pumping power, corrosion, and how much heat you extract per meter of borehole.',
        ],
      },
      {
        id: 'designs',
        kicker: 'In the field',
        title: 'Loops, laterals, and developers',
        body: [
          'Eavor Technologies popularized a closed-loop concept using vertical wells connected by horizontal radiators in hot rock, circulating fluid by thermosiphon or pumps. Sage Geosystems and others pursue variants tuned to sedimentary heat and existing oilfield corridors.',
          'Pennsylvania, Texas, and Montana are among the states where closed-loop pilots attract interest because the geology is hot enough at depth but lacks the volcanic permeability of the West. Repurposed drilling pads and known subsurface logs lower exploration cost compared with a greenfield hydrothermal hunt.',
        ],
        bullets: [
          'Vertical doublets with long horizontal sections in hot formation',
          'Multilateral boreholes to increase contact area without multiple pads',
          'Thermosiphon-driven circulation where geometry and fluid density allow',
          'Co-location with industrial heat loads or existing transmission',
        ],
      },
      {
        id: 'advantages',
        kicker: 'Why try it',
        title: 'What closed-loop buys you',
        body: [
          'No open fracture network means lower induced seismicity risk relative to stimulation-heavy EGS. Water consumption can be lower because the loop is sealed. Permitting conversations may differ when you are not injecting into an open aquifer, though local rules still vary widely.',
          'For communities skeptical of hydraulic stimulation, a pipe-only design can be easier to explain even if the physics tradeoffs are real.',
        ],
      },
      {
        id: 'limits',
        kicker: 'The math',
        title: 'Where closed-loop struggles',
        body: [
          'Conduction is slower than advection through a well-connected fracture network. More borehole meters per megawatt usually means higher capital cost unless drilling gets cheap enough to compensate.',
          'Very deep, very hot targets stress materials and downhole equipment. AGS at supercritical temperatures is largely still on the drawing board. Today\u2019s pilots focus on temperatures and depths where oilfield tools already operate reliably.',
        ],
        aside: { label: 'How to think about it', text: 'AGS relies more on drilling density and mechanical design than on reservoir stimulation.' },
      },
    ],
  },
  {
    id: 'supercritical',
    to: '/toolbox/supercritical',
    label: 'Supercritical',
    kicker: 'Production · Supercritical',
    titleLead: 'Superhot',
    titleEmphasis: 'rock',
    lede: 'When temperature and pressure push water past its boiling point, geothermal enters a different regime with much higher energy density.',
    sections: [
      {
        id: 'overview',
        depth: 'DEEP HOT',
        kicker: 'The frontier',
        title: 'Supercritical geothermal',
        body: [
          'Below about four kilometers, in the right geology, rock temperatures can exceed 374\u00b0C. At that threshold and sufficient pressure, water becomes a supercritical fluid: dense like a liquid, mobile like a gas, and able to carry far more energy per unit volume than steam.',
          'Supercritical geothermal is sometimes grouped with superhot rock programs that target temperatures above 400\u00b0C regardless of whether the fluid phase is strictly supercritical. The practical point is the same: hotter rock changes the economics of how much power one well can produce.',
          'This is the long horizon of the field, not the near-term deployment path that hydrothermal, EGS, and AGS pilots occupy today. It sets the ceiling on what geothermal could eventually deliver if materials and drilling catch up to the resource.',
        ],
        aside: { label: 'Why watch it', text: 'Supercritical resources could multiply the power output of a single well. The countries and companies that solve the materials problem first will define the next generation of the resource.' },
        visual: 'gradient',
      },
      {
        id: 'physics',
        kicker: 'The threshold',
        title: 'What supercritical means',
        body: [
          'Water\u2019s critical point sits at roughly 374\u00b0C and 22 megapascals of pressure. Above that, liquid and gas phases merge into one supercritical phase. Entropy and density change in ways that make conventional steam-turbine designs inadequate without re-engineering.',
          'Supercritical CO2 is also studied as a working fluid in closed loops because its critical point is lower and its thermodynamic properties can reduce pumping losses. That research overlaps with AGS and carbon utilization, even when the heat source is still hot rock.',
        ],
        bullets: [
          'Critical point: ~374\u00b0C and ~22 MPa for water',
          'Supercritical fluid: single phase with high energy density',
          'Superhot rock: often defined as >400\u00b0C, not always supercritical in every well',
          'Implication: smaller surface footprint per megawatt if wells survive the conditions',
        ],
      },
      {
        id: 'iceland',
        kicker: 'Proof at depth',
        title: 'Iceland and the IDDP wells',
        body: [
          'Iceland\u2019s Deep Drilling Project and related wells at Krafla and Reykjanes drilled into magma-adjacent rock and measured temperatures far above conventional hydrothermal fields.[23] IDDP-2 reached supercritical conditions at depth, confirming that the physics is real even when the engineering is brutal.',
          'Those wells suffered equipment failures, cement instability, and short operating lifetimes. They were research holes, not commercial plants. The value was measurement: temperature, pressure, fluid chemistry, and the limits of off-the-shelf drilling hardware.',
        ],
      },
      {
        id: 'engineering',
        kicker: 'The hard part',
        title: 'Materials, corrosion, and drilling',
        body: [
          'Hot acidic fluids destroy standard casings and alloys. Scaling and corrosion rates that would be manageable at 200\u00b0C become existential at 400\u00b0C. Cement jobs that seal a conventional geothermal well may fail when thermal cycling and chemistry intensify.',
          'Drilling itself slows as tools overheat and electronics fail. New bit designs, insulated drill pipe, and logging tools rated for superhot conditions are active research areas at national laboratories and in international partnerships.',
        ],
      },
      {
        id: 'timeline',
        kicker: 'The horizon',
        title: 'Research now, deployment later',
        body: [
          'Japan, Italy, New Zealand, and the U.S. run parallel superhot and supercritical research programs. None has a utility-scale supercritical plant operating for decades the way hydrothermal fields do. The pathway runs through smaller demonstration wells, better materials, and honest reporting of failures.',
          'Supercritical geothermal remains a long-term research area rather than a near-term commercial deployment option. For subsurface engineers, it addresses whether higher-temperature resources can materially increase energy yield per well.',
        ],
        aside: { label: 'Connection to the rest', text: 'Hydrothermal proves the surface loop. EGS and AGS expand where that loop can attach. Supercritical asks how much energy each attachment point could yield if we stop treating 200\u00b0C as the ceiling.' },
      },
    ],
  },
]

// Every resource from the DOE OG Technical Resources page, grouped by its
// native category. Each item includes a short note on what the resource is for.
export const TOOLBOX = [
  {
    group: 'Portals',
    blurb: 'Federal and industry hubs that index geothermal data, tools, and maps.',
    items: [
      { name: 'Geothermal Resource Data, Tools, and Maps', url: 'https://www.nrel.gov/gis/geothermal.html', framing: 'NRL portal linking DOE geothermal data, maps, and modeling tools.' },
      { name: 'OpenEI', url: 'https://openei.org/wiki/Gateway:Geothermal', framing: 'Crowdsourced energy wiki; the RAPID Toolkit summarizes state permitting rules.' },
      { name: 'RE Data Explorer', url: 'https://www.re-explorer.org/', framing: 'Renewable-energy data and analysis aimed at developing countries, useful for international scoping.' },
      { name: 'Geothermal Rising', url: 'https://geothermal.org/', framing: 'The U.S. geothermal industry\u2019s member association and the hub for its conferences, community, and professional resources.' },
      { name: 'Project InnerSpace', url: 'https://projectinnerspace.org', framing: 'Philanthropy-funded nonprofit bridging oil-and-gas expertise into global geothermal scale-up. GeoFund pilots, PIVOT convenings, and GEODE consortium partner.', cite: [32] },
      { name: 'CEM GeoFuture Initiative', url: 'https://www.cleanenergyministerial.org/initiatives-campaigns/geofuture-initiative/', framing: 'Clean Energy Ministerial initiative co-led by the U.S. with Japan and Saudi Arabia to accelerate next-generation geothermal deployment globally. Coordinated by NLR.', cite: [33] },
      { name: 'Great Basin Center for Geothermal Energy', url: 'https://gbcge.org/', framing: 'UNR research, regional exploration synthesis, and the National Geothermal Academy.', cite: [16] },
      { name: 'Nevada Division of Minerals', url: 'https://minerals.nv.gov/', framing: 'State geothermal leasing, drilling, and activity updates for Nevada projects.', cite: [17] },
    ],
  },
  {
    group: 'Data Sources',
    blurb: 'Subsurface temperatures, heat-flow measurements, and project datasets.',
    items: [
      { name: 'Geothermal Data Repository (GDR)', url: 'https://gdr.openei.org/', framing: 'Every federally funded project must deposit its data here, so it is the public record of the field.' },
      { name: 'National Geothermal Data System (NGDS)', url: 'https://data.geothermaldata.org/', framing: 'Subsurface catalog of wells, temperatures, and geologic context for site screening.' },
      { name: 'Geothermal Energy Atlas (GEA)', url: 'https://maps.nrel.gov/geothermal-energy-atlas', framing: 'Interactive map of geospatial geothermal data.' },
      { name: 'GeoVision Scenario Viewer', url: 'https://apps.openei.org/geovision/', framing: 'Scenario data from the GeoVision study on U.S. geothermal deployment.' },
      { name: 'IRIS (Seismology)', url: 'https://www.iris.edu/hq/', framing: 'Seismic data from 100+ universities; used for induced-seismicity baseline work.' },
      { name: 'Global Heat Flow Database', url: 'https://www.ihfc-iugg.org/products/global-heat-flow-database', framing: 'Regional heat-flow measurements for early resource screening.' },
      { name: 'GeoMap (Project InnerSpace)', url: 'https://geomap.projectinnerspace.org/geomap/', framing: 'Open global geothermal prospecting map with regional subsurface heat, geology, and surface layers for every major world region.', cite: [32] },
      { name: 'National Geologic Map Database', url: 'https://ngmdb.usgs.gov/ngmdb/ngmdb_home.html', framing: 'The USGS map library, for understanding the geology under any site in the country.' },
      { name: 'OSTI', url: 'https://www.osti.gov/', framing: 'DOE research archive and technical reports.' },
      { name: 'SMU Geothermal Laboratory', url: 'https://www.smu.edu/Dedman/Academics/Departments/Earth-Sciences/Research/GeothermalLab', framing: 'A long-running academic lab whose heat-flow maps are a field reference.', cite: [4] },
    ],
  },
  {
    group: 'Regional \u2014 Great Basin & Nevada',
    blurb: 'State and regional layers for Basin-and-Range scoping. Use alongside national catalogs when working in Nevada and the western Great Basin.',
    items: [
      { name: 'University of Nevada, Reno', url: 'https://www.unr.edu/', framing: 'Home institution for NBMG, the Great Basin Center for Geothermal Energy, and Keck subsurface data programs.', cite: [24] },
      { name: 'NBMG Publications', url: 'https://pubs.nbmg.unr.edu/', framing: 'Bulletins, open-file reports, and lists from the Nevada Bureau of Mines and Geology, including Thermal Waters of Nevada.', cite: [25] },
      { name: 'NBMG Geothermal Program', url: 'https://nbmg.unr.edu/geothermal/index.html', framing: 'Nevada Bureau of Mines and Geology hub for maps, GIS, databases, and publications.', cite: [7] },
      { name: 'NBMG Great Basin GIS data', url: 'https://nbmg.unr.edu/geothermal/data.html', framing: 'Downloadable exploration layers: geology, geochemistry, BLM leases, hot springs, favorability, geophysics.', cite: [8] },
      { name: 'UNR Subsurface Database Explorer', url: 'https://keck-nbmg.opendata.arcgis.com/', framing: 'Current Nevada subsurface records and open geospatial data from the Keck Library.', cite: [9] },
      { name: 'Great Basin Groundwater Geochemical Database', url: 'https://nbmg.unr.edu/Geothermal/GeochemDatabase.html', framing: 'Regional fluid chemistry for exploration and geothermometer work.', cite: [10] },
      { name: 'NBMG geothermal well files', url: 'https://nbmg.unr.edu/geothermal/WellInfo.html', framing: 'Well log search by API and geothermal well file archive.', cite: [13] },
      { name: 'NOAA U.S. thermal springs database', url: 'https://www.ngdc.noaa.gov/nndc/servlet/ShowDatasets?dataset=100006', framing: 'Spring-level reconnaissance data across the United States.', cite: [14] },
      { name: 'USGS Great Basin temperature profiles (OF 99-425)', url: 'https://pubs.usgs.gov/of/1999/of99-425/', framing: 'Historic drill-hole temperature data for the Great Basin.', cite: [15] },
    ],
  },
  {
    group: 'Modeling Tools',
    blurb: 'Cost, performance, and economic models for geothermal projects.',
    items: [
      { name: 'GETEM', url: 'https://www.energy.gov/hgeo/geothermal/geothermal-electricity-technology-evaluation-model', framing: 'DOE\u2019s own tool for predicting the cost of electricity from a geothermal plant.' },
      { name: 'CREST', url: 'https://www.nrel.gov/analysis/crest.html', framing: 'Cash-flow models for project economics and how incentives change the math.' },
      { name: 'GEOPHIRES', url: 'https://github.com/NREL/GEOPHIRES-v2', framing: 'Open-source Python for geothermal techno-economic simulation.' },
      { name: 'GeoT (Geothermometry)', url: 'https://marketplace.lbl.gov/geoenvironment/', framing: 'Estimates reservoir temperature from fluid chemistry, before you commit to deep drilling.' },
      { name: 'GSHP Screening Tool', url: 'https://gshp.ornl.gov/', framing: 'Consumer-friendly estimator for ground-source heat pump savings in any U.S. building.' },
      { name: 'JEDI Models', url: 'https://www.nrel.gov/analysis/jedi/about.html', framing: 'Jobs and local economic impact estimates for energy projects.' },
      { name: 'ReEDS', url: 'https://www.nrel.gov/analysis/reeds/', framing: 'The national-scale grid capacity model behind most large U.S. power-sector studies.' },
      { name: 'reV Model', url: 'https://www.nrel.gov/gis/renewable-energy-potential.html', framing: 'Renewable potential mapped against transmission and land constraints.' },
      { name: 'SLOPE', url: 'https://maps.nrel.gov/slope/about', framing: 'State, county, and city energy planning data for scenario analysis at the local level.' },
      { name: 'System Advisor Model (SAM)', url: 'https://sam.nrel.gov/', framing: 'NREL techno-economic model for multiple renewable generation types.' },
    ],
  },
  {
    group: 'Guides, Reports & Protocols',
    blurb: 'Standards, market reports, and regulatory guidance used in geothermal development and review.',
    items: [
      { name: 'GeoRePORT', url: 'https://www.nrel.gov/docs/fy22osti/81820.pdf', framing: 'A reporting standard that provides a common framework for describing geothermal resource characteristics.', cite: [22] },
      { name: 'Induced Seismicity Protocol', url: 'https://www.energy.gov/hgeo/geothermal/articles/doe-releases-updated-induced-seismicity-protocol', framing: 'DOE protocol for managing earthquake risk in EGS. Required for funded projects.', cite: [18] },
      { name: '2025 U.S. Geothermal Market Report', url: 'https://docs.nrel.gov/docs/fy26osti/91898.pdf', framing: 'NREL annual report on U.S. installed capacity, development pipeline, and market trends.', cite: [1] },
      { name: 'Project InnerSpace news & reports', url: 'https://projectinnerspace.org/news', framing: 'Regional Future of Geothermal studies, impact reports, and program updates from the philanthropy-funded deployment nonprofit.', cite: [32] },
      { name: 'IEA: The Future of Geothermal Energy', url: 'https://www.iea.org/reports/the-future-of-geothermal-energy', framing: 'Global next-generation geothermal outlook, cost paths, and policy gaps. Source for the up-to-800 GW by 2050 scenario cited by CEM GeoFuture.', cite: [34] },
      { name: 'NLR next-generation geothermal research', url: 'https://www.nlr.gov/geothermal/next-generation', framing: 'National Laboratory of the Rockies hub for next-gen geothermal techno-economics and coordinator of the CEM GeoFuture Initiative.', cite: [33] },
      { name: 'Handbook of Best Practices for Geothermal Drilling (Sandia)', url: 'https://www.osti.gov/servlets/purl/1325261', framing: 'DOE/Sandia field reference on planning, casing, mud, lost circulation, well control, and logging for geothermal wells.', cite: [26] },
      { name: 'MPD Operations Matrix (API RP 92M / IADC)', url: 'https://iadc.org/wp-content/uploads/2021/12/WSP-MPDOperationsMatrix-per-API-RP-92M.pdf', framing: 'Decision table for managed pressure drilling: when to continue MPD, adjust back-pressure, or transition to shut-in and kill.', cite: [35] },
      { name: 'Well Control School glossary', url: 'https://wellcontrolschool.com/glossary', framing: 'More than 1,300 alphabetized drilling and well control terms with definitions, from kicks and BOPE to mud chemistry and rig hardware. Standard O&G reference; pair with this site\u2019s geothermal context on the drilling page.', cite: [36] },
      { name: 'World Bank: Geothermal feasibility studies', url: 'https://documents.worldbank.org/en/publication/documents-reports/documentdetail/36016', framing: 'Best-practice guide for feasibility studies at each project phase, including how risk and cost uncertainty fall as the resource is confirmed.', cite: [37] },
      { name: 'HGEO Workforce Programs (DOE)', url: 'https://www.energy.gov/hgeo/hgeo-workforce-programs', framing: 'Official hub for federal internships, university grants, and student competitions in geothermal and hydrocarbon careers.', cite: [29] },
      { name: 'Thermal Waters of Nevada (NBMG Bulletin 91)', url: 'https://pubs.nbmg.unr.edu/Thermal-waters-of-Nevada-p/b091.htm', framing: 'Foundational catalog of Nevada hot springs, wells, chemistry, and exploration history.', cite: [11] },
      { name: 'Nevada geothermal power production, 1985\u20132011 (NBMG OFR 2012-03)', url: 'https://pubs.nbmg.unr.edu/Data-tables-and-graphs-p/of2012-03.htm', framing: 'Historical production data for Nevada geothermal plants.', cite: [12] },
      { name: 'NBMG geothermal well file index (Report L-5)', url: 'https://pubs.nbmg.unr.edu/Index-geoth-well-files-2009-p/l005.htm', framing: 'Index to the well file archive at the Nevada Bureau of Mines and Geology.', cite: [13] },
      { name: 'EGS Code Comparison Study', url: 'https://www.researchgate.net/publication/313822713_Outcomes_from_a_Collaborative_Approach_to_a_Code_Comparison_Study_for_Enhanced_Geothermal_Systems', framing: 'A lab study benchmarking how well we can model EGS. Useful for judging what simulations can be trusted.' },
      { name: 'PermitAI (PNNL)', url: 'https://www.pnnl.gov/projects/permitai', framing: 'Federal effort to apply document search and analysis tools to NEPA review records.' },
    ],
  },
]

export { UTES } from './utesContent.jsx'
export { DATA_MODELING, DATA_MODELING_SECTION } from './dataModelingContent.jsx'
export { CITATIONS, CITATIONS_PAGE, getCitation, getCitationById } from './citationsContent.jsx'
import { DATA_MODELING_SECTION } from './dataModelingContent.jsx'
export { PERMITTING_NOTES, getPermittingNote, permittingNotePath, PERMITTING_NOTES_ANCHOR } from './permittingNotesContent.jsx'
export { INTERNATIONAL } from './internationalContent.jsx'
export { WORKFORCE, WORKFORCE_PAGES, WORKFORCE_SECTIONS } from './workforceContent.jsx'

export const HELPFUL_LINKS_SECTION = {
  id: 'portals',
  to: '/toolbox/portals',
  label: 'Helpful links',
  groups: ['Portals', 'Data Sources', 'Regional \u2014 Great Basin & Nevada', 'Modeling Tools', 'Guides, Reports & Protocols'],
  kicker: 'Helpful links',
  titleLead: 'Federal',
  titleEmphasis: 'resources',
  lede: 'Federal hubs, data catalogs, calculators, and reference documents for geothermal scoping.',
}

export const PRIMERS_SECTIONS = [
  {
    id: 'primer',
    to: '/toolbox/primer',
    label: 'Primer',
    kicker: 'Overview · Primer',
    titleLead: 'Geothermal',
    titleEmphasis: 'primer',
    lede: 'From subsurface heat flow through production technology and storage. Production paths are covered in more detail under Production.',
  },
  {
    id: 'glossary',
    to: '/toolbox/glossary',
    label: 'Glossary',
    kicker: 'Overview · Glossary',
    titleLead: 'Geothermal',
    titleEmphasis: 'glossary',
    lede: 'The vocabulary used in the primer and across the site, defined in one line each. For standard oil-and-gas drilling and well control terminology, the Well Control School glossary catalogs more than 1,300 terms with full definitions.[36]',
  },
  {
    id: 'energy-storage',
    to: '/utes',
    label: 'Energy Storage',
    kicker: 'Overview · Energy Storage',
    titleLead: 'Underground thermal',
    titleEmphasis: 'energy storage',
    lede: 'Storing heat and cold in rock, soil, or aquifers so buildings and districts can use seasonal thermal storage rather than meeting every peak with on-demand fuel or electricity.',
  },
  {
    id: 'international',
    to: '/international',
    label: 'International',
    kicker: 'Overview · International',
    titleLead: 'Geothermal is',
    titleEmphasis: 'global',
    lede: 'Most installed megawatts sit outside the United States. So does much of the operating know-how, exploration, financing, grid integration, and community relationships built over decades.',
  },
]

export const OVERVIEW_NAV_SECTIONS = [
  { id: 'adler-archer', to: '/adler-archer', label: 'About' },
  ...PRIMERS_SECTIONS,
]

export const HOME_GUIDE = [
  {
    id: 'primer',
    to: '/toolbox/primer',
    kicker: 'Overview',
    title: 'Geothermal primer',
    lede: 'Heat flow underground, direct use, and how production paths differ from hydrothermal through EGS, AGS, and supercritical.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
  },
  {
    id: 'production',
    to: '/projects',
    kicker: 'Production',
    title: 'Technology and projects',
    lede: 'Hydrothermal, enhanced and advanced systems, supercritical resources, drilling basics, and how projects move from resource to plant.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 'permitting',
    to: '/permitting/problem',
    kicker: 'Permitting',
    title: 'Federal environmental review',
    lede: 'Where schedule time accumulates across NEPA, ESA, NHPA, and state permits—and coordination options that can shorten reviews.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: 'storage',
    to: '/utes',
    kicker: 'Energy storage',
    title: 'Underground thermal storage',
    lede: 'Seasonal heat and cold stored in rock, soil, or aquifers for buildings and district systems.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  },
  {
    id: 'international',
    to: '/international',
    kicker: 'International',
    title: 'Global deployment',
    lede: 'Most operating megawatts sit outside the United States, along with decades of exploration, financing, and grid integration experience.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  },
  {
    id: 'links',
    to: '/toolbox/portals',
    kicker: 'Helpful links',
    title: 'Federal data and tools',
    lede: 'Hubs, data catalogs, calculators, and reference documents for geothermal scoping and modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
]

export const HELPFUL_LINKS_NAV_SECTIONS = [
  { id: 'portals', to: '/toolbox/portals', label: 'Links' },
  { id: 'citations', to: '/citations', label: 'References' },
]

export const PRODUCTION_SECTIONS = PRIMER_TOPICS.map(({ id, to, label, kicker, titleLead, titleEmphasis, lede }) => ({
    id,
    to,
    label,
    kicker,
    titleLead,
    titleEmphasis,
    lede,
  }))

/** Full Production dropdown: technology topics plus project path and drilling. */
export const PRODUCTION_NAV_SECTIONS = [
  ...PRODUCTION_SECTIONS,
  { id: 'projects', to: '/projects', label: 'Projects' },
  { id: 'drilling', to: '/projects/drilling', label: 'Drilling 101' },
]

/** @deprecated use PRODUCTION_SECTIONS */
export const TECHNOLOGY_SECTIONS = PRODUCTION_SECTIONS

/** @deprecated use PRIMERS_SECTIONS */
export const TOOLBOX_SECTIONS = PRIMERS_SECTIONS

export function getToolboxGroup(sectionId) {
  const section = sectionId === 'portals'
    ? HELPFUL_LINKS_SECTION
    : sectionId === 'data-modeling'
      ? DATA_MODELING_SECTION
      : PRIMERS_SECTIONS.find(s => s.id === sectionId)
  if (!section) return null
  return TOOLBOX.find(g => g.group === section.group) || null
}

export function getToolboxGroups(sectionId) {
  const section = sectionId === 'portals' || sectionId === 'helpful-links'
    ? HELPFUL_LINKS_SECTION
    : sectionId === 'data-modeling'
      ? HELPFUL_LINKS_SECTION
      : PRIMERS_SECTIONS.find(s => s.id === sectionId)
  if (!section) return []
  if (section.groups) {
    return section.groups
      .map(name => TOOLBOX.find(g => g.group === name))
      .filter(Boolean)
  }
  const single = getToolboxGroup(sectionId)
  return single ? [single] : []
}

export function helpfulLinksSectionForPath(path) {
  if (path === '/toolbox/portals' || path === '/toolbox' || path === '/toolbox/data-and-modeling'
    || path === '/toolbox/data-sources' || path === '/toolbox/modeling-tools') {
    return 'portals'
  }
  if (path === '/citations') return 'citations'
  return null
}

export function primersSectionForPath(path) {
  if (path === '/toolbox/primer' || path === '/primer') return 'primer'
  if (path === '/toolbox/glossary' || path === '/glossary') return 'glossary'
  if (path === '/utes' || path === '/underground-thermal-energy-storage' || path === '/toolbox/energy-storage') {
    return 'energy-storage'
  }
  if (path === '/international') return 'international'
  return null
}

export function productionSectionForPath(path) {
  if (path === '/projects' || path.startsWith('/projects/')) {
    if (path === '/projects' || path.startsWith('/projects#')) return 'projects'
    if (path.startsWith('/projects/drilling')) return 'drilling'
  }
  const section = PRODUCTION_NAV_SECTIONS.find(s => s.to === path)
  return section?.id ?? null
}

/** @deprecated use productionSectionForPath */
export function technologySectionForPath(path) {
  return productionSectionForPath(path)
}

export function toolboxGroupAnchor(groupName) {
  return groupName
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/\s+&\s+/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Hero mosaic imagery (Unsplash, swap for owned assets anytime). Each page uses 4–6 tiles.
export const HERO_IMAGES = {
  home: [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  ],
  primer: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  ],
  hydrothermal: [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  ],
  egs: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1611273426858-450bf5eb5580?w=400&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
  ],
  ags: [
    'https://images.unsplash.com/photo-1611273426858-450bf5eb5580?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  ],
  supercritical: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  ],
  toolbox: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
  ],
  international: [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
  ],
  permitting: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
  ],
  utes: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  ],
  glossary: [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
  ],
  about: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
  ],
  workforce: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
  ],
  drilling: [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80',
    'https://images.unsplash.com/photo-1611273426858-450bf5eb5580?w=400&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
  ],
}

export const GLOSSARY = [
  { term: 'Ambient', def: 'The natural condition of the environment at a given time, the baseline temperature and pressure surroundings are measured against.' },
  { term: 'Aquifer', def: 'A water-bearing layer of permeable sand, rock, or gravel. Relevant to hydrothermal fields, ATES, and groundwater permitting.' },
  { term: 'ATES', def: 'Aquifer thermal energy storage. Open-loop seasonal storage in groundwater.' },
  { term: 'Baseload plants', def: 'Power plants run to meet constant minimum grid load. Geothermal often serves this role because it runs around the clock.' },
  { term: 'Binary-cycle power plant', def: 'A plant that uses lower-temperature geothermal fluid to vaporize a secondary working fluid, which then drives a turbine.' },
  { term: 'Blowout', def: 'Uncontrolled flow at the surface after well control is lost. The escalation from a kick that was not shut in and killed in time.' },
  { term: 'Blowout preventer (BOP)', def: 'Stacked wellhead equipment that can seal the wellbore during a kick. Annular, pipe, and blind rams are common components. Geothermal operations often need high-temperature elastomers in the annular preventer.' },
  { term: 'Bottom hole assembly (BHA)', def: 'The lower end of the drill string: the bit, stabilizers, mud motor or steerable system on directional wells, and MWD/LWD tools. Everything that cuts rock and sends data from the bottom of the hole.' },
  { term: 'Brine', def: 'Subsurface fluids with significant dissolved salts. Some brines are sources for lithium and other critical minerals.' },
  { term: 'British Thermal Unit (Btu)', def: 'The heat needed to raise one pound of water by one degree Fahrenheit. A common unit in U.S. energy accounting.' },
  { term: 'BTES', def: 'Borehole thermal energy storage. Closed-loop seasonal storage in vertical borehole fields.' },
  { term: 'Cap rocks', def: 'Low-permeability rock layers that cap or seal a geothermal reservoir from above.' },
  { term: 'Casing', def: 'Steel pipe set in the wellbore and cemented in place to isolate formations and carry wellhead loads. Geothermal programs typically run conductor, surface, intermediate, and production strings, each sized for collapse, burst, and tension at flowing temperature.[26]' },
  { term: 'Cement (well)', def: 'Slurry pumped into the annulus between casing and rock to bond the string and seal permeable zones. Geothermal cements must tolerate thermal cycling and hot brine; bond logs confirm the barrier before the next hole section is drilled.[26]' },
  { term: 'Capacity factor', def: 'Actual energy output divided by maximum possible output. Geothermal ranks among the highest of renewable sources.' },
  { term: 'Cascading heat', def: 'Using geothermal heat in steps, each at a lower temperature, for successive industrial or building tasks.' },
  { term: 'Closed-loop', def: 'A design that seals the working fluid inside pipes so it never touches the rock, trading heat-gathering speed for control.' },
  { term: 'Co-production', def: 'Generating geothermal power from hot fluids produced alongside oil and gas operations in active wells.' },
  { term: 'Completion', def: 'The hardware and procedures that connect a cased or open hole to the reservoir: liners, perforations, packers, tubing, and stimulation. Hydrothermal wells may produce from open hole or slotted liner; EGS projects often use multistage hydraulic fracturing.[26,32]' },
  { term: 'Condensate', def: 'Water formed when geothermal steam condenses back to liquid.' },
  { term: 'Condenser', def: 'Equipment that converts turbine exhaust steam back into liquid water.' },
  { term: 'Cooling tower', def: 'A structure that removes waste heat from condensed steam or process water.' },
  { term: 'Crust', def: 'Earth\u2019s outer rock layer, also called the lithosphere. Where most geothermal wells and heat pumps reach.' },
  { term: 'CTES', def: 'Cavern thermal energy storage. Storage in mined or natural underground caverns, often with water.' },
  { term: 'Direct use', def: 'Using geothermal heat as heat, for buildings and industry, skipping electricity generation entirely.' },
  { term: 'Drilling', def: 'Boring into the Earth to reach geothermal resources, usually with oil-and-gas rigs adapted for geothermal conditions.' },
  { term: 'Drill bit', def: 'The cutter at the bottom of the drill string. Roller-cone (tricone) bits with tungsten-carbide inserts are common in hard geothermal rock; PDC bits suit softer formations. Bit selection and replacement trips drive drilling cost and schedule.[26]' },
  { term: 'Drill string', def: 'The assembled column of drill pipe, HWDP, drill collars, and BHA that the rig rotates to deepen the hole. Mud flows through it; weight on bit comes mainly from collars near the bottom.[26]' },
  { term: 'Dry steam', def: 'Very hot steam with little or no liquid. The oldest geothermal power plant type, rare in nature.' },
  { term: 'EGS', def: 'Enhanced Geothermal Systems. Engineering permeability into hot dry rock so geothermal works where nature did not pre-build it.' },
  { term: 'Efficiency', def: 'Useful energy output divided by energy input for a machine or power plant.' },
  { term: 'Elastomer', def: 'A flexible rubber-like sealing material used in BOP annular preventers, packers, and wellhead components. Standard BOP elastomers are often rated near 121\u00b0C; high-temperature variants near 177\u00b0C. Hot geothermal returns during a kick can exceed those limits and compromise the seal.' },
  { term: 'Feasibility study', def: 'A structured assessment of whether a geothermal project can be built and operated at acceptable cost and risk. Lenders expect updated feasibility work at each major gate, from exploration through commissioning.[37]' },
  { term: 'Fault', def: 'A fracture in the crust where adjacent rock blocks slip past each other. Often associated with geothermal activity.' },
  { term: 'Firm clean power', def: 'Carbon-free generation that runs around the clock, the thing a solar-and-wind grid increasingly needs.' },
  { term: 'Flash steam', def: 'Steam produced when hot geothermal fluid is depressurized, or \u201cflashed,\u201d to boil off vapor.' },
  { term: 'Fumarole', def: 'A surface vent, often in volcanic terrain, where steam or hot gases escape from the ground.' },
  { term: 'Geology', def: 'The study of Earth\u2019s composition, structure, processes, and history. The first discipline in any site assessment.' },
  { term: 'Geophones', def: 'Downhole sensors that record micro-seismic signals, used to monitor how an EGS reservoir develops.' },
  { term: 'Geothermal', def: 'Relating to heat from Earth\u2019s interior, whether used for electricity, direct heat, or storage.' },
  { term: 'Geothermal district heating (GDH)', def: 'A utility system that delivers geothermal hot water or steam from a central plant to multiple buildings.' },
  { term: 'Geothermal energy', def: 'Heat from inside the Earth, accessed through water, rock, or engineered reservoirs.' },
  { term: 'Geothermal gradient', def: 'How fast rock warms with depth, roughly 25\u201330\u00b0C per kilometer. Central to resource estimates.' },
  { term: 'Geyser', def: 'A hot spring that periodically erupts jets of water and steam.' },
  { term: 'Heat exchanger', def: 'A device that transfers thermal energy from one fluid to another without mixing them.' },
  { term: 'Heat flow', def: 'Movement of heat from Earth\u2019s interior toward the surface, where it radiates into the atmosphere and space.' },
  { term: 'Heat pump (GHP/GSHP)', def: 'Ground-source heat pumps that exploit the steady shallow-ground temperature to heat and cool buildings efficiently.' },
  { term: 'Hydrothermal', def: 'The mature form. Drilling into places where heat, water, and permeable rock already occur together.' },
  { term: 'Induced seismicity', def: 'Small earthquakes that can result from injecting fluid underground. Managed under a mandatory DOE protocol.' },
  { term: 'Injection', def: 'Returning spent geothermal fluid to the subsurface, also called reinjection.' },
  { term: 'Kick', def: 'Formation fluid entering the wellbore while the well can still be shut in and killed. On geothermal rigs, steam flashing and lost circulation can trigger kicks even in underpressured fields.' },
  { term: 'KGRA', def: 'Known Geothermal Resource Area. A region the USGS has identified as containing geothermal resources.' },
  { term: 'Kilowatt (kW)', def: 'One thousand watts, a unit of electric power.' },
  { term: 'Kilowatt-hour (kWh)', def: 'The energy from one kilowatt of power used for one hour, equal to 3,413 Btu.' },
  { term: 'Levelized cost', def: 'The all-in cost of energy over a plant\u2019s life, the number used to compare geothermal against other sources.' },
  { term: 'Lithium', def: 'A light metal found in some geothermal brines. A critical mineral for batteries and grid storage.' },
  { term: 'Liner', def: 'A casing string that does not extend to surface; it hangs from a liner hanger in the previous casing shoe. Liners reduce cost when only the bottom of the hole needs a full-diameter pressure boundary.[26]' },
  { term: 'Load', def: 'The total electric demand on a power system at a given moment.' },
  { term: 'Lost circulation', def: 'Drilling fluid flowing into the formation instead of returning to surface. Drops hydrostatic head and can lead to a kick when the fluid level in the hole falls.' },
  { term: 'Low-temperature resources', def: 'Geothermal resources below about 300\u00b0F (150\u00b0C), common in shallow ground and useful for heat pumps and direct use.' },
  { term: 'Machine learning', def: 'Algorithms that find patterns in large datasets. Increasingly applied to exploration, reservoir analysis, and plant operations.' },
  { term: 'Managed pressure drilling (MPD)', def: 'Drilling with active control of wellbore pressure, usually through surface back-pressure on a closed or partially closed system, rather than mud weight alone.' },
  { term: 'MPD operations matrix', def: 'A pre-well decision table for managed pressure drilling. Maps influx size and surface pressure state to actions: continue MPD, adjust the system, or secure the well and transition to conventional shut-in and kill. Limits include operating, planned, and back-pressure thresholds per API RP 92M.[35]' },
  { term: 'Magma', def: 'Molten rock beneath the crust. Igneous rock forms when magma cools.' },
  { term: 'Mantle', def: 'The layer of hot, solid rock between Earth\u2019s crust and its iron-nickel core.' },
  { term: 'Peaking plants', def: 'Generators run to meet maximum short-term demand. Usually more expensive per unit than baseload plants.' },
  { term: 'Packer', def: 'A downhole seal that isolates zones in the wellbore, often set on tubing or production casing. Packers and wellhead elastomers face the same high-temperature limits as BOP annular elements on geothermal wells.[26]' },
  { term: 'Permeability', def: 'How easily fluid moves through rock. The one ingredient nature usually withholds, and the thing EGS engineers in.' },
  { term: 'Plate tectonics', def: 'The theory that Earth\u2019s crust moves in rigid plates. Geothermal resources often sit where plates interact.' },
  { term: 'Plugging and abandonment (P&A)', def: 'End-of-life well closure: cement plugs set across productive zones, casing cut at the required depth, and site restored per state oil-and-gas or geothermal rules. Incomplete P&A leaves legacy leakage and liability.[26]' },
  { term: 'Porosity', def: 'The fraction of rock volume made up of pore spaces, usually expressed as a percentage.' },
  { term: 'Power purchase agreement (PPA)', def: 'A long-term contract to sell electricity from a geothermal plant, often spanning 20\u201330 years. The PPA horizon shapes how developers stage exploration, development, and reservoir management.' },
  { term: 'Reservoir', def: 'A natural underground body of fluid or gas, such as hot water, steam, or oil.' },
  { term: 'RTES', def: 'Rock thermal energy storage. High-temperature seasonal storage in solid rock formations, often at greater depth than shallow BTES fields.' },
  { term: 'Salinity', def: 'The concentration of dissolved salts in water, important for corrosion, scaling, and mineral extraction.' },
  { term: 'Subsidence', def: 'Ground sinking caused by fluid withdrawal and falling subsurface pressure.' },
  { term: 'Thermal recovery', def: 'The fraction of stored thermal energy recovered over a cycle. Balanced loads improve recovery.' },
  { term: 'Total dissolved solids (TDS)', def: 'The total amount of dissolved material in water, a common water-quality measure.' },
  { term: 'Transmission line', def: 'Conductors and structures that carry bulk electricity from generating plants to the grid.' },
  { term: 'Turbine', def: 'A bladed rotor spun by steam or gas to drive an electric generator.' },
  { term: 'UTES', def: 'Underground thermal energy storage. Storing heat or cold in rock, soil, or aquifers for seasonal or longer use.' },
  { term: 'Vapor-dominated', def: 'A reservoir where pressure is controlled by steam rather than liquid, sometimes called dry steam.' },
  { term: 'Well control', def: 'Keeping formation fluids out of the wellbore, and safely removing them if they enter. Standard oil-and-gas training applies, but geothermal kick scenarios often involve steam, gas, or H\u2082S rather than liquid hydrocarbons. The Well Control School glossary defines the full hydrocarbon-side vocabulary.[36]' },
  { term: 'Wellhead', def: 'The surface assembly that anchors casing strings, carried the BOP stack during drilling, and connects the well to flow lines or a Christmas tree for production and injection.[26]' },
  { term: 'Well logging', def: 'Measuring rock and fluid properties in a wellbore to characterize a geothermal reservoir.' },
]

export const ABOUT = {
  kicker: 'About this site',
  titleLead: 'About',
  titleEmphasis: 'this project',
  lede:
    'Geothermal heat, production technology, federal permitting, underground storage, and development data.',
  portrait: '/adler-archer.png',
  portraitAlt: 'Adler Archer',
  blocks: [
    {
      num: '01',
      heading: 'How I got here',
      body: [
        'I come from a military family with my grandpa being a 90+ year old former marine, my dad being a former sailor, and both parents being retired feds. Their commitment to service in turn shaped my own.',
        'My career began in the United States Air Force in 2000, then moved into space systems analysis and engineering for a decade. Consulting and graduate work followed in communications, neuroscience, biomedical informatics, and law. In addition to serving as a PIF, I continue teaching at Johns Hopkins School of Medicine.',
      ],
    },
    {
      num: '02',
      heading: 'The premise',
      deck:
        'I am a Presidential Innovation Fellow at DOE, working on federal permitting and deployment of energy infrastructure. I came to geothermal through that assignment, not through a geology background.',
      body: [
        'I am building this in public while I work geothermal at DOE. The aim is a readable path from heat underground to power on the grid, including the permitting steps that slow real projects down. Drafts stay up so specialists can catch mistakes while sections are still taking shape.',
      ],
    },
    {
      num: '03',
      heading: 'Why geothermal',
      deck:
        'Geothermal runs around the clock from a domestic subsurface resource. Most undeveloped sites fail on financing, engineering risk, or permitting—not on whether heat exists underground.',
      body: [
        'That gap between a good resource and an operating plant is what my fellowship work at DOE focuses on: federal permitting, deployment timelines, and the data reviewers need to move faster without cutting corners.',
      ],
    },
    {
      disclaimer: true,
      body: [
        'Personal site. Not an official DOE publication. Views are my own.',
      ],
    },
  ],
  links: [
    { label: 'Personal site', url: 'https://adlerarcher.com/', icon: '/favicons/elsewhere/adlerarcher.png' },
    { label: 'Presidential Innovation', url: 'https://presidentialinnovationfellows.gov/fellows/adler-archer/', icon: '/favicons/elsewhere/pif-gov.png' },
    { label: 'LinkedIn page', url: 'https://linkedin.com/in/adlerarcher', icon: '/favicons/elsewhere/linkedin.ico' },
  ],
  note: '',
}

export { PROJECTS, PROJECTS_SECTIONS, PERMITTING_SECTIONS } from './projectsContent.jsx'
export { DRILLING, DRILLING_PAGES, DRILLING_SECTIONS, DRILLING_RESOURCES, buildDrillingTopics, getDrillingTopicSection, parseDrillingPath } from './drillingContent.jsx'

const PERMITTING_ALL_AGENCIES = ['blm', 'doe', 'bor', 'usfs']
const PERMITTING_ALL_JURISDICTIONS = [
  'alaska', 'arizona', 'california', 'colorado', 'hawaii', 'idaho', 'montana',
  'nevada', 'new-mexico', 'new-york', 'oregon', 'texas', 'utah', 'vermont', 'washington', 'wyoming',
]

export const PERMITTING_LEAD_AGENCIES = [
  { id: 'blm', label: 'Bureau of Land Management' },
  { id: 'doe', label: 'Dept. of Energy' },
  { id: 'bor', label: 'Bureau of Reclamation' },
  { id: 'usfs', label: 'U.S. Forest Service' },
]

const OPENEI_GEOTHERMAL_BASE = 'https://openei.org/wiki/RAPID/Geothermal'

export const PERMITTING_JURISDICTIONS = [
  { id: 'alaska', label: 'Alaska', url: `${OPENEI_GEOTHERMAL_BASE}/Alaska` },
  { id: 'arizona', label: 'Arizona', url: `${OPENEI_GEOTHERMAL_BASE}/Arizona` },
  { id: 'california', label: 'California', url: `${OPENEI_GEOTHERMAL_BASE}/California` },
  { id: 'colorado', label: 'Colorado', url: `${OPENEI_GEOTHERMAL_BASE}/Colorado` },
  { id: 'hawaii', label: "Hawai'i", url: `${OPENEI_GEOTHERMAL_BASE}/Hawaii` },
  { id: 'idaho', label: 'Idaho', url: `${OPENEI_GEOTHERMAL_BASE}/Idaho` },
  { id: 'montana', label: 'Montana', url: `${OPENEI_GEOTHERMAL_BASE}/Montana` },
  { id: 'nevada', label: 'Nevada', url: `${OPENEI_GEOTHERMAL_BASE}/Nevada` },
  { id: 'new-mexico', label: 'New Mexico', url: `${OPENEI_GEOTHERMAL_BASE}/New_Mexico` },
  { id: 'new-york', label: 'New York', url: `${OPENEI_GEOTHERMAL_BASE}/New_York` },
  { id: 'oregon', label: 'Oregon', url: `${OPENEI_GEOTHERMAL_BASE}/Oregon` },
  { id: 'texas', label: 'Texas', url: `${OPENEI_GEOTHERMAL_BASE}/Texas` },
  { id: 'utah', label: 'Utah', url: `${OPENEI_GEOTHERMAL_BASE}/Utah` },
  { id: 'vermont', label: 'Vermont', url: `${OPENEI_GEOTHERMAL_BASE}/Vermont` },
  { id: 'washington', label: 'Washington', url: `${OPENEI_GEOTHERMAL_BASE}/Washington` },
  { id: 'wyoming', label: 'Wyoming', url: `${OPENEI_GEOTHERMAL_BASE}/Wyoming` },
]

export const PERMITTING = {
  stages: [
    { name: 'Lease', duration: '6–12 mo', hot: false },
    { name: 'Exploration', duration: '6–18 mo', hot: false },
    { name: 'NEPA scoping', duration: '3–6 mo', hot: true },
    { name: 'EA / EIS', duration: '12–36 mo', hot: true },
    { name: 'ESA / NHPA', duration: '6–18 mo', hot: true },
    { name: 'Permits / State', duration: '6–18 mo', hot: false },
    { name: 'Build', duration: '18–30 mo', hot: false },
  ],
  problem: {
    kicker: 'Permitting · The problem',
    titleLead: 'Federal environmental',
    titleEmphasis: 'review',
    lede: 'Federal and state reviews often set the schedule for a geothermal plant. Below: where time accumulates, how the process is structured, coordination options, and the offices involved.',
    num: '01 · The problem',
    headingLead: 'Sequential reviews across',
    headingEmphasis: 'many agencies',
    body: [
      { text: 'A geothermal project on Federal land typically takes five to seven years to move from a lease to an operating plant.[21] Most of that time is not construction. It is review, a sequence of separate, legally required approvals, each conducted by a different agency protecting a different public interest, each largely on its own schedule.' },
      { text: 'NEPA, ESA, NHPA, and parallel state permits address distinct statutory requirements. They developed on separate timelines, so reviews often run in sequence. Each agency uses different data systems. Geothermal projects follow pathways shaped largely for other resource types.' },
      { text: 'A sequence that could resolve in months often takes years. That timeline affects project cost for technologies competing with other generation sources.', dim: true },
    ],
    timelineLabel: 'Where the schedule accumulates, typical Federal timeline',
    timelineNote: 'Highlighted stages are where analytical tooling and better coordination can recover the most time.',
  },
  opportunity: {
    kicker: 'Permitting · Opportunity',
    titleLead: 'Near-term gains in',
    titleEmphasis: 'coordination',
    lede: 'Schedule improvements often come from parallel reviews, shared records, and clearer handoffs between agencies. Three areas:',
    num: '02 · Coordination',
    items: [
      { label: 'Shared data.', text: 'Agencies that share past project records, baselines, and decisions start each review further along. Much of the data exists in separate systems.' },
      { label: 'Modern tooling.', text: 'PermitAI and related tools handle search and draft assembly so reviewers spend time on analysis. PermitAI is one federal example.' },
      { label: 'Better handoffs.', text: 'Published schedules, clear data requests, and parallel compatible reviews reduce delay between agencies.' },
    ],
    closing: {
      coda: 'Shared data and coordinated schedules can shorten reviews without changing statutory requirements.',
    },
  },
  people: {
    kicker: 'Permitting · People',
    titleLead: 'Agencies and',
    titleEmphasis: 'partners',
    lede: 'Federal geothermal permitting involves BLM, DOE, BuRec, USFS, state offices, national laboratories, and project consultants. Filter by lead agency and jurisdiction, or browse by role below. Compiled from public .gov, laboratory, and organization pages.',
    num: '03 · The people',
    relayLabel: 'Typical review sequence',
  },
  notes: {
    kicker: 'Permitting · Notes',
    titleLead: 'Permitting',
    titleEmphasis: 'notes',
    lede: 'Short notes on NEPA, FAST-41, Section 106, and related topics. Links back to the main guide sections.',
    num: '04 · Notes',
  },
  leadAgencies: PERMITTING_LEAD_AGENCIES,
  jurisdictions: PERMITTING_JURISDICTIONS,
  groups: {
    federal: {
      title: 'Federal Program Offices',
      desc: 'The offices that fund, set policy for, and coordinate Federal geothermal permitting.',
      items: [
        { role: 'Convening office', name: 'DOE Office of Geothermal (OG)', who: 'Accelerates discovery and development of gigawatt-scale geothermal. Sits within the Hydrocarbons & Geothermal Energy Office.', leads: 'Hydrocarbons & Geothermal Energy Office', agencies: ['doe'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Policy', name: 'DOE Office of Policy (OP)', who: 'Leads Department permitting-reform efforts and sponsors the PermitAI program.', leads: '', agencies: ['doe'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'NEPA authority', name: 'Council on Environmental Quality (CEQ)', who: 'Sets the government-wide NEPA framework and runs the Permitting Innovation Center.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Permitting leadership', name: 'Federal Permitting Council', who: 'Leads federal permitting improvement under FAST-41. Administers the ERIF fund and oversees the Permitting Dashboard.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Tribal energy', name: 'DOE Office of Indian Energy', who: 'Technical assistance and capacity for Tribal energy. Convenes the Indian Country Energy & Infrastructure Working Group.', leads: '', agencies: ['doe'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
      ],
    },
    land: {
      title: 'Land & Permitting Agencies',
      desc: 'The agencies that hold the land, lead the review, and must concur for a project to proceed.',
      items: [
        { role: 'Lead agency', name: 'Bureau of Land Management (BLM)', who: 'Leads geothermal permitting on Federal land. Runs the Renewable Energy Coordination (RECO) offices.', leads: 'National & State RECO offices', agencies: ['blm'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Lead agency', name: 'Bureau of Reclamation (BuRec)', who: 'Leads or coordinates geothermal and related energy projects on Reclamation-managed lands and facilities in the West.', leads: 'Regional and area offices', agencies: ['bor'], jurisdictions: ['arizona', 'california', 'colorado', 'idaho', 'montana', 'nevada', 'new-mexico', 'oregon', 'texas', 'utah', 'washington', 'wyoming'] },
        { role: 'Lead agency', name: 'U.S. Forest Service', who: 'Lead or cooperating agency on National Forest System lands. Coordinates with BLM on split-estate and adjacent parcels.', leads: 'Regional offices & forest supervisors', agencies: ['usfs'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Consulted, species', name: 'U.S. Fish & Wildlife Service (USFWS)', who: 'Endangered Species Act Section 7 consultation. IPaC review system.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Consulted, history', name: 'SHPO / THPO', who: 'State and Tribal Historic Preservation Officers. NHPA Section 106 review. Tribes designate THPOs under Section 101(d)(2) through the NPS program; NATHPO describes roles and traditional cultural properties.[30,31]', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Subsurface, interior', name: 'DOI / USGS', who: 'Resource data, the National Geologic Map Database, and subsurface science.', leads: '', agencies: ['blm', 'bor', 'usfs'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
      ],
    },
    labs: {
      title: 'National Laboratories',
      desc: 'The labs that build the data, the models, and the AI tooling the field runs on.',
      items: [
        { role: 'PermitAI', name: 'Pacific Northwest National Laboratory (PNNL)', who: 'Builds the PermitAI / PermitAIX data and AI stack on the NEPATEC corpus.', leads: '', agencies: ['doe'], jurisdictions: ['idaho', 'oregon', 'washington'] },
        { role: 'Resource & timelines', name: 'Lawrence Berkeley National Laboratory (LBNL)', who: 'Permitting-timelines datasets and geothermal resource analysis.', leads: '', agencies: ['doe'], jurisdictions: ['california', 'nevada', 'oregon'] },
        { role: 'Tools & atlas', name: 'National Laboratory of the Rockies (NRL)', who: 'Geothermal data hub, the Energy Atlas, GETEM, and Tribal energy work.', leads: '', agencies: ['doe'], jurisdictions: ['colorado', 'montana', 'new-mexico', 'utah', 'wyoming'] },
        { role: 'EGS & FORGE', name: 'Idaho National Laboratory (INL)', who: 'Enhanced geothermal systems research. FORGE field site support.', leads: '', agencies: ['doe'], jurisdictions: ['idaho', 'nevada', 'utah'] },
      ],
    },
    state: {
      title: 'State & Regional',
      desc: 'The state offices and regional bodies where Federal modernization meets the ground.',
      items: [
        { role: 'State energy network', name: 'NASEO', who: 'National Association of State Energy Officials. Runs the 13-state Geothermal Power Accelerator.', leads: '', agencies: ['doe'], jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Permitting reference', name: 'OpenEI / RAPID Toolkit', who: 'Crowdsourced state-by-state permitting rules and regulatory references.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Resource states', name: 'Nevada, California, Utah, Oregon', who: 'The most geothermally active states. State energy offices and geological surveys.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: ['california', 'nevada', 'oregon', 'utah'] },
        { role: 'Emerging states', name: 'Texas, Montana, New York, Vermont', who: 'Closed-loop and next-wave geothermal interest, with active state engagement.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: ['montana', 'new-york', 'texas', 'vermont'] },
      ],
    },
    industry: {
      title: 'Industry & Community',
      desc: 'The developers, the workforce pipeline, and the communities the projects sit within.',
      items: [
        { role: 'Developers', name: 'Fervo, Ormat, Eavor, Sage, Cyrq', who: 'Geothermal developers spanning hydrothermal, EGS, and closed-loop approaches.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: ['california', 'nevada', 'new-mexico', 'oregon', 'texas', 'utah', 'wyoming'] },
        { role: 'Profession', name: 'Geothermal Rising', who: 'The main U.S. professional and community organization. Conferences and the working edge of the field.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Consulting', name: 'SWCA, ICF, Jacobs, Tetra Tech', who: 'Environmental and permitting consultancies that prepare much of the review record.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: PERMITTING_ALL_JURISDICTIONS },
        { role: 'Communities', name: 'Tribes & rural communities', who: 'Sovereign and local partners whose lands, consultation, and consent shape projects.', leads: '', agencies: PERMITTING_ALL_AGENCIES, jurisdictions: ['alaska', 'arizona', 'california', 'colorado', 'hawaii', 'idaho', 'montana', 'nevada', 'new-mexico', 'oregon', 'utah', 'washington', 'wyoming'] },
      ],
    },
  },
  disclaimer: 'Entities and roles compiled from public .gov, national laboratory, and organization pages.',
}
