import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  onLaunchSimulation?: (url: string, persona: string) => void
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onLaunchSimulation,
}) => {
  const [appUrl, setAppUrl] = useState('')
  const [persona, setPersona] = useState('maya')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!appUrl) return
    setSubmitted(true)
    setTimeout(() => {
      onLaunchSimulation?.(appUrl, persona)
      setSubmitted(false)
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#E1E0CC]">Launch Autonomous QA Console</h3>
                  <p className="text-xs text-gray-400">Deploy a real multimodal agent onto your web application</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-lg font-bold text-[#E1E0CC]">Simulation Initialized</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  Routing autonomous agents to {appUrl}. Redirecting you to the live telemetry stream...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Target Application URL (Staging / Production)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://app.yourproduct.com"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    className="w-full bg-[#07070a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/50 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Select Autonomous Persona
                  </label>
                  <select
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="w-full bg-[#07070a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/50"
                  >
                    <option value="maya">Maya — Mobile 3G Impatient Shopper</option>
                    <option value="alex">Alex — Chaotic Edge-Case Explorer</option>
                    <option value="jordan">Jordan — Enterprise Heavy Admin (10k Rows)</option>
                    <option value="kai">Kai — A11y &amp; Localization Auditor</option>
                  </select>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-gray-400 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Zero code injection or SDK installation required. UserMimic connects via headless visual viewport and executes tests purely through pixel perception.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <span>Deploy Agent Swarm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
