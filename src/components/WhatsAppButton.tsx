import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestQuote = () => {
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      const header = document.querySelector('[data-main-header]') as HTMLElement | null;
      const headerHeight = header ? header.offsetHeight : 64;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Mobile Sticky CTA Bar (visible on extra small/small screens only) */}
      <div 
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 animate-in slide-in-from-bottom"
        id="mobile-sticky-action-bar"
      >
        <a
          id="mobile-action-whatsapp"
          href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital! I'm interested in getting a conversion-first website built for my business. Can we talk?")}`}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          aria-label="Start Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Start Chat</span>
        </a>
        <button
          id="mobile-action-quote"
          onClick={handleRequestQuote}
          className="flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Request Quote Consultation"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" aria-hidden="true" />
          <span>Request Quote</span>
        </button>
      </div>

      {/* Desktop Floating Action Badge (hidden on mobile, visible on sm: and larger) */}
      <a
        id="floating-whatsapp-trigger"
        href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital! I'm interested in getting a conversion-first website built for my business. Can we talk?")}`}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
        aria-label="Chat with BrainIdeas Digital on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        <span className="text-sm font-semibold tracking-wide">WhatsApp Support</span>
      </a>
    </>
  );
}
