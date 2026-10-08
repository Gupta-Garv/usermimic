import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Bug, Briefcase, Accessibility, Play, ArrowRight, Gauge, Activity, ShieldAlert } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

interface Persona {
  id: string
  name: string
  tagline: string
  icon: React.ReactNode
  color: string
  metric: string
  metricLabel: string
  traits: string[]
  description: string
  liveLog: string
}

const PERSONAS: Persona[] = [
  {
    id: 'maya',
    name: 'Maya',
    tagline: 'The Impatient Mobile Shopper',
    icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
    color: '#34d399',
    metric: '420ms',
    metricLabel: 'Packet Latency Throttling',
    traits: [
      'Intermittent 3G & packet drop emulation',
      'Rapid rage-tapping on unresponsive sticky buttons',
      'Instant abandonment on checkout layout shifts',
    ],
    description:
      'Simulates high-velocity e-commerce mobile sessions. Catches trapped modals, unclickable touch targets, and slow checkout API spinners.',
    liveLog: '[00:01.42] Maya (Mobile 3G): Detected promo input obscured by floating sticky banner. Triggered rage-tap loop.',
  },
  {
    id: 'alex',
    name: 'Alex',
    tagline: 'The Chaotic Edge-Case Explorer',
    icon: <Bug className="w-5 h-5 text-purple-400" />,
    color: '#c084fc',
    metric: '98.4%',
    metricLabel: 'Unscripted Boundary Discovery',
    traits: [
      'Multi-tab race conditions & rapid back-clicks',
      'Emoji payloads & 10,000-character boundary strings',
      'Exploits modal z-index overlap glitches',
    ],
    description:
      'Pushes your app to extremes no human QA engineer would script. Intentionally double-submits forms, spam-clicks filters, and exhausts state stores.',
    liveLog: '[00:02.15] Alex (Chaos): Caught unhandled 422: Promo expired error toast missing in DOM after double-click.',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    tagline: 'The Enterprise Heavy Admin',
    icon: <Briefcase className="w-5 h-5 text-amber-400" />,
    color: '#fbbf24',
    metric: '10K',
    metricLabel: 'Rows Stress-Tested Simultaneously',
    traits: [
      '10,000-row bulk uploads & virtual table scrolls',
      'Keyboard shortcuts & command-palette stress loops',
      'Cross-organization RBAC permission barrier checks',
    ],
    description:
      'Validates complex SaaS workflows, large dataset tables, filter pagination, and role-based permissions across deep nested settings.',
    liveLog: '[00:03.08] Jordan (Admin): Executed 2,500 row bulk export. Identified UI freeze: Table virtualizer DOM thread lock.',
  },
  {
    id: 'kai',
    name: 'Kai',
    tagline: 'The A11y & Localization Auditor',
    icon: <Accessibility className="w-5 h-5 text-sky-400" />,
    color: '#38bdf8',
    metric: '100%',
    metricLabel: 'Keyboard Focus-Trap Coverage',
    traits: [
      'Full keyboard focus-trap & Tab navigation audits',
      'German & Arabic RTL layout text overflow detection',
      'Contrast compliance & ARIA live region timing audits',
    ],
    description:
      'Ensures your application is universally accessible and localized. Detects truncated labels in foreign translations and broken screen-reader cues.',
    liveLog: '[00:04.22] Kai (A11y): Flagged critical issue: Checkout modal backdrop missing aria-hidden and keyboard trap.',
  },
]

export const PersonasPage: React.FC<{ onLaunchSimulator?: () => void }> = ({
  onLaunchSimulator,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0])
  const [chaosLevel, setChaosLevel] = useState(65)
  const [latencyMs, setLatencyMs] = useState(380)

  return (
    <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
          Synthetic User Intelligence
        </span>
        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] font-normal mb-4"
          segments={[
            { text: 'Synthetic Humans,', className: 'font-normal text-[#E1E0CC]' },
            { text: 'Real Friction.', className: 'italic font-serif text-[#E1E0CC] mx-2' },
          ]}
        />
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Stop writing static assertion scripts that pass while real customers fail. UserMimic deploys autonomous vision agents with realistic behaviors, network speeds, and chaotic human flaws.
        </p>
      </div>

      {/* 4 Persona Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {PERSONAS.map((persona, i) => {
          const isSelected = selectedPersona.id === persona.id
          return (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedPersona(persona)}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#18181c] border-primary/50 shadow-2xl shadow-primary/10 scale-[1.02]'
                  : 'bg-[#121214] border-white/10 hover:border-white/20 hover:bg-[#161619]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                    {persona.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Agent
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#E1E0CC] tracking-tight">{persona.name}</h3>
                <p className="text-xs text-primary/70 mb-4">{persona.tagline}</p>

                <div className="my-5 p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl font-bold font-mono text-[#E1E0CC]">{persona.metric}</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">{persona.metricLabel}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {persona.traits.map((trait, tIdx) => (
                    <li key={tIdx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-primary shrink-0 mt-0.5 font-bold">•</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="w-full text-xs font-semibold py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect {persona.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Friction Control Sandbox */}
      <div className="bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-primary font-semibold flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Live Agent Telemetry Sandbox
              </span>
              <h4 className="text-2xl font-semibold text-[#E1E0CC] mt-2">
                Simulating: {selectedPersona.name} ({selectedPersona.tagline})
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                Adjust friction variables below to see how UserMimic vision agents handle network latency degradation, race conditions, and UI obstacles in real time.
              </p>
            </div>

            {/* Slider 1: Network Latency */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">Artificial Latency Throttling</span>
                <span className="font-mono text-primary">{latencyMs} ms</span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={latencyMs}
                onChange={(e) => setLatencyMs(Number(e.target.value))}
                className="w-full accent-[#DEDBC8] bg-black/60 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>Fast 5G (50ms)</span>
                <span>Subway 3G (1200ms)</span>
              </div>
            </div>

            {/* Slider 2: Chaos Factor */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">Chaos Factor (Unpredictable Clicks)</span>
                <span className="font-mono text-primary">{chaosLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(Number(e.target.value))}
                className="w-full accent-[#DEDBC8] bg-black/60 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>Deterministic (0%)</span>
                <span>Hyper-Chaotic (100%)</span>
              </div>
            </div>

            {onLaunchSimulator && (
              <button
                onClick={onLaunchSimulator}
                className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Full Simulator Console</span>
              </button>
            )}
          </div>

          {/* Live Stream Terminal HUD */}
          <div className="lg:col-span-7 bg-[#070709] border border-white/10 rounded-2xl p-5 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-gray-400 ml-2">usermimic-agent // {selectedPersona.id}-worker</span>
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                <Activity className="w-3 h-3 animate-spin" /> STREAMING
              </span>
            </div>

            <div className="space-y-2.5 text-gray-300 min-h-[170px]">
              <p className="text-gray-500">
                [00:00.12] Initializing multimodal perception for viewport 390x844 (Mobile Retina)...
              </p>
              <p className="text-emerald-400">
                [00:00.45] Target app loaded. Optical OCR detected 14 interactive UI coordinates.
              </p>
              <p className="text-sky-400">
                [00:00.89] Injected environment latency: {latencyMs}ms. Chaos coefficient: {chaosLevel / 100}.
              </p>
              <p className="text-[#DEDBC8] bg-white/5 p-2 rounded border border-white/5">
                {selectedPersona.liveLog}
              </p>
              <p className="text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                [00:02.80] Spec Synthesizer: Generated regression spec artifacts/bug-checkout-{selectedPersona.id}.webm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
