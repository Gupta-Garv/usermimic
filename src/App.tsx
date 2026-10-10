import React, { useState, useEffect } from 'react'
import { Navbar, TabId } from './components/Navbar'
import { Hero } from './components/Hero'
import { Thesis } from './components/Thesis'
import { PersonasPage } from './components/PersonasPage'
import { VisionEnginePage } from './components/VisionEnginePage'
import { PricingPage } from './components/PricingPage'
import { About } from './components/About'
import { CheckoutPage } from './components/CheckoutPage'
import { ConsoleLockModal } from './components/ConsoleLockModal'
import { LegalModal, LegalDocType } from './components/LegalModal'
import { DocsModal } from './components/DocsModal'
import { ComplianceTrustBar } from './components/ComplianceTrustBar'
import { AsciiFluid } from './components/ui/ascii-fluid'
import BeamWordmarkFooter from './components/ui/beam-wordmark-footer'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [isConsoleLockOpen, setIsConsoleLockOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Growth')
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null)

  // Sync tab and modal with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'checkout') {
        setIsCheckoutOpen(true)
        return
      }
      if (hash === 'docs' || hash === 'api') {
        setIsDocsOpen(true)
        return
      }
      if (hash.startsWith('legal-')) {
        const doc = hash.replace('legal-', '') as LegalDocType
        setLegalDoc(doc)
        return
      }
      if (hash === 'whitepaper' || hash === 'benchmark') {
        setLegalDoc('whitepaper')
        return
      }
      if (['home', 'personas', 'engine', 'pricing', 'company'].includes(hash)) {
        setActiveTab(hash as TabId)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectTab = (tab: TabId) => {
    setIsCheckoutOpen(false)
    setActiveTab(tab)
    window.location.hash = tab === 'home' ? '' : tab
  }

  const handleOpenCheckout = (plan: string = 'Growth') => {
    setSelectedPlan(plan)
    setIsCheckoutOpen(true)
    window.location.hash = 'checkout'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    window.location.hash = activeTab === 'home' ? '' : activeTab
  }

  const handleFooterLinkClick = (label: string, href?: string) => {
    if (href?.startsWith('#legal-')) {
      const doc = href.replace('#legal-', '') as LegalDocType
      setLegalDoc(doc)
      return
    }

    if (href === '#whitepaper' || href === '#benchmark') {
      setLegalDoc('whitepaper')
      return
    }

    if (href === '#docs' || href === '#api') {
      setIsDocsOpen(true)
      return
    }

    if (href === '#checkout') {
      handleOpenCheckout(selectedPlan)
      return
    }

    if (href?.startsWith('#')) {
      const target = href.replace('#', '')
      if (target === 'checkout') {
        handleOpenCheckout(selectedPlan)
        return
      }
      if (target === 'docs' || target === 'api') {
        setIsDocsOpen(true)
        return
      }
      if (['home', 'personas', 'engine', 'pricing', 'company'].includes(target)) {
        handleSelectTab(target as TabId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }

    const lower = label.toLowerCase()
    if (lower.includes('checkout') || lower.includes('evaluation')) {
      handleOpenCheckout('Growth')
    } else if (lower.includes('whitepaper') || lower.includes('benchmark')) {
      setLegalDoc('whitepaper')
    } else if (lower.includes('doc') || lower.includes('sdk') || lower.includes('api')) {
      setIsDocsOpen(true)
    } else if (lower.includes('terms')) {
      setLegalDoc('terms')
    } else if (lower.includes('privacy') || lower.includes('gdpr') || lower.includes('dpa')) {
      setLegalDoc('privacy')
    } else if (lower.includes('soc') || lower.includes('security')) {
      setLegalDoc('security')
    } else if (lower.includes('console') || lower.includes('beta') || lower.includes('demo') || lower.includes('vpc')) {
      setIsConsoleLockOpen(true)
    }
  }

  // If Full-Page Checkout is active, render dedicated Checkout Page
  if (isCheckoutOpen) {
    return (
      <CheckoutPage
        initialPlan={selectedPlan}
        onBack={handleCloseCheckout}
        onOpenConsole={() => {
          handleCloseCheckout()
          setIsConsoleLockOpen(true)
        }}
      />
    )
  }

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black flex flex-col justify-between">
      {/* Floating Top Navbar */}
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
                <PersonasPage onOpenConsole={() => setIsConsoleLockOpen(true)} />
                <VisionEnginePage />
                <PricingPage onSelectPlan={handleOpenCheckout} />
                <About />
              </>
            )}

            {activeTab === 'personas' && (
              <PersonasPage onOpenConsole={() => setIsConsoleLockOpen(true)} />
            )}

            {activeTab === 'engine' && <VisionEnginePage />}

            {activeTab === 'pricing' && (
              <PricingPage onSelectPlan={handleOpenCheckout} />
            )}

            {activeTab === 'company' && <About />}
          </div>
        </div>

        {/* ENTERPRISE COMPLIANCE, SOC 2, ISO, HIPAA & AWARDS BAR */}
        <ComplianceTrustBar
          onOpenLegal={(doc) => setLegalDoc(doc)}
          onOpenDocs={() => setIsDocsOpen(true)}
        />
      </main>

      {/* BEAM WORDMARK FOOTER (Warm Golden Amber & Cream Palette) */}
      <BeamWordmarkFooter
        brand="UserMimic"
        wordmark="UserMimic"
        company="UserMimic Technologies"
        onLinkClick={handleFooterLinkClick}
        background="#000000"
        ink="#E1E0CC"
        muted="#9a9483"
        accent="#d89c56"
        wordTop="#c89656"
        wordFoot="#16120b"
        cut={0.14}
        socials={[
          { label: "GitHub", href: "https://github.com/Gupta-Garv/usermimic-action", icon: "github" },
          { label: "Crunchbase", href: "https://www.crunchbase.com/organization/usermimic", icon: "github" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/usermimic", icon: "linkedin" },
          { label: "X (Twitter)", href: "https://x.com", icon: "x" },
        ]}
        credits={[
          {
            lead: "© 2025–2026 UserMimic Technologies. Pune, India & Global Cloud Edge. All rights reserved. UserMimic™, the optical reticle emblem, and Vision Swarm™ are trademarks of UserMimic.",
            label: "",
          },
          {
            lead: "NVIDIA Inception Member // SOC 2 Type II In-Audit // ISO 27001 // ",
            label: "Architecture Whitepaper & Security Office",
            href: "#legal-whitepaper",
          },
        ]}
        columns={[
          {
            title: 'Platform',
            links: [
              { label: 'Autonomous Personas', href: '#personas' },
              { label: 'Vision Engine Architecture', href: '#engine' },
              { label: 'SDK & API Documentation', href: '#docs' },
              { label: 'GitHub Action (Open Source)', href: 'https://github.com/Gupta-Garv/usermimic-action' },
              { label: 'Enterprise Cloud Checkout', href: '#checkout' },
            ],
          },
          {
            title: 'Security & Research',
            links: [
              { label: 'Architecture Whitepaper & Benchmarks', href: '#legal-whitepaper' },
              { label: 'SOC 2 Type II Audit Report', href: '#legal-security' },
              { label: 'ISO/IEC 27001 Controls', href: '#legal-security' },
              { label: 'RFC 9116 security.txt Policy', href: '/security.txt' },
              { label: 'Data Processing Addendum (DPA)', href: '#legal-privacy' },
            ],
          },
          {
            title: 'Legal & Governance',
            links: [
              { label: 'Master Terms of Service', href: '#legal-terms' },
              { label: 'Enterprise Privacy Policy', href: '#legal-privacy' },
              { label: 'Zero-Retention AI Guarantee', href: '#legal-security' },
              { label: 'Acceptable Use Policy', href: '#legal-terms' },
              { label: 'NVIDIA Inception Compliance', href: '#legal-whitepaper' },
            ],
          },
          {
            title: 'Company & Ecosystem',
            links: [
              { label: 'About & Founding Mission', href: '#company' },
              { label: 'NVIDIA Inception Program', href: '#company' },
              { label: 'Developer Documentation', href: '#docs' },
              { label: 'Crunchbase Profile', href: 'https://www.crunchbase.com/organization/usermimic' },
              { label: 'LinkedIn Company Page', href: 'https://www.linkedin.com/company/usermimic' },
            ],
          },
        ]}
      />

      {/* LOCKED ENTERPRISE CONSOLE & CLOSED BETA GATE MODAL */}
      <ConsoleLockModal
        isOpen={isConsoleLockOpen}
        onClose={() => setIsConsoleLockOpen(false)}
      />

      {/* FULL LEGAL DOCUMENT MODAL (Terms, Privacy, Security Whitepaper) */}
      <LegalModal
        isOpen={Boolean(legalDoc)}
        onClose={() => setLegalDoc(null)}
        docType={legalDoc || 'terms'}
      />

      {/* DEVELOPER DOCUMENTATION & API REFERENCE MODAL */}
      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  )
}
