'use client'

import { useEffect, useRef } from 'react'

// Inline 2D value noise
function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
function lerp(a: number, b: number, t: number) { return a + t * (b - a) }
function grad(hash: number, x: number, y: number) {
  const h = hash & 3
  const u = h < 2 ? x : y
  const v = h < 2 ? y : x
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v)
}
const PERM = new Uint8Array(512)
;(function buildPerm() {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255]
})()
function noise2d(x: number, y: number): number {
  const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255
  const xf = x - Math.floor(x), yf = y - Math.floor(y)
  const u = fade(xf), v = fade(yf)
  const aa = PERM[PERM[xi] + yi], ab = PERM[PERM[xi] + yi + 1]
  const ba = PERM[PERM[xi + 1] + yi], bb = PERM[PERM[xi + 1] + yi + 1]
  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v
  )
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number; layer: number // 0=slow-deep, 1=fast-surface
}

interface Ripple {
  x: number; y: number
  r: number; maxR: number
  alpha: number; born: number
}

const COUNTS = [70, 55]           // particles per layer
const SPEEDS = [0.38, 0.68]       // speed per layer
const OPACITIES = [0.09, 0.13]    // max opacity per layer
const FLOW_SCALE = 0.0016

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const ripplesRef = useRef<Ripple[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth, H = window.innerHeight
    let time = 0, animId = 0

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
      ctx.fillStyle = 'rgba(250,249,247,1)'
      ctx.fillRect(0, 0, W, H)
    }
    resize()

    const onResize = () => resize()
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / W
      mouseRef.current.y = e.clientY / H
    }
    const onClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX, y: e.clientY,
        r: 0, maxR: 180 + Math.random() * 120,
        alpha: 0.22, born: time,
      })
      // keep max 6 ripples
      if (ripplesRef.current.length > 6) ripplesRef.current.shift()
    }

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('click', onClick, { passive: true })

    function spawnParticle(w: number, h: number, layer: number): Particle {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: 0, vy: 0,
        life: Math.random() * 200,
        maxLife: 130 + Math.random() * 180,
        size: layer === 0 ? (0.5 + Math.random() * 0.8) : (0.9 + Math.random() * 1.3),
        layer,
      }
    }

    const particles: Particle[] = [
      ...Array.from({ length: COUNTS[0] }, () => spawnParticle(W, H, 0)),
      ...Array.from({ length: COUNTS[1] }, () => spawnParticle(W, H, 1)),
    ]

    function draw() {
      animId = requestAnimationFrame(draw)
      time += 0.0009

      // Soft trail fade — different rate per layer feels naturally layered
      ctx.fillStyle = 'rgba(250,249,247,0.038)'
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw ripples first (behind particles)
      const ripples = ripplesRef.current
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += 3.2
        rp.alpha *= 0.94
        if (rp.r > rp.maxR || rp.alpha < 0.005) {
          ripples.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(120,113,108,${rp.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Second inner ring — softer, slightly smaller radius
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(120,113,108,${rp.alpha * 0.5})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      for (const p of particles) {
        p.life++
        if (p.life > p.maxLife) {
          const np = spawnParticle(W, H, p.layer)
          p.x = np.x; p.y = np.y; p.vx = 0; p.vy = 0
          p.life = 0; p.maxLife = np.maxLife; p.size = np.size
          continue
        }

        const speed = SPEEDS[p.layer]
        // Layer offset in noise space — gives true depth separation
        const layerOffset = p.layer * 3.7
        const angle = noise2d(
          p.x * FLOW_SCALE + layerOffset,
          p.y * FLOW_SCALE + layerOffset + time * (p.layer === 0 ? 0.6 : 1.0)
        ) * Math.PI * 2.6

        // Cursor influence
        const dx = mx * W - p.x
        const dy = my * H - p.y
        const distSq = dx * dx + dy * dy
        const dist = Math.sqrt(distSq)
        const influence = Math.max(0, 1 - dist / (W * 0.4)) * 0.3

        const fx = Math.cos(angle) * speed + (dist > 1 ? dx / dist : 0) * influence * speed
        const fy = Math.sin(angle) * speed + (dist > 1 ? dy / dist : 0) * influence * speed

        // Ripple velocity push
        for (const rp of ripples) {
          const rdx = p.x - rp.x, rdy = p.y - rp.y
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
          const wave = Math.abs(rdist - rp.r)
          if (wave < 28 && rdist > 1) {
            const pushStr = (1 - wave / 28) * rp.alpha * 1.8
            p.vx += (rdx / rdist) * pushStr
            p.vy += (rdy / rdist) * pushStr
          }
        }

        p.vx = p.vx * 0.9 + fx * 0.1
        p.vy = p.vy * 0.9 + fy * 0.1

        p.x += p.vx; p.y += p.vy

        // Wrap
        if (p.x < -4) p.x = W + 4
        if (p.x > W + 4) p.x = -4
        if (p.y < -4) p.y = H + 4
        if (p.y > H + 4) p.y = -4

        const lifeRatio = p.life / p.maxLife
        const alpha = OPACITIES[p.layer] * Math.sin(lifeRatio * Math.PI)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120,113,108,${alpha})`
        ctx.fill()
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  )
}
