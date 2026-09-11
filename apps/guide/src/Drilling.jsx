import { useEffect, useRef, useState } from 'react'
import {
  DRILLING_PAGES,
  DRILLING_RESOURCES,
  DRILLING_SECTIONS,
  HERO_IMAGES,
  buildDrillingTopics,
  getDrillingTopicSection,
} from './content.jsx'
import { RigSchematic, MudCirculation, BhaDiagram, RiskProfileChart } from './projectsVisuals.jsx'
import { WellControlPanel } from './workforceVisuals.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { StickySubnav, TopicHubCards, TopicStripNav } from './SectionNav.jsx'
import { ProductionSubnav } from './Toolbox.jsx'

const DRILLING_VISUALS = {
  rigSchematic: RigSchematic,
  bhaDiagram: BhaDiagram,
  mudCirculation: MudCirculation,
  riskProfile: RiskProfileChart,
  wellControl: WellControlPanel,
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

export function DrillingSubnav({ section }) {
  return (
    <nav className="permitting-subnav permitting-subnav-compact" aria-label="Drilling sections">
      {DRILLING_SECTIONS.map(s => (
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

function Visual({ kind }) {
  if (!kind) return null
  const Comp = DRILLING_VISUALS[kind]
  if (!Comp) return null
  return (
    <div className="editorial-panel relative aspect-[4/3] w-full overflow-hidden">
      <Comp />
    </div>
  )
}

function SectionPhoto({ image }) {
  if (!image?.src) return null
  return (
    <figure className="drilling-section-photo editorial-panel overflow-hidden">
      <img
        src={image.src}
        alt={image.alt || ''}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </figure>
  )
}

function DrillingSection({ section, index, solo = false }) {
  const [ref, shown] = useReveal(0.1)
  const hasVisual = !!section.visual
  const hasPhoto = !!section.image
  const flip = !solo && index % 2 === 1
  const showSide = hasVisual || hasPhoto
  const showHeader = !solo

  return (
    <section
      ref={ref}
      id={section.id}
      className={`editorial-section relative scroll-mt-36 ${solo ? 'py-8 md:py-10' : 'py-12 md:py-16'}${index > 0 && !solo ? ' border-t border-white/[0.06]' : ''}`}
    >
      <div className={`grid grid-cols-1 items-start gap-10 ${showSide ? 'md:grid-cols-2 md:items-center' : ''}`}>
        <div className={`${flip && showSide ? 'md:order-2' : ''} ${shown ? 'animate-rise' : 'opacity-0'}`}>
          {showHeader && section.depth && (
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-[0.25em] text-[#ff8a3c]">{section.depth}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#ff6a1f]/60 to-transparent" />
            </div>
          )}
          {showHeader && (
            <>
              <div className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">{section.kicker}</div>
              <h2 className="mt-3 font-display text-[1.85rem] font-light leading-tight text-[var(--ink)] md:text-[2.125rem] editorial-display">
                {section.title}
              </h2>
            </>
          )}
          <div className={`prose-editorial ${showHeader ? 'mt-6' : ''} max-w-prose space-y-4 font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/82 md:text-[1.03rem]`}>
            {section.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
          </div>
          {section.bullets?.length > 0 && (
            <ul className="prose-editorial mt-6 max-w-prose space-y-2.5 pl-5 font-body text-[0.98rem] leading-relaxed text-[var(--ink)]/74 [list-style:disc] marker:text-[#ff8a3c]/70">
              {section.bullets.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.aside && (
            <aside className="editorial-pullquote mt-8 max-w-prose">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ff8a3c]">{section.aside.label}</div>
              <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/70 md:text-[0.95rem] italic">{section.aside.text}</p>
            </aside>
          )}
          <SectionLinks links={section.relatedLinks} />
        </div>
        {showSide && (
          <div className={`space-y-4 ${flip ? 'md:order-1' : ''} ${shown ? 'animate-rise' : 'opacity-0'}`} style={{ animationDelay: '120ms' }}>
            {hasPhoto && <SectionPhoto image={section.image} />}
            {hasVisual && <Visual kind={section.visual} />}
          </div>
        )}
      </div>
    </section>
  )
}

function ResourcesBlock() {
  const resources = DRILLING_RESOURCES
  return (
    <section className="editorial-section border-t border-white/[0.06] py-12 md:py-16">
      <h2 className="font-display text-[1.65rem] font-light text-[var(--ink)] md:text-[1.85rem]">{resources.heading}</h2>
      <p className="prose-editorial mt-4 max-w-[760px] font-body text-[1.02rem] leading-relaxed text-[var(--ink)]/72">{resources.intro}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resources.links.map(link => (
          <div
            key={link.url}
            className="toolbox-card editorial-panel editorial-shimmer group p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-medium text-[var(--ink)] group-hover:text-[#ffce8a]"
              >
                {link.label}
              </a>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--ink)]/30 transition-colors group-hover:text-[#ff8a3c]"
                aria-hidden="true"
              >
                ↗
              </a>
            </div>
            {link.cite?.length > 0 && (
              <div className="toolbox-card-cites mt-1.5 flex flex-wrap gap-x-1 gap-y-0.5">
                {link.cite.map(num => (
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
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--ink)]/60">{link.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function OverviewTracks({ tracks }) {
  if (!tracks?.length) return null
  return (
    <div className={`mt-10 grid gap-4 ${tracks.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {tracks.map(track => (
        <Link key={track.to} to={track.to} className="utes-link editorial-panel group">
          <span className="utes-link-label group-hover:text-[#ffce8a]">{track.label}</span>
          <span className="utes-link-note">{track.note}</span>
        </Link>
      ))}
    </div>
  )
}

function TopicPager({ topics, topic, hubTo, hubLabel }) {
  const topicIdx = topics.findIndex(t => t.id === topic)
  const prev = topicIdx > 0 ? topics[topicIdx - 1] : null
  const next = topicIdx >= 0 && topicIdx < topics.length - 1 ? topics[topicIdx + 1] : null

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
      {prev
        ? <Link to={prev.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← {prev.label}</Link>
        : <Link to={hubTo} className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← {hubLabel}</Link>}
      {next
        ? <Link to={next.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">{next.label} →</Link>
        : <span />}
    </div>
  )
}

export default function Drilling({ section = 'overview', topic = null }) {
  const page = DRILLING_PAGES[section]
  const topics = buildDrillingTopics(section)
  const topicSection = topic ? getDrillingTopicSection(section, topic) : null
  const isHub = (section === 'basics' || section === 'construction' || section === 'safety') && !topic
  const isTopicPage = !!topicSection
  const sectionIdx = DRILLING_SECTIONS.findIndex(s => s.id === section)
  const prevSection = sectionIdx > 0 ? DRILLING_SECTIONS[sectionIdx - 1] : null
  const nextSection = sectionIdx < DRILLING_SECTIONS.length - 1 ? DRILLING_SECTIONS[sectionIdx + 1] : null
  const [introRef, introShown] = useReveal(0.1)

  if (!page) return null

  const heroKicker = isTopicPage ? `${page.kicker} · ${topicSection.depth}` : page.kicker
  const heroTitle = isTopicPage ? topicSection.title : null
  const heroTitleLead = isTopicPage ? null : page.titleLead
  const heroTitleEmphasis = isTopicPage ? null : page.titleEmphasis
  const heroLede = isTopicPage ? null : page.lede

  return (
    <main className="drilling-page primer-topic-page">
      <header className="toolbox-hero relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
        <HeroMosaic images={HERO_IMAGES.drilling} />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="editorial-kicker">{heroKicker}</div>
          <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display">
            {isTopicPage
              ? heroTitle
              : (
                <>
                  {heroTitleLead} <span className="italic text-[#ff7a2e]">{heroTitleEmphasis}</span>
                </>
              )}
          </h1>
          {heroLede && (
            <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{heroLede}</p>
          )}
          <ProductionSubnav section="drilling" />
        </div>
      </header>

      <StickySubnav>
        <div className="mx-auto max-w-[1100px] px-6">
          <DrillingSubnav section={section} />
          {isTopicPage && (
            <TopicStripNav items={topics} currentId={topic} ariaLabel={`${page.titleLead} topics`} />
          )}
        </div>
      </StickySubnav>

      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        {isHub && page.intro?.length > 0 && (
          <section
            ref={introRef}
            className={`editorial-section py-10 md:py-12 ${introShown ? 'animate-rise' : 'opacity-0'}`}
          >
            <div className="prose-editorial max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
              {page.intro.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
            </div>
          </section>
        )}

        {isHub && (
          <section className={`editorial-section${page.intro?.length ? ' border-t border-white/[0.06] py-10 md:py-12' : ' py-10 md:py-12'}`}>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">
              {topics.length} topics · pick one
            </div>
            <TopicHubCards items={topics} />
          </section>
        )}

        {isHub && section === 'safety' && <ResourcesBlock />}

        {section === 'overview' && page.intro?.length > 0 && (
          <section
            ref={introRef}
            className={`editorial-section py-10 md:py-12 ${introShown ? 'animate-rise' : 'opacity-0'}`}
          >
            <div className="prose-editorial max-w-[760px] space-y-[18px] font-body text-[1.02rem] text-[var(--ink)]/82 md:text-[1.03rem]">
              {page.intro.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
            </div>
          </section>
        )}

        {section === 'overview' && page.tracks && (
          <section className={`editorial-section${page.intro?.length ? ' border-t border-white/[0.06] py-10 md:py-12' : ' py-10 md:py-12'}`}>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb347]/80">
              {page.tracks.length} tracks
            </div>
            <OverviewTracks tracks={page.tracks} />
          </section>
        )}

        {section === 'overview' && page.sections.map((s, index) => (
          <DrillingSection key={s.id} section={s} index={index} />
        ))}

        {isTopicPage && (
          <>
            <DrillingSection section={topicSection} index={0} solo />
            <TopicPager
              topics={topics}
              topic={topic}
              hubTo={`/projects/drilling/${section}`}
              hubLabel={`All ${section}`}
            />
          </>
        )}

        {section === 'overview' && <ResourcesBlock />}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
          {prevSection
            ? <Link to={prevSection.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← {prevSection.label}</Link>
            : <Link to="/projects" className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink)]/45 hover:text-[#ff8a3c]">← Projects</Link>}
          {nextSection
            ? <Link to={nextSection.to} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">{nextSection.label} →</Link>
            : <Link to="/projects#drilling" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">Projects lane →</Link>}
        </div>
      </div>
    </main>
  )
}
