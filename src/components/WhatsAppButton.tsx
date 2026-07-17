import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      id="floating-whatsapp-trigger"
      href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital! I'm interested in getting a conversion-first website built for my business. Can we talk?")}`}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
      aria-label="Chat with BrainIdeas Digital on WhatsApp"
    >
      <MessageSquare className="w-5 h-5" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-semibold tracking-wide">WhatsApp Support</span>
    </a>
  );
}
