import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  CreditCard,
  Building,
  Check,
  CheckCircle2,
  Server,
  Globe2,
  FileText,
  Loader2,
  Sparkles,
  HelpCircle,
  Download,
  AlertCircle,
  ExternalLink,
  Tag,
  Key,
} from 'lucide-react'
import { Logo } from './Logo'

export interface CheckoutPageProps {
  initialPlan?: string
  onBack: () => void
  onOpenConsole?: () => void
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  initialPlan = 'Growth',
  onBack,
  onOpenConsole,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Growth' | 'Enterprise'>(
    initialPlan === 'Starter'
      ? 'Starter'
      : initialPlan === 'Enterprise'
      ? 'Enterprise'
      : 'Growth'
  )
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach' | 'invoice'>('card')

  // Form Fields
  const [email, setEmail] = useState('alex@acme-corp.com')
  const [companyName, setCompanyName] = useState('Acme Technologies, Inc.')
  const [orgSlug, setOrgSlug] = useState('acme-corp')
  const [region, setRegion] = useState('us-east-1')
  const [enableSso, setEnableSso] = useState(true)

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242')
  const [expiry, setExpiry] = useState('12/28')
  const [cvc, setCvc] = useState('842')
  const [nameOnCard, setNameOnCard] = useState('Alex Morgan')
  const [zipCode, setZipCode] = useState('94107')

  // ACH details
  const [bankName, setBankName] = useState('Silicon Valley Bank (First Citizens)')
  const [routingNumber, setRoutingNumber] = useState('121000358')
  const [accountNumber, setAccountNumber] = useState('••••••••5821')

  // PO details
  const [poNumber, setPoNumber] = useState('PO-2026-USM-8492')
  const [apEmail, setApEmail] = useState('ap-billing@acme-corp.com')
  const [taxId, setTaxId] = useState('US-94-3829104')

  // Promo code
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const [agreed, setAgreed] = useState(true)

  // Provisioning State
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  // Dynamic Trial End Date (14 days from today)
  const trialEndDateObj = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  const trialEndDate = trialEndDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Rates
  const planRates = {
    Starter: { monthly: 99, annual: 79, runs: '500', workers: '3 parallel microVMs', support: 'Standard Community Slack' },
    Growth: { monthly: 299, annual: 239, runs: '3,500', workers: '12 dedicated microVMs', support: 'Dedicated Slack Connect & 4h SLA' },
    Enterprise: { monthly: 950, annual: 760, runs: 'Unlimited', workers: 'Isolated GPU cluster & VPC tunnel', support: '24/7 Dedicated SA & 1h SLA' },
  }

  const baseRate = billingCycle === 'annual'
    ? planRates[selectedPlan].annual
    : planRates[selectedPlan].monthly

  const discountMultiplier = promoApplied ? 0.8 : 1.0
  const effectiveRate = Math.round(baseRate * discountMultiplier)
  const annualBilledAmount = effectiveRate * 12

  // Auto detect card brand
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\D/g, '')
    if (clean.startsWith('4')) return 'VISA'
    if (clean.startsWith('5')) return 'MASTERCARD'
    if (clean.startsWith('3')) return 'AMEX'
    return 'CORP CARD'
  }

  // Handle email change and auto derive company/slug
  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (val.includes('@')) {
      const domainPart = val.split('@')[1]
      if (domainPart && domainPart.includes('.')) {
        const root = domainPart.split('.')[0]
        if (root && root.length > 1) {
          const formatted = root.charAt(0).toUpperCase() + root.slice(1)
          if (!companyName || companyName === 'Acme Technologies, Inc.') {
            setCompanyName(`${formatted} Technologies, Inc.`)
          }
          if (!orgSlug || orgSlug === 'acme-corp') {
            setOrgSlug(root.toLowerCase().replace(/[^a-z0-9-]/g, ''))
          }
        }
      }
    }
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError('')
    const code = promoCode.trim().toUpperCase()
    if (['BETA', 'BETA20', 'FOUNDER', 'YC', 'ANTHROPIC', 'USERMIMIC20'].includes(code)) {
      setPromoApplied(true)
    } else if (code.length === 0) {
      setPromoError('Please enter a valid code.')
    } else {
      // Allow any legitimate coupon string
      setPromoApplied(true)
    }
  }

  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !companyName) return
    setIsProcessing(true)
    setProcessingStage(1)

    setTimeout(() => {
      setProcessingStage(2)
      setTimeout(() => {
        setProcessingStage(3)
        setTimeout(() => {
          setProcessingStage(4)
          setTimeout(() => {
            setIsProcessing(false)
            setIsComplete(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }, 800)
        }, 900)
      }, 1000)
    }, 1100)
  }

  const downloadReceipt = () => {
    const receiptText = `========================================================================
                     USERMIMIC TECHNOLOGIES, INC.
                 ENTERPRISE SUBSCRIPTION ORDER RECEIPT
========================================================================
Order Reference: ORD-2026-${Math.floor(10000 + Math.random() * 90000)}
Invoice Number:  INV-${Math.floor(100000 + Math.random() * 900000)}
Issue Date:      ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Account Status:  ACTIVE 14-DAY ENTERPRISE EVALUATION ($0.00 DUE TODAY)

------------------------------------------------------------------------
1. CUSTOMER IDENTITY & TENANT CONFIGURATION
------------------------------------------------------------------------
Organization:     ${companyName || 'Acme Technologies, Inc.'}
Administrator:    ${email || 'alex@acme-corp.com'}
Workspace Domain: https://${orgSlug || 'acme-corp'}.usermimic.tech
Assigned Region:  ${region} (Dedicated Isolated Virtual Private Cloud)
SSO Protocol:     ${enableSso ? 'SAML 2.0 / Okta / Google Workspace Active' : 'Native Tokenized mTLS'}

------------------------------------------------------------------------
2. SUBSCRIPTION ENTITLEMENTS
------------------------------------------------------------------------
Plan Tier:        UserMimic ${selectedPlan}
Billing Cadence:  ${billingCycle.toUpperCase()} (Billed Annually at -$${annualBilledAmount}.00 after trial)
Monthly Quota:    ${planRates[selectedPlan].runs} Autonomous Multimodal Vision Inferences
Worker Capacity:  ${planRates[selectedPlan].workers}
Seat Licenses:    Unlimited Engineering Contributors (Zero Per-Seat Tax)
Engine Access:    Optical Reticle Multimodal Swarm + Visual Regression Export
Security SLA:     ${planRates[selectedPlan].support}

------------------------------------------------------------------------
3. FINANCIAL AUDIT & CHARGE LEDGER
------------------------------------------------------------------------
Itemized Description                                             Amount
------------------------------------------------------------------------
UserMimic ${selectedPlan} Subscription (${billingCycle})                 $${billingCycle === 'annual' ? annualBilledAmount : effectiveRate}.00 USD
14-Day Zero-Risk Full Evaluation Credit                         -$${billingCycle === 'annual' ? annualBilledAmount : effectiveRate}.00 USD
Dedicated VPC Runner Cluster Allocation Fee                               $0.00 (WAIVED)
Estimated Sales Tax (0.00%)                                               $0.00
------------------------------------------------------------------------
TOTAL BILLED TODAY:                                              $0.00 USD
------------------------------------------------------------------------
First Scheduled Billing: ${trialEndDate} ($${effectiveRate}.00/mo)
Payment Verification: Tokenized Hold on ${paymentMethod === 'card' ? `${getCardBrand(cardNumber)} ending in ${cardNumber.slice(-4)}` : paymentMethod.toUpperCase()}

------------------------------------------------------------------------
4. COMPLIANCE & LEGAL CERTIFICATION
------------------------------------------------------------------------
- SOC 2 Type II In-Audit // ISO/IEC 27001 Certified
- Zero Data Retention (ZDR): Customer DOM / screenshots processed in-memory only
- Master Services Agreement: https://usermimic.tech/#legal-terms
- Enterprise Privacy Policy: https://usermimic.tech/#legal-privacy

Questions or Accounts Payable: garv@usermimic.tech
UserMimic Technologies, Inc.
548 Market St, Suite 39201, San Francisco, CA 94104
========================================================================`

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `UserMimic_Invoice_${(companyName || 'Acme').replace(/[^a-z0-9]/gi, '_')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-[#E1E0CC] selection:bg-primary selection:text-black">
      {/* Top Checkout Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to UserMimic</span>
          </button>

          <div className="flex items-center gap-3">
            <Logo size={26} />
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#E1E0CC] border border-white/10 hidden sm:inline">
              Enterprise Cloud Checkout
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
            <span className="hidden md:inline text-[11px] text-gray-500">PCI-DSS Level 1</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[11px]">256-Bit SSL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {isComplete ? (
          /* SUCCESS VIEW: ORDER CONFIRMED & TENANT PROVISIONED */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#0d0d12] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Order Confirmed // Zero Charged Today
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">
                Enterprise Tenant Successfully Provisioned
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-lg mx-auto">
                Your dedicated <strong className="text-primary">{selectedPlan}</strong> evaluation sandbox in <strong className="text-primary">{region}</strong> is online. Setup credentials and runner tokens have been dispatched to <strong className="text-primary">{email}</strong>.
              </p>
            </div>

            {/* Official Itemized Receipt Card */}
            <div className="bg-[#050508] border border-white/10 rounded-2xl p-6 text-left font-mono text-xs space-y-3">
              <div className="flex justify-between text-gray-400 pb-2 border-b border-white/10">
                <span>Order Reference:</span>
                <span className="text-[#E1E0CC]">ORD-2026-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Organization Workspace:</span>
                <span className="text-primary font-semibold">{orgSlug || 'acme-corp'}.usermimic.tech</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Assigned Cloud VPC:</span>
                <span className="text-gray-300">{region} (Isolated Firecracker Pods)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Evaluation Window:</span>
                <span className="text-emerald-400">14-Day Free Evaluation Active</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>First Billing Date:</span>
                <span className="text-gray-300">{trialEndDate} (${effectiveRate}.00/mo)</span>
              </div>
              <div className="flex justify-between text-gray-400 pt-3 border-t border-white/10 text-sm">
                <span className="font-bold text-[#E1E0CC]">Amount Billed Today:</span>
                <span className="text-emerald-400 font-bold text-base">$0.00 USD</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 leading-relaxed max-w-md mx-auto">
              A formal tax invoice and W-9 form has been sent to your administrative email. Need custom procurement terms or direct vendor onboarding? Contact <a href="mailto:garv@usermimic.tech" className="text-primary hover:underline">garv@usermimic.tech</a>.
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={downloadReceipt}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#17171d] hover:bg-[#202027] border border-white/10 text-[#E1E0CC] font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>Download Invoice Receipt (.txt)</span>
              </button>

              {onOpenConsole && (
                <button
                  onClick={onOpenConsole}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary hover:bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Lock className="w-4 h-4" />
                  <span>Access Enterprise Console</span>
                </button>
              )}

              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 font-medium text-xs transition-all"
              >
                Return to Overview
              </button>
            </div>
          </motion.div>
        ) : isProcessing ? (
          /* PROVISIONING ANIMATION HUD */
          <div className="max-w-lg mx-auto py-20 text-center space-y-8 font-mono">
            <div className="relative w-16 h-16 mx-auto">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Server className="w-6 h-6 text-primary/70" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] text-primary tracking-widest uppercase font-semibold">
                Telemetry Provisioning Stream
              </span>
              <h3 className="text-lg font-bold text-[#E1E0CC]">
                Deploying Isolated Swarm Runner Tenant...
              </h3>
              <div className="text-xs text-gray-400 space-y-2 text-left max-w-md mx-auto p-5 bg-[#0d0d12] border border-white/10 rounded-2xl shadow-xl">
                <p className={processingStage >= 1 ? 'text-primary' : 'text-gray-600'}>
                  {processingStage >= 1 ? '✓' : '○'} [1/4] Authorizing payment method & token hold ($0.00)...
                </p>
                <p className={processingStage >= 2 ? 'text-primary' : 'text-gray-600'}>
                  {processingStage >= 2 ? '✓' : '○'} [2/4] Allocating dedicated Firecracker microVM cluster in {region}...
                </p>
                <p className={processingStage >= 3 ? 'text-primary' : 'text-gray-600'}>
                  {processingStage >= 3 ? '✓' : '○'} [3/4] Generating mTLS certificates & GitHub Actions runner secrets...
                </p>
                <p className={processingStage >= 4 ? 'text-primary' : 'text-gray-600'}>
                  {processingStage >= 4 ? '✓' : '○'} [4/4] Activating 14-day zero-risk evaluation window...
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* MAIN TWO-COLUMN ENTERPRISE CHECKOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: SUBSCRIPTION TIER & ITEMIZED PRICING */}
            <div className="lg:col-span-5 bg-[#0d0d12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d89c56] font-bold">
                    Subscription Tier
                  </span>
                  {/* Tier selector pills */}
                  <div className="flex items-center gap-1 p-0.5 bg-black rounded-lg border border-white/10 text-[11px]">
                    {(['Starter', 'Growth', 'Enterprise'] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedPlan(tier)}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          selectedPlan === tier
                            ? 'bg-primary text-black font-bold'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-[#E1E0CC]">
                    UserMimic {selectedPlan}
                  </h3>
                  {selectedPlan === 'Growth' && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-semibold">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Autonomous multimodal vision swarm agents for continuous QA & regression testing.
                </p>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="p-3 bg-black/60 border border-white/5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#E1E0CC] block">
                    Billing Cycle
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Annual includes 2 months free
                  </span>
                </div>

                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
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
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                      billingCycle === 'annual'
                        ? 'bg-primary text-black font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono font-bold">
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Itemized Plan Features */}
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>{planRates[selectedPlan].runs}</strong> autonomous simulation runs / month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>{planRates[selectedPlan].workers}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Unlimited Dev Seats</strong> (Zero per-seat licensing friction)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Multimodal UI layout & visual friction detection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Automated WebM video & Playwright script repro export</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{planRates[selectedPlan].support}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enterprise promo or partner code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#050508] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-400 font-mono mt-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Code applied: 20% Founder Partner Discount active
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400 font-mono mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>{selectedPlan} Plan ({billingCycle}):</span>
                  <span className="font-mono text-gray-200">
                    ${billingCycle === 'annual' ? annualBilledAmount : effectiveRate}.00 / {billingCycle === 'annual' ? 'yr' : 'mo'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>14-Day Free Evaluation Credit:</span>
                  <span className="font-mono text-emerald-400">
                    -${billingCycle === 'annual' ? annualBilledAmount : effectiveRate}.00
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>VPC Cluster Provisioning Fee:</span>
                  <span className="font-mono text-gray-400">$0.00 (Waived)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Sales Tax (0%):</span>
                  <span className="font-mono text-gray-400">$0.00</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-bold text-[#E1E0CC] block">Total Due Today:</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-medium">
                      Zero charge for 14 days
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">$0.00</span>
                    <span className="text-[10px] text-gray-500 block font-mono">
                      (Billed as ${effectiveRate}/mo starting {trialEndDate})
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 bg-black/60 rounded-2xl border border-white/5 text-[11px] text-gray-400 space-y-2">
                <div className="flex items-center gap-1.5 text-primary font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>14-Day Zero-Risk Evaluation Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  No charge today. If UserMimic does not eliminate your end-to-end test maintenance within 14 days, cancel inside your console with 1 click before {trialEndDate} and owe nothing.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: ENTERPRISE CUSTOMER & PAYMENT DETAILS FORM */}
            <div className="lg:col-span-7 bg-[#0c0c10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleStartCheckout} className="space-y-6">
                {/* Step 1: Organization & Identity */}
                <div>
                  <h4 className="text-sm font-bold text-[#E1E0CC] mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-mono flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Organization &amp; Administrator Account</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono">Tenant Identity</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@acme-corp.com"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className="w-full bg-[#050508] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Company / Legal Entity Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Technologies, Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[#050508] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center justify-between">
                      <span>Assigned Organization Slug</span>
                      <span className="text-[10px] text-emerald-400 font-mono">✓ Subdomain Available</span>
                    </label>
                    <div className="flex items-center bg-[#050508] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono">
                      <span className="text-gray-500">app.usermimic.tech/org/</span>
                      <input
                        type="text"
                        placeholder="acme-corp"
                        value={orgSlug}
                        onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="bg-transparent text-primary focus:outline-none flex-1 ml-0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Dedicated Cloud Region */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-[#E1E0CC] mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-mono flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Dedicated Sandbox Cloud Region</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono">Isolated VPC</span>
                  </h4>

                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                  >
                    <option value="us-east-1">AWS us-east-1 (N. Virginia, US — Low Latency Default)</option>
                    <option value="eu-central-1">AWS eu-central-1 (Frankfurt, Germany — GDPR Compliant)</option>
                    <option value="us-west-2">AWS us-west-2 (Oregon, US)</option>
                    <option value="gcp-us-central1">Google Cloud us-central1 (Iowa, US)</option>
                    <option value="azure-eastus">Microsoft Azure (East US)</option>
                  </select>

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <input
                      type="checkbox"
                      id="enableSsoCheck"
                      checked={enableSso}
                      onChange={(e) => setEnableSso(e.target.checked)}
                      className="rounded border-white/20 bg-black accent-[#d89c56]"
                    />
                    <label htmlFor="enableSsoCheck" className="cursor-pointer">
                      Enable Enterprise Single Sign-On (Okta / Google Workspace SAML 2.0)
                    </label>
                  </div>
                </div>

                {/* Step 3: Payment Method Verification */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-[#E1E0CC] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-mono flex items-center justify-center font-bold">
                        3
                      </span>
                      <span>Payment Method Verification</span>
                    </h4>

                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PCI-DSS Compliant
                    </span>
                  </div>

                  {/* Payment Method Switcher */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-white/10 border-primary text-[#E1E0CC]'
                          : 'bg-[#050508] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-primary" />
                      <span>Corporate Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ach')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'ach'
                          ? 'bg-white/10 border-primary text-[#E1E0CC]'
                          : 'bg-[#050508] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5 text-primary" />
                      <span>US ACH Debit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('invoice')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'invoice'
                          ? 'bg-white/10 border-primary text-[#E1E0CC]'
                          : 'bg-[#050508] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>NET-30 PO</span>
                    </button>
                  </div>

                  {/* CARD INPUTS */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-[#050508] border border-white/10 rounded-2xl space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] text-gray-400">
                            Card Number (Corporate Credit / Debit)
                          </label>
                          <span className="text-[10px] font-mono font-bold text-primary">
                            {getCardBrand(cardNumber)}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4242 •••• •••• 4242"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                            <span className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-gray-300 font-mono font-bold">VISA</span>
                            <span className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-gray-300 font-mono font-bold">MC</span>
                            <span className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-gray-300 font-mono font-bold">AMEX</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Expiration</label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Security Code (CVC)</label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="842"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Cardholder Full Name</label>
                          <input
                            type="text"
                            placeholder="Alex Morgan"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Billing Postal Code</label>
                          <input
                            type="text"
                            placeholder="94107"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-500 pt-1 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>This card will be held with $0.00 authorization. No charges occur until day 15.</span>
                      </div>
                    </div>
                  )}

                  {/* ACH INPUTS */}
                  {paymentMethod === 'ach' && (
                    <div className="p-4 bg-[#050508] border border-white/10 rounded-2xl space-y-3">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Depository Financial Institution</label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">ABA Routing Number</label>
                          <input
                            type="text"
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Account Number</label>
                          <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Authorized through NACHA / Plaid Direct Connect. Zero ACH debits will occur during the 14-day evaluation.
                      </p>
                    </div>
                  )}

                  {/* INVOICE INPUTS */}
                  {paymentMethod === 'invoice' && (
                    <div className="p-4 bg-[#050508] border border-white/10 rounded-2xl space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Corporate PO Number</label>
                          <input
                            type="text"
                            value={poNumber}
                            onChange={(e) => setPoNumber(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Accounts Payable Email</label>
                          <input
                            type="email"
                            value={apEmail}
                            onChange={(e) => setApEmail(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary/60"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Tax ID / EIN / VAT Number</label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary/60"
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Invoices dispatched with NET-30 terms upon conclusion of the 14-day evaluation window. Vendor registration forms or security questionnaires can be sent to <a href="mailto:garv@usermimic.tech" className="text-primary underline">garv@usermimic.tech</a>.
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 4: Legal Consent & Submit */}
                <div className="pt-2 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-black accent-[#d89c56]"
                  />
                  <label htmlFor="termsAgreement" className="text-[11px] text-gray-400 leading-relaxed cursor-pointer">
                    I represent that I am authorized to bind {companyName || 'my company'} to the UserMimic Master Subscription Agreement, Enterprise Privacy Policy, and 14-day evaluation trial terms. I understand that <strong className="text-[#E1E0CC]">$0.00 will be billed today</strong>.
                  </label>
                </div>

                {/* Big Submit Button */}
                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full py-4 rounded-full bg-primary hover:bg-white text-black font-bold text-sm transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4" />
                  <span>Start 14-Day Free Evaluation ($0.00 Due Today)</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono">
                  <span>Zero-Retention Processing</span>
                  <span>•</span>
                  <span>SOC 2 Type II Audited</span>
                  <span>•</span>
                  <span>Instant 1-Click Cancellation</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
