import { useEffect, useRef, useState } from 'react'
import { UTES, HERO_IMAGES, PRIMERS_SECTIONS } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { PrimersSubnav } from './Toolbox.jsx'

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

function UtesHero() {
  const meta = PRIMERS_SECTIONS.find(s => s.id === 'energy-storage')
  if (!meta) return null
  return (
    <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
      <HeroMosaic images={HERO_IMAGES.utes} />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="editorial-kicker">{meta.kicker}</div>
        <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
          {meta.titleLead} <span className="italic text-[#ff7a2e]">{meta.titleEmphasis}</span>
        </h1>
        {meta.lede && (
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{meta.lede}</p>
        )}
        <PrimersSubnav section="energy-storage" />
      </div>
    </header>
  )
}

function BodyCopy({ body, className = 'prose-editorial mt-6 max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]' }) {
  const paragraphs = Array.isArray(body) ? body : [body]
  return (
    <div className={className}>
      {paragraphs.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
    </div>
  )
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
      {children}
    </h2>
  )
}

function SeasonalStorageDiagram() {
  return (
    <figure className="utes-diagram editorial-panel">
      <svg viewBox="0 0 640 280" className="h-auto w-full" role="img" aria-labelledby="utes-diagram-title">
        <title id="utes-diagram-title">Seasonal underground thermal energy storage: charge in summer, discharge in winter</title>
        <defs>
          <linearGradient id="utes-warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a3c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e8541e" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="utes-cool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6eb5ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="utes-ground" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(255,138,60,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>
        <rect x="0" y="120" width="640" height="160" fill="url(#utes-ground)" rx="4" />
        <path d="M40 140 Q120 130 200 145 T360 140 T520 148 T600 142" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 6" />
        <text x="48" y="48" fill="#ffb347" fontFamily="Space Mono, monospace" fontSize="11" letterSpacing="0.14em">SUMMER · CHARGE</text>
        <path d="M120 56 L120 118" stroke="#ff8a3c" strokeWidth="2" />
        <rect x="88" y="118" width="64" height="36" rx="3" fill="url(#utes-warm)" opacity="0.9" />
        <text x="120" y="140" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.85">Warm store</text>
        <path d="M120 154 L120 200" stroke="rgba(255,138,60,0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
        <rect x="72" y="200" width="96" height="44" rx="4" fill="rgba(8,9,12,0.6)" stroke="rgba(255,138,60,0.35)" />
        <text x="120" y="226" textAnchor="middle" fill="#e9e3d8" fontSize="11">Building load</text>
        <text x="360" y="48" fill="#93c5fd" fontFamily="Space Mono, monospace" fontSize="11" letterSpacing="0.14em">WINTER · DISCHARGE</text>
        <path d="M480 200 L480 118" stroke="#6eb5ff" strokeWidth="2" />
        <rect x="448" y="118" width="64" height="36" rx="3" fill="url(#utes-cool)" opacity="0.85" />
        <text x="480" y="140" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.85">Stored heat</text>
        <rect x="432" y="200" width="96" height="44" rx="4" fill="rgba(8,9,12,0.6)" stroke="rgba(110,181,255,0.35)" />
        <text x="480" y="226" textAnchor="middle" fill="#e9e3d8" fontSize="11">Heat pump / district</text>
        <text x="320" y="248" textAnchor="middle" fill="rgba(233,227,216,0.45)" fontFamily="Space Mono, monospace" fontSize="10" letterSpacing="0.12em">SUBSURFACE · AQUIFER OR BOREHOLE FIELD</text>
      </svg>
      <figcaption className="utes-diagram-caption">Schematic only. Real systems charge and discharge both heat and cold depending on climate and load.</figcaption>
    </figure>
  )
}

function UtesComparisonTable({ comparison }) {
  return (
    <div className="utes-table-wrap mt-8 overflow-x-auto">
      <table className="utes-table">
        <thead>
          <tr>
            {comparison.headers.map(h => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map(row => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function UtesResourceLinks({ links }) {
  return (
    <div className="utes-links mt-8">
      {links.map(link => {
        const inner = (
          <>
            <span className="utes-link-label">{link.label}</span>
            <span className="utes-link-note">{link.note}</span>
          </>
        )
        if (link.to) {
          return (
            <Link key={link.label} to={link.to} className="utes-link editorial-panel">
              {inner}
            </Link>
          )
        }
        return (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="utes-link editorial-panel">
            {inner}
            <span className="utes-link-arrow" aria-hidden="true">↗</span>
          </a>
        )
      })}
    </div>
  )
}

function OverviewSection() {
  const [ref, shown] = useReveal(0.1)
  const page = UTES.overview
  return (
    <section id="utes-overview" ref={ref} className={`utes-section editorial-section scroll-mt-32 py-12 md:py-16 ${shown ? 'animate-rise' : 'opacity-0'}`}>
      <BodyCopy body={page.body} />
      <div className="mt-10">
        <SeasonalStorageDiagram />
      </div>
      {page.pullquote && (
        <blockquote className="editorial-pullquote mt-10 max-w-[760px] font-display text-lg italic leading-snug text-[#ff8a3c] md:text-xl">
          {page.pullquote}
        </blockquote>
      )}
    </section>
  )
}

function SystemsSection() {
  const [ref, shown] = useReveal(0.1)
  const page = UTES.systems
  return (
    <section id="utes-systems" ref={ref} className={`utes-section editorial-section scroll-mt-32 border-t border-white/[0.06] py-12 md:py-16 ${shown ? 'animate-rise' : 'opacity-0'}`}>
      <SectionHeading>Systems &amp; design</SectionHeading>
      <p className="prose-editorial mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{page.lede}</p>
      <div className="utes-systems mt-10">
        {page.systems.map((sys, i) => (
          <article key={sys.abbr} className="utes-system editorial-panel" style={{ '--utes-i': i }}>
            <div className="utes-system-abbr">{sys.abbr}</div>
            <h3 className="utes-system-name font-display text-xl font-light italic text-[#ffce8a] md:text-[1.35rem]">{sys.name}</h3>
            <BodyCopy body={sys.body} className="prose-editorial mt-4 space-y-4 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/76 md:text-[1.02rem]" />
          </article>
        ))}
      </div>
      <UtesComparisonTable comparison={page.comparison} />
      {page.choosing?.length > 0 && (
        <div className="mt-12">
          <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">Choosing a system</h3>
          <ol className="mt-5 max-w-[760px] space-y-3 pl-5 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78 [list-style:decimal]">
            {page.choosing.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      )}
      {page.designSubsections?.length > 0 && (
        <div className="mt-14 border-t border-white/[0.06] pt-12 space-y-9">
          <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">Design principles</h3>
          {page.designSubsections.map(sub => (
            <div key={sub.title}>
              <h4 className="font-display text-lg font-light text-[var(--ink)] md:text-xl">{sub.title}</h4>
              <BodyCopy body={sub.body} className="prose-editorial mt-3 max-w-[760px] space-y-4 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function PracticeSection() {
  const [ref, shown] = useReveal(0.1)
  const page = UTES.practice
  const { tradeoffs, cases, resources } = page
  return (
    <section id="utes-practice" ref={ref} className={`utes-section editorial-section scroll-mt-32 border-t border-white/[0.06] py-12 md:py-16 ${shown ? 'animate-rise' : 'opacity-0'}`}>
      <SectionHeading>Benefits &amp; practice</SectionHeading>
      <p className="prose-editorial mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{page.lede}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#ff8a3c]">Benefits</div>
          <ul className="utes-list mt-4 space-y-3 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78">
            {tradeoffs.benefits.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#ffb347]/80">Challenges</div>
          <ul className="utes-list mt-4 space-y-3 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78">
            {tradeoffs.challenges.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {tradeoffs.risks?.length > 0 && (
        <div className="mt-12 space-y-6">
          <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">Risks and mitigation</h3>
          {tradeoffs.risks.map(risk => (
            <div key={risk.title} className="utes-case max-w-[760px]">
              <h4 className="font-display text-lg font-light text-[#ffce8a]">{risk.title}</h4>
              <p className="prose-editorial mt-2 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/76">{risk.body}</p>
            </div>
          ))}
        </div>
      )}
      <blockquote className="editorial-pullquote mt-10 max-w-[760px] font-display text-lg italic leading-snug text-[#ff8a3c] md:text-xl">
        {tradeoffs.perspective}
      </blockquote>

      <div className="mt-14 border-t border-white/[0.06] pt-12 space-y-8">
        <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">Case studies</h3>
        {cases.map(item => (
          <article key={item.title} className="utes-case">
            {item.region && (
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ink)]/42">{item.region}</div>
            )}
            <h4 className="font-display text-xl font-light italic text-[var(--ink)] md:text-[1.35rem]">{item.title}</h4>
            <BodyCopy body={item.body} className="prose-editorial mt-3 max-w-[760px] space-y-4 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/76" />
          </article>
        ))}
      </div>

      <div className="mt-14 border-t border-white/[0.06] pt-12">
        <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">Resources</h3>
        <p className="mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{resources.body}</p>
        <UtesResourceLinks links={resources.links} />
        <p className="mt-8 max-w-[760px] font-body text-sm leading-relaxed text-[var(--ink)]/48">{resources.coda}</p>
      </div>
    </section>
  )
}

export default function Utes() {
  return (
    <main className="utes-page">
      <UtesHero />
      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <OverviewSection />
        <SystemsSection />
        <PracticeSection />
        <div className="toolbox-pager mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
          <Link to="/toolbox/portals" className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← Helpful links</Link>
          <Link to="/international" className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">International →</Link>
        </div>
      </div>
    </main>
  )
}
