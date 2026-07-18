import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PACKAGES } from '../data';
import RoiCalculator from './RoiCalculator';

interface PricingSectionProps {
  packagesRef: React.RefObject<HTMLDivElement | null>;
  handlePackageSelect: (packageName: string) => void;
  handleNavigation: (sectionId: string) => void;
}

export default function PricingSection({
  packagesRef,
  handlePackageSelect,
  handleNavigation
}: PricingSectionProps) {
  return (
    <section 
      ref={packagesRef}
      id="packages" 
      className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" aria-hidden="true"></div>
      <div className="absolute right-1/4 top-10 w-[30rem] h-[30rem] bg-indigo-950/20 rounded-full blur-3xl pointer-events-none z-0" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono">Pricing Guidelines</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mt-2">
            Flexible Service Packages
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Choose a base plan that fits your current business scale. All packages are built using premium, responsive, and mobile-friendly layouts.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PACKAGES.map((pkg, index) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`bg-slate-900/40 border p-8 flex flex-col justify-between relative transition-all duration-300 rounded-2xl ${
                pkg.popular 
                  ? 'border-indigo-500 ring-4 ring-indigo-500/10 bg-slate-900/90 shadow-sm' 
                  : 'border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/20'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-indigo-600/20 font-mono">
                  {pkg.badge}
                </span>
              )}

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono">{pkg.id} level</span>
                <h3 className="text-2xl font-bold font-display mt-2 mb-3 text-white">{pkg.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 h-10">{pkg.tagline}</p>
                
                {/* Placeholder Pricing */}
                <div className="mb-8 bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
                  <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">Investment</span>
                  <span className="text-xl md:text-2xl font-black text-amber-400 font-display">{pkg.startingPrice}</span>
                  <span className="text-slate-500 text-[10px] block mt-1">Contact for customized localized quote</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <div className="bg-indigo-950 text-indigo-400 p-0.5 rounded-full mt-0.5 border border-indigo-900/30">
                        <Check className="w-3 h-3" aria-hidden="true" />
                      </div>
                      <span className="text-slate-200 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`package-cta-${pkg.id}`}
                onClick={() => handlePackageSelect(pkg.name)}
                className={`w-full font-bold py-3.5 px-4 rounded-xl text-center text-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  pkg.popular 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {pkg.ctaText}
              </button>
            </motion.div>
          ))}
        </div>

        <RoiCalculator handleNavigation={handleNavigation} />

        <p className="text-center text-xs text-slate-400 italic mt-12 max-w-md mx-auto">
          📋 Note: Final pricing depends on total pages, custom copywriting, specific asset features, and periodic update structures.
        </p>
      </div>
    </section>
  );
}
