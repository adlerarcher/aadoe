import { useEffect, useMemo, useRef, useState } from 'react'
import { GLOSSARY, HERO_IMAGES, PRIMERS_SECTIONS } from './content.jsx'
import { ProseP } from './Prose.jsx'
import { PrimersSubnav } from './Toolbox.jsx'

const GLOSSARY_RANGES = [
  { id: 'a-e', label: 'A\u2013E', from: 'A', to: 'E' },
  { id: 'f-j', label: 'F\u2013J', from: 'F', to: 'J' },
  { id: 'k-o', label: 'K\u2013O', from: 'K', to: 'O' },
  { id: 'p-t', label: 'P\u2013T', from: 'P', to: 'T' },
  { id: 'u-z', label: 'U\u2013Z', from: 'U', to: 'Z' },
]

function glossaryLetter(term) {
  const match = term.match(/[A-Za-z]/)
  return match ? match[0].toUpperCase() : '#'
}

function letterInRange(letter, from, to) {
  return letter >= from && letter <= to
}

function groupGlossaryByRange(entries) {
  return GLOSSARY_RANGES.map(range => {
    const letters = []
    const byLetter = new Map()

    for (const entry of entries) {
      const letter = glossaryLetter(entry.term)
      if (!letterInRange(letter, range.from, range.to)) continue
      if (!byLetter.has(letter)) {
        byLetter.set(letter, [])
        letters.push(letter)
      }
      byLetter.get(letter).push(entry)
    }

    if (!letters.length) return null
    letters.sort()

    return {
      ...range,
      letters: letters.map(letter => ({ letter, entries: byLetter.get(letter) })),
    }
  }).filter(Boolean)
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

export default function Glossary() {
  // Observe the jump nav, not the full term list — the section is ~10k px tall,
  // so a threshold on the whole section never crosses 10% visible.
  const [ref, shown] = useReveal(0.12)
  const [activeRange, setActiveRange] = useState('')
  const groups = useMemo(() => groupGlossaryByRange(GLOSSARY), [])
  const meta = PRIMERS_SECTIONS.find(s => s.id === 'glossary')

  const jumpToRange = (id) => {
    const target = document.getElementById(`glossary-${id}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveRange(id)
    }
  }

  return (
    <main className="glossary-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.glossary} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{meta?.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {meta?.titleLead} <span className="italic text-[#ff7a2e]">{meta?.titleEmphasis}</span>
          </h1>
          {meta?.lede && (
            <ProseP className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{meta.lede}</ProseP>
          )}
          <PrimersSubnav section="glossary" />
        </div>
      </header>

      <section
        className={`editorial-section px-6 py-12 md:py-16 ${shown ? 'animate-rise' : 'opacity-0'}`}
      >
        <div className="mx-auto max-w-4xl">
          <nav ref={ref} className="glossary-jump editorial-panel" aria-label="Jump to section">
            <div className="glossary-jump-label font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#ff8a3c]">
              Jump to
            </div>
            <div className="glossary-jump-ranges mt-3">
              {groups.map(range => (
                <button
                  key={range.id}
                  type="button"
                  aria-current={activeRange === range.id ? 'true' : undefined}
                  className={`glossary-jump-range${activeRange === range.id ? ' glossary-jump-range-active' : ''}`}
                  onClick={() => jumpToRange(range.id)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </nav>

          <dl className="mt-10 border-t border-white/[0.08]">
            {groups.map(range => (
              <div key={range.id} id={`glossary-${range.id}`} className="glossary-range-group scroll-mt-32">
                <div className="glossary-range-heading font-display text-[2rem] font-light italic text-[#ff7a2e] md:text-[2.25rem]">
                  {range.label}
                </div>
                {range.letters.map(({ letter, entries }) => (
                  <div key={letter} className="glossary-letter-group">
                    <div className="glossary-letter-heading font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#ffb347]/80">
                      {letter}
                    </div>
                    {entries.map(entry => (
                      <div key={entry.term} className="grid gap-2 border-b border-white/[0.06] py-7 md:grid-cols-[220px_1fr]">
                        <dt className="font-display text-xl font-light italic text-[#ffce8a]">{entry.term}</dt>
                        <dd className="prose-editorial font-body text-[var(--ink)]/78"><ProseP>{entry.def}</ProseP></dd>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  )
}
