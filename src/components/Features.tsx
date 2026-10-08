import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

export const Features: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isGridInView = useInView(gridRef, { once: true, margin: '-100px' })

  return (
    <section id="features" className="min-h-screen bg-transparent relative py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Subtle .bg-noise overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Text */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto flex flex-col items-center gap-2 sm:gap-3">
          <WordsPullUpMultiStyle
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-[#E1E0CC]"
            segments={[
              {
                text: 'Studio-grade workflows for visionary creators.',
                className: 'text-[#E1E0CC]',
              },
            ]}
          />
          <WordsPullUpMultiStyle
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500"
            delay={0.25}
            segments={[
              {
                text: 'Built for pure vision. Powered by art.',
                className: 'text-gray-500',
              },
            ]}
          />
        </div>

        {/* 4-Column Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
        >
          {/* Card 1 - Video Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isGridInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[360px] lg:min-h-0 lg:h-[480px] bg-black group"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            {/* Gradient Overlay for bottom text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h3 className="text-[#E1E0CC] font-medium text-lg sm:text-xl md:text-2xl tracking-tight m-0">
                Your creative canvas.
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Project Storyboard (01) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isGridInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[380px] lg:min-h-0 lg:h-[480px]"
          >
            <div>
              {/* Top Icon */}
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt="Project Storyboard Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mb-6"
                loading="lazy"
              />

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                  Project Storyboard.
                </h3>
                <span className="text-xs sm:text-sm text-gray-400 font-mono">
                  (01)
                </span>
              </div>

              {/* 4 Checklist Items */}
              <div className="space-y-3">
                <ChecklistItem text="Scene-by-scene visual narrative breakdown" />
                <ChecklistItem text="Automated pacing & dynamic rhythm metrics" />
                <ChecklistItem text="Dynamic mood-board asset synchronization" />
                <ChecklistItem text="Director camera angle & framing cues" />
              </div>
            </div>

            {/* Learn More Link */}
            <a
              href="#learn-more"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:text-primary transition-colors mt-6 pt-4 border-t border-white/5"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Card 3 - Smart Critiques (02) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isGridInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[380px] lg:min-h-0 lg:h-[480px]"
          >
            <div>
              {/* Top Icon */}
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt="Smart Critiques Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mb-6"
                loading="lazy"
              />

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                  Smart Critiques.
                </h3>
                <span className="text-xs sm:text-sm text-gray-400 font-mono">
                  (02)
                </span>
              </div>

              {/* 3 Checklist Items */}
              <div className="space-y-3">
                <ChecklistItem text="Multimodal AI compositional & lighting analysis" />
                <ChecklistItem text="Automated creative notes & editorial polish" />
                <ChecklistItem text="Seamless NLE & post-production tool integrations" />
              </div>
            </div>

            {/* Learn More Link */}
            <a
              href="#learn-more"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:text-primary transition-colors mt-6 pt-4 border-t border-white/5"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Card 4 - Immersion Capsule (03) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isGridInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[380px] lg:min-h-0 lg:h-[480px]"
          >
            <div>
              {/* Top Icon */}
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt="Immersion Capsule Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mb-6"
                loading="lazy"
              />

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                  Immersion Capsule.
                </h3>
                <span className="text-xs sm:text-sm text-gray-400 font-mono">
                  (03)
                </span>
              </div>

              {/* 3 Checklist Items */}
              <div className="space-y-3">
                <ChecklistItem text="Deep focus mode with notification silencing" />
                <ChecklistItem text="Curated ambient soundscapes & binaural audio" />
                <ChecklistItem text="Automated schedule syncing & session recovery" />
              </div>
            </div>

            {/* Learn More Link */}
            <a
              href="#learn-more"
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:text-primary transition-colors mt-6 pt-4 border-t border-white/5"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <span className="text-gray-400 text-xs sm:text-sm leading-snug">{text}</span>
    </div>
  )
}
