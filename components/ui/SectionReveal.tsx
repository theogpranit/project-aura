'use client'

import { useEffect, useRef, useState } from 'react'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(24px)',
    left: visible ? 'translateX(0)' : 'translateX(-24px)',
    right: visible ? 'translateX(0)' : 'translateX(24px)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  )
}
