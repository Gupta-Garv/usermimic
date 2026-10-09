import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  Check,
  CreditCard,
  Building,
  Lock,
  ArrowRight,
  Server,
  Sparkles,
  CheckCircle2,
  Loader2,
  FileText,
} from 'lucide-react'

interface PlanCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: string
}

export const PlanCheckoutModal: React.FC<PlanCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [region, setRegion] = useState('us-east-1')
  const [email, setEmail] = useState('')
  const [orgName, setOrgName] = useState('')
  const [paymentType, setPaymentType] = useState<'card' | 'invoice'>('card')
  const [isProvisioning, setIsProvisioning] = useState(false)
  const [provisionStep, setProvisionStep] = useState(0)
  const [provisioned, setProvisioned] = useState(false)

  // Plan pricing lookup
  const isEnterprise = selectedPlan.toLowerCase().includes('enterprise')
  const isStarter = selectedPlan.toLowerCase().includes('starter')
  const monthlyRate = isStarter ? 99 : isEnterprise ? 950 : 299
  const effectiveMonthly = billingCycle === 'annual' ? Math.round(monthlyRate * 0.8) : monthlyRate

  const handleStartProvisioning = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !orgName) return
    setIsProvisioning(true)
    setProvisionStep(1)

    setTimeout(() => {
      setProvisionStep(2)
      setTimeout(() => {
        setProvisionStep(3)
        setTimeout(() => {
          setIsProvisioning(false)
          setProvisioned(true)
        }, 900)
      }, 1000)
    }, 1100)
  }

  const handleClose = () => {
    setIsProvisioning(false)
    setProvisionStep(0)
    setProvisioned(false)
    setEmail('')
    setOrgName('')
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-auto"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#d89c56]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-primary">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#E1E0CC]">
                      Provision Dedicated Tenant
                    </h3>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 font-bold">
                      {selectedPlan} Tier
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    14-day zero-risk trial // Automated VPC runner allocation
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            {provisioned ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4 relative z-10"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#E1E0CC]">
                  Dedicated Tenant Provisioned
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  We have allocated your isolated headless vision swarm in <strong className="text-primary">{region}</strong>. An enterprise activation link and temporary root credentials have been dispatched to <strong className="text-primary">{email}</strong>.
                </p>

                <div className="p-4 bg-[#060609] border border-white/10 rounded-2xl max-w-md mx-auto text-left space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Cluster ID:</span>
                    <span className="text-gray-200">cluster-um-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Region:</span>
                    <span className="text-emerald-400">{region} (Isolated)</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Organization:</span>
                    <span className="text-gray-200">{orgName}.usermimic.tech</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Billing Status:</span>
                    <span className="text-primary">14-Day Free Evaluation Active</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-gray-500">
                  Questions regarding custom billing, BAA, or invoice onboarding? Contact <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="bg-primary text-black font-semibold text-xs px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    Go to Application Overview
                  </button>
                </div>
              </motion.div>
            ) : isProvisioning ? (
              <div className="py-12 space-y-6 text-center relative z-10 font-mono">
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-[#E1E0CC]">
                    Spinning Up Dedicated Swarm Runner...
                  </h4>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p className={provisionStep >= 1 ? 'text-primary' : 'text-gray-600'}>
                      {provisionStep >= 1 ? '✓' : '○'} [1/3] Allocating isolated headless GPU runners in {region}...
                    </p>
                    <p className={provisionStep >= 2 ? 'text-primary' : 'text-gray-600'}>
                      {provisionStep >= 2 ? '✓' : '○'} [2/3] Generating mutual TLS certs &amp; GitHub Actions API secrets...
                    </p>
                    <p className={provisionStep >= 3 ? 'text-primary' : 'text-gray-600'}>
                      {provisionStep >= 3 ? '✓' : '○'} [3/3] Enforcing SOC 2 ephemeral zero-retention policies...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleStartProvisioning} className="pt-6 space-y-5 relative z-10">
                {/* Billing Cycle Switcher */}
                <div className="flex items-center justify-between p-3 bg-[#060609] border border-white/5 rounded-2xl">
                  <div>
                    <span className="text-xs font-semibold text-[#E1E0CC] block">
                      Billing Cycle
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Annual contracts include 2 months free + custom persona tuning
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-primary text-black font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                        billingCycle === 'annual'
                          ? 'bg-primary text-black font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>Annual</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">
                        -20%
                      </span>
                    </button>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Organization Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                    />
                  </div>
                </div>

                {/* Cluster Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Primary Isolated Cloud Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-[#060609] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                    >
                      <option value="us-east-1">AWS us-east-1 (N. Virginia)</option>
                      <option value="eu-central-1">AWS eu-central-1 (Frankfurt - GDPR)</option>
                      <option value="us-west-2">AWS us-west-2 (Oregon)</option>
                      <option value="gcp-us-central1">Google Cloud (Iowa)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Payment Verification Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentType('card')}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                          paymentType === 'card'
                            ? 'bg-white/10 border-primary text-[#E1E0CC]'
                            : 'bg-[#060609] border-white/10 text-gray-400'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Corporate Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentType('invoice')}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                          paymentType === 'invoice'
                            ? 'bg-white/10 border-primary text-[#E1E0CC]'
                            : 'bg-[#060609] border-white/10 text-gray-400'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PO / NET-30</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated Payment Verification / PO */}
                {paymentType === 'card' ? (
                  <div className="p-3.5 bg-[#060609] border border-white/10 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span className="flex items-center gap-1.5 text-gray-300 font-medium">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Encrypted Card Entry (Zero charge during 14-day trial)</span>
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">256-bit SSL</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        className="col-span-6 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#E1E0CC] font-mono"
                        defaultValue="4242 •••• •••• 4242"
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="col-span-3 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#E1E0CC] font-mono"
                        defaultValue="12/28"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="col-span-3 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#E1E0CC] font-mono"
                        defaultValue="842"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-[#060609] border border-white/10 rounded-2xl text-xs text-gray-300 space-y-1">
                    <div className="font-semibold text-primary flex items-center gap-1.5">
                      <Building className="w-4 h-4" />
                      <span>Enterprise Invoicing &amp; Purchase Order (NET-30)</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Invoices will be billed directly to your accounts payable department. To execute a custom Master Services Agreement (MSA) or BAA, contact <a href="mailto:garv@usermimic.tech" className="text-primary underline">garv@usermimic.tech</a>.
                    </p>
                  </div>
                )}

                {/* Subtotal & Confirmation Footer */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-gray-400">Due Today:</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">$0.00</span>
                      <span className="text-[11px] text-gray-500">
                        ({isEnterprise ? 'Custom' : `$${effectiveMonthly}/mo`} after 14-day trial)
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">
                      Cancel anytime with 1 click from your admin console.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-black font-semibold text-xs px-6 py-3 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <span>Provision Swarm Cluster</span>
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
