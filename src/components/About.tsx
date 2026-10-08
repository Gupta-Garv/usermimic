import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

const ABOUT_PARAGRAPH =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

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

export const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const letters = ABOUT_PARAGRAPH.split('')
  const totalChars = letters.length

  return (
    <section id="about" className="bg-transparent py-16 sm:py-24 md:py-32 px-4 md:px-6 flex justify-center relative">
      {/* Inner Card */}
      <div className="bg-[#101010] rounded-2xl md:rounded-[2.5rem] w-full max-w-6xl py-14 sm:py-20 md:py-28 px-6 sm:px-10 md:px-16 text-center flex flex-col items-center">
        {/* Top small label */}
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium mb-6 sm:mb-8 block">
          Visual arts
        </span>

        {/* Multi-Style Main Heading */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <WordsPullUpMultiStyle
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] text-[#E1E0CC] font-normal"
            segments={[
              {
                text: 'I am Marcus Chen,',
                className: 'font-normal text-[#E1E0CC]',
              },
              {
                text: 'a self-taught director.',
                className: 'italic font-serif text-[#E1E0CC]',
              },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
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
      </div>
    </section>
  )
}
