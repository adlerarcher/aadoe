import { useEffect, useMemo, useState } from 'react'
import GeothermalApp, { parseGeothermalPath } from './GeothermalApp.jsx'
import WorldMap from './WorldMap.jsx'
import { asset, stripBase, withBase } from './basePath.js'
import { SCOPE, DISCLOSURE } from './content/basesMethod.js'
import { countryMarkers, countryPath, inventoryStats, regionMarkers } from './content/mapData.js'

function parseAppRoute() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '') || '/'
  if (path === '/' || path === '') return { kind: 'map' }
  if (path === '/geothermal' || path.startsWith('/geothermal/')) {
    return { kind: 'geothermal', route: parseGeothermalPath(path) || { view: 'home', slug: null } }
  }
  if (path === '/subsurface' || path.startsWith('/subsurface/')) {
    const next = path.replace(/^\/subsurface/, '/geothermal') || '/geothermal'
    return { kind: 'geothermal', route: parseGeothermalPath(next) || { view: 'home', slug: null }, redirect: next }
  }
  // Legacy MILDEV country deep links
  const country = path.match(/^\/country\/([^/]+)$/)
  if (country) {
    const slug = decodeURIComponent(country[1]).toLowerCase()
    return {
      kind: 'geothermal',
      route: { view: 'country', slug },
      redirect: `/geothermal/markets/${slug}`,
    }
  }
  return { kind: 'map' }
}

function SiteChrome({ children, active }) {
  const go = (path) => {
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
          <nav className="app-nav" aria-label="MDEV">
            <a
              href={withBase('/')}
              className={active === 'map' ? 'is-active' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go('/')
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
          ringCountries={[]}
          regions={regions}
          focusRegion={focusRegion}
          onFocusRegion={setFocusRegion}
          onCountry={onCountry}
          onZoomOut={zoomOut}
        />
      </div>
      <aside className="map-home-copy">
        <p className="app-kicker">{SCOPE.kicker}</p>
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

        <p className="map-home-meta">
          {focusMeta
            ? `${focusMeta.label}: select a country · ${focusCountries.length} on the map`
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
                    {c.hasInstallations
                      ? `${c.count} installation${c.count === 1 ? '' : 's'}`
                      : 'Market profile'}
                  </em>
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

export default function App() {
  const [appRoute, setAppRoute] = useState(() => (typeof window !== 'undefined' ? parseAppRoute() : { kind: 'map' }))

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

  const goMap = () => {
    window.history.pushState({}, '', withBase('/'))
    setAppRoute({ kind: 'map' })
    window.scrollTo(0, 0)
  }

  if (appRoute.kind === 'geothermal') {
    const view = appRoute.route?.view
    const active =
      view === 'developments' ? 'developments' : view === 'markets' || view === 'country' ? 'markets' : 'markets'
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
