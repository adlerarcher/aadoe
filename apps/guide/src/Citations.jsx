import { useEffect, useRef, useState } from 'react'
import { CITATIONS, CITATIONS_PAGE } from './citationsContent.jsx'
import { HERO_IMAGES } from './content.jsx'
import { Link } from './router.jsx'

function useReveal(threshold = 0.1) {
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

function CitationEntry({ cite }) {
  const meta = [cite.org, cite.year].filter(Boolean).join(', ')
  return (
    <li id={String(cite.num)} className="citation-entry scroll-mt-32">
      <span className="citation-entry-num font-mono text-[#ff8a3c]">[{cite.num}]</span>
      <div className="citation-entry-body">
        <a
          href={cite.url}
          target="_blank"
          rel="noopener noreferrer"
          className="citation-entry-title font-body font-medium text-[var(--ink)] hover:text-[#ffce8a]"
        >
          {cite.title}
          <span className="ml-1 font-mono text-xs text-[var(--ink)]/35" aria-hidden="true">↗</span>
        </a>
        {meta && (
          <div className="citation-entry-meta mt-1 font-body text-sm text-[var(--ink)]/55">{meta}</div>
        )}
        {cite.note && (
          <p className="citation-entry-note mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/62">{cite.note}</p>
        )}
      </div>
    </li>
  )
}

export default function Citations() {
  const page = CITATIONS_PAGE
  const [ref, shown] = useReveal(0.08)

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#') return
    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <main className="citations-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.toolbox} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{page.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{page.lede}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <section
          ref={ref}
          className={`editorial-section py-10 md:py-14 ${shown ? 'animate-rise' : 'opacity-0'}`}
        >
          <div className="prose-editorial max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
            {page.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <ol className="citation-list mt-12 space-y-8">
            {CITATIONS.map(cite => (
              <CitationEntry key={cite.id} cite={cite} />
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}

/** Compact bibliography block for Helpful links page. */
export function CitationsSection({ embedded = false }) {
  return (
    <div className={embedded ? '' : 'mt-14 scroll-mt-28 border-t border-white/[0.06] pt-12 md:mt-16 md:pt-14'}>
      {!embedded && (
        <>
          <h2 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.65rem]">References</h2>
          <p className="prose-editorial mt-3 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">
            Numbered sources cited in site prose. Superscript links in body text point here.{' '}
            <Link to="/citations" className="text-[#ff8a3c] hover:text-[#ffb347]">Full references page →</Link>
          </p>
          <div className="toolbox-count mt-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">
            {CITATIONS.length} sources
          </div>
        </>
      )}
      {embedded && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="toolbox-count font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">
            {CITATIONS.length} sources
          </div>
          <Link to="/citations" className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#ff8a3c] hover:text-[#ffb347]">
            Full page →
          </Link>
        </div>
      )}
      <ol className={`citation-list-compact space-y-4${embedded ? '' : ' mt-8'}`}>
        {CITATIONS.map(cite => (
          <li key={cite.id} className="citation-compact-entry">
            <Link to={`/citations#${cite.num}`} className="citation-compact-num font-mono text-[#ff8a3c] hover:text-[#ffb347]">
              [{cite.num}]
            </Link>
            <span className="citation-compact-text font-body text-sm leading-relaxed text-[var(--ink)]/72">
              {cite.title}
              {cite.year ? ` (${cite.year})` : ''}
              {' · '}
              <span className="text-[var(--ink)]/50">{cite.org}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
