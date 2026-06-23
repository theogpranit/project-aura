'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.15 + i * 0.13,
      duration: 1.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 35, damping: 42 })
  const y = useSpring(rawY, { stiffness: 35, damping: 42 })

  // Spotlight position (faster spring — more reactive)
  const spotRawX = useMotionValue(0.5)
  const spotRawY = useMotionValue(0.5)
  const spotX = useSpring(spotRawX, { stiffness: 55, damping: 28 })
  const spotY = useSpring(spotRawY, { stiffness: 55, damping: 28 })
  const spotLeft = useTransform(spotX, (v) => `calc(${v * 100}% - 340px)`)
  const spotTop  = useTransform(spotY, (v) => `calc(${v * 100}% - 340px)`)

  // Parallax depth layers
  const layer1X = useTransform(x, (v) => v * -14)
  const layer1Y = useTransform(y, (v) => v * -11)
  const layer2X = useTransform(x, (v) => v * 7)
  const layer2Y = useTransform(y, (v) => v * 6)
  const layer3X = useTransform(x, (v) => v * -4)
  const layer3Y = useTransform(y, (v) => v * -3)

  // Scroll-driven scale — gentle zoom-in as you scroll away
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
      spotRawX.set(e.clientX / (sectionRef.current?.offsetWidth ?? window.innerWidth))
      spotRawY.set(e.clientY / (sectionRef.current?.offsetHeight ?? window.innerHeight))
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX, rawY, spotRawX, spotRawY])

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Cursor-reactive spotlight bloom behind the name */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            left: spotLeft,
            top: spotTop,
            width: 680,
            height: 680,
            background: 'radial-gradient(ellipse at center, rgba(214,210,206,0.52) 0%, transparent 66%)',
            filter: 'blur(52px)',
            zIndex: 0,
          }}
        />

        {/* Meta — Nagpur / DOB */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative z-10 mb-10 flex items-center gap-4"
        >
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: 'var(--text-dim)' }}
          >
            Nagpur, India
          </span>
          <span
            className="inline-block h-px w-8"
            style={{ background: 'var(--text-dim)' }}
          />
          <span
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: 'var(--text-dim)' }}
          >
            06 August 2008
          </span>
        </motion.div>

        {/* Name — three parallax layers */}
        <div className="relative z-10 overflow-hidden">
          {/* Back shadow layer */}
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
          >
            <span
              className="block font-bold leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                letterSpacing: '-0.035em',
                color: 'rgba(10,10,10,0.06)',
                filter: 'blur(3px)',
              }}
            >
              PRANIT HOLE
            </span>
          </motion.div>

          {/* Middle depth layer */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
          >
            <span
              className="block font-bold leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                letterSpacing: '-0.035em',
                color: 'rgba(10,10,10,0.045)',
              }}
            >
              PRANIT HOLE
            </span>
          </motion.div>

          {/* Foreground — visible text */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={reveal}
            style={{ x: layer3X, y: layer3Y }}
            className="relative font-bold leading-none tracking-tight text-balance"
            suppressHydrationWarning
          >
            <span
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
                letterSpacing: '-0.035em',
                color: 'var(--foreground)',
                display: 'block',
              }}
            >
              PRANIT HOLE
            </span>
          </motion.h1>
        </div>

        {/* Hairline */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative z-10 my-9 h-px w-12"
          style={{ background: 'var(--divider)' }}
        />

        {/* Tagline */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative z-10 max-w-sm text-balance text-sm leading-relaxed"
          style={{ color: 'var(--text-subtle)', letterSpacing: '0.01em' }}
        >
          A self-taught builder exploring technology, AI systems,
          design, and digital products through experimentation.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative z-10 mt-20 flex flex-col items-center gap-3"
        >
          <span
            className="text-[9px] tracking-[0.34em] uppercase"
            style={{ color: 'var(--text-dim)' }}
          >
            Scroll
          </span>
          <div
            className="relative h-11 w-px overflow-hidden"
            style={{ background: 'var(--divider)' }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-full"
              style={{ background: 'var(--text-dim)' }}
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
