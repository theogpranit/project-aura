'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alphaDir: number
}

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    // Initialize particles
    const count = 60
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
    }))

    const GRID = 60
    const CYAN = '0, 212, 255'

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw grid with parallax distortion near mouse
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += GRID) {
        const dist = Math.abs(x - mx)
        const influence = Math.max(0, 1 - dist / 200) * 8
        ctx.beginPath()
        for (let y = 0; y <= canvas.height; y += 4) {
          const dy = Math.abs(y - my)
          const yInfluence = Math.max(0, 1 - dy / 200) * influence
          const opacity = 0.04 + influence * 0.02
          ctx.strokeStyle = `rgba(${CYAN}, ${Math.min(0.15, opacity)})`
          const px = x + (mx > x ? 1 : -1) * yInfluence
          if (y === 0) ctx.moveTo(px, y)
          else ctx.lineTo(px, y)
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += GRID) {
        const dist = Math.abs(y - my)
        const influence = Math.max(0, 1 - dist / 200) * 8
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 4) {
          const dx = Math.abs(x - mx)
          const xInfluence = Math.max(0, 1 - dx / 200) * influence
          const opacity = 0.04 + influence * 0.02
          ctx.strokeStyle = `rgba(${CYAN}, ${Math.min(0.15, opacity)})`
          const py = y + (my > y ? 1 : -1) * xInfluence
          if (x === 0) ctx.moveTo(x, py)
          else ctx.lineTo(x, py)
        }
        ctx.stroke()
      }

      // Draw mouse glow
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
        grad.addColorStop(0, `rgba(${CYAN}, 0.06)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha += p.alphaDir * 0.003

        if (p.alpha >= 0.7 || p.alpha <= 0.1) p.alphaDir *= -1
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          p.vx += (dx / dist) * 0.15
          p.vy += (dy / dist) * 0.15
        }

        // Speed clamp
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1) {
          p.vx = (p.vx / speed) * 1
          p.vy = (p.vy / speed) * 1
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${CYAN}, ${p.alpha})`
        ctx.fill()

        // Glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        g.addColorStop(0, `rgba(${CYAN}, ${p.alpha * 0.5})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
