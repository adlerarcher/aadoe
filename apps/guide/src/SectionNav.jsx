import { useEffect, useState } from 'react'
import { Link } from './router.jsx'

/** Sticky wrapper for topic-level subnav (Drilling 101 · Basics · Safety). */
export function StickySubnav({ children, className = '' }) {
  return (
    <div className={`sticky-subnav ${className}`.trim()}>
      {children}
    </div>
  )
}

/** Horizontal jump links for in-page or cross-route sections. */
export function SectionJumpNav({ label = 'On this page', items, activeId, className = '' }) {
  if (!items?.length) return null
  return (
    <nav className={`section-jump editorial-panel ${className}`.trim()} aria-label={label}>
      <div className="section-jump-label font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#ff8a3c]">
        {label}
      </div>
      <div className="section-jump-items mt-3">
        {items.map(item => (
          item.to
            ? (
              <Link
                key={item.id}
                to={item.to}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`section-jump-item${activeId === item.id ? ' section-jump-item-active' : ''}`}
              >
                {item.label}
              </Link>
            )
            : (
              <button
                key={item.id}
                type="button"
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`section-jump-item${activeId === item.id ? ' section-jump-item-active' : ''}`}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {item.label}
              </button>
            )
        ))}
      </div>
    </nav>
  )
}

/** Card grid linking to topic routes (Basics / Safety hubs). */
export function TopicHubCards({ items }) {
  if (!items?.length) return null
  return (
    <div className="topic-hub-grid mt-8 grid gap-3 sm:grid-cols-2">
      {items.map(item => (
        <Link key={item.id} to={item.to} className="utes-link editorial-panel group">
          {item.kicker && (
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#ffb347]/70">{item.kicker}</span>
          )}
          <span className="utes-link-label group-hover:text-[#ffce8a]">{item.label}</span>
          {item.note && <span className="utes-link-note">{item.note}</span>}
        </Link>
      ))}
    </div>
  )
}

/** Topic strip under hero on single-topic pages. */
export function TopicStripNav({ items, currentId, ariaLabel = 'Topics' }) {
  if (!items?.length) return null
  return (
    <nav className="topic-strip" aria-label={ariaLabel}>
      {items.map(item => (
        <Link
          key={item.id}
          to={item.to}
          aria-current={currentId === item.id ? 'true' : undefined}
          className={`topic-strip-link${currentId === item.id ? ' topic-strip-link-active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

/** Track which anchor section is in view (for long single-page fallbacks). */
export function useSectionSpy(sectionIds, rootMargin = '-20% 0px -55% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return undefined
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return undefined

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds, rootMargin])

  return activeId
}
