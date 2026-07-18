import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data';

interface PortfolioSectionProps {
  portfolioRef: React.RefObject<HTMLDivElement | null>;
}

export default function PortfolioSection({ portfolioRef }: PortfolioSectionProps) {
  return (
    <section 
      ref={portfolioRef}
      id="portfolio" 
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Real Deliveries</span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-2">
            Our Completed Client Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
            Explore a selected showcase of our verified, fully responsive live local business website designs. No exaggerated metrics or synthetic screenshots.
          </p>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-100/80 dark:hover:border-indigo-500/30 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Header platform badge & Business category */}
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-slate-200/60 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md font-mono">
                    {project.businessType}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono flex items-center gap-1 ${
                    project.platform === 'Vercel' 
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60' 
                      : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60'
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" aria-hidden="true"></span>
                    {project.platform}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100 mb-3 tracking-tight font-display">
                  {project.name}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Features checklist tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.features.map((feat, fIdx) => (
                    <span 
                      key={fIdx} 
                      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <a 
                id={`portfolio-link-${project.id}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="w-full bg-white dark:bg-slate-900 hover:bg-slate-950 dark:hover:bg-slate-950 hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-950 text-slate-800 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-center text-xs inline-flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>View Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
