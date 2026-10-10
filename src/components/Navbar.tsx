import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { ArrowRight, Menu, X, Lock } from 'lucide-react'

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

export type TabId = 'home' | 'personas' | 'engine' | 'pricing' | 'company'

interface NavbarProps {
  activeTab: TabId
  onSelectTab: (tab: TabId) => void
  onOpenDemo: () => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'personas', label: 'Personas' },
  { id: 'engine', label: 'Vision Engine' },
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
          className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center shadow-2xl transition-all hover:border-primary/40 hover:scale-[1.02] cursor-pointer"
        >
          <Logo size={28} />
        </div>

        {/* Center Hanging Pill Navigation (Desktop) - Mathematically Centered */}
        <nav
          className="pointer-events-auto hidden md:flex items-center md:absolute md:left-1/2 md:-translate-x-1/2 bg-black/85 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl"
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
        <div className="pointer-events-auto hidden md:flex items-center gap-2.5">
          <a
            href="https://github.com/Gupta-Garv/usermimic-action"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-black/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-lg"
            title="UserMimic GitHub Action"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">GitHub</span>
            <span className="text-[10px] font-mono text-[#76B900] bg-[#76B900]/10 px-1.5 py-0.5 rounded-full border border-[#76B900]/25">
              v1.2
            </span>
          </a>

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
                  setMobileOpen(false)
                  onOpenDemo()
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-black font-semibold text-xs py-3 rounded-xl shadow-lg"
              >
                <Lock className="w-4 h-4" />
                <span>Enterprise Console Access</span>
              </button>

              <a
                href="https://github.com/Gupta-Garv/usermimic-action"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-[#E1E0CC] py-2.5 rounded-xl transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Action v1.2 (Open Source)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
