'use client'

import { motion } from 'framer-motion'

export default function TreeShadow() {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden gpu-layer">
      {/* ── LAYER 1: LIGHT, SOFT DAPPLED TREE LEAF SHADOWS (Swaying over Stone Facade) ── */}
      <motion.div
        className="absolute -inset-16 opacity-22 mix-blend-multiply gpu-layer"
        animate={{
          x: [-15, 18, -10, 14, -15],
          y: [-10, 14, -15, 10, -10],
          rotate: [-1.2, 1.8, -1, 1.4, -1.2],
          scale: [1, 1.03, 0.99, 1.02, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(24px)',
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="rgba(70, 56, 42, 0.55)"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Top-Left Main Tree Branch & Leaves */}
          <path d="M-50,-50 C150,80 280,40 380,-20 C280,120 450,180 520,60 C420,220 310,260 210,180 C260,300 160,380 40,310 C120,450 -10,480 -80,410 Z" />
          {/* Top-Right Hanging Leaf Cluster */}
          <path d="M1050,-30 C850,110 720,90 620,20 C750,160 580,240 500,140 C610,290 720,320 830,220 C750,380 890,440 980,360 C900,490 1030,520 1080,440 Z" />
          {/* Subtle Dappled Sun Spots Leaves */}
          <circle cx="180" cy="220" r="48" />
          <circle cx="260" cy="170" r="64" />
          <circle cx="340" cy="290" r="54" />
          <circle cx="780" cy="180" r="58" />
          <circle cx="680" cy="260" r="68" />
        </svg>
      </motion.div>

      {/* ── LAYER 2: SOFT AMBIENT CANOPY SHADOW (Gentle Light Shade) ── */}
      <motion.div
        className="absolute -inset-24 opacity-18 mix-blend-multiply gpu-layer"
        animate={{
          x: [18, -15, 12, -18, 18],
          y: [12, -10, 16, -12, 12],
          rotate: [1.5, -1, 1.2, -1.4, 1.5],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          filter: 'blur(36px)',
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="rgba(60, 48, 36, 0.45)"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Soft Broad Canopy Shadows */}
          <path d="M-100,-100 Q400,200 200,600 Q-100,400 -100,-100 Z" />
          <path d="M1100,-100 Q600,300 800,700 Q1100,500 1100,-100 Z" />
        </svg>
      </motion.div>
    </div>
  )
}
