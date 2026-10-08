import React from 'react'
import { motion } from 'framer-motion'

export const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 36,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Animated Reticle Aperture Emblem */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-[#0a0a0d] border border-white/10 shadow-lg overflow-hidden group-hover:border-primary/40 transition-colors"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3d6bff]/20 via-transparent to-primary/20 opacity-60 group-hover:opacity-100 transition-opacity" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Rotating Outer Reticle */}
          <motion.circle
            cx="18"
            cy="18"
            r="14"
            stroke="rgba(222, 219, 200, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '18px', originY: '18px' }}
          />

          {/* Precision Corner Optics */}
          <path
            d="M8 12V8H12M24 8H28V12M28 24V28H24M12 28H8V24"
            stroke="#DEDBC8"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />

          {/* Central Vision Sensor Pupil */}
          <motion.circle
            cx="18"
            cy="18"
            r="4.5"
            fill="#DEDBC8"
            animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Inner Laser Pupil Dot */}
          <circle cx="18" cy="18" r="1.8" fill="#000" />
        </svg>
      </div>

      {/* Brand Wordmark with Live Simulation Tag */}
      <div className="flex flex-col text-left leading-none">
        <span className="text-base sm:text-lg font-bold tracking-tight text-[#E1E0CC] group-hover:text-primary transition-colors flex items-center gap-1">
          UserMimic
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </span>
        <span className="text-[9px] uppercase tracking-[0.16em] text-gray-500 font-mono mt-0.5">
          Vision QA Engine
        </span>
      </div>
    </div>
  )
}
