import React, { useState, useEffect } from 'react'
import { Navbar, TabId } from './components/Navbar'
import { Hero } from './components/Hero'
import { Thesis } from './components/Thesis'
import { PersonasPage } from './components/PersonasPage'
import { VisionEnginePage } from './components/VisionEnginePage'
import { SimulatorPage } from './components/SimulatorPage'
import { PricingPage } from './components/PricingPage'
import { ConsoleLockModal } from './components/ConsoleLockModal'
import { PlanCheckoutModal } from './components/PlanCheckoutModal'
import { LegalModal, LegalDocType } from './components/LegalModal'
import { ComplianceTrustBar } from './components/ComplianceTrustBar'
import { AsciiFluid } from './components/ui/ascii-fluid'
import BeamWordmarkFooter from './components/ui/beam-wordmark-footer'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [isConsoleLockOpen, setIsConsoleLockOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Growth')
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null)

  // Sync tab with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId
      if (['home', 'personas', 'engine', 'simulator', 'pricing'].includes(hash)) {
        setActiveTab(hash)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab)
    window.location.hash = tab === 'home' ? '' : tab
  }

  const handleFooterLinkClick = (label: string, href?: string) => {
    if (href?.startsWith('#legal-')) {
      const doc = href.replace('#legal-', '') as LegalDocType
      setLegalDoc(doc)
      return
    }

    if (href?.startsWith('#')) {
      const target = href.replace('#', '') as TabId
      if (['home', 'personas', 'engine', 'simulator', 'pricing'].includes(target)) {
        handleSelectTab(target)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }

    const lower = label.toLowerCase()
    if (lower.includes('terms')) {
      setLegalDoc('terms')
    } else if (lower.includes('privacy') || lower.includes('gdpr') || lower.includes('dpa')) {
      setLegalDoc('privacy')
    } else if (lower.includes('soc') || lower.includes('security') || lower.includes('whitepaper')) {
      setLegalDoc('security')
    } else if (lower.includes('console') || lower.includes('beta') || lower.includes('demo') || lower.includes('vpc')) {
      setIsConsoleLockOpen(true)
    }
  }

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black flex flex-col justify-between">
      {/* Floating Top Navbar with Lock Icon & Direct Email */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenDemo={() => setIsConsoleLockOpen(true)}
      />

      {/* Main Body */}
      <main className="w-full flex-1">
        {/* HERO SECTION (Rendered on Home Overview) */}
        {activeTab === 'home' && (
          <Hero
            onStartSimulation={() => setIsConsoleLockOpen(true)}
            onExplorePersonas={() => {
              handleSelectTab('personas')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

        {/* CONTINUOUS ASCII FLUID CANVAS SECTION */}
        <div className={`relative w-full bg-black overflow-hidden ${activeTab !== 'home' ? 'pt-20 sm:pt-24' : ''}`}>
          {/* Shared Continuous WebGL ASCII Fluid Canvas Background */}
          <AsciiFluid
            theme="dark"
            backgroundColor="#000000"
            color="#DEDBC8"
            cellSize={12}
            force={1.1}
            dissipation={0.045}
            brush={0.55}
            animate={true}
            interactive={true}
            className="absolute inset-0 w-full h-full z-0 opacity-80"
          />

          {/* Page Views Switcher */}
          <div className="relative z-10">
            {activeTab === 'home' && (
              <>
                <Thesis />
                <PersonasPage onLaunchSimulator={() => handleSelectTab('simulator')} />
                <VisionEnginePage />
                <SimulatorPage />
                <PricingPage
                  onSelectPlan={(plan) => {
                    setSelectedPlan(plan)
                    setIsCheckoutOpen(true)
                  }}
                />
              </>
            )}

            {activeTab === 'personas' && (
              <PersonasPage onLaunchSimulator={() => handleSelectTab('simulator')} />
            )}

            {activeTab === 'engine' && <VisionEnginePage />}

            {activeTab === 'simulator' && <SimulatorPage />}

            {activeTab === 'pricing' && (
              <PricingPage
                onSelectPlan={(plan) => {
                  setSelectedPlan(plan)
                  setIsCheckoutOpen(true)
                }}
              />
            )}
          </div>
        </div>

        {/* ENTERPRISE COMPLIANCE, SOC 2, ISO, HIPAA & AWARDS BAR */}
        <ComplianceTrustBar onOpenLegal={(doc) => setLegalDoc(doc)} />
      </main>

      {/* BEAM WORDMARK FOOTER (Warm Golden Amber & Cream Palette) */}
      <BeamWordmarkFooter
        brand="UserMimic"
        wordmark="UserMimic"
        company="UserMimic Technologies Inc."
        onLinkClick={handleFooterLinkClick}
        background="#000000"
        ink="#E1E0CC"
        muted="#9a9483"
        accent="#d89c56"
        wordTop="#c89656"
        wordFoot="#16120b"
        cut={0.14}
        socials={[
          { label: "Crunchbase", href: "https://www.crunchbase.com/organization/usermimic", icon: "github" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/usermimic", icon: "linkedin" },
          { label: "X (Twitter)", href: "https://x.com", icon: "x" },
        ]}
        credits={[
          {
            lead: "© 2024–2026 UserMimic, Inc. All rights reserved. UserMimic™, the optical reticle emblem, and Vision Swarm™ are registered trademarks or trademarks of UserMimic, Inc.",
            label: "",
          },
          {
            lead: "SOC 2 Type II In-Audit // ISO 27001 Certified // Direct Support: ",
            label: "garv@usermimic.tech",
            href: "mailto:garv@usermimic.tech",
          },
        ]}
        columns={[
          {
            title: 'Platform',
            links: [
              { label: 'Autonomous Personas', href: '#personas' },
              { label: 'Vision Engine Architecture', href: '#engine' },
              { label: 'Live Telemetry Sandbox', href: '#simulator' },
              { label: 'Pricing & ROI Calculator', href: '#pricing' },
              { label: 'Enterprise VPC Runners', href: '#console' },
            ],
          },
          {
            title: 'Security & Compliance',
            links: [
              { label: 'SOC 2 Type II Audit Report', href: '#legal-security' },
              { label: 'ISO/IEC 27001 Controls', href: '#legal-security' },
              { label: 'Data Processing Addendum (DPA)', href: '#legal-privacy' },
              { label: 'GDPR & CCPA Safeguards', href: '#legal-privacy' },
              { label: 'Security Architecture Whitepaper', href: '#legal-security' },
            ],
          },
          {
            title: 'Legal & Governance',
            links: [
              { label: 'Master Terms of Service', href: '#legal-terms' },
              { label: 'Enterprise Privacy Policy', href: '#legal-privacy' },
              { label: 'Zero-Retention AI Guarantee', href: '#legal-security' },
              { label: 'Acceptable Use Policy', href: '#legal-terms' },
              { label: 'Trademark & IP Guidelines', href: '#legal-terms' },
            ],
          },
          {
            title: 'Company & Contact',
            links: [
              { label: 'Founder & Engineering Team', href: 'https://www.linkedin.com/company/usermimic' },
              { label: 'Crunchbase Profile', href: 'https://www.crunchbase.com/organization/usermimic' },
              { label: 'LinkedIn Company Page', href: 'https://www.linkedin.com/company/usermimic' },
              { label: 'Direct: garv@usermimic.tech', href: 'mailto:garv@usermimic.tech' },
              { label: 'Security DPO Office', href: 'mailto:garv@usermimic.tech?subject=DPO%20Inquiry' },
            ],
          },
        ]}
      />

      {/* LOCKED ENTERPRISE CONSOLE & CLOSED BETA GATE MODAL */}
      <ConsoleLockModal
        isOpen={isConsoleLockOpen}
        onClose={() => setIsConsoleLockOpen(false)}
      />

      {/* REALISTIC PLAN CHECKOUT & PROVISIONING MODAL */}
      <PlanCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* FULL LEGAL DOCUMENT MODAL (Terms, Privacy, Security Whitepaper) */}
      <LegalModal
        isOpen={Boolean(legalDoc)}
        onClose={() => setLegalDoc(null)}
        docType={legalDoc || 'terms'}
      />
    </div>
  )
}
