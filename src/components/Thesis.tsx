import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { Eye, ShieldCheck, Zap } from 'lucide-react'

const THESIS_PARAGRAPH =
  'Over the last decade, software teams have surrendered up to 30% of their sprint velocity to flaky Cypress and Playwright selectors. Every CSS refactor or auto-generated class breaks brittle assertion scripts, while real visual bugs like overlapping cookie banners, trapped inputs, and 3G checkout drops slip undetected into production. UserMimic eliminates selector debt entirely by perceiving your web application through spatial multimodal vision.'

interface AnimatedLetterProps {
  char: string
  progress: MotionValue<number>
  index: number
  totalChars: number
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  char,
  progress,
  index,
  totalChars,
}) => {
  const charProgress = index / totalChars
  const start = Math.max(0, charProgress - 0.1)
  const end = Math.min(1, charProgress + 0.05)
  const safeEnd = end <= start ? start + 0.01 : end
  const opacity = useTransform(progress, [start, safeEnd], [0.2, 1])

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

export const Thesis: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const letters = THESIS_PARAGRAPH.split('')
  const totalChars = letters.length

  return (
    <section id="thesis" className="bg-transparent py-16 sm:py-24 md:py-32 px-4 md:px-6 flex justify-center relative z-10">
      {/* Inner #101010 Card */}
      <div className="bg-[#101010] border border-white/5 rounded-2xl md:rounded-[2.5rem] w-full max-w-6xl py-14 sm:py-20 md:py-28 px-6 sm:px-10 md:px-16 text-center flex flex-col items-center shadow-2xl">
        {/* Top small label */}
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-6 sm:mb-8 block">
          The QA Paradigm Shift
        </span>

        {/* Multi-Style Main Heading */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <WordsPullUpMultiStyle
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] sm:leading-[0.92] text-[#E1E0CC] font-normal"
            segments={[
              {
                text: 'Traditional test scripts pass,',
                className: 'font-normal text-[#E1E0CC]',
              },
              {
                text: 'while real customers fail.',
                className: 'italic font-serif text-[#E1E0CC] mx-1',
              },
              {
                text: 'UserMimic perceives your web applications with human visual cognition.',
                className: 'font-normal text-[#E1E0CC]',
              },
            ]}
          />
        </div>

        {/* Scroll-Linked Progressive Character Opacity Paragraph */}
        <p
          ref={paragraphRef}
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {letters.map((char, index) => (
            <AnimatedLetter
              key={index}
              char={char}
              progress={scrollYProgress}
              index={index}
              totalChars={totalChars}
            />
          ))}
        </p>

        {/* Supporting Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-18 pt-10 border-t border-white/10 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <Eye className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">0px</span>
            <span className="text-xs text-gray-400 mt-1">Selector &amp; XPath Reliance</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">120ms</span>
            <span className="text-xs text-gray-400 mt-1">Vision Perception Reaction</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">100%</span>
            <span className="text-xs text-gray-400 mt-1">Self-Healing Spec Export</span>
          </div>
        </div>
      </div>
    </section>
  )
}
