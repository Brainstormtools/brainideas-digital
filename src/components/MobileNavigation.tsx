import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare } from 'lucide-react';

interface MobileNavigationProps {
  open: boolean;
  activeSection: string;
  setMobileMenuOpen: (open: boolean) => void;
  handleNavigation: (sectionId: string) => void;
}

export default function MobileNavigation({
  open,
  activeSection,
  setMobileMenuOpen,
  handleNavigation
}: MobileNavigationProps) {
  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!open) return null;

  return (
    <motion.div 
      id="mobile-navigation"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="lg:hidden absolute left-0 right-0 top-full border-t border-slate-100 bg-white overflow-y-auto max-h-[calc(100vh-5.5rem)] shadow-xl z-30 scrollbar-thin"
      role="navigation"
      aria-label="Mobile Navigation Menu"
    >
      <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
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
            id={`mobile-nav-${item.id}`}
            onClick={() => handleNavigation(item.id)}
            className={`text-left py-3 px-4 rounded-xl text-base font-medium transition-colors flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              activeSection === item.id
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
        <div className="pt-4 grid grid-cols-2 gap-3 px-4">
          <a 
            id="mobile-call-button"
            href="tel:+923377105205"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-3 rounded-xl border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Phone className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <span>Call Us</span>
          </a>
          <a 
            id="mobile-whatsapp-button"
            href="https://api.whatsapp.com/send?phone=923377105205"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
