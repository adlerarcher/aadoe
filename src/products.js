/**
 * Hub entries. Three primary boxes:
 * 1. SEPI = permitting database (Subsurface Energy Permitting Index)
 * 2. GPCP = coordination dashboard (Geothermal Permitting Coordination Platform)
 * 3. Research and translation = Field guide (/guide/) and Hackathons (/gpic/)
 *
 * All apps are nested same-origin under this site (aadoe).
 *
 * Role query params:
 * - SEPI reads `?as=user|admin` (session-user.js).
 *   Hub labels: System user → as=user; System owner → as=admin.
 *   Also passes `?role=user|owner` for future SEPI support of "owner" naming.
 * - GPCP reads `?as=applicant|reviewer`.
 *   Also passes `?role=applicant|reviewer`.
 */

export const PRODUCTS = [
  {
    id: 'sepi',
    code: '01 · Database',
    name: 'SEPI',
    fullName: 'Subsurface Energy Permitting Index',
    mark: 'SEPI',
    path: '/sepi/',
    base: '/sepi/records/',
    blurb:
      'The permitting database. DOE index of the federal and state systems that hold subsurface energy authorizations: a lease serial, a well, a water right, a consultation, each in its home agency. System user or system owner.',
    roles: [
      {
        id: 'user',
        label: 'System user',
        role: 'user',
        as: 'user',
      },
      {
        id: 'owner',
        label: 'System owner',
        role: 'owner',
        as: 'admin',
      },
    ],
  },
  {
    id: 'gpcp',
    code: '02 · Dashboard',
    name: 'GPCP',
    fullName: 'Geothermal Permitting Coordination Platform',
    mark: 'GPCP',
    path: '/gpcp/',
    base: '/gpcp/gpcp/',
    blurb:
      'The coordination dashboard. For a specified geothermal project: applicable reviews, the responsible agency for each, the dependencies among them, and an estimated duration of the sequence. Built on the SEPI index. Applicant or reviewer.',
    roles: [
      {
        id: 'applicant',
        label: 'Applicant',
        role: 'applicant',
        as: 'applicant',
      },
      {
        id: 'reviewer',
        label: 'Reviewer',
        role: 'reviewer',
        as: 'reviewer',
      },
    ],
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
        hint: 'CEQ PIC · PNNL',
        href: '/gpic/',
      },
    ],
  },
]

/** Build deep-link with both role= (hub contract) and as= (current target support). */
export function entryUrl(product, role) {
  const url = new URL(product.base, 'https://aadoe.thermalunderground.org')
  url.searchParams.set('role', role.role)
  url.searchParams.set('as', role.as)
  return `${url.pathname}${url.search}`
}
