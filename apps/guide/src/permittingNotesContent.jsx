export const PERMITTING_NOTES = [
  {
    slug: 'permitai',
    kicker: 'PermitAI',
    title: 'Document support tools and expert review',
    body: [
      'PermitAI at PNNL applies search and drafting support to NEPA records. Agency staff and consultants remain responsible for review decisions.',
    ],
    guideLink: { label: 'Permitting guide: Opportunity', to: '/permitting/opportunity' },
    link: { label: 'PermitAI at PNNL', url: 'https://www.pnnl.gov/projects/permitai' },
  },
  {
    slug: 'nepa',
    kicker: 'NEPA',
    title: 'EA and EIS timelines',
    body: [
      'EA and EIS preparation often runs longer than scoping or consultation phases. Document tools may shorten assembly time; published project schedules will show whether that shows up in total duration.',
    ],
    guideLink: { label: 'Permitting guide: Problem', to: '/permitting/problem' },
    link: { label: 'Related note: PermitAI', to: '/permitting/notes/permitai' },
  },
  {
    slug: 'ceq',
    kicker: 'CEQ',
    title: 'The shared NEPA rulebook is gone',
    body: [
      'CEQ rescinded the government-wide NEPA implementing regulations, effective January 8, 2026. The statute stands; agencies are updating their own procedures.',
    ],
    guideLink: { label: 'Permitting guide: Problem', to: '/permitting/problem' },
    link: { label: 'CEQ final rule (Federal Register)', url: 'https://www.federalregister.gov/documents/2026/01/08/2026-00178/removal-of-national-environmental-policy-act-implementing-regulations' },
  },
  {
    slug: 'permitting-council',
    kicker: 'Permitting Council',
    title: 'Federal permitting leadership under FAST-41',
    body: [
      'The Federal Permitting Council leads cross-agency permitting improvement under FAST-41. The Permitting Dashboard tracks covered projects and published timetables.',
    ],
    guideLink: { label: 'Permitting guide: Opportunity', to: '/permitting/opportunity' },
    link: { label: 'Permitting Dashboard', url: 'https://www.permitting.gov/' },
  },
  {
    slug: 'section-106',
    kicker: 'Section 106',
    title: 'Historic preservation alongside NEPA',
    body: [
      'Section 106 runs in parallel with environmental review. A federal permit can trigger consultation before construction starts. Early SHPO or THPO contact keeps the Section 106 record aligned with the NEPA schedule.',
      'On Tribal lands, consultation runs through the Tribal Historic Preservation Officer when a Tribe has assumed SHPO functions. See the THPO note for designation, traditional cultural properties, and NPS program links.',
    ],
    guideLink: { label: 'Permitting guide: People', to: '/permitting/people' },
    links: [
      { label: 'Section 106 (USACE New England)', url: 'https://www.nae.usace.army.mil/Missions/Regulatory/National-Historic-Preservation-Act/' },
      { label: 'Permitting note: THPO', to: '/permitting/notes/thpo' },
    ],
  },
  {
    slug: 'thpo',
    kicker: 'THPO',
    title: 'Tribal Historic Preservation Officers',
    body: [
      'Federally recognized Tribes may designate a Tribal Historic Preservation Officer under NHPA Section 101(d)(2). Before assuming State Historic Preservation Officer functions on Tribal lands, a Tribe submits a formal plan to the National Park Service describing how preservation work will run.[31]',
      'Tribal preservation plans typically emphasize oral tradition, consultation with elders and spiritual leaders, and protection of traditional cultural properties: places tied to community history and ongoing cultural practice that may qualify for the National Register. Review of federal undertakings and archaeological survey work are core THPO responsibilities.[31]',
      'Geothermal projects in the West often overlap Tribal lands or areas of Tribal interest. On Tribal land, the THPO holds NHPA Section 106 authority and advises federal, state, and local agencies on managing Tribal historic properties. Early THPO contact keeps the Section 106 record aligned with the NEPA schedule.',
      'The National Park Service Tribal Historic Preservation Program funds designated THPOs through Historic Preservation Fund formula grants and competitive Tribal Heritage Grants, and hosts a directory to find existing offices.[30] NATHPO represents Tribal historic preservation officers nationally.',
    ],
    guideLink: { label: 'Permitting guide: People', to: '/permitting/people' },
    links: [
      { label: 'What is a THPO? (NATHPO)', url: 'https://www.nathpo.org/what-is-a-thpo/' },
      { label: 'NPS Tribal Historic Preservation Office Program', url: 'https://www.nps.gov/subjects/historicpreservationfund/tribal-historic-preservation-office-program.htm' },
    ],
  },
]

export function getPermittingNote(slug) {
  const resolved = slug === 'nhpa-section-106' ? 'section-106' : slug
  return PERMITTING_NOTES.find(e => e.slug === resolved)
}

export function permittingNotePath(entryOrSlug) {
  const slug = typeof entryOrSlug === 'string' ? entryOrSlug : entryOrSlug.slug
  return `/permitting/notes/${slug}`
}

export const PERMITTING_NOTES_ANCHOR = '/permitting/people#permitting-notes'
