'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'

const WORDS = [
  'Every',
  'failure',
  'is',
  'a',
  'blueprint.',
  'Every',
  'experiment',
  'is',
  'progress.',
  'The',
  'future',
  'is',
  'not',
  'found',
  '—',
  'it',
  'is',
  'built.',
]

function AnimatedWord({ word, index, total }: { word: string; index: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.15, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block mr-[0.25em]"
      style={{
        color:
          word === 'blueprint.' || word === 'progress.' || word === 'built.'
            ? 'var(--cyan)'
            : 'inherit',
        textShadow:
          word === 'blueprint.' || word === 'progress.' || word === 'built.'
            ? '0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.15)'
            : 'none',
      }}
    >
      {word}
    </motion.span>
  )
}

export default function FutureMessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98])

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Future message and manifesto"
    >
      {/* Full-screen radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Horizontal dividers */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center"
      >
        {/* Section tag */}
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 mb-12 glass">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan status-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan/70">TRANSMISSION</span>
          </div>
        </SectionReveal>

        {/* The cinematic quote */}
        <div
          className="font-bold text-balance"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'rgba(232,244,248,0.85)',
          }}
        >
          {WORDS.map((word, i) => (
            <AnimatedWord key={`${word}-${i}`} word={word} index={i} total={WORDS.length} />
          ))}
        </div>

        {/* Divider */}
        <SectionReveal delay={400}>
          <div className="flex items-center justify-center gap-4 my-12">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3))' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan/50" />
            <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.3))' }} />
          </div>
        </SectionReveal>

        {/* Secondary text */}
        <SectionReveal delay={500}>
          <p className="text-sm md:text-base text-muted-foreground font-mono leading-relaxed max-w-2xl mx-auto">
            I didn&apos;t start with skills. I started with curiosity and stubbornness.
            Every venture I shut down was a lesson I couldn&apos;t have bought.
            Now I build systems designed to last —{' '}
            <span className="text-cyan">AURA-X</span> and{' '}
            <span className="text-cyan">AURA-GX</span> are the products of everything
            that came before.
          </p>
        </SectionReveal>

        {/* Counter row */}
        <SectionReveal delay={600}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: '5', label: 'VENTURES BUILT' },
              { value: '5', label: 'TIMES FAILED' },
              { value: '2', label: 'PROJECTS ACTIVE' },
              { value: '∞', label: 'LESSONS LEARNED' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-lg p-5 text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-bold font-mono mb-1"
                  style={{ color: 'var(--cyan)', textShadow: '0 0 20px rgba(0,212,255,0.3)' }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-muted-foreground/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Signature */}
        <SectionReveal delay={700}>
          <div className="mt-16 text-[10px] font-mono tracking-[0.5em] text-muted-foreground/30">
            — PRANIT / 2026
          </div>
        </SectionReveal>
      </motion.div>
    </section>
  )
}
