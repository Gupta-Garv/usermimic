import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, FileText, Lock, Cpu, CheckCircle2, ExternalLink } from 'lucide-react'

export type LegalDocType = 'terms' | 'privacy' | 'security' | 'whitepaper'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  docType: LegalDocType
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  docType,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            className="relative w-full max-w-4xl bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden my-auto max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-primary">
                  {docType === 'terms' && <FileText className="w-5 h-5" />}
                  {docType === 'privacy' && <Lock className="w-5 h-5" />}
                  {docType === 'security' && <Shield className="w-5 h-5" />}
                  {docType === 'whitepaper' && <Cpu className="w-5 h-5 text-[#76B900]" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#E1E0CC]">
                    {docType === 'terms' && 'UserMimic Master Terms of Service'}
                    {docType === 'privacy' && 'UserMimic Enterprise Privacy Policy'}
                    {docType === 'security' && 'Security Architecture & Data Protection Whitepaper'}
                    {docType === 'whitepaper' && 'Architecture Whitepaper & Benchmark Report v2.4'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    UserMimic Technologies // NVIDIA Inception Member // Version 2.4
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Document Text */}
            <div className="overflow-y-auto pr-2 my-6 space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              {docType === 'terms' && (
                <>
                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">1. Engagement &amp; Platform Access</h4>
                    <p>
                      These Master Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between UserMimic Technologies (&ldquo;UserMimic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and the corporate entity or organization subscribing to our services (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;). By accessing or deploying the UserMimic autonomous vision QA platform, API endpoints, or CI/CD runner extensions, you agree to these Terms.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">2. Proprietary Customer Assets &amp; IP Ownership</h4>
                    <p>
                      Customer retains exclusive title, ownership, and all intellectual property rights to their software applications, user interface assets, staging environments, and test artifacts. UserMimic does not claim ownership of Customer materials, and Customer frame buffers are never used to train generalized foundation models without explicit written consent.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">3. Service Level Agreements (SLA)</h4>
                    <p>
                      For Enterprise Tier subscriptions, UserMimic guarantees a 99.95% monthly uptime SLA for dedicated vision cluster execution. Scheduled maintenance windows are communicated at least 72 hours in advance.
                    </p>
                  </section>
                </>
              )}

              {docType === 'privacy' && (
                <>
                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">1. In-Memory Zero-Retention Policy</h4>
                    <p>
                      UserMimic processes UI frame buffers, network logs, and interaction trajectories exclusively in volatile RAM within ephemeral microVMs. Upon completion of each autonomous session, frame caches are immediately zeroized and destroyed.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">2. GDPR, CCPA &amp; International Compliance</h4>
                    <p>
                      UserMimic complies with the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). European workloads are executed strictly on dedicated isolated infrastructure within Frankfurt (AWS eu-central-1), adhering to EU Standard Contractual Clauses (SCCs).
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">3. Data Protection Officer</h4>
                    <p>
                      For Data Subject Access Requests (DSAR), custom Data Processing Addendums (DPA), or data deletion inquiries, contact our Data Protection Office directly at:
                    </p>
                    <div className="p-3 bg-[#060609] border border-white/10 rounded-xl font-mono text-xs text-primary">
                      Data Protection Office: garv@usermimic.tech<br />
                      UserMimic Technologies Security &amp; Legal Governance
                    </div>
                  </section>
                </>
              )}

              {docType === 'security' && (
                <>
                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">1. Security Overview &amp; SOC 2 Type II</h4>
                    <p>
                      UserMimic is audited annually for SOC 2 Type II compliance across Security, Confidentiality, and Availability trust principles. Continuous automated monitoring is maintained across all infrastructure environments.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">2. Cryptographic Controls &amp; Network Isolation</h4>
                    <p>
                      All network traffic is encrypted using TLS 1.3 with forward secrecy. Telemetry and video artifact recordings at rest are encrypted with AES-256 via AWS KMS with dedicated customer-managed keys. All headless browser runners execute in ephemeral, sandboxed Linux microVMs with strict memory limits and immediate zeroization upon session conclusion.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">3. Enterprise Penetration Testing &amp; Bug Bounty</h4>
                    <p>
                      UserMimic conducts bi-annual third-party penetration testing and maintains a private vulnerability disclosure program. To request our complete SOC 2 Type II audit report or complete a security questionnaire, email garv@usermimic.tech.
                    </p>
                  </section>
                </>
              )}

              {docType === 'whitepaper' && (
                <>
                  <section className="space-y-3">
                    <div className="p-3.5 bg-[#76B900]/10 border border-[#76B900]/25 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#76B900] animate-pulse" />
                        <span className="text-xs font-bold text-[#E1E0CC]">NVIDIA Inception Program Member</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#76B900] uppercase font-bold">TensorRT-LLM Acceleration</span>
                    </div>

                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">
                      Abstract: The Collapse of Selector-Based DOM Assertions
                    </h4>
                    <p>
                      Contemporary web applications are characterized by dynamic single-page hydration, client-side A/B experimentation, nested iframe auth flows, and obfuscated utility-first CSS classes (e.g. Tailwind). Traditional E2E automation frameworks (Playwright, Cypress, Selenium) depend on brittle DOM hierarchical trees and CSS selectors that break during minor redesigns, imposing an average of 38 developer maintenance hours per sprint.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">
                      The Optical Reticle Architecture: Spatial Vision Attention
                    </h4>
                    <p>
                      UserMimic replaces DOM selectors with a proprietary multimodal vision architecture. The engine captures raw viewport render buffers at 60fps, processes visual tokens through spatial attention layers, and predicts interactive bounding boxes and click coordinates without reading HTML strings.
                    </p>
                    <div className="p-4 bg-[#060609] border border-white/10 rounded-2xl font-mono text-xs space-y-2 text-gray-300">
                      <div className="text-primary font-bold">Empirical Benchmark (100,000 Synthetic User Sessions):</div>
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5 text-[11px]">
                        <div>
                          <span className="text-gray-500 block">Metric</span>
                          <span className="text-[#E1E0CC] font-semibold">Flakiness Rate</span>
                          <span className="text-[#E1E0CC] font-semibold">Maintenance / Mo</span>
                          <span className="text-[#E1E0CC] font-semibold">CSS Refactor Tolerance</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">DOM (Playwright)</span>
                          <span className="text-red-400">24.3%</span>
                          <span className="text-red-400">38.2 hrs</span>
                          <span className="text-red-400">0.0% (Breakage)</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">UserMimic Vision</span>
                          <span className="text-emerald-400">0.8%</span>
                          <span className="text-emerald-400">2.1 hrs</span>
                          <span className="text-emerald-400">99.4% (Self-Healed)</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">
                      Hardware Acceleration &amp; Inference Latency
                    </h4>
                    <p>
                      Through the <strong>NVIDIA Inception Program</strong>, UserMimic leverages quantized TensorRT-LLM weights deployed on NVIDIA H100 Tensor Core GPUs. Visual tokenization latency is reduced to <strong>42ms per frame</strong>, allowing real-time autonomous user decision loops that match human cognitive reaction times.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">
                      Open Source Ecosystem Integration
                    </h4>
                    <p>
                      UserMimic provides official CI/CD integrations for GitHub Actions (<a href="https://github.com/Gupta-Garv/usermimic-action" target="_blank" rel="noreferrer" className="text-primary underline">@usermimic/action v1.2</a>), GitLab CI, and Docker runners.
                    </p>
                  </section>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Official Inquiries: <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a></span>
              <button
                onClick={onClose}
                className="bg-primary text-black font-semibold text-xs px-5 py-2 rounded-full hover:bg-white transition-all"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
