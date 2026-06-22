'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  'INITIALIZING SYSTEM...',
  'LOADING NEURAL CORES...',
  'ESTABLISHING SECURE CONNECTION...',
  'DECRYPTING DOSSIER...',
  'CALIBRATING INTERFACE...',
  'ACCESS GRANTED.',
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const totalDuration = 2800
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onComplete, 600)
          }, 300)
          return 100
        }
        return next
      })
    }, totalDuration / 100)

    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < BOOT_LINES.length - 1) return prev + 1
        clearInterval(lineInterval)
        return prev
      })
    }, 400)

    return () => {
      clearInterval(interval)
      clearInterval(lineInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative flex items-center justify-center w-16 h-16">
                <div
                  className="absolute inset-0 rounded-full border border-cyan/30 animate-spin"
                  style={{ animationDuration: '4s' }}
                />
                <div
                  className="absolute inset-2 rounded-full border border-cyan/20 animate-spin"
                  style={{ animationDuration: '3s', animationDirection: 'reverse' }}
                />
                <span className="text-cyan font-bold text-xl font-mono">P</span>
              </div>
            </motion.div>

            {/* Boot lines */}
            <div className="w-full space-y-1.5 min-h-[140px]">
              {BOOT_LINES.slice(0, currentLine + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className="text-cyan/60">{'>'}</span>
                  <span
                    className={
                      i === currentLine && line === 'ACCESS GRANTED.'
                        ? 'text-cyan glow-text'
                        : i === currentLine
                        ? 'text-foreground/80'
                        : 'text-muted-foreground'
                    }
                  >
                    {line}
                    {i === currentLine && line !== 'ACCESS GRANTED.' && (
                      <span className="cursor-blink text-cyan ml-1">_</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="h-px bg-border/50 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-cyan rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
                {/* Shimmer */}
                <div
                  className="absolute top-0 left-0 h-full w-20 shimmer"
                  style={{ left: `${Math.max(0, progress - 10)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>LOADING DOSSIER</span>
                <span className="text-cyan">{Math.floor(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
