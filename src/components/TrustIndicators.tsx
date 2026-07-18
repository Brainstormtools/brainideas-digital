import React from 'react';
import { ShieldCheck, Zap, Award, Star } from 'lucide-react';

export default function TrustIndicators() {
  const indicators = [
    {
      id: 'badge-google',
      icon: Star,
      label: 'Google Business Specialist',
      sublabel: 'Optimized conversion paths',
      iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400'
    },
    {
      id: 'badge-ssl',
      icon: ShieldCheck,
      label: 'SSL Secured Delivery',
      sublabel: 'Encrypted & safe booking',
      iconColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      id: 'badge-support',
      icon: Zap,
      label: 'Fast Support Channel',
      sublabel: 'Direct WhatsApp assistance',
      iconColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      id: 'badge-quality',
      icon: Award,
      label: 'Guaranteed Craftsmanship',
      sublabel: 'High-performance code',
      iconColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
    }
  ];

  return (
    <section 
      id="trust-indicators" 
      className="bg-white dark:bg-slate-900 border-y border-slate-100/80 dark:border-slate-800/80 py-8 relative z-10 transition-colors duration-300"
      aria-label="Trust and Credibility Indicators"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
          {indicators.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                id={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left group transition-all duration-300 w-full max-w-[260px] sm:max-w-none px-2"
              >
                <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-105 shrink-0 ${item.iconColor}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-slate-200 tracking-tight font-sans">
                    {item.label}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-normal mt-0.5 leading-normal">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
