'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)
    }

    const onMouseLeave = () => setIsHidden(true)
    const onMouseEnter = () => setIsHidden(false)

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    function animate() {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }

      // Lerp ring toward dot
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--cyan)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? 48 : 40,
          height: isPointer ? 48 : 40,
          borderRadius: '50%',
          border: `1px solid ${isPointer ? 'var(--cyan)' : 'rgba(0,212,255,0.5)'}`,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.2s, width 0.3s, height 0.3s, border-color 0.3s, margin 0.3s',
          willChange: 'transform',
          boxShadow: isPointer ? '0 0 15px rgba(0,212,255,0.3)' : 'none',
          marginTop: isPointer ? '-4px' : 0,
          marginLeft: isPointer ? '-4px' : 0,
        }}
      />
    </>
  )
}
