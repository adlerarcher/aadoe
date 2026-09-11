import { useCallback, useEffect, useRef, useState } from 'react'
import {
  PRIMERS_SECTIONS,
  PRODUCTION_NAV_SECTIONS,
  HELPFUL_LINKS_SECTION,
  HERO_IMAGES,
  TOOLBOX,
  toolboxGroupAnchor,
} from './content.jsx'
import { Link } from './router.jsx'
import { CitationsSection } from './Citations.jsx'

const GROUP_SHORT_LABELS = {
  Portals: 'Portals',
  'Data Sources': 'Data',
  'Regional \u2014 Great Basin & Nevada': 'Regional',
  'Modeling Tools': 'Modeling',
  'Guides, Reports & Protocols': 'Guides',
}

function useReveal(threshold = 0.12) {
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

export function PrimersSubnav({ section }) {
  return (
    <nav className="toolbox-subnav" aria-label="Overview sections">
      {PRIMERS_SECTIONS.map(s => (
        <Link
          key={s.id}
          to={s.to}
          className={`toolbox-subnav-link${section === s.id ? ' toolbox-subnav-link-active' : ''}`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  )
}

export function HelpfulLinksSubnav({ openGroups, onJump }) {
  return (
    <nav className="toolbox-subnav" aria-label="Link categories">
      {TOOLBOX.map(group => {
        const id = toolboxGroupAnchor(group.group)
        const label = GROUP_SHORT_LABELS[group.group] || group.group
        return (
          <button
            key={id}
            type="button"
            className={`toolbox-subnav-link${openGroups.has(id) ? ' toolbox-subnav-link-active' : ''}`}
            onClick={() => onJump(id)}
          >
            {label}
          </button>
        )
      })}
      <button
        type="button"
        className={`toolbox-subnav-link${openGroups.has('references') ? ' toolbox-subnav-link-active' : ''}`}
        onClick={() => onJump('references')}
      >
        References
      </button>
    </nav>
  )
}

export function ProductionSubnav({ section }) {
  return (
    <nav className="toolbox-subnav" aria-label="Production sections">
      {PRODUCTION_NAV_SECTIONS.map(s => (
        <Link
          key={s.id}
          to={s.to}
          className={`toolbox-subnav-link${section === s.id ? ' toolbox-subnav-link-active' : ''}`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  )
}

/** @deprecated use ProductionSubnav */
export const TechnologySubnav = ProductionSubnav

/** @deprecated use PrimersSubnav */
export const ToolboxSubnav = PrimersSubnav

function ToolboxPageHero({ section }) {
  const meta = section === 'portals'
    ? HELPFUL_LINKS_SECTION
    : PRIMERS_SECTIONS.find(s => s.id === section) || PRIMERS_SECTIONS[0]
  const lede = meta.lede

  return (
    <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
      <HeroMosaic images={HERO_IMAGES.toolbox} />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="editorial-kicker">{meta.kicker}</div>
        <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
          {meta.titleLead} <span className="italic text-[#ff7a2e]">{meta.titleEmphasis}</span>
        </h1>
        {lede && (
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{lede}</p>
        )}
        {section !== 'portals' && <PrimersSubnav section={section} />}
      </div>
    </header>
  )
}

function ToolboxResourceCard({ name, url, framing, cite }) {
  return (
    <div className="toolbox-card editorial-panel editorial-shimmer group p-5 transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-medium text-[var(--ink)] group-hover:text-[#ffce8a]"
        >
          {name}
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
      <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/60">{framing}</p>
    </div>
  )
}

function ToolboxPager({ section }) {
  const idx = PRIMERS_SECTIONS.findIndex(s => s.id === section)
  const prev = idx > 0 ? PRIMERS_SECTIONS[idx - 1] : null
  const next = idx < PRIMERS_SECTIONS.length - 1 ? PRIMERS_SECTIONS[idx + 1] : null
  if (!prev && !next) return null
  return (
    <div className="toolbox-pager mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
      {prev
        ? <Link to={prev.to} className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← {prev.label}</Link>
        : <span />}
      {next
        ? <Link to={next.to} className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">{next.label} →</Link>
        : <span />}
    </div>
  )
}

export function ToolboxResourceGroup({ group, isFirst = false }) {
  return (
    <div
      id={toolboxGroupAnchor(group.group)}
      className={isFirst ? '' : 'mt-14 scroll-mt-28 border-t border-white/[0.06] pt-12 md:mt-16 md:pt-14'}
    >
      <h2 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">{group.group}</h2>
      <p className="prose-editorial mt-3 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{group.blurb}</p>
      <div className="toolbox-count mt-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">
        {group.items.length} resources
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {group.items.map((it, i) => (
          <ToolboxResourceCard key={`${it.name}-${it.url}-${i}`} {...it} />
        ))}
      </div>
    </div>
  )
}

function CollapsibleToolboxGroup({ group, open, onToggle }) {
  const id = toolboxGroupAnchor(group.group)
  return (
    <div id={id} className="toolbox-accordion scroll-mt-32">
      <button
        type="button"
        className={`toolbox-accordion-trigger editorial-panel${open ? ' toolbox-accordion-trigger-open' : ''}`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        <div className="toolbox-accordion-heading">
          <h2 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">{group.group}</h2>
          <p className="toolbox-accordion-blurb mt-2 max-w-[760px] font-body text-sm leading-relaxed text-[var(--ink)]/62">{group.blurb}</p>
          <div className="toolbox-accordion-meta mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">
            {group.items.length} links
          </div>
        </div>
        <span className="toolbox-accordion-caret" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id={`${id}-panel`} className="toolbox-accordion-panel">
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {group.items.map((it, i) => (
              <ToolboxResourceCard key={`${it.name}-${it.url}-${i}`} {...it} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CollapsibleReferences({ open, onToggle }) {
  return (
    <div id="references" className="toolbox-accordion scroll-mt-32">
      <button
        type="button"
        className={`toolbox-accordion-trigger editorial-panel${open ? ' toolbox-accordion-trigger-open' : ''}`}
        aria-expanded={open}
        aria-controls="references-panel"
        onClick={onToggle}
      >
        <div className="toolbox-accordion-heading">
          <h2 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">References</h2>
          <p className="toolbox-accordion-blurb mt-2 max-w-[760px] font-body text-sm leading-relaxed text-[var(--ink)]/62">
            Numbered sources cited in site prose. Superscript links in body text point here.
          </p>
        </div>
        <span className="toolbox-accordion-caret" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id="references-panel" className="toolbox-accordion-panel">
          <CitationsSection embedded />
        </div>
      )}
    </div>
  )
}

function HelpfulLinksBody({ shown, refProp }) {
  const defaultOpen = toolboxGroupAnchor(TOOLBOX[0].group)
  const [openGroups, setOpenGroups] = useState(() => new Set([defaultOpen]))

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    setOpenGroups(prev => new Set([...prev, hash]))
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const jumpTo = useCallback((id) => {
    setOpenGroups(prev => new Set([...prev, id]))
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const toggleGroup = useCallback((id) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <>
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.toolbox} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{HELPFUL_LINKS_SECTION.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {HELPFUL_LINKS_SECTION.titleLead}{' '}
            <span className="italic text-[#ff7a2e]">{HELPFUL_LINKS_SECTION.titleEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">
            {HELPFUL_LINKS_SECTION.lede}
          </p>
          <HelpfulLinksSubnav openGroups={openGroups} onJump={jumpTo} />
        </div>
      </header>

      <main className="toolbox-page px-6 pb-24">
        <section
          ref={refProp}
          className={`mx-auto max-w-[1100px] toolbox-section editorial-section py-10 md:py-14 ${shown ? 'animate-rise' : 'opacity-0'}`}
        >
          <div className="space-y-4">
            {TOOLBOX.map(group => {
              const id = toolboxGroupAnchor(group.group)
              return (
                <CollapsibleToolboxGroup
                  key={id}
                  group={group}
                  open={openGroups.has(id)}
                  onToggle={() => toggleGroup(id)}
                />
              )
            })}
            <CollapsibleReferences
              open={openGroups.has('references')}
              onToggle={() => toggleGroup('references')}
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default function Toolbox({ section = 'portals' }) {
  const [ref, shown] = useReveal(0.1)

  if (section === 'portals') {
    return <HelpfulLinksBody shown={shown} refProp={ref} />
  }

  return (
    <>
      <ToolboxPageHero section={section} />
      <main className="toolbox-page px-6 pb-24">
        <div className="mx-auto max-w-[1100px]">
          <ToolboxPager section={section} />
        </div>
      </main>
    </>
  )
}
