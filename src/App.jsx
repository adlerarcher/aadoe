import { useEffect, useRef } from 'react'
import { PRODUCTS, entryUrl } from './products.js'

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

function LogoShell() {
  return (
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
      <img src="/logo.png" width="256" height="256" alt="" />
    </div>
  )
}

function ProductPanel({ product, delayClass }) {
  const hasRoles = Array.isArray(product.roles) && product.roles.length > 0
  const hasLinks = Array.isArray(product.links) && product.links.length > 0

  return (
    <section className={`product rise ${delayClass}`} aria-labelledby={`product-${product.id}`}>
      <div className="product-head">
        <p className="product-code">{product.code}</p>
        <h2 id={`product-${product.id}`}>{product.name}</h2>
        <p className="product-full">{product.fullName}</p>
        <p className="product-blurb">{product.blurb}</p>
      </div>
      {hasRoles ? (
        <div className="role-row" role="group" aria-label={`Enter ${product.name}`}>
          {product.roles.map((role) => (
            <a
              key={role.id}
              className="role-enter"
              href={entryUrl(product, role)}
            >
              <span className="role-label">{role.label}</span>
              <span className="role-hint">Enter</span>
            </a>
          ))}
        </div>
      ) : hasLinks ? (
        <div className="role-row" role="group" aria-label={product.name}>
          {product.links.map((link) => (
            <a
              key={link.id}
              className="role-enter"
              href={link.href}
            >
              <span className="role-label">{link.label}</span>
              <span className="role-hint">{link.hint}</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="role-row role-row--single" role="group" aria-label={`Open ${product.name}`}>
          <a className="role-enter" href={product.href}>
            <span className="role-label">{product.enterLabel || 'Enter'}</span>
            <span className="role-hint">Go</span>
          </a>
        </div>
      )}
    </section>
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
    let frame = 0

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 28
      ty = (e.clientY / window.innerHeight - 0.5) * 18
    }

    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      mosaic.style.transform = `translate3d(${x}px,${y}px,0)`
      if (wash) wash.style.transform = `translate3d(${x * 0.35}px,${y * 0.35}px,0)`
      frame = requestAnimationFrame(tick)
    }

    document.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="page">
      <Atmosphere mosaicRef={mosaicRef} washRef={washRef} />

      <header className="site-nav">
        <a className="brand" href="/">
          <img src="/logo.png" width="256" height="256" alt="" />
          <span className="brand-name">
            The Thermal Underground
          </span>
          <span className="demo-mark">Demo</span>
        </a>
      </header>

      <main className="hub">
        <div className="intro">
          <LogoShell />
          <h1>
            <span className="title-line rise d2">White House</span>
            <span className="title-accent rise d3">Presidential Innovation Initiatives</span>
            <span className="title-place rise d4">at the Department of Energy</span>
          </h1>
          <span className="rule rise d5" aria-hidden="true" />
          <p className="lede rise d5">
            Authorizations for geothermal and other subsurface energy sit across federal, state, and local systems. These initiatives make those records usable for coordination and carry the findings into the field.
          </p>
        </div>

        <div className="products">
          {PRODUCTS.map((product, i) => (
            <ProductPanel
              key={product.id}
              product={product}
              delayClass={`d${6 + i}`}
            />
          ))}
        </div>
      </main>

      <footer className="page-footer">
        <p>Thermal Underground © Adler Archer</p>
        <p className="page-footer-note">AADOE · Adler / DOE</p>
        <p className="page-footer-note disclosure-glow">
          Not an official U.S. government publication
        </p>
      </footer>
    </div>
  )
}
