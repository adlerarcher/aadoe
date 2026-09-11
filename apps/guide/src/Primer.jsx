import { useEffect, useRef, useState } from 'react'
import { GradientProbe, FracturePropagation, CirculationLoop, HydrothermalReservoir, DirectHeatUse } from './visuals.jsx'
import { PRIMER, HERO_IMAGES, PRIMERS_SECTIONS, PRIMER_TOPICS } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { PrimersSubnav } from './Toolbox.jsx'

const PRIMER_VISUALS = {
  gradient: GradientProbe,
  hydrothermal: HydrothermalReservoir,
  fracture: FracturePropagation,
  loop: CirculationLoop,
  directuse: DirectHeatUse,
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
  const Comp = PRIMER_VISUALS[kind]
  if (!Comp) return null
  return (
    <div className="editorial-panel relative aspect-[4/3] w-full overflow-hidden">
      <Comp />
    </div>
  )
}

function Stratum({ section, index }) {
  const [ref, shown] = useReveal()
  const hasVisual = !!section.visual
  const flip = index % 2 === 1
  return (
    <section ref={ref} id={section.id} className="editorial-section relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid grid-cols-1 items-center gap-12 ${hasVisual ? 'md:grid-cols-2' : ''}`}>
          <div className={`${flip && hasVisual ? 'md:order-2' : ''} ${shown ? 'animate-rise' : 'opacity-0'}`}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-[0.25em] text-[#ff8a3c]">{section.depth}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#ff6a1f]/60 to-transparent" />
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#ffb347]/80">{section.kicker}</div>
            <h2 className="mt-3 font-display text-[2.2rem] font-light leading-[0.98] tracking-tight text-[var(--ink)] md:text-5xl editorial-display">{section.title}</h2>
            <div className="prose-editorial mt-7 max-w-prose space-y-5 font-body text-[1.02rem] text-[var(--ink)]/78 md:text-lg">
              {section.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
            </div>
            {section.aside && (
              <aside className="editorial-pullquote mt-9 max-w-prose">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ff8a3c]">{section.aside.label}</div>
                <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/70 md:text-[0.95rem] italic">{section.aside.text}</p>
              </aside>
            )}
            {section.relatedLink && (
              <Link
                to={section.relatedLink.to}
                className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]"
              >
                {section.relatedLink.label} →
              </Link>
            )}
            {section.relatedLinks?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {section.relatedLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            )}
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

function PrimerHero() {
  const meta = PRIMERS_SECTIONS.find(s => s.id === 'primer')
  return (
    <header className="primer-page-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
      <HeroMosaic images={HERO_IMAGES.primer} />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="editorial-kicker">{meta?.kicker}</div>
        <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
          {meta?.titleLead} <span className="italic text-[#ff7a2e]">{meta?.titleEmphasis}</span>
        </h1>
        {meta?.lede && (
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{meta.lede}</p>
        )}
        <PrimersSubnav section="primer" />
      </div>
    </header>
  )
}

export default function Primer({ scrollPct }) {
  return (
    <>
      <PrimerHero />

      <div className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="relative h-48 w-px bg-white/10">
          <div className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#ffb347] to-[#e8541e]" style={{ height: `${scrollPct * 100}%` }} />
          <div className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-[#ffce8a]" style={{ top: `calc(${scrollPct * 100}% - 3px)` }} />
        </div>
        <div className="mt-3 font-mono text-[0.6rem] tracking-widest text-white/40">{Math.round(scrollPct * 6 * 10) / 10}km</div>
      </div>

      <main className="primer-page">
        {PRIMER.map((s, i) => <Stratum key={s.id} section={s} index={i} />)}
      </main>

      <div className="px-6 pb-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">Production</div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {PRIMER_TOPICS.map(topic => (
              <Link
                key={topic.id}
                to={topic.to}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]"
              >
                {topic.label} →
              </Link>
            ))}
            <Link to="/toolbox/glossary" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">Glossary →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
