import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { ArrowRight, Menu, X, Terminal, Lock, Mail } from 'lucide-react'

export type TabId = 'home' | 'personas' | 'engine' | 'simulator' | 'pricing' | 'company'

interface NavbarProps {
  activeTab: TabId
  onSelectTab: (tab: TabId) => void
  onOpenDemo: () => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'personas', label: 'Personas' },
  { id: 'engine', label: 'Vision Engine' },
  { id: 'simulator', label: 'Simulator' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'company', label: 'Company' },
]

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDemo,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 pointer-events-none">
        {/* Brand Logo with Glass Pill */}
        <div
          onClick={() => {
            onSelectTab('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center shadow-2xl transition-all hover:border-primary/40 hover:scale-[1.02]"
        >
          <Logo size={28} />
        </div>

        {/* Center Hanging Pill Navigation (Desktop) */}
        <nav
          className="pointer-events-auto hidden md:flex items-center bg-black/85 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl"
          aria-label="Main Navigation"
        >
          <div className="flex items-center gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-black'
                      : 'text-[#E1E0CC]/80 hover:text-[#E1E0CC]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPillIndicator"
                      className="absolute inset-0 bg-primary rounded-full shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Right Action CTA (Desktop) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3">
          <button
            onClick={() => onSelectTab('simulator')}
            className="flex items-center gap-2 bg-[#121214] hover:bg-[#1a1a1f] border border-white/10 text-[#E1E0CC] text-xs font-medium px-3.5 py-2 rounded-full transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>Live Terminal</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="group flex items-center gap-2 bg-primary hover:bg-[#eae8d8] text-black text-xs font-semibold pl-4 pr-1.5 py-1.5 rounded-full transition-all shadow-lg hover:shadow-primary/20"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Enterprise Console</span>
            <span className="bg-black text-[#E1E0CC] rounded-full w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="pointer-events-auto md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="bg-black/85 backdrop-blur-md border border-white/10 text-[#E1E0CC] p-2.5 rounded-full"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-16 z-40 bg-[#0d0d10] border border-white/10 rounded-3xl p-6 shadow-2xl md:hidden flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id)
                    setMobileOpen(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-black font-semibold'
                      : 'text-[#E1E0CC]/80 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onSelectTab('simulator')
                  setMobileOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#17171a] border border-white/10 text-[#E1E0CC] text-xs font-medium py-3 rounded-xl"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span>Open Live Terminal</span>
              </button>

              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenDemo()
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-black font-semibold text-xs py-3 rounded-xl shadow-lg"
              >
                <Lock className="w-4 h-4" />
                <span>Enterprise Console Access</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
