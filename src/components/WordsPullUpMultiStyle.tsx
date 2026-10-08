import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface StyleSegment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: StyleSegment[]
  className?: string
  delay?: number
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  // Break segments down into individual words preserving their specific styles
  const allWords: { word: string; className: string }[] = []
  segments.forEach((seg) => {
    const words = seg.text.split(' ').filter(Boolean)
    words.forEach((w) => {
      allWords.push({ word: w, className: seg.className || '' })
    })
  })

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center items-baseline ${className}`}
    >
      {allWords.map((item, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.28em] last:mr-0 mb-[0.1em]"
        >
          <motion.span
            className={`inline-block ${item.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
