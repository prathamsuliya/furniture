'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscNodeRef = useRef<OscillatorNode | null>(null)

  // Initialize ambient Web Audio synth (warm ambient acoustic drone)
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      // Master gain node
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Warm sine drone oscillator (110Hz - A2 note)
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(110, ctx.currentTime)

      // Lowpass filter for warm room acoustic sound
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(320, ctx.currentTime)

      osc.connect(filter)
      filter.connect(gain)
      osc.start()
      oscNodeRef.current = osc
    } catch (e) {
      console.warn('AudioContext not supported', e)
    }
  }, [])

  const toggleSound = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio()
    }

    const ctx = audioCtxRef.current
    const gain = gainNodeRef.current

    if (!ctx || !gain) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    if (isPlaying) {
      // Fade out
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5)
      setIsPlaying(false)
    } else {
      // Fade in to subtle ambient volume
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.8)
      setIsPlaying(true)
    }
  }, [initAudio, isPlaying])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <motion.button
      id="sound-toggle-btn"
      onClick={toggleSound}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-black/10 shadow-lg backdrop-blur-md text-xs font-sans font-semibold tracking-widest uppercase cursor-pointer focus:outline-none transition-colors duration-200"
      aria-label="Toggle ambient sound"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? 'bg-emerald-600' : 'bg-neutral-400'
          }`}
        />
      </span>
      <span>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
    </motion.button>
  )
}
