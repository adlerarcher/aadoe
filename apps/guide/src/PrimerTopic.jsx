import { useEffect, useRef, useState } from 'react'
import { GradientProbe, FracturePropagation, CirculationLoop, HydrothermalReservoir } from './visuals.jsx'
import { PRIMER_TOPICS, HERO_IMAGES } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { ProductionSubnav } from './Toolbox.jsx'

const PRIMER_VISUALS = {
  gradient: GradientProbe,
  hydrothermal: HydrothermalReservoir,
  fracture: FracturePropagation,
  loop: CirculationLoop,
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

function TopicSection({ section, index }) {
  const [ref, shown] = useReveal()
  const hasVisual = !!section.visual
  const flip = index % 2 === 1

  return (
    <section
      ref={ref}
      id={section.id}
      className={`editorial-section relative scroll-mt-32 py-20 md:py-28${index > 0 ? ' border-t border-white/[0.06]' : ''}`}
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
            {!section.depth && (
              <div className="flex items-baseline gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-[#ff6a1f]/60 to-transparent" />
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
              </div>
            )}
            <div className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#ffb347]/80">{section.kicker}</div>
            <h2 className="mt-3 font-display text-[2.2rem] font-light leading-[0.98] tracking-tight text-[var(--ink)] md:text-5xl editorial-display">{section.title}</h2>
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

export default function PrimerTopic({ topicId }) {
  const topic = PRIMER_TOPICS.find(t => t.id === topicId)
  const topicIndex = PRIMER_TOPICS.findIndex(t => t.id === topicId)
  const prev = topicIndex > 0 ? PRIMER_TOPICS[topicIndex - 1] : null
  const next = topicIndex >= 0 && topicIndex < PRIMER_TOPICS.length - 1 ? PRIMER_TOPICS[topicIndex + 1] : null

  if (!topic) return null

  const images = HERO_IMAGES[topic.id] || HERO_IMAGES.primer
  const sections = topic.sections || []

  return (
    <main className="primer-topic-page">
      <header className="primer-page-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={images} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{topic.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {topic.titleLead} <span className="italic text-[#ff7a2e]">{topic.titleEmphasis}</span>
          </h1>
          {topic.lede && (
            <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{topic.lede}</p>
          )}
          <ProductionSubnav section={topic.id} />
        </div>
      </header>

      {sections.map((section, index) => (
        <TopicSection key={section.id} section={section} index={index} />
      ))}

      <div className="px-6 pb-28">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
          {prev ? (
            <Link to={prev.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← {prev.label}</Link>
          ) : (
            <Link to="/toolbox/primer" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← Primer</Link>
          )}
          {next ? (
            <Link to={next.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">{next.label} →</Link>
          ) : (
            <Link to="/toolbox/glossary" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">Glossary →</Link>
          )}
        </div>
      </div>
    </main>
  )
}
