import React, { useState, useEffect } from 'react'
import { Navbar, TabId } from './components/Navbar'
import { Hero } from './components/Hero'
import { Thesis } from './components/Thesis'
import { PersonasPage } from './components/PersonasPage'
import { VisionEnginePage } from './components/VisionEnginePage'
import { SimulatorPage } from './components/SimulatorPage'
import { PricingPage } from './components/PricingPage'
import { DemoModal } from './components/DemoModal'
import { AsciiFluid } from './components/ui/ascii-fluid'
import BeamWordmarkFooter from './components/ui/beam-wordmark-footer'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

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
    if (href?.startsWith('#')) {
      const target = href.replace('#', '') as TabId
      if (['home', 'personas', 'engine', 'simulator', 'pricing'].includes(target)) {
        handleSelectTab(target)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (label.toLowerCase().includes('demo') || label.toLowerCase().includes('console')) {
      setIsDemoModalOpen(true)
    }
  }

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black flex flex-col justify-between">
      {/* Floating Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Body */}
      <main className="w-full flex-1">
        {/* HERO SECTION (Rendered on Home Overview) */}
        {activeTab === 'home' && (
          <Hero
            onStartSimulation={() => setIsDemoModalOpen(true)}
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
                <PricingPage onSelectPlan={() => setIsDemoModalOpen(true)} />
              </>
            )}

            {activeTab === 'personas' && (
              <PersonasPage onLaunchSimulator={() => handleSelectTab('simulator')} />
            )}

            {activeTab === 'engine' && <VisionEnginePage />}

            {activeTab === 'simulator' && <SimulatorPage />}

            {activeTab === 'pricing' && (
              <PricingPage onSelectPlan={() => setIsDemoModalOpen(true)} />
            )}
          </div>
        </div>
      </main>

      {/* BEAM WORDMARK FOOTER (Warm Golden Amber & Cream Palette Matching Hero) */}
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
        columns={[
          {
            title: 'Platform',
            links: [
              { label: 'Autonomous Personas', href: '#personas' },
              { label: 'Vision Engine', href: '#engine' },
              { label: 'Live Telemetry', href: '#simulator' },
              { label: 'Pricing & Plans', href: '#pricing' },
            ],
          },
          {
            title: 'Developers & CI/CD',
            links: [
              { label: 'GitHub Actions Integration', href: '#engine' },
              { label: 'Zero Selector Specs', href: '#engine' },
              { label: 'Interactive Sandbox', href: '#simulator' },
              { label: 'SOC2 & Security', href: '#pricing' },
            ],
          },
        ]}
      />

      {/* Interactive Launch Console Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onLaunchSimulation={(url, persona) => {
          handleSelectTab('simulator')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </div>
  )
}
