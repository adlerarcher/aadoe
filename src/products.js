/**
 * Hub entries. Three primary boxes:
 * 1. SEPI = permitting database (Subsurface Energy Permitting Index)
 * 2. GPCP = coordination dashboard (Geothermal Permitting Coordination Platform)
 * 3. Research and translation = Field guide (/guide/) and Hackathons (/gpic/)
 *
 * Each box links to that product's landing page. Nested apps are same-origin.
 */

export const PRODUCTS = [
  {
    id: 'sepi',
    code: '01 · Database',
    name: 'SEPI',
    fullName: 'Subsurface Energy Permitting Index',
    mark: 'SEPI',
    href: '/sepi/',
    enterLabel: 'Open',
    blurb:
      'The permitting database. DOE index of the federal and state systems that hold subsurface energy authorizations: a lease serial, a well, a water right, a consultation, each in its home agency.',
  },
  {
    id: 'gpcp',
    code: '02 · Dashboard',
    name: 'GPCP',
    fullName: 'Geothermal Permitting Coordination Platform',
    mark: 'GPCP',
    href: '/gpcp/',
    enterLabel: 'Open',
    blurb:
      'The coordination dashboard. For a specified geothermal project: applicable reviews, the responsible agency for each, the dependencies among them, and an estimated duration of the sequence. Built on the SEPI index.',
  },
  {
    id: 'research',
    code: '03 · Research',
    name: 'Research and translation',
    fullName: 'Field guide and hackathons',
    blurb:
      'The field guide for people doing the work. Hackathons in partnership with CEQ PIC and Pacific Northwest National Laboratory.',
    links: [
      {
        id: 'guide',
        label: 'Field guide',
        hint: 'Open',
        href: '/guide/',
      },
      {
        id: 'hackathons',
        label: 'Hackathons',
        hint: 'Open',
        href: '/gpic/',
      },
    ],
  },
]
