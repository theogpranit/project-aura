'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
      setDate(
        now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div
      className="flex flex-col leading-none gap-[3px]"
      style={{ opacity: 0.36 }}
      aria-label="Current time and date"
    >
      <span
        className="font-mono text-[10px] tracking-[0.12em] tabular-nums"
        style={{ color: 'var(--foreground)' }}
      >
        {time}
      </span>
      <span
        className="font-mono text-[8px] tracking-[0.14em] uppercase"
        style={{ color: 'var(--text-dim)' }}
      >
        {date}
      </span>
    </div>
  )
}

const links = [
  { label: 'Identity', href: '#identity' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'Skills', href: '#skills' },
  { label: 'AURA', href: '#aura' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Frosted background — only on scroll */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                background: 'rgba(250,249,247,0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(10,10,10,0.07)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Logo + live clock */}
        <div className="relative z-10 flex items-center gap-4">
          <a
            href="#identity"
            onClick={(e) => handleNav(e, '#identity')}
            className="text-sm font-semibold tracking-[0.08em] text-foreground"
          >
            PH
          </a>
          <div
            className="hidden sm:block w-px h-5 self-center"
            style={{ background: 'var(--divider)' }}
          />
          <div className="hidden sm:block">
            <LiveClock />
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-xs tracking-[0.14em] uppercase transition-colors duration-300"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="relative z-10 flex flex-col gap-[5px] p-1 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <motion.span
            className="block h-px w-6 origin-center"
            style={{ background: 'var(--foreground)' }}
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5.5 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="block h-px w-4 origin-center"
            style={{ background: 'var(--foreground)' }}
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6 origin-center"
            style={{ background: 'var(--foreground)' }}
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5.5 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(250,249,247,0.97)', backdropFilter: 'blur(12px)' }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-3xl font-semibold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
