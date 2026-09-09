import { useEffect, useRef } from 'react'
import { GROUPS, STATUS_LABEL } from './properties.js'

const MOSAIC = [
  { src: '/mosaic-1.jpg', className: 'tile wide' },
  { src: '/mosaic-2.jpg', className: 'tile' },
  { src: '/mosaic-3.jpg', className: 'tile portrait' },
  { src: '/mosaic-4.jpg', className: 'tile' },
  { src: '/mosaic-5.jpg', className: 'tile' },
  { src: '/mosaic-6.jpg', className: 'tile' },
  { src: '/mosaic-7.jpg', className: 'tile wide' },
  { src: '/mosaic-8.jpg', className: 'tile' },
]

function Atmosphere({ mosaicRef, washRef }) {
  return (
    <>
      <div className="wash" aria-hidden="true" ref={washRef}>
        <img src="/wash.jpg" alt="" />
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

function SiteNav() {
  return (
    <header className="site-nav">
      <a className="brand" href="/">
        <img src="/logo.png" width="256" height="256" alt="" />
        <span className="brand-name">
          The Thermal Underground <i>AADOE</i>
        </span>
        <span className="demo-mark">Demo</span>
      </a>
      <nav aria-label="Sections">
        {GROUPS.map((group) => (
          <a key={group.id} href={`#${group.id}`}>{group.label}</a>
        ))}
      </nav>
    </header>
  )
}

function PropertyCard({ item }) {
  const here = item.status === 'here'
  const Tag = here ? 'div' : 'a'
  const extra = here
    ? {}
    : { href: item.href, target: '_blank', rel: 'noreferrer' }

  return (
    <Tag
      className={`card${here ? ' card--here' : ''}`}
      {...extra}
    >
      <div className="card-top">
        <span className="mark">{item.mark}</span>
        <span className={`st st--${item.status}`}>{STATUS_LABEL[item.status]}</span>
      </div>
      <h3>{item.name}</h3>
      <p className="host">{item.host}</p>
      <p className="does">{item.does}</p>
      {!here && <span className="visit">Visit</span>}
    </Tag>
  )
}

export default function App() {
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
      <SiteNav />
      <main>
        <header className="hero">
          <div className="stack">
            <div className="logo-shell rise d1">
              <span className="logo-glow" aria-hidden="true" />
              <span className="logo-glow-outer" aria-hidden="true" />
              <span className="logo-ring logo-ring--a" aria-hidden="true" />
              <span className="logo-ring logo-ring--b" aria-hidden="true" />
              <span className="logo-ring logo-ring--c" aria-hidden="true" />
              <img src="/logo.png" width="256" height="256" alt="Thermal Underground" />
            </div>
            <p className="kicker rise d2">A Thermal Underground project</p>
            <h1>
              <span className="title-line rise d3">Every property,</span>
              <span className="title-accent rise d4">and what it does</span>
            </h1>
            <span className="rule rise d5" aria-hidden="true" />
            <p className="lede rise d5">
              Hosts on thermalunderground.org. Field guide, permitting stack, markets, and this directory.
            </p>
          </div>
        </header>

        {GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="group">
            <div className="group-head">
              <p className="group-kicker">{group.label}</p>
              <p className="group-blurb">{group.blurb}</p>
            </div>
            <div className={`cards cards--${group.items.length}`}>
              {group.items.map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <footer className="page-footer">
        <p>Thermal Underground © Adler Archer.</p>
        <p className="page-footer-note">Not an official U.S. government publication.</p>
      </footer>
    </div>
  )
}
