import { useEffect, useMemo, useState } from 'react'
import { asset, stripBase, withBase } from './basePath.js'
import WorldMap from './WorldMap.jsx'
import {
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
  ringOfFireMarkers,
  ringOfFireStrip,
} from './content/places.js'
import {
  GEOTHERMAL_RANK,
  RANK_SOURCE,
  compareByGeothermalRank,
} from './content/ranking.js'

const NAV = [
  { id: 'home', path: '/', label: 'Map' },
  { id: 'inventory', path: '/inventory', label: 'Inventory' },
  { id: 'sources', path: '/sources', label: 'Sources' },
]

function parseRoute() {
  let path = stripBase(window.location.pathname)
  path = path.replace(/\/index\.html$/i, '')
  path = path.replace(/\/+$/, '') || '/'
  if (path === '/') return { id: 'home' }
  if (path === '/inventory') return { id: 'inventory' }
  if (path === '/sources' || path === '/method') return { id: 'sources' }
  const country = path.match(/^\/country\/([^/]+)$/)
  if (country) return { id: 'country', slug: decodeURIComponent(country[1]).toLowerCase() }
  const region = path.match(/^\/region\/([^/]+)$/)
  if (region) return { id: 'region', regionId: decodeURIComponent(region[1]) }
  return { id: 'home' }
}

function CountryLink({ slug, className, onOpen, children }) {
  return (
    <a
      href={withBase(`/country/${encodeURIComponent(slug)}`)}
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
          Market profiles: <a href="/mdev/">MDEV</a>
        </p>
      </footer>
    </div>
  )
}

function HomeMap({ onCountry }) {
  const countries = useMemo(() => countryMarkers(), [])
  const ringCountries = useMemo(() => ringOfFireMarkers(), [])
  const regions = useMemo(() => regionMarkers(), [])
  const ringStrip = useMemo(() => ringOfFireStrip(), [])
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
  const focusRing = useMemo(
    () => (focusRegion ? ringCountries.filter((c) => c.region === focusRegion) : []),
    [ringCountries, focusRegion],
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

        {!focusRegion ? (
          <dl className="home-facts">
            <div>
              <dt>{stats.total}</dt>
              <dd>Installations</dd>
            </div>
            <div>
              <dt>{stats.countries}</dt>
              <dd>Host countries</dd>
            </div>
            <div>
              <dt>{GEOTHERMAL_RANK.length}</dt>
              <dd>Ring of Fire hosts</dd>
            </div>
            <div>
              <dt>{regions.length}</dt>
              <dd>Regions</dd>
            </div>
          </dl>
        ) : null}

        <p className="map-home-meta">
          {focusMeta
            ? `${focusMeta.label}: select a country · ${focusCountries.length} with installations${focusRing.length ? ` · ${focusRing.length} Ring of Fire hosts` : ''}`
            : `${stats.total} installations · click a region, then a country`}
        </p>

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
                  <strong>{c.name}</strong>
                  <em>
                    {c.count} installations
                    {c.ranked ? ` · Ring of Fire ${c.rank}` : ''}
                  </em>
                </CountryLink>
              </li>
            ))}
            {focusRing.map((c) => (
              <li key={`ring-${c.slug}`} className="is-ring-only">
                <CountryLink slug={c.slug} onOpen={onCountry}>
                  <strong>{c.name}</strong>
                  <em>Ring of Fire {c.rank}</em>
                </CountryLink>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h2 className="home-strip-title">Pacific Ring of Fire</h2>
            <ol className="rank-strip">
              {ringStrip.map((c) => (
                <li key={c.slug}>
                  <CountryLink
                    slug={c.slug}
                    className={c.hasInstallations ? undefined : 'rank-chip'}
                    onOpen={onCountry}
                  >
                    <span className="rank-num">{c.rank}</span>
                    <strong>{c.name}</strong>
                    <em>{c.hasInstallations ? `${c.count} installations` : 'Geothermal host'}</em>
                  </CountryLink>
                </li>
              ))}
            </ol>
            <p className="rank-source">{RANK_SOURCE}</p>
          </>
        )}
      </div>
      <div className="map-stage">
        <WorldMap
          countries={countries}
          ringCountries={ringCountries}
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
            <h3>
              {b.paUrl ? (
                <a href={b.paUrl} target="_blank" rel="noopener noreferrer">
                  {b.name} ↗
                </a>
              ) : (
                b.name
              )}
            </h3>
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
                Official page ↗
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
            {place.ranked ? ` Ring of Fire ${place.rank}.` : ''}
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
                <span>Ring of Fire</span>
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
          {place.bases.length ? (
            <BaseList bases={place.bases} />
          ) : (
            <p className="empty">No named U.S. installations in this inventory.</p>
          )}
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
            {place.ringCountries.length ? (
              <div className="stat">
                <strong>{place.ringCountries.length}</strong>
                <span>Ring of Fire</span>
              </div>
            ) : null}
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
                <CountryLink slug={c.slug} onOpen={onCountry}>
                  <strong>{c.name}</strong>
                  <span>
                    {c.count} installations
                    {c.ranked ? ` · Ring of Fire ${c.rank}` : ''}
                  </span>
                </CountryLink>
              </li>
            ))}
          </ul>

          {place.ringCountries.some((c) => !c.hasInstallations) ? (
            <>
              <h2 className="section-title" style={{ marginTop: 48 }}>Ring of Fire hosts</h2>
              <ul className="country-index">
                {place.ringCountries
                  .filter((c) => !c.hasInstallations)
                  .map((c) => (
                    <li key={`ring-${c.slug}`}>
                      <CountryLink slug={c.slug} onOpen={onCountry}>
                        <strong>{c.name}</strong>
                        <span>Ring of Fire {c.rank}</span>
                      </CountryLink>
                    </li>
                  ))}
              </ul>
            </>
          ) : null}

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
                  <CountryLink
                    slug={countrySlug(host)}
                    className="text-link country-heading"
                    onOpen={onCountry}
                  >
                    {host}
                  </CountryLink>
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
    const id = String(slug || '').toLowerCase()
    pushRoute(`/country/${encodeURIComponent(id)}`)
    setRoute({ id: 'country', slug: id })
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
