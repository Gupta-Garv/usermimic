import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Webhook,
  Sparkles,
} from 'lucide-react'

interface DocsModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'action' | 'sdk' | 'api' | 'webhooks'

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('action')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-5xl bg-[#0b0b0e] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-[#E1E0CC]">
                      UserMimic Developer Documentation
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      v2.4.0-beta
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#76B900]/15 text-[#76B900] border border-[#76B900]/30">
                      NVIDIA TensorRT
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Autonomous spatial vision agents, CI/CD runners, and client SDK references.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close Documentation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 pt-4 border-b border-white/5 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('action')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  activeTab === 'action'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>GitHub Action v1.2</span>
              </button>

              <button
                onClick={() => setActiveTab('sdk')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  activeTab === 'sdk'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>TypeScript / Python SDK</span>
              </button>

              <button
                onClick={() => setActiveTab('api')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  activeTab === 'api'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>REST API Reference</span>
              </button>

              <button
                onClick={() => setActiveTab('webhooks')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  activeTab === 'webhooks'
                    ? 'bg-primary text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Webhook className="w-3.5 h-3.5" />
                <span>Webhooks &amp; Events</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto pr-2 my-4 space-y-6 text-xs sm:text-sm text-gray-300">
              {/* TAB 1: GITHUB ACTION */}
              {activeTab === 'action' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#76B900]/10 via-[#0e0e12] to-black border border-[#76B900]/25 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#76B900] uppercase font-bold tracking-wider">
                        Official Open Source Runner
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#E1E0CC] mt-0.5">
                        Gupta-Garv/usermimic-action@v1
                      </h4>
                      <p className="text-xs text-gray-400">
                        Zero DOM selectors. Runs vision QA on pull requests with synthetic human personas.
                      </p>
                    </div>
                    <a
                      href="https://github.com/Gupta-Garv/usermimic-action"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E1E0CC] border border-white/10 transition-colors shrink-0"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span>.github/workflows/usermimic.yml</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `name: UserMimic Visual Regression
on: [pull_request, push]

jobs:
  visual-qa:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run UserMimic Autonomous Swarm
        uses: Gupta-Garv/usermimic-action@v1
        with:
          api-key: \${{ secrets.USERMIMIC_API_KEY }}
          project-id: 'proj_ecommerce_prod'
          base-url: 'https://staging.yourdomain.com'
          personas: 'rage-clicker, elderly-shopper, screen-reader'
          chaos-level: 'moderate'
          fail-on-regression: true`,
                            'action-yaml'
                          )
                        }
                        className="flex items-center gap-1 hover:text-white"
                      >
                        {copiedKey === 'action-yaml' ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedKey === 'action-yaml' ? 'Copied' : 'Copy YAML'}</span>
                      </button>
                    </div>

                    <pre className="p-4 bg-[#050508] border border-white/10 rounded-2xl font-mono text-[11px] sm:text-xs text-[#E1E0CC] overflow-x-auto leading-relaxed">
{`name: UserMimic Visual Regression
on: [pull_request, push]

jobs:
  visual-qa:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run UserMimic Autonomous Swarm
        uses: Gupta-Garv/usermimic-action@v1
        with:
          api-key: \${{ secrets.USERMIMIC_API_KEY }}
          project-id: 'proj_ecommerce_prod'
          base-url: 'https://staging.yourdomain.com'
          personas: 'rage-clicker, elderly-shopper, screen-reader'
          chaos-level: 'moderate'
          fail-on-regression: true`}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 2: CLIENT SDK */}
              {activeTab === 'sdk' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold text-[#E1E0CC] text-sm mb-2">
                      1. Installation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 bg-[#050508] border border-white/10 rounded-xl flex items-center justify-between">
                        <span className="text-gray-300">npm install @usermimic/sdk</span>
                        <button
                          onClick={() => copyToClipboard('npm install @usermimic/sdk', 'npm')}
                          className="hover:text-white text-gray-500"
                        >
                          {copiedKey === 'npm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="p-3 bg-[#050508] border border-white/10 rounded-xl flex items-center justify-between">
                        <span className="text-gray-300">pip install usermimic</span>
                        <button
                          onClick={() => copyToClipboard('pip install usermimic', 'pip')}
                          className="hover:text-white text-gray-500"
                        >
                          {copiedKey === 'pip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#E1E0CC] text-sm mb-2">
                      2. TypeScript Usage Example
                    </h4>
                    <pre className="p-4 bg-[#050508] border border-white/10 rounded-2xl font-mono text-[11px] sm:text-xs text-[#E1E0CC] overflow-x-auto leading-relaxed">
{`import { UserMimicClient, Persona } from '@usermimic/sdk'

const client = new UserMimicClient({
  apiKey: process.env.USERMIMIC_API_KEY,
  environment: 'production', // H100 Accelerated Cloud
})

// Trigger an autonomous synthetic journey
const session = await client.simulations.run({
  targetUrl: 'https://app.acme.com/checkout',
  personas: [
    Persona.FickleBuyer({ hesitationMs: 1400, couponHunting: true }),
    Persona.SeniorCitizen({ zoomLevel: 1.5, typoProbability: 0.12 }),
  ],
  tolerances: {
    maxFlakinessPercent: 1.0,
    allowAutoSelfHeal: true,
  },
})

console.log(\`[UserMimic] Session launched: \${session.id}\`)
const results = await session.waitForCompletion()
console.log(\`Result: \${results.verdict} (Self-healed: \${results.selfHealedSteps})\`)`}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 3: REST API */}
              {activeTab === 'api' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl font-mono text-xs flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      POST
                    </span>
                    <span className="text-[#E1E0CC]">https://api.usermimic.tech/v1/simulations/run</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-gray-400">Request Headers</span>
                    <pre className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-xs text-gray-300">
{`Authorization: Bearer um_live_948f21a7c09d3b
Content-Type: application/json
X-UserMimic-Cluster: nvidia-h100-apac-bom`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-gray-400">Request JSON Body</span>
                    <pre className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-xs text-gray-300">
{`{
  "project_id": "proj_9481",
  "base_url": "https://staging.company.com",
  "personas": ["rage_clicker", "slow_reader"],
  "chaos_budget": 0.65,
  "zero_retention_mode": true
}`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400">Response (200 OK)</span>
                    <pre className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-xs text-emerald-300">
{`{
  "simulation_id": "sim_7f9a8e10c2",
  "status": "queued",
  "allocated_nodes": 4,
  "accelerator": "NVIDIA H100 TensorRT",
  "estimated_latency_ms": 42
}`}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 4: WEBHOOKS */}
              {activeTab === 'webhooks' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-300">
                    UserMimic sends real-time HTTP POST webhooks when an autonomous simulation begins, encounters an anomalous interaction cliff, or finishes generating regression artifacts.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-xs">
                      <span className="text-primary font-bold block">simulation.completed</span>
                      <span className="text-gray-400 text-[11px]">Dispatched when all persona iterations finish.</span>
                    </div>

                    <div className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-xs">
                      <span className="text-red-400 font-bold block">regression.visual_drift</span>
                      <span className="text-gray-400 text-[11px]">Fired when optical spatial attention detects layout breakage.</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-gray-400">HMAC-SHA256 Signature Verification</span>
                    <pre className="p-3 bg-[#050508] border border-white/10 rounded-xl font-mono text-[11px] text-gray-300">
{`const crypto = require('crypto')

function verifyWebhook(payload, signatureHeader, secret) {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(digest))
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-300">API Gateway: 99.98% Uptime</span>
                <span className="text-gray-600">//</span>
                <span className="text-gray-400">Edge: bom1 (Bengaluru)</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Gupta-Garv/usermimic-action"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-[#E1E0CC] font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <button
                  onClick={onClose}
                  className="bg-primary text-black font-semibold px-5 py-2 rounded-full hover:bg-white transition-all shadow-md"
                >
                  Close Docs
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
