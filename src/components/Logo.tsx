import React from 'react'
import { motion } from 'framer-motion'

export const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 34,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Recreated Monogram Reticle Mark without background */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Viewfinder Corner Brackets */}
          <path
            d="M 16 34 V 18 H 34"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 66 18 H 84 V 34"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 84 66 V 82 H 66"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 34 82 H 16 V 66"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Reticle Ticks Left */}
          <line x1="16" y1="42" x2="18" y2="42" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />
          <line x1="10" y1="50" x2="18" y2="50" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />
          <line x1="16" y1="58" x2="18" y2="58" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />

          {/* Reticle Ticks Right */}
          <line x1="82" y1="42" x2="84" y2="42" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />
          <line x1="82" y1="50" x2="90" y2="50" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />
          <line x1="82" y1="58" x2="84" y2="58" stroke="#E1E0CC" strokeWidth="3.2" strokeLinecap="square" />

          {/* Left Column Stem: (28, 28) down to (28, 70) -> (38, 70) -> up to (38, 28) */}
          <path
            d="M 28 28 V 70 H 38 V 28"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Outer Diagonal V: from (28, 28) down to (50, 60) -> up to (63.5, 42) */}
          <path
            d="M 28 28 L 50 60 L 63.5 42"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Inner Chevron V: from (38, 28) down to (50, 48) -> up to (63.5, 28) */}
          <path
            d="M 38 28 L 50 48 L 63.5 28"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Top-Right Vertical to dot */}
          <path
            d="M 63.5 28 V 37"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* Diagonal from right peak to dot */}
          <path
            d="M 72.5 28 L 64.5 41"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
          />

          {/* Right Column Stem: (72.5, 28) down to (72.5, 70) -> (63.5, 70) -> up to (63.5, 47) */}
          <path
            d="M 72.5 28 V 70 H 63.5 V 47"
            stroke="#E1E0CC"
            strokeWidth="3.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Amber Focal Sensor Pupil Dot */}
          <motion.circle
            cx="63.5"
            cy="42.5"
            r="4.2"
            fill="#D89C56"
            animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
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
