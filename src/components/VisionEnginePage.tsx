import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Code2, Eye, ShieldCheck, RefreshCw, Copy, CheckCheck, Cpu } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

export const VisionEnginePage: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const GITHUB_ACTIONS_YAML = `name: UserMimic Autonomous QA
on: [pull_request]

jobs:
  simulate-user-journeys:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy UserMimic Vision Swarm
        uses: usermimic/action@v2
        with:
          api-key: \${{ secrets.USERMIMIC_API_KEY }}
          app-url: \${{ steps.preview-deploy.outputs.url }}
          personas: ['maya-mobile-3g', 'alex-chaos', 'jordan-admin']
          threshold-friction-score: 95
          export-video-artifacts: true`

  const handleCopy = () => {
    navigator.clipboard.writeText(GITHUB_ACTIONS_YAML)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
          Computer Vision Architecture
        </span>
        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] font-normal mb-4"
          segments={[
            { text: 'Zero Selector Debt.', className: 'font-normal text-[#E1E0CC]' },
            { text: 'Self-Healing by Design.', className: 'italic font-serif text-[#E1E0CC] mx-2' },
          ]}
        />
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Traditional tools rely on arbitrary CSS classes and XPath trees that break with every Git push. UserMimic sees your web application exactly as a human does.
        </p>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
        {/* Traditional Left Column */}
        <div className="bg-[#121214] border border-red-500/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <X className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#E1E0CC]">Traditional Test Automation</h3>
                <p className="text-xs text-gray-500">Cypress, Playwright &amp; Selenium Test Scripts</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-red-300 flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" />
                  Brittle DOM Selectors
                </span>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">
                  <code className="text-red-400 bg-red-950/30 px-1 py-0.5 rounded font-mono">cy.get('#btn-submit-v2')</code> breaks on any CSS refactor, Tailwind utility update, or CSS-in-JS regeneration.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-red-300 flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" />
                  Blind to Visual Overlaps &amp; Obstacles
                </span>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">
                  Asserts an element exists in the DOM even if it is completely obscured behind a sticky cookie banner, floating chat widget, or broken z-index modal.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-red-300 flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" />
                  Endless Script Maintenance Debt
                </span>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">
                  Engineers spend up to 30% of each two-week sprint fixing flaky false-positives rather than shipping production features.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
            <span>Result: False green CI builds</span>
            <span className="text-red-400 font-semibold">30% sprint lost</span>
          </div>
        </div>

        {/* UserMimic Right Column */}
        <div className="bg-[#121418] border border-primary/40 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#E1E0CC]">UserMimic Vision Engine</h3>
                <p className="text-xs text-primary/70">Multimodal Computer-Vision Agents</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Human Visual Perception
                </span>
                <p className="text-xs text-gray-300 leading-relaxed pl-6">
                  Identifies buttons, forms, and navigation items by reading rendered pixels, spatial coordinates, optical text OCR, and semantic layout cues.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  True Usability &amp; Layout Friction Detection
                </span>
                <p className="text-xs text-gray-300 leading-relaxed pl-6">
                  Detects floating banners that obscure clicks, flags unclickable touch targets, and captures user hesitation before checkout drop-offs.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Automatic Self-Healing Adaptation
                </span>
                <p className="text-xs text-gray-300 leading-relaxed pl-6">
                  Major UI redesigns cause zero test failures. Vision agents adapt dynamically, navigate new user flows, and export verified regression specs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>Result: 0px selector maintenance</span>
            <span className="text-emerald-400 font-semibold">100% resilient builds</span>
          </div>
        </div>
      </div>

      {/* GitHub Actions CI/CD Integration Snippet */}
      <div className="bg-[#0b0b0e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-primary" />
            <div>
              <h4 className="text-lg font-bold text-[#E1E0CC]">Deploy in 3 Lines of YAML</h4>
              <p className="text-xs text-gray-400">Add autonomous simulation runs directly to GitHub Actions or GitLab CI</p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#E1E0CC] text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy YAML</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-[#040406] border border-white/5 rounded-2xl p-4 sm:p-6 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed">
          <code>{GITHUB_ACTIONS_YAML}</code>
        </pre>
      </div>
    </div>
  )
}
