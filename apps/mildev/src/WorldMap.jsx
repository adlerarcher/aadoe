import { useEffect, useMemo, useRef, useState } from 'react'
import { WORLD_LAND_D } from './content/worldLand.js'

const WIDTH = 1000
const HEIGHT = 500
const WORLD_VB = { x: 0, y: 0, w: WIDTH, h: HEIGHT }
const ASPECT = WIDTH / HEIGHT

function project(lon, lat) {
  return {
    x: (lon + 180) * (WIDTH / 360),
    y: (90 - lat) * (HEIGHT / 180),
  }
}

function formatViewBox({ x, y, w, h }) {
  return `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Fit country pins for a region into a 2:1 viewBox with padding. */
function regionViewBox(regionId, countries) {
  const pts = countries.filter((c) => c.region === regionId)
  if (!pts.length) return WORLD_VB

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const c of pts) {
    const { x, y } = project(c.lon, c.lat)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  const pad = Math.max(28, 0.18 * Math.max(maxX - minX, maxY - minY, 40))
  minX -= pad
  maxX += pad
  minY -= pad
  maxY += pad

  let w = Math.max(maxX - minX, 1)
  let h = Math.max(maxY - minY, 1)
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2

  if (w / h > ASPECT) {
    h = w / ASPECT
  } else {
    w = h * ASPECT
  }

  // Single-country regions need a readable floor; dense clusters can go tighter.
  const minW = pts.length <= 2 ? 160 : 110
  if (w < minW) {
    w = minW
    h = minW / ASPECT
  }

  return {
    x: cx - w / 2,
    y: cy - h / 2,
    w,
    h,
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function useAnimatedViewBox(target) {
  const [current, setCurrent] = useState(target)
  const currentRef = useRef(target)
  const animRef = useRef(0)

  useEffect(() => {
    const from = currentRef.current
    const to = target
    if (
      from.x === to.x &&
      from.y === to.y &&
      from.w === to.w &&
      from.h === to.h
    ) {
      return undefined
    }

    if (prefersReducedMotion()) {
      currentRef.current = to
      setCurrent(to)
      return undefined
    }

    const duration = 520
    const start = performance.now()
    cancelAnimationFrame(animRef.current)

    const tick = (now) => {
      const t = easeInOut(Math.min(1, (now - start) / duration))
      const next = {
        x: lerp(from.x, to.x, t),
        y: lerp(from.y, to.y, t),
        w: lerp(from.w, to.w, t),
        h: lerp(from.h, to.h, t),
      }
      currentRef.current = next
      setCurrent(next)
      if (t < 1) animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [target.x, target.y, target.w, target.h])

  return current
}

const MERIDIANS = [-150, -90, -30, 30, 90, 150]
const PARALLELS = [-60, -30, 0, 30, 60]

export default function WorldMap({
  countries,
  regions,
  focusRegion,
  onFocusRegion,
  onCountry,
  onZoomOut,
}) {
  const targetVb = useMemo(() => {
    if (!focusRegion) return WORLD_VB
    return regionViewBox(focusRegion, countries)
  }, [focusRegion, countries])

  const viewBox = useAnimatedViewBox(targetVb)
  const zoomed = Boolean(focusRegion)
  const strokeScale = Math.max(viewBox.w / WIDTH, 0.35)

  return (
    <svg
      className={zoomed ? 'world-map is-zoomed' : 'world-map'}
      viewBox={formatViewBox(viewBox)}
      role="img"
      aria-label={
        zoomed
          ? `Region map. Select a country.`
          : 'Overseas U.S. military installations by country and region'
      }
    >
      <rect
        className="map-ocean"
        x={viewBox.x - viewBox.w}
        y={viewBox.y - viewBox.h}
        width={viewBox.w * 3}
        height={viewBox.h * 3}
        role="button"
        tabIndex={zoomed ? 0 : -1}
        aria-label={zoomed ? 'Zoom out to world map' : undefined}
        onClick={() => {
          if (zoomed) onZoomOut?.()
        }}
        onKeyDown={(e) => {
          if (!zoomed) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onZoomOut?.()
          }
        }}
      />
      <g className="map-graticule" aria-hidden="true">
        {MERIDIANS.map((lon) => {
          const { x } = project(lon, 0)
          return (
            <line
              key={`m${lon}`}
              x1={x}
              y1={-HEIGHT}
              x2={x}
              y2={HEIGHT * 2}
              strokeWidth={0.4 * strokeScale}
            />
          )
        })}
        {PARALLELS.map((lat) => {
          const { y } = project(0, lat)
          return (
            <line
              key={`p${lat}`}
              x1={-WIDTH}
              y1={y}
              x2={WIDTH * 2}
              y2={y}
              strokeWidth={0.4 * strokeScale}
            />
          )
        })}
      </g>
      <path
        className="map-land"
        d={WORLD_LAND_D}
        style={{ strokeWidth: 0.4 * strokeScale }}
        onClick={() => {
          if (zoomed) onZoomOut?.()
        }}
      />
      {!zoomed ? (
        <g className="map-regions">
          {regions.map((r) => {
            const { x, y } = project(r.lon, r.lat)
            return (
              <text
                key={r.id}
                className="map-region-label"
                x={x.toFixed(1)}
                y={y.toFixed(1)}
                role="button"
                tabIndex={0}
                aria-label={`Zoom to ${r.label}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onFocusRegion?.(r.id)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    onFocusRegion?.(r.id)
                  }
                }}
              >
                {r.label}
              </text>
            )
          })}
        </g>
      ) : null}
      <g className="map-pins">
        {countries.map((c, i) => {
          const inFocus = !zoomed || c.region === focusRegion
          if (zoomed && !inFocus) return null
          const { x, y } = project(c.lon, c.lat)
          const base = c.ranked ? 6.2 : c.count > 4 ? 4.4 : c.count > 2 ? 3.6 : 3
          const r = zoomed ? base * 1.35 : base
          return (
            <g
              key={c.slug}
              className={c.ranked ? 'map-pin is-ranked' : 'map-pin'}
              style={{ '--i': i }}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            >
              <circle className="map-pin-halo" r={r + (c.ranked ? 10 : 7)} />
              <title>
                {c.ranked
                  ? `${c.name} (geothermal priority ${c.rank})`
                  : `${c.name} (${c.count})`}
              </title>
              <circle
                className="map-pin-dot"
                r={r}
                role="button"
                tabIndex={0}
                aria-label={
                  c.ranked
                    ? `${c.name}, geothermal priority ${c.rank}, ${c.count} installations`
                    : `${c.name}, ${c.count} installations`
                }
                onClick={(e) => {
                  e.stopPropagation()
                  onCountry(c.slug)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    onCountry(c.slug)
                  }
                }}
              />
              {zoomed ? (
                <text
                  className="map-country-label"
                  y={-(r + 10)}
                  textAnchor="middle"
                  role="presentation"
                >
                  {c.name}
                </text>
              ) : null}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
