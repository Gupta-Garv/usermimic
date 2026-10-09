import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, FileText, Lock } from 'lucide-react'

export type LegalDocType = 'terms' | 'privacy' | 'security'

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
            className="relative w-full max-w-3xl bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden my-auto max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-primary">
                  {docType === 'terms' && <FileText className="w-5 h-5" />}
                  {docType === 'privacy' && <Lock className="w-5 h-5" />}
                  {docType === 'security' && <Shield className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#E1E0CC]">
                    {docType === 'terms' && 'UserMimic Master Terms of Service'}
                    {docType === 'privacy' && 'UserMimic Enterprise Privacy Policy'}
                    {docType === 'security' && 'Security Architecture & Data Protection Whitepaper'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    UserMimic, Inc. // Effective Date: January 1, 2026 // Version 2.4
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
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">1. Agreement to Terms</h4>
                    <p>
                      These Master Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between UserMimic, Inc. (&ldquo;UserMimic&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and the corporate entity or organization subscribing to our services (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;). By accessing or deploying the UserMimic autonomous vision QA platform, API endpoints, or CI/CD runner extensions, you agree to these Terms.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">2. Autonomous Vision Simulation License</h4>
                    <p>
                      Subject to compliance with these Terms, UserMimic grants Customer a worldwide, non-exclusive, non-transferable license to deploy our multimodal vision agents to simulate automated human user journeys across Customer&apos;s authorized web properties, staging environments, and production applications.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">3. Customer Data &amp; Zero-Retention Guarantee</h4>
                    <p>
                      Customer retains exclusive ownership and intellectual property rights over all application code, graphical interfaces, branding, and testing artifacts processed by UserMimic. UserMimic warrants that Customer visual frames, OCR data, and execution sessions are processed ephemerally and are never stored or utilized for training public foundational artificial intelligence models.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">4. Service Level Agreement (SLA) &amp; Support</h4>
                    <p>
                      Enterprise tier subscriptions include a 99.99% uptime guarantee for cloud runner availability and dedicated engineer-to-engineer support. For questions regarding customized MSAs, billing terms, or service commitments, contact legal@usermimic.tech or garv@usermimic.tech.
                    </p>
                  </section>
                </>
              )}

              {docType === 'privacy' && (
                <>
                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">1. Information We Collect</h4>
                    <p>
                      UserMimic collects only necessary administrative account details (name, organizational email, billing address) and temporary telemetry generated during autonomous QA test execution (rendered frame buffers, browser network logs, and interaction timestamps). We do not collect or store end-user customer PII.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">2. GDPR, CCPA &amp; International Compliance</h4>
                    <p>
                      UserMimic complies with the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). European workloads are executed strictly on dedicated isolated infrastructure within Frankfurt (AWS eu-central-1), adhering to EU Standard Contractual Clauses (SCCs).
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-bold text-[#E1E0CC] text-sm sm:text-base">3. Data Protection Officer (DPO)</h4>
                    <p>
                      For Data Subject Access Requests (DSAR), custom Data Processing Addendums (DPA), or data deletion inquiries, contact our Data Protection Office directly at:
                    </p>
                    <div className="p-3 bg-[#060609] border border-white/10 rounded-xl font-mono text-xs text-primary">
                      Data Protection Office: garv@usermimic.tech<br />
                      UserMimic, Inc. Security &amp; Legal Governance
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
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>Official Legal Contact: <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a></span>
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
