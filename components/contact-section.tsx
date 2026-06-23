'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { SectionReveal, LineReveal } from './section-reveal'

const contacts = [
  {
    label: 'GitHub',
    display: 'github.com/theogpranit',
    href: 'https://github.com/theogpranit',
    copy: 'github.com/theogpranit',
  },
  {
    label: 'Email',
    display: 'theogpranit@gmail.com',
    href: 'mailto:theogpranit@gmail.com',
    copy: 'theogpranit@gmail.com',
  },
  {
    label: 'Discord',
    display: 'pranit.69',
    href: '#',
    copy: 'pranit.69',
  },
]

function ContactItem({ contact, i }: { contact: typeof contacts[0]; i: number }) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 110, damping: 20 })
  const y = useSpring(my, { stiffness: 110, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.18)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    await navigator.clipboard.writeText(contact.copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <SectionReveal delay={i * 0.09}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-magnetic
      >
        <motion.div
          style={{ x, y }}
          className="flex items-center justify-between gap-6 rounded-2xl px-6 py-5 transition-shadow duration-400"
          whileHover={{
            background: 'var(--surface-hover)',
            boxShadow: '0 2px 16px rgba(10,10,10,0.05)',
          }}
          initial={{
            background: 'var(--surface)',
            border: '1px solid var(--divider)',
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-[9px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              {contact.label}
            </span>
            <a
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-tight"
              style={{ color: 'var(--foreground)' }}
              onClick={contact.href === '#' ? (e) => e.preventDefault() : undefined}
            >
              {contact.display}
            </a>
          </div>

          <motion.button
            onClick={handleCopy}
            className="shrink-0 rounded-xl px-4 py-2 text-[9px] tracking-widest uppercase"
            style={{
              background: copied ? 'rgba(10,10,10,0.07)' : 'transparent',
              border: '1px solid var(--divider)',
              color: copied ? 'var(--foreground)' : 'var(--text-dim)',
              transition: 'background 0.3s, color 0.3s',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? 'Copied' : 'Copy'}
          </motion.button>
        </motion.div>
      </div>
    </SectionReveal>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-3xl px-6 py-32 md:px-10 md:py-44"
    >
      <SectionReveal>
        <p
          className="mb-4 text-[9px] tracking-[0.32em] uppercase"
          style={{ color: 'var(--text-dim)' }}
        >
          06 — Contact
        </p>
      </SectionReveal>

      <div className="mb-16">
        <LineReveal delay={0.06}>
          <h2
            className="text-balance font-semibold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', letterSpacing: '-0.028em' }}
          >
            Reach out.
          </h2>
        </LineReveal>
        <LineReveal delay={0.14}>
          <h2
            className="font-semibold leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
              letterSpacing: '-0.028em',
              color: 'var(--text-dim)',
            }}
          >
            Start a conversation.
          </h2>
        </LineReveal>
      </div>

      <div className="flex flex-col gap-3">
        {contacts.map((c, i) => (
          <ContactItem key={c.label} contact={c} i={i} />
        ))}
      </div>
    </section>
  )
}
