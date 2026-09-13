/**
 * Pacific Ring of Fire volcanic arc (equirectangular lon/lat).
 * Horseshoe open across the southern Pacific; antimeridian split for SVG.
 */

/** Waypoints along the arc, Chile → Aleutians → Kamchatka → NZ. */
export const RING_OF_FIRE_ARC = [
  // Andes / South America
  { lon: -68.5, lat: -55.5 },
  { lon: -70.5, lat: -48 },
  { lon: -72, lat: -40 },
  { lon: -71.5, lat: -33 },
  { lon: -72, lat: -23 },
  { lon: -75, lat: -15 },
  { lon: -78, lat: -8 },
  { lon: -79.5, lat: -1 },
  { lon: -78, lat: 5 },
  // Central America
  { lon: -84, lat: 10 },
  { lon: -88, lat: 13.5 },
  { lon: -92, lat: 15 },
  // Mexico / Cascadia
  { lon: -100, lat: 19 },
  { lon: -105, lat: 22 },
  { lon: -110, lat: 27 },
  { lon: -118, lat: 34 },
  { lon: -124, lat: 42 },
  { lon: -128, lat: 48 },
  // Aleutian arc (westward toward antimeridian)
  { lon: -140, lat: 54 },
  { lon: -155, lat: 55 },
  { lon: -165, lat: 53.5 },
  { lon: -175, lat: 52 },
  { lon: -179.5, lat: 51.5 },
  // Resume east of antimeridian
  { lon: 179.5, lat: 51.2 },
  { lon: 172, lat: 52 },
  { lon: 163, lat: 54 },
  // Kamchatka / Kurils / Japan
  { lon: 158, lat: 53 },
  { lon: 156, lat: 48 },
  { lon: 148, lat: 44 },
  { lon: 142, lat: 40 },
  { lon: 140, lat: 35 },
  { lon: 138, lat: 30 },
  // Ryukyu / Taiwan / Philippines
  { lon: 130, lat: 27 },
  { lon: 122, lat: 24 },
  { lon: 121, lat: 18 },
  { lon: 122, lat: 12 },
  { lon: 125, lat: 6 },
  // Indonesia / Banda / PNG
  { lon: 120, lat: 0 },
  { lon: 118, lat: -5 },
  { lon: 115, lat: -8 },
  { lon: 120, lat: -9 },
  { lon: 130, lat: -8 },
  { lon: 140, lat: -6 },
  { lon: 147, lat: -6 },
  { lon: 155, lat: -8 },
  // Melanesia / Tonga-Kermadec / NZ
  { lon: 165, lat: -15 },
  { lon: 172, lat: -22 },
  { lon: 175, lat: -30 },
  { lon: 176, lat: -38 },
  { lon: 174, lat: -42 },
  { lon: 170, lat: -46 },
]

/**
 * Split arc at the antimeridian so the SVG path does not draw across the map.
 * @returns {Array<Array<{lon:number,lat:number}>>}
 */
export function ringOfFireSegments(points = RING_OF_FIRE_ARC) {
  if (!points.length) return []
  const segments = [[points[0]]]
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const jump = Math.abs(cur.lon - prev.lon)
    if (jump > 160) {
      segments.push([cur])
    } else {
      segments[segments.length - 1].push(cur)
    }
  }
  return segments.filter((s) => s.length >= 2)
}

/**
 * Build SVG path `d` from projected points.
 * @param {(lon:number, lat:number) => {x:number,y:number}} project
 */
export function ringOfFirePathD(project, points = RING_OF_FIRE_ARC) {
  return ringOfFireSegments(points)
    .map((seg) => {
      const xy = seg.map((p) => project(p.lon, p.lat))
      return xy
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join('')
    })
    .join('')
}
