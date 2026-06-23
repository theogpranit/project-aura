'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionReveal, LineReveal } from './section-reveal'

const principles = [
  {
    label: 'Intelligence',
    description:
      'Systems that understand context and surface what matters — without requiring the user to ask.',
  },
  {
    label: 'Simplicity',
    description:
      'Fewer interactions. Higher clarity. Less friction at every surface of the experience.',
  },
  {
    label: 'Continuity',
    description:
      'Experiences that flow naturally across devices, contexts, and time without breaking.',
  },
]

export default function AuraSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="aura"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44"
    >
      {/* Parallax wash — intentionally more visible in this section */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 48% 44%, rgba(214,211,209,0.56) 0%, rgba(228,228,231,0.28) 42%, transparent 70%)',
          filter: 'blur(72px)',
          y: bgY,
        }}
      />
      {/* Soft directional vignette top — frames the section like a film cut */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, var(--background), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(to top, var(--background), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionReveal>
          <p
            className="mb-4 text-[9px] tracking-[0.32em] uppercase"
            style={{ color: 'var(--text-dim)' }}
          >
            04 — Why AURA
          </p>
        </SectionReveal>

        {/* Editorial header */}
        <div className="mb-16">
          <LineReveal delay={0.04}>
            <h2
              className="text-balance font-semibold leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', letterSpacing: '-0.032em' }}
            >
              Not a brand.
            </h2>
          </LineReveal>
          <LineReveal delay={0.12}>
            <h2
              className="font-semibold leading-none tracking-tight"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                letterSpacing: '-0.032em',
                color: 'var(--text-dim)',
              }}
            >
              A direction.
            </h2>
          </LineReveal>
        </div>

        {/* Main statement */}
        <SectionReveal delay={0.18}>
          <div
            className="mb-20 max-w-2xl rounded-3xl p-8 md:p-10"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--divider)',
            }}
          >
            <p
              className="text-lg leading-relaxed tracking-tight md:text-xl"
              style={{ color: 'var(--foreground)' }}
            >
              AURA represents a system-level vision to build intelligent tools
              that improve productivity, simplify workflows, and enhance digital
              experiences.
            </p>
            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: 'var(--text-subtle)' }}
            >
              It is not a brand. It is a long-term product ecosystem direction — a
              framework for thinking about how software should feel and function
              in a world driven by AI and automation.
            </p>
          </div>
        </SectionReveal>

        {/* Principles */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <SectionReveal key={p.label} delay={i * 0.09}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--divider)',
                }}
              >
                <p
                  className="mb-3 text-[9px] tracking-[0.24em] uppercase"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  className="mb-2 text-base font-semibold tracking-tight"
                  style={{ color: 'var(--foreground)' }}
                >
                  {p.label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-subtle)' }}
                >
                  {p.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
