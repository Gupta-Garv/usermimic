import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Building2,
  ShieldCheck,
  Send,
  CheckCircle2,
  MapPin,
  Globe2,
  Cpu,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'

export const About: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [subject, setSubject] = useState('Enterprise Pilot')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div id="company" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <span className="text-[#d89c56] text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold mb-4 block font-mono">
          Company &amp; Direct Contact
        </span>
        <WordsPullUpMultiStyle
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] font-normal mb-4"
          segments={[
            { text: 'Pioneering Vision AI.', className: 'font-normal text-[#E1E0CC]' },
            { text: 'Engineered for Scale.', className: 'italic font-serif text-[#E1E0CC] mx-2' },
          ]}
        />
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          UserMimic was founded in 2024 to eliminate selector debt in software engineering by treating digital interfaces through spatial visual perception rather than brittle DOM trees.
        </p>
      </div>

      {/* Grid: Left = Story & Direct Info, Right = Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mission, Entity & Official Touchpoint */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mission Card */}
          <div className="bg-[#0b0b0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                  The Architecture
                </h3>
                <p className="text-xs text-gray-400">Autonomous Spatial Cognition</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Modern frontend engineering moves too fast for static CSS classes and XPath assertions. UserMimic deploys multimodal neural agents that perceive screens, simulate real human user hesitation, test checkout flows, and self-heal automatically as layouts evolve.
            </p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>Founded: 2024</span>
              <span className="text-emerald-400">Status: Active Private Beta</span>
            </div>
          </div>

          {/* Corporate Entity & Coordinates */}
          <div className="bg-[#0b0b0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#d89c56]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                  Corporate Office &amp; Entity
                </h3>
                <p className="text-xs text-gray-400">Institutional Governance</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#E1E0CC] block">UserMimic</span>
                  <span className="text-gray-400">India &amp; Distributed Global Infrastructure</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#E1E0CC] block">Direct Executive Communications</span>
                  <a
                    href="mailto:garv@usermimic.tech"
                    className="text-primary hover:underline font-mono"
                  >
                    garv@usermimic.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#E1E0CC] block">Security &amp; Data Protection Office</span>
                  <span className="text-gray-400">SOC 2 Type II // Inquiries routed to garv@usermimic.tech</span>
                </div>
              </div>
            </div>

            {/* Third Party Links */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-3 text-xs">
              <a
                href="https://www.crunchbase.com/organization/usermimic"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-colors"
              >
                <span>Crunchbase</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>

              <a
                href="https://www.linkedin.com/company/usermimic"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-colors"
              >
                <span>LinkedIn Company</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Direct Message & Inquiries Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d89c56] font-semibold">
                Inquiries &amp; Partnerships
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#E1E0CC] mt-1">
                Reach the Founding Engineering Team
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                Whether you are exploring an enterprise pilot, security audit, or investment partnership, messages are routed directly to leadership.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#E1E0CC]">
                  Transmission Delivered
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-primary">{name || 'there'}</strong>. Your inquiry has been routed directly to <strong className="text-primary">garv@usermimic.tech</strong>. We typically respond within 2–4 business hours.
                </p>
                <div className="pt-2 text-[11px] font-mono text-gray-500">
                  Ticket dispatched // Ref: MSG-{Math.floor(10000 + Math.random() * 90000)}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setMessage('')
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs text-[#E1E0CC] font-semibold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Technologies"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="Enterprise Pilot">Enterprise Closed Pilot</option>
                      <option value="Security Audit">Security &amp; Compliance Review</option>
                      <option value="Design Partnership">Design Partnership</option>
                      <option value="Investment / Advisory">Investor / Strategic Advisory</option>
                      <option value="General Inquiry">General Technical Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Your Message / Project Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your application stack, testing bottlenecks, or enterprise pilot requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#060609] border border-white/10 rounded-xl p-4 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-gray-500 font-mono">
                    Direct Email: <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-black font-semibold text-xs px-6 py-3 rounded-full hover:bg-white transition-all shadow-lg disabled:opacity-50"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
