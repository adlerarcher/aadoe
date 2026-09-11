/**
 * Hub entries.
 *
 * SEPI = permitting database (Subsurface Energy Permitting Index)
 * GPCP = coordination dashboard (Geothermal Permitting Coordination Platform)
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
    blurb: 'Permitting database. Enter as system user or system owner.',
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
    blurb: 'Coordination dashboard. Enter as applicant or reviewer.',
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
]

export const SECONDARY = [
  {
    id: 'guide',
    label: 'Field guide',
    mark: 'TU',
    href: '/guide/',
    note: '/guide/',
  },
  {
    id: 'gpic',
    label: 'GPIC',
    mark: 'GPIC',
    href: '/gpic/',
    note: 'Programs · community · resources',
  },
  {
    id: 'odev',
    label: 'Organization Development',
    mark: 'ODEV',
    href: '/odev/',
    note: 'Cycle · model · groups',
  },
  {
    id: 'mdev',
    label: 'Market Development',
    mark: 'MDEV',
    href: '/mdev/',
    note: 'Country markets · deals · policy',
  },
]

/** Build deep-link with both role= (hub contract) and as= (current target support). */
export function entryUrl(product, role) {
  const url = new URL(product.base, 'https://aadoe.thermalunderground.org')
  url.searchParams.set('role', role.role)
  url.searchParams.set('as', role.as)
  return `${url.pathname}${url.search}`
}
