import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────
// HeatField — a full-viewport canvas of rising convective heat. The intensity
// is driven by the global --heat value (0 surface .. 1 core). Plumes of warm
// noise rise and curl; near the core they bloom into molten light.
// ─────────────────────────────────────────────────────────────────────────
export function HeatField({ heatRef }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, dpr
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // a set of rising plumes
    const N = 28
    const plumes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 60 + Math.random() * 160,
      s: 0.0006 + Math.random() * 0.0014,
      drift: (Math.random() - 0.5) * 0.0004,
      seed: Math.random() * 1000,
    }))

    const lerp = (a, b, t) => a + (b - a) * t

    let t = 0
    const draw = () => {
      const heat = heatRef.current // 0..1
      t += reduce ? 0 : 1

      ctx.clearRect(0, 0, w, h)

      // base vertical warmth: brighter toward the bottom, intensifying with heat
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      const topA = lerp(0.0, 0.10, heat)
      const botA = lerp(0.12, 0.6, heat)
      grad.addColorStop(0, `rgba(40,30,30,${topA})`)
      grad.addColorStop(1, `rgba(255,110,40,${botA})`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'
      for (const p of plumes) {
        const px = (p.x + Math.sin((t * p.s) + p.seed) * 0.06 + p.drift * t) * w
        // plumes rise: y decreases over time, wrapping
        const ry = (p.y - (t * p.s)) % 1
        const py = (ry < 0 ? ry + 1 : ry) * h
        const radius = p.r * (0.7 + heat * 0.8)
        const intensity = lerp(0.04, 0.22, heat)
        const g = ctx.createRadialGradient(px, py, 0, px, py, radius)
        // hue warms with heat
        const core = heat > 0.5
          ? `rgba(255,${Math.round(lerp(180, 120, heat))},60,${intensity})`
          : `rgba(255,150,70,${intensity})`
        g.addColorStop(0, core)
        g.addColorStop(1, 'rgba(255,120,40,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [heatRef])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  )
}

// shared: run a draw loop only while the element is on screen
function useOnscreen(ref) {
  const visible = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { visible.current = e.isIntersecting },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

// ─────────────────────────────────────────────────────────────────────────
// GradientProbe — a thermometer column. A bead descends; the rock around it
// reddens with depth, and the temperature readout climbs. Demonstrates the
// geothermal gradient: hotter as you go down.
// ─────────────────────────────────────────────────────────────────────────
export function GradientProbe() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)
    let p = 0 // 0..1 descent
    const draw = () => {
      if (visible.current) p += (1 - p) * 0.012 + 0.0008
      if (p > 1) p = 1
      ctx.clearRect(0, 0, w, h)
      // rock column, reddening downward
      const cx = w * 0.5
      const colW = Math.min(54, w * 0.16)
      for (let y = 0; y < h; y += 2) {
        const d = y / h
        const r = Math.round(40 + d * 200)
        const g = Math.round(28 + d * 60)
        const b = Math.round(30 + d * 10)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(cx - colW / 2, y, colW, 2)
      }
      // probe bead
      const by = p * h
      const glow = ctx.createRadialGradient(cx, by, 0, cx, by, 26)
      glow.addColorStop(0, 'rgba(255,220,120,0.95)')
      glow.addColorStop(1, 'rgba(255,140,40,0)')
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(cx, by, 26, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff4d6'
      ctx.beginPath(); ctx.arc(cx, by, 5, 0, Math.PI * 2); ctx.fill()
      // depth + temp readout
      const km = (p * 6).toFixed(1)
      const temp = Math.round(15 + p * 6 * 28)
      ctx.font = '700 13px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(255,230,200,0.9)'
      ctx.textAlign = 'left'
      ctx.fillText(`${km} km`, cx + colW / 2 + 14, by - 4)
      ctx.fillStyle = '#ffb347'
      ctx.fillText(`${temp}\u00b0C`, cx + colW / 2 + 14, by + 14)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])
  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// FracturePropagation — cracks spreading outward through hot dry rock from an
// injection point, then heat blooming along the new fracture network. This is
// the EGS idea: engineer the permeability nature withheld.
// ─────────────────────────────────────────────────────────────────────────
export function FracturePropagation() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    let branches = []
    let started = false
    const seed = () => {
      branches = []
      const ox = w * 0.5, oy = h * 0.5
      const count = 7
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.4
        branches.push({ x: ox, y: oy, a, len: 0, max: 60 + Math.random() * Math.min(w, h) * 0.4, gen: 0, pts: [[ox, oy]] })
      }
    }
    seed()

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // hot dry rock backdrop
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#2a1410'); g.addColorStop(1, '#3a160e')
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)

      if (visible.current && !started) { started = true }
      if (started) frame++

      // grow branches
      for (const b of branches) {
        if (b.len < b.max && started) {
          b.a += (Math.random() - 0.5) * 0.35
          const step = 2.4
          b.x += Math.cos(b.a) * step
          b.y += Math.sin(b.a) * step
          b.len += step
          b.pts.push([b.x, b.y])
          // occasional split
          if (Math.random() < 0.015 && branches.length < 60 && b.gen < 3) {
            branches.push({ x: b.x, y: b.y, a: b.a + (Math.random() - 0.5), len: 0, max: b.max * 0.5, gen: b.gen + 1, pts: [[b.x, b.y]] })
          }
        }
      }
      // draw fractures with heat glow
      ctx.lineCap = 'round'
      for (const b of branches) {
        ctx.beginPath()
        ctx.moveTo(b.pts[0][0], b.pts[0][1])
        for (const [x, y] of b.pts) ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(255,150,60,0.85)'
        ctx.lineWidth = 1.6
        ctx.shadowColor = 'rgba(255,120,40,0.9)'
        ctx.shadowBlur = 12
        ctx.stroke()
      }
      ctx.shadowBlur = 0
      // injection point pulse
      const pulse = 6 + Math.sin(frame * 0.08) * 3
      const ig = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 30)
      ig.addColorStop(0, 'rgba(255,235,180,0.95)')
      ig.addColorStop(1, 'rgba(255,150,60,0)')
      ctx.fillStyle = ig
      ctx.beginPath(); ctx.arc(w / 2, h / 2, 30, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff6da'
      ctx.beginPath(); ctx.arc(w / 2, h / 2, pulse, 0, Math.PI * 2); ctx.fill()

      // reseed periodically to keep it alive
      const allDone = branches.every(b => b.len >= b.max)
      if (allDone && started && frame % 1 === 0) {
        if (!draw._cool) draw._cool = frame
        if (frame - draw._cool > 90) { seed(); draw._cool = null; frame = 0 }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])
  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// HydrothermalReservoir — heat, water, and permeable rock already aligned.
// Fluid moves through natural fractures in a hot aquifer, rises up a well,
// and vents as steam at the surface. The mature triple-coincidence path.
// ─────────────────────────────────────────────────────────────────────────
export function HydrothermalReservoir() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    const wellX = () => w * 0.54
    const surfaceY = () => h * 0.14
    const capTop = () => h * 0.42
    const resTop = () => h * 0.58
    const resBot = () => h * 0.78

    // natural fracture paths through the reservoir (parametric curves)
    const fractures = [
      { y0: 0.62, amp: 0.04, freq: 2.1, phase: 0.2 },
      { y0: 0.66, amp: 0.035, freq: 2.6, phase: 1.1 },
      { y0: 0.70, amp: 0.045, freq: 1.8, phase: 2.4 },
      { y0: 0.74, amp: 0.03, freq: 2.9, phase: 0.8 },
    ]

    const fracturePoint = (f, t) => {
      const x = t * w
      const yBase = f.y0 * h
      const y = yBase + Math.sin(t * Math.PI * f.freq + f.phase) * f.amp * h
      return [x, y]
    }

    const aquiferParticles = Array.from({ length: 36 }, (_, i) => ({
      f: i % fractures.length,
      t: Math.random(),
      speed: 0.0012 + Math.random() * 0.0014,
    }))

    const wellParticles = Array.from({ length: 18 }, (_, i) => ({
      y: resTop() + Math.random() * (resBot() - resTop()),
      speed: 0.35 + Math.random() * 0.55,
      r: 1.6 + Math.random() * 2.2,
      wobble: Math.random() * Math.PI * 2,
    }))

    const steamPuffs = Array.from({ length: 8 }, (_, i) => ({
      x: wellX() + (Math.random() - 0.5) * 16,
      y: surfaceY() - 8,
      life: i / 8,
      speed: 0.004 + Math.random() * 0.003,
    }))

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      frame++

      const wx = wellX()
      const sy = surfaceY()
      const rt = resTop()
      const rb = resBot()
      const ct = capTop()

      // sky / surface band
      const sky = ctx.createLinearGradient(0, 0, 0, sy)
      sky.addColorStop(0, '#1a1210')
      sky.addColorStop(1, '#241814')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, sy + 2)

      // cap rock (impermeable)
      const cap = ctx.createLinearGradient(0, sy, 0, rt)
      cap.addColorStop(0, '#3a2824')
      cap.addColorStop(1, '#2e1e18')
      ctx.fillStyle = cap
      ctx.fillRect(0, sy, w, rt - sy)

      // hot permeable reservoir
      const res = ctx.createLinearGradient(0, rt, 0, rb)
      res.addColorStop(0, 'rgba(255,120,50,0.08)')
      res.addColorStop(0.5, 'rgba(255,90,35,0.22)')
      res.addColorStop(1, 'rgba(255,70,25,0.14)')
      ctx.fillStyle = res
      ctx.fillRect(0, rt, w, rb - rt)

      // basement
      const base = ctx.createLinearGradient(0, rb, 0, h)
      base.addColorStop(0, '#2a1612')
      base.addColorStop(1, '#1a0e0c')
      ctx.fillStyle = base
      ctx.fillRect(0, rb, w, h - rb)

      // stratum lines
      ctx.strokeStyle = 'rgba(255,200,160,0.06)'
      ctx.lineWidth = 1
      for (const y of [sy + (rt - sy) * 0.35, rt - 4, rb + 6]) {
        ctx.beginPath()
        ctx.moveTo(0, y); ctx.lineTo(w, y)
        ctx.stroke()
      }

      // natural fractures
      ctx.lineCap = 'round'
      for (const f of fractures) {
        ctx.beginPath()
        for (let i = 0; i <= 48; i++) {
          const t = i / 48
          const [x, y] = fracturePoint(f, t)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = 'rgba(255,160,80,0.35)'
        ctx.lineWidth = 2.2
        ctx.shadowColor = 'rgba(255,120,40,0.5)'
        ctx.shadowBlur = 10
        ctx.stroke()
      }
      ctx.shadowBlur = 0

      // aquifer flow (water through permeable rock)
      if (visible.current && !reduce) {
        for (const p of aquiferParticles) {
          p.t = (p.t + p.speed) % 1
          const [x, y] = fracturePoint(fractures[p.f], p.t)
          const heat = 0.55 + Math.sin(p.t * Math.PI) * 0.35
          ctx.fillStyle = `rgba(${Math.round(120 + heat * 135)},${Math.round(170 - heat * 70)},${Math.round(220 - heat * 170)},0.85)`
          ctx.shadowColor = 'rgba(255,180,100,0.6)'
          ctx.shadowBlur = 6
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.shadowBlur = 0

      // production well casing
      ctx.strokeStyle = 'rgba(210,190,170,0.35)'
      ctx.lineWidth = 7
      ctx.lineCap = 'butt'
      ctx.beginPath()
      ctx.moveTo(wx, sy + 6); ctx.lineTo(wx, rb - 4)
      ctx.stroke()
      ctx.strokeStyle = 'rgba(255,200,150,0.12)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(wx, sy + 6); ctx.lineTo(wx, rb - 4)
      ctx.stroke()

      // perforations at reservoir
      for (let i = 0; i < 5; i++) {
        const py = rt + 8 + i * ((rb - rt - 16) / 4)
        ctx.fillStyle = 'rgba(255,180,90,0.55)'
        ctx.fillRect(wx - 4, py, 8, 2)
      }

      // hot fluid rising in well
      if (visible.current && !reduce) {
        for (const p of wellParticles) {
          p.y -= p.speed
          p.wobble += 0.06
          if (p.y < sy + 10) {
            p.y = rt + Math.random() * (rb - rt)
            p.x = wx
          }
          const depth = (p.y - sy) / (rb - sy)
          const heat = Math.max(0, Math.min(1, 1 - depth * 0.35))
          const px = wx + Math.sin(p.wobble) * 2.5
          ctx.fillStyle = `rgba(${Math.round(180 + heat * 75)},${Math.round(140 + heat * 40)},${Math.round(80 + heat * 20)},${0.65 + heat * 0.35})`
          ctx.shadowColor = 'rgba(255,150,60,0.75)'
          ctx.shadowBlur = 10
          ctx.beginPath(); ctx.arc(px, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.shadowBlur = 0

      // surface plant + steam
      ctx.fillStyle = 'rgba(200,180,160,0.18)'
      ctx.fillRect(wx - 22, sy - 2, 44, 10)
      ctx.strokeStyle = 'rgba(255,210,160,0.35)'
      ctx.lineWidth = 1.5
      ctx.strokeRect(wx - 22, sy - 2, 44, 10)

      if (visible.current && !reduce) {
        for (const s of steamPuffs) {
          s.life = (s.life + s.speed) % 1
          const alpha = (1 - s.life) * 0.45
          const radius = 6 + s.life * 22
          const sx = wx + Math.sin(s.life * Math.PI * 2 + s.x) * (8 + s.life * 12)
          const sy2 = sy - 12 - s.life * 36
          const sg = ctx.createRadialGradient(sx, sy2, 0, sx, sy2, radius)
          sg.addColorStop(0, `rgba(255,240,210,${alpha})`)
          sg.addColorStop(1, 'rgba(255,180,100,0)')
          ctx.fillStyle = sg
          ctx.beginPath(); ctx.arc(sx, sy2, radius, 0, Math.PI * 2); ctx.fill()
        }
      }

      // three-ingredient legend
      const legendY = h * 0.9
      const items = [
        { label: 'HEAT', x: w * 0.18, color: '#ff8a3c' },
        { label: 'WATER', x: w * 0.5, color: '#8ec8e8' },
        { label: 'ROCK', x: w * 0.82, color: '#c4a090' },
      ]
      ctx.font = '700 9px "Space Mono", monospace'
      ctx.textAlign = 'center'
      for (const item of items) {
        ctx.fillStyle = item.color
        ctx.beginPath(); ctx.arc(item.x, legendY - 10, 4, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = 'rgba(255,230,210,0.75)'
        ctx.fillText(item.label, item.x, legendY + 4)
      }

      // reservoir callout
      ctx.font = '700 10px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(255,180,100,0.75)'
      ctx.textAlign = 'left'
      ctx.fillText('PERMEABLE RESERVOIR', w * 0.06, rt + (rb - rt) * 0.55)

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])
  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// DirectHeatUse — heat delivered straight to buildings. District hot-water
// pipes and shallow ground loops warm interiors directly, no turbine.
// ─────────────────────────────────────────────────────────────────────────
export function DirectHeatUse() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    const surfaceY = () => h * 0.26
    const shallowTop = () => surfaceY() + h * 0.06
    const shallowBot = () => surfaceY() + h * 0.32

    const buildings = () => [
      { x: w * 0.34, w: w * 0.22, h: h * 0.17, roof: 0.08 },
      { x: w * 0.66, w: w * 0.16, h: h * 0.13, roof: 0.06 },
    ]

    // district heating pipe: source → building A → building B
    const districtPath = (t) => {
      const sy = surfaceY()
      const pipeY = sy + h * 0.11
      const bs = buildings()
      const b0 = bs[0]
      const b1 = bs[1]
      const srcX = w * 0.06
      const j0 = b0.x + b0.w * 0.35
      const j1 = b1.x + b1.w * 0.5
      if (t < 0.22) {
        const k = t / 0.22
        return [srcX + (j0 - srcX) * k, pipeY]
      }
      if (t < 0.58) {
        const k = (t - 0.22) / 0.36
        return [j0 + (j1 - j0) * k, pipeY - k * h * 0.025]
      }
      const k = (t - 0.58) / 0.42
      return [j1, pipeY - h * 0.025 + k * h * 0.04]
    }

    // shallow ground loop under building A (serpentine)
    const loopPath = (t) => {
      const b = buildings()[0]
      const y = shallowTop() + (shallowBot() - shallowTop()) * 0.55
      const x0 = b.x + b.w * 0.1
      const x1 = b.x + b.w * 0.9
      const waves = 3
      const x = x0 + (x1 - x0) * t
      const wave = Math.sin(t * Math.PI * waves * 2) * (b.w * 0.08)
      return [x, y + wave]
    }

    const districtParticles = Array.from({ length: 22 }, (_, i) => ({ t: i / 22 }))
    const loopParticles = Array.from({ length: 16 }, (_, i) => ({ t: i / 16 }))
    const heatWaves = Array.from({ length: 12 }, (_, i) => ({
      b: i % 2,
      x: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.01,
    }))

    let season = 0 // 0 winter heat in, 1 summer heat out

    const drawBuilding = (b, warm) => {
      const sy = surfaceY()
      const bx = b.x
      const bw = b.w
      const bh = b.h
      const by = sy - bh

      // warm interior glow
      const glow = ctx.createLinearGradient(bx, by, bx, sy)
      glow.addColorStop(0, `rgba(255,160,80,${warm * 0.22})`)
      glow.addColorStop(1, `rgba(255,120,50,${warm * 0.08})`)
      ctx.fillStyle = glow
      ctx.fillRect(bx + 2, by + bh * 0.15, bw - 4, bh * 0.85)

      // walls
      ctx.fillStyle = 'rgba(180,155,135,0.22)'
      ctx.fillRect(bx, by + bh * 0.12, bw, bh * 0.88)
      ctx.strokeStyle = 'rgba(255,220,190,0.35)'
      ctx.lineWidth = 1.5
      ctx.strokeRect(bx, by + bh * 0.12, bw, bh * 0.88)

      // roof
      ctx.beginPath()
      ctx.moveTo(bx - 4, by + bh * 0.12)
      ctx.lineTo(bx + bw * 0.5, by - bh * b.roof)
      ctx.lineTo(bx + bw + 4, by + bh * 0.12)
      ctx.closePath()
      ctx.fillStyle = 'rgba(160,130,110,0.28)'
      ctx.fill()
      ctx.stroke()

      // windows
      const winRows = 2
      const winCols = 2
      for (let r = 0; r < winRows; r++) {
        for (let c = 0; c < winCols; c++) {
          const wx = bx + bw * (0.22 + c * 0.38)
          const wy = by + bh * (0.35 + r * 0.28)
          ctx.fillStyle = `rgba(255,${Math.round(180 + warm * 60)},${Math.round(100 + warm * 40)},${0.35 + warm * 0.45})`
          ctx.fillRect(wx, wy, bw * 0.14, bh * 0.14)
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const sy = surfaceY()
      const st = shallowTop()
      const sb = shallowBot()

      if (visible.current && !reduce) {
        season += 0.0018
        if (season > 1) season = 0
      }
      const warm = 0.65 + Math.sin(season * Math.PI * 2) * 0.35

      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, sy)
      sky.addColorStop(0, '#14100e')
      sky.addColorStop(1, '#1e1612')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, sy)

      // shallow ground
      const soil = ctx.createLinearGradient(0, sy, 0, h)
      soil.addColorStop(0, '#2a2018')
      soil.addColorStop(0.25, '#322418')
      soil.addColorStop(1, '#1a100c')
      ctx.fillStyle = soil
      ctx.fillRect(0, sy, w, h - sy)

      // steady shallow temperature band
      const band = ctx.createLinearGradient(0, st, 0, sb)
      band.addColorStop(0, 'rgba(255,140,60,0.04)')
      band.addColorStop(0.5, 'rgba(255,120,50,0.14)')
      band.addColorStop(1, 'rgba(255,100,40,0.06)')
      ctx.fillStyle = band
      ctx.fillRect(0, st, w, sb - st)

      // geothermal source (small vent at left)
      const srcX = w * 0.06
      const srcY = sy + h * 0.08
      ctx.fillStyle = 'rgba(200,170,150,0.2)'
      ctx.beginPath()
      ctx.arc(srcX, srcY, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,200,150,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(srcX, sy)
      ctx.lineTo(srcX, srcY + 14)
      ctx.stroke()

      // district heating pipe
      ctx.lineWidth = 6
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'rgba(200,170,140,0.22)'
      ctx.beginPath()
      for (let i = 0; i <= 40; i++) {
        const [x, y] = districtPath(i / 40)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // shallow loop pipe
      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(180,200,210,0.25)'
      ctx.beginPath()
      for (let i = 0; i <= 36; i++) {
        const [x, y] = loopPath(i / 36)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // hot water in district pipe
      if (visible.current && !reduce) {
        for (const p of districtParticles) {
          p.t = (p.t + 0.0022) % 1
          const [x, y] = districtPath(p.t)
          ctx.fillStyle = 'rgba(255,170,90,0.9)'
          ctx.shadowColor = 'rgba(255,130,50,0.8)'
          ctx.shadowBlur = 8
          ctx.beginPath(); ctx.arc(x, y, 2.8, 0, Math.PI * 2); ctx.fill()
        }
        for (const p of loopParticles) {
          p.t = (p.t + 0.0016) % 1
          const [x, y] = loopPath(p.t)
          const goingOut = p.t < 0.5
          ctx.fillStyle = goingOut
            ? 'rgba(140,190,220,0.85)'
            : 'rgba(255,160,90,0.85)'
          ctx.shadowColor = goingOut ? 'rgba(120,180,220,0.6)' : 'rgba(255,130,50,0.7)'
          ctx.shadowBlur = 6
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill()
        }
      }
      ctx.shadowBlur = 0

      // buildings on top
      buildings().forEach((b, i) => drawBuilding(b, warm * (i === 0 ? 1 : 0.85)))

      // rising heat into buildings (direct use)
      if (visible.current && !reduce) {
        for (const wave of heatWaves) {
          wave.phase += wave.speed
          const b = buildings()[wave.b]
          const bx = b.x + b.w * wave.x
          const sy2 = surfaceY()
          const rise = (Math.sin(wave.phase) + 1) * 0.5
          const y = sy2 - rise * b.h * 0.75
          const alpha = (1 - rise) * 0.35 * warm
          const wg = ctx.createRadialGradient(bx, y, 0, bx, y, 14)
          wg.addColorStop(0, `rgba(255,190,110,${alpha})`)
          wg.addColorStop(1, 'rgba(255,140,60,0)')
          ctx.fillStyle = wg
          ctx.beginPath(); ctx.arc(bx, y, 14, 0, Math.PI * 2); ctx.fill()
        }
      }

      // labels
      ctx.font = '700 9px "Space Mono", monospace'
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(255,180,100,0.8)'
      ctx.fillText('DISTRICT HEAT', w * 0.12, sy + h * 0.07)
      ctx.fillStyle = 'rgba(160,200,220,0.75)'
      ctx.fillText('SHALLOW LOOP', buildings()[0].x, sb - 6)
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(255,220,190,0.7)'
      ctx.fillText('HEAT AS HEAT', w * 0.5, h * 0.93)

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])
  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// CirculationLoop — fluid descends cold, picks up heat at depth, rises hot,
// spins a turbine at the surface, returns. The closed surface loop shared by
// hydrothermal and EGS.
// ─────────────────────────────────────────────────────────────────────────
export function CirculationLoop() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    // U-shaped path: down the left, across the hot bottom, up the right
    const particles = Array.from({ length: 40 }, (_, i) => ({ t: i / 40 }))
    let turbine = 0

    const pathPoint = (t) => {
      // t in 0..1 around the loop
      const mL = w * 0.32, mR = w * 0.68
      const top = h * 0.16, bot = h * 0.84
      if (t < 0.4) { // down left
        const k = t / 0.4
        return [mL, top + (bot - top) * k]
      } else if (t < 0.6) { // across bottom
        const k = (t - 0.4) / 0.2
        return [mL + (mR - mL) * k, bot]
      } else { // up right
        const k = (t - 0.6) / 0.4
        return [mR, bot - (bot - top) * k]
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const top = h * 0.16, bot = h * 0.84, mL = w * 0.32, mR = w * 0.68
      // rock, hotter at depth
      const g = ctx.createLinearGradient(0, top, 0, bot)
      g.addColorStop(0, 'rgba(60,40,38,0.0)')
      g.addColorStop(1, 'rgba(255,110,40,0.18)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)

      // pipes
      ctx.lineWidth = 10; ctx.lineCap = 'round'
      ctx.strokeStyle = 'rgba(200,180,165,0.18)'
      ctx.beginPath()
      ctx.moveTo(mL, top); ctx.lineTo(mL, bot); ctx.lineTo(mR, bot); ctx.lineTo(mR, top)
      ctx.stroke()

      if (visible.current) turbine += 0.06

      // particles, colored by depth/heat
      for (const p of particles) {
        p.t = (p.t + 0.0016) % 1
        const [x, y] = pathPoint(p.t)
        const depth = (y - top) / (bot - top) // 0..1
        // cold blue going down (left), hot orange coming up (right)
        const goingUp = p.t > 0.6
        const heat = goingUp ? 1 : depth
        const r = Math.round(120 + heat * 135)
        const gr = Math.round(140 - heat * 60)
        const b = Math.round(200 - heat * 160)
        ctx.fillStyle = `rgb(${r},${gr},${b})`
        ctx.shadowColor = `rgba(${r},${gr},${b},0.8)`
        ctx.shadowBlur = 8
        ctx.beginPath(); ctx.arc(x, y, 3.4, 0, Math.PI * 2); ctx.fill()
      }
      ctx.shadowBlur = 0

      // turbine at top center
      const tx = (mL + mR) / 2, ty = top
      ctx.save(); ctx.translate(tx, ty); ctx.rotate(turbine)
      ctx.strokeStyle = '#ffce8a'; ctx.lineWidth = 3
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2)
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -16); ctx.stroke()
      }
      ctx.restore()
      ctx.fillStyle = '#fff2d4'
      ctx.beginPath(); ctx.arc(tx, ty, 4, 0, Math.PI * 2); ctx.fill()

      // labels
      ctx.font = '700 10px "Space Mono", monospace'
      ctx.fillStyle = 'rgba(150,180,200,0.8)'; ctx.textAlign = 'center'
      ctx.fillText('COLD IN', mL, top - 12)
      ctx.fillStyle = 'rgba(255,170,90,0.9)'
      ctx.fillText('HOT OUT', mR, top - 12)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])
  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
