import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  delay?: number
  showAsterisk?: boolean
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  delay = 0,
  showAsterisk = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap items-baseline ${className}`}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1

        return (
          <span
            key={i}
            className={`inline-block mr-[0.25em] last:mr-0 ${
              showAsterisk && isLastWord ? 'relative pr-[0.35em]' : 'overflow-hidden'
            }`}
          >
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {showAsterisk && isLastWord && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-medium leading-none select-none pointer-events-none text-[#E1E0CC]">
                  *
                </span>
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
