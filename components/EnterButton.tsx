'use client'

import { motion } from 'framer-motion'

interface EnterButtonProps {
  onClick: () => void
  light?: boolean // true = white/translucent style for dark backgrounds
}

export default function EnterButton({ onClick, light = false }: EnterButtonProps) {
  return (
    <motion.button
      id="enter-room-btn"
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative group cursor-pointer focus:outline-none overflow-hidden rounded-full"
      style={{
        padding: '13px 44px',
        background: light
          ? 'rgba(245,240,235,0.14)'
          : 'rgba(245,240,235,0.85)',
        border: light
          ? '1px solid rgba(245,240,235,0.45)'
          : '1px solid rgba(200,184,154,0.65)',
        boxShadow: light
          ? '0 4px 32px rgba(10,8,5,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 4px 32px rgba(74,63,54,0.10), 0 1px 4px rgba(74,63,54,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: light ? 'rgba(245,240,235,0.92)' : '#4A3F36',
      }}
      aria-label="Enter the room"
    >
      {/* Top shimmer on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: light
            ? 'linear-gradient(to right, transparent, rgba(245,240,235,0.5), transparent)'
            : 'linear-gradient(to right, transparent, rgba(200,184,154,0.7), transparent)',
        }}
      />

      <span className="relative flex items-center gap-3">
        <span>Enter Room</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: light ? 'rgba(245,240,235,0.65)' : '#8A7055',
            fontSize: '14px',
          }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  )
}
