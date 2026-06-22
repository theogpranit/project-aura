'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { BiChip, BiShield, BiBrain, BiNetworkChart, BiData } from 'react-icons/bi'
import { HiArrowRight } from 'react-icons/hi'

const FEATURES = [
  {
    icon: BiBrain,
    title: 'Autonomous Reasoning',
    desc: 'Multi-step reasoning chains that adapt to context without human intervention.',
  },
  {
    icon: BiNetworkChart,
    title: 'Universal Integration',
    desc: 'API-first architecture designed to plug into any workflow or platform.',
  },
  {
    icon: BiShield,
    title: 'Secure by Design',
    desc: 'End-to-end encrypted context with zero knowledge retention by default.',
  },
  {
    icon: BiData,
    title: 'Context Memory',
    desc: 'Persistent knowledge graph that learns and evolves with every interaction.',
  },
]

const TERMINAL_LINES = [
  { text: '> Initializing AURA-X core engine...', delay: 0 },
  { text: '> Loading reasoning modules [████████] 100%', delay: 300 },
  { text: '> Context engine: ACTIVE', delay: 600 },
  { text: '> Autonomous protocols: ENABLED', delay: 900 },
  { text: '> AURA-X is ready.', delay: 1200, highlight: true },
]

function TerminalWindow() {
  const [lines, setLines] = useState<typeof TERMINAL_LINES>([])
  const ref = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          TERMINAL_LINES.forEach((line) => {
            setTimeout(() => {
              setLines((prev) => [...prev, line])
            }, line.delay + 400)
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid rgba(0,212,255,0.15)', background: 'rgba(3,5,8,0.9)' }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(0,212,255,0.08)' }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff4444' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffb300' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00ff9d' }} />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60 ml-2 tracking-widest">
          AURA-X — TERMINAL
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-xs space-y-2 min-h-[140px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={line.highlight ? 'text-cyan glow-text' : 'text-muted-foreground/80'}
          >
            {line.text}
            {i === lines.length - 1 && lines.length < TERMINAL_LINES.length && (
              <span className="cursor-blink text-cyan ml-1">_</span>
            )}
          </motion.div>
        ))}
        {lines.length === 0 && (
          <span className="text-muted-foreground/40 cursor-blink">_</span>
        )}
      </div>
    </div>
  )
}

export default function AuraXSection() {
  return (
    <section
      id="aura-x"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="AURA-X project showcase"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at right, rgba(0,212,255,0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <SectionLabel number="04" label="Project Alpha" />
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <SectionReveal>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 mb-6 glass">
                <BiChip className="text-cyan text-sm" aria-hidden="true" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan/70">
                  AUTONOMOUS INTELLIGENCE
                </span>
              </div>

              <h2
                className="font-bold mb-2"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                }}
              >
                <span className="text-cyan glow-text">AURA</span>
                <span className="text-foreground/40">-X</span>
              </h2>

              <p className="text-xs font-mono tracking-[0.25em] text-muted-foreground mb-6">
                AUTONOMOUS UNIVERSAL REASONING ASSISTANT
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                An AI assistant built from first principles. AURA-X is designed to think,
                reason, and act across complex multi-step tasks — without constant hand-holding.
                Not just another chatbot. A reasoning engine.
              </p>

              {/* Status bar */}
              <div
                className="flex items-center gap-3 p-3 rounded-lg mb-8"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan status-pulse" />
                  <span className="text-[10px] font-mono text-cyan tracking-widest">IN DEVELOPMENT</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <span className="text-[10px] font-mono text-muted-foreground/60">
                  VERSION 0.4.2 — PRIVATE BETA
                </span>
              </div>
            </SectionReveal>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <SectionReveal key={feat.title} delay={i * 80}>
                    <div className="glass glass-hover rounded-lg p-4 h-full">
                      <Icon className="text-cyan text-lg mb-2" aria-hidden="true" />
                      <h4 className="text-xs font-semibold text-foreground/90 mb-1">{feat.title}</h4>
                      <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{feat.desc}</p>
                    </div>
                  </SectionReveal>
                )
              })}
            </div>
          </div>

          {/* Right — Visual panel */}
          <SectionReveal direction="right" delay={80}>
            <div className="space-y-4">
              {/* Terminal */}
              <TerminalWindow />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'MODULES', value: '12' },
                  { label: 'REASONING DEPTH', value: '7-step' },
                  { label: 'ACCURACY', value: '94.3%' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg p-3 text-center"
                    style={{
                      background: 'rgba(0,212,255,0.03)',
                      border: '1px solid rgba(0,212,255,0.08)',
                    }}
                  >
                    <div className="text-lg font-bold text-cyan font-mono">{stat.value}</div>
                    <div className="text-[9px] font-mono tracking-widest text-muted-foreground/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architecture diagram (abstract) */}
              <div
                className="rounded-lg p-5"
                style={{ background: 'rgba(3,5,8,0.9)', border: '1px solid rgba(0,212,255,0.1)' }}
              >
                <div className="text-[10px] font-mono text-muted-foreground/50 tracking-widest mb-4">
                  SYSTEM ARCHITECTURE
                </div>
                <div className="space-y-3">
                  {['INPUT LAYER', 'REASONING ENGINE', 'MEMORY GRAPH', 'ACTION EXECUTOR', 'OUTPUT SYNTHESIZER'].map(
                    (layer, i) => (
                      <div key={layer} className="flex items-center gap-3">
                        <div className="text-[9px] font-mono text-muted-foreground/40 w-32 shrink-0">
                          {layer}
                        </div>
                        <div className="flex-1 h-5 rounded relative overflow-hidden"
                          style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.08)' }}>
                          <motion.div
                            className="absolute top-0 left-0 h-full rounded"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${100 - i * 10}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ background: `rgba(0,212,255,${0.15 + i * 0.05})` }}
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-cyan/60">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-mono text-xs tracking-[0.2em] transition-all duration-300"
                style={{
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: 'var(--cyan)',
                  background: 'rgba(0,212,255,0.03)',
                }}
                aria-label="Join AURA-X waitlist"
              >
                JOIN WAITLIST
                <HiArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
