import { WORLD_LAND_D, WORLD_VIEWBOX } from './content/worldLand.js'

const WIDTH = 1000
const HEIGHT = 500

export function project(lon, lat) {
  return {
    x: (lon + 180) * (WIDTH / 360),
    y: (90 - lat) * (HEIGHT / 180),
  }
}

const MERIDIANS = [-150, -90, -30, 30, 90, 150]
const PARALLELS = [-60, -30, 0, 30, 60]

export default function WorldMap({ countries, regions, onCountry, onRegion }) {
  return (
    <svg
      className="world-map"
      viewBox={WORLD_VIEWBOX}
      role="img"
      aria-label="Overseas U.S. military installations by country and region"
    >
      <rect className="map-ocean" x="0" y="0" width={WIDTH} height={HEIGHT} />
      <g className="map-graticule" aria-hidden="true">
        {MERIDIANS.map((lon) => {
          const { x } = project(lon, 0)
          return <line key={`m${lon}`} x1={x} y1="0" x2={x} y2={HEIGHT} />
        })}
        {PARALLELS.map((lat) => {
          const { y } = project(0, lat)
          return <line key={`p${lat}`} x1="0" y1={y} x2={WIDTH} y2={y} />
        })}
      </g>
      <path className="map-land" d={WORLD_LAND_D} />
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
              onClick={() => onRegion(r.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRegion(r.id)
                }
              }}
            >
              {r.label}
            </text>
          )
        })}
      </g>
      <g className="map-pins">
        {countries.map((c, i) => {
          const { x, y } = project(c.lon, c.lat)
          const r = c.count > 4 ? 5.6 : c.count > 2 ? 4.6 : 3.6
          return (
            <g
              key={c.slug}
              className="map-pin"
              style={{ '--i': i }}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            >
              <circle className="map-pin-halo" r={r + 8} />
              <title>{`${c.name} (${c.count})`}</title>
              <circle
                className="map-pin-dot"
                r={r}
                role="button"
                tabIndex={0}
                aria-label={`${c.name}, ${c.count} installations`}
                onClick={() => onCountry(c.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onCountry(c.slug)
                  }
                }}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
