import { useEffect, useRef, useState } from 'react'
import { INTERNATIONAL, HERO_IMAGES } from './content.jsx'
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

export default function International() {
  const [introRef, introShown] = useReveal(0.1)
  const [deployRef, deployShown] = useReveal(0.1)
  const [marketRef, marketShown] = useReveal(0.1)
  const page = INTERNATIONAL

  return (
    <main className="international-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.international} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{page.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{page.lede}</p>
          <PrimersSubnav section="international" />
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <section
          ref={introRef}
          className={`editorial-section py-12 md:py-16 ${introShown ? 'animate-rise' : 'opacity-0'}`}
        >
          <div className="prose-editorial max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
            {page.intro.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
          {page.pullquote && (
            <blockquote className="editorial-pullquote mt-10 max-w-[760px] font-display text-lg italic leading-snug text-[#ff8a3c] md:text-xl">
              {page.pullquote}
            </blockquote>
          )}
        </section>

        <section
          ref={deployRef}
          className={`editorial-section border-t border-white/[0.06] py-12 md:py-16 ${deployShown ? 'animate-rise' : 'opacity-0'}`}
        >
          <h2 className="font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
            {page.deployment.heading}
          </h2>
          <div className="prose-editorial mt-6 max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
            {page.deployment.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
          <div className="mt-10 space-y-8">
            {page.deployment.regions.map(region => (
              <article key={region.title} className="utes-case">
                <h3 className="font-display text-xl font-light text-[var(--ink)] md:text-[1.35rem]">{region.title}</h3>
                <p className="prose-editorial mt-3 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/76">{region.body}</p>
              </article>
            ))}
          </div>
          <a
            href={page.deployment.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]"
          >
            {page.deployment.link.label} ↗
          </a>
        </section>

        <section
          ref={marketRef}
          className={`editorial-section border-t border-white/[0.06] py-12 md:py-16 ${marketShown ? 'animate-rise' : 'opacity-0'}`}
        >
          <h2 className="font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
            {page.market.heading}
          </h2>
          <div className="prose-editorial mt-6 max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
            {page.market.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
          <div className="utes-links mt-10">
            {page.market.links.map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="utes-link editorial-panel">
                <span className="utes-link-label">{link.label}</span>
                <span className="utes-link-note">{link.note}</span>
                <span className="utes-link-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
