import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, ChevronDown } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

export const PricingPage: React.FC<{ onSelectPlan?: (plan: string) => void }> = ({
  onSelectPlan,
}) => {
  const [teamSize, setTeamSize] = useState<number>(15)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Calculations for ROI calculator
  const hoursSavedPerDev = 6 // hours per month lost to flaky tests
  const totalHoursSaved = teamSize * hoursSavedPerDev
  const estimatedDollarsSaved = totalHoursSaved * 95 // avg dev hourly cost $95

  const FAQS = [
    {
      q: 'How does UserMimic differ from Playwright or Cypress?',
      a: 'Traditional tools rely on brittle DOM selectors (IDs, CSS classes, XPath) that break when developers refactor UI. UserMimic uses multimodal computer vision to perceive your application visually, exactly like human eyes. Redesigns and CSS class changes never break simulations.',
    },
    {
      q: 'Do I need to rewrite all my existing test suites?',
      a: 'Not at all. UserMimic runs alongside your existing CI/CD pipelines as a GitHub Action. You can keep existing unit and integration tests, while letting UserMimic handle end-to-end user journeys, chaos edge cases, and visual regressions.',
    },
    {
      q: 'Can UserMimic test behind auth and internal staging environments?',
      a: 'Yes. Our agents support encrypted session tokens, OAuth flows, and for Growth and Enterprise tiers, can run inside your private VPC or behind a corporate VPN.',
    },
    {
      q: 'How does UserMimic prevent false positives?',
      a: 'Our vision agents verify intent before asserting failure. If an element shifts position, the agent visually identifies its new coordinates and continues the journey. A failure is only flagged when real human UX friction occurs or unhandled errors are triggered.',
    },
  ]

  return (
    <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-4 block">
          Transparent Scalability
        </span>
        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] font-normal mb-4"
          segments={[
            { text: 'Predictable Scale.', className: 'font-normal text-[#E1E0CC]' },
            { text: 'Zero Per-Seat Tax.', className: 'italic font-serif text-[#E1E0CC] mx-2' },
          ]}
        />
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Deploy continuous autonomous QA across staging and production without per-developer seat friction or maintenance overhead.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 items-stretch">
        {/* Starter Plan */}
        <div className="bg-[#121215] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#E1E0CC]">Starter</h3>
              <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                Seed
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Perfect for early-stage startups and small engineering teams validating core user funnels.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-[#E1E0CC] font-mono">$99</span>
              <span className="text-sm text-gray-400 font-mono">/month</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>500 autonomous simulation runs / mo</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>5 synthetic personas included</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>GitHub Actions CI/CD integration</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Visual defect screenshots &amp; DOM traces</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Community Slack support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan?.('Starter')}
            className="w-full py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[#E1E0CC] text-xs font-semibold transition-all"
          >
            Choose Starter
          </button>
        </div>

        {/* Growth Plan (Featured) */}
        <div className="bg-[#16161b] border-2 border-primary rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#E1E0CC] flex items-center gap-2">
                Growth
                <Sparkles className="w-4 h-4 text-primary" />
              </h3>
              <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                Scaling
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Ideal for scaling engineering orgs needing parallel PR validation and automated repro videos.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-[#E1E0CC] font-mono">$299</span>
              <span className="text-sm text-gray-400 font-mono">/month</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              <li className="text-xs text-gray-200 flex items-center gap-2.5 font-medium">
                <Check className="w-4 h-4 text-primary shrink-0 font-bold" />
                <span>3,500 simulation runs / mo</span>
              </li>
              <li className="text-xs text-gray-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>All personas + custom prompt tuning</span>
              </li>
              <li className="text-xs text-gray-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>12 concurrent parallel agent workers</span>
              </li>
              <li className="text-xs text-gray-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Full WebM video reproduction artifact generation</span>
              </li>
              <li className="text-xs text-gray-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Slack &amp; Datadog regression webhooks</span>
              </li>
              <li className="text-xs text-gray-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Priority engineer-to-engineer support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan?.('Growth')}
            className="w-full py-3 rounded-full bg-primary hover:bg-white text-black text-xs font-bold transition-all shadow-xl shadow-primary/10"
          >
            Start Free 14-Day Trial
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-[#121215] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#E1E0CC]">Enterprise</h3>
              <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                Custom
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              For security-conscious enterprises requiring on-prem / VPC isolation and custom fine-tuned personas.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-[#E1E0CC] font-mono">Custom</span>
              <span className="text-sm text-gray-400 font-mono">/annum</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Unlimited monthly simulation runs</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Dedicated GPU cluster on your VPC or Cloud Run</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Custom proprietary personas &amp; corporate VPN</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>SOC2 Type II &amp; HIPAA compliance guarantees</span>
              </li>
              <li className="text-xs text-gray-300 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Dedicated Solutions Architect &amp; 99.99% SLA</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan?.('Enterprise')}
            className="w-full py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[#E1E0CC] text-xs font-semibold transition-all"
          >
            Contact Enterprise Sales
          </button>
        </div>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs uppercase font-mono text-primary font-semibold">Engineering Velocity Calculator</span>
          <h4 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC] mt-2">
            Calculate your sprint savings with UserMimic
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
          <div className="md:col-span-7 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 font-medium">Software Engineers in Organization:</span>
              <span className="font-mono text-primary font-bold text-lg">{teamSize} engineers</span>
            </div>
            <input
              type="range"
              min="3"
              max="150"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-[#DEDBC8] bg-black/60 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-xs text-gray-500 leading-relaxed">
              Based on industry average: developers spend ~6 hours/month debugging brittle flaky test scripts.
            </p>
          </div>

          <div className="md:col-span-5 bg-[#07070a] border border-white/5 rounded-2xl p-6 text-center space-y-3">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {totalHoursSaved} hrs
              </span>
              <p className="text-xs text-gray-400 mt-1">Sprint Capacity Reclaimed / Month</p>
            </div>
            <div className="pt-3 border-t border-white/5">
              <span className="text-2xl sm:text-3xl font-bold text-primary font-mono">
                ${estimatedDollarsSaved.toLocaleString()}
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5">Estimated Engineering Payroll Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h4 className="text-2xl font-bold text-[#E1E0CC] text-center mb-8">Frequently Asked Questions</h4>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-[#101014] border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold text-[#E1E0CC] hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
