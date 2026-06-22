'use client'

import { useEffect, useRef, useState } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { motion } from 'framer-motion'
import { BiBrain, BiCode, BiPalette, BiServer, BiChip } from 'react-icons/bi'
import { HiStatusOnline } from 'react-icons/hi'

const SKILLS = [
  {
    icon: BiBrain,
    label: 'AI & Machine Learning',
    level: 72,
    status: 'LEARNING',
    color: '#00d4ff',
    desc: 'Exploring transformer architectures, prompt engineering, and fine-tuning paradigms.',
  },
  {
    icon: BiCode,
    label: 'Full-Stack Development',
    level: 80,
    status: 'BUILDING',
    color: '#00d4ff',
    desc: 'React, Next.js, Node.js, TypeScript, databases, API design.',
  },
  {
    icon: BiPalette,
    label: 'UI/UX Design',
    level: 68,
    status: 'DESIGNING',
    color: '#00d4ff',
    desc: 'Figma, design systems, motion design, interaction patterns.',
  },
  {
    icon: BiServer,
    label: 'Systems Architecture',
    level: 55,
    status: 'LEARNING',
    color: '#00d4ff',
    desc: 'Infrastructure, distributed systems, cloud architecture, scalability.',
  },
  {
    icon: BiChip,
    label: 'AI Product Development',
    level: 85,
    status: 'ACTIVE',
    color: '#00d4ff',
    desc: 'Designing and shipping AI-powered products with real-world utility.',
  },
]

const STATUS_CARDS = [
  {
    id: 'learning',
    title: 'LEARNING',
    value: 'Daily',
    detail: 'Systems, AI, Product, Code',
    dot: '#00d4ff',
  },
  {
    id: 'building',
    title: 'BUILDING',
    value: 'AURA Systems',
    detail: 'Active development across 2 projects',
    dot: '#00ff9d',
  },
  {
    id: 'reading',
    title: 'READING',
    value: 'Technical Papers',
    detail: 'AI, systems, and human behavior',
    dot: '#ffb300',
  },
  {
    id: 'obsession',
    title: 'OBSESSING OVER',
    value: 'The Future',
    detail: 'How AI reshapes everything we build',
    dot: '#00d4ff',
  },
]

function SkillBar({
  skill,
  index,
}: {
  skill: typeof SKILLS[0]
  index: number
}) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = skill.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), index * 120 + 200)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="text-cyan text-base" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground/90">{skill.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-cyan/60">
            {skill.status}
          </span>
          <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
        </div>
      </div>

      {/* Track */}
      <div className="h-px bg-border/50 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all"
          style={{
            width: animated ? `${skill.level}%` : '0%',
            background: 'var(--cyan)',
            boxShadow: animated ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease',
            transitionDelay: `${index * 0.1}s`,
          }}
        />
      </div>

      <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{skill.desc}</p>
    </div>
  )
}

export default function StatusSection() {
  return (
    <section
      id="status"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Current status dashboard"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <SectionLabel number="03" label="Current Status" />
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            SYSTEM
            <br />
            <span className="text-cyan glow-text">ONLINE.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mb-10 leading-relaxed">
            Real-time status of what I&apos;m learning, building, and obsessing over right now.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Status Cards */}
          <div className="space-y-4">
            <SectionReveal delay={100}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground mb-5 flex items-center gap-2">
                <HiStatusOnline className="text-cyan" aria-hidden="true" />
                ACTIVE OPERATIONS
              </h3>
            </SectionReveal>

            {STATUS_CARDS.map((card, i) => (
              <SectionReveal key={card.id} delay={150 + i * 80}>
                <div className="glass glass-hover rounded-lg p-4 flex items-start gap-4">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 status-pulse"
                    style={{ background: card.dot }}
                  />
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-muted-foreground/60 mb-1">
                      {card.title}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-0.5">{card.value}</div>
                    <div className="text-xs text-muted-foreground">{card.detail}</div>
                  </div>
                </div>
              </SectionReveal>
            ))}

            {/* System uptime */}
            <SectionReveal delay={550}>
              <div
                className="p-4 rounded-lg font-mono text-xs space-y-1.5"
                style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.08)' }}
              >
                <div className="flex justify-between text-muted-foreground/60">
                  <span>SYSTEM UPTIME</span>
                  <span className="text-cyan">99.1%</span>
                </div>
                <div className="flex justify-between text-muted-foreground/60">
                  <span>EXPERIMENTS RUN</span>
                  <span className="text-cyan">05</span>
                </div>
                <div className="flex justify-between text-muted-foreground/60">
                  <span>CURRENT MISSION</span>
                  <span className="text-cyan">BUILDING</span>
                </div>
                <div className="flex justify-between text-muted-foreground/60">
                  <span>NEXT MILESTONE</span>
                  <span className="text-cyan">LAUNCH</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right — Skill Bars */}
          <div className="space-y-6">
            <SectionReveal delay={100}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground mb-5 flex items-center gap-2">
                <BiChip className="text-cyan" aria-hidden="true" />
                CAPABILITY MATRIX
              </h3>
            </SectionReveal>

            {SKILLS.map((skill, i) => (
              <SectionReveal key={skill.label} delay={200 + i * 80}>
                <SkillBar skill={skill} index={i} />
              </SectionReveal>
            ))}

            {/* Animated waveform decoration */}
            <SectionReveal delay={700}>
              <div className="pt-4 flex items-end gap-0.5 h-10" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-cyan/20 rounded-sm"
                    animate={{
                      height: [
                        `${Math.random() * 60 + 10}%`,
                        `${Math.random() * 100}%`,
                        `${Math.random() * 60 + 10}%`,
                      ],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
