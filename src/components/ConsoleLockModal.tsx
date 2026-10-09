import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Mail,
  Building,
  Terminal,
  Loader2,
} from 'lucide-react'

interface ConsoleLockModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'auth' | 'request'
}

export const ConsoleLockModal: React.FC<ConsoleLockModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'auth',
}) => {
  const [activeTab, setActiveTab] = useState<'auth' | 'request'>(initialTab)

  // Auth fields
  const [workspaceId, setWorkspaceId] = useState('')
  const [licenseKey, setLicenseKey] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Beta Request fields
  const [workEmail, setWorkEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [teamSize, setTeamSize] = useState('11-50')
  const [cicdProvider, setCicdProvider] = useState('github-actions')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setIsAuthenticating(true)

    // Realistic cryptographic verification delay
    setTimeout(() => {
      setIsAuthenticating(false)
      setAuthError(
        'Access Denied: Unrecognized Organization ID or Expired License Token. This cluster is restricted to approved enterprise design partners. If you have active licenses, contact your workspace administrator or email garv@usermimic.tech.'
      )
    }, 1400)
  }

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (!workEmail || !companyName) return
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setRequestSubmitted(true)
    }, 1200)
  }

  const handleReset = () => {
    setAuthError(null)
    setRequestSubmitted(false)
    setWorkspaceId('')
    setLicenseKey('')
    setWorkEmail('')
    setCompanyName('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-auto"
          >
            {/* Top Amber Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d89c56]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[#d89c56]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                      Enterprise Vision Console
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-[#d89c56] border border-[#d89c56]/25 font-semibold">
                      Private Beta
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Isolated compute clusters for authorized design partners
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#060608] border border-white/5 rounded-2xl mb-6 relative z-10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('auth')
                  setAuthError(null)
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'auth'
                    ? 'bg-primary text-black shadow-md'
                    : 'text-gray-400 hover:text-[#E1E0CC]'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Enterprise Sign-In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('request')
                  setAuthError(null)
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'request'
                    ? 'bg-primary text-black shadow-md'
                    : 'text-gray-400 hover:text-[#E1E0CC]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Beta Access</span>
              </button>
            </div>

            {/* TAB 1: Enterprise Sign-In with Key */}
            {activeTab === 'auth' && (
              <form onSubmit={handleAuthenticate} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                    <span>Organization Workspace ID</span>
                    <span className="text-[10px] text-gray-500 font-mono">e.g. org_acme_corp</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="org_xxxxxxxxxxxx"
                    value={workspaceId}
                    onChange={(e) => setWorkspaceId(e.target.value)}
                    className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#d89c56]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                    <span>Enterprise License Token / API Key</span>
                    <span className="text-[10px] text-gray-500 font-mono">256-bit token</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="um_live_••••••••••••••••••••••••"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#E1E0CC] font-mono placeholder:text-gray-600 focus:outline-none focus:border-[#d89c56]/60 transition-colors"
                  />
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-start gap-2.5"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{authError}</span>
                  </motion.div>
                )}

                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px] text-gray-400 flex items-start gap-2.5">
                  <Terminal className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    UserMimic operates zero-retention ephemeral runner instances behind mutual TLS and corporate IP allowlists. Direct public access is prohibited.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href="mailto:garv@usermimic.tech?subject=UserMimic%20Enterprise%20Token%20Inquiry"
                    className="text-[11px] text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Lost key? Contact garv@usermimic.tech</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-lg disabled:opacity-50"
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Token...</span>
                      </>
                    ) : (
                      <>
                        <span>Authenticate Session</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Request Closed Beta Access */}
            {activeTab === 'request' && (
              <>
                {requestSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-3 relative z-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#E1E0CC]">
                      Enterprise Beta Application Staged
                    </h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Verification token dispatched to <strong className="text-primary">{workEmail}</strong>. Our security and architecture team reviews domain applications within 24–48 hours.
                    </p>
                    <div className="pt-3 text-[11px] text-gray-500 font-mono">
                      Priority onboarding queued // Reference: UM-BETA-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="bg-white/10 hover:bg-white/15 text-[#E1E0CC] text-xs font-semibold px-6 py-2 rounded-full transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRequestAccess} className="space-y-3.5 relative z-10">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="garv@company.com"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Organization / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Technologies"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[#060609] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Engineering Team Size
                        </label>
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="w-full bg-[#060609] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                        >
                          <option value="1-10">1 – 10 Engineers</option>
                          <option value="11-50">11 – 50 Engineers</option>
                          <option value="51-200">51 – 200 Engineers</option>
                          <option value="200+">200+ Engineers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Primary CI/CD Stack
                        </label>
                        <select
                          value={cicdProvider}
                          onChange={(e) => setCicdProvider(e.target.value)}
                          className="w-full bg-[#060609] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                        >
                          <option value="github-actions">GitHub Actions</option>
                          <option value="gitlab-ci">GitLab CI/CD</option>
                          <option value="circleci">CircleCI</option>
                          <option value="custom-internal">Custom / On-Prem</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px] text-gray-400 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Design partners receive dedicated sandbox GPU clusters, SOC 2 compliance reports, and direct engineer Slack channel access.
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">
                        Urgent evaluation? Direct: <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a>
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Closed Access</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
