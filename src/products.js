/**
 * Hub entries.
 *
 * SEPI = permitting database (Subsurface Energy Permitting Index)
 * GPCP = coordination dashboard (Geothermal Permitting Coordination Platform)
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
    host: 'sepi.thermalunderground.org',
    base: 'https://sepi.thermalunderground.org/records/',
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
    host: 'gpcp.thermalunderground.org',
    base: 'https://gpcp.thermalunderground.org/gpcp/',
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
    href: 'https://thermalunderground.org/',
    note: 'thermalunderground.org',
  },
  {
    id: 'gpic',
    label: 'GPIC',
    mark: 'GPIC',
    href: 'https://gpic.thermalunderground.org/',
    note: 'Programs · community · resources',
  },
  {
    id: 'odev',
    label: 'Organization Development',
    mark: 'ODEV',
    href: 'https://odev.thermalunderground.org/',
    note: 'Cycle · model · groups',
  },
  {
    id: 'mdev',
    label: 'Market Development',
    mark: 'MDEV',
    href: 'https://mdev.thermalunderground.org/',
    note: 'Country markets · deals · policy',
  },
]

/** Build deep-link with both role= (hub contract) and as= (current target support). */
export function entryUrl(product, role) {
  const url = new URL(product.base)
  url.searchParams.set('role', role.role)
  url.searchParams.set('as', role.as)
  return url.toString()
}
