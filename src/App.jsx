import { useEffect, useMemo, useRef, useState } from 'react'
import { DISTRICTS, LINKS, NODES, STATUS_LABEL, nodeById, nodeFromPath } from './properties.js'

const VIEW = { w: 1600, h: 1000 }
const MIN_K = 0.72
const MAX_K = 2.15

function linkPath(a, b) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const lift = Math.min(90, Math.hypot(dx, dy) * 0.18)
  const cx = mx - dy * 0.08
  const cy = my + dx * 0.04 - lift
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
}

function Terrain() {
  return (
    <g className="terrain" pointerEvents="none">
      <defs>
        <radialGradient id="basin" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#ff7a2e" stopOpacity=".22" />
          <stop offset="42%" stopColor="#c45a18" stopOpacity=".08" />
          <stop offset="100%" stopColor="#07080a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd29a" stopOpacity=".95" />
          <stop offset="45%" stopColor="#ff7a2e" stopOpacity=".7" />
          <stop offset="100%" stopColor="#ff7a2e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fault" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a3c" stopOpacity="0" />
          <stop offset="50%" stopColor="#ff8a3c" stopOpacity=".35" />
          <stop offset="100%" stopColor="#ff8a3c" stopOpacity="0" />
        </linearGradient>
        <filter id="heat-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <ellipse className="heat-core" cx="800" cy="430" rx="420" ry="300" fill="url(#basin)" filter="url(#heat-blur)" />

      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <ellipse
          key={n}
          className="contour"
          cx="800"
          cy="430"
          rx={180 + n * 92}
          ry={120 + n * 68}
          fill="none"
        />
      ))}

      <path className="fault" d="M 180 210 C 420 280, 520 390, 800 430 S 1180 390, 1440 220" />
      <path className="fault fault-b" d="M 220 820 C 480 740, 620 690, 800 700 S 1120 740, 1400 860" />

      <g className="grid">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={160 + i * 160} y1="40" x2={160 + i * 160} y2="960" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="80" y1={80 + i * 160} x2="1520" y2={80 + i * 160} />
        ))}
      </g>

      <g className="vents">
        <circle cx="720" cy="390" r="18" fill="url(#vent)" />
        <circle cx="860" cy="410" r="12" fill="url(#vent)" />
        <circle cx="780" cy="470" r="9" fill="url(#vent)" />
        <circle cx="640" cy="500" r="7" fill="url(#vent)" />
        <circle cx="940" cy="520" r="8" fill="url(#vent)" />
      </g>
    </g>
  )
}

function Routes({ selected, hovered }) {
  const active = selected || hovered
  return (
    <g className="routes">
      {LINKS.map((link) => {
        const a = nodeById[link.from]
        const b = nodeById[link.to]
        const on = !active || a.id === active || b.id === active
        const d = linkPath(a, b)
        return (
          <g key={`${link.from}-${link.to}`} className={on ? 'route is-on' : 'route is-dim'}>
            <path d={d} className="route-bed" />
            <path d={d} className="route-flow" />
          </g>
        )
      })}
    </g>
  )
}

function Node({ node, selected, hovered, onSelect, onHover }) {
  const live = node.status === 'live' || node.status === 'here'
  return (
    <g
      className={`node${selected ? ' is-selected' : ''}${hovered ? ' is-hovered' : ''}${live ? ' is-live' : ''}`}
      transform={`translate(${node.x} ${node.y})`}
    >
      <circle className="node-ring node-ring-a" r={node.r + 14} />
      <circle className="node-ring node-ring-b" r={node.r + 26} />
      <circle className="node-core" r={node.r} />
      <text className="node-mark" textAnchor="middle" dy="5">{node.mark}</text>
      <text className="node-name" textAnchor="middle" y={node.r + 26}>{node.short}</text>
      <circle
        className="node-hit"
        r={Math.max(38, node.r + 18)}
        role="button"
        tabIndex="0"
        aria-label={`${node.mark}: ${node.name}`}
        aria-pressed={selected}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(node.id)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(node.id)
          }
        }}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(node.id)}
        onBlur={() => onHover(null)}
      />
    </g>
  )
}

function Inspector({ node, onClose }) {
  if (!node) {
    return (
      <aside className="inspector inspector--idle" aria-live="polite">
        <p className="inspector-kicker">AADOE</p>
        <h1>Choose a property on the map</h1>
        <p className="inspector-lede">Drag to pan. Scroll to zoom. Each node is a host on thermalunderground.org.</p>
      </aside>
    )
  }

  const here = node.status === 'here'

  return (
    <aside className="inspector" aria-live="polite">
      <button type="button" className="inspector-close" onClick={onClose} aria-label="Clear selection">Close</button>
      <p className="inspector-kicker">{node.mark}</p>
      <div className="inspector-top">
        <h1>{node.name}</h1>
        <span className={`st st--${node.status}`}>{STATUS_LABEL[node.status]}</span>
      </div>
      <p className="host">{node.host}</p>
      <p className="does">{node.does}</p>
      {here ? null : (
        <a className="visit" href={node.href} target="_blank" rel="noreferrer">Visit</a>
      )}
    </aside>
  )
}

export default function App() {
  const [selected, setSelected] = useState(() => nodeFromPath())
  const [hovered, setHovered] = useState(null)
  const [view, setView] = useState({ x: 0, y: 0, k: 1 })
  const stageRef = useRef(null)
  const drag = useRef(null)
  const zoomAtRef = useRef(null)
  const selectedNode = selected ? nodeById[selected] : null

  const transform = useMemo(
    () => `translate(${view.x} ${view.y}) scale(${view.k})`,
    [view],
  )

  useEffect(() => {
    const onPop = () => setSelected(nodeFromPath())
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [])

  const select = (id) => {
    setSelected(id)
    const next = id ? `#${id}` : '/'
    if (window.location.hash.replace('#', '') !== (id || '')) {
      window.history.pushState({}, '', next)
    }
  }

  const zoomToward = (cx, cy, factor) => {
    setView((prev) => {
      const k = Math.min(MAX_K, Math.max(MIN_K, prev.k * factor))
      const ratio = k / prev.k
      return {
        k,
        x: cx - (cx - prev.x) * ratio,
        y: cy - (cy - prev.y) * ratio,
      }
    })
  }

  const zoomAt = (clientX, clientY, factor) => {
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const mx = ((clientX - rect.left) / rect.width) * VIEW.w
    const my = ((clientY - rect.top) / rect.height) * VIEW.h
    zoomToward(mx, my, factor)
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    if (e.target.closest('.inspector, .site-nav, .map-tools, .node-hit')) return
    stageRef.current?.setPointerCapture(e.pointerId)
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      ox: view.x,
      oy: view.y,
      moved: false,
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const dx = ((e.clientX - d.x) / rect.width) * VIEW.w
    const dy = ((e.clientY - d.y) / rect.height) * VIEW.h
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) d.moved = true
    setView((prev) => ({ ...prev, x: d.ox + dx, y: d.oy + dy }))
  }

  const onPointerUp = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.moved && e.target === stageRef.current) select(null)
    drag.current = null
  }

  zoomAtRef.current = zoomAt

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const onWheel = (e) => {
      e.preventDefault()
      zoomAtRef.current?.(e.clientX, e.clientY, e.deltaY > 0 ? 0.92 : 1.08)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="page">
      <div className="map-wash" aria-hidden="true">
        <img src="/mosaic-3.jpg" alt="" />
      </div>
      <div className="map-rays" aria-hidden="true" />

      <header className="site-nav">
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            select(null)
            setView({ x: 0, y: 0, k: 1 })
          }}
        >
          <img src="/logo.png" width="256" height="256" alt="" />
          <span className="brand-name">
            The Thermal Underground <i>AADOE</i>
          </span>
          <span className="demo-mark">Demo</span>
        </a>
      </header>

      <div
        className="stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          className="map"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label="Interactive map of Thermal Underground properties"
        >
          <g transform={transform}>
            <Terrain />
            {DISTRICTS.map((d) => (
              <text key={d.id} className="district" x={d.x} y={d.y} textAnchor="middle">{d.label}</text>
            ))}
            <Routes selected={selected} hovered={hovered} />
            {NODES.map((node) => (
              <Node
                key={node.id}
                node={node}
                selected={selected === node.id}
                hovered={hovered === node.id}
                onSelect={select}
                onHover={setHovered}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="map-tools">
        <button type="button" onClick={() => zoomToward(VIEW.w / 2, VIEW.h / 2, 1.12)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => zoomToward(VIEW.w / 2, VIEW.h / 2, 0.88)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setView({ x: 0, y: 0, k: 1 })}>Reset</button>
      </div>

      <Inspector node={selectedNode} onClose={() => select(null)} />

      <footer className="page-footer">
        <p>Thermal Underground © Adler Archer.</p>
        <p className="page-footer-note">Not an official U.S. government publication.</p>
      </footer>
    </div>
  )
}
