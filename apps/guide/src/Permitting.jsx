import { useEffect, useRef, useState } from 'react'
import { PERMITTING, PERMITTING_SECTIONS, PERMITTING_NOTES, PERMITTING_LEAD_AGENCIES, PERMITTING_JURISDICTIONS, permittingNotePath } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'

export function PermittingSubnav({ section }) {
  return (
    <nav className="permitting-subnav" aria-label="Permitting sections">
      {PERMITTING_SECTIONS.map(s => (
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

const HANDOFFS = [
  { x1: 550, y1: 280, x2: 340, y2: 170, delay: 0.1 },
  { x1: 550, y1: 280, x2: 340, y2: 390, delay: 0.25 },
  { x1: 550, y1: 280, x2: 770, y2: 170, delay: 0.4 },
  { x1: 550, y1: 280, x2: 770, y2: 390, delay: 0.55 },
  { x1: 550, y1: 280, x2: 550, y2: 110, delay: 0.7 },
  { x1: 550, y1: 280, x2: 550, y2: 470, delay: 0.85 },
  { x1: 814, y1: 170, x2: 922, y2: 120, delay: 1.1, minor: true },
]

const CONSULTS = [
  { x1: 340, y1: 170, x2: 180, y2: 100, delay: 1.0 },
  { x1: 340, y1: 170, x2: 160, y2: 240, delay: 1.15 },
]

function HandoffLine({ x1, y1, x2, y2, active, delay, minor }) {
  const len = Math.hypot(x2 - x1, y2 - y1)
  const path = `M${x1},${y1} L${x2},${y2}`
  return (
    <g className={minor ? 'permitting-line-minor' : undefined}>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={`permitting-handoff-line${active ? ' permitting-handoff-line-active' : ''}`}
        style={{
          '--line-len': len,
          '--line-delay': `${delay}s`,
        }}
        markerEnd={minor ? undefined : 'url(#permitting-arrow)'}
      />
      {active && (
        <>
          <circle r={minor ? 2 : 3.5} className="permitting-packet permitting-packet-a">
            <animateMotion dur={minor ? '3.6s' : '2.6s'} repeatCount="indefinite" begin={`${delay + 0.4}s`} path={path} />
          </circle>
          <circle r={minor ? 1.5 : 2.5} className="permitting-packet permitting-packet-b">
            <animateMotion dur={minor ? '3.6s' : '2.6s'} repeatCount="indefinite" begin={`${delay + 1.7}s`} path={path} />
          </circle>
        </>
      )}
    </g>
  )
}

function ConsultLine({ x1, y1, x2, y2, active, delay }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      className={`permitting-consult-line${active ? ' permitting-consult-line-active' : ''}`}
      style={{ '--line-delay': `${delay}s` }}
    />
  )
}

function RelayNode({ cx, cy, r, stroke, hub, primary, delay, lines }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <g
        className={`permitting-relay-node${hub ? ' permitting-relay-hub' : ''}${primary ? ' permitting-relay-primary' : ''}`}
        style={{ '--node-delay': `${delay}s` }}
      >
        {hub && <circle r={r + 14} className="permitting-hub-glow" />}
        {hub && <circle r={r + 6} className="permitting-hub-ring" />}
        <circle r={r} className="permitting-node-body" stroke={stroke} strokeWidth={hub ? 1.5 : primary ? 1.3 : 1.2} />
        {lines.map((line, i) => (
          <text
            key={i}
            y={line.y}
            textAnchor="middle"
            fill={line.dim ? '#7E7468' : '#EAE3D9'}
            fontSize={line.size}
          >
            {line.text}
          </text>
        ))}
      </g>
    </g>
  )
}

function RelayMap({ active }) {
  return (
    <svg viewBox="0 0 1100 560" xmlns="http://www.w3.org/2000/svg" className={`permitting-relay-svg${active ? ' permitting-relay-svg-active' : ''}`} fontFamily="Georgia, serif">
      <defs>
        <marker id="permitting-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L7,3 L0,6 Z" fill="#7E7468" />
        </marker>
        <radialGradient id="permitting-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7B2E" stopOpacity="0.14" />
          <stop offset="55%" stopColor="#FF7B2E" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#FF7B2E" stopOpacity="0" />
        </radialGradient>
        <filter id="permitting-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="550" cy="280" r="220" fill="url(#permitting-ambient)" className="permitting-ambient" />

      <g className="permitting-lines-layer">
        {HANDOFFS.map((h, i) => (
          <HandoffLine key={i} {...h} active={active} />
        ))}
        {CONSULTS.map((c, i) => (
          <ConsultLine key={i} {...c} active={active} />
        ))}
      </g>

      <RelayNode cx={550} cy={280} r={56} stroke="#FF7B2E" hub delay={0.2} lines={[
        { text: 'DOE Office', y: -6, size: 15 },
        { text: 'of Geothermal', y: 13, size: 15 },
      ]} />
      <RelayNode cx={340} cy={170} r={44} stroke="#C85A1E" primary delay={0.35} lines={[
        { text: 'BLM', y: -4, size: 14 },
        { text: 'lead agency', y: 13, size: 10, dim: true },
      ]} />
      <RelayNode cx={160} cy={100} r={36} stroke="#3A322B" delay={0.9} lines={[
        { text: 'USFWS', y: -2, size: 12 },
        { text: 'ESA §7', y: 16, size: 9, dim: true },
      ]} />
      <RelayNode cx={140} cy={240} r={36} stroke="#3A322B" delay={1.05} lines={[
        { text: 'SHPO/THPO', y: -2, size: 11 },
        { text: '§106', y: 16, size: 9, dim: true },
      ]} />
      <RelayNode cx={340} cy={390} r={44} stroke="#C85A1E" primary delay={0.5} lines={[
        { text: 'CEQ', y: -4, size: 13 },
        { text: 'NEPA rules', y: 13, size: 10, dim: true },
      ]} />
      <RelayNode cx={550} cy={110} r={40} stroke="#C85A1E" primary delay={0.65} lines={[
        { text: 'DOE Office', y: -4, size: 12 },
        { text: 'of Policy', y: 12, size: 12 },
      ]} />
      <RelayNode cx={550} cy={470} r={40} stroke="#3A322B" delay={0.8} lines={[
        { text: 'Permitting Council', y: -4, size: 11 },
        { text: 'permitting leadership', y: 13, size: 9, dim: true },
      ]} />
      <RelayNode cx={770} cy={170} r={44} stroke="#C85A1E" primary delay={0.45} lines={[
        { text: 'PNNL', y: -4, size: 13 },
        { text: 'PermitAI', y: 13, size: 10, dim: true },
      ]} />
      <RelayNode cx={770} cy={390} r={44} stroke="#3A322B" delay={0.75} lines={[
        { text: 'States &', y: -4, size: 12 },
        { text: 'Developers', y: 12, size: 12 },
      ]} />
      <RelayNode cx={950} cy={110} r={30} stroke="#3A322B" delay={1.2} lines={[
        { text: 'NRL, LBNL', y: 4, size: 10, dim: true },
      ]} />
    </svg>
  )
}

function EntityCard({ role, name, who, leads, index }) {
  return (
    <div className="permitting-card editorial-panel" style={{ '--card-i': index }}>
      <div className="permitting-card-role">{role}</div>
      <div className="permitting-card-name">{name}<span className="permitting-card-arrow">↗</span></div>
      <div className="permitting-card-who"><ProseP>{who}</ProseP></div>
      {leads && <div className="permitting-card-leads">{leads}</div>}
    </div>
  )
}

function OpportunityOpening({ index, label, text }) {
  return (
    <article className="permitting-opening editorial-panel" style={{ '--opening-i': index }}>
      <div className="permitting-opening-num">{String(index + 1).padStart(2, '0')}</div>
      <h3 className="permitting-opening-label font-display text-[1.65rem] font-light italic leading-tight text-[#ffce8a] md:text-[1.85rem]">
        {label.replace(/\.$/, '')}
      </h3>
      <p className="prose-editorial mt-4 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/76 md:text-[1.02rem]">{text}</p>
    </article>
  )
}

function PermittingPageHero({ section }) {
  const page = PERMITTING[section]
  if (!page) return null
  return (
    <header className="permitting-hero px-6 pt-36 pb-4 md:pt-44 md:pb-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="editorial-kicker">{page.kicker}</div>
        <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
          {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
        </h1>
        {page.lede && (
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{page.lede}</p>
        )}
        <PermittingSubnav section={section} />
      </div>
    </header>
  )
}

function PermittingPager({ section }) {
  const idx = PERMITTING_SECTIONS.findIndex(s => s.id === section)
  const prev = idx > 0 ? PERMITTING_SECTIONS[idx - 1] : null
  const next = idx < PERMITTING_SECTIONS.length - 1 ? PERMITTING_SECTIONS[idx + 1] : null
  if (!prev && !next) return null
  return (
    <div className="permitting-pager mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
      {prev
        ? <Link to={prev.to} className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← {prev.label}</Link>
        : <span />}
      {next
        ? <Link to={next.to} className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">{next.label} →</Link>
        : <span />}
    </div>
  )
}

function ProblemSection() {
  const [timelineRef, timelineShown] = useReveal(0.2)
  return (
    <section className="permitting-section editorial-section py-14 md:py-[54px]">
      <div className="permitting-secnum">{PERMITTING.problem.num}</div>
      <h2 className="font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
        {PERMITTING.problem.headingLead} <span className="italic text-[#ff7a2e]">{PERMITTING.problem.headingEmphasis}</span>
      </h2>
      <div className="prose-editorial mt-6 max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
        {PERMITTING.problem.body.map((p, i) => (
          <ProseP key={i} className={p.dim ? 'text-[var(--ink)]/58' : undefined}>{p.text}</ProseP>
        ))}
      </div>
      {PERMITTING.problem.pullquote && (
        <blockquote className="editorial-pullquote mt-7 max-w-[760px] font-display text-xl italic leading-snug text-[#ff8a3c] md:text-2xl">
          {PERMITTING.problem.pullquote}
        </blockquote>
      )}
      <div className="permitting-maplabel mt-8">{PERMITTING.problem.timelineLabel}</div>
      <div ref={timelineRef} className={`permitting-stagebar${timelineShown ? ' permitting-stagebar-active' : ''}`}>
        {PERMITTING.stages.map((s, i) => (
          <div
            key={s.name}
            className={`permitting-stage${s.hot ? ' permitting-stage-hot' : ''}`}
            style={{ '--stage-i': i }}
          >
            <span className="permitting-stage-name">{s.name}</span>
            <span className="permitting-stage-duration">{s.duration}</span>
            {s.hot && <span className="permitting-stage-glow" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <p className="mt-2 font-body text-[13px] text-[var(--ink)]/45">{PERMITTING.problem.timelineNote}</p>
    </section>
  )
}

function OpportunitySection() {
  const [openingsRef, openingsShown] = useReveal(0.12)
  return (
    <section className="permitting-section editorial-section py-10 md:py-14">
      <div className="permitting-openings-label">Three areas</div>
      <div
        ref={openingsRef}
        className={`permitting-openings${openingsShown ? ' permitting-openings-active' : ''}`}
      >
        {PERMITTING.opportunity.items.map((item, i) => (
          <OpportunityOpening key={item.label} index={i} {...item} />
        ))}
      </div>
      {PERMITTING.opportunity.closing.pullquote && (
        <blockquote className="editorial-pullquote mt-12 max-w-[44rem] font-display text-xl italic leading-snug text-[#ff8a3c] md:text-[1.65rem] md:leading-snug">
          {PERMITTING.opportunity.closing.pullquote}
        </blockquote>
      )}
      <p className={`${PERMITTING.opportunity.closing.pullquote ? 'mt-6' : 'mt-12'} max-w-[42rem] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/58 md:text-[1.05rem] editorial-deck`}>
        {PERMITTING.opportunity.closing.coda}
      </p>
    </section>
  )
}

function matchesPermittingFilters(item, selectedAgencies, selectedJurisdictions) {
  const agencyMatch = item.agencies?.some(id => selectedAgencies.has(id))
  const jurisdictionMatch = item.jurisdictions?.some(id => selectedJurisdictions.has(id))
  return agencyMatch && jurisdictionMatch
}

function PermittingFilterGroup({ label, countLabel, items, selected, onToggle }) {
  const handleLinkedClick = (event, item) => {
    // Let cmd/ctrl/shift/middle-click open the link without toggling the filter.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    onToggle(item.id)
  }

  const pillClass = item =>
    `permitting-filter-btn${selected.has(item.id) ? ' permitting-filter-btn-on' : ''}${item.url ? ' permitting-filter-btn-link' : ''}`

  return (
    <div className="permitting-filterbar">
      <div className="permitting-filter-header">
        <div className="permitting-filter-label">{label}</div>
        <div className="permitting-filter-count">{countLabel}</div>
      </div>
      <div className="mt-2 flex flex-wrap">
        {items.map(item => (
          item.url ? (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass(item)}
              onClick={event => handleLinkedClick(event, item)}
              aria-pressed={selected.has(item.id)}
              title={`${item.label} — OpenEI permitting guide (opens in new tab)`}
            >
              {item.label}
              <span className="permitting-filter-link-mark" aria-hidden="true"> ↗</span>
            </a>
          ) : (
            <button
              key={item.id}
              type="button"
              className={pillClass(item)}
              onClick={() => onToggle(item.id)}
              aria-pressed={selected.has(item.id)}
            >
              {item.label}
            </button>
          )
        ))}
      </div>
    </div>
  )
}

function PeopleSection() {
  const [selectedAgencies, setSelectedAgencies] = useState(
    () => new Set(PERMITTING_LEAD_AGENCIES.map(a => a.id)),
  )
  const [selectedJurisdictions, setSelectedJurisdictions] = useState(
    () => new Set(PERMITTING_JURISDICTIONS.map(j => j.id)),
  )
  const [relayRef, relayShown] = useReveal(0.08)

  const toggleAgency = id => {
    setSelectedAgencies(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleJurisdiction = id => {
    setSelectedJurisdictions(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const agencyCountLabel = `${selectedAgencies.size} ${selectedAgencies.size === 1 ? 'agency' : 'agencies'} selected`
  const jurisdictionCountLabel = `${selectedJurisdictions.size} jurisdiction type${selectedJurisdictions.size === 1 ? '' : 's'} selected`

  const visibleGroups = Object.entries(PERMITTING.groups)
    .map(([key, group]) => ({
      key,
      ...group,
      items: group.items.filter(item => matchesPermittingFilters(item, selectedAgencies, selectedJurisdictions)),
    }))
    .filter(group => group.items.length > 0)

  const totalVisible = visibleGroups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <section className="permitting-section editorial-section py-10 md:py-14">
      <div className="permitting-maplabel">{PERMITTING.people.relayLabel}</div>
      <div ref={relayRef} className="permitting-relay-wrap">
        <RelayMap active={relayShown} />
      </div>
      <div className="permitting-legend">
        <span><span className="permitting-legend-dot permitting-legend-pulse" style={{ background: '#FF7B2E' }} />Convening office</span>
        <span><span className="permitting-legend-dot" style={{ background: '#C85A1E' }} />Primary actors in the flow</span>
        <span><span className="permitting-legend-dot" style={{ background: '#3A322B' }} />Consulted &amp; supporting</span>
        <span className="text-[var(--ink)]/45">handoff &nbsp; consultation</span>
      </div>
      <div className="mt-10 space-y-8">
        <PermittingFilterGroup
          label="View by Lead Agency"
          countLabel={agencyCountLabel}
          items={PERMITTING_LEAD_AGENCIES}
          selected={selectedAgencies}
          onToggle={toggleAgency}
        />
        <PermittingFilterGroup
          label="View by Jurisdiction"
          countLabel={jurisdictionCountLabel}
          items={PERMITTING_JURISDICTIONS}
          selected={selectedJurisdictions}
          onToggle={toggleJurisdiction}
        />
      </div>
      <div className="mt-9 space-y-11">
        {visibleGroups.map(group => (
          <div key={group.key}>
            <h3 className="font-display text-2xl font-light italic text-[var(--ink)]">{group.title}</h3>
            <p className="mt-1 max-w-[640px] font-body text-sm text-[var(--ink)]/48">{group.desc}</p>
            <div className="permitting-grid mt-5">
              {group.items.map((item, i) => (
                <EntityCard key={`${group.key}-${item.name}`} {...item} index={i} />
              ))}
            </div>
          </div>
        ))}
        {totalVisible === 0 && (
          <p className="font-body text-sm text-[var(--ink)]/48">No entities match the selected lead agencies and jurisdictions.</p>
        )}
      </div>
      <p className="mt-12 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-[var(--ink)]/35">{PERMITTING.disclaimer}</p>
      <NotesSection />
    </section>
  )
}

function NotesSection() {
  const [ref, shown] = useReveal(0.1)
  const page = PERMITTING.notes
  return (
    <section
      ref={ref}
      id="permitting-notes"
      className={`permitting-section editorial-section mt-16 border-t border-white/[0.06] py-10 md:py-14 scroll-mt-32 ${shown ? 'animate-rise' : 'opacity-0'}`}
    >
      <div className="permitting-secnum">{page.num}</div>
      <h2 className="mt-4 font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
        {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
      </h2>
      <p className="prose-editorial mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{page.lede}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {PERMITTING_NOTES.map(note => (
          <Link
            key={note.slug}
            to={permittingNotePath(note)}
            className="editorial-panel editorial-shimmer group p-5 text-left transition-transform hover:-translate-y-0.5"
          >
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#ffb347]/80">{note.kicker}</div>
            <div className="mt-3 font-body text-sm font-medium leading-snug text-[var(--ink)] group-hover:text-[#ffce8a]">{note.title}</div>
            <p className="mt-2 line-clamp-3 font-body text-[0.82rem] leading-relaxed text-[var(--ink)]/55">{note.body[0]}</p>
            <div className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink)]/45 transition-colors group-hover:text-[#ff8a3c]">Read note →</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

const SECTIONS = {
  problem: ProblemSection,
  opportunity: OpportunitySection,
  people: PeopleSection,
}

export default function Permitting({ section = 'problem' }) {
  const Section = SECTIONS[section] || ProblemSection

  return (
    <main className="permitting-page">
      <PermittingPageHero section={section} />

      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <Section />
        <PermittingPager section={section} />
      </div>
    </main>
  )
}
