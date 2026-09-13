import { useEffect, useMemo, useRef, useState } from 'react'
import { asset, stripBase, withBase } from './basePath.js'
import {
  CANDIDATES,
  REGIONS,
  filterCandidates,
  hostCountries,
  inventoryStats,
  regionLabel,
} from './content/candidates.js'
import {
  COUNT_FRAMING,
  DISCLOSURE,
  GEOTHERMAL_LENS,
  METHOD,
  SCOPE,
  SMR_LENS,
  SOURCES,
} from './content/method.js'

const NAV = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'inventory', path: '/inventory', label: 'Inventory' },
  { id: 'geothermal', path: '/geothermal', label: 'Geothermal' },
  { id: 'smr', path: '/smr', label: 'SMR' },
  { id: 'sources', path: '/sources', label: 'Sources' },
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

function routeFromPath() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '') || '/'
  if (path === '/') return 'home'
  if (path === '/inventory') return 'inventory'
  if (path === '/geothermal') return 'geothermal'
  if (path === '/smr') return 'smr'
  if (path === '/sources' || path === '/method') return 'sources'
  return 'home'
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

function SiteNav({ route, onNavigate }) {
  return (
    <header className="site-nav">
      <a
        className="brand"
        href={withBase('/')}
        onClick={(e) => {
          e.preventDefault()
          onNavigate('home')
        }}
      >
        <img src={asset('logo.png')} width="256" height="256" alt="" />
        <span className="brand-name">
          The Thermal Underground <i>MILDEV</i>
        </span>
        <span className="demo-mark">Demo</span>
      </a>
      <nav className="top-links" aria-label="MILDEV">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={withBase(item.path)}
            className={route === item.id ? 'is-active' : undefined}
            onClick={(e) => {
              e.preventDefault()
              onNavigate(item.id)
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function LandingFooter() {
  return (
    <footer className="page-footer">
      <p>Thermal Underground © Adler Archer.</p>
      <p className="page-footer-note disclosure-glow">{DISCLOSURE}</p>
    </footer>
  )
}

function HomeLanding({ onNavigate }) {
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
        <p className="kicker rise d2">{SCOPE.kicker}</p>
        <h1>
          <span className="title-line rise d3">{SCOPE.titleLine}</span>
          <span className="title-accent rise d4">{SCOPE.titleAccent}</span>
        </h1>
        <span className="rule rise d5" aria-hidden="true" />
        <p className="lede rise d5">{SCOPE.lede}</p>
        <div className="home-actions rise d6">
          <button type="button" className="enter enter--live" onClick={() => onNavigate('inventory')}>
            <span className="enter-label">Open inventory</span>
          </button>
          <button type="button" className="enter enter--ghost" onClick={() => onNavigate('sources')}>
            <span className="enter-label">Sources & method</span>
          </button>
        </div>
        <ul className="scope-points rise d6">
          {SCOPE.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function AppHeader({ route, onNavigate }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <a
          className="app-brand"
          href={withBase('/')}
          onClick={(e) => {
            e.preventDefault()
            onNavigate('home')
          }}
        >
          <img src={asset('logo.png')} width="256" height="256" alt="" />
          <span>
            <strong>MILDEV</strong>
            <em>Thermal Underground</em>
          </span>
        </a>
        <nav className="app-nav" aria-label="Sections">
          {NAV.filter((n) => n.id !== 'home').map((item) => (
            <a
              key={item.id}
              href={withBase(item.path)}
              className={route === item.id ? 'is-active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function AppFooter() {
  return (
    <footer className="app-footer">
      <div>
        <p>Thermal Underground © Adler Archer · MILDEV</p>
        <p className="disclosure-glow" style={{ marginTop: 6 }}>{DISCLOSURE}</p>
      </div>
      <p>
        Country markets: <a href="/mdev/">MDEV</a>
      </p>
    </footer>
  )
}

function InventoryPage() {
  const stats = inventoryStats()
  const countries = useMemo(() => hostCountries(), [])
  const [region, setRegion] = useState('all')
  const [country, setCountry] = useState('all')
  const [lens, setLens] = useState('all')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => filterCandidates({ region, country, lens, q }),
    [region, country, lens, q],
  )

  const grouped = useMemo(() => {
    const map = new Map()
    for (const row of rows) {
      const key = row.hostCountry
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(row)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [rows])

  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">Candidate inventory</p>
          <h1>
            Public <span>starter set</span>
          </h1>
          <p className="app-lede">
            {stats.total} named installations across {stats.countries} host countries.
            Broad public site tallies run near {COUNT_FRAMING.sitesBallpark}; CRS-style major-base tallies near {COUNT_FRAMING.basesBallpark}.
            This list is a curated subset for energy screening, not a complete force map.
          </p>
          <p className="draft-note">{COUNT_FRAMING.starterNote}</p>
        </div>
      </section>

      <section className="app-section">
        <div className="app-section-inner">
          <div className="stat-row">
            <div className="stat">
              <strong>{stats.total}</strong>
              <span>Seeded candidates</span>
            </div>
            <div className="stat">
              <strong>{stats.geothermal}</strong>
              <span>Geothermal lens</span>
            </div>
            <div className="stat">
              <strong>{stats.smr}</strong>
              <span>SMR lens</span>
            </div>
            <div className="stat">
              <strong>{stats.countries}</strong>
              <span>Host countries</span>
            </div>
          </div>

          <div className="filters">
            <label>
              Region
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="all">All regions</option>
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
            <label>
              Host country
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="all">All countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Lens
              <select value={lens} onChange={(e) => setLens(e.target.value)}>
                <option value="all">Any</option>
                <option value="geothermal">Geothermal</option>
                <option value="smr">SMR</option>
              </select>
            </label>
            <label>
              Search
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name or note"
              />
            </label>
          </div>

          <p className="result-count">{rows.length} shown · incomplete by design</p>

          {grouped.length === 0 ? (
            <p className="empty">No candidates match these filters.</p>
          ) : (
            grouped.map(([host, items]) => (
              <div key={host} className="country-block">
                <h2>{host}</h2>
                <ul className="candidate-list">
                  {items.map((c) => (
                    <li key={c.id} className="candidate-card">
                      <div className="candidate-top">
                        <h3>{c.name}</h3>
                        <div className="tags">
                          <span className="tag">{regionLabel(c.region)}</span>
                          {c.geothermalLens && <span className="tag tag-geo">Geothermal</span>}
                          {c.smrLens && <span className="tag tag-smr">SMR</span>}
                        </div>
                      </div>
                      <p className="service">{c.serviceNote}</p>
                      <p>{c.note}</p>
                      <p className="src-line">Sources: {c.sources.join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

function LensPage({ content, accent }) {
  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">Opportunity lens</p>
          <h1>
            {content.title.split(' ')[0]} <span>{content.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="app-lede">{content.lede}</p>
        </div>
      </section>
      <section className="app-section">
        <div className="app-section-inner">
          <ul className={`lens-points lens-points--${accent}`}>
            {content.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="draft-note">
            Lens tags on inventory rows mark screening relevance. They do not mean a project exists, is funded, or is approved.
          </p>
        </div>
      </section>
    </main>
  )
}

function SourcesPage() {
  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">Method</p>
          <h1>
            Sources & <span>limits</span>
          </h1>
          <p className="app-lede">
            MILDEV is built from public open sources. It is a venture research product of Thermal Underground, not a government release.
          </p>
        </div>
      </section>
      <section className="app-section">
        <div className="app-section-inner">
          <h2 className="section-title">How rows are chosen</h2>
          <ol className="method-list">
            {METHOD.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2 className="section-title" style={{ marginTop: 48 }}>Public source classes</h2>
          <ul className="source-cards">
            {SOURCES.map((s) => (
              <li key={s.id} className="source-card">
                <h3>{s.title}</h3>
                <p>{s.note}</p>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    Open source class ↗
                  </a>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="draft-note" style={{ marginTop: 36 }}>
            Starter inventory size: {CANDIDATES.length} named installations.
            Do not treat this as the {COUNT_FRAMING.basesBallpark} base figure or the {COUNT_FRAMING.sitesBallpark} site figure.
          </p>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? routeFromPath() : 'home'))
  const mosaicRef = useRef(null)
  const washRef = useRef(null)
  const onLanding = route === 'home'

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (!onLanding) return undefined
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
  }, [onLanding])

  const navigate = (id) => {
    const item = NAV.find((n) => n.id === id) || NAV[0]
    setRoute(item.id)
    window.history.pushState({}, '', withBase(item.path))
    window.scrollTo(0, 0)
  }

  if (onLanding) {
    return (
      <div className="page">
        <Atmosphere mosaicRef={mosaicRef} washRef={washRef} />
        <SiteNav route={route} onNavigate={navigate} />
        <HomeLanding onNavigate={navigate} />
        <LandingFooter />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <AppHeader route={route} onNavigate={navigate} />
      {route === 'inventory' && <InventoryPage />}
      {route === 'geothermal' && <LensPage content={GEOTHERMAL_LENS} accent="geo" />}
      {route === 'smr' && <LensPage content={SMR_LENS} accent="smr" />}
      {route === 'sources' && <SourcesPage />}
      <AppFooter />
    </div>
  )
}
