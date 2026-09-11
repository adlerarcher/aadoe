import { useEffect, useRef, useState } from 'react'
import { PERMITTING_NOTES, getPermittingNote, permittingNotePath, PERMITTING_NOTES_ANCHOR } from './content.jsx'
import { Link } from './router.jsx'
import { ProseP } from './Prose.jsx'
import { PermittingSubnav } from './Permitting.jsx'

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

export default function PermittingNote({ slug }) {
  const [ref, shown] = useReveal()
  const resolvedSlug = slug === 'nhpa-section-106' ? 'section-106' : slug
  const entry = getPermittingNote(resolvedSlug)

  if (!entry) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="font-display text-6xl font-light text-[var(--ink)]">404</div>
        <p className="mt-4 font-body text-[var(--ink)]/65">That note does not exist.</p>
        <Link to={PERMITTING_NOTES_ANCHOR} className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">Back to permitting notes →</Link>
      </div>
    )
  }

  const idx = PERMITTING_NOTES.findIndex(e => e.slug === resolvedSlug)
  const prev = idx < PERMITTING_NOTES.length - 1 ? PERMITTING_NOTES[idx + 1] : null
  const next = idx > 0 ? PERMITTING_NOTES[idx - 1] : null

  return (
    <main className="permitting-page">
      <header className="permitting-hero px-6 pt-36 pb-8 md:pt-44 md:pb-10">
        <div className="mx-auto max-w-[1100px]">
          <Link to={PERMITTING_NOTES_ANCHOR} className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">← Permitting notes</Link>
          <div className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--ink)]/45">{entry.kicker}</div>
          <h1 className="mt-4 font-display text-[2.4rem] font-light leading-[0.95] tracking-tight text-[var(--ink)] md:text-[3rem] editorial-display">{entry.title}</h1>
          <PermittingSubnav section="people" />
        </div>
      </header>
      <div ref={ref} className={`mx-auto max-w-[1100px] px-6 pb-24 ${shown ? 'animate-rise' : 'opacity-0'}`}>
        <div className="prose-editorial max-w-[760px] space-y-5 font-body text-[1.05rem] text-[var(--ink)]/78 md:text-lg">
          {entry.body.map((p, i) => <ProseP key={i}>{p}</ProseP>)}
        </div>
        {entry.guideLink && (
          <Link to={entry.guideLink.to} className="permitting-note-guide editorial-panel mt-8 block max-w-[760px] p-5 transition-transform hover:-translate-y-0.5">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#ff8a3c]">In the permitting guide</div>
            <div className="mt-2 font-body text-sm leading-snug text-[var(--ink)]">{entry.guideLink.label} →</div>
          </Link>
        )}
        {(entry.links?.length > 0 || entry.link) && (
          <div className="mt-6 flex flex-col gap-2">
            {(entry.links || (entry.link ? [entry.link] : [])).map(link => (
              link.to
                ? <Link key={link.to} to={link.to} className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">{link.label} →</Link>
                : <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a3c] hover:text-[#ffb347]">{link.label} ↗</a>
            ))}
          </div>
        )}
        {(prev || next) && (
          <nav className="mt-16 grid gap-4 border-t border-white/[0.06] pt-10 sm:grid-cols-2">
            {prev ? (
              <Link to={permittingNotePath(prev)} className="editorial-panel group p-5 transition-transform hover:-translate-y-0.5">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">Previous</div>
                <div className="mt-2 font-body text-sm leading-snug text-[var(--ink)] group-hover:text-[#ffce8a]">{prev.title}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={permittingNotePath(next)} className="editorial-panel group p-5 text-right transition-transform hover:-translate-y-0.5 sm:col-start-2">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--ink)]/40">Next</div>
                <div className="mt-2 font-body text-sm leading-snug text-[var(--ink)] group-hover:text-[#ffce8a]">{next.title}</div>
              </Link>
            ) : null}
          </nav>
        )}
      </div>
    </main>
  )
}
