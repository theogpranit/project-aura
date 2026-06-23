'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SectionReveal, LineReveal } from './section-reveal'

const experiments = [
  {
    id: 'youtube',
    title: 'YouTube — Gaming Content',
    category: 'Content',
    tried: 'Free Fire gameplay and trick shot videos posted consistently over several months.',
    learned: 'Audience behavior, consistency patterns, content structure, and what drives engagement loops.',
    note: 'Reached approximately 200 subscribers. Stopped due to a natural shift in interest direction.',
  },
  {
    id: 'branding',
    title: 'Logo & Branding Work',
    category: 'Design',
    tried: 'Visual identity concepts for cafes, restaurants, and product bottle packaging.',
    learned: 'Identity design fundamentals, the value of visual simplicity, and early client communication dynamics.',
    note: 'Tools used: Canva, AI-assisted design. Operated with an early startup learning mindset.',
  },
  {
    id: 'esports',
    title: 'Esports — Free Fire Mobile',
    category: 'Competition',
    tried: 'Semi-competitive gameplay at an advanced amateur level over an extended period.',
    learned: 'Discipline, reaction-based decision systems, and structured thinking under competitive pressure.',
    note: 'Discontinued after reasoning through long-term sustainability and opportunity cost.',
  },
  {
    id: 'logistics',
    title: 'Logistics Venture',
    category: 'Business',
    tried: 'City-level vendor coordination and logistics experiment focused on operational execution.',
    learned: 'Real-world operations, risk modeling, and the dynamics of trust in early-stage business.',
    note: 'Discontinued due to external operational risks and constraints.',
  },
  {
    id: 'creative',
    title: 'Editing / Blender / AI Tools',
    category: 'Tools',
    tried: 'Video editing fundamentals, basic 3D asset creation in Blender, and deep AI tool usage.',
    learned: 'Content structure understanding, spatial thinking, and AI-enhanced ideation and design workflows.',
    note: 'An ongoing skillset actively applied in current projects and system design work.',
  },
]

function ExperimentCard({ exp, index }: { exp: typeof experiments[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springMx = useSpring(mx, { stiffness: 80, damping: 20 })
  const springMy = useSpring(my, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(springMy, [-1, 1], [3, -3])
  const rotateY = useTransform(springMx, [-1, 1], [-3, 3])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (open) return  // disable tilt when expanded
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    my.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }
  const handleLeave = () => { mx.set(0); my.set(0) }

  return (
    <SectionReveal delay={index * 0.06}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="overflow-hidden rounded-2xl"
        style={{
          background: open ? 'var(--surface-hover)' : 'var(--surface)',
          border: `1px solid ${open ? 'rgba(10,10,10,0.13)' : 'var(--divider)'}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
          rotateX: open ? 0 : rotateX,
          rotateY: open ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          boxShadow: open
            ? '0 8px 40px rgba(10,10,10,0.08)'
            : '0 4px 28px rgba(10,10,10,0.07), 0 0 0 1px rgba(10,10,10,0.06)',
        }}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Glow edge — expands on open */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(10,10,10,0.045) 0%, transparent 65%)',
          }}
        />

        <div className="relative flex cursor-pointer items-start justify-between gap-4 p-6 md:p-7">
          <div className="flex flex-col gap-1">
            <span
              className="text-[9px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              {exp.category}
            </span>
            <h3
              className="text-sm font-medium leading-snug tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {exp.title}
            </h3>
          </div>
          <motion.span
            className="mt-0.5 shrink-0 text-base font-light"
            style={{ color: 'var(--text-dim)' }}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            +
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="flex flex-col gap-5 border-t px-6 pb-7 pt-6 md:px-7"
                style={{ borderColor: 'var(--divider)' }}
              >
                <div>
                  <p
                    className="mb-1.5 text-[9px] tracking-[0.24em] uppercase"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    What I Tried
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {exp.tried}
                  </p>
                </div>
                <div>
                  <p
                    className="mb-1.5 text-[9px] tracking-[0.24em] uppercase"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    What I Learned
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {exp.learned}
                  </p>
                </div>
                <p
                  className="text-xs italic"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {exp.note}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionReveal>
  )
}

export default function ExperimentsSection() {
  return (
    <section
      id="experiments"
      className="relative mx-auto max-w-3xl px-6 py-32 md:px-10 md:py-44"
    >
      <SectionReveal>
        <p
          className="mb-4 text-[9px] tracking-[0.32em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          02 — Experiments
        </p>
      </SectionReveal>

      <div className="mb-16">
        <LineReveal delay={0.08}>
          <h2
            className="text-balance font-semibold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', letterSpacing: '-0.028em' }}
          >
            Things I tried.
          </h2>
        </LineReveal>
        <LineReveal delay={0.17}>
          <h2
            className="font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
              letterSpacing: '-0.028em',
              color: 'var(--text-dim)',
            }}
          >
            Things I learned.
          </h2>
        </LineReveal>
      </div>

      <div className="flex flex-col gap-3">
        {experiments.map((exp, i) => (
          <ExperimentCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
