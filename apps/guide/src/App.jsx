import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingSplash from './LoadingSplash.jsx'
import BrandLogo from './BrandLogo.jsx'
import { HeatField } from './visuals.jsx'
import { RouterProvider, useRouter, Link } from './router.jsx'
import { HERO_IMAGES, ABOUT, PERMITTING_SECTIONS, WORKFORCE_SECTIONS, OVERVIEW_NAV_SECTIONS, HOME_GUIDE, HELPFUL_LINKS_NAV_SECTIONS, PRODUCTION_SECTIONS, PRODUCTION_NAV_SECTIONS, PRIMER_TOPICS, parseDrillingPath } from './content.jsx'
import Permitting from './Permitting.jsx'
import Projects from './Projects.jsx'
import PermittingNote from './PermittingNote.jsx'
import Toolbox from './Toolbox.jsx'
import Primer from './Primer.jsx'
import PrimerTopic from './PrimerTopic.jsx'
import Utes from './Utes.jsx'
import International from './International.jsx'
import Glossary from './Glossary.jsx'
import Citations from './Citations.jsx'
import Workforce from './Workforce.jsx'
import Drilling from './Drilling.jsx'
import { applyPageMeta } from './seo.js'

// ── heat system ───────────────────────────────────────────────────────────
function applyHeat(heat) {
  const lerp = (a, b, t) => Math.round(a + (b - a) * t)
  const bg = `rgb(${lerp(7, 26, heat)},${lerp(8, 9, heat)},${lerp(10, 8, heat)})`
  // Keep text warm but don't lighten further as heat rises, contrast comes from the scrim.
  const ink = `rgb(${lerp(233, 228, heat)},${lerp(227, 218, heat)},${lerp(216, 200, heat)})`
  const root = document.documentElement
  root.style.setProperty('--heat', heat.toFixed(3))
  root.style.setProperty('--bg', bg)
  root.style.setProperty('--ink', ink)
  document.body.style.backgroundColor = bg
}

function useScrollHeat(heatRef, enabled) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (!enabled) {
      heatRef.current = 0
      applyHeat(0)
      setPct(0)
      return
    }
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? window.scrollY / max : 0
        heatRef.current = p
        applyHeat(p)
        setPct(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [heatRef, enabled])
  return pct
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

// ── nav ─────────────────────────────────────────────────────────────────
const NAV = [
  { to: '/', label: 'Home' },
  {
    label: 'Overview',
    basePath: '/toolbox',
    children: OVERVIEW_NAV_SECTIONS,
  },
  {
    label: 'Production',
    basePath: '/toolbox',
    productionNav: true,
    children: PRODUCTION_NAV_SECTIONS,
  },
  {
    label: 'Permitting',
    basePath: '/permitting',
    permittingNav: true,
    children: PERMITTING_SECTIONS,
  },
  {
    label: 'Workforce',
    basePath: '/workforce',
    workforceNav: true,
    children: WORKFORCE_SECTIONS,
  },
  { to: '/toolbox/portals', label: 'Helpful links', featuredNav: true, helpfulLinksNav: true, children: HELPFUL_LINKS_NAV_SECTIONS },
]

function isProductionPath(path) {
  return PRODUCTION_SECTIONS.some(s => s.to === path)
    || path === '/projects'
    || path.startsWith('/projects/drilling')
}

function isHelpfulLinksPath(path) {
  return path === '/toolbox'
    || path === '/toolbox/portals'
    || path === '/toolbox/data-and-modeling'
    || path === '/toolbox/data-sources'
    || path === '/toolbox/modeling-tools'
    || path === '/citations'
}

function isOverviewPath(path) {
  return path === '/adler-archer'
    || path === '/toolbox/primer'
    || path === '/primer'
    || path === '/toolbox/glossary'
    || path === '/glossary'
    || path === '/utes'
    || path === '/underground-thermal-energy-storage'
    || path === '/toolbox/energy-storage'
    || path === '/international'
}

function isWorkforcePath(path) {
  if (path === '/workforce/permitting') return false
  return path === '/workforce' || path.startsWith('/workforce/')
}

function isPermittingPath(path) {
  return path.startsWith('/permitting') || path === '/workforce/permitting'
}

function navActive(path, item) {
  if (item.children) {
    if (item.productionNav) return isProductionPath(path)
    if (item.permittingNav) return isPermittingPath(path)
    if (item.workforceNav) return isWorkforcePath(path)
    if (item.helpfulLinksNav) return isHelpfulLinksPath(path)
    if (item.basePath === '/toolbox') return isOverviewPath(path)
    return path === item.basePath || path.startsWith(`${item.basePath}/`)
  }
  if (item.to === '/') return path === '/'
  return path === item.to
}

function navChildActive(path, child, item) {
  if (item.productionNav) {
    if (child.id === 'projects') return path === '/projects'
    if (child.id === 'drilling') {
      return path === '/projects/drilling' || path.startsWith('/projects/drilling/')
    }
    return path === child.to
  }
  if (item.permittingNav) {
    if (child.id === 'problem') {
      return path === '/permitting' || path === '/permitting/problem'
    }
    if (child.id === 'people') {
      return path === '/permitting/people' || path.startsWith('/permitting/notes/')
    }
    if (child.id === 'workforce') {
      return path === '/workforce/permitting'
    }
    return path === child.to
  }
  if (item.workforceNav) {
    if (child.id === 'overview') return path === '/workforce'
    return path === child.to
  }
  if (item.helpfulLinksNav) {
    if (child.id === 'portals') {
      return path === '/toolbox/portals'
        || path === '/toolbox'
        || path === '/toolbox/data-and-modeling'
        || path === '/toolbox/data-sources'
        || path === '/toolbox/modeling-tools'
    }
    if (child.id === 'citations') return path === '/citations'
    return path === child.to
  }
  if (item.basePath === '/toolbox') {
    if (child.id === 'adler-archer') return path === '/adler-archer'
    if (child.id === 'glossary') {
      return path === '/toolbox/glossary' || path === '/glossary'
    }
    if (child.id === 'energy-storage') {
      return path === '/utes'
        || path === '/underground-thermal-energy-storage'
        || path === '/toolbox/energy-storage'
    }
    if (child.id === 'international') {
      return path === '/international'
    }
    return path === child.to
  }
  const defaultChild = item.children.find(c => c.default) || item.children[0]
  if (child.id === defaultChild?.id && (path === item.basePath || path === child.to)) return true
  return path === child.to
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function NavDropdown({ item, path, onNavigate }) {
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const active = navActive(path, item)

  const go = (to) => (e) => {
    e.preventDefault()
    onNavigate?.()
    setOpen(false)
    navigate(to)
  }

  return (
    <div
      className={`nav-dropdown${open ? ' nav-dropdown-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav-dropdown-trigger editorial-nav-link transition-colors ${active ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <span className="nav-dropdown-caret" aria-hidden="true">▾</span>
      </button>
      <div className="nav-dropdown-menu" role="menu">
        {item.children.map(child => (
          <a
            key={child.id}
            href={child.to}
            role="menuitem"
            className={`nav-dropdown-item${navChildActive(path, child, item) ? ' nav-dropdown-item-active' : ''}`}
            onClick={go(child.to)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function NavDropdownMobile({ item, path, onNavigate }) {
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const active = navActive(path, item)

  return (
    <div className="nav-dropdown-mobile">
      <button
        type="button"
        className={`editorial-nav-link editorial-nav-link--mobile w-full text-left ${active ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <span className="nav-dropdown-caret ml-1" aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="nav-dropdown-mobile-items pl-3">
          {item.children.map(child => (
            <a
              key={child.id}
              href={child.to}
              className={`editorial-nav-link editorial-nav-link--mobile block ${navChildActive(path, child, item) ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.()
                setOpen(false)
                navigate(child.to)
              }}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function footerNavTarget(item) {
  if (item.children) {
    const defaultChild = item.children.find(c => c.default) || item.children[0]
    return defaultChild.to
  }
  return item.to
}

function FooterNav() {
  const { path } = useRouter()
  return (
    <nav className="footer-nav" aria-label="Footer">
      {NAV.map(n => {
        const to = footerNavTarget(n)
        return (
          <Link
            key={n.label}
            to={to}
            className={`editorial-nav-link text-[0.9375rem] transition-colors ${navActive(path, n) ? 'text-[#ff8a3c]' : 'editorial-nav-link--idle hover:text-[#ff8a3c]'}`}
          >
            {n.label}
          </Link>
        )
      })}
    </nav>
  )
}

function NavItem({ item, path, className, onNavigate }) {
  const { navigate } = useRouter()
  return (
    <a
      href={item.section ? `/#${item.section}` : item.to}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onNavigate?.()
        if (item.section) {
          if (path === '/' || path === '/primer' || path === '/glossary') {
            scrollToSection(item.section)
          } else {
            navigate('/')
            window.setTimeout(() => scrollToSection(item.section), 80)
          }
          return
        }
        navigate(item.to)
      }}
    >
      {item.label}
    </a>
  )
}

function HelpfulLinksNavDropdown({ item, path, onNavigate }) {
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const active = navActive(path, item)

  const go = (to) => (e) => {
    e.preventDefault()
    onNavigate?.()
    setOpen(false)
    navigate(to)
  }

  return (
    <div
      className={`nav-dropdown helpful-links-nav-dropdown${open ? ' nav-dropdown-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`helpful-links-nav-link nav-helpful-links-link${active ? ' helpful-links-nav-link--active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(o => !o)}
      >
        <span>{item.label}</span>
        <HelpfulLinksNavArrow />
      </button>
      <div className="nav-dropdown-menu helpful-links-nav-menu" role="menu">
        {item.children.map(child => (
          <a
            key={child.id}
            href={child.to}
            role="menuitem"
            className={`nav-dropdown-item${navChildActive(path, child, item) ? ' nav-dropdown-item-active' : ''}`}
            onClick={go(child.to)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function HelpfulLinksNavDropdownMobile({ item, path, onNavigate }) {
  const { navigate } = useRouter()
  const [open, setOpen] = useState(false)
  const active = navActive(path, item)

  return (
    <div className="nav-dropdown-mobile helpful-links-nav-dropdown-mobile">
      <button
        type="button"
        className={`helpful-links-nav-link nav-helpful-links-link w-full text-left${active ? ' helpful-links-nav-link--active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>{item.label}</span>
        <span className="nav-dropdown-caret ml-1" aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="nav-dropdown-mobile-items pl-3">
          {item.children.map(child => (
            <a
              key={child.id}
              href={child.to}
              className={`editorial-nav-link editorial-nav-link--mobile block ${navChildActive(path, child, item) ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.()
                setOpen(false)
                navigate(child.to)
              }}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function HelpfulLinksNavArrow() {
  return (
    <svg className="nav-helpful-links-arrow h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Nav() {
  const { path } = useRouter()
  const [open, setOpen] = useState(false)
  const mainNavItems = NAV.slice(1).filter(n => !n.featuredNav)
  const featuredNavItem = NAV.find(n => n.featuredNav)

  return (
    <nav className="editorial-nav fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="site-brand flex min-w-0 items-center gap-3" aria-label="The Thermal Underground home">
          <BrandLogo variant="nav" alt="" />
          <span className="site-brand-wordmark font-display text-lg font-light tracking-tight text-[var(--ink)]">
            The Thermal <span className="italic text-[#ff7a2e]">Underground</span>
          </span>
        </Link>
        <button className="md:hidden font-mono text-xs uppercase tracking-widest text-[var(--ink)]/70" onClick={() => setOpen(o => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <div className="hidden items-center gap-7 md:flex">
          {mainNavItems.map(n => (
            n.children
              ? <NavDropdown key={n.label} item={n} path={path} />
              : (
                <NavItem
                  key={n.label}
                  item={n}
                  path={path}
                  className={`editorial-nav-link transition-colors ${navActive(path, n) ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
                />
              )
          ))}
          {featuredNavItem && (
            <div className="helpful-links-nav-wrap ml-1 border-l border-[rgba(244,239,230,0.12)] pl-4 md:ml-2 md:pl-5">
              <HelpfulLinksNavDropdown item={featuredNavItem} path={path} />
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="border-t border-white/[0.06] px-6 py-4 md:hidden">
          {mainNavItems.map(n => (
            n.children
              ? <NavDropdownMobile key={n.label} item={n} path={path} onNavigate={() => setOpen(false)} />
              : (
                <NavItem
                  key={n.label}
                  item={n}
                  path={path}
                  onNavigate={() => setOpen(false)}
                  className={`editorial-nav-link editorial-nav-link--mobile ${navActive(path, n) ? 'editorial-nav-link--active' : 'editorial-nav-link--idle'}`}
                />
              )
          ))}
          {featuredNavItem && (
            <div className="helpful-links-nav-wrap mt-3 border-l border-[rgba(244,239,230,0.12)] pl-4">
              <HelpfulLinksNavDropdownMobile item={featuredNavItem} path={path} onNavigate={() => setOpen(false)} />
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="editorial-footer py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-6">
        <FooterNav />
        <p className="footer-copyright mt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--ink)]/42">
          © {year} Adler Archer. The Thermal Underground.
        </p>
      </div>
    </footer>
  )
}

// ── shared building blocks ─────────────────────────────────────────────
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

function PageHero({ kicker, title, sub, images, stat }) {
  return (
    <header className="relative overflow-hidden px-6 pt-36 pb-4 md:pt-44 md:pb-6">
      {images?.length > 0 && <HeroMosaic images={images} />}
      <div className="relative mx-auto max-w-[1100px]">
        <div className="editorial-kicker">{kicker}</div>
        {stat && (
          <div className="mt-5 font-display text-[2.5rem] font-light leading-none tracking-tight text-[#ffce8a] md:text-5xl editorial-display">{stat}</div>
        )}
        <h1 className={`${stat ? 'mt-4' : 'mt-6'} font-display text-[2.75rem] font-light leading-[1.03] tracking-tight text-[var(--ink)] md:text-[3.5rem] editorial-display`}>{title}</h1>
        {sub && <p className="mt-5 max-w-[720px] font-body text-lg leading-relaxed text-[var(--ink)]/72 md:text-[1.15rem] editorial-deck">{sub}</p>}
      </div>
    </header>
  )
}

// ── HOME ────────────────────────────────────────────────────────────────
function HomeGuideCard({ item, index }) {
  const [ref, shown] = useReveal(0.08)
  return (
    <Link
      ref={ref}
      to={item.to}
      className={`home-guide-card home-door-card editorial-panel editorial-shimmer group relative block overflow-hidden transition-transform hover:-translate-y-0.5${shown ? ' animate-rise' : ' opacity-0'}`}
      style={{ animationDelay: `${index * 70}ms`, '--guide-i': index, '--door-i': index }}
    >
      <div className="relative h-28 overflow-hidden sm:h-32">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover opacity-55 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-75"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-60" />
      </div>
      <div className="relative z-[2] p-5 pt-4 md:p-6">
        <div className="home-guide-kicker editorial-kicker">{item.kicker}</div>
        <h2 className="home-guide-title mt-2 font-display text-xl font-light italic leading-tight tracking-tight text-[var(--ink)] md:mt-3 md:text-2xl">
          {item.title}
        </h2>
        <p className="home-guide-lede mt-2 line-clamp-4 font-body text-[0.8rem] leading-relaxed text-[var(--ink)]/65 md:mt-3 md:text-sm">
          {item.lede}
        </p>
        <span className="home-guide-arrow mt-4 inline-block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--ink)]/45 transition-colors group-hover:text-[#ff8a3c] md:mt-5 md:text-[0.65rem]">
          Read →
        </span>
      </div>
    </Link>
  )
}

function HomeGuide() {
  return (
    <section className="home-guide border-t border-white/[0.06] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="home-guide-head max-w-2xl">
          <div className="editorial-kicker">Field guide</div>
          <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-[var(--ink)] md:text-4xl editorial-display">
            What’s on this site
          </h2>
          <hr className="editorial-rule mt-6 max-w-xs" />
          <p className="mt-6 font-body text-base leading-relaxed text-[var(--ink)]/68 md:text-lg">
            Geothermal heat, production technology, federal permitting, underground storage, and the data used in development—organized by topic below.
          </p>
        </div>
        <div className="home-guide-grid mt-8 md:mt-12">
          {HOME_GUIDE.map((item, i) => (
            <HomeGuideCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <header className="home-hero home-hero--entry relative overflow-hidden px-6">
        <HeroMosaic images={HERO_IMAGES.home} />
        <div className="home-hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="home-hero-inner relative mx-auto w-full max-w-6xl">
          <div className="home-hero-stack">
            <BrandLogo variant="hero" alt="" />
            <p className="home-hero-kicker">A geothermal field guide</p>
            <h1 className="home-hero-title font-display text-[var(--ink)] editorial-display">
              <span className="home-hero-title-line">The Thermal</span>
              <span className="home-hero-title-accent">Underground</span>
            </h1>
            <div className="home-hero-rule" aria-hidden="true" />
            <p className="home-hero-deck editorial-deck">
              Geothermal heat, production technology, federal permitting, underground storage, and the data tools used in development.
            </p>
            <p className="home-hero-subline">Heat · Wells · Permits · Storage · Data</p>
          </div>
        </div>
      </header>
      <HomeGuide />
    </>
  )
}

// ── legacy heatlog redirects ─────────────────────────────────────────────
const HEATLOG_REDIRECTS = {
  permitai: '/permitting/notes/permitai',
  nepa: '/permitting/notes/nepa',
  ceq: '/permitting/notes/ceq',
  'permitting-council': '/permitting/notes/permitting-council',
  'section-106': '/permitting/notes/section-106',
  'nhpa-section-106': '/permitting/notes/section-106',
  thpo: '/permitting/notes/thpo',
  'oil-and-gas-crossover': '/workforce',
  'who-leads-who-learns': '/international',
  'the-market': '/international',
  'induced-seismicity': '/toolbox/portals',
}

function LegacyRedirect({ to }) {
  const { navigate } = useRouter()
  useEffect(() => {
    navigate(to)
  }, [navigate, to])
  return null
}

function AboutPage() {
  return (
    <>
      <PageHero
        kicker={ABOUT.kicker}
        title={
          <>
            {ABOUT.titleLead}{' '}
            <span className="italic text-[#ff7a2e]">{ABOUT.titleEmphasis}</span>
          </>
        }
        sub={ABOUT.lede}
        images={HERO_IMAGES.home}
      />
      <section className="about-page scroll-mt-28">
        <div className="about-essay px-6 pb-24">
          <div className="about-essay-layout mx-auto max-w-[1100px]">
            <p className="about-home-byline font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ink)]/42">
              {ABOUT.portraitAlt} · DOE Presidential Innovation Fellow
            </p>
            {ABOUT.portrait && (
              <AboutPortrait src={ABOUT.portrait} alt={ABOUT.portraitAlt} />
            )}
            <div className="about-chapters">
              {ABOUT.blocks.map((b, i) => (
                <AboutChapter key={b.heading || 'disclaimer'} block={b} index={i} />
              ))}
            </div>
            <section className="about-elsewhere">
              <div className="editorial-kicker">Elsewhere</div>
              <hr className="editorial-rule mt-6 max-w-xs" />
              <div className="about-links mt-10">
                {ABOUT.links.map(l => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                    title={l.label}
                  >
                    {l.icon && (
                      <img
                        src={l.icon}
                        alt=""
                        className="about-link-logo"
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span className="about-link-caption">{l.label}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

// ── ABOUT (shared blocks) ───────────────────────────────────────────────
function AboutPortrait({ src, alt, compact = false }) {
  return (
    <figure className={`about-portrait${compact ? ' about-portrait-compact' : ''}`} id="person">
      <div className="about-portrait-frame editorial-panel">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <div className="about-portrait-vignette" aria-hidden="true" />
        <div className="about-portrait-warmth" aria-hidden="true" />
      </div>
      {!compact && (
        <figcaption className="about-portrait-caption font-display text-lg font-light italic text-[#ffce8a]">{alt}</figcaption>
      )}
    </figure>
  )
}

function AboutChapter({ block, index }) {
  const [ref, shown] = useReveal(0.1)

  if (block.disclaimer) {
    return (
      <div
        ref={ref}
        className={`about-disclaimer ${shown ? 'animate-rise' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <p>{block.body[0]}</p>
      </div>
    )
  }

  return (
    <article
      ref={ref}
      className={`about-chapter${block.pullquote ? ' about-chapter-quoted' : ''}${shown ? ' animate-rise' : ' opacity-0'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <header className="about-chapter-head">
        <span className="about-chapter-num">{block.num}</span>
        <h3 className="about-chapter-title">{block.heading}</h3>
      </header>
      {block.deck && (
        <div className="about-chapter-main">
          <p className="about-chapter-deck prose-editorial">{block.deck}</p>
        </div>
      )}
      {block.pullquote && (
        <blockquote className="about-chapter-quote editorial-pullquote font-display text-lg italic leading-snug text-[#ff8a3c] md:text-xl">
          {block.pullquote}
        </blockquote>
      )}
      {block.body.length > 0 && (
        <div className="about-chapter-body prose-editorial">
          {block.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </article>
  )
}

// ── route table ──────────────────────────────────────────────────────────
function Routes({ scrollPct }) {
  const { path } = useRouter()
  if (path === '/about') return <LegacyRedirect to="/adler-archer" />
  if (path.startsWith('/heatlog/')) {
    const slug = path.slice('/heatlog/'.length)
    const dest = HEATLOG_REDIRECTS[slug]
    if (dest) return <LegacyRedirect to={dest} />
  }
  if (path === '/international/deployment' || path === '/international/market') {
    return <LegacyRedirect to="/international" />
  }
  const UTES_LEGACY = {
    '/utes/design': '/utes',
    '/utes/systems': '/utes',
    '/utes/tradeoffs': '/utes',
    '/utes/cases': '/utes',
    '/utes/resources': '/utes',
    '/utes/practice': '/utes',
  }
  if (UTES_LEGACY[path]) return <LegacyRedirect to={UTES_LEGACY[path]} />
  if (path === '/toolbox/data-and-modeling') {
    return <LegacyRedirect to="/toolbox/portals#data-sources" />
  }
  if (path === '/toolbox/data-sources') {
    return <LegacyRedirect to="/toolbox/portals#data-sources" />
  }
  if (path === '/toolbox/modeling-tools') {
    return <LegacyRedirect to="/toolbox/portals#modeling-tools" />
  }
  if (path === '/toolbox/guides') {
    return <LegacyRedirect to="/toolbox/portals" />
  }
  if (path === '/toolbox/workforce') return <LegacyRedirect to="/workforce" />
  if (path === '/glossary') return <LegacyRedirect to="/toolbox/glossary" />
  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.slice(1)
    if (hash && path === '/projects/drilling') {
      return <LegacyRedirect to={`/projects/drilling/safety/${hash}`} />
    }
    if (hash && path === '/projects/drilling/basics') {
      return <LegacyRedirect to={`/projects/drilling/basics/${hash}`} />
    }
    if (hash && path === '/projects/drilling/construction') {
      return <LegacyRedirect to={`/projects/drilling/construction/${hash}`} />
    }
    if (hash && path === '/projects/drilling/safety') {
      return <LegacyRedirect to={`/projects/drilling/safety/${hash}`} />
    }
  }
  const primerTopic = PRIMER_TOPICS.find(t => t.to === path)
  if (primerTopic) return <PrimerTopic topicId={primerTopic.id} />
  if (path === '/permitting/notes') return <LegacyRedirect to="/permitting/people#permitting-notes" />
  if (path.startsWith('/permitting/notes/')) {
    const slug = path.slice('/permitting/notes/'.length)
    if (slug) return <PermittingNote slug={slug} />
  }
  switch (path) {
    case '/':
      return <Home />
    case '/adler-archer':
      return <AboutPage />
    case '/primer':
    case '/toolbox/primer':
      return <Primer scrollPct={scrollPct} />
    case '/toolbox/glossary':
      return <Glossary />
    case '/toolbox':
    case '/toolbox/portals':
      return <Toolbox section="portals" />
    case '/citations':
      return <Citations />
    case '/workforce':
      return <Workforce section="overview" />
    case '/workforce/field':
      return <Workforce section="field" />
    case '/workforce/permitting':
      return <Workforce section="permitting" />
    case '/workforce/community':
      return <Workforce section="community" />
    case '/workforce/programs':
      return <Workforce section="programs" />
    case '/utes':
    case '/underground-thermal-energy-storage':
    case '/toolbox/energy-storage':
      return <Utes />
    case '/international':
      return <International />
    case '/projects':
      return <Projects />
    case '/permitting':
      return <LegacyRedirect to="/permitting/problem" />
    case '/permitting/problem':
      return <Permitting section="problem" />
    case '/permitting/opportunity':
      return <Permitting section="opportunity" />
    case '/permitting/people':
      return <Permitting section="people" />
    default: {
      const drilling = parseDrillingPath(path)
      if (drilling) return <Drilling section={drilling.section} topic={drilling.topic} />
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="font-display text-6xl font-light text-[var(--ink)]">404</div>
          <p className="mt-4 font-body text-[var(--ink)]/65">Page not found.</p>
          <Link to="/" className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[#ff8a3c] hover:text-[#ffb347]">Home</Link>
        </div>
      )
    }
  }
}

function Shell() {
  const { path } = useRouter()
  const heatRef = useRef(0)
  const heatEnabled = path === '/toolbox/primer' || path === '/primer'
  const scrollPct = useScrollHeat(heatRef, heatEnabled)

  useEffect(() => {
    applyPageMeta(path)
  }, [path])

  return (
    <div className="grain relative min-h-screen">
      <div className="editorial-gloss" aria-hidden="true" />
      <HeatField heatRef={heatRef} />
      <div className="heat-scrim" aria-hidden="true" />
      <Nav />
      <div className="relative" style={{ zIndex: 10 }}>
        <Routes scrollPct={scrollPct} />
        <Footer />
      </div>
    </div>
  )
}

function splashSeen() {
  try {
    return sessionStorage.getItem('tu-splash-seen') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [entered, setEntered] = useState(splashSeen)
  const handleEnter = useCallback(() => {
    try {
      sessionStorage.setItem('tu-splash-seen', '1')
    } catch {
      /* ignore */
    }
    setEntered(true)
  }, [])

  return (
    <RouterProvider>
      {!entered && <LoadingSplash onComplete={handleEnter} />}
      {entered && <Shell />}
    </RouterProvider>
  )
}
