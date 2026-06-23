'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  // Glow orb — very slow, large inertia
  const glowX = useSpring(cursorX, { stiffness: 28, damping: 30 })
  const glowY = useSpring(cursorY, { stiffness: 28, damping: 30 })
  // Ring — medium inertia
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 22 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 22 })
  // Dot — near-instant
  const dotX = useSpring(cursorX, { stiffness: 700, damping: 34 })
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 34 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], [data-magnetic]')) setHovering(true)
    }
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('a, button, [role="button"], [data-magnetic]')) setHovering(false)
    }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [cursorX, cursorY])

  const glowSize = clicking ? 220 : hovering ? 180 : 140
  const glowOffset = glowSize / 2

  return (
    <>
      {/* Glow orb — lagging soft bloom, very low opacity */}
      <motion.div
        className="pointer-events-none fixed z-[9995] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          width: glowSize,
          height: glowSize,
          marginLeft: -glowOffset,
          marginTop: -glowOffset,
          background: 'radial-gradient(circle, rgba(10,10,10,0.055) 0%, transparent 72%)',
          filter: 'blur(8px)',
          transition: 'width 0.4s ease, height 0.4s ease, margin 0.4s ease',
        }}
      />

      {/* Ring — medium lag */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          left: ringX,
          top: ringY,
          width: clicking ? 22 : hovering ? 44 : 30,
          height: clicking ? 22 : hovering ? 44 : 30,
          marginLeft: clicking ? -11 : hovering ? -22 : -15,
          marginTop: clicking ? -11 : hovering ? -22 : -15,
          border: `1px solid rgba(10,10,10,${hovering ? 0.45 : 0.28})`,
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease',
        }}
      />

      {/* Dot — instant */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: dotX,
          top: dotY,
          width: clicking ? 3 : 5,
          height: clicking ? 3 : 5,
          marginLeft: clicking ? -1.5 : -2.5,
          marginTop: clicking ? -1.5 : -2.5,
          background: 'rgba(10,10,10,0.75)',
          transition: 'width 0.15s ease, height 0.15s ease, margin 0.15s ease',
        }}
      />
    </>
  )
}
