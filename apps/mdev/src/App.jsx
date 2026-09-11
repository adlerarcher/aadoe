import { useEffect, useRef, useState } from 'react'
import GeothermalApp, { parseGeothermalPath } from './GeothermalApp.jsx'
import { asset, stripBase, withBase } from './basePath.js'

const PROGRAMS = [
  {
    id: 'geothermal',
    label: 'Geothermal',
    status: 'live',
  },
  {
    id: 'nuclear',
    label: 'Nuclear',
    status: 'soon',
  },
  {
    id: 'oil-gas',
    label: 'Oil & gas',
    status: 'soon',
  },
  {
    id: 'critical-minerals',
    label: 'Critical minerals',
    status: 'soon',
  },
]

const MOSAIC = [
  { src: asset('mosaic-1.jpg'), className: 'tile wide' },
  { src: asset('mosaic-2.jpg'), className: 'tile' },
  { src: asset('mosaic-3.jpg'), className: 'tile portrait' },
  { src: asset('mosaic-4.jpg'), className: 'tile' },
  { src: asset('mosaic-5.jpg'), className: 'tile' },
  { src: asset('mosaic-6.jpg'), className: 'tile' },
  { src: asset('mosaic-7.jpg'), className: 'tile wide' },
  { src: asset('mosaic-8.jpg'), className: 'tile' },
]

function Atmosphere({ mosaicRef, washRef }) {
  return (
    <>
      <div className="wash" aria-hidden="true" ref={washRef}>
        <img src={asset('wash.jpg')} alt="" />
      </div>
      <div className="rays" aria-hidden="true" />
      <div className="wisps" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="mosaic" aria-hidden="true" ref={mosaicRef}>
        {MOSAIC.map((tile) => (
          <div key={tile.src} className={tile.className}>
            <img src={tile.src} alt="" loading="eager" decoding="async" />
          </div>
        ))}
      </div>
    </>
  )
}

function SiteNav({ onHome }) {
  return (
    <header className="site-nav">
      <a
        className="brand"
        href={withBase('/')}
        onClick={(e) => {
          e.preventDefault()
          onHome?.()
        }}
      >
        <img src={asset('logo.png')} width="256" height="256" alt="" />
        <span className="brand-name">
          The Thermal Underground <i>MDEV</i>
        </span>
        <span className="demo-mark">Demo</span>
      </a>
    </header>
  )
}

function EnterButton({ program, onEnter }) {
  const soon = program.status === 'soon'
  const live = program.status === 'live'

  return (
    <span className={`enter-shell${soon ? ' enter-shell--soon' : ''}${live ? ' enter-shell--live' : ''}`}>
      <button
        type="button"
        className={`enter${soon ? ' enter--soon' : ''}${live ? ' enter--live' : ''}`}
        aria-label={soon ? `${program.label} — coming soon` : `Enter ${program.label}`}
        onClick={() => {
          if (live) onEnter(program.id)
        }}
      >
        <span className="enter-label">{program.label}</span>
        {soon && <span className="enter-soon">Coming soon</span>}
      </button>
    </span>
  )
}

function Landing({ onEnter }) {
  return (
    <main className="hero">
      <div className="stack">
        <div className="logo-shell rise d1">
          <span className="logo-glow" aria-hidden="true" />
          <span className="logo-glow-outer" aria-hidden="true" />
          <span className="logo-ring logo-ring--a" aria-hidden="true" />
          <span className="logo-ring logo-ring--b" aria-hidden="true" />
          <span className="logo-ring logo-ring--c" aria-hidden="true" />
          <span className="logo-spark logo-spark--1" aria-hidden="true" />
          <span className="logo-spark logo-spark--2" aria-hidden="true" />
          <span className="logo-spark logo-spark--3" aria-hidden="true" />
          <span className="logo-spark logo-spark--4" aria-hidden="true" />
          <img src={asset('logo.png')} width="256" height="256" alt="Thermal Underground" />
        </div>
        <p className="kicker rise d2">A Thermal Underground project</p>
        <h1>
          <span className="title-line rise d3">International</span>
          <span className="title-accent rise d4">Market Development</span>
        </h1>
        <span className="rule rise d5" aria-hidden="true" />
        <p className="lede rise d5">
          Country markets, recent deals, financing, and policy—so you can see where U.S. technology and services fit overseas.
        </p>
        <p className="enter-prompt rise d5">Choose a program</p>
        <div className="enter-row rise d6">
          {PROGRAMS.map((program) => (
            <EnterButton key={program.id} program={program} onEnter={onEnter} />
          ))}
        </div>
      </div>
    </main>
  )
}

function LandingFooter() {
  return (
    <footer className="page-footer">
      <p>Thermal Underground © Adler Archer.</p>
      <p className="page-footer-note disclosure-glow">
        Not an official U.S. government publication.
      </p>
    </footer>
  )
}

function programFromPath() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '') || '/'
  if (path === '/geothermal' || path.startsWith('/geothermal/')) return 'geothermal'
  if (path === '/subsurface' || path.startsWith('/subsurface/')) return 'geothermal'
  return null
}

export default function App() {
  const [program, setProgram] = useState(() => (typeof window !== 'undefined' ? programFromPath() : null))
  const mosaicRef = useRef(null)
  const washRef = useRef(null)
  const onChooser = program !== 'geothermal'

  useEffect(() => {
    const onPop = () => setProgram(programFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    // Legacy subsurface URLs → geothermal
    const path = stripBase(window.location.pathname)
    if (path === '/subsurface' || path.startsWith('/subsurface/')) {
      const next = path.replace(/^\/subsurface/, '/geothermal') || '/geothermal'
      window.history.replaceState({}, '', withBase(next))
      setProgram('geothermal')
    }
  }, [])

  useEffect(() => {
    if (!onChooser) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const mosaic = mosaicRef.current
    const wash = washRef.current
    if (!mosaic) return undefined
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 28
      ty = (e.clientY / window.innerHeight - 0.5) * 18
    }
    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      mosaic.style.transform = `translate3d(${x}px,${y}px,0)`
      if (wash) wash.style.transform = `translate3d(${x * 0.35}px,${y * 0.35}px,0)`
      raf = requestAnimationFrame(tick)
    }
    document.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [onChooser])

  const goHome = () => {
    setProgram(null)
    window.history.pushState({}, '', withBase('/'))
  }

  const enterProgram = (id) => {
    if (id !== 'geothermal') return
    setProgram(id)
    const already = parseGeothermalPath(stripBase(window.location.pathname))
    if (!already) {
      window.history.pushState({}, '', withBase('/geothermal'))
    }
    window.scrollTo(0, 0)
  }

  if (program === 'geothermal') {
    return (
      <GeothermalApp
        programs={PROGRAMS}
        onHome={goHome}
        onProgram={enterProgram}
      />
    )
  }

  return (
    <div className="page">
      <Atmosphere mosaicRef={mosaicRef} washRef={washRef} />
      <SiteNav onHome={goHome} />
      <Landing onEnter={enterProgram} />
      <LandingFooter />
    </div>
  )
}
