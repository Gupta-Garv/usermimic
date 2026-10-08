import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Download, Terminal, Video, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

interface Scenario {
  id: string
  title: string
  persona: string
  model: string
  targetUrl: string
  logs: {
    time: string
    type: 'info' | 'ocr' | 'cognition' | 'error' | 'artifact'
    message: string
  }[]
  bugSummary: string
  artifactName: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'checkout-bug',
    title: 'Checkout 422: Promo Field Obscured',
    persona: 'Maya (Mobile 3G)',
    model: 'Claude 3.5 Sonnet Computer-Use',
    targetUrl: 'https://app.storefront.internal/checkout',
    bugSummary: 'Floating sticky cookie banner obscured promo input by 48px; agent detected tap failure, triggered unhandled 422.',
    artifactName: 'artifacts/bug-422-checkout.webm',
    logs: [
      { time: '00:01.04', type: 'info', message: 'Navigated to https://app.storefront.internal/checkout' },
      { time: '00:01.42', type: 'ocr', message: 'Visual OCR: Promo input obscured by floating sticky cookie banner (#cookie-overlay)' },
      { time: '00:01.89', type: 'cognition', message: 'Applied cognitive recovery: simulated human hesitation, dismissed banner, clicked #btn-apply' },
      { time: '00:02.15', type: 'error', message: 'Caught unhandled 422: Promo expired error toast missing in DOM after tap retry' },
      { time: '00:02.40', type: 'artifact', message: 'Generated regression repro: artifacts/bug-422-checkout.webm' },
      { time: '00:02.60', type: 'info', message: 'Exported verified Playwright test: spec/generated/repro_checkout_422.spec.ts' },
    ],
  },
  {
    id: 'race-condition',
    title: 'Multi-Tab State Race Condition',
    persona: 'Alex (Chaos Explorer)',
    model: 'Claude 3.5 Sonnet Computer-Use',
    targetUrl: 'https://app.storefront.internal/dashboard/orders',
    bugSummary: 'Simultaneous back-navigation during pending order mutation caused client-side stale Zustand state desync.',
    artifactName: 'artifacts/bug-race-condition.webm',
    logs: [
      { time: '00:00.82', type: 'info', message: 'Spawned dual browser workers across parallel tabs' },
      { time: '00:01.12', type: 'cognition', message: 'Submitted order cancellation while spamming browser History Back' },
      { time: '00:01.78', type: 'error', message: 'State desync: UI rendered "Order Active" while server returned 200 "Order Cancelled"' },
      { time: '00:02.05', type: 'ocr', message: 'Visual diff: Screen flash detected at coordinate (x: 520, y: 310)' },
      { time: '00:02.45', type: 'artifact', message: 'Generated regression repro: artifacts/bug-race-condition.webm' },
    ],
  },
  {
    id: 'virtual-table-lock',
    title: 'Virtual Table Thread Lock on 10k Rows',
    persona: 'Jordan (Heavy Admin)',
    model: 'Claude 3.5 Sonnet Computer-Use',
    targetUrl: 'https://app.storefront.internal/admin/inventory',
    bugSummary: 'Virtual table scroll wheel spike caused 1,400ms main thread jank, dropping subsequent batch action clicks.',
    artifactName: 'artifacts/bug-table-jank.webm',
    logs: [
      { time: '00:01.00', type: 'info', message: 'Loaded 10,000 inventory SKU rows with 32 columns' },
      { time: '00:01.65', type: 'cognition', message: 'Executed hyper-velocity trackpad scroll while applying multi-column filter' },
      { time: '00:02.30', type: 'error', message: 'Main thread blocked for 1,420ms: React virtualizer DOM re-render storm' },
      { time: '00:02.85', type: 'artifact', message: 'Generated performance flamegraph: artifacts/perf-inventory-jank.json' },
    ],
  },
]

export const SimulatorPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0])
  const [visibleLogCount, setVisibleLogCount] = useState<number>(SCENARIOS[0].logs.length)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  // Stream logs one by one on re-run
  const rerunScenario = () => {
    setIsStreaming(true)
    setVisibleLogCount(1)
  }

  useEffect(() => {
    if (!isStreaming) return
    if (visibleLogCount < selectedScenario.logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogCount((prev) => prev + 1)
      }, 450)
      return () => clearTimeout(timer)
    } else {
      setIsStreaming(false)
    }
  }, [isStreaming, visibleLogCount, selectedScenario])

  return (
    <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
          Interactive Live Telemetry
        </span>
        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] font-normal mb-4"
          segments={[
            { text: 'Autonomous Agent', className: 'font-normal text-[#E1E0CC]' },
            { text: 'Live Telemetry.', className: 'italic font-serif text-[#E1E0CC] mx-2' },
          ]}
        />
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Watch UserMimic explore real-world production journeys. Real-time cognitive traces, visual perception logs, and automatic reproduction artifacts.
        </p>
      </div>

      {/* Scenario Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {SCENARIOS.map((scenario) => {
          const isActive = selectedScenario.id === scenario.id
          return (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario)
                setVisibleLogCount(scenario.logs.length)
                setIsStreaming(false)
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? 'bg-primary text-black border-primary shadow-lg'
                  : 'bg-[#121215] text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {scenario.title}
            </button>
          )
        })}
      </div>

      {/* Main Terminal Shell */}
      <div className="bg-[#0b0b0e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Terminal Window Header */}
        <div className="bg-[#121217] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-gray-300 ml-2">
              usermimic-agent-daemon // live-session #7842
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-gray-500 hidden sm:inline">Target: {selectedScenario.targetUrl}</span>
            <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 space-y-3 font-mono text-xs sm:text-sm min-h-[280px] bg-[#07070a]">
          {selectedScenario.logs.slice(0, visibleLogCount).map((log, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 leading-relaxed"
              >
                <span className="text-gray-500 select-none shrink-0">[{log.time}]</span>

                {log.type === 'info' && <span className="text-gray-400">{log.message}</span>}
                {log.type === 'ocr' && <span className="text-sky-400">{log.message}</span>}
                {log.type === 'cognition' && <span className="text-emerald-400">{log.message}</span>}
                {log.type === 'error' && (
                  <span className="text-rose-400 font-semibold bg-rose-950/20 px-2 py-0.5 rounded border border-rose-500/20">
                    {log.message}
                  </span>
                )}
                {log.type === 'artifact' && (
                  <span className="text-primary font-semibold flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    {log.message}
                  </span>
                )}
              </motion.div>
            )
          })}

          {isStreaming && (
            <div className="text-gray-600 animate-pulse flex items-center gap-2 pt-2">
              <span>Agent observing frame buffer &amp; optical OCR...</span>
            </div>
          )}
        </div>

        {/* Terminal Footer Controls & Summary */}
        <div className="bg-[#101014] p-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">Persona:</span>
            <span className="font-semibold text-primary">{selectedScenario.persona}</span>
            <span className="text-gray-600">//</span>
            <span className="text-gray-400">Model:</span>
            <span className="text-gray-300 font-mono">{selectedScenario.model}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={rerunScenario}
              disabled={isStreaming}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-[#E1E0CC] text-xs font-semibold px-4 py-2 rounded-full border border-white/10 transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isStreaming ? 'animate-spin' : ''}`} />
              <span>Re-run Scenario</span>
            </button>

            <button
              onClick={() => alert(`Simulated download of ${selectedScenario.artifactName}`)}
              className="inline-flex items-center gap-2 bg-primary text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export WebM Repro</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
