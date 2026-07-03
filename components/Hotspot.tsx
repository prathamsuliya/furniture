'use client'

import { motion } from 'framer-motion'
import { Hotspot as HotspotType } from '@/types'

interface HotspotProps {
  hotspot: HotspotType
  onSelect: (hotspot: HotspotType) => void
  index: number
}

export default function Hotspot({ hotspot, onSelect, index }: HotspotProps) {
  return (
    <motion.button
      id={`hotspot-${hotspot.id}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.4 + index * 0.14, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(hotspot)}
      aria-label={`View ${hotspot.product.name}`}
    >
      {/* Outer expanding pulse ring */}
      <motion.span
        className="absolute rounded-full"
        style={{
          inset: '-10px',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 2.0, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Inner subtle pulse ring */}
      <motion.span
        className="absolute rounded-full"
        style={{
          inset: '-5px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Core glassmorphic dot */}
      <span
        className="relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 bg-white/90 text-neutral-800 border border-black/10 shadow-[0_6px_24px_rgba(0,0,0,0.18)] backdrop-blur-md group-hover:bg-white group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
      >
        {/* Plus icon rotates into cross on hover */}
        <motion.span
          className="relative flex items-center justify-center"
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.span>
      </span>

      {/* Luxury Tooltip Label — Product Name + Price */}
      <span
        className="
          absolute -top-14 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-0.5
          px-3.5 py-2
          rounded-md
          whitespace-nowrap
          pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          translate-y-2 group-hover:translate-y-0
          bg-white/95 text-neutral-900 border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md
        "
      >
        <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-900">
          {hotspot.product.name}
        </span>
        <span className="font-sans text-[10px] font-medium tracking-widest text-neutral-500">
          {hotspot.product.price}
        </span>
      </span>
    </motion.button>
  )
}
