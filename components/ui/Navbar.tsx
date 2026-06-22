'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'STATUS', href: '#status' },
  { label: 'AURA-X', href: '#aura-x' },
  { label: 'AURA-GX', href: '#aura-gx' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
      setActive(href)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          background: scrolled
            ? 'rgba(3, 5, 8, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border border-cyan/40 group-hover:border-cyan/80 transition-colors"
              style={{ animation: 'spin 4s linear infinite' }}
            />
            <span className="text-cyan text-sm font-bold font-mono">P</span>
          </div>
          <span
            className="text-xs font-mono tracking-[0.3em] text-foreground/70 group-hover:text-cyan transition-colors hidden sm:block"
          >
            PRANIT
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="relative text-[10px] tracking-[0.25em] font-mono transition-colors group"
              style={{ color: active === item.href ? 'var(--cyan)' : 'rgba(232,244,248,0.5)' }}
              aria-label={`Go to ${item.label} section`}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-px bg-cyan transition-all duration-300 w-0 group-hover:w-full"
                style={{ width: active === item.href ? '100%' : undefined }}
              />
            </button>
          ))}
        </nav>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan status-pulse" />
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
            ONLINE
          </span>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px bg-cyan transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-cyan transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-cyan transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none' }}
          />
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-[8999] glass border-b border-cyan/10"
          >
            <nav className="flex flex-col p-6 gap-4" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left text-sm font-mono tracking-widest text-foreground/60 hover:text-cyan transition-colors py-2 border-b border-border/30 last:border-0"
                >
                  <span className="text-cyan/40 mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
