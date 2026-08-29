import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  base: number
  phase: number
  hue: 'violet' | 'cyan'
}

/**
 * Subtle twinkling particle field rendered on a fixed canvas.
 * Skips entirely for users who prefer reduced motion; pauses with the
 * browser tab via requestAnimationFrame.
 */
export default function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let width = 0
    let height = 0
    let particles: Particle[] = []

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      base: 0.14 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.35 ? 'violet' : 'cyan',
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const count = Math.min(90, Math.round((width * height) / 24_000))
      particles = Array.from({ length: count }, spawn)
    }

    let t = 0
    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
        const alpha = p.base * (0.6 + 0.4 * Math.sin(t * 1.4 + p.phase))
        ctx.beginPath()
        ctx.arc(p.x * dpr, p.y * dpr, p.r * dpr, 0, Math.PI * 2)
        ctx.fillStyle =
          p.hue === 'violet' ? `rgba(167, 139, 250, ${alpha})` : `rgba(103, 232, 249, ${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
