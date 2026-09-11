import { useEffect, useRef, useState } from 'react'
import { DATA_MODELING, HERO_IMAGES, getToolboxGroups } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { PrimersSubnav, ToolboxResourceGroup } from './Toolbox.jsx'

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

function DataModelingPager() {
  return (
    <div className="toolbox-pager mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
      <Link to="/toolbox/data-and-modeling" className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← Data &amp; modeling</Link>
      <Link to="/utes" className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">Energy Storage →</Link>
    </div>
  )
}

export default function DataModeling() {
  const [introRef, introShown] = useReveal(0.1)
  const [groupsRef, groupsShown] = useReveal(0.1)
  const page = DATA_MODELING
  const groups = getToolboxGroups('data-modeling')

  return (
    <main className="toolbox-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.toolbox} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{page.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{page.lede}</p>
          <PrimersSubnav section="data-modeling" />
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
          ref={groupsRef}
          className={`toolbox-section editorial-section border-t border-white/[0.06] py-10 md:py-14 ${groupsShown ? 'animate-rise' : 'opacity-0'}`}
        >
          {groups.map((group, i) => (
            <ToolboxResourceGroup key={group.group} group={group} isFirst={i === 0} />
          ))}
        </section>

        <DataModelingPager />
      </div>
    </main>
  )
}
