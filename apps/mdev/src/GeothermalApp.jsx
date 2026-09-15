import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DEVELOPMENTS,
  REGIONS,
  APPLICATIONS,
  DEVELOPMENT_TYPES,
  DISCLOSURE,
  marketById,
  developmentsForMarket,
  publishedMarkets,
  geothermalMarkets,
  basesForMarket,
  docsFor,
  formatDate,
  regionLabel,
} from './content/geothermal.js'
import { asset, stripBase, withBase } from './basePath.js'

const HERO_IMAGES = [
  asset('mosaic-1.jpg'),
  asset('mosaic-2.jpg'),
  asset('mosaic-3.jpg'),
  asset('mosaic-4.jpg'),
  asset('mosaic-5.jpg'),
  asset('mosaic-6.jpg'),
  asset('mosaic-7.jpg'),
  asset('mosaic-8.jpg'),
]

export function parseGeothermalPath(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/'
  if (path === '/geothermal/markets') return { view: 'markets', slug: null }
  if (path.startsWith('/geothermal/markets/')) {
    return { view: 'country', slug: path.slice('/geothermal/markets/'.length) }
  }
  if (path === '/geothermal/developments') return { view: 'developments', slug: null }
  if (path === '/geothermal/methodology') return { view: 'methodology', slug: null }
  return null
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, shown]
}

function SourceList({ docIds }) {
  const docs = docsFor(docIds)
  if (!docs.length) return null
  return (
    <ul className="geo-sources">
      {docs.map((doc) => (
        <li key={doc.id}>
          <a href={doc.url} target="_blank" rel="noopener noreferrer">
            {doc.title} ↗
          </a>
          {doc.publicationDate && (
            <span className="geo-meta"> · {formatDate(doc.publicationDate)}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function HeroMosaic({ images }) {
  if (!images?.length) return null
  return (
    <>
      <div className="geo-hero-mosaic" aria-hidden="true">
        {images.slice(0, 6).map((src, i) => (
          <div key={src} className="geo-hero-tile" style={{ '--hero-i': i }}>
            <img src={src} alt="" loading="eager" decoding="async" />
          </div>
        ))}
      </div>
      <div className="geo-hero-vignette" aria-hidden="true" />
    </>
  )
}

function GuideCard({ item, index, navigate }) {
  const [ref, shown] = useReveal(0.08)
  return (
    <a
      ref={ref}
      href={item.path}
      className={`geo-guide-card editorial-panel editorial-shimmer home-door-card group${shown ? ' is-shown' : ''}`}
      style={{ animationDelay: `${index * 70}ms`, '--door-i': index }}
      onClick={(e) => {
        e.preventDefault()
        navigate(item.path)
      }}
    >
      <div className="geo-guide-media">
        <img src={item.image} alt="" loading="lazy" decoding="async" />
        <div className="geo-guide-media-shade" />
      </div>
      <div className="geo-guide-body">
        <div className="editorial-kicker">{item.kicker}</div>
        <h2>{item.title}</h2>
        <p>{item.lede}</p>
        <span className="geo-guide-arrow">Read →</span>
      </div>
    </a>
  )
}

function MarketCard({ market, index, navigate }) {
  const [ref, shown] = useReveal(0.08)
  return (
    <button
      ref={ref}
      type="button"
      className={`geo-market-card editorial-panel editorial-shimmer home-door-card group${shown ? ' is-shown' : ''}`}
      style={{ animationDelay: `${index * 55}ms`, '--door-i': index }}
      onClick={() => navigate(`/geothermal/markets/${market.id}`)}
    >
      <div className="geo-market-card-media">
        <img src={market.image} alt="" loading="lazy" decoding="async" />
        <div className="geo-guide-media-shade" />
      </div>
      <div className="geo-market-card-body">
        <span className="geo-market-name">
          {market.name}
          {market.asiaPacificPriority && <span className="geo-badge geo-badge-soft">Asia-Pacific</span>}
        </span>
        <span className="geo-market-apps">
          {market.applications.map((a) => APPLICATIONS.find((x) => x.id === a)?.label).filter(Boolean).join(' · ')}
        </span>
        <span className="geo-guide-arrow">Open profile →</span>
      </div>
    </button>
  )
}

function CountrySwitcher({ route, navigate }) {
  const [open, setOpen] = useState(false)
  const current = route.view === 'country' ? marketById(route.slug) : null
  const markets = publishedMarkets()

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (!e.target.closest('.country-switch')) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [open])

  return (
    <div className={`country-switch${open ? ' country-switch-open' : ''}`}>
      <button
        type="button"
        className="country-switch-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="country-switch-label">Country</span>
        <strong>{current?.name || 'Select a market'}</strong>
        <span className="country-switch-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="country-switch-menu" role="listbox">
          {REGIONS.map((region) => {
            const regionMarkets = markets.filter((m) => m.region === region.id)
            if (!regionMarkets.length) return null
            return (
              <div key={region.id} className="country-switch-group">
                <p className="country-switch-group-label">{region.label}</p>
                <ul>
                  {regionMarkets.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={current?.id === m.id}
                        className={`country-switch-item${current?.id === m.id ? ' is-active' : ''}`}
                        onClick={() => {
                          setOpen(false)
                          navigate(`/geothermal/markets/${m.id}`)
                        }}
                      >
                        <img src={m.image} alt="" loading="lazy" decoding="async" />
                        <span>
                          <strong>{m.name}</strong>
                          <em>
                            {m.applications.map((a) => APPLICATIONS.find((x) => x.id === a)?.label).filter(Boolean).join(' · ')}
                          </em>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


function Header({ route, navigate, onHome }) {
  return (
    <div className="geo-subnav">
      <CountrySwitcher route={route} navigate={navigate} />
      <button type="button" className="back-link" onClick={onHome}>
        ← Map
      </button>
    </div>
  )
}

function Footer() {
  return null
}



function HomePage({ navigate }) {
  const recent = [...DEVELOPMENTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  const [feedRef, feedShown] = useReveal(0.1)
  const featured = publishedMarkets()

  return (
    <>
      <section className="geo-entry-hero">
        <HeroMosaic images={HERO_IMAGES} />
        <div className="geo-entry-hero-inner">
          <p className="app-kicker rise d2">International · Geothermal</p>
          <h1 className="rise d3">
            <span className="geo-entry-title-line">International</span>
            <span className="geo-entry-title-accent">Geothermal Markets</span>
          </h1>
          <span className="geo-entry-rule rise d4" aria-hidden="true" />
          <p className="app-lede rise d5">
            Explore geothermal projects, policy, and financing around the world. Open a country profile for sourced applications, buyers, and developments.
          </p>
          <div className="app-cta-row rise d6">
            <a
              href={withBase('/geothermal/markets')}
              className="app-cta"
              onClick={(e) => {
                e.preventDefault()
                navigate('/geothermal/markets')
              }}
            >
              Browse markets
            </a>
            <a
              href={withBase('/geothermal/developments')}
              className="app-cta-ghost"
              onClick={(e) => {
                e.preventDefault()
                navigate('/geothermal/developments')
              }}
            >
              Recent developments →
            </a>
          </div>
        </div>
      </section>

      <section className="app-section geo-guide-section">
        <div className="app-section-inner">
          <div className="geo-guide-head">
            <div className="editorial-kicker">Country markets</div>
            <h2>Choose a profile</h2>
            <hr className="editorial-rule" />
            <p>
              Each card opens the sourced record for that market. Use the Country menu in the header to jump directly.
            </p>
          </div>
          <div className="geo-guide-grid">
            {featured.map((market, i) => (
              <GuideCard
                key={market.id}
                item={{
                  path: `/geothermal/markets/${market.id}`,
                  kicker: regionLabel(market.region),
                  title: market.name,
                  lede: market.overview[0] || market.applications.map((a) => APPLICATIONS.find((x) => x.id === a)?.label).filter(Boolean).join(' · '),
                  image: market.image,
                }}
                index={i}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>


      <section className="app-section">
        <div className="app-section-inner">
          <p className="app-kicker">Feed</p>
          <h2 className="geo-section-title">Recent developments</h2>
          <ul className={`geo-feed geo-feed-cards${feedShown ? ' is-shown' : ''}`} ref={feedRef}>
            {recent.map((item, i) => {
              const market = marketById(item.marketId)
              const doc = docsFor(item.docIds)[0]
              return (
                <li
                  key={item.id}
                  className="geo-feed-card editorial-panel"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="geo-feed-meta">
                    <span>{market?.name}</span>
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {doc && (
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="geo-inline-link">
                      Source ↗
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

function MarketsPage({ navigate }) {
  const [region, setRegion] = useState('all')
  const [application, setApplication] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publishedMarkets().filter((m) => {
      if (region !== 'all' && m.region !== region) return false
      if (application !== 'all' && !m.applications.includes(application)) return false
      if (q) {
        const hay = `${m.name} ${m.overview.join(' ')} ${(m.analysis || []).join(' ')} ${m.applicationDetail?.body?.join(' ') || ''} ${m.engagement?.body?.join(' ') || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [region, application, query])

  return (
    <section className="app-section app-section-top">
      <div className="app-section-inner">
        <p className="app-kicker">Markets</p>
        <h1 className="geo-page-title">Country profiles</h1>
        <p className="app-lede geo-page-lede">
          Country profiles across regions. Open a profile for sourced applications, buyers, developments, and military bases where listed.
        </p>

        <div className="geo-filters">
          <label>
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Countries, projects, organizations…"
            />
          </label>
          <label>
            <span>Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="all">All regions</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Application</span>
            <select value={application} onChange={(e) => setApplication(e.target.value)}>
              <option value="all">All applications</option>
              {APPLICATIONS.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </label>
        </div>

        {REGIONS.map((r) => {
          const markets = filtered.filter((m) => m.region === r.id)
          if (!markets.length) return null
          return (
            <div key={r.id} className="geo-region-block">
              <h2>{r.label}</h2>
              <div className="geo-market-card-grid">
                {markets.map((m, i) => (
                  <MarketCard key={m.id} market={m} index={i} navigate={navigate} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CountryPage({ slug, navigate }) {
  const market = marketById(slug)
  if (!market || market.status !== 'published') {
    return (
      <section className="app-section app-section-top">
        <div className="app-section-inner">
          <h1 className="geo-page-title">Market not found</h1>
          <button type="button" className="back-link" onClick={() => navigate('/geothermal/markets')}>
            ← Markets
          </button>
        </div>
      </section>
    )
  }

  const developments = developmentsForMarket(market.id)

  return (
    <>
      <section className="geo-country-hero">
        <img className="geo-country-hero-image" src={market.image} alt="" loading="eager" decoding="async" />
        <div className="geo-country-hero-shade" aria-hidden="true" />
        <div className="geo-country-hero-inner">
          <button type="button" className="back-link" onClick={() => navigate('/geothermal/markets')}>
            ← Markets
          </button>
          <p className="app-kicker">{regionLabel(market.region)}{market.hostProfile ? ' · Installations' : ''}</p>
          <h1 className="geo-page-title">{market.name}</h1>
          <p className="geo-market-apps">
            {market.applications.map((a) => APPLICATIONS.find((x) => x.id === a)?.label).filter(Boolean).join(' · ')}
          </p>
        </div>
      </section>

      <section className="app-section">
        <div className="app-section-inner">
          {market.overview?.length > 0 && (
            <div className="geo-prose">
              <h2>Overview</h2>
              {market.overview.map((p) => <p key={p}>{p}</p>)}
              <SourceList docIds={market.overviewDocIds || market.docIds} />
            </div>
          )}

          {market.applicationDetail && (
            <div className="geo-prose">
              <h2>{market.applicationDetail.title}</h2>
              {market.applicationDetail.body.map((p) => <p key={p}>{p}</p>)}
              <SourceList docIds={market.applicationDetail.docIds} />
            </div>
          )}

          {market.engagement && (
            <div className="geo-prose">
              <h2>{market.engagement.title}</h2>
              {market.engagement.body.map((p) => <p key={p}>{p}</p>)}
              <SourceList docIds={market.engagement.docIds} />
            </div>
          )}

          {developments.length > 0 && (
            <div className="geo-prose">
              <h2>Recent developments</h2>
              <ul className="geo-feed">
                {developments.map((item) => {
                  const doc = docsFor(item.docIds)[0]
                  return (
                    <li key={item.id}>
                      <div className="geo-feed-meta">
                        <span>{formatDate(item.date)}</span>
                        <span>{DEVELOPMENT_TYPES.find((t) => t.id === item.type)?.label}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      {doc && (
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="geo-inline-link">
                          Source ↗
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {market.policyDetail && (
            <div className="geo-prose">
              <h2>{market.policyDetail.title || 'Policy and financing'}</h2>
              {market.policyDetail.body.map((p) => <p key={p}>{p}</p>)}
              <SourceList docIds={market.policyDetail.docIds} />
            </div>
          )}

          {market.analysis?.length > 0 && (
            <div className="geo-prose geo-analysis">
              <h2>Analysis</h2>
              {market.analysis.map((p) => <p key={p}>{p}</p>)}
            </div>
          )}

          {(() => {
            const bases = basesForMarket(market)
            if (!bases.length) return null
            return (
              <div className="geo-prose geo-bases">
                <h2>Military bases</h2>
                <p>
                  Named overseas U.S. installations in {market.name} from the public inventory.
                </p>
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
                      {b.energy ? <p>{b.energy}</p> : null}
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
              </div>
            )
          })()}

        </div>
      </section>
    </>
  )
}

function DevelopmentsPage() {
  const [region, setRegion] = useState('all')
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...DEVELOPMENTS]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((d) => {
        const market = marketById(d.marketId)
        if (region !== 'all' && market?.region !== region) return false
        if (type !== 'all' && d.type !== type) return false
        if (q) {
          const hay = `${market?.name || ''} ${d.title} ${d.description}`.toLowerCase()
          if (!hay.includes(q)) return false
        }
        return true
      })
  }, [region, type, query])

  return (
    <section className="app-section app-section-top">
      <div className="app-section-inner">
        <p className="app-kicker">Feed</p>
        <h1 className="geo-page-title">Recent developments</h1>
        <p className="app-lede geo-page-lede">
          Dated changes to laws, financing, projects, and procurement. Announced targets are distinguished from achieved results in the description.
        </p>
        <div className="geo-filters">
          <label>
            <span>Search</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Countries, projects, legislation…" />
          </label>
          <label>
            <span>Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="all">All regions</option>
              {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </label>
          <label>
            <span>Development type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All types</option>
              {DEVELOPMENT_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </label>
        </div>
        <ul className="geo-feed">
          {items.map((item) => {
            const market = marketById(item.marketId)
            const doc = docsFor(item.docIds)[0]
            return (
              <li key={item.id}>
                <div className="geo-feed-meta">
                  <span>{market?.name}</span>
                  <span>{formatDate(item.date)}</span>
                  <span>{DEVELOPMENT_TYPES.find((t) => t.id === item.type)?.label}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {doc && (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="geo-inline-link">
                    Source ↗
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function MethodologyPage() {
  return (
    <section className="app-section app-section-top">
      <div className="app-section-inner">
        <p className="app-kicker">About this reference</p>
        <h1 className="geo-page-title">Methodology</h1>
        <div className="geo-prose">
          <h2>Coverage</h2>
          <p>
            Published country markets across Asia and Pacific, Europe, the Middle East, Africa, and the Americas. Profiles show only sections supported by linked sources. Military bases appear on country pages when the public inventory lists them.
          </p>
          <h2>Sourcing</h2>
          <p>
            Document, claim, and legislative-action records are kept separately and linked by identifiers. Public pages show concise citations. Research history belongs in underlying records, not the main narrative.
          </p>
          <h2>Analysis</h2>
          <p>
            Substantive editorial conclusions are labeled Analysis. Ordinary factual paragraphs do not carry repeated source-establishes headings. Unsupported fields are omitted from public pages.
          </p>
          <p className="geo-draft-note disclosure-glow">{DISCLOSURE}</p>
        </div>
      </div>
    </section>
  )
}

export default function GeothermalApp({ onHome, embedded = false }) {
  const [route, setRoute] = useState(() => parseGeothermalPath(stripBase(window.location.pathname)) || { view: 'markets', slug: null })

  useEffect(() => {
    const onPop = () => {
      const next = parseGeothermalPath(stripBase(window.location.pathname))
      if (next) setRoute(next)
      else onHome?.()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [onHome])

  const navigate = (path) => {
    const target = path === '/subsurface' ? '/geothermal/markets' : path
    if (target === '/geothermal' || target === '/geothermal/') {
      onHome?.()
      return
    }
    window.history.pushState({}, '', withBase(target))
    const next = parseGeothermalPath(target)
    if (next) {
      setRoute(next)
      window.scrollTo(0, 0)
    } else if (target === '/' || target === '') {
      onHome?.()
    }
  }

  let body = null
  switch (route.view) {
    case 'markets':
      body = <MarketsPage navigate={navigate} />
      break
    case 'country':
      body = <CountryPage slug={route.slug} navigate={navigate} />
      break
    case 'developments':
      body = <DevelopmentsPage />
      break
    case 'methodology':
      body = <MethodologyPage />
      break
    default:
      body = <MarketsPage navigate={navigate} />
  }

  if (embedded) {
    return (
      <div className="geo-embedded">
        <Header route={route} navigate={navigate} onHome={onHome} />
        <main>{body}</main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Header route={route} navigate={navigate} onHome={onHome} />
      <main>{body}</main>
      <Footer />
    </div>
  )
}
