'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MeshBackground() {
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const springX = useSpring(rawX, { stiffness: 28, damping: 38 })
  const springY = useSpring(rawY, { stiffness: 28, damping: 38 })

  // Convert 0–1 to pixel values relative to viewport for cursor light
  const lightXpx = useTransform(springX, (v) => `calc(${v * 100}vw - 250px)`)
  const lightYpx = useTransform(springY, (v) => `calc(${v * 100}vh - 250px)`)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth)
      rawY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX, rawY])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Blob 1 — top-left warm stone */}
      <motion.div
        className="absolute"
        style={{
          width: '72vw',
          height: '72vw',
          maxWidth: 860,
          maxHeight: 860,
          top: '-18%',
          left: '-14%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(214,211,209,0.5) 0%, transparent 68%)',
          filter: 'blur(48px)',
        }}
        animate={{
          x: [0, 24, -14, 10, 0],
          y: [0, -18, 14, -7, 0],
          scale: [1, 1.06, 0.97, 1.03, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 — bottom-right zinc */}
      <motion.div
        className="absolute"
        style={{
          width: '66vw',
          height: '66vw',
          maxWidth: 780,
          maxHeight: 780,
          bottom: '-22%',
          right: '-16%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(228,228,231,0.4) 0%, transparent 68%)',
          filter: 'blur(52px)',
        }}
        animate={{
          x: [0, -26, 16, -10, 0],
          y: [0, 20, -16, 8, 0],
          scale: [1, 0.95, 1.07, 0.98, 1],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Blob 3 — center soft pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '52vw',
          height: '52vw',
          maxWidth: 660,
          maxHeight: 660,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(250,249,247,0.85) 0%, transparent 62%)',
          filter: 'blur(36px)',
        }}
        animate={{ scale: [1, 1.04, 0.98, 1.02, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Cursor ambient glow — slightly stronger */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          left: lightXpx,
          top: lightYpx,
          background:
            'radial-gradient(ellipse at center, rgba(10,10,10,0.038) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Vignette edges — depth blur gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 55%, rgba(250,249,247,0.55) 100%)
          `,
        }}
      />
    </div>
  )
}
