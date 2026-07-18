import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleNavigation: (sectionId: string) => void;
  onMobileMenuExitComplete?: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleNavigation,
  onMobileMenuExitComplete,
  darkMode,
  toggleDarkMode
}: HeaderProps) {
  const menuTriggerRef = React.useRef<HTMLButtonElement>(null);

  // Close menu on pressing Escape
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Return focus to menu trigger button after closing
  const prevOpenRef = React.useRef(mobileMenuOpen);
  React.useEffect(() => {
    if (prevOpenRef.current && !mobileMenuOpen) {
      menuTriggerRef.current?.focus();
    }
    prevOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Close menu automatically when screen is resized to desktop width (min-width: 1024px)
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    if (mediaQuery.matches) {
      setMobileMenuOpen(false);
    }
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [setMobileMenuOpen]);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-950 text-slate-300 py-2 px-4 text-[11px] md:text-xs text-center font-medium border-b border-slate-900 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full text-[9px] tracking-wider uppercase font-bold font-mono">Free Audit</span>
          <span className="text-slate-300 font-normal">Get a professional 10-minute website & Google Business audit.</span>
          <a 
            id="announcement-cta"
            href="https://api.whatsapp.com/send?phone=923377105205&text=Hi%20BrainIdeas%20Digital%2C%20I%20would%20like%20to%20request%20a%20manual%20review%20of%20my%20business%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-0.5 font-bold uppercase tracking-wider text-[10px] font-mono ml-1 cursor-pointer focus:outline-none"
          >
            Request Now <ArrowRight className="w-3 h-3 text-indigo-400" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header data-main-header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 shadow-sm transition-all duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              id="header-logo-container"
              className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1" 
              onClick={() => handleNavigation('home')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigation('home');
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="BrainIdeas Digital Home"
            >
              <img
                src="/brainideas-logo-512.png?v=20260710-4"
                alt="BrainIdeas Digital Logo"
                className="h-8 w-8 object-contain rounded-md"
                width="32"
                height="32"
              />
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold font-display tracking-tight text-slate-950 dark:text-white leading-tight animate-fade-in">
                  BrainIdeas<span className="text-indigo-600 dark:text-indigo-400"> Digital</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold font-mono leading-none">Digital Agency</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium" aria-label="Primary Desktop Navigation">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'Industries', id: 'industries' },
                { label: 'Process', id: 'process' },
                { label: 'Packages', id: 'packages' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'FAQ', id: 'faq' }
              ].map((item) => (
                <button
                  key={item.id}
                  id={`desktop-nav-${item.id}`}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded px-1.5 ${
                    activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Contact & Dark Mode Toggle Quick Action */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                id="header-dark-mode-toggle"
                onClick={toggleDarkMode}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-500 animate-spin-slow" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
              </button>

              <button 
                id="header-consult-button"
                onClick={() => handleNavigation('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Consultation
              </button>
            </div>

            {/* Mobile Actions (Menu & Dark Mode) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="mobile-dark-mode-toggle"
                onClick={toggleDarkMode}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
              </button>

              <button 
                id="mobile-menu-trigger"
                ref={menuTriggerRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence onExitComplete={onMobileMenuExitComplete}>
          {mobileMenuOpen && (
            <MobileNavigation
              open={mobileMenuOpen}
              activeSection={activeSection}
              setMobileMenuOpen={setMobileMenuOpen}
              handleNavigation={handleNavigation}
            />
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
