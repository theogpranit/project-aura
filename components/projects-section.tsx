'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionReveal, LineReveal } from './section-reveal'

const projects = [
  {
    id: 'aura-x',
    name: 'AURA-X',
    fullName: 'Productivity, automation, and AI workflow system',
    status: 'Building',
    statusDot: '#737373',
    tagline: 'A productivity intelligence system for the modern builder.',
    description:
      'AURA-X is designed to unify productivity, search, automation, and workflow intelligence across devices. The goal is a cross-platform assistant that understands context and reduces friction.',
    focuses: [
      'Productivity',
      'Automation',
      'Search systems',
      'Workflow intelligence',
      'Cross-device experience',
    ],
    number: '01',
  },
  {
    id: 'aura-gx',
    name: 'AURA-GX',
    fullName: 'Gaming optimization and intelligent gaming tools',
    status: 'Prototype',
    statusDot: '#a8a29e',
    tagline: 'Performance-aware tooling for competitive environments.',
    description:
      'AURA-GX explores the intersection of intelligent systems and high-performance gaming. A prototype investigating gaming optimization, performance monitoring, and adaptive tool design.',
    focuses: ['Gaming optimization', 'Performance systems', 'Intelligent gaming tools'],
    number: '02',
  },
  {
    id: 'aura-ui',
    name: 'AURA UI Designer',
    fullName: 'AI-based UI generation system',
    status: 'Prototype',
    statusDot: '#a8a29e',
    tagline: 'Designing interfaces through language.',
    description:
      'An exploration into AI-assisted interface generation — describing UI intent and receiving production-ready component structures. A research prototype to understand the limits of AI in design.',
    focuses: ['AI-assisted design', 'UI generation', 'Prompt-to-component systems'],
    number: '03',
  },
]

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <SectionReveal delay={i * 0.09}>
      <motion.div
        className="overflow-hidden rounded-3xl"
        style={{
          background: 'var(--surface)',
          border: `1px solid ${expanded ? 'rgba(10,10,10,0.12)' : 'var(--divider)'}`,
          transition: 'border-color 0.4s ease',
        }}
        whileHover={{ borderColor: 'rgba(10,10,10,0.13)' }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="cursor-pointer p-7 md:p-9">
          {/* Top row */}
          <div className="mb-7 flex items-start justify-between">
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              {project.number}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: project.statusDot }}
              />
              <span
                className="text-[9px] tracking-[0.18em] uppercase"
                style={{ color: project.statusDot }}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* Name */}
          <h3
            className="mb-1 font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              letterSpacing: '-0.025em',
              color: 'var(--foreground)',
            }}
          >
            {project.name}
          </h3>
          <p
            className="mb-3 text-xs"
            style={{ color: 'var(--text-dim)' }}
          >
            {project.fullName}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-subtle)' }}
          >
            {project.tagline}
          </p>

          {/* Toggle */}
          <div
            className="mt-6 flex items-center gap-2"
            style={{ color: 'var(--text-dim)' }}
          >
            <motion.span
              className="text-base font-light"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              +
            </motion.span>
            <span className="text-[9px] tracking-widest uppercase">
              {expanded ? 'Close' : 'Details'}
            </span>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="border-t px-7 pb-8 pt-7 md:px-9"
                style={{ borderColor: 'var(--divider)' }}
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p
                      className="mb-3 text-[9px] tracking-[0.24em] uppercase"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      About
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <p
                      className="mb-3 text-[9px] tracking-[0.24em] uppercase"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      Focus Areas
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {project.focuses.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span
                            className="h-px w-4 shrink-0"
                            style={{ background: 'var(--text-dim)' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: 'var(--text-subtle)' }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionReveal>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-4xl px-6 py-32 md:px-10 md:py-44"
    >
      <SectionReveal>
        <p
          className="mb-4 text-[9px] tracking-[0.32em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          05 — Projects
        </p>
      </SectionReveal>

      <div className="mb-16">
        <LineReveal delay={0.06}>
          <h2
            className="text-balance font-semibold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', letterSpacing: '-0.028em' }}
          >
            Products I am building.
          </h2>
        </LineReveal>
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} />
        ))}
      </div>
    </section>
  )
}
