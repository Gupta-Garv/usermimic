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
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

export const ComplianceTrustBar: React.FC<{
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'security' | 'whitepaper') => void
}> = ({ onOpenLegal }) => {
  return (
    <section className="relative z-10 py-16 px-4 md:px-8 border-t border-b border-white/5 bg-[#060608]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Badges & Awards Row */}
        <div className="text-center space-y-3">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#d89c56] font-semibold">
            Enterprise Security &amp; Institutional Backing
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E1E0CC]">
            Engineered for Mission-Critical Defense &amp; Enterprise Compliance
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            UserMimic operates on zero-retention ephemeral sandboxes, isolating vision computation within hardened SOC 2 Type II and ISO 27001 environments accelerated via NVIDIA Inception.
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

          {/* Badge 3: NVIDIA Inception Member */}
          <div className="bg-[#0c0c10] border border-[#76B900]/30 rounded-2xl p-4 text-center space-y-2 hover:border-[#76B900]/60 transition-colors relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#76B900]/10 border border-[#76B900]/25 text-[#76B900] mx-auto flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">NVIDIA Inception</span>
              <span className="text-[10px] text-[#76B900] font-mono font-semibold">Program Member</span>
            </div>
          </div>

          {/* Badge 4: GDPR & CCPA */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">GDPR &amp; CCPA</span>
              <span className="text-[10px] text-gray-500 font-mono">EU-US Privacy</span>
            </div>
          </div>

          {/* Badge 5: HIPAA BAA */}
          <div className="bg-[#0c0c10] border border-white/10 rounded-2xl p-4 text-center space-y-2 hover:border-[#d89c56]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary mx-auto flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E1E0CC] block">HIPAA Ready</span>
              <span className="text-[10px] text-gray-500 font-mono">BAA Available</span>
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

        {/* NVIDIA Inception Featured Acceleration Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#76B900]/10 via-[#0a0a0d] to-black border border-[#76B900]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#76B900]/15 border border-[#76B900]/40 flex items-center justify-center shrink-0">
              <Cpu className="w-7 h-7 text-[#76B900]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-[#E1E0CC]">
                  NVIDIA Inception Program Member
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#76B900]/20 text-[#76B900] border border-[#76B900]/30">
                  TensorRT Accelerated
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
                UserMimic’s optical spatial attention models are optimized with NVIDIA TensorRT-LLM and accelerated across dedicated NVIDIA H100 Tensor Core GPU clusters for sub-50ms visual decision inference.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => onOpenLegal?.('whitepaper')}
              className="text-xs font-semibold px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#E1E0CC] border border-white/10 transition-colors"
            >
              Architecture Whitepaper
            </button>
            <a
              href="https://github.com/Gupta-Garv/usermimic-action"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2.5 rounded-full bg-[#76B900] hover:bg-[#86cf00] text-black transition-all shadow-lg flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub Action v1.2</span>
            </a>
          </div>
        </div>

        {/* Security & Data Safeguards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
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
              onClick={() => onOpenLegal?.('whitepaper')}
              className="text-gray-300 hover:text-white"
            >
              Benchmark Report
            </button>
            <span>//</span>
            <a
              href="https://github.com/Gupta-Garv/usermimic-action"
              target="_blank"
              rel="noreferrer"
              className="text-[#76B900] hover:underline"
            >
              Open Source Action
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
