import React from 'react';

interface FooterProps {
  handleNavigation: (sectionId: string) => void;
}

export default function Footer({ handleNavigation }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/brainideas-logo.png?v=20260710-4"
                alt="BrainIdeas Digital Logo"
                className="h-10 w-10 object-contain rounded-md"
                width="40"
                height="40"
                loading="lazy"
              />
              <span className="text-lg font-bold font-display tracking-tight text-white">
                BrainIdeas<span className="text-indigo-505"> Digital</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
              BrainIdeas Digital builds professional websites for local businesses, helping salons, clinics, restaurants, gyms, and service providers convert public profiles into premium digital engines.
            </p>
            <div className="pt-2 text-xs text-slate-505 space-y-1 text-slate-500">
              <p>📍 Burewala, Pakistan</p>
              <p>🌐 Globally Serving Vercel Networks</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Quick Navigation</h2>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {['Home', 'Services', 'Industries', 'Process', 'Packages', 'Portfolio', 'Contact'].map((section) => (
                <li key={section}>
                  <button 
                    id={`footer-nav-${section.toLowerCase()}`}
                    onClick={() => handleNavigation(section.toLowerCase())}
                    className="hover:text-indigo-400 hover:underline transition-all cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                  >
                    {section}
                  </button>
                </li>
              ))}

            </ul>
          </div>

          {/* Services list */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Services Offered</h2>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li>Local Business Websites</li>
              <li>Google Profile Website Conversion</li>
              <li>Landing Pages</li>
              <li>Local SEO Integration</li>
              <li>WhatsApp Feature Injection</li>
              <li>Website Maintenance Contracts</li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Get in Touch</h2>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Phone Support</span>
                <a href="tel:+923377105205" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1">+92 337 7105205</a>
              </li>
              <li>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">WhatsApp Support</span>
                <a href="https://api.whatsapp.com/send?phone=923377105205" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1">+92 337 7105205</a>
              </li>
              <li>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Direct Email</span>
                <a href="mailto:brainideasdigital@gmail.com" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 font-mono">brainideasdigital@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Under footer details */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-normal">
          <p>&copy; {new Date().getFullYear()} BrainIdeas Digital. All Rights Reserved. Clean responsive React platform.</p>
          <div className="flex gap-4">
            <span>Optimized for Local SEO</span>
            <span>•</span>
            <span>Powered by Vercel & React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
