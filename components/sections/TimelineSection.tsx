'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { HiChevronDown, HiLightningBolt } from 'react-icons/hi'
import { BiGame, BiPalette, BiTrophy, BiCodeAlt, BiPackage } from 'react-icons/bi'

const TIMELINE_ITEMS = [
  {
    id: 'youtube',
    icon: BiGame,
    year: '2020',
    title: 'Gaming YouTube',
    subtitle: 'Content Creation',
    status: 'FAILED',
    statusColor: '#ff4444',
    description:
      'Built a gaming YouTube channel from scratch. Learned video editing, thumbnail design, SEO, and audience psychology. Grew to hundreds of subscribers before shutting it down.',
    lessons: [
      'Consistency is a skill, not a trait',
      'Distribution beats quality in early stages',
      'Burnout is data — recalibrate, not quit forever',
    ],
    insight: 'This is where I learned that failing publicly is the best teacher.',
    duration: '8 months',
  },
  {
    id: 'logo',
    icon: BiPalette,
    year: '2021',
    title: 'Logo Brand',
    subtitle: 'Design Business',
    status: 'FAILED',
    statusColor: '#ff4444',
    description:
      'Started a freelance logo design business. Learned Figma, branding principles, client communication, and pricing. Landed a few clients before the pipeline dried up.',
    lessons: [
      'Design is communication, not decoration',
      'Pricing yourself too low kills the business',
      'Portfolio compounds over time',
    ],
    insight: 'My design sensibility today was born in this experiment.',
    duration: '5 months',
  },
  {
    id: 'esports',
    icon: BiTrophy,
    year: '2021',
    title: 'Esports Venture',
    subtitle: 'Team Building',
    status: 'FAILED',
    statusColor: '#ff4444',
    description:
      'Built and managed an esports team. Coordinated players, organized scrimmages, handled brand identity. Disbanded due to coordination challenges and resource constraints.',
    lessons: [
      'Managing people is harder than building products',
      'Operations is the unsexy backbone of everything',
      'Community is leverage',
    ],
    insight: 'Leadership under pressure was the real game being played.',
    duration: '4 months',
  },
  {
    id: 'webdesign',
    icon: BiCodeAlt,
    year: '2022',
    title: 'Web Design',
    subtitle: 'Agency Attempt',
    status: 'FAILED',
    statusColor: '#ff4444',
    description:
      'Attempted to launch a web design micro-agency. Learned HTML, CSS, JavaScript, React basics. Built demo sites and pitched clients. Never scaled past solo client work.',
    lessons: [
      'Technical skills are the floor, not the ceiling',
      'Sales is a superpower every builder needs',
      'Niching down dramatically improves conversion',
    ],
    insight: 'This experiment built the foundation for everything I build now.',
    duration: '10 months',
  },
  {
    id: 'logistics',
    icon: BiPackage,
    year: '2023',
    title: 'Logistics Startup',
    subtitle: 'Operations Tech',
    status: 'FAILED',
    statusColor: '#ff4444',
    description:
      'Tried to build a last-mile logistics optimization tool for small businesses. Mapped out the problem, designed the product, started development. Killed it before launch due to market access barriers.',
    lessons: [
      'Problem validation beats solution perfection',
      'B2B requires different distribution than B2C',
      'Knowing when to kill an idea is a skill',
    ],
    insight: 'The rigor of systems thinking I developed here lives in AURA-X.',
    duration: '6 months',
  },
]

function TimelineCard({ item, index }: { item: typeof TIMELINE_ITEMS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = item.icon

  return (
    <SectionReveal delay={index * 100}>
      <div
        className="relative group"
        style={{
          paddingLeft: '2.5rem',
        }}
      >
        {/* Timeline node */}
        <div
          className="absolute left-0 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
          style={{
            borderColor: expanded ? 'var(--cyan)' : 'rgba(0,212,255,0.3)',
            background: expanded ? 'rgba(0,212,255,0.1)' : 'var(--background)',
            boxShadow: expanded ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
          }}
        >
          <div
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: expanded ? 'var(--cyan)' : 'rgba(0,212,255,0.3)' }}
          />
        </div>

        {/* Year label */}
        <div className="text-[10px] font-mono text-cyan/40 tracking-widest mb-2">{item.year}</div>

        {/* Card */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left glass glass-hover rounded-lg p-5 transition-all duration-300 group/card"
          style={{
            borderColor: expanded ? 'rgba(0,212,255,0.3)' : undefined,
            boxShadow: expanded ? '0 0 30px rgba(0,212,255,0.08)' : undefined,
          }}
          aria-expanded={expanded}
          aria-controls={`timeline-details-${item.id}`}
        >
          {/* Card header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: expanded ? 'rgba(0,212,255,0.1)' : 'rgba(0,212,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}
              >
                <Icon className="text-cyan text-lg" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm tracking-wide group-hover/card:text-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted-foreground font-mono">{item.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: item.statusColor }}
                />
                <span
                  className="text-[10px] font-mono tracking-widest"
                  style={{ color: item.statusColor }}
                >
                  {item.status}
                </span>
              </div>
              <HiChevronDown
                className="text-muted-foreground transition-transform duration-300 text-base"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Expandable content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                id={`timeline-details-${item.id}`}
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border/50 mt-4 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-cyan/70">
                      LESSONS EXTRACTED
                    </h4>
                    <ul className="space-y-1.5">
                      {item.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                          <span className="text-cyan mt-0.5" aria-hidden="true">
                            —
                          </span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="p-3 rounded-md text-xs italic text-cyan/80 flex items-start gap-2"
                    style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}
                  >
                    <HiLightningBolt className="text-cyan mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {item.insight}
                  </div>

                  <div className="text-[10px] font-mono text-muted-foreground/50 flex items-center gap-2">
                    <span>DURATION</span>
                    <span className="text-cyan/50">{item.duration}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </SectionReveal>
  )
}

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Timeline of ventures"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <SectionLabel number="02" label="The Journey" />
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            FIVE
            <br />
            <span className="text-cyan glow-text">EXPERIMENTS.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mb-10 leading-relaxed">
            Not failures. Not mistakes. Data points on the path to building something real.
            Each venture taught me something no course ever could.
          </p>
        </SectionReveal>


        {/* Timeline line */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[9px] top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.2) 10%, rgba(0,212,255,0.2) 90%, transparent)',
            }}
          />

          <div className="space-y-8">
            {TIMELINE_ITEMS.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <SectionReveal delay={600} className="mt-12 text-center">
          <p className="text-xs font-mono text-muted-foreground/50 tracking-widest">
            TOTAL VENTURES — 05 / TOTAL FAILURES — 05 / TOTAL LESSONS — INFINITE
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
