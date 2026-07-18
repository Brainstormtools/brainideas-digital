import React from 'react';
import { PROCESS_STEPS } from '../data';
import GProfileSyncSimulator from './GProfileSyncSimulator';

interface ProcessSectionProps {
  processRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProcessSection({ processRef }: ProcessSectionProps) {
  return (
    <section 
      ref={processRef}
      id="process" 
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Frictionless Path</span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-2">
            Our Website Launch Process
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
            7 organized steps from strategic Google Business Profile audits to high-speed CDN deployment. We handle all technical steps so you don't have to.
          </p>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </div>

        <div className="relative border-l-2 border-indigo-100/80 dark:border-indigo-900/60 ml-4 md:ml-8 lg:max-w-4xl lg:mx-auto space-y-12">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index} className="relative pl-8 sm:pl-12">
              {/* Indicator number */}
              <div className="absolute -left-[17px] top-0.5 bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black font-mono shadow-md shadow-indigo-600/10">
                {step.step}
              </div>
              
              <div className="bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-200/70 dark:border-slate-800/80 transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 mb-2 tracking-tight font-display">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <GProfileSyncSimulator />
      </div>
    </section>
  );
}
