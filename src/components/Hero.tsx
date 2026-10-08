import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { WordsPullUp } from './WordsPullUp'

interface HeroProps {
  onStartSimulation: () => void
  onExplorePersonas: () => void
}

export const Hero: React.FC<HeroProps> = ({
  onStartSimulation,
  onExplorePersonas,
}) => {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black relative">
      {/* Inset Container with Rounded Frame */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />

        {/* Top Floating Trust Badge */}
        <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[11px] sm:text-xs text-[#E1E0CC]/90 shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="font-medium">Autonomous Vision Simulation</span>
            <span className="text-gray-500 font-mono">//</span>
            <span className="text-gray-400">2.4M journeys verified</span>
          </motion.div>
        </div>

        {/* Hero Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Left 8 columns: Giant Heading */}
            <div className="lg:col-span-8 flex flex-col justify-end">
              <h1 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14.5vw] xl:text-[13.8vw] font-medium leading-[0.84] tracking-[-0.07em] text-[#E1E0CC] select-none m-0">
                <WordsPullUp text="UserMimic" showAsterisk={true} />
              </h1>
            </div>

            {/* Right 4 columns: Description Paragraph + CTAs */}
            <div className="lg:col-span-4 flex flex-col items-start justify-end pb-2 sm:pb-4 lg:pb-6 space-y-4 sm:space-y-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/80 text-xs sm:text-sm md:text-base leading-[1.3] max-w-md font-normal"
              >
                Multimodal vision agents that simulate chaotic real-world human journeys, stress-test complex workflows, and eliminate brittle test scripts before production regressions reach customers.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={onStartSimulation}
                  className="group inline-flex items-center gap-2 hover:gap-3 bg-primary text-black font-semibold text-sm sm:text-base pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-xl hover:shadow-primary/20"
                >
                  <span>Deploy Simulation</span>
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
                  </span>
                </button>

                <button
                  onClick={onExplorePersonas}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:text-primary px-4 py-2 rounded-full border border-white/10 hover:border-white/25 bg-black/40 backdrop-blur-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Explore Personas</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
