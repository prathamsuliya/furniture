'use client'

import { useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import { Room, Phase, Hotspot as HotspotType } from '@/types'
import Hotspot from './Hotspot'
import ProductCard from './ProductCard'
import RoomSwitcher from './RoomSwitcher'
import TreeShadow from './TreeShadow'

interface WindowViewProps {
  room: Room
  roomIndex: number
  totalRooms: number
  phase: Phase
  direction: number
  activeHotspot: HotspotType | null
  onEnter: () => void
  onNextRoom: () => void
  onPrevRoom: () => void
  onBackToWindow: () => void
  onHotspotSelect: (hotspot: HotspotType) => void
  onHotspotClose: () => void
  onAnimationComplete: () => void
}

// Cinematic Motion Blur slide variants with seamless 100% sliding for Window & Room image
const slideVariants: Variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    filter: 'blur(16px) contrast(1.15)',
    opacity: 0.85,
  }),
  animate: {
    x: '0%',
    filter: 'blur(0px) contrast(1)',
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    filter: 'blur(16px) contrast(1.15)',
    opacity: 0.85,
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  }),
}

// Matching Motion Blur slide variants for Header Text Title (Chapter & Room Name)
const titleVariants: Variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? '80%' : '-80%',
    opacity: 0,
    filter: 'blur(12px)',
  }),
  animate: {
    x: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-80%' : '80%',
    opacity: 0,
    filter: 'blur(12px)',
    transition: {
      duration: 0.7,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  }),
}

export default function WindowView({
  room,
  roomIndex,
  totalRooms,
  phase,
  direction,
  activeHotspot,
  onEnter,
  onNextRoom,
  onPrevRoom,
  onBackToWindow,
  onHotspotSelect,
  onHotspotClose,
  onAnimationComplete,
}: WindowViewProps) {
  const isEntering = phase === 'entering'
  const isExiting = phase === 'exiting'
  const isRoomView = phase === 'room'
  const isWindowView = phase === 'window'
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalised 0–1 mouse position for 3D tilt & magnetic cursor pull
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Spring smoothing for cursor tracking
  const cfg = { damping: 35, stiffness: 120, mass: 0.6 }
  const sx = useSpring(mouseX, cfg)
  const sy = useSpring(mouseY, cfg)

  // Subtle 3D perspective tilt
  const rotY = useTransform(sx, [0, 1], [-2.2, 2.2])
  const rotX = useTransform(sy, [0, 1], [1.8, -1.8])

  // Magnetic cursor tracking transforms for text title & buttons
  const textX = useTransform(sx, [0, 1], [-14, 14])
  const textY = useTransform(sy, [0, 1], [-8, 8])

  const enterBtnX = useTransform(sx, [0, 1], [-12, 12])
  const enterBtnY = useTransform(sy, [0, 1], [-6, 6])

  const prevBtnX = useTransform(sx, [0, 1], [-10, 10])
  const prevBtnY = useTransform(sy, [0, 1], [-8, 8])

  const nextBtnX = useTransform(sx, [0, 1], [-10, 10])
  const nextBtnY = useTransform(sy, [0, 1], [-8, 8])

  const backBtnX = useTransform(sx, [0, 1], [-10, 10])
  const backBtnY = useTransform(sy, [0, 1], [-8, 8])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isEntering || isExiting) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - left) / width)
      mouseY.set((e.clientY - top) / height)
    },
    [mouseX, mouseY, isEntering, isExiting]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [mouseX, mouseY])

  // Roman numeral conversion for Chapter title
  const getRomanNumeral = (num: number) => {
    const numerals = ['I', 'II', 'III', 'IV', 'V']
    return numerals[num - 1] || 'I'
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-20 overflow-hidden gpu-layer bg-[#E6DAD0]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── CINEMATIC MOTION BLUR SLIDE & ZOOM WRAPPER FOR WINDOW & ROOM ── */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`room-group-${room.id}`}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 z-0 gpu-layer bg-[#E6DAD0]"
        >
          {/* ── SINGLE ROOM IMAGE LAYER (Crystal Clear, Zero Blur on Room Image) ── */}
          <motion.div
            className="absolute inset-0 z-0 gpu-layer"
            style={{ willChange: 'transform' }}
            initial={
              isEntering
                ? { scale: 1.0 }
                : isExiting
                  ? { scale: 1.08 }
                  : { scale: 1.0 }
            }
            animate={
              isEntering
                ? { scale: 1.08 }
                : isExiting
                  ? { scale: 1.0 }
                  : isRoomView
                    ? { scale: 1.08 }
                    : { scale: 1.0 }
            }
            transition={{
              duration: 0.85,
              ease: [0.6, 0.05, 0.1, 0.95] as const,
            }}
          >
            <Image
              src={room.roomImg}
              alt={room.name}
              fill
              className="object-cover object-center"
              priority
              unoptimized
              sizes="100vw"
            />
          </motion.div>

          {/* ── WINDOW PNG OVERLAY (Zoom Fly-through with Motion Blur) ── */}
          {!isRoomView && (
            <motion.div
              className="absolute inset-0 z-10 gpu-layer"
              style={{
                rotateX: rotX,
                rotateY: rotY,
                perspective: 1200,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
              initial={
                isExiting
                  ? { scale: 5, opacity: 0, filter: 'blur(18px) brightness(1.1)' }
                  : { scale: 1, opacity: 1, filter: 'blur(0px) brightness(1)' }
              }
              animate={
                isEntering
                  ? {
                    scale: 5,
                    opacity: 0,
                    filter: 'blur(18px) brightness(1.1)',
                  }
                  : {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px) brightness(1)',
                  }
              }
              transition={{
                duration: 0.85,
                ease: [0.6, 0.05, 0.1, 0.95] as const,
              }}
              onAnimationComplete={() => {
                if (isEntering || isExiting) onAnimationComplete()
              }}
            >
              <Image
                src={room.windowImg}
                alt={`Window — ${room.name}`}
                fill
                className="object-cover object-center"
                priority
                unoptimized
                sizes="100vw"
              />
            </motion.div>
          )}

          {/* ── DAPPLED TREE SHADOW OVERLAY — Sliding with Window Image ── */}
          {!isRoomView && <TreeShadow />}

          {/* ── DYNAMIC VIGNETTE ── */}
          {isWindowView && (
            <div className="absolute inset-0 z-20 pointer-events-none bg-radial from-transparent via-transparent to-black/25" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          HOTSPOTS LAYER (Visible in Room View)
      ══════════════════════════════════════════════════════════ */}
      {isRoomView && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`hotspots-${room.id}`}
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 pointer-events-auto">
              {room.hotspots.map((hotspot, idx) => (
                <Hotspot
                  key={hotspot.id}
                  hotspot={hotspot}
                  onSelect={onHotspotSelect}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ══════════════════════════════════════════════════════════
          WINDOW VIEW UI — Header & "Enter the room" button (z-50)
      ══════════════════════════════════════════════════════════ */}
      {!isRoomView && (
        <>
          {/* Left Arrow — Magnetic cursor move */}
          <motion.button
            id="prev-room-btn"
            onClick={onPrevRoom}
            aria-label="Previous room"
            style={{ x: prevBtnX, y: prevBtnY }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: isEntering ? 0 : 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-black/10 shadow-lg backdrop-blur-md flex items-center justify-center cursor-pointer focus:outline-none transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </motion.button>

          {/* Right Arrow — Magnetic cursor move */}
          <motion.button
            id="next-room-btn"
            onClick={onNextRoom}
            aria-label="Next room"
            style={{ x: nextBtnX, y: nextBtnY }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: isEntering ? 0 : 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-black/10 shadow-lg backdrop-blur-md flex items-center justify-center cursor-pointer focus:outline-none transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>

          {/* Header Title (White Text with Cinematic Slide Motion & Magnetic Cursor Tracking) */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`title-${room.id}`}
              custom={direction}
              variants={titleVariants}
              initial="initial"
              animate={isEntering ? { opacity: 0, y: -20 } : "animate"}
              exit="exit"
              className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center pt-10 pointer-events-none"
              style={{ x: textX, y: textY }}
            >
              <p
                style={{
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '4px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                }}
              >
                CHAPTER {getRomanNumeral(room.id)}
              </p>
              <h1
                style={{
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                  fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  textShadow: '0 4px 22px rgba(0,0,0,0.90)',
                }}
              >
                {room.name}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Enter Room Button — Magnetic cursor move */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-14"
            style={{ x: enterBtnX, y: enterBtnY }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 20 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              id="enter-room-btn"
              onClick={onEnter}
              aria-label="Enter the room"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3.5 px-7 py-3.5 bg-white/90 hover:bg-white text-neutral-900 rounded-sm border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.30)] transition-all duration-300 font-sans text-sm font-medium tracking-wide cursor-pointer focus:outline-none backdrop-blur-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Enter the room</span>
            </motion.button>
          </motion.div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════
          ROOM VIEW UI — Back Button & Room Switcher (z-50)
      ══════════════════════════════════════════════════════════ */}
      {isRoomView && (
        <>
          {/* Top-Left Back Button — Magnetic cursor move */}
          <motion.button
            id="back-to-window-btn"
            onClick={onBackToWindow}
            style={{ x: backBtnX, y: backBtnY }}
            whileHover={{ scale: 1.08, x: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-7 left-7 z-50 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-black/10 shadow-lg backdrop-blur-md cursor-pointer focus:outline-none transition-colors duration-200 font-sans text-xs font-semibold tracking-wider uppercase"
            aria-label="Back to window"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </motion.button>

          {/* Room Switcher Pill at bottom */}
          <RoomSwitcher
            currentIndex={roomIndex}
            totalRooms={totalRooms}
            roomName={room.name}
            onSwitch={onNextRoom}
          />
        </>
      )}

      {/* ══════════════════════════════════════════════════════════
          PRODUCT CARD DRAWER MODAL
      ══════════════════════════════════════════════════════════ */}
      <ProductCard hotspot={activeHotspot} onClose={onHotspotClose} />
    </motion.div>
  )
}
