import { useEffect, useRef, useState } from 'react'
import { PROJECTS, PRODUCTION_NAV_SECTIONS, HERO_IMAGES } from './content.jsx'
import { RiskProfileChart } from './projectsVisuals.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { SectionJumpNav, StickySubnav, useSectionSpy } from './SectionNav.jsx'
import { ProductionSubnav } from './Toolbox.jsx'

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

function ProjectLifecycle({ lifecycle }) {
  const [ref, shown] = useReveal(0.1)
  if (!lifecycle) return null

  return (
    <section
      ref={ref}
      id={lifecycle.id}
      className={`editorial-section border-t border-white/[0.06] py-12 md:py-16 scroll-mt-32 ${shown ? 'animate-rise' : 'opacity-0'}`}
    >
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">{lifecycle.kicker}</div>
          <h2 className="mt-3 font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
            {lifecycle.title}
          </h2>
          <div className="prose-editorial mt-5 max-w-prose space-y-4 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78">
            {lifecycle.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
          {lifecycle.stages?.length > 0 && (
            <ol className="mt-7 space-y-3 pl-0 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/74 [list-style:none]">
              {lifecycle.stages.map((stage, i) => (
                <li key={stage.name} className="grid gap-1 border-l-2 border-[#ff8a3c]/35 pl-4">
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#ff8a3c]">
                    {String(i + 1).padStart(2, '0')} · {stage.name}
                  </div>
                  <div>{stage.note}</div>
                </li>
              ))}
            </ol>
          )}
          {lifecycle.aside && (
            <aside className="editorial-pullquote mt-8 max-w-prose">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ff8a3c]">{lifecycle.aside.label}</div>
              <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/70 md:text-[0.95rem] italic">{lifecycle.aside.text}</p>
            </aside>
          )}
          <SectionLinks links={lifecycle.relatedLinks} />
        </div>
        <div className="editorial-panel relative aspect-[4/3] w-full overflow-hidden">
          <RiskProfileChart />
        </div>
      </div>
    </section>
  )
}

function ProjectLane({ lane, index }) {
  const [ref, shown] = useReveal(0.1)
  return (
    <article
      ref={ref}
      id={lane.id}
      className={`projects-lane editorial-panel scroll-mt-32 ${shown ? 'animate-rise' : 'opacity-0'}`}
      style={{ '--lane-i': index }}
    >
      <div className="projects-lane-num font-mono text-[0.65rem] tracking-[0.2em] text-[#ff8a3c]">{lane.num}</div>
      <h2 className="mt-3 font-display text-[1.45rem] font-light leading-tight text-[var(--ink)] md:text-[1.75rem]">
        {lane.title}
      </h2>
      <div className="prose-editorial mt-4 space-y-4 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/76 md:text-[1.02rem]">
        {lane.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
      </div>
      {lane.bullets?.length > 0 && (
        <ul className="mt-5 space-y-2 pl-5 font-body text-[0.96rem] leading-relaxed text-[var(--ink)]/72 [list-style:disc] marker:text-[#ff8a3c]/70">
          {lane.bullets.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <SectionLinks links={lane.relatedLinks} />
    </article>
  )
}

export default function Projects() {
  const page = PROJECTS
  const [introRef, introShown] = useReveal(0.1)
  const jumpItems = [
    { id: page.lifecycle.id, label: 'Lifecycle & risk' },
    ...page.lanes.map(lane => ({
      id: lane.id,
      label: `${lane.num} · ${lane.title.split(' ')[0]}`,
    })),
  ]
  const activeSectionId = useSectionSpy(jumpItems.map(item => item.id))

  return (
    <main className="projects-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.permitting} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{page.kicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {page.titleLead} <span className="italic text-[#ff7a2e]">{page.titleEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{page.lede}</p>
          <ProductionSubnav section="projects" />
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
        </section>

        <StickySubnav>
          <div className="mx-auto max-w-[1100px]">
            <SectionJumpNav
              label="Jump to section"
              items={jumpItems}
              activeId={activeSectionId}
            />
          </div>
        </StickySubnav>

        <ProjectLifecycle lifecycle={page.lifecycle} />

        <section className="editorial-section border-t border-white/[0.06] py-12 md:py-16">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">Seven lanes</div>
          <h2 className="mt-3 font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
            What can block progress
          </h2>
          <p className="mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">
            These threads run in parallel across the lifecycle above. Any one of them can extend the schedule even when the resource looks good.
          </p>
          <div className="projects-lanes mt-10 space-y-6">
            {page.lanes.map((lane, i) => (
              <ProjectLane key={lane.id} lane={lane} index={i} />
            ))}
          </div>
        </section>

        <section className="editorial-section border-t border-white/[0.06] py-12 md:py-16">
          <h2 className="font-display text-[1.65rem] font-light text-[var(--ink)] md:text-[1.85rem]">{page.closing.heading}</h2>
          <div className="prose-editorial mt-5 max-w-[760px] space-y-4 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/78">
            {page.closing.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
        </section>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
          <Link to="/projects#lifecycle" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">
            Risk profile ↑
          </Link>
          <Link to="/permitting/problem" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">
            Permitting guide →
          </Link>
        </div>
      </div>
    </main>
  )
}
