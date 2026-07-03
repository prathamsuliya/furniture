'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Room, Hotspot as HotspotType } from '@/types'
import Hotspot from './Hotspot'
import ProductCard from './ProductCard'
import RoomSwitcher from './RoomSwitcher'

interface RoomViewProps {
  room: Room
  roomIndex: number
  totalRooms: number
  activeHotspot: HotspotType | null
  onHotspotSelect: (hotspot: HotspotType) => void
  onHotspotClose: () => void
  onRoomSwitch: () => void
  onBackToWindow: () => void
}

export default function RoomView({
  room,
  roomIndex,
  totalRooms,
  activeHotspot,
  onHotspotSelect,
  onHotspotClose,
  onRoomSwitch,
  onBackToWindow,
}: RoomViewProps) {
  const handleHotspotSelect = useCallback(
    (hotspot: HotspotType) => onHotspotSelect(hotspot),
    [onHotspotSelect]
  )

  return (
    <motion.div
      className="fixed inset-0 z-20 gpu-layer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      {/* ── Room background with crossfade on room switch (4% bleed margin) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`room-bg-${room.id}`}
          className="absolute"
          style={{ inset: '-4%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <Image
            src={room.roomImg}
            alt={room.name}
            fill
            className="object-cover object-center"
            priority
            sizes="110vw"
          />

          {/* Vignette overlays to add depth and frame the scene */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-espresso/35 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-espresso/15 via-transparent to-warm-espresso/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-espresso/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Hotspots layer — re-animate on room switch ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`hotspots-${room.id}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="absolute inset-0 pointer-events-auto">
            {room.hotspots.map((hotspot, idx) => (
              <Hotspot
                key={hotspot.id}
                hotspot={hotspot}
                onSelect={handleHotspotSelect}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Top-left: Back to Window Button ── */}
      <motion.button
        id="back-to-window-btn"
        onClick={onBackToWindow}
        whileHover={{ scale: 1.06, x: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="absolute top-7 left-7 z-30 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white/95 border border-white/20 backdrop-blur-md shadow-lg cursor-pointer focus:outline-none transition-colors duration-300 font-sans text-xs font-medium tracking-wider uppercase"
        aria-label="Back to window"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back</span>
      </motion.button>

      {/* ── Product card modal ── */}
      <ProductCard hotspot={activeHotspot} onClose={onHotspotClose} />

      {/* ── Room switcher ── */}
      <RoomSwitcher
        currentIndex={roomIndex}
        totalRooms={totalRooms}
        roomName={room.name}
        onSwitch={onRoomSwitch}
      />
    </motion.div>
  )
}
