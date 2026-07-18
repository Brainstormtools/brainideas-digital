import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data';

interface FAQSectionProps {
  faqRef: React.RefObject<HTMLDivElement | null>;
}

export default function FAQSection({ faqRef }: FAQSectionProps) {
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section 
      ref={faqRef}
      id="faq" 
      className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Got Questions?</span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 hover:border-indigo-100/60 dark:hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button 
                id={`faq-btn-${index}`}
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-t-2xl"
                aria-expanded={!!openFaqIndices[index]}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-bold text-slate-950 dark:text-slate-100 text-sm sm:text-base font-display">
                  {faq.question}
                </span>
                <div className={`p-1.5 bg-slate-50 dark:bg-slate-950 rounded-lg text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800/60 transition-all duration-300 ${openFaqIndices[index] ? 'rotate-180 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border-indigo-100 dark:border-indigo-900/60' : ''}`}>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openFaqIndices[index] && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 dark:border-slate-850 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
