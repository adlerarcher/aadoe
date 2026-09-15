import { useEffect, useMemo, useRef, useState } from 'react'
import { withBase } from './basePath.js'
import { RING_OF_FIRE_GEO } from './content/ranking.js'
import { ringOfFirePathD } from './content/ringOfFirePath.js'
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

  const pad = Math.max(36, 0.22 * Math.max(maxX - minX, maxY - minY, 40))
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

  // Keep region zooms readable; avoid empty-looking silhouettes.
  const minW = pts.length <= 2 ? 200 : pts.length <= 5 ? 160 : 130
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

function useRingPathLength(pathRef, d) {
  const [length, setLength] = useState(0)
  useEffect(() => {
    const el = pathRef.current
    if (!el || typeof el.getTotalLength !== 'function') return
    setLength(el.getTotalLength())
  }, [d])
  return length
}

const MERIDIANS = [-150, -90, -30, 30, 90, 150]
const PARALLELS = [-60, -30, 0, 30, 60]

const ROF_HOST_HIGHLIGHTS = Object.entries(RING_OF_FIRE_GEO).map(([name, geo]) => ({
  name,
  ...geo,
  ...project(geo.lon, geo.lat),
}))

export default function WorldMap({
  countries,
  ringCountries = [],
  regions,
  focusRegion,
  onFocusRegion,
  onCountry,
  onZoomOut,
}) {
  const focusPoints = useMemo(() => {
    if (!focusRegion) return countries
    return countries.filter((c) => c.region === focusRegion)
  }, [countries, focusRegion])

  const targetVb = useMemo(() => {
    if (!focusRegion) return WORLD_VB
    return regionViewBox(focusRegion, focusPoints)
  }, [focusRegion, focusPoints])

  const viewBox = useAnimatedViewBox(targetVb)
  const zoomed = Boolean(focusRegion)
  const strokeScale = Math.max(viewBox.w / WIDTH, 0.35)
  // Keep labels readable under zoom by scaling with viewBox width.
  const labelSize = zoomed ? Math.max(7, Math.min(14, viewBox.w * 0.045)) : 9

  const ringPathD = useMemo(() => ringOfFirePathD(project), [])
  const ringPathRef = useRef(null)
  const ringLen = useRingPathLength(ringPathRef, ringPathD)

  const ringOpacity = zoomed ? 0.42 : 1
  const ringStroke = zoomed ? 1.35 * strokeScale : 1.8
  const ringGlowStroke = zoomed ? 5.5 * strokeScale : 7.5

  const hostHighlights = useMemo(() => {
    if (!focusRegion) return ROF_HOST_HIGHLIGHTS
    return ROF_HOST_HIGHLIGHTS.filter((h) => h.region === focusRegion)
  }, [focusRegion])

  return (
    <svg
      className={zoomed ? 'world-map is-zoomed' : 'world-map'}
      viewBox={formatViewBox(viewBox)}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={
        zoomed
          ? 'Region map. Select a country.'
          : 'International geothermal markets and overseas installations'
      }
    >
      <defs>
        <radialGradient id="rof-host-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5B819" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#F5B819" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F5B819" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="map-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5B819" stopOpacity="0" />
          <stop offset="45%" stopColor="#F5B819" stopOpacity="0.07" />
          <stop offset="55%" stopColor="#E8EBE4" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#F5B819" stopOpacity="0" />
        </linearGradient>
      </defs>
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
      {!zoomed ? (
        <rect
          className="map-light-sweep"
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill="url(#map-sweep)"
          pointerEvents="none"
          aria-hidden="true"
        />
      ) : null}
      <path
        className="map-land"
        d={WORLD_LAND_D}
        style={{ strokeWidth: 0.4 * strokeScale }}
        onClick={() => {
          if (zoomed) onZoomOut?.()
        }}
      />
      <g className="map-rof-hosts" aria-hidden="true" pointerEvents="none">
        {hostHighlights.map((h) => (
          <circle
            key={h.name}
            className="map-rof-host-glow"
            cx={h.x.toFixed(1)}
            cy={h.y.toFixed(1)}
            r={zoomed ? 28 * strokeScale : 22}
            fill="url(#rof-host-glow)"
          />
        ))}
      </g>
      <g
        className={[
          'map-ring-of-fire',
          zoomed ? 'is-zoomed' : '',
          ringLen ? 'is-measured' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ opacity: ringOpacity }}
        aria-hidden="true"
        pointerEvents="none"
      >
        <path
          className="map-ring-glow"
          d={ringPathD}
          fill="none"
          strokeWidth={ringGlowStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={ringPathRef}
          className="map-ring-path"
          d={ringPathD}
          fill="none"
          strokeWidth={ringStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            ringLen
              ? {
                  strokeDasharray: ringLen,
                  '--ring-len': ringLen,
                }
              : undefined
          }
        />
        <path
          className="map-ring-flow"
          d={ringPathD}
          fill="none"
          strokeWidth={Math.max(0.9, ringStroke * 0.55)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
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
        {focusPoints.map((c, i) => {
          if (zoomed && c.region !== focusRegion) return null
          if (!zoomed && !c.hasInstallations) return null
          const { x, y } = project(c.lon, c.lat)
          const base = c.hasInstallations
            ? c.count > 4
              ? 4.4
              : c.count > 2
                ? 3.6
                : 3.2
            : 4.0
          const r = zoomed ? base * 1.5 : base
          const pinClass = [
            'map-pin',
            !c.hasInstallations ? 'is-market-only' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <g
              key={`${c.slug}-${c.hasInstallations ? 'host' : 'ring'}`}
              className={pinClass}
              style={{ '--i': i }}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            >
              <a
                className="map-country-link"
                href={withBase(`/geothermal/markets/${encodeURIComponent(c.slug)}`)}
                aria-label={
                  c.hasInstallations
                    ? `${c.name}, ${c.count} installations`
                    : `${c.name}, market profile`
                }
                onClick={(e) => {
                  e.stopPropagation()
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                  e.preventDefault()
                  onCountry?.(c.slug)
                }}
              >
                <circle className="map-pin-halo" r={r + 7} />
                <title>
                  {c.hasInstallations
                    ? `${c.name} (${c.count} installations)`
                    : `${c.name} (market profile)`}
                </title>
                <circle className="map-pin-dot" r={r} />
                {zoomed ? (
                  <text
                    className="map-country-label"
                    y={-(r + 8)}
                    textAnchor="middle"
                    fontSize={labelSize}
                  >
                    {c.name}
                  </text>
                ) : null}
              </a>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
