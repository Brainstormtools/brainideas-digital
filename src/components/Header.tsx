import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleNavigation: (sectionId: string) => void;
  onMobileMenuExitComplete?: () => void;
}

export default function Header({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleNavigation,
  onMobileMenuExitComplete
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
      <div className="bg-slate-950 text-slate-300 py-3 px-4 text-xs md:text-sm text-center font-medium border-b border-slate-900 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold font-mono">Update</span>
          <span>🚀 Turn your Google Business Profile into a conversion machine. Call & WhatsApp booking integrations standard.</span>
          <a 
            id="announcement-cta"
            href="https://api.whatsapp.com/send?phone=923377105205&text=Hi%20BrainIdeas%20Digital%2C%20I%20would%20like%20to%20request%20a%20manual%20review%20of%20my%20business%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline decoration-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 font-semibold ml-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
          >
            Get Free Audit <ArrowRight className="w-3 h-3 text-indigo-400" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header data-main-header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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
                src="/brainideas-logo.png?v=20260710-4"
                alt="BrainIdeas Digital Logo"
                className="h-10 w-10 object-contain rounded-md"
                width="40"
                height="40"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-950">
                  BrainIdeas<span className="text-indigo-600"> Digital</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-mono">Digital Agency</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" aria-label="Primary Desktop Navigation">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'Industries', id: 'industries' },
                { label: 'Process', id: 'process' },
                { label: 'Packages', id: 'packages' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  id={`desktop-nav-${item.id}`}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative py-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-md px-1 ${
                    activeSection === item.id ? 'text-indigo-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Contact quick call action */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                id="header-call-button"
                href="tel:+923377105205"
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Phone className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                <span>Call Us</span>
              </a>
              <button 
                id="header-consult-button"
                onClick={() => handleNavigation('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Request Consultation
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button 
              id="mobile-menu-trigger"
              ref={menuTriggerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
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
