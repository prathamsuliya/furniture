'use client'

import { motion } from 'framer-motion'

interface RoomSwitcherProps {
  currentIndex: number
  totalRooms: number
  roomName: string
  onSwitch: () => void
}

export default function RoomSwitcher({
  currentIndex,
  totalRooms,
  onSwitch,
}: RoomSwitcherProps) {
  return (
    <motion.div
      className="fixed bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalRooms }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              width: i === currentIndex ? 22 : 6,
              backgroundColor:
                i === currentIndex
                  ? 'rgba(28,23,19,0.90)'
                  : 'rgba(28,23,19,0.25)',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: 4, borderRadius: 2, display: 'inline-block' }}
          />
        ))}
      </div>

      {/* Button — White background with black text */}
      <motion.button
        id="change-room-btn"
        onClick={onSwitch}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 rounded-full focus:outline-none backdrop-blur-md"
        style={{
          padding: '12px 32px',
          background: 'rgba(255,255,255,0.90)',
          border: '1px solid rgba(0,0,0,0.10)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          cursor: 'pointer',
        }}
        aria-label={`Change room — ${currentIndex + 1} of ${totalRooms}`}
      >
        {/* Left arrow */}
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" style={{ flexShrink: 0 }}>
          <path d="M11 4.5H1M4.5 1L1 4.5L4.5 8" stroke="#1C1713" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <span style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#1C1713',
        }}>
          Next Room
        </span>

        {/* Right arrow */}
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 4.5H11M7.5 1L11 4.5L7.5 8" stroke="#1C1713" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </motion.div>
  )
}
