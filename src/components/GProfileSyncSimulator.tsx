import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Star, Phone, MessageSquare, Clock, ArrowRight, Loader2, RefreshCw, Layout, Check, Shield } from 'lucide-react';

interface IndustryTemplate {
  category: string;
  headline: string;
  tagline: string;
  primaryService: string;
  hours: string;
  phone: string;
  rating: number;
  reviewsCount: number;
}

const TEMPLATES: Record<string, IndustryTemplate> = {
  salon: {
    category: 'Beauty Salon & Parlor',
    headline: 'Your Signature Look, Handcrafted with Premium Care',
    tagline: 'Step into the top-rated local beauty experience. Book premium cuts, coloring, and styling sessions in minutes.',
    primaryService: 'Balayage & Hair Styling Packages',
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    phone: '+92 337 1052055',
    rating: 4.9,
    reviewsCount: 148
  },
  clinic: {
    category: 'Aesthetic & Skin Clinic',
    headline: 'Advanced Skin & Laser Solutions by Experts',
    tagline: 'Regain your youthful glow with customized clinical procedures. Non-invasive, highly hygienic, and verified treatments.',
    primaryService: 'HydraFacial & Anti-Aging Therapy',
    hours: 'Mon - Sat: 11:00 AM - 7:00 PM',
    phone: '+92 337 1052055',
    rating: 4.8,
    reviewsCount: 92
  },
  restaurant: {
    category: 'Restaurant & Family Dining',
    headline: 'Authentic Local Flavors, Served Fresh Every Day',
    tagline: 'Experience premium dining with family and friends. Dine-in, take-away, or fast local home delivery.',
    primaryService: 'Special Family Platter Offerings',
    hours: 'Daily: 12:00 PM - 11:30 PM',
    phone: '+92 337 1052055',
    rating: 4.7,
    reviewsCount: 235
  },
  fitness: {
    category: 'Gym & Fitness Center',
    headline: 'Push Your Limits, Unleash Your Potential',
    tagline: 'Train with professional certified coaches, state-of-the-art weights, group cardiovascular classes, and customized diet planning.',
    primaryService: 'All-Access Strength Membership',
    hours: 'Mon - Sat: 6:00 AM - 10:00 PM',
    phone: '+92 337 1052055',
    rating: 4.9,
    reviewsCount: 114
  },
  other: {
    category: 'Local Professional Service',
    headline: 'Trusted Local Experts Committed to Quality Results',
    tagline: 'Handling all of your local service and project requirements. Fast turnarounds, licensed professionals, and certified guarantees.',
    primaryService: 'Premium Comprehensive Service Pack',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    phone: '+92 337 1052055',
    rating: 4.8,
    reviewsCount: 76
  }
};

export default function GProfileSyncSimulator() {
  const [bizName, setBizName] = useState('');
  const [industry, setIndustry] = useState<keyof typeof TEMPLATES>('salon');
  const [step, setStep] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);

  const logs = [
    'Connecting to Google Business Profile API...',
    'Extracting verified customer reviews and 5-star ratings...',
    'Parsing operating hours, phone numbers, and location pins...',
    'Synthesizing lightweight React code modules...',
    'Structuring custom WhatsApp CTA links and lead routing forms...',
    'Deploying responsive layout framework to serverless CDN...'
  ];

  const handleStartSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName.trim()) return;

    setStep('syncing');
    setSyncLogs([]);
    setCurrentLogIdx(0);

    // Roll through logs sequentially
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setSyncLogs(prev => [...prev, logs[i]]);
        setCurrentLogIdx(i);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStep('synced');
        }, 500);
      }
    }, 450);
  };

  const currentTemplate = TEMPLATES[industry] || TEMPLATES.other;
  const capitalizedName = bizName || 'My Local Business';

  return (
    <div className="mt-16 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-10 max-w-5xl mx-auto shadow-sm relative overflow-hidden transition-all">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Interactive Sync Tool
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-display text-slate-950 dark:text-white mt-1">
          Google Profile to Website Converter
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
          Type your business details below to simulate how we map your public Google Business Profile info into a professional web layout instantly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'idle' && (
          <motion.form 
            key="idle-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleStartSync}
            className="space-y-6 max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-2xl shadow-xs"
          >
            <div>
              <label htmlFor="sim-biz-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                Business Name
              </label>
              <div className="relative">
                <input
                  id="sim-biz-name"
                  type="text"
                  required
                  placeholder="e.g. Elegant Hair Salon, Apex Clinic"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium transition-all"
                />
                <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label htmlFor="sim-biz-industry" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono">
                Industry Category
              </label>
              <select
                id="sim-biz-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value as keyof typeof TEMPLATES)}
                className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium cursor-pointer transition-all"
              >
                <option value="salon">Beauty Salon & Makeup Parlor</option>
                <option value="clinic">Aesthetic / Medical Skin Clinic</option>
                <option value="restaurant">Restaurant, Cafe & Sweets</option>
                <option value="fitness">Gym, Yoga & Fitness Club</option>
                <option value="other">Other Local Professional Service</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
            >
              <span>Convert Google Profile into Website</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.form>
        )}

        {step === 'syncing' && (
          <motion.div 
            key="syncing-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 max-w-md mx-auto"
          >
            <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mb-6" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base font-display">Converting Business Assets...</h4>
            
            {/* Logs list */}
            <div className="w-full mt-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl font-mono text-[11px] space-y-2 text-left shadow-inner h-32 overflow-y-auto">
              {syncLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  {idx < currentLogIdx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <Loader2 className="w-3 h-3 text-indigo-500 animate-spin shrink-0" />
                  )}
                  <span className={idx < currentLogIdx ? 'text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700' : ''}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'synced' && (
          <motion.div 
            key="synced-result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider">Converted Website Mockup Preview</span>
              </div>
              <button
                onClick={() => setStep('idle')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start New Simulation
              </button>
            </div>

            {/* Simulated Live Web Page Frame */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-slate-900">
              
              {/* Browser bar */}
              <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-4 py-0.5 rounded-lg text-center w-full max-w-sm truncate text-slate-600 dark:text-slate-300 font-medium">
                  https://{capitalizedName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.brainideas.com
                </div>
                <div className="w-12 text-right">HTTPS</div>
              </div>

              {/* Converted Page Content */}
              <div className="p-6 md:p-8 space-y-8 bg-white dark:bg-slate-900 transition-colors">
                
                {/* Header mapping explanation */}
                <div className="flex items-start gap-2 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 p-3 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  <Layout className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Layout Mapping Indicator:</strong> See how raw G-Profile items are styled beautifully to trigger calls. 
                    We sync reviews (<Star className="w-3 h-3 text-amber-500 inline fill-current" />), operating hours (<Clock className="w-3 h-3 text-indigo-500 inline" />), and contact channels (<MessageSquare className="w-3 h-3 text-emerald-500 inline" />).
                  </span>
                </div>

                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
                  <span className="font-extrabold text-slate-950 dark:text-white text-sm md:text-base font-display">{capitalizedName}</span>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="hidden sm:inline">Services</span>
                    <span className="hidden sm:inline">Reviews</span>
                    <span className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider font-mono">Synced</span>
                  </div>
                </div>

                {/* Simulated Hero */}
                <div className="text-center py-6 max-w-2xl mx-auto">
                  
                  {/* Category Pill mapped from G-profile */}
                  <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest">
                    <MapPin className="w-3 h-3" /> {currentTemplate.category}
                  </span>

                  <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-3 leading-snug">
                    {capitalizedName} &mdash; {currentTemplate.headline}
                  </h1>
                  
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                    {currentTemplate.tagline}
                  </p>

                  {/* Trust Rating Block */}
                  <div className="flex items-center justify-center gap-2 mt-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 p-2.5 rounded-xl w-fit mx-auto shadow-2xs">
                    <div className="flex text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-[10px] font-bold font-mono text-slate-700 dark:text-slate-200 uppercase">
                      {currentTemplate.rating} Rating ({currentTemplate.reviewsCount} Google Reviews)
                    </span>
                  </div>

                  {/* Sticky Booking CTAs mapping */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                    <div className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-1.5 shadow-sm border border-emerald-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </div>
                    <div className="w-full sm:w-auto bg-slate-900 dark:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-1.5 shadow-sm">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Business</span>
                    </div>
                  </div>

                </div>

                {/* Sub-sections grid */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-850">
                  
                  {/* Service Matrix */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-500 block mb-2 font-mono">Specialized Offering</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 font-display">{currentTemplate.primaryService}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      Custom, high-contrast, multi-tiered pricing lists display your local services clearly to ensure visitors know exactly what you charge.
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Consultation Rate</span>
                      <span className="text-xs font-bold text-amber-500 dark:text-amber-400">100% Free Consultation</span>
                    </div>
                  </div>

                  {/* Working Hours & Map indicator */}
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-500 block mb-2 font-mono">Business Status</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px]">{currentTemplate.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[11px]">Active SSL (HTTPS) Locked</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2.5 leading-normal">
                      We automate standard indicators like opening states, locations, maps pins, and secure credentials for your local customers.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="text-center">
              <p className="text-[11px] text-slate-400 italic">
                💡 This is a live simulation. Our actual customized layouts are completely responsive, hand-crafted in React, and feature premium design elements.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
