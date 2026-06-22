'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { BiGame, BiJoystick, BiBot, BiTrophy, BiShieldAlt2 } from 'react-icons/bi'
import { HiArrowRight, HiLightningBolt } from 'react-icons/hi'

const FEATURES = [
  {
    icon: BiBot,
    title: 'Adaptive AI Core',
    desc: 'Responds to in-game events in real-time, adjusting strategy based on contextual state.',
    tag: 'RESPONSIVE',
  },
  {
    icon: BiTrophy,
    title: 'Performance Optimization',
    desc: 'Analyzes play patterns and suggests improvements to peak performance ceiling.',
    tag: 'ANALYTICAL',
  },
  {
    icon: BiShieldAlt2,
    title: 'Utility Intelligence',
    desc: 'Pre-configured utility patterns with contextual callouts and real-time coaching.',
    tag: 'INTELLIGENT',
  },
  {
    icon: BiJoystick,
    title: 'Gaming-Native UX',
    desc: 'HUD-integrated design language. Zero friction. Built for the gaming mindset.',
    tag: 'NATIVE',
  },
]

const ABILITY_CARDS = [
  { key: 'Q', name: 'QUICK SCAN', value: '< 50ms', label: 'Response time' },
  { key: 'W', name: 'DEEP ANALYZE', value: '99.4%', label: 'Accuracy rate' },
  { key: 'E', name: 'ADAPT', value: '∞', label: 'Learning cycles' },
  { key: 'R', name: 'EXECUTE', value: '24/7', label: 'Always on' },
]

export default function AuraGXSection() {
  const [hoveredAbility, setHoveredAbility] = useState<string | null>(null)

  return (
    <section
      id="aura-gx"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="AURA-GX project showcase"
    >
      {/* Background glow — shifted left */}
      <div
        className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at left, rgba(0,212,255,0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <SectionLabel number="05" label="Project Beta" />
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual panel */}
          <SectionReveal direction="left" delay={0}>
            <div className="space-y-4">
              {/* Main card */}
              <div
                className="rounded-xl p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(3,5,8,0.95)',
                  border: '1px solid rgba(0,212,255,0.12)',
                }}
              >
                {/* Scan line decoration */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
                  }}
                  aria-hidden="true"
                />

                {/* HUD header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan status-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-cyan">AURA-GX ONLINE</span>
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-mono text-muted-foreground/60">
                    <span>MATCH 047</span>
                    <span className="text-cyan">ACTIVE</span>
                  </div>
                </div>

                {/* Ability key cards */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {ABILITY_CARDS.map((ability) => (
                    <button
                      key={ability.key}
                      onMouseEnter={() => setHoveredAbility(ability.key)}
                      onMouseLeave={() => setHoveredAbility(null)}
                      className="rounded-md p-3 text-center transition-all duration-200 cursor-pointer"
                      style={{
                        background:
                          hoveredAbility === ability.key
                            ? 'rgba(0,212,255,0.12)'
                            : 'rgba(0,212,255,0.04)',
                        border: `1px solid ${hoveredAbility === ability.key ? 'rgba(0,212,255,0.4)' : 'rgba(0,212,255,0.08)'}`,
                        boxShadow:
                          hoveredAbility === ability.key
                            ? '0 0 20px rgba(0,212,255,0.15)'
                            : 'none',
                      }}
                      aria-label={ability.name}
                    >
                      <div className="text-base font-bold text-cyan font-mono mb-1">{ability.key}</div>
                      <div className="text-[9px] font-mono text-muted-foreground/60 leading-tight">
                        {ability.name}
                      </div>
                    </button>
                  ))}
                </div>

                {hoveredAbility ? (
                  <motion.div
                    key={hoveredAbility}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-md"
                    style={{
                      background: 'rgba(0,212,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.1)',
                    }}
                  >
                    {(() => {
                      const a = ABILITY_CARDS.find((x) => x.key === hoveredAbility)!
                      return (
                        <>
                          <div>
                            <div className="text-[10px] font-mono text-muted-foreground/60">
                              {a.label}
                            </div>
                            <div className="text-sm font-bold text-cyan font-mono">{a.value}</div>
                          </div>
                          <HiLightningBolt className="text-cyan text-lg" aria-hidden="true" />
                        </>
                      )
                    })()}
                  </motion.div>
                ) : (
                  <div
                    className="flex items-center gap-3 p-3 rounded-md"
                    style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.06)' }}
                  >
                    <BiGame className="text-muted-foreground/40 text-base" aria-hidden="true" />
                    <span className="text-[11px] font-mono text-muted-foreground/50">
                      Hover ability key to inspect
                    </span>
                  </div>
                )}
              </div>

              {/* Performance chart (abstract bars) */}
              <div
                className="rounded-lg p-4"
                style={{ background: 'rgba(3,5,8,0.9)', border: '1px solid rgba(0,212,255,0.08)' }}
              >
                <div className="text-[10px] font-mono text-muted-foreground/50 tracking-widest mb-3">
                  PERFORMANCE TREND — LAST 10 MATCHES
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[60, 72, 65, 80, 75, 90, 85, 92, 88, 97].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background:
                          h > 85
                            ? 'rgba(0,212,255,0.6)'
                            : h > 70
                            ? 'rgba(0,212,255,0.3)'
                            : 'rgba(0,212,255,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right — Content */}
          <div>
            <SectionReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 mb-6 glass">
                <BiGame className="text-cyan text-sm" aria-hidden="true" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan/70">
                  GAMING INTELLIGENCE
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
                <span className="text-foreground/40">-GX</span>
              </h2>

              <p className="text-xs font-mono tracking-[0.25em] text-muted-foreground mb-6">
                ADAPTIVE UTILITY FOR RESPONSIVE ACTION
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                Gaming meets intelligence. AURA-GX is an AI overlay system engineered
                for competitive players — real-time analysis, adaptive coaching, and a
                gaming-native interface that stays out of the way until you need it.
              </p>

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
                  CLOSED ALPHA — INVITE ONLY
                </span>
              </div>
            </SectionReveal>

            {/* Features */}
            <div className="space-y-3">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <SectionReveal key={feat.title} delay={i * 80}>
                    <div className="glass glass-hover rounded-lg p-4 flex gap-4">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                      >
                        <Icon className="text-cyan text-base" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-foreground/90">{feat.title}</h4>
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                            style={{
                              background: 'rgba(0,212,255,0.08)',
                              color: 'rgba(0,212,255,0.7)',
                              border: '1px solid rgba(0,212,255,0.12)',
                            }}
                          >
                            {feat.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                )
              })}
            </div>

            <SectionReveal delay={400}>
              <button
                className="group mt-6 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan/60 hover:text-cyan transition-colors"
                aria-label="Request early access to AURA-GX"
              >
                REQUEST EARLY ACCESS
                <HiArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
