import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';
import DynamicIcon from './DynamicIcon';

interface ServicesSectionProps {
  handleNavigation: (sectionId: string) => void;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ServicesSection({
  handleNavigation,
  servicesRef,
  setFormData
}: ServicesSectionProps) {
  return (
    <>
      {/* 1. PROBLEM SECTION */}
      <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle grid layer */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0" aria-hidden="true"></div>
        <div className="absolute right-0 bottom-0 w-[30rem] h-[30rem] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none z-0" aria-hidden="true"></div>
        <div className="absolute left-0 top-0 w-[20rem] h-[20rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0" aria-hidden="true"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono">The Local Challenge</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight mt-2 text-white">
              Your Business May Be Losing Customers Without a Professional Website
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-5 rounded-full" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {[
              {
                id: "01",
                title: "Invisible on Search",
                text: "Customers search you on Google but do not find enough information to trust or visit you."
              },
              {
                id: "02",
                title: "Scattered Details",
                text: "Services, prices, photos, and reviews are scattered everywhere across basic pages."
              },
              {
                id: "03",
                title: "Competitor Advantage",
                text: "Competitors look much more professional online with streamlined mobile sites."
              },
              {
                id: "04",
                title: "Friction to Book",
                text: "Customers want quick WhatsApp or immediate click-to-call booking buttons but can't find them."
              },
              {
                id: "05",
                title: "Profile Trust Gap",
                text: "Your Google Business Profile is active, but you need an integrated website that seals the trust."
              }
            ].map((point, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 relative hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group"
              >
                <div className="text-3xl font-black font-mono text-indigo-500/20 group-hover:text-indigo-400/30 transition-colors mb-4" aria-hidden="true">{point.id}</div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">{point.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 hover:border-indigo-500/20 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto text-center shadow-2xl transition-all duration-300">
            <span className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 inline-block font-mono">The BrainIdeas Difference</span>
            <blockquote className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed max-w-2xl mx-auto">
              “We convert your business information into a professional website built for trust, clarity, and enquiries.”
            </blockquote>
            <button 
              id="problem-consult-cta"
              onClick={() => handleNavigation('contact')}
              className="mt-6 text-sm font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span>Let's Build Yours Today</span> 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SERVICES LIST SECTION */}
      <section 
        ref={servicesRef}
        id="services" 
        className="py-16 md:py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
              Engineered Website Solutions Designed To Convert Leads
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
              We design and support specialized sites that turn local visitors into paying customers. Simple structures, premium assets, and no complex jargon.
            </p>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                className="group bg-slate-50/60 border border-slate-200/70 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:border-indigo-200 hover:bg-slate-50"
              >
                <div>
                  <div className="bg-indigo-50 group-hover:bg-indigo-100 p-3.5 rounded-2xl w-fit text-indigo-600 group-hover:text-indigo-700 mb-6 transition-colors duration-300 shadow-inner">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-indigo-600 mb-3 tracking-tight font-display transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>
                
                <button
                  id={`service-inquire-${service.id}`}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      serviceNeeded: service.title.includes('Landing') ? 'Landing Page' : service.title.includes('SEO') ? 'Local SEO' : service.title.includes('Maintenance') ? 'Website Maintenance' : 'New Website',
                      requirements: `Hi, I am interested in your "${service.title}" services.`
                    }));
                    handleNavigation('contact');
                  }}
                  className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer w-full justify-start pt-3.5 border-t border-slate-200/60 group-hover:border-indigo-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 mt-2"
                >
                  <span>Inquire About Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
