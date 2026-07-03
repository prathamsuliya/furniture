'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Hotspot } from '@/types'

interface ProductCardProps {
  hotspot: Hotspot | null
  onClose: () => void
}

export default function ProductCard({ hotspot, onClose }: ProductCardProps) {
  // Support ESC key to close drawer modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hotspot) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hotspot, onClose])

  return (
    <AnimatePresence>
      {hotspot && (
        <>
          {/* Backdrop Scrim with Blur */}
          <motion.div
            key="product-scrim"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* Miu Miu Style Luxury Side Drawer Modal */}
          <motion.aside
            key={`drawer-${hotspot.id}`}
            role="dialog"
            aria-modal="true"
            aria-label={`Product showcase: ${hotspot.product.name}`}
            className="fixed z-50 top-0 right-0 bottom-0 w-full max-w-[460px] bg-white/95 text-neutral-900 border-l border-black/10 shadow-[0_0_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Top Bar with Close button */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-black/5">
              <span className="font-sans text-[11px] font-bold tracking-[0.35em] uppercase text-neutral-800">
                {hotspot.product.category}
              </span>

              <motion.button
                id={`close-drawer-${hotspot.product.id}`}
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* Main Product Content */}
            <div className="flex-1 px-8 py-6 flex flex-col gap-6 overflow-y-auto">
              {/* Image Frame */}
              <div className="relative w-full h-[260px] rounded-sm overflow-hidden bg-neutral-100 border border-black/5 shadow-inner">
                <Image
                  src={hotspot.product.image}
                  alt={hotspot.product.name}
                  fill
                  className="object-cover object-center"
                  sizes="460px"
                  priority
                />
              </div>

              {/* Title & Price Header */}
              <div>
                <p className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-1">
                  COLLECTION 2026
                </p>
                <h2
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#14100C',
                    lineHeight: 1.15,
                  }}
                >
                  {hotspot.product.name}
                </h2>
                <p className="font-sans text-lg font-semibold tracking-wide text-neutral-800 mt-2">
                  {hotspot.product.price}
                </p>
              </div>

              {/* Description */}
              <p className="font-sans text-xs leading-relaxed tracking-wide text-neutral-600">
                {hotspot.product.description}
              </p>

              {/* Miu Miu Style Craftsmanship Details */}
              <div className="py-4 border-t border-b border-black/10 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] tracking-widest uppercase">
                  <span className="text-neutral-500 font-medium">ORIGIN</span>
                  <span className="text-neutral-900 font-semibold">HANDCRAFTED IN MILAN</span>
                </div>
                <div className="flex items-center justify-between text-[11px] tracking-widest uppercase">
                  <span className="text-neutral-500 font-medium">MATERIAL</span>
                  <span className="text-neutral-900 font-semibold">SUSTAINABLE ORGANIC</span>
                </div>
                <div className="flex items-center justify-between text-[11px] tracking-widest uppercase">
                  <span className="text-neutral-500 font-medium">AVAILABILITY</span>
                  <span className="text-neutral-900 font-semibold">MADE TO ORDER</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-8 border-t border-black/10 bg-neutral-50/80 flex flex-col gap-3">
              <motion.button
                id={`enquire-btn-${hotspot.product.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#14100C] hover:bg-neutral-800 text-white rounded-sm font-sans text-xs font-semibold tracking-[0.25em] uppercase shadow-lg transition-colors cursor-pointer focus:outline-none"
              >
                Request Sample / Enquire
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-transparent hover:bg-black/5 text-neutral-800 rounded-sm font-sans text-xs font-semibold tracking-[0.2em] uppercase border border-black/20 transition-colors cursor-pointer focus:outline-none"
              >
                Add to Collection
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
