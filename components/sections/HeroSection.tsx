'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedGrid from '@/components/ui/AnimatedGrid'
import { HiArrowDown } from 'react-icons/hi'
import { BiChip } from 'react-icons/bi'

const TAGLINE_WORDS = ['BUILDING', 'THE', 'FUTURE']

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block glitch-wrapper">
      {text}
      <span className="glitch-layer glitch-layer-1" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-layer glitch-layer-2" aria-hidden="true">
        {text}
      </span>
    </span>
  )
}

function TypewriterSubtitle() {
  const fullText =
    'A relentless experimenter. I build, fail, learn, and iterate. Every failure is data. Every experiment is progress. This is my digital dossier.'
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 1600)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [started])

  return (
    <p className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed max-w-2xl mx-auto">
      {displayed}
      {displayed.length < fullText.length && (
        <span className="cursor-blink text-cyan">|</span>
      )}
    </p>
  )
}

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollDown = () => {
    document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background */}
      <AnimatedGrid />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(3,5,8,0.8) 100%)',
        }}
      />

      {/* Horizontal glowing lines */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1/3 h-px opacity-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }}
      />

      {/* Dossier tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-cyan/20 glass"
      >
        <BiChip className="text-cyan text-sm" aria-hidden="true" />
        <span className="text-[10px] font-mono tracking-[0.3em] text-cyan/70">
          DIGITAL DOSSIER — CLASSIFIED
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan status-pulse" />
      </motion.div>

      {/* Main heading */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tracking-tight mb-4"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          <GlitchText text="PRANIT" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 md:gap-5 mb-8"
        >
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-lg md:text-2xl font-mono tracking-[0.2em] text-muted-foreground"
            >
              {word}
              {i < TAGLINE_WORDS.length - 1 && (
                <span className="mx-2 md:mx-3 text-cyan/30">—</span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <TypewriterSubtitle />
        </motion.div>

        {/* CTA + scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollDown}
            className="group relative px-8 py-3.5 font-mono text-xs tracking-[0.3em] overflow-hidden transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
            }}
            aria-label="Enter dossier"
          >
            <span
              className="absolute inset-0 transition-transform duration-300 -translate-x-full group-hover:translate-x-0"
              style={{ background: 'var(--cyan)' }}
              aria-hidden="true"
            />
            <span className="relative group-hover:text-background transition-colors duration-300">
              ENTER DOSSIER
            </span>
          </button>

          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <span className="w-8 h-px bg-border" />
            <span className="tracking-widest">SCROLL TO EXPLORE</span>
            <span className="w-8 h-px bg-border" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        ref={scrollRef as React.RefObject<HTMLButtonElement>}
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-cyan transition-colors"
        aria-label="Scroll down"
      >
        <div className="w-px h-12 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-cyan"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <HiArrowDown className="text-sm" aria-hidden="true" />
      </motion.button>

      {/* Corner decorations */}
      <div
        aria-hidden="true"
        className="absolute top-24 left-6 md:left-12 text-[10px] font-mono text-muted-foreground/40 space-y-1"
      >
        <div>LAT: 19.0760° N</div>
        <div>LON: 72.8777° E</div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-24 right-6 md:right-12 text-[10px] font-mono text-muted-foreground/40 text-right space-y-1"
      >
        <div>VER: 2.0.26</div>
        <div>STATUS: ACTIVE</div>
      </div>
    </section>
  )
}
