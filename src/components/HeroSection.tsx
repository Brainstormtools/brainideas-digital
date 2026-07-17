import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowRight, Search, MessageSquare, Smartphone, Building2, Zap } from 'lucide-react';

interface HeroSectionProps {
  handleNavigation: (sectionId: string) => void;
  homeRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSection({ handleNavigation, homeRef }: HeroSectionProps) {
  return (
    <section 
      ref={homeRef}
      id="home" 
      className="relative pt-16 pb-28 md:py-36 overflow-hidden bg-gradient-to-b from-indigo-50/20 via-white to-white"
    >
      {/* Subtle grid accent background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-45 z-0" aria-hidden="true"></div>
      
      {/* Abstract color glow */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-indigo-100/10 blur-3xl z-0 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 bottom-10 w-[12rem] h-[12rem] rounded-full bg-amber-50/10 blur-3xl z-0 pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Feature highlight Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-wrap items-center justify-center gap-y-1 gap-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl sm:rounded-full bg-indigo-50/70 border border-indigo-100/80 shadow-sm text-indigo-800 text-xs md:text-sm font-semibold mb-8 hover:bg-indigo-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => handleNavigation('services')}
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 handleNavigation('services');
               }
            }}
            tabIndex={0}
            role="button"
            aria-label="Conversion-First Agency for Local Businesses. Click to explore services."
          >
            <Award className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce animate-duration-1000" aria-hidden="true" />
            <span>Conversion-First Agency for Local Businesses</span>
            <span className="hidden sm:inline h-4 w-px bg-indigo-200" aria-hidden="true"></span>
            <span className="text-indigo-600 font-bold inline-flex items-center gap-0.5 hover:translate-x-0.5 transition-transform">
              Explore Services <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-slate-950 leading-[1.08] mb-6"
          >
            Professional Websites That Turn <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 bg-clip-text text-transparent">Local Visitors Into Customers</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-12"
          >
            We design fast, mobile-friendly websites that help local businesses generate calls, WhatsApp enquiries and bookings.
          </motion.p>

          {/* Call-to-actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 mb-20 max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button 
                id="hero-get-website-button"
                onClick={() => handleNavigation('contact')}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Get Your Website</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <a 
                id="hero-whatsapp-link"
                href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital! I am browsing your website and want to ask about getting a website setup for my business.")}`}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="mt-2">
              <a 
                id="hero-free-review-link"
                href="https://api.whatsapp.com/send?phone=923377105205&text=Hi%20BrainIdeas%20Digital%2C%20I%20would%20like%20to%20request%20a%20manual%20review%20of%20my%20business%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-600 font-semibold text-sm inline-flex items-center gap-1.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1.5 py-0.5"
              >
                <Search className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                <span>Request a Free Website Review</span>
              </a>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-slate-200/60 pt-10"
          >
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6 font-mono">Our Quality & Conversion Standards</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-center">
              {[
                { label: 'Mobile Responsive Websites', icon: 'Smartphone', color: 'text-indigo-600 bg-indigo-50/50 border border-indigo-100' },
                { label: 'Google Business Based', icon: 'Building2', color: 'text-amber-600 bg-amber-50/50 border border-amber-100' },
                { label: 'WhatsApp Lead Gen', icon: 'MessageSquare', color: 'text-emerald-600 bg-emerald-50/50 border border-emerald-100' },
                { label: 'Local SEO Ready', icon: 'Search', color: 'text-blue-600 bg-blue-50/50 border border-blue-100' },
                { label: 'Fast Vercel Deployment', icon: 'Zap', color: 'text-yellow-600 bg-yellow-50/50 border border-yellow-100' }
              ].map((badge, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-200/70 p-4 flex flex-col items-center text-center shadow-sm hover:border-slate-300 transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-xl mb-3 ${badge.color}`}>
                    {badge.icon === 'Smartphone' && <Smartphone className="w-4 h-4" aria-hidden="true" />}
                    {badge.icon === 'Building2' && <Building2 className="w-4 h-4" aria-hidden="true" />}
                    {badge.icon === 'MessageSquare' && <MessageSquare className="w-4 h-4" aria-hidden="true" />}
                    {badge.icon === 'Search' && <Search className="w-4 h-4" aria-hidden="true" />}
                    {badge.icon === 'Zap' && <Zap className="w-4 h-4" aria-hidden="true" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
