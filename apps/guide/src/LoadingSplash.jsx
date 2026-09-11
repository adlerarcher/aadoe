import { useEffect, useRef, useState } from 'react'
import BrandLogo from './BrandLogo.jsx'

const STATUS_LINES = ['Loading…']

const MIN_DURATION_MS = 3400
const EXIT_MS = 950

function useSplashHeat(canvasRef, active) {
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
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

    const embers = Array.from({ length: reduce ? 12 : 48 }, () => ({
      x: Math.random(),
      y: 1 + Math.random() * 0.2,
      s: 0.0008 + Math.random() * 0.002,
      wobble: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2.5,
    }))

    let t = 0
    const draw = () => {
      t += reduce ? 0.35 : 1
      const pulse = 0.5 + Math.sin(t * 0.04) * 0.5
      const heat = 0.55 + pulse * 0.35

      ctx.clearRect(0, 0, w, h)

      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, '#07080a')
      bg.addColorStop(0.55, `rgba(28, 14, 10, ${0.85 + heat * 0.1})`)
      bg.addColorStop(1, `rgba(120, 42, 12, ${0.55 + heat * 0.25})`)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const coreY = h * 0.52
      const coreR = Math.min(w, h) * (0.22 + pulse * 0.08)
      const core = ctx.createRadialGradient(cx, coreY, 0, cx, coreY, coreR)
      core.addColorStop(0, `rgba(255, 240, 180, ${0.35 + pulse * 0.25})`)
      core.addColorStop(0.35, `rgba(255, 130, 50, ${0.28 + pulse * 0.2})`)
      core.addColorStop(1, 'rgba(255, 80, 20, 0)')
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, coreY, coreR, 0, Math.PI * 2)
      ctx.fill()

      const column = ctx.createLinearGradient(cx, h, cx, coreY - coreR)
      column.addColorStop(0, 'rgba(255, 90, 30, 0)')
      column.addColorStop(0.45, `rgba(255, 120, 45, ${0.12 + pulse * 0.1})`)
      column.addColorStop(1, `rgba(255, 200, 120, ${0.08 + pulse * 0.12})`)
      ctx.fillStyle = column
      ctx.fillRect(cx - coreR * 0.35, 0, coreR * 0.7, h)

      ctx.globalCompositeOperation = 'lighter'
      for (const e of embers) {
        const y = ((e.y - t * e.s) % 1.25) * h
        const x = (e.x + Math.sin(t * 0.02 + e.wobble) * 0.04) * w
        const a = Math.max(0, 1 - y / h) * (0.15 + pulse * 0.2)
        ctx.fillStyle = `rgba(255, ${140 + pulse * 60}, 60, ${a})`
        ctx.beginPath()
        ctx.arc(x, y, e.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      for (let i = 0; i < 5; i++) {
        const ringR = coreR * (0.5 + i * 0.22) + (t * 0.6) % (coreR * 0.35)
        ctx.strokeStyle = `rgba(255, 140, 60, ${(0.22 - i * 0.035) * (0.6 + pulse * 0.4)})`
        ctx.lineWidth = 1.5 - i * 0.15
        ctx.beginPath()
        ctx.arc(cx, coreY, ringR, 0, Math.PI * 2)
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, active])
}

export default function LoadingSplash({ onComplete }) {
  const canvasRef = useRef(null)
  const finishedRef = useRef(false)
  const [exiting, setExiting] = useState(false)
  const [statusIdx, setStatusIdx] = useState(0)
  const [depth, setDepth] = useState(0)

  useSplashHeat(canvasRef, !exiting)

  useEffect(() => {
    document.body.classList.add('loading-splash-active')
    return () => document.body.classList.remove('loading-splash-active')
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const interval = reduce ? 900 : 520
    const id = setInterval(() => {
      setStatusIdx(i => (i + 1) % STATUS_LINES.length)
    }, interval)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 700 : MIN_DURATION_MS
    const start = performance.now()
    let raf

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - p) ** 2.2
      setDepth(Math.round(eased * 3840))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      setExiting(true)
      window.setTimeout(onComplete, reduce ? 420 : EXIT_MS)
    }

    const timer = window.setTimeout(finish, duration)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [onComplete])

  return (
    <div
      className={`loading-splash ${exiting ? 'loading-splash--exit' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-busy={!exiting}
      aria-label="Loading The Thermal Underground"
    >
      <canvas ref={canvasRef} className="loading-splash-canvas" aria-hidden="true" />
      <div className="loading-splash-grain" aria-hidden="true" />
      <div className="loading-splash-strata" aria-hidden="true" />

      <div className="loading-splash-rings" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} className="loading-splash-ring" style={{ '--ring-i': i }} />
        ))}
      </div>

      <div className="loading-splash-column" aria-hidden="true" />

      <div className="loading-splash-core">
        <BrandLogo variant="splash" alt="" />
      </div>

      <div className="loading-splash-readout">
        <p className="loading-splash-status" key={statusIdx}>
          {STATUS_LINES[statusIdx]}
        </p>
        <div className="loading-splash-depth">
          <span className="loading-splash-depth-value">{depth.toLocaleString()}</span>
          <span className="loading-splash-depth-unit">m</span>
          <span className="loading-splash-depth-label">below surface</span>
        </div>
        <div className="loading-splash-bar" aria-hidden="true">
          <span className="loading-splash-bar-fill" style={{ transform: `scaleX(${Math.min(1, depth / 3840)})` }} />
        </div>
      </div>
    </div>
  )
}
