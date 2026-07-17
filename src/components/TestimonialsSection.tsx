import React from 'react';
import { Star, Check } from 'lucide-react';
import { WHY_CHOOSE_US, UPDATE_TYPES } from '../data';
import DynamicIcon from './DynamicIcon';

export default function TestimonialsSection() {
  return (
    <>
      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-y border-slate-100" aria-label="Why Choose BrainIdeas Digital">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left explanation block */}
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Partner Verification</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-slate-950 mt-2 mb-6 leading-tight">
                Why Local Businesses Choose BrainIdeas Digital
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
                We specialize specifically in the distinct dynamics of local search rankings and high-speed conversions. Unlike typical visual design agencies, our projects combine speed-critical React builds with proven consumer psychological triggers.
              </p>
              <div className="flex items-center gap-6 p-4 bg-white border border-slate-200/60 rounded-2xl w-fit shadow-sm">
                <div className="flex text-amber-500" aria-label="5 Star Rating">
                  <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                </div>
                <span className="text-slate-800 text-xs font-bold leading-tight uppercase font-mono">100% Mobile Ready Code</span>
              </div>
            </div>

            {/* Right list checklist */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-8 sm:p-10 shadow-sm">
              <div className="space-y-4" role="list">
                {WHY_CHOOSE_US.map((point, index) => (
                  <div key={index} className="flex items-start gap-3" role="listitem">
                    <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-xl mt-0.5 shadow-inner border border-indigo-100/50">
                      <Check className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CHANGE REQUEST SYSTEM SECTION */}
      <section className="py-16 md:py-24 bg-white overflow-hidden relative border-t border-slate-100" aria-label="Website update workflow details">
        {/* Subtle line separator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-slate-200" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Ongoing Success</span>
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
              Easy Future Updates
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
              Need to change prices, add new photos, update services, add a branch, change offers, or update reviews? We use a clean change-request workflow so your website can grow with your business.
            </p>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {UPDATE_TYPES.map((type, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/50 border border-slate-200/70 rounded-2xl p-6 hover:border-indigo-100 transition-all duration-300 shadow-sm group"
              >
                <div className="bg-white text-indigo-600 p-2.5 rounded-xl w-fit shadow-xs border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-700 transition-colors mb-4">
                  <DynamicIcon name={type.iconName} className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-slate-950 tracking-tight font-display mb-1.5">{type.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
