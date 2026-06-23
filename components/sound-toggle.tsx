'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    setMounted(true)
    // Do NOT read localStorage here to auto-enable — browser blocks AudioContext
    // without a gesture. User must explicitly click to enable.
  }, [])

  // Lazily create and resume AudioContext only after a real user gesture
  const getCtx = useCallback(async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )()
    }
    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const playTick = useCallback(async () => {
    if (!enabled) return
    try {
      const ctx = await getCtx()
      if (ctx.state !== 'running') return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.06)
    } catch (_) {}
  }, [enabled, getCtx])

  const playClick = useCallback(async () => {
    try {
      const ctx = await getCtx()
      if (ctx.state !== 'running') return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(820, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.055, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.12)
    } catch (_) {}
  }, [getCtx])

  // Expose sounds globally for other components to call
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__ph_tick = playTick;
    (window as unknown as Record<string, unknown>).__ph_click = playClick
  }, [playTick, playClick])

  const handleToggle = async () => {
    // Play click sound first — this gesture creates/resumes the AudioContext
    await playClick()
    setEnabled((v) => {
      const next = !v
      // If turning off, suspend to save resources
      if (!next && audioCtxRef.current) {
        audioCtxRef.current.suspend().catch(() => {})
      }
      return next
    })
  }

  if (!mounted) return null

  return (
    <motion.button
      className="fixed bottom-7 right-7 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--divider)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={handleToggle}
      onMouseEnter={() => playTick()}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      aria-pressed={enabled}
    >
      {/* Sound wave bars */}
      <div className="flex h-3.5 items-end gap-[3px]">
        {[1, 2, 3].map((bar) => (
          <motion.span
            key={bar}
            className="block w-[2px] rounded-full"
            style={{ background: enabled ? 'var(--foreground)' : 'var(--text-dim)' }}
            animate={
              enabled
                ? {
                    height: ['40%', '100%', '55%', '90%', '40%'],
                  }
                : { height: '40%' }
            }
            transition={
              enabled
                ? {
                    duration: 0.85 + bar * 0.14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: bar * 0.16,
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <span
        className="text-[10px] tracking-[0.2em] uppercase"
        style={{ color: enabled ? 'var(--foreground)' : 'var(--text-dim)' }}
      >
        {enabled ? 'Sound On' : 'Sound Off'}
      </span>
    </motion.button>
  )
}
