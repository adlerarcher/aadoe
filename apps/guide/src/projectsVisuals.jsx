import { useEffect, useRef } from 'react'

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

function useCanvas() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const visible = useOnscreen(wrapRef)
  return { wrapRef, canvasRef, visible }
}

function setupCanvas(canvas, ctx) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { w, h, dpr }
}

function drawLabel(ctx, text, x, y, color = 'rgba(255,179,71,0.9)', size = 10, align = 'center') {
  ctx.font = `700 ${size}px "Space Mono", monospace`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.fillText(text, x, y)
}

const STAGES = [
  { label: 'PRE-EXPLORATION', risk: 0.88 },
  { label: 'EXPLORATION', risk: 0.78 },
  { label: 'DEVELOPMENT', risk: 0.92 },
  { label: 'COMMISSIONING', risk: 0.72 },
  { label: 'MAINTENANCE', risk: 0.22 },
]

function riskPoint(w, h, pad, index, risk) {
  const xSpan = w - pad.left - pad.right
  const ySpan = h - pad.top - pad.bottom
  const x = pad.left + (index / (STAGES.length - 1)) * xSpan
  const y = pad.top + (1 - risk) * ySpan
  return { x, y }
}

/** Area chart of geothermal project risk across five lifecycle stages. */
export function RiskProfileChart() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    let pulse = 0
    const pad = { left: 44, right: 16, top: 36, bottom: 52 }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) pulse = (pulse + 0.006) % 1

      const pts = STAGES.map((stage, i) => riskPoint(w, h, pad, i, stage.risk))

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ;['HIGH', 'MED', 'LOW'].forEach((label, i) => {
        const y = pad.top + (i / 2) * (h - pad.top - pad.bottom)
        ctx.beginPath()
        ctx.moveTo(pad.left, y)
        ctx.lineTo(w - pad.right, y)
        ctx.stroke()
        drawLabel(ctx, label, pad.left - 8, y + 3, 'rgba(255,179,71,0.45)', 7, 'right')
      })

      // filled risk envelope
      const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom)
      grad.addColorStop(0, 'rgba(220,60,40,0.45)')
      grad.addColorStop(0.55, 'rgba(255,120,40,0.35)')
      grad.addColorStop(1, 'rgba(255,180,90,0.08)')
      ctx.beginPath()
      ctx.moveTo(pts[0].x, h - pad.bottom)
      pts.forEach(p => ctx.lineTo(p.x, p.y))
      ctx.lineTo(pts[pts.length - 1].x, h - pad.bottom)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      // risk line
      ctx.strokeStyle = 'rgba(255,140,60,0.85)'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      pts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      })
      ctx.stroke()

      // stage markers
      pts.forEach((p, i) => {
        const glow = 6 + Math.sin((pulse + i * 0.15) * Math.PI * 2) * 2
        ctx.fillStyle = 'rgba(255,140,60,0.2)'
        ctx.strokeStyle = 'rgba(255,206,138,0.85)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, glow + 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(
          ctx,
          STAGES[i].label,
          p.x,
          h - pad.bottom + 18,
          'rgba(255,206,138,0.75)',
          Math.min(7, Math.max(5, w / 90)),
        )
      })

      drawLabel(ctx, 'RISK PROFILE', w / 2, 16, 'rgba(255,179,71,0.75)', 9)
      drawLabel(ctx, '20–30 YR PPA HORIZON →', w - pad.right, 16, 'rgba(255,140,60,0.55)', 7, 'right')

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [visible])

  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="Chart showing geothermal project risk high in early exploration and development, lower during long-term operation" />
    </div>
  )
}

/** Derrick, drill string, and wellbore schematic for Drilling 101 basics. */
export function RigSchematic() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    let pulse = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)
      if (visible.current) pulse = (pulse + 0.012) % 1

      const cx = w * 0.38
      const ground = h * 0.72
      const top = h * 0.12

      // ground
      ctx.fillStyle = 'rgba(255,140,60,0.12)'
      ctx.fillRect(0, ground, w, h - ground)
      ctx.strokeStyle = 'rgba(255,179,71,0.35)'
      ctx.beginPath()
      ctx.moveTo(0, ground)
      ctx.lineTo(w, ground)
      ctx.stroke()

      // derrick
      ctx.strokeStyle = 'rgba(255,179,71,0.55)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx - 28, ground)
      ctx.lineTo(cx, top)
      ctx.lineTo(cx + 28, ground)
      ctx.closePath()
      ctx.stroke()

      // wellbore
      const boreX = cx + w * 0.18
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillRect(boreX - 10, ground, 20, ground - top)
      ctx.strokeStyle = 'rgba(255,140,60,0.45)'
      ctx.strokeRect(boreX - 10, top, 20, ground - top)

      // drill string
      const stringTop = top + (ground - top) * (0.15 + Math.sin(pulse * Math.PI * 2) * 0.02)
      ctx.strokeStyle = 'rgba(255,206,138,0.85)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(boreX, stringTop)
      ctx.lineTo(boreX, ground - 8)
      ctx.stroke()

      // bit
      ctx.fillStyle = 'rgba(255,140,60,0.5)'
      ctx.beginPath()
      ctx.moveTo(boreX - 8, ground - 8)
      ctx.lineTo(boreX + 8, ground - 8)
      ctx.lineTo(boreX, ground + 2)
      ctx.closePath()
      ctx.fill()

      drawLabel(ctx, 'RIG', cx, top - 8, 'rgba(255,179,71,0.75)', 9)
      drawLabel(ctx, 'DRILL STRING', boreX + 24, stringTop + 20, 'rgba(255,206,138,0.7)', 7, 'left')
      drawLabel(ctx, 'BIT', boreX, ground + 18, 'rgba(255,140,60,0.85)', 8)
      drawLabel(ctx, 'WELLBORE', boreX + 24, ground - 40, 'rgba(255,206,138,0.7)', 7, 'left')

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

/** BHA stack: pipe, collars, stabilizer, bit. */
export function BhaDiagram() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    let pulse = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)
      if (visible.current) pulse = (pulse + 0.01) % 1

      const cx = w * 0.5
      const top = h * 0.14
      const bottom = h * 0.82
      const segments = [
        { label: 'DRILL PIPE', h: 0.22, color: 'rgba(255,206,138,0.35)' },
        { label: 'HWDP', h: 0.08, color: 'rgba(255,179,71,0.4)' },
        { label: 'COLLARS', h: 0.18, color: 'rgba(255,140,60,0.45)' },
        { label: 'STABILIZER', h: 0.06, color: 'rgba(255,206,138,0.3)' },
        { label: 'BIT', h: 0.1, color: 'rgba(255,100,40,0.55)' },
      ]

      let y = top
      segments.forEach(seg => {
        const sh = (bottom - top) * seg.h
        ctx.fillStyle = seg.color
        ctx.strokeStyle = 'rgba(255,179,71,0.5)'
        ctx.lineWidth = 1.5
        ctx.fillRect(cx - 18, y, 36, sh)
        ctx.strokeRect(cx - 18, y, 36, sh)
        drawLabel(ctx, seg.label, cx + 42, y + sh / 2 + 3, 'rgba(255,206,138,0.75)', 7, 'left')
        y += sh
      })

      // rotation hint on bit
      const bitY = bottom - (bottom - top) * segments[segments.length - 1].h
      ctx.strokeStyle = 'rgba(255,140,60,0.7)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, bitY + 20, 10 + Math.sin(pulse * Math.PI * 2) * 2, 0, Math.PI * 2)
      ctx.stroke()

      drawLabel(ctx, 'BOTTOM-HOLE ASSEMBLY', cx, h * 0.06, 'rgba(255,179,71,0.75)', 9)
      drawLabel(ctx, '↓ WEIGHT ON BIT', cx, bottom + 16, 'rgba(255,140,60,0.6)', 7)

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

/** Mud loop from pits through drill string and back. */
export function MudCirculation() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const path = (t) => {
      const x0 = w * 0.12
      const y0 = h * 0.78
      const x1 = w * 0.35
      const y1 = h * 0.22
      const x2 = w * 0.55
      const y2 = h * 0.78
      const x3 = w * 0.82
      const y3 = h * 0.55
      if (t < 0.25) {
        const u = t / 0.25
        return { x: x0 + (x1 - x0) * u, y: y0 + (y1 - y0) * u }
      }
      if (t < 0.5) {
        const u = (t - 0.25) / 0.25
        return { x: x1 + (x2 - x1) * u, y: y1 + (y2 - y1) * u }
      }
      if (t < 0.75) {
        const u = (t - 0.5) / 0.25
        return { x: x2 + (x3 - x2) * u, y: y2 + (y3 - y2) * u }
      }
      const u = (t - 0.75) / 0.25
      return { x: x3 + (x0 - x3) * u, y: y3 + (y0 - y3) * u }
    }

    let phase = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)
      if (visible.current) phase = (phase + 0.004) % 1

      ctx.strokeStyle = 'rgba(255,140,60,0.28)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i <= 40; i++) {
        const p = path(i / 40)
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()

      ;['PITS', 'PUMP', 'STRING', 'SHAKERS'].forEach((label, i) => {
        const p = path((i + 0.5) / 4)
        ctx.fillStyle = 'rgba(255,140,60,0.15)'
        ctx.strokeStyle = 'rgba(255,179,71,0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, label, p.x, p.y + 4, 'rgba(255,206,138,0.8)', 7)
      })

      for (let i = 0; i < 5; i++) {
        const t = (phase + i * 0.18) % 1
        const p = path(t)
        ctx.fillStyle = 'rgba(255,206,138,0.9)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      drawLabel(ctx, 'MUD CIRCULATION', w / 2, h * 0.08, 'rgba(255,179,71,0.75)', 9)

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
