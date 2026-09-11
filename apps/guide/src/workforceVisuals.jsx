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

// Adjacent O&G skills flowing into geothermal hiring
export function SkillCrossover() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const movers = Array.from({ length: 14 }, (_, i) => ({
      t: i / 14,
      lane: i % 3,
      speed: 0.002 + (i % 5) * 0.0004,
    }))

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const bg = ctx.createLinearGradient(0, 0, w, 0)
      bg.addColorStop(0, '#1a1210')
      bg.addColorStop(0.5, '#241610')
      bg.addColorStop(1, '#1a1510')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      const lx = w * 0.22
      const rx = w * 0.78
      const cy = h * 0.52

      // left: derrick silhouette
      ctx.strokeStyle = 'rgba(200,170,140,0.35)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(lx, cy + 40)
      ctx.lineTo(lx, cy - 50)
      ctx.lineTo(lx - 18, cy + 40)
      ctx.lineTo(lx + 18, cy + 40)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(lx, cy - 50)
      ctx.lineTo(lx + 28, cy + 10)
      ctx.stroke()

      // right: geothermal wellhead
      ctx.fillStyle = 'rgba(255,130,50,0.15)'
      ctx.fillRect(rx - 10, cy - 20, 20, 60)
      ctx.strokeStyle = 'rgba(255,160,80,0.55)'
      ctx.strokeRect(rx - 10, cy - 20, 20, 60)
      const steam = 10 + Math.sin(frame * 0.06) * 4
      const sg = ctx.createRadialGradient(rx, cy - 28, 0, rx, cy - 28, steam + 16)
      sg.addColorStop(0, 'rgba(255,220,160,0.55)')
      sg.addColorStop(1, 'rgba(255,130,50,0)')
      ctx.fillStyle = sg
      ctx.beginPath()
      ctx.arc(rx, cy - 28, steam + 16, 0, Math.PI * 2)
      ctx.fill()

      drawLabel(ctx, 'O&G / MINING', lx, cy + 62, 'rgba(200,180,160,0.65)', 9)
      drawLabel(ctx, 'GEOTHERMAL', rx, cy + 62, 'rgba(255,179,71,0.85)', 9)

      if (visible.current) frame++
      const midX = w * 0.5
      ctx.setLineDash([4, 6])
      ctx.strokeStyle = 'rgba(255,140,60,0.25)'
      ctx.beginPath()
      ctx.moveTo(lx + 24, cy)
      ctx.lineTo(rx - 24, cy)
      ctx.stroke()
      ctx.setLineDash([])

      for (const m of movers) {
        if (visible.current) m.t = (m.t + m.speed) % 1
        const y = cy - 18 + m.lane * 14
        const x = lx + 20 + m.t * (rx - lx - 40)
        const heat = m.t
        ctx.fillStyle = `rgba(${Math.round(180 + heat * 75)},${Math.round(150 - heat * 40)},${Math.round(120 - heat * 80)},0.9)`
        ctx.beginPath()
        ctx.arc(x, y, 3.2, 0, Math.PI * 2)
        ctx.fill()
      }

      drawLabel(ctx, 'TRANSFERABLE SKILLS', midX, h * 0.16, 'rgba(255,140,60,0.75)', 9)
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

// Four-step hiring pipeline: adjacent → retraining → project → fleet
export function WorkforcePipeline() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const steps = ['ADJACENT', 'RETRAIN', 'PROJECT', 'FLEET']
    let pulse = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#181210'
      ctx.fillRect(0, 0, w, h)

      const pad = w * 0.08
      const gap = (w - pad * 2) / (steps.length - 1)
      const y = h * 0.48

      if (visible.current) pulse = (pulse + 0.004) % 1

      ctx.strokeStyle = 'rgba(255,140,60,0.22)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(pad, y)
      ctx.lineTo(w - pad, y)
      ctx.stroke()

      steps.forEach((label, i) => {
        const x = pad + gap * i
        const active = Math.floor(pulse * steps.length) === i
        ctx.fillStyle = active ? 'rgba(255,140,60,0.95)' : 'rgba(255,140,60,0.35)'
        ctx.beginPath()
        ctx.arc(x, y, active ? 9 : 7, 0, Math.PI * 2)
        ctx.fill()
        drawLabel(ctx, label, x, y + 28, active ? '#ffb347' : 'rgba(233,220,200,0.55)', 8)
        drawLabel(ctx, String(i + 1).padStart(2, '0'), x, y - 22, 'rgba(255,140,60,0.45)', 8)
      })

      const px = pad + pulse * (w - pad * 2)
      const glow = ctx.createRadialGradient(px, y, 0, px, y, 18)
      glow.addColorStop(0, 'rgba(255,220,140,0.8)')
      glow.addColorStop(1, 'rgba(255,140,60,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(px, y, 18, 0, Math.PI * 2)
      ctx.fill()

      drawLabel(ctx, 'SKILLS INTO THE FIELD', w / 2, h * 0.14, 'rgba(255,179,71,0.8)', 9)
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

// Three parallel hiring lanes
export function ThreeLanes() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const lanes = [
      { label: 'FIELD', color: '#ff8a3c' },
      { label: 'REVIEW', color: '#ffb347' },
      { label: 'COMMUNITY', color: '#ffce8a' },
    ]
    const dots = lanes.flatMap((_, li) =>
      Array.from({ length: 6 }, (_, i) => ({ lane: li, t: i / 6, speed: 0.003 + li * 0.0005 })),
    )

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#15110f'
      ctx.fillRect(0, 0, w, h)

      const colW = w / 3
      lanes.forEach((lane, i) => {
        const cx = colW * i + colW / 2
        ctx.strokeStyle = `${lane.color}33`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cx, h * 0.22)
        ctx.lineTo(cx, h * 0.78)
        ctx.stroke()
        drawLabel(ctx, lane.label, cx, h * 0.14, lane.color, 9)
      })

      for (const d of dots) {
        if (visible.current) d.t = (d.t + d.speed) % 1
        const cx = colW * d.lane + colW / 2
        const y = h * 0.22 + d.t * (h * 0.56)
        ctx.fillStyle = lanes[d.lane].color
        ctx.globalAlpha = 0.55 + d.t * 0.45
        ctx.beginPath()
        ctx.arc(cx, y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      drawLabel(ctx, 'THREE HIRING LANES', w / 2, h * 0.9, 'rgba(255,179,71,0.65)', 9)
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

// Rig pipe rotating into a geothermal wellbore
export function RigCrossover() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    let depth = 0
    let rotation = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const top = h * 0.12
      const bot = h * 0.88
      const cx = w * 0.5

      for (let y = top; y < bot; y += 3) {
        const d = (y - top) / (bot - top)
        ctx.fillStyle = `rgb(${Math.round(35 + d * 90)},${Math.round(24 + d * 30)},${Math.round(22 + d * 8)})`
        ctx.fillRect(cx - w * 0.18, y, w * 0.36, 3)
      }

      if (visible.current) {
        depth = Math.min(1, depth + 0.003)
        rotation += 0.04
      }

      const pipeY = top + depth * (bot - top - 40)
      ctx.strokeStyle = 'rgba(210,190,170,0.55)'
      ctx.lineWidth = 14
      ctx.beginPath()
      ctx.moveTo(cx, top)
      ctx.lineTo(cx, pipeY)
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, top + 8)
      ctx.rotate(rotation)
      ctx.strokeStyle = '#ffce8a'
      ctx.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        ctx.rotate((Math.PI * 2) / 3)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -14)
        ctx.stroke()
      }
      ctx.restore()

      drawLabel(ctx, `${Math.round(depth * 3200)} m`, cx + w * 0.14, pipeY, '#ffb347', 11, 'left')
      drawLabel(ctx, 'DIRECTIONAL DRILL', cx, top - 8, 'rgba(255,179,71,0.8)', 9)
      drawLabel(ctx, 'GEOTHERMAL WELLBORE', cx, bot + 16, 'rgba(255,140,60,0.7)', 8)
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

// Stackable credentials building upward
export function CredentialStack() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const blocks = ['SAFETY', 'WELL CONTROL', 'GEOTHERMAL', 'PLACEMENT']
    let built = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#161210'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) built = Math.min(blocks.length, built + 0.015)

      const bw = Math.min(220, w * 0.62)
      const bh = 34
      const cx = w / 2
      const baseY = h * 0.78

      for (let i = 0; i < blocks.length; i++) {
        const show = Math.min(1, Math.max(0, built - i))
        if (show <= 0) continue
        const y = baseY - (i + 1) * (bh + 8)
        const alpha = 0.35 + show * 0.55
        ctx.fillStyle = `rgba(255,140,60,${alpha * 0.22})`
        ctx.strokeStyle = `rgba(255,179,71,${alpha * 0.85})`
        ctx.lineWidth = 1.5
        ctx.fillRect(cx - bw / 2, y, bw, bh)
        ctx.strokeRect(cx - bw / 2, y, bw, bh)
        drawLabel(ctx, blocks[i], cx, y + bh / 2 + 4, `rgba(255,220,180,${alpha})`, 9)
      }

      drawLabel(ctx, 'STACKABLE CREDENTIALS', cx, h * 0.12, 'rgba(255,179,71,0.75)', 9)
      drawLabel(ctx, 'PACT CONSORTIUM', cx, h * 0.2, 'rgba(233,220,200,0.45)', 8)
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

// Pressure gauge and BOP shut-in response
export function WellControlPanel() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    let phase = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141010'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) phase = (phase + 0.006) % 1

      const kick = phase < 0.55 ? phase / 0.55 : 1 - (phase - 0.55) / 0.45
      const pressure = 1200 + kick * 900
      const stackTempC = Math.round(95 + kick * 110)
      const shutIn = phase >= 0.55
      const overStandard = stackTempC > 121
      const overHT = stackTempC > 177

      // gauge
      const gx = w * 0.34
      const gy = h * 0.46
      const gr = Math.min(w, h) * 0.22
      ctx.strokeStyle = 'rgba(255,179,71,0.35)'
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.arc(gx, gy, gr, Math.PI * 0.75, Math.PI * 2.25)
      ctx.stroke()

      const needleAngle = Math.PI * 0.75 + (Math.min(pressure, 2800) / 2800) * Math.PI * 1.5
      ctx.strokeStyle = kick > 0.7 ? '#ff6a1f' : '#ffb347'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(gx, gy)
      ctx.lineTo(gx + Math.cos(needleAngle) * (gr - 8), gy + Math.sin(needleAngle) * (gr - 8))
      ctx.stroke()

      drawLabel(ctx, `${Math.round(pressure)} psi`, gx, gy + gr + 24, kick > 0.7 ? '#ff8a3c' : '#ffb347', 11)
      drawLabel(ctx, 'ANNULAR PRESSURE', gx, gy - gr - 16, 'rgba(255,179,71,0.7)', 8)

      // BOP stack
      const bx = w * 0.72
      const by = h * 0.34
      const bw = 44
      const gap = shutIn ? 2 : 14
      ctx.fillStyle = 'rgba(80,70,65,0.8)'
      ctx.fillRect(bx - bw / 2, by, bw, 28)
      ctx.fillRect(bx - bw / 2, by + 36, bw, 28)
      ctx.fillStyle = shutIn ? 'rgba(255,140,60,0.85)' : 'rgba(200,180,160,0.45)'
      ctx.fillRect(bx - bw / 2 - 4, by + 28 - gap / 2, bw + 8, gap)

      drawLabel(ctx, shutIn ? 'SHUT IN' : 'MONITOR', bx, by + 88, shutIn ? '#ff8a3c' : 'rgba(233,220,200,0.55)', 9)
      drawLabel(ctx, 'BOPE', bx, by - 14, 'rgba(255,179,71,0.65)', 8)
      drawLabel(ctx, `${stackTempC}\u00b0C`, bx, by + 104, overHT ? '#ff6a1f' : overStandard ? '#ff8a3c' : 'rgba(255,179,71,0.65)', 9)
      drawLabel(ctx, overHT ? 'OVER HT ELASTOMER' : overStandard ? 'OVER STD ELASTOMER' : 'ELASTOMER OK', bx, by + 118, overHT ? '#ff6a1f' : overStandard ? '#ff8a3c' : 'rgba(233,220,200,0.45)', 7)

      if (kick > 0.65 && !shutIn) {
        drawLabel(ctx, 'KICK DETECTED', w / 2, h * 0.12, '#ff6a1f', 10)
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

// Layered environmental review statutes
export function ReviewStack() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const layers = [
      { label: 'NEPA', offset: 0 },
      { label: 'NHPA / Section 106', offset: 1 },
      { label: 'ESA', offset: 2 },
      { label: 'STATE GW', offset: 3 },
    ]
    let scan = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) scan = (scan + 0.003) % 1

      const cx = w / 2
      const docW = Math.min(240, w * 0.7)
      const docH = 38
      const startY = h * 0.24

      layers.forEach((layer, i) => {
        const y = startY + i * (docH + 10)
        const x = cx - docW / 2 + i * 6
        const active = scan > i / layers.length && scan < (i + 1.2) / layers.length
        ctx.fillStyle = active ? 'rgba(255,140,60,0.18)' : 'rgba(255,255,255,0.04)'
        ctx.strokeStyle = active ? 'rgba(255,179,71,0.85)' : 'rgba(255,179,71,0.25)'
        ctx.lineWidth = 1.5
        ctx.fillRect(x, y, docW, docH)
        ctx.strokeRect(x, y, docW, docH)
        drawLabel(ctx, layer.label, x + docW / 2, y + docH / 2 + 4, active ? '#ffb347' : 'rgba(233,220,200,0.5)', 8)
      })

      const markerY = startY + scan * (layers.length * (docH + 10))
      ctx.strokeStyle = 'rgba(255,106,31,0.8)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(cx - docW / 2 - 16, markerY)
      ctx.lineTo(cx + docW / 2 + 20, markerY)
      ctx.stroke()

      drawLabel(ctx, 'REVIEW STACK', cx, h * 0.12, 'rgba(255,179,71,0.75)', 9)
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

// Agency → consultant → project site career path
export function PermittingPath() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const nodes = [
      { label: 'AGENCY', x: 0.16 },
      { label: 'CONSULT', x: 0.5 },
      { label: 'PROJECT', x: 0.84 },
    ]
    let traveler = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#151210'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) traveler = (traveler + 0.0025) % 1

      const y = h * 0.5
      ctx.strokeStyle = 'rgba(255,140,60,0.22)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(w * nodes[0].x, y)
      ctx.lineTo(w * nodes[2].x, y)
      ctx.stroke()

      nodes.forEach((node, i) => {
        const x = w * node.x
        ctx.fillStyle = 'rgba(255,140,60,0.12)'
        ctx.strokeStyle = 'rgba(255,179,71,0.55)'
        ctx.beginPath()
        ctx.arc(x, y, 22, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, node.label, x, y + 40, 'rgba(255,179,71,0.75)', 8)
        drawLabel(ctx, String(i + 1).padStart(2, '0'), x, y + 4, '#ffce8a', 9)
      })

      const seg = traveler * 2
      const idx = Math.min(1, Math.floor(seg))
      const localT = seg - idx
      const x0 = w * nodes[idx].x
      const x1 = w * nodes[idx + 1].x
      const px = x0 + (x1 - x0) * localT
      ctx.fillStyle = '#ff8a3c'
      ctx.beginPath()
      ctx.arc(px, y, 5, 0, Math.PI * 2)
      ctx.fill()

      drawLabel(ctx, 'NEPA ENTRY PATH', w / 2, h * 0.16, 'rgba(255,179,71,0.7)', 9)
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

// Local and Tribal partner network with skills orbiting communities
export function CommunityNetwork() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const center = { x: 0.5, y: 0.5, label: 'PROJECT' }
    const partners = [
      { x: 0.22, y: 0.28, label: 'TRIBAL' },
      { x: 0.78, y: 0.28, label: 'LOCAL' },
      { x: 0.22, y: 0.72, label: 'TCU' },
      { x: 0.78, y: 0.72, label: 'WORKFORCE' },
    ]
    const orbiters = Array.from({ length: 10 }, (_, i) => ({
      partner: i % partners.length,
      a: (i / 10) * Math.PI * 2,
      speed: 0.012 + (i % 3) * 0.004,
      r: 16 + (i % 4) * 4,
    }))

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141110'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) frame++

      const cx = w * center.x
      const cy = h * center.y

      partners.forEach(p => {
        const px = w * p.x
        const py = h * p.y
        ctx.strokeStyle = 'rgba(255,140,60,0.18)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(px, py)
        ctx.stroke()
        ctx.fillStyle = 'rgba(255,140,60,0.14)'
        ctx.strokeStyle = 'rgba(255,179,71,0.5)'
        ctx.beginPath()
        ctx.arc(px, py, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, p.label, px, py + 34, 'rgba(255,179,71,0.7)', 8)
      })

      ctx.fillStyle = 'rgba(255,140,60,0.25)'
      ctx.strokeStyle = '#ff8a3c'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, 24, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      drawLabel(ctx, center.label, cx, cy + 4, '#ffce8a', 8)

      for (const o of orbiters) {
        if (visible.current) o.a += o.speed
        const p = partners[o.partner]
        const px = w * p.x
        const py = h * p.y
        const ox = px + Math.cos(o.a) * o.r
        const oy = py + Math.sin(o.a) * o.r
        ctx.fillStyle = 'rgba(255,206,138,0.85)'
        ctx.beginPath()
        ctx.arc(ox, oy, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      drawLabel(ctx, 'SKILLS STAY LOCAL', w / 2, h * 0.1, 'rgba(255,179,71,0.75)', 9)
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

// PACT consortium triangle: college, employer, workforce board
export function ConsortiumModel() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const verts = [
      { x: 0.5, y: 0.2, label: '2-YR COLLEGE / TCU' },
      { x: 0.18, y: 0.78, label: 'EMPLOYERS (×2)' },
      { x: 0.82, y: 0.78, label: 'WORKFORCE BOARD' },
    ]
    let pulse = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#151210'
      ctx.fillRect(0, 0, w, h)

      if (visible.current) pulse = (pulse + 0.008) % 1

      const pts = verts.map(v => ({ x: w * v.x, y: h * v.y, label: v.label }))
      ctx.strokeStyle = 'rgba(255,140,60,0.35)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      ctx.lineTo(pts[1].x, pts[1].y)
      ctx.lineTo(pts[2].x, pts[2].y)
      ctx.closePath()
      ctx.stroke()

      const mid = {
        x: (pts[0].x + pts[1].x + pts[2].x) / 3,
        y: (pts[0].y + pts[1].y + pts[2].y) / 3,
      }
      const glow = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, 40 + Math.sin(pulse * Math.PI * 2) * 8)
      glow.addColorStop(0, 'rgba(255,180,90,0.35)')
      glow.addColorStop(1, 'rgba(255,140,60,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(mid.x, mid.y, 48, 0, Math.PI * 2)
      ctx.fill()
      drawLabel(ctx, 'PACT', mid.x, mid.y + 4, '#ffb347', 10)

      pts.forEach(p => {
        ctx.fillStyle = 'rgba(255,140,60,0.15)'
        ctx.strokeStyle = 'rgba(255,179,71,0.6)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, p.label, p.x, p.y + (p.y < h * 0.5 ? -26 : 34), 'rgba(255,206,138,0.8)', 7)
      })

      drawLabel(ctx, 'REGIONAL CONSORTIUM', w / 2, h * 0.08, 'rgba(255,179,71,0.7)', 9)
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

// DOE HGEO hub with program spokes
export function ProgramHub() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const spokes = ['MLEF', 'ORISE', 'INTERN', 'GEODE', 'UTR', 'PACT', 'COMP']
    let spin = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.32

      if (visible.current) spin += 0.003

      spokes.forEach((label, i) => {
        const a = (i / spokes.length) * Math.PI * 2 + spin
        const x = cx + Math.cos(a) * R
        const y = cy + Math.sin(a) * R
        ctx.strokeStyle = 'rgba(255,140,60,0.22)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fillStyle = 'rgba(255,140,60,0.12)'
        ctx.strokeStyle = 'rgba(255,179,71,0.55)'
        ctx.beginPath()
        ctx.arc(x, y, 16, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, label, x, y + 4, 'rgba(255,206,138,0.85)', 7)
      })

      ctx.fillStyle = 'rgba(255,140,60,0.3)'
      ctx.strokeStyle = '#ff8a3c'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, 28, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      drawLabel(ctx, 'HGEO', cx, cy + 4, '#ffce8a', 10)
      drawLabel(ctx, 'DOE WORKFORCE HUB', cx, h * 0.1, 'rgba(255,179,71,0.75)', 9)
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

// Student → lab → industry internship path
export function InternPipeline() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const stops = [
      { x: 0.14, label: 'STUDENT' },
      { x: 0.42, label: 'LAB / ORISE' },
      { x: 0.7, label: 'INDUSTRY' },
      { x: 0.9, label: 'HIRE' },
    ]
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#151210'
      ctx.fillRect(0, 0, w, h)

      const y = h * 0.52
      ctx.strokeStyle = 'rgba(255,140,60,0.25)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(w * stops[0].x, y)
      stops.forEach(s => ctx.lineTo(w * s.x, y))
      ctx.stroke()

      stops.forEach((s, i) => {
        const x = w * s.x
        ctx.fillStyle = 'rgba(255,140,60,0.12)'
        ctx.strokeStyle = 'rgba(255,179,71,0.55)'
        ctx.fillRect(x - 22, y - 16, 44, 32)
        ctx.strokeRect(x - 22, y - 16, 44, 32)
        drawLabel(ctx, s.label, x, y + 34, 'rgba(255,206,138,0.8)', 7)
        drawLabel(ctx, `${i + 1}`, x, y + 4, '#ffb347', 9)
      })

      if (visible.current) t = (t + 0.003) % 1
      const idx = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)))
      const local = (t * (stops.length - 1)) - idx
      const x0 = w * stops[idx].x
      const x1 = w * stops[idx + 1].x
      const px = x0 + (x1 - x0) * local
      ctx.fillStyle = '#fff2d4'
      ctx.beginPath()
      ctx.arc(px, y, 5, 0, Math.PI * 2)
      ctx.fill()

      drawLabel(ctx, 'MLEF · ORISE · INTERN', w / 2, h * 0.14, 'rgba(255,179,71,0.75)', 9)
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

// Grant funds radiating to regional consortia
export function GrantFlow() {
  const { wrapRef, canvasRef, visible } = useCanvas()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const resize = () => { ({ w, h } = setupCanvas(canvas, ctx)) }
    resize()
    window.addEventListener('resize', resize)

    const regions = [
      { x: 0.2, y: 0.3, label: 'GEODE' },
      { x: 0.8, y: 0.28, label: 'UTR' },
      { x: 0.24, y: 0.74, label: 'PACT' },
      { x: 0.76, y: 0.72, label: 'COMP' },
    ]
    const packets = regions.flatMap((r, i) =>
      Array.from({ length: 3 }, (_, j) => ({ region: i, t: j / 3, speed: 0.004 + j * 0.001 })),
    )

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#141210'
      ctx.fillRect(0, 0, w, h)

      const sx = w / 2
      const sy = h / 2

      ctx.fillStyle = 'rgba(255,140,60,0.28)'
      ctx.strokeStyle = '#ff8a3c'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(sx, sy, 26, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      drawLabel(ctx, 'DOE', sx, sy + 4, '#ffce8a', 10)

      regions.forEach(r => {
        const rx = w * r.x
        const ry = h * r.y
        ctx.strokeStyle = 'rgba(255,140,60,0.15)'
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(rx, ry)
        ctx.stroke()
        ctx.fillStyle = 'rgba(255,140,60,0.1)'
        ctx.strokeStyle = 'rgba(255,179,71,0.5)'
        ctx.beginPath()
        ctx.arc(rx, ry, 18, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        drawLabel(ctx, r.label, rx, ry + 30, 'rgba(255,206,138,0.8)', 8)
      })

      for (const p of packets) {
        if (visible.current) p.t = (p.t + p.speed) % 1
        const r = regions[p.region]
        const rx = w * r.x
        const ry = h * r.y
        const px = sx + (rx - sx) * p.t
        const py = sy + (ry - sy) * p.t
        ctx.fillStyle = `rgba(255,180,90,${0.35 + p.t * 0.55})`
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      drawLabel(ctx, 'GRANTS & COMPETITIONS', w / 2, h * 0.08, 'rgba(255,179,71,0.75)', 9)
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
