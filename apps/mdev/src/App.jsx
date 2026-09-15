import { useEffect, useMemo, useRef, useState } from 'react'
import GeothermalApp, { parseGeothermalPath } from './GeothermalApp.jsx'
import WorldMap from './WorldMap.jsx'
import { asset, stripBase, withBase } from './basePath.js'
import { SCOPE, DISCLOSURE } from './content/basesMethod.js'
import { countryMarkers, countryPath, inventoryStats, regionMarkers } from './content/mapData.js'

const PROGRAMS = [
  { id: 'geothermal', label: 'Geothermal', status: 'live' },
  { id: 'nuclear', label: 'Nuclear', status: 'soon' },
  { id: 'oil-gas', label: 'Oil & gas', status: 'soon' },
  { id: 'critical-minerals', label: 'Critical minerals', status: 'soon' },
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

function parseAppRoute() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '') || '/'

  if (path === '/' || path === '') return { kind: 'chooser' }

  if (path === '/geothermal') return { kind: 'map' }

  if (path === '/geothermal/markets' || path.startsWith('/geothermal/markets/')) {
    return { kind: 'geothermal', route: parseGeothermalPath(path) || { view: 'markets', slug: null } }
  }
  if (path === '/geothermal/developments' || path === '/geothermal/methodology') {
    return { kind: 'geothermal', route: parseGeothermalPath(path) || { view: 'developments', slug: null } }
  }
  if (
    path === '/geothermal/policy-financing'
    || path === '/geothermal/us-engagement'
    || path === '/geothermal/us-domestic'
  ) {
    return { kind: 'map', redirect: '/geothermal' }
  }

  if (path.startsWith('/geothermal/')) {
    return { kind: 'geothermal', route: parseGeothermalPath(path) || { view: 'markets', slug: null } }
  }

  if (path === '/subsurface' || path.startsWith('/subsurface/')) {
    const next = path.replace(/^\/subsurface/, '/geothermal') || '/geothermal'
    if (next === '/geothermal') return { kind: 'map', redirect: '/geothermal' }
    return {
      kind: 'geothermal',
      route: parseGeothermalPath(next) || { view: 'markets', slug: null },
      redirect: next,
    }
  }

  const country = path.match(/^\/country\/([^/]+)$/)
  if (country) {
    const slug = decodeURIComponent(country[1]).toLowerCase()
    return {
      kind: 'geothermal',
      route: { view: 'country', slug },
      redirect: `/geothermal/markets/${slug}`,
    }
  }

  return { kind: 'chooser' }
}

function go(path) {
  window.history.pushState({}, '', withBase(path))
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

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

function ChooserNav({ onHome }) {
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
        aria-label={soon ? `${program.label}, coming soon` : `Enter ${program.label}`}
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
          Country markets, recent deals, financing, and policy so you can see where U.S. technology and services fit overseas.
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

function SiteChrome({ children, active, onNavigate }) {
  const go = (path) => {
    if (onNavigate) {
      onNavigate(path)
      return
    }
    window.history.pushState({}, '', withBase(path))
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo(0, 0)
  }

  return (
    <div className={`app-shell${active === 'map' ? ' app-shell--map' : ''}`}>
      <header className="app-header">
        <div className="app-header-inner">
          <a
            className="app-brand"
            href={withBase('/')}
            onClick={(e) => {
              e.preventDefault()
              go('/')
            }}
          >
            <img src={asset('logo.png')} width="256" height="256" alt="" />
            <span>
              <strong>MDEV</strong>
              <em>Thermal Underground</em>
            </span>
          </a>
          <nav className="app-nav" aria-label="Geothermal">
            <a
              href={withBase('/geothermal')}
              className={active === 'map' ? 'is-active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go('/geothermal')
              }}
            >
              Map
            </a>
            <a
              href={withBase('/geothermal/markets')}
              className={active === 'markets' ? 'is-active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go('/geothermal/markets')
              }}
            >
              Markets
            </a>
            <a
              href={withBase('/geothermal/developments')}
              className={active === 'developments' ? 'is-active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go('/geothermal/developments')
              }}
            >
              Developments
            </a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="app-footer">
        <div>
          <p>Thermal Underground © Adler Archer · MDEV</p>
          <p style={{ marginTop: 6 }}>{DISCLOSURE}</p>
        </div>
      </footer>
    </div>
  )
}

function CountryLink({ slug, className, onOpen, children }) {
  return (
    <a
      href={withBase(countryPath(slug))}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onOpen(slug)
      }}
    >
      {children}
    </a>
  )
}

function HomeMap({ onCountry }) {
  const countries = useMemo(() => countryMarkers(), [])
  const regions = useMemo(() => regionMarkers(), [])
  const [focusRegion, setFocusRegion] = useState(null)
  const stats = inventoryStats()

  const focusMeta = useMemo(
    () => (focusRegion ? regions.find((r) => r.id === focusRegion) : null),
    [focusRegion, regions],
  )
  const focusCountries = useMemo(
    () => (focusRegion ? countries.filter((c) => c.region === focusRegion) : []),
    [countries, focusRegion],
  )

  const zoomOut = () => setFocusRegion(null)

  useEffect(() => {
    if (!focusRegion) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') zoomOut()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusRegion])

  return (
    <main className="map-home">
      <div className="map-stage">
        <WorldMap
          countries={countries}
          regions={regions}
          focusRegion={focusRegion}
          onFocusRegion={setFocusRegion}
          onCountry={onCountry}
          onZoomOut={zoomOut}
        />
      </div>
      <aside className="map-home-copy">
        <h1>{SCOPE.title}</h1>
        <p className="map-home-lede">{SCOPE.lede}</p>

        {!focusRegion ? (
          <dl className="home-facts">
            <div>
              <dt>{countries.filter((c) => c.hasMarket).length}</dt>
              <dd>Country profiles</dd>
            </div>
            <div>
              <dt>{stats.total}</dt>
              <dd>Installations</dd>
            </div>
            <div>
              <dt>{stats.countries}</dt>
              <dd>Host countries</dd>
            </div>
            <div>
              <dt>{regions.length}</dt>
              <dd>Regions</dd>
            </div>
          </dl>
        ) : null}

        {focusMeta ? (
          <div className="map-zoom-bar">
            <button type="button" className="map-zoom-out" onClick={zoomOut}>
              World map
            </button>
            <span className="map-zoom-label">{focusMeta.label}</span>
          </div>
        ) : null}

        {focusMeta ? (
          <ul className="focus-country-list">
            {focusCountries.map((c) => (
              <li key={c.slug}>
                <CountryLink slug={c.slug} onOpen={onCountry}>
                  {c.image ? <img src={c.image} alt="" loading="lazy" decoding="async" /> : null}
                  <span>
                    <strong>{c.name}</strong>
                    <em>
                      {c.hasInstallations
                        ? `${c.count} installation${c.count === 1 ? '' : 's'}`
                        : 'Market profile'}
                    </em>
                  </span>
                </CountryLink>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
      <p className="map-home-disclosure">{DISCLOSURE}</p>
    </main>
  )
}

function ProgramChooser({ onEnter, onHome }) {
  const mosaicRef = useRef(null)
  const washRef = useRef(null)

  useEffect(() => {
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
  }, [])

  return (
    <div className="page">
      <Atmosphere mosaicRef={mosaicRef} washRef={washRef} />
      <ChooserNav onHome={onHome} />
      <Landing onEnter={onEnter} />
      <LandingFooter />
    </div>
  )
}

export default function App() {
  const [appRoute, setAppRoute] = useState(() => (typeof window !== 'undefined' ? parseAppRoute() : { kind: 'chooser' }))

  useEffect(() => {
    const sync = () => setAppRoute(parseAppRoute())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  useEffect(() => {
    const current = parseAppRoute()
    if (current.redirect) {
      window.history.replaceState({}, '', withBase(current.redirect))
      setAppRoute(parseAppRoute())
    }
  }, [])

  const openCountry = (slug) => {
    const path = countryPath(slug)
    window.history.pushState({}, '', withBase(path))
    setAppRoute(parseAppRoute())
    window.scrollTo(0, 0)
  }

  const goChooser = () => {
    window.history.pushState({}, '', withBase('/'))
    setAppRoute({ kind: 'chooser' })
    window.scrollTo(0, 0)
  }

  const goMap = () => {
    window.history.pushState({}, '', withBase('/geothermal'))
    setAppRoute({ kind: 'map' })
    window.scrollTo(0, 0)
  }

  const enterProgram = (id) => {
    if (id !== 'geothermal') return
    goMap()
  }

  if (appRoute.kind === 'chooser') {
    return <ProgramChooser onEnter={enterProgram} onHome={goChooser} />
  }

  if (appRoute.kind === 'geothermal') {
    const view = appRoute.route?.view
    const active = view === 'developments' ? 'developments' : 'markets'
    return (
      <SiteChrome active={active}>
        <GeothermalApp onHome={goMap} embedded />
      </SiteChrome>
    )
  }

  return (
    <SiteChrome active="map">
      <HomeMap onCountry={openCountry} />
    </SiteChrome>
  )
}
