import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Zap } from 'lucide-react';

interface MobileFloatingCtaProps {
  handleNavigation: (sectionId: string) => void;
  getWhatsAppLink: () => string;
}

export default function MobileFloatingCta({
  handleNavigation,
  getWhatsAppLink
}: MobileFloatingCtaProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 p-3 z-40 flex items-center gap-3 sm:hidden shadow-lg transition-colors duration-300"
    >
      {/* Scroll to Consultation Form Button */}
      <button
        id="mobile-floating-quote"
        onClick={() => handleNavigation('contact')}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer focus:outline-none"
      >
        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" aria-hidden="true" />
        <span>Request Quote</span>
      </button>

      {/* Instant WhatsApp Chat Button */}
      <a
        id="mobile-floating-chat"
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer focus:outline-none"
      >
        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Start Chat</span>
      </a>
    </motion.div>
  );
}
