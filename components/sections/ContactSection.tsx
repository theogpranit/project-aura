'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { BiEnvelope, BiLogoGithub, BiLogoTwitter, BiLogoLinkedin, BiSend } from 'react-icons/bi'
import { HiArrowRight } from 'react-icons/hi'

const SOCIAL_LINKS = [
  {
    icon: BiLogoGithub,
    label: 'GitHub',
    handle: '@pranitportfolio',
    href: 'https://github.com',
  },
  {
    icon: BiLogoTwitter,
    label: 'Twitter / X',
    handle: '@pranit_builds',
    href: 'https://x.com',
  },
  {
    icon: BiLogoLinkedin,
    label: 'LinkedIn',
    handle: 'Pranit',
    href: 'https://linkedin.com',
  },
  {
    icon: BiEnvelope,
    label: 'Email',
    handle: 'hello@pranit.dev',
    href: 'mailto:hello@pranit.dev',
  },
]

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-10 text-center"
      >
        <div className="text-4xl font-bold text-cyan font-mono mb-4 glow-text">ACK.</div>
        <p className="text-sm text-muted-foreground mb-2">Signal received. I&apos;ll respond soon.</p>
        <p className="text-xs font-mono text-muted-foreground/50">
          Message logged — {new Date().toLocaleTimeString()}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-name"
          className="text-[10px] font-mono tracking-widest text-muted-foreground/60"
        >
          IDENTIFIER
        </label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-transparent border-b py-2 text-sm text-foreground placeholder-muted-foreground/40 font-mono focus:outline-none transition-colors"
          style={{
            borderColor: 'rgba(0,212,255,0.15)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.5)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.15)')}
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-email"
          className="text-[10px] font-mono tracking-widest text-muted-foreground/60"
        >
          TRANSMISSION ADDRESS
        </label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-transparent border-b py-2 text-sm text-foreground placeholder-muted-foreground/40 font-mono focus:outline-none transition-colors"
          style={{ borderColor: 'rgba(0,212,255,0.15)' }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.5)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.15)')}
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="text-[10px] font-mono tracking-widest text-muted-foreground/60"
        >
          MESSAGE PAYLOAD
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          placeholder="What's on your mind?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-b py-2 text-sm text-foreground placeholder-muted-foreground/40 font-mono focus:outline-none transition-colors resize-none"
          style={{ borderColor: 'rgba(0,212,255,0.15)' }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.5)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.15)')}
        />
      </div>

      <button
        type="submit"
        className="group w-full flex items-center justify-center gap-2 py-3.5 font-mono text-xs tracking-[0.25em] transition-all duration-300 rounded-lg"
        style={{
          background: 'transparent',
          border: '1px solid var(--cyan)',
          color: 'var(--cyan)',
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget
          t.style.background = 'var(--cyan)'
          t.style.color = 'var(--background)'
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget
          t.style.background = 'transparent'
          t.style.color = 'var(--cyan)'
        }}
      >
        TRANSMIT MESSAGE
        <BiSend
          className="transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <SectionLabel number="07" label="Contact" />
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            ESTABLISH
            <br />
            <span className="text-cyan glow-text">CONTACT.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mb-10 leading-relaxed">
            If you&apos;re building something interesting, have a collaboration in mind,
            or just want to talk about the future — I&apos;m listening.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — Form */}
          <SectionReveal delay={100}>
            <ContactForm />
          </SectionReveal>

          {/* Right — Social + Info */}
          <div className="space-y-8">
            <SectionReveal delay={200}>
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground mb-4">
                DIRECT CHANNELS
              </h3>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link, i) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="group flex items-center gap-4 glass glass-hover rounded-lg p-4"
                      aria-label={`${link.label}: ${link.handle}`}
                    >
                      <div
                        className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          background: 'rgba(0,212,255,0.05)',
                          border: '1px solid rgba(0,212,255,0.1)',
                        }}
                      >
                        <Icon
                          className="text-muted-foreground group-hover:text-cyan transition-colors text-lg"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono tracking-widest text-muted-foreground/50 mb-0.5">
                          {link.label}
                        </div>
                        <div className="text-sm font-mono text-foreground/80 truncate group-hover:text-cyan transition-colors">
                          {link.handle}
                        </div>
                      </div>
                      <HiArrowRight
                        className="text-muted-foreground/30 group-hover:text-cyan transition-colors"
                        aria-hidden="true"
                      />
                    </motion.a>
                  )
                })}
              </div>
            </SectionReveal>

            {/* Response time note */}
            <SectionReveal delay={400}>
              <div
                className="p-4 rounded-lg font-mono text-xs space-y-2"
                style={{
                  background: 'rgba(0,212,255,0.03)',
                  border: '1px solid rgba(0,212,255,0.08)',
                }}
              >
                <div className="flex items-center gap-2 text-muted-foreground/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan status-pulse" />
                  <span>RESPONSE TIME</span>
                  <span className="text-cyan ml-auto">{'< 24 HRS'}</span>
                </div>
                <div className="flex justify-between text-muted-foreground/60">
                  <span>TIMEZONE</span>
                  <span className="text-foreground/60">IST (UTC+5:30)</span>
                </div>
                <div className="flex justify-between text-muted-foreground/60">
                  <span>AVAILABILITY</span>
                  <span className="text-cyan">OPEN TO COLLABS</span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
