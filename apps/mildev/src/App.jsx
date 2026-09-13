import { useEffect, useMemo, useState } from 'react'
import { asset, stripBase, withBase } from './basePath.js'
import WorldMap from './WorldMap.jsx'
import {
  CANDIDATES,
  REGIONS,
  filterCandidates,
  hostCountries,
  inventoryStats,
} from './content/candidates.js'
import { DISCLOSURE, METHOD, SCOPE, SOURCES } from './content/method.js'
import {
  countryMarkers,
  countrySlug,
  getCountry,
  getRegion,
  regionMarkers,
} from './content/places.js'
import { RANK_SOURCE, compareByGeothermalRank } from './content/ranking.js'

const NAV = [
  { id: 'home', path: '/', label: 'Map' },
  { id: 'inventory', path: '/inventory', label: 'Inventory' },
  { id: 'sources', path: '/sources', label: 'Sources' },
]

function parseRoute() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '') || '/'
  if (path === '/') return { id: 'home' }
  if (path === '/inventory') return { id: 'inventory' }
  if (path === '/sources' || path === '/method') return { id: 'sources' }
  const country = path.match(/^\/country\/([^/]+)$/)
  if (country) return { id: 'country', slug: decodeURIComponent(country[1]) }
  const region = path.match(/^\/region\/([^/]+)$/)
  if (region) return { id: 'region', regionId: decodeURIComponent(region[1]) }
  return { id: 'home' }
}

function pushRoute(path) {
  window.history.pushState({}, '', withBase(path))
  window.scrollTo(0, 0)
}

function SiteChrome({ routeId, onNavigate, children }) {
  return (
    <div className="app-shell">
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
          <nav className="app-nav" aria-label="MILDEV">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={withBase(item.path)}
                className={routeId === item.id ? 'is-active' : undefined}
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
      {children}
      <footer className="app-footer">
        <div>
          <p>Thermal Underground © Adler Archer · MILDEV</p>
          <p style={{ marginTop: 6 }}>{DISCLOSURE}</p>
        </div>
        <p>
          Country markets: <a href="/mdev/">MDEV</a>
        </p>
      </footer>
    </div>
  )
}

function HomeMap({ onCountry }) {
  const countries = useMemo(() => countryMarkers(), [])
  const regions = useMemo(() => regionMarkers(), [])
  const [focusRegion, setFocusRegion] = useState(null)
  const stats = inventoryStats()
  const rankedHere = useMemo(
    () => countries.filter((c) => c.ranked),
    [countries],
  )
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
      <div className="map-home-copy">
        <p className="app-kicker">{SCOPE.kicker}</p>
        <h1>{SCOPE.title}</h1>
        <p className="map-home-lede">{SCOPE.lede}</p>
        <p className="map-home-meta">
          {focusMeta
            ? `${focusMeta.label}: select a country · ${focusCountries.length} host countries`
            : `${stats.total} installations · ${stats.countries} countries · click a region to zoom`}
        </p>
        {focusMeta ? (
          <div className="map-zoom-bar">
            <button type="button" className="map-zoom-out" onClick={zoomOut}>
              World map
            </button>
            <span className="map-zoom-label">{focusMeta.label}</span>
          </div>
        ) : null}
        {!focusRegion && rankedHere.length > 0 ? (
          <ol className="rank-strip">
            {rankedHere.map((c) => (
              <li key={c.slug}>
                <button type="button" onClick={() => onCountry(c.slug)}>
                  <span className="rank-num">{c.rank}</span>
                  <strong>{c.name}</strong>
                  <em>{c.count} installations</em>
                </button>
              </li>
            ))}
          </ol>
        ) : null}
        {!focusRegion ? <p className="rank-source">{RANK_SOURCE}</p> : null}
      </div>
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
    </main>
  )
}

function BaseList({ bases }) {
  return (
    <ul className="candidate-list">
      {bases.map((b) => (
        <li key={b.id} className="candidate-card">
          <div className="candidate-top">
            <h3>{b.name}</h3>
            <div className="tags">
              <span className="tag">{b.service}</span>
              {b.command ? <span className="tag">{b.command}</span> : null}
            </div>
          </div>
          <p className="service">{b.role}</p>
          <p>{b.energy}</p>
          {b.paUrl ? (
            <p className="src-line">
              <a href={b.paUrl} target="_blank" rel="noopener noreferrer">
                Public affairs ↗
              </a>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function PocList({ pocs }) {
  if (!pocs?.length) return null
  return (
    <>
      <h2 className="section-title" style={{ marginTop: 48 }}>Public points of contact</h2>
      <ul className="poc-list">
        {pocs.map((p) => (
          <li key={`${p.office}-${p.url || ''}`}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.office} ↗
              </a>
            ) : (
              <span>{p.office}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

function CountryPage({ slug, onRegion, onHome }) {
  const place = getCountry(slug)
  if (!place) {
    return (
      <main>
        <section className="app-hero">
          <div className="app-hero-copy">
            <p className="app-kicker">Country</p>
            <h1>Not found</h1>
            <p className="app-lede">
              <button type="button" className="text-link" onClick={onHome}>Return to map</button>
            </p>
          </div>
        </section>
      </main>
    )
  }

  const services = [...new Set(place.bases.map((b) => b.service))]

  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">
            <button type="button" className="text-link" onClick={onHome}>Map</button>
            {' · '}
            <button type="button" className="text-link" onClick={() => onRegion(place.regionId)}>
              {place.regionLabel}
            </button>
          </p>
          <h1>{place.name}</h1>
          <p className="app-lede">
            {place.bases.length} installations.
            {place.ranked ? ` Geothermal priority ${place.rank}.` : ''}
          </p>
        </div>
      </section>
      <section className="app-section">
        <div className="app-section-inner">
          <div className="stat-row">
            <div className="stat">
              <strong>{place.bases.length}</strong>
              <span>Installations</span>
            </div>
            <div className="stat">
              <strong>{services.length}</strong>
              <span>Services</span>
            </div>
            <div className="stat">
              <strong>{place.pocs.length}</strong>
              <span>Public offices</span>
            </div>
            {place.ranked ? (
              <div className="stat">
                <strong>{place.rank}</strong>
                <span>Geothermal priority</span>
              </div>
            ) : null}
          </div>

          <h2 className="section-title">Geothermal program</h2>
          <ul className="energy-points">
            {place.energy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="section-title" style={{ marginTop: 48 }}>Installations</h2>
          <BaseList bases={place.bases} />
          <PocList pocs={place.pocs} />
        </div>
      </section>
    </main>
  )
}

function RegionPage({ regionId, onCountry, onHome }) {
  const place = getRegion(regionId)
  if (!place) {
    return (
      <main>
        <section className="app-hero">
          <div className="app-hero-copy">
            <p className="app-kicker">Region</p>
            <h1>Not found</h1>
            <p className="app-lede">
              <button type="button" className="text-link" onClick={onHome}>Return to map</button>
            </p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">
            <button type="button" className="text-link" onClick={onHome}>Map</button>
            {' · Region'}
          </p>
          <h1>{place.label}</h1>
          <p className="app-lede">
            {place.bases.length} installations across {place.countries.length} host countries.
          </p>
        </div>
      </section>
      <section className="app-section">
        <div className="app-section-inner">
          <div className="stat-row">
            <div className="stat">
              <strong>{place.bases.length}</strong>
              <span>Installations</span>
            </div>
            <div className="stat">
              <strong>{place.countries.length}</strong>
              <span>Host countries</span>
            </div>
          </div>

          <h2 className="section-title">Geothermal program</h2>
          <ul className="energy-points">
            {place.energy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="section-title" style={{ marginTop: 48 }}>Host countries</h2>
          <ul className="country-index">
            {place.countries.map((c) => (
              <li key={c.slug}>
                <button type="button" onClick={() => onCountry(c.slug)}>
                  <strong>{c.name}</strong>
                  <span>
                    {c.count} installations
                    {c.ranked ? ` · priority ${c.rank}` : ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <h2 className="section-title" style={{ marginTop: 48 }}>Installations</h2>
          <BaseList bases={place.bases} />
        </div>
      </section>
    </main>
  )
}

function InventoryPage({ onCountry }) {
  const stats = inventoryStats()
  const countries = useMemo(() => hostCountries(), [])
  const [region, setRegion] = useState('all')
  const [country, setCountry] = useState('all')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => filterCandidates({ region, country, q }),
    [region, country, q],
  )

  const grouped = useMemo(() => {
    const map = new Map()
    for (const row of rows) {
      const key = row.hostCountry
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(row)
    }
    return [...map.entries()].sort((a, b) => compareByGeothermalRank(a[0], b[0]))
  }, [rows])

  return (
    <main>
      <section className="app-hero">
        <div className="app-hero-copy">
          <p className="app-kicker">Inventory</p>
          <h1>Inventory</h1>
          <p className="app-lede">
            {stats.total} installations across {stats.countries} host countries.
          </p>
        </div>
      </section>

      <section className="app-section">
        <div className="app-section-inner">
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
              Search
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name or service"
              />
            </label>
          </div>

          <p className="result-count">{rows.length} shown</p>

          {grouped.length === 0 ? (
            <p className="empty">No installations match these filters.</p>
          ) : (
            grouped.map(([host, items]) => (
              <div key={host} className="country-block">
                <h2>
                  <button
                    type="button"
                    className="text-link country-heading"
                    onClick={() => onCountry(countrySlug(host))}
                  >
                    {host}
                  </button>
                </h2>
                <BaseList bases={items} />
              </div>
            ))
          )}
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
          <h1>Sources</h1>
          <p className="app-lede">{RANK_SOURCE}</p>
        </div>
      </section>
      <section className="app-section">
        <div className="app-section-inner">
          <h2 className="section-title">Method</h2>
          <ol className="method-list">
            {METHOD.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2 className="section-title" style={{ marginTop: 48 }}>Sources</h2>
          <ul className="source-cards">
            {SOURCES.map((s) => (
              <li key={s.id} className="source-card">
                <h3>{s.title}</h3>
                <p>{s.note}</p>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    Open source ↗
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? parseRoute() : { id: 'home' }))

  useEffect(() => {
    const onPop = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const goHome = () => {
    pushRoute('/')
    setRoute({ id: 'home' })
  }

  const goNav = (id) => {
    const item = NAV.find((n) => n.id === id) || NAV[0]
    pushRoute(item.path)
    setRoute({ id: item.id })
  }

  const goCountry = (slug) => {
    pushRoute(`/country/${slug}`)
    setRoute({ id: 'country', slug })
  }

  const goRegion = (regionId) => {
    pushRoute(`/region/${regionId}`)
    setRoute({ id: 'region', regionId })
  }

  const routeId = route.id === 'country' || route.id === 'region' ? 'home' : route.id

  return (
    <SiteChrome routeId={routeId} onNavigate={goNav}>
      {route.id === 'home' && (
        <HomeMap onCountry={goCountry} />
      )}
      {route.id === 'country' && (
        <CountryPage slug={route.slug} onRegion={goRegion} onHome={goHome} />
      )}
      {route.id === 'region' && (
        <RegionPage regionId={route.regionId} onCountry={goCountry} onHome={goHome} />
      )}
      {route.id === 'inventory' && <InventoryPage onCountry={goCountry} />}
      {route.id === 'sources' && <SourcesPage />}
    </SiteChrome>
  )
}
