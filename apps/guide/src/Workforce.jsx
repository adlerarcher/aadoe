import { useEffect, useRef, useState } from 'react'
import {
  SkillCrossover,
  WorkforcePipeline,
  ThreeLanes,
  RigCrossover,
  CredentialStack,
  WellControlPanel,
  ReviewStack,
  PermittingPath,
  CommunityNetwork,
  ConsortiumModel,
  ProgramHub,
  InternPipeline,
  GrantFlow,
} from './workforceVisuals.jsx'
import { WORKFORCE, WORKFORCE_PAGES, WORKFORCE_SECTIONS, PERMITTING_SECTIONS, HERO_IMAGES } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { SectionJumpNav, StickySubnav, useSectionSpy } from './SectionNav.jsx'
import { PermittingSubnav } from './Permitting.jsx'

const WORKFORCE_VISUALS = {
  skillCrossover: SkillCrossover,
  workforcePipeline: WorkforcePipeline,
  threeLanes: ThreeLanes,
  rigCrossover: RigCrossover,
  credentialStack: CredentialStack,
  wellControl: WellControlPanel,
  reviewStack: ReviewStack,
  permittingPath: PermittingPath,
  communityNetwork: CommunityNetwork,
  consortiumModel: ConsortiumModel,
  programHub: ProgramHub,
  internPipeline: InternPipeline,
  grantFlow: GrantFlow,
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true)
        obs.disconnect()
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, shown]
}

function HeroMosaic({ images }) {
  if (!images?.length) return null
  return (
    <>
      <div className="hero-mosaic absolute inset-0" aria-hidden="true">
        {images.slice(0, 6).map((src, i) => (
          <div key={i} className="hero-tile" style={{ '--hero-i': i }}>
            <img src={src} alt="" loading="eager" decoding="async" />
          </div>
        ))}
      </div>
      <div className="hero-vignette absolute inset-0" aria-hidden="true" />
    </>
  )
}

function Visual({ kind }) {
  if (!kind) return null
  const Comp = WORKFORCE_VISUALS[kind]
  if (!Comp) return null
  return (
    <div className="editorial-panel relative aspect-[4/3] w-full overflow-hidden">
      <Comp />
    </div>
  )
}

export function WorkforceSubnav({ section }) {
  return (
    <nav className="permitting-subnav" aria-label="Workforce sections">
      {WORKFORCE_SECTIONS.map(s => (
        <Link
          key={s.id}
          to={s.to}
          className={`permitting-subnav-link${section === s.id ? ' permitting-subnav-link-active' : ''}`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  )
}

function WorkforceStat({ value, label, note, cite }) {
  return (
    <div className="workforce-stat editorial-panel">
      <div className="workforce-stat-value font-display text-[2.5rem] font-light leading-none tracking-tight text-[#ff8a3c] md:text-[3rem]">
        {value}
      </div>
      <div className="mt-2 font-body text-sm font-medium text-[var(--ink)]">{label}</div>
      <div className="mt-1 font-body text-xs leading-relaxed text-[var(--ink)]/50">
        {note}
        {cite?.length > 0 && (
          <span className="ml-1">
            {cite.map(num => (
              <Link key={num} to={`/citations#${num}`} className="cite-ref text-[0.85em]">
                [{num}]
              </Link>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}

function SectionLinks({ links }) {
  if (!links?.length) return null
  return (
    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
      {links.map(link => (
        link.url
          ? (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff8a3c] hover:text-[#ffb347]"
            >
              {link.label} ↗
            </a>
          )
          : (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff8a3c] hover:text-[#ffb347]"
            >
              {link.label} →
            </Link>
          )
      ))}
    </div>
  )
}

function WorkforceSection({ section, index }) {
  const [ref, shown] = useReveal()
  const hasVisual = !!section.visual
  const flip = index % 2 === 1

  return (
    <section
      ref={ref}
      id={section.id}
      className={`editorial-section relative scroll-mt-36 py-14 md:py-20${index > 0 ? ' border-t border-white/[0.06]' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid grid-cols-1 items-start gap-12 ${hasVisual ? 'md:grid-cols-2 md:items-center' : ''}`}>
          <div className={`${flip && hasVisual ? 'md:order-2' : ''} ${shown ? 'animate-rise' : 'opacity-0'}`}>
            {section.depth && (
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs tracking-[0.25em] text-[#ff8a3c]">{section.depth}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#ff6a1f]/60 to-transparent" />
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
              </div>
            )}
            <div className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#ffb347]/80">{section.kicker}</div>
            <h2 className="mt-3 font-display text-[2.2rem] font-light leading-[0.98] tracking-tight text-[var(--ink)] md:text-5xl editorial-display">
              {section.title}
            </h2>
            <div className="prose-editorial mt-7 max-w-prose space-y-5 font-body text-[1.02rem] text-[var(--ink)]/78 md:text-lg">
              {section.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
            </div>
            {section.bullets?.length > 0 && (
              <ul className="mt-7 max-w-prose space-y-2.5 pl-5 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/74 md:text-[1.02rem] [list-style:disc] marker:text-[#ff8a3c]/70">
                {section.bullets.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.aside && (
              <aside className="editorial-pullquote mt-9 max-w-prose">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ff8a3c]">{section.aside.label}</div>
                <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/70 md:text-[0.95rem] italic">{section.aside.text}</p>
              </aside>
            )}
            {section.signals?.length > 0 && (
              <ul className="workforce-lane-signals mt-8 max-w-prose">
                {section.signals.map(signal => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            )}
            <SectionLinks links={section.relatedLinks} />
          </div>
          {hasVisual && (
            <div className={`${flip ? 'md:order-1' : ''} ${shown ? 'animate-rise' : 'opacity-0'}`} style={{ animationDelay: '120ms' }}>
              <Visual kind={section.visual} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkforceProgramCard({ name, url, category, note, featured, cite }) {
  return (
    <div className={`workforce-program editorial-panel editorial-shimmer group ${featured ? 'workforce-program--featured' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[1.02rem] font-medium leading-snug text-[var(--ink)] group-hover:text-[#ffce8a] md:text-[1.05rem]"
        >
          <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#ffb347]/80">{category}</div>
          <div className="mt-1.5">{name}</div>
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[var(--ink)]/30 transition-colors group-hover:text-[#ff8a3c]"
          aria-hidden="true"
        >
          ↗
        </a>
      </div>
      {cite?.length > 0 && (
        <div className="toolbox-card-cites mt-1.5 flex flex-wrap gap-x-1 gap-y-0.5">
          {cite.map(num => (
            <Link
              key={num}
              to={`/citations#${num}`}
              className="cite-ref text-[0.72rem]"
              aria-label={`Reference ${num}`}
            >
              [{num}]
            </Link>
          ))}
        </div>
      )}
      <p className="mt-3 font-body text-sm leading-relaxed text-[var(--ink)]/62">{note}</p>
    </div>
  )
}

function HgeoCatalogItem({ item }) {
  return (
    <div className="workforce-hgeo-item editorial-panel p-4">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-[0.98rem] font-medium leading-snug text-[var(--ink)] hover:text-[#ffce8a]"
      >
        {item.name}
      </a>
      {item.cite?.length > 0 && (
        <div className="toolbox-card-cites mt-1 flex flex-wrap gap-x-1">
          {item.cite.map(num => (
            <Link key={num} to={`/citations#${num}`} className="cite-ref text-[0.72rem]" aria-label={`Reference ${num}`}>
              [{num}]
            </Link>
          ))}
        </div>
      )}
      <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/62">{item.note}</p>
    </div>
  )
}

function ProgramsDirectory() {
  const catalog = WORKFORCE.hgeoCatalog
  const [ref, shown] = useReveal(0.08)
  const [filter, setFilter] = useState('All')
  const filteredPrograms = filter === 'All'
    ? WORKFORCE.programs
    : WORKFORCE.programs.filter(p => p.category === filter)

  return (
    <section
      ref={ref}
      className={`editorial-section border-t border-white/[0.06] py-20 md:py-28 ${shown ? 'animate-rise' : 'opacity-0'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="workforce-hgeo-catalog">
          <h2 className="font-display text-[1.85rem] font-light text-[var(--ink)] md:text-[2.125rem]">{catalog.heading}</h2>
          <p className="prose-editorial mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">
            <ProseP>{catalog.intro}</ProseP>
          </p>
          <div className="mt-6">
            <a
              href={catalog.hub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-[#ff8a3c] hover:text-[#ffb347]"
            >
              {catalog.hub.label} ↗
            </a>
            {catalog.hub.cite?.map(num => (
              <Link key={num} to={`/citations#${num}`} className="cite-ref ml-1 text-[0.72rem]">
                [{num}]
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {catalog.factSheets.map(sheet => (
              <div key={sheet.url} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a
                  href={sheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ink)]/55 hover:text-[#ff8a3c]"
                >
                  {sheet.label} ↗
                </a>
                {sheet.cite?.map(num => (
                  <Link key={num} to={`/citations#${num}`} className="cite-ref text-[0.72rem]" aria-label={`Reference ${num}`}>
                    [{num}]
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-10">
            {catalog.groups.map(group => (
              <div key={group.title}>
                <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#ff8a3c]">{group.title}</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {group.items.map(item => (
                    <HgeoCatalogItem key={item.url} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-16 font-display text-[1.65rem] font-light text-[var(--ink)] md:text-[1.85rem]">Broader directory</h2>
        <p className="prose-editorial mt-3 max-w-[760px] font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/62">
          Trade organizations, state networks, college programs, and additional federal links beyond the HGEO hub.
        </p>

        <div className="workforce-filters mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter programs">
          {WORKFORCE.programCategories.map(cat => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={`workforce-filter${filter === cat ? ' workforce-filter-active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="workforce-program-grid mt-8 grid gap-4 md:grid-cols-2">
          {filteredPrograms.map((prog, i) => (
            <WorkforceProgramCard key={`${prog.name}-${i}`} {...prog} />
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <p className="mt-8 font-body text-[var(--ink)]/55">No programs in this category yet.</p>
        )}

        <p className="mt-10 max-w-[760px] font-body text-sm leading-relaxed text-[var(--ink)]/48">{WORKFORCE.coda}</p>
      </div>
    </section>
  )
}

function OverviewFooter() {
  const [ref, shown] = useReveal(0.1)
  return (
    <section
      ref={ref}
      className={`editorial-section border-t border-white/[0.06] py-16 md:py-20 ${shown ? 'animate-rise' : 'opacity-0'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#ff8a3c]">On this site</div>
        <div className="utes-links mt-6">
          {WORKFORCE.related.map(link => (
            <Link key={link.to} to={link.to} className="utes-link editorial-panel">
              <span className="utes-link-label">{link.label}</span>
              <span className="utes-link-note">{link.note}</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-[760px] font-body text-sm leading-relaxed text-[var(--ink)]/48">{WORKFORCE.coda}</p>
      </div>
    </section>
  )
}

export default function Workforce({ section = 'overview' }) {
  const page = WORKFORCE_PAGES[section]
  const underPermitting = section === 'permitting'
  const navSections = underPermitting ? PERMITTING_SECTIONS : WORKFORCE_SECTIONS
  const navId = underPermitting ? 'workforce' : section
  const sectionIdx = navSections.findIndex(s => s.id === navId)
  const prev = sectionIdx > 0 ? navSections[sectionIdx - 1] : null
  const next = sectionIdx >= 0 && sectionIdx < navSections.length - 1 ? navSections[sectionIdx + 1] : null
  const jumpItems = page?.sections?.map(s => ({
    id: s.id,
    label: s.navLabel || s.title,
  })) ?? []
  const activeSectionId = useSectionSpy(jumpItems.map(item => item.id))

  if (!page) return null

  return (
    <main className="workforce-page primer-topic-page">
      <header className="primer-page-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.workforce} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{page.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
          </h1>
          {page.lede && (
            <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">
              {page.lede}
            </p>
          )}
          {section === 'overview' && (
            <div className="workforce-stats mt-10 grid gap-4 sm:grid-cols-3">
              {WORKFORCE.stats.map(stat => (
                <WorkforceStat key={stat.label} {...stat} />
              ))}
            </div>
          )}
          {underPermitting
            ? <PermittingSubnav section="workforce" />
            : <WorkforceSubnav section={section} />}
        </div>
      </header>

      {jumpItems.length >= 2 && (
        <StickySubnav>
          <div className="mx-auto max-w-[1100px] px-6">
            <SectionJumpNav items={jumpItems} activeId={activeSectionId} />
          </div>
        </StickySubnav>
      )}

      {page.sections.map((s, index) => (
        <WorkforceSection key={s.id} section={s} index={index} />
      ))}

      {section === 'programs' && <ProgramsDirectory />}
      {section === 'overview' && <OverviewFooter />}

      <div className="px-6 pb-28">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
          {prev
            ? <Link to={prev.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← {prev.label}</Link>
            : <span />}
          {next
            ? <Link to={next.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">{next.label} →</Link>
            : <span />}
        </div>
      </div>
    </main>
  )
}
