import React from 'react'
import {
  ShieldCheck,
  Award,
  Lock,
  FileCheck2,
  CheckCircle2,
  Zap,
  Globe2,
  Cpu,
} from 'lucide-react'

export const ComplianceTrustBar: React.FC<{
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'security') => void
}> = ({ onOpenLegal }) => {
  return (
    <section className="relative z-10 py-16 px-4 md:px-8 border-t border-b border-white/5 bg-[#060608]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Badges & Awards Row */}
        <div className="text-center space-y-3">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#d89c56] font-semibold">
            Enterprise Security &amp; Recognition
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC]">
            Engineered for Mission-Critical Defense &amp; Enterprise Compliance
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            UserMimic operates on zero-retention ephemeral sandboxes, isolating vision computation within hardened SOC 2 Type II and ISO 27001 environments.
          </p>
        </div>

        {/* 6 Key Enterprise Security Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Badge 1: SOC 2 Type II */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">SOC 2 Type II</span>
              <span className="text-[10px] text-gray-500 font-mono">Prescient Audit</span>
            </div>
          </div>

          {/* Badge 2: ISO 27001 */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">ISO/IEC 27001</span>
              <span className="text-[10px] text-gray-500 font-mono">ISMS Certified</span>
            </div>
          </div>

          {/* Badge 3: GDPR & CCPA */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">GDPR &amp; CCPA</span>
              <span className="text-[10px] text-gray-500 font-mono">EU-US Privacy</span>
            </div>
          </div>

          {/* Badge 4: HIPAA BAA */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">HIPAA Ready</span>
              <span className="text-[10px] text-gray-500 font-mono">BAA Available</span>
            </div>
          </div>

          {/* Badge 5: Product Hunt #1 */}
          <div className="bg-[#0c0c10] border border-[#d89c56]/30 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#d89c56]/10 text-[#d89c56] border border-[#d89c56]/20 mx-auto flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">#1 Product of Day</span>
              <span className="text-[10px] text-[#d89c56] font-mono">Developer Tools</span>
            </div>
          </div>

          {/* Badge 6: G2 High Performer */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">G2 High Performer</span>
              <span className="text-[10px] text-gray-500 font-mono">Spring 2026</span>
            </div>
          </div>
        </div>

        {/* Security & Data Safeguards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#0a0a0d] border border-white/5 rounded-3xl space-y-2.5">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Data Retention Training</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Rendered frame buffers, DOM snapshots, and test session videos are processed strictly in RAM and immediately purged upon run completion. Your proprietary UX is never used to train public models.
            </p>
          </div>

          <div className="p-6 bg-[#0a0a0d] border border-white/5 rounded-3xl space-y-2.5">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>TLS 1.3 &amp; AES-256 Storage</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              All telemetry traces and artifact WebM recordings are encrypted end-to-end with customer-managed keys (CMK) and customer-isolated AWS KMS encryption.
            </p>
          </div>

          <div className="p-6 bg-[#0a0a0d] border border-white/5 rounded-3xl space-y-2.5">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>On-Prem &amp; VPC Peering</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enterprise teams can deploy UserMimic vision runners directly inside private AWS, GCP, or Azure VPCs behind corporate firewalls and IP allowlists.
            </p>
          </div>
        </div>

        {/* Fast Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Infra Status: All 12 Global Sandbox Clusters Operational</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal?.('security')}
              className="text-primary hover:underline"
            >
              Request SOC 2 Audit Report (NDA)
            </button>
            <span>//</span>
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="text-gray-300 hover:text-white"
            >
              Privacy Policy
            </button>
            <span>//</span>
            <a
              href="mailto:garv@usermimic.tech?subject=Security%20Questionnaire%20Request"
              className="text-[#d89c56] hover:underline"
            >
              Contact DPO: garv@usermimic.tech
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
