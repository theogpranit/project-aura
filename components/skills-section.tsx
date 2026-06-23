'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SectionReveal, LineReveal } from './section-reveal'

const skills = [
  { name: 'UI/UX Design', level: 'Developing' },
  { name: 'Frontend — React / Next.js', level: 'Developing' },
  { name: 'AI Tools', level: 'Strong' },
  { name: 'Prompt Engineering', level: 'Strong' },
  { name: 'Business Thinking', level: 'Developing' },
  { name: 'System Thinking', level: 'Developing' },
  { name: 'Video Editing', level: 'Basic' },
  { name: 'Blender 3D', level: 'Basic' },
]

const levelStyle: Record<string, string> = {
  Strong: 'var(--foreground)',
  Developing: 'var(--text-subtle)',
  Basic: 'var(--text-dim)',
}

function SkillCard({ skill, i }: { skill: { name: string; level: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springMx = useSpring(mx, { stiffness: 90, damping: 18 })
  const springMy = useSpring(my, { stiffness: 90, damping: 18 })

  const rotateX = useTransform(springMy, [-1, 1], [3.5, -3.5])
  const rotateY = useTransform(springMx, [-1, 1], [-3.5, 3.5])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    my.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <SectionReveal delay={i * 0.055}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 700,
        }}
        className="group relative rounded-2xl p-5 transition-shadow duration-500"
        whileHover={{
          boxShadow: '0 4px 24px rgba(10,10,10,0.07)',
        }}
        initial={{
          background: 'var(--surface)',
          border: '1px solid var(--divider)',
        }}
      >
        {/* Glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(10,10,10,0.04) 0%, transparent 70%)',
          }}
        />
        <p
          className="text-sm font-medium leading-snug tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          {skill.name}
        </p>
        <p
          className="mt-1.5 text-[9px] tracking-[0.22em] uppercase"
          style={{ color: levelStyle[skill.level] }}
        >
          {skill.level}
        </p>
      </motion.div>
    </SectionReveal>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-5xl px-6 py-32 md:px-10 md:py-44"
    >
      <SectionReveal>
        <p
          className="mb-4 text-[9px] tracking-[0.32em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          03 — Skills
        </p>
      </SectionReveal>

      <div className="mb-16">
        <LineReveal delay={0.08}>
          <h2
            className="text-balance font-semibold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', letterSpacing: '-0.028em' }}
          >
            Tools I work with.
          </h2>
        </LineReveal>
        <LineReveal delay={0.18}>
          <h2
            className="font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
              letterSpacing: '-0.028em',
              color: 'var(--text-dim)',
            }}
          >
            Systems I think in.
          </h2>
        </LineReveal>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} i={i} />
        ))}
      </div>
    </section>
  )
}
