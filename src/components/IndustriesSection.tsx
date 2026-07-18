import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { INDUSTRIES } from '../data';
import DynamicIcon from './DynamicIcon';

interface IndustriesSectionProps {
  handleNavigation: (sectionId: string) => void;
  industriesRef: React.RefObject<HTMLDivElement | null>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function IndustriesSection({
  handleNavigation,
  industriesRef,
  setFormData
}: IndustriesSectionProps) {
  const [industrySearch, setIndustrySearch] = useState('');

  const filteredIndustries = INDUSTRIES.filter(ind => 
    ind.name.toLowerCase().includes(industrySearch.toLowerCase()) || 
    ind.benefit.toLowerCase().includes(industrySearch.toLowerCase())
  );

  return (
    <section 
      ref={industriesRef}
      id="industries" 
      className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Industry Coverage</span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-2">
            Websites for Every Local Industry
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-normal">
            Find your industry below to see how our custom conversion-focused website structure optimizes your daily leads.
          </p>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </motion.div>

        {/* Filter Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-12 relative"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="industry-search-input"
            type="text"
            placeholder="Search your industry (e.g. Salon, Clinic, Cafe)..."
            value={industrySearch}
            onChange={(e) => setIndustrySearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium transition-all"
            aria-label="Search local business industries"
          />
          {industrySearch && (
            <button 
              id="clear-industry-search"
              onClick={() => setIndustrySearch('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer focus:outline-none"
            >
              Clear
            </button>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredIndustries.length > 0 ? (
            filteredIndustries.map((ind, idx) => (
              <motion.div 
                layout
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/40">
                    <DynamicIcon name={ind.iconName} className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-md font-bold text-slate-950 dark:text-slate-100 tracking-tight font-display">{ind.name}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {ind.benefit}
                </p>
                <button
                  id={`industry-book-${idx}`}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      requirements: `Hi, I have a business in "${ind.name}" and want a custom-built website.`
                    }));
                    handleNavigation('contact');
                  }}
                  className="mt-4 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-all block text-left cursor-pointer focus:outline-none"
                >
                  Book for {ind.name} &rarr;
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium">
              No matching industries found. Don't worry, we build for all local services!
              <button 
                id="industry-no-results-cta"
                onClick={() => {
                  setIndustrySearch('');
                  handleNavigation('contact');
                }}
                className="block text-indigo-600 dark:text-indigo-400 underline font-bold text-sm mt-3 mx-auto cursor-pointer focus:outline-none"
              >
                Send Us a Request Directly
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
