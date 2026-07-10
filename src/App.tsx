import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Search, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Menu, 
  X, 
  Star, 
  ExternalLink, 
  Award, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Sliders, 
  DollarSign, 
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  Briefcase,
  Smartphone
} from 'lucide-react';
import { 
  SERVICES, 
  INDUSTRIES, 
  PROCESS_STEPS, 
  PACKAGES, 
  PORTFOLIO_PROJECTS, 
  FAQS, 
  WHY_CHOOSE_US, 
  UPDATE_TYPES 
} from './data';
import DynamicIcon from './components/DynamicIcon';

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active navigation section during scroll
  const [activeSection, setActiveSection] = useState('home');
  
  // Search state for industry filter
  const [industrySearch, setIndustrySearch] = useState('');
  
  // Selected package (pre-fills form dropdown)
  const [selectedServiceType, setSelectedServiceType] = useState('New Website');
  
  // Accordion state for FAQs
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({
    0: true // open first by default
  });

  // Lead inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessCategory: '',
    city: '',
    phone: '',
    whatsApp: '',
    websiteNeededFor: 'New Website',
    budgetRange: 'Starter Package',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState<any[]>([]);

  // Ref for sections to enable scroll tracking
  const sectionsRef = {
    home: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    industries: useRef<HTMLElement>(null),
    process: useRef<HTMLElement>(null),
    packages: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  const [pendingScrollTarget, setPendingScrollTarget] = useState<keyof typeof sectionsRef | null>(null);

  // Load saved inquiries from localStorage (to make it a real-world integration)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('brainideas_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const [sectionName, ref] of Object.entries(sectionsRef)) {
        const element = ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
    const targetElement = sectionsRef[sectionId].current;

    if (!targetElement) {
      return;
    }

    const header = document.querySelector('[data-main-header]') as HTMLElement | null;
    const headerHeight = header ? header.offsetHeight : 80;

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    setActiveSection(sectionId);
  };

  const scrollTo = (sectionId: keyof typeof sectionsRef) => {
    if (mobileMenuOpen) {
      setPendingScrollTarget(sectionId);
      setMobileMenuOpen(false);
      return;
    }

    scrollToSection(sectionId);
  };

  const handleMobileMenuExitComplete = () => {
    if (!pendingScrollTarget) {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollToSection(pendingScrollTarget);
      setPendingScrollTarget(null);
    });
  };

  // Toggle dynamic accordion items
  const toggleFaq = (index: number) => {
    setOpenFaqIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Handle Form Inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pre-fill package and scroll to contact
  const handlePackageSelect = (packageName: string) => {
    let serviceMapping = 'New Website';
    if (packageName.toLowerCase().includes('starter')) serviceMapping = 'New Website';
    else if (packageName.toLowerCase().includes('business')) serviceMapping = 'New Website';
    else if (packageName.toLowerCase().includes('growth')) serviceMapping = 'Local SEO';
    
    setFormData(prev => ({
      ...prev,
      websiteNeededFor: serviceMapping,
      message: `Hi BrainIdeas team! I am interested in building a ${packageName} for my business. Let's connect.`
    }));
    
    scrollTo('contact');
  };

  // Handle inquiry form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInquiry = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toLocaleString()
    };

    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    
    try {
      localStorage.setItem('brainideas_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    
    setFormSubmitted(true);
  };

  // Generate WhatsApp Message Link
  const getWhatsAppLink = () => {
    const phoneNum = "923377105205"; // agency phone
    const text = `Hello BrainIdeas Digital! 👋
I would like to request a website consultation.

📋 *Inquiry Details:*
- *Name:* ${formData.name}
- *Business:* ${formData.businessName}
- *Category:* ${formData.businessCategory}
- *City:* ${formData.city}
- *Phone:* ${formData.phone}
- *WhatsApp:* ${formData.whatsApp}
- *Website Needed For:* ${formData.websiteNeededFor}
- *Budget Range:* ${formData.budgetRange}
- *Message:* ${formData.message || "Not provided"}`;

    return `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(text)}`;
  };

  // Reset form to write another submission
  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      businessCategory: '',
      city: '',
      phone: '',
      whatsApp: '',
      websiteNeededFor: 'New Website',
      budgetRange: 'Starter Package',
      message: ''
    });
    setFormSubmitted(false);
  };

  // Filter industries based on search query
  const filteredIndustries = INDUSTRIES.filter(ind => 
    ind.name.toLowerCase().includes(industrySearch.toLowerCase()) || 
    ind.benefit.toLowerCase().includes(industrySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50/50 text-slate-800 selection:bg-indigo-600 selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-950 text-slate-300 py-3 px-4 text-xs md:text-sm text-center font-medium border-b border-slate-900 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold font-mono">Update</span>
          <span>🚀 Turn your Google Business Profile into a conversion machine. Call & WhatsApp booking integrations standard.</span>
          <a 
            href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital, I want to convert my Google Profile to a professional website.")}`}
            target="_blank" 
            referrerPolicy="no-referrer"
            className="text-white underline decoration-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 font-semibold ml-1"
          >
            Get Free Audit <ArrowRight className="w-3 h-3 text-indigo-400" />
          </a>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header data-main-header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <img
                src="/brainideas-logo.png?v=20260710-4"
                alt="BrainIdeas Digital Logo"
                className="h-10 w-10 object-contain rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-950">
                  BrainIdeas<span className="text-indigo-600"> Digital</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold font-mono">Digital Agency</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'Industries', id: 'industries' },
                { label: 'Process', id: 'process' },
                { label: 'Packages', id: 'packages' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'FAQ', id: 'faq' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id as any)}
                  className={`relative py-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer ${
                    activeSection === item.id ? 'text-indigo-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Contact quick call action */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="tel:+923377105205"
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>Call Us</span>
              </a>
              <button 
                onClick={() => scrollTo('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
              >
                Request Consultation
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence onExitComplete={handleMobileMenuExitComplete}>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden absolute left-0 right-0 top-full border-t border-slate-100 bg-white overflow-hidden shadow-xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Services', id: 'services' },
                  { label: 'Industries', id: 'industries' },
                  { label: 'Process', id: 'process' },
                  { label: 'Packages', id: 'packages' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'FAQ', id: 'faq' },
                  { label: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id as any)}
                    className={`text-left py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                      activeSection === item.id 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 grid grid-cols-2 gap-3 px-4">
                  <a 
                    href="tel:+923377105205"
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-3 rounded-xl border border-slate-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-indigo-600" />
                    <span>Call Us</span>
                  </a>
                  <a 
                    href="https://api.whatsapp.com/send?phone=923377105205"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN WEBSITE STAGE */}
      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
        <section 
          ref={sectionsRef.home}
          id="home" 
          className="relative pt-16 pb-28 md:py-36 overflow-hidden bg-gradient-to-b from-indigo-50/20 via-white to-white"
        >
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-45 z-0"></div>
          
          {/* Abstract color glow */}
          <div className="absolute right-0 top-1/4 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-indigo-100/30 blur-3xl z-0 pointer-events-none"></div>
          <div className="absolute left-0 bottom-10 w-[24rem] h-[24rem] rounded-full bg-amber-50/40 blur-3xl z-0 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* Feature highlight Pill */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/70 border border-indigo-100/80 shadow-sm text-indigo-800 text-xs md:text-sm font-semibold mb-8 hover:bg-indigo-100 transition-colors cursor-pointer"
                onClick={() => scrollTo('services')}
              >
                <Award className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                <span>Conversion-First Agency for Local Businesses</span>
                <span className="h-4 w-px bg-indigo-200"></span>
                <span className="text-indigo-600 font-bold inline-flex items-center gap-0.5 hover:translate-x-0.5 transition-transform">Explore Services <ArrowRight className="w-3.5 h-3.5" /></span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-slate-950 leading-[1.08] mb-6"
              >
                Websites That Turn Local Visitors Into <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 bg-clip-text text-transparent">Calls, WhatsApp Leads</span> & Bookings
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-12"
              >
                BrainIdeas Digital builds professional websites for local businesses using real business data, Google Business Profile information, reviews, photos, services, and local SEO strategy.
              </motion.p>

              {/* Call-to-actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-2xl mx-auto"
              >
                <button 
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 group text-base"
                >
                  <span>Get Your Website</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a 
                  href={`https://api.whatsapp.com/send?phone=923377105205&text=${encodeURIComponent("Hi BrainIdeas Digital! I am browsing your website and want to ask about getting a website setup for my business.")}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 text-base"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </a>

                <button 
                  onClick={() => scrollTo('portfolio')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-base"
                >
                  View Portfolio
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="border-t border-slate-200/60 pt-10"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6 font-mono">Our Quality & Conversion Standards</p>
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
                      className="bg-white rounded-2xl border border-slate-200/50 p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className={`p-2.5 rounded-xl mb-3 ${badge.color}`}>
                        {badge.icon === 'Smartphone' && <Smartphone className="w-4 h-4" />}
                        {badge.icon === 'Building2' && <Building2 className="w-4 h-4" />}
                        {badge.icon === 'MessageSquare' && <MessageSquare className="w-4 h-4" />}
                        {badge.icon === 'Search' && <Search className="w-4 h-4" />}
                        {badge.icon === 'Zap' && <Zap className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 leading-tight">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. PROBLEM SECTION */}
        <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
          {/* Subtle grid layer */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0"></div>
          <div className="absolute right-0 bottom-0 w-[30rem] h-[30rem] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none z-0"></div>
          <div className="absolute left-0 top-0 w-[20rem] h-[20rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono">The Local Challenge</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight mt-2 text-white">
                Your Business May Be Losing Customers Without a Professional Website
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-5 rounded-full"></div>
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
                  <div className="text-3xl font-black font-mono text-indigo-500/20 group-hover:text-indigo-400/30 transition-colors mb-4">{point.id}</div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal">{point.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 hover:border-indigo-500/20 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto text-center shadow-2xl transition-all duration-300">
              <span className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest mb-4 inline-block font-mono">The BrainIdeas Difference</span>
              <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed max-w-2xl mx-auto">
                “We convert your business information into a professional website built for trust, clarity, and enquiries.”
              </p>
              <button 
                onClick={() => scrollTo('contact')}
                className="mt-6 text-sm font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                Let's Build Yours Today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section 
          ref={sectionsRef.services}
          id="services" 
          className="py-24 md:py-32 bg-white relative"
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
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service) => (
                <div 
                  key={service.id}
                  className="group bg-slate-50/60 hover:bg-slate-950 border border-slate-200/50 hover:border-slate-950 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5"
                >
                  <div>
                    <div className="bg-indigo-50 group-hover:bg-indigo-600 p-3.5 rounded-2xl w-fit text-indigo-600 group-hover:text-white mb-6 transition-colors duration-300 shadow-inner">
                      <DynamicIcon name={service.iconName} className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-white mb-3 tracking-tight font-display transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed mb-6 transition-colors font-normal">
                      {service.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        websiteNeededFor: service.title.includes('Landing') ? 'Landing Page' : service.title.includes('SEO') ? 'Local SEO' : service.title.includes('Maintenance') ? 'Website Maintenance' : 'New Website',
                        message: `Hi, I am interested in your "${service.title}" services.`
                      }));
                      scrollTo('contact');
                    }}
                    className="text-xs font-bold text-indigo-600 group-hover:text-amber-400 inline-flex items-center gap-1 cursor-pointer w-full justify-start pt-3.5 border-t border-slate-200/60 group-hover:border-slate-800/80 transition-colors"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. INDUSTRIES SECTION */}
        <section 
          ref={sectionsRef.industries}
          id="industries" 
          className="py-24 md:py-32 bg-slate-50/50 border-y border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Industry Coverage</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Websites for Every Local Industry
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
                Find your industry below to see how our custom conversion-focused website structure optimizes your daily leads.
              </p>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Filter Search Bar */}
            <div className="max-w-md mx-auto mb-12 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search your industry (e.g. Salon, Clinic, Cafe)..."
                value={industrySearch}
                onChange={(e) => setIndustrySearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
              />
              {industrySearch && (
                <button 
                  onClick={() => setIndustrySearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredIndustries.length > 0 ? (
                filteredIndustries.map((ind, idx) => (
                  <motion.div 
                    layout
                    key={ind.name}
                    className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl">
                        <DynamicIcon name={ind.iconName} className="w-5 h-5" />
                      </div>
                      <h3 className="text-md font-bold text-slate-950 tracking-tight font-display">{ind.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {ind.benefit}
                    </p>
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          businessCategory: ind.name,
                          message: `Hi, I have a business in "${ind.name}" and want a custom-built website.`
                        }));
                        scrollTo('contact');
                      }}
                      className="mt-4 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all block text-left cursor-pointer"
                    >
                      Book for {ind.name} &rarr;
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                  No matching industries found. Don't worry, we build for all local services!
                  <button 
                    onClick={() => {
                      setIndustrySearch('');
                      scrollTo('contact');
                    }}
                    className="block text-indigo-600 underline font-bold text-sm mt-3 mx-auto cursor-pointer"
                  >
                    Send Us a Request Directly
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. PROCESS SECTION */}
        <section 
          ref={sectionsRef.process}
          id="process" 
          className="py-24 md:py-32 bg-white relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Frictionless Path</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Our Website Launch Process
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
                7 organized steps from strategic Google Business Profile audits to high-speed CDN deployment. We handle all technical steps so you don't have to.
              </p>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative border-l-2 border-indigo-100/80 ml-4 md:ml-8 lg:max-w-4xl lg:mx-auto space-y-12">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className="relative pl-8 sm:pl-12">
                  {/* Indicator number */}
                  <div className="absolute -left-[17px] top-0.5 bg-indigo-600 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black font-mono shadow-md shadow-indigo-600/10">
                    {step.step}
                  </div>
                  
                  <div className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/50 hover:border-indigo-100 hover:shadow-[0_10px_30px_rgba(99,102,241,0.05)] transition-all duration-300">
                    <h3 className="text-lg font-bold text-slate-950 mb-2 tracking-tight font-display">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PACKAGES SECTION */}
        <section 
          ref={sectionsRef.packages}
          id="packages" 
          className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0"></div>
          <div className="absolute right-1/4 top-10 w-[30rem] h-[30rem] bg-indigo-950/20 rounded-full blur-3xl pointer-events-none z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 font-mono">Pricing Guidelines</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mt-2">
                Flexible Service Packages
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
                Choose a base plan that fits your current business scale. All packages are built using premium, responsive, and mobile-friendly layouts.
              </p>
              <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`bg-slate-900/40 border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    pkg.popular 
                      ? 'border-indigo-500 ring-4 ring-indigo-500/10 lg:scale-105 bg-slate-900/90 shadow-2xl' 
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
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-slate-200 leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePackageSelect(pkg.name)}
                    className={`w-full font-bold py-3.5 px-4 rounded-xl text-center text-sm transition-all duration-200 cursor-pointer ${
                      pkg.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white hover:-translate-y-0.5'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400 italic mt-12 max-w-md mx-auto">
              📋 Note: Final pricing depends on total pages, custom copywriting, specific asset features, and periodic update structures.
            </p>
          </div>
        </section>

        {/* 7. PORTFOLIO SECTION */}
        <section 
          ref={sectionsRef.portfolio}
          id="portfolio" 
          className="py-24 md:py-32 bg-white relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Real Deliveries</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Our Completed Client Projects
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
                Explore a selected showcase of our verified, fully responsive live local business website designs. No exaggerated metrics or synthetic screenshots.
              </p>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PORTFOLIO_PROJECTS.map((project) => (
                <div 
                  key={project.id}
                  className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100/80 transition-all duration-300"
                >
                  <div>
                    {/* Header platform badge & Business category */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-slate-200/60 text-slate-800 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md font-mono">
                        {project.businessType}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono flex items-center gap-1 ${
                        project.platform === 'Vercel' 
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"></span>
                        {project.platform}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight font-display">
                      {project.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Features checklist tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.features.map((feat, fIdx) => (
                        <span 
                          key={fIdx} 
                          className="bg-white border border-slate-200/80 text-slate-700 text-[10px] font-medium px-2.5 py-1 rounded-lg shadow-2xs"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full bg-white hover:bg-slate-950 hover:text-white border border-slate-200 hover:border-slate-950 text-slate-800 font-bold py-3 px-4 rounded-xl text-center text-xs inline-flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <span>View Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. WHY CHOOSE US SECTION */}
        <section className="py-24 md:py-32 bg-slate-50/50 border-y border-slate-100">
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
                  <div className="flex text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-slate-800 text-xs font-bold leading-tight uppercase font-mono">100% Mobile Ready Code</span>
                </div>
              </div>

              {/* Right list checklist */}
              <div className="bg-white border border-slate-200/50 rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_-10px_rgba(0,0,0,0.03)]">
                <div className="space-y-4">
                  {WHY_CHOOSE_US.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-xl mt-0.5 shadow-inner border border-indigo-100/50">
                        <Check className="w-4 h-4" />
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

        {/* 9. CHANGE REQUEST SYSTEM SECTION */}
        <section className="py-24 md:py-32 bg-white overflow-hidden relative border-t border-slate-100">
          {/* Subtle line separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-slate-200"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Ongoing Success</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Easy Future Updates
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
                Need to change prices, add new photos, update services, add a branch, change offers, or update reviews? We use a clean change-request workflow so your website can grow with your business.
              </p>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {UPDATE_TYPES.map((type, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="bg-white text-indigo-600 p-2.5 rounded-xl w-fit shadow-xs border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-700 transition-colors mb-4">
                    <DynamicIcon name={type.iconName} className="w-5 h-5" />
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

        {/* 10. FAQ SECTION */}
        <section 
          ref={sectionsRef.faq}
          id="faq" 
          className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Got Questions?</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Frequently Asked Questions
              </h2>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {FAQS.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-slate-200/50 hover:border-indigo-100/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.02)] hover:shadow-md"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-bold text-slate-950 text-sm sm:text-base font-display">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 bg-slate-50 rounded-lg text-slate-400 border border-slate-100 transition-all duration-300 ${openFaqIndices[index] ? 'rotate-180 text-indigo-600 bg-indigo-50 border-indigo-100' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {openFaqIndices[index] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. CONTACT SECTION */}
        <section 
          ref={sectionsRef.contact}
          id="contact" 
          className="py-24 md:py-32 bg-white relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/40 to-transparent z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 font-mono">Immediate Connection</span>
              <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 mt-2">
                Request a Website Consultation
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed">
                Send your brief business goals using the secured inquiry form below. Once clicked, you can instantly route the same details directly to us via WhatsApp for a 10-minute priority audit.
              </p>
              <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
              
              {/* Left informational block */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-900">
                  <div className="absolute right-0 bottom-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-2xl"></div>
                  
                  <span className="bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-mono mb-6 inline-block">Direct Support</span>
                  <h3 className="text-xl font-bold font-display text-white mb-4">BrainIdeas Support Desk</h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="tel:+923377105205"
                      className="flex items-center gap-3 text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      <div className="bg-slate-900 p-2 rounded-xl text-indigo-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Call Us Directly</span>
                        <span className="font-bold text-slate-200">+92 337 7105205</span>
                      </div>
                    </a>

                    <a 
                      href="https://api.whatsapp.com/send?phone=923377105205"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-3 text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      <div className="bg-slate-900 p-2 rounded-xl text-emerald-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Live WhatsApp Support</span>
                        <span className="font-bold text-slate-200">+92 337 7105205</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 text-sm text-slate-300 hover:translate-x-1 transition-all duration-200">
                      <div className="bg-slate-900 p-2 rounded-xl text-amber-400 font-bold text-xs uppercase font-mono">@</div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">Send Email Request</span>
                        <span className="font-bold text-slate-200">brainideasdigital@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions List (Local Inquiry Audit View) */}
                {savedInquiries.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono flex items-center justify-between">
                      <span>Saved Inquiries Log ({savedInquiries.length})</span>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('brainideas_inquiries');
                          setSavedInquiries([]);
                        }}
                        className="text-[10px] lowercase hover:underline text-red-500 cursor-pointer font-bold"
                      >
                        clear
                      </button>
                    </h4>
                    <div className="max-h-40 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                      {savedInquiries.map((inq) => (
                        <div key={inq.id} className="bg-white p-3 rounded-xl border border-slate-200/50 text-xs shadow-2xs">
                          <div className="flex justify-between font-bold text-slate-800 mb-1">
                            <span>{inq.businessName || inq.name}</span>
                            <span className="text-indigo-600 font-mono text-[9px]">{inq.websiteNeededFor}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono italic truncate">{inq.submittedAt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Lead Inquiry Form */}
              <div className="lg:col-span-7 bg-white border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="lead-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Your Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Business Name *</label>
                          <input
                            type="text"
                            name="businessName"
                            required
                            placeholder="My Local Salon / Cafe"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Business Category */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Business Category *</label>
                          <input
                            type="text"
                            name="businessCategory"
                            required
                            placeholder="e.g. Beauty Salon, Clinic, Gym"
                            value={formData.businessCategory}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">City / Location *</label>
                          <input
                            type="text"
                            name="city"
                            required
                            placeholder="e.g. Burewala, Lahore, Dubai"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="e.g. +92 300 1234567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">WhatsApp Number *</label>
                          <input
                            type="tel"
                            name="whatsApp"
                            required
                            placeholder="e.g. +92 337 7105205"
                            value={formData.whatsApp}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Website Needed For Dropdown */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Website Needed For *</label>
                          <select
                            name="websiteNeededFor"
                            value={formData.websiteNeededFor}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium cursor-pointer"
                          >
                            <option value="New Website">New Website</option>
                            <option value="Website Redesign">Website Redesign</option>
                            <option value="Landing Page">Landing Page</option>
                            <option value="Local SEO">Local SEO</option>
                            <option value="Website Maintenance">Website Maintenance</option>
                            <option value="Not Sure Yet">Not Sure Yet</option>
                          </select>
                        </div>

                        {/* Budget Range Dropdown */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Approximate Budget Range</label>
                          <select
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium cursor-pointer"
                          >
                            <option value="Starter Package">Starter Package</option>
                            <option value="Business Package">Business Package</option>
                            <option value="Growth Plan">Growth Plan</option>
                            <option value="Custom Project / Complex Features">Custom / Complex Project</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">Brief Message / Special Requirements</label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell us about your services, locations, or special features you'd like on your website..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-normal"
                        ></textarea>
                      </div>

                      {/* Submit CTA Buttons */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 text-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Request Website Consultation</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-receipt"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 px-4"
                    >
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-100">
                        <CheckCircle2 className="w-10 h-10 text-indigo-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold font-display text-slate-950 mb-2">Request Saved Locally!</h3>
                      <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto font-normal">
                        Thank you for your inquiry, <span className="font-bold text-slate-950">{formData.name}</span>. Your details have been securely captured. Now, route these details directly to us on WhatsApp for an immediate response.
                      </p>

                      {/* Captured details preview */}
                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-left text-xs mb-8 space-y-2 max-w-md mx-auto font-mono">
                        <p><span className="text-slate-400">Business:</span> {formData.businessName} ({formData.businessCategory})</p>
                        <p><span className="text-slate-400">Inquiry:</span> {formData.websiteNeededFor}</p>
                        <p><span className="text-slate-400">Budget:</span> {formData.budgetRange}</p>
                        <p><span className="text-slate-400">Phone:</span> {formData.phone}</p>
                      </div>

                      <div className="space-y-4 max-w-md mx-auto">
                        <a 
                          href={getWhatsAppLink()}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Send Details on WhatsApp</span>
                        </a>

                        <button 
                          onClick={resetForm}
                          className="text-xs text-indigo-600 hover:text-indigo-800 underline font-semibold block mx-auto cursor-pointer"
                        >
                          Submit Another Inquiry Form
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 12. FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/brainideas-logo.png?v=20260710-4"
                  alt="BrainIdeas Digital Logo"
                  className="h-10 w-10 object-contain rounded-md"
                />
                <span className="text-lg font-bold font-display tracking-tight text-white">BrainIdeas<span className="text-indigo-500"> Digital</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
                BrainIdeas Digital builds professional websites for local businesses, helping salons, clinics, restaurants, gyms, and service providers convert public profiles into premium digital engines.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <p>📍 Burewala, Pakistan</p>
                <p>🌐 Globally Serving Vercel Networks</p>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {['Home', 'Services', 'Industries', 'Process', 'Packages', 'Portfolio', 'Contact'].map((section) => (
                  <li key={section}>
                    <button 
                      onClick={() => scrollTo(section.toLowerCase() as any)}
                      className="hover:text-indigo-400 hover:underline transition-all cursor-pointer text-left"
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services list */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Services Offered</h4>
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
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-4 font-mono">Get in Touch</h4>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Phone Support</span>
                  <a href="tel:+923377105205" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors">+92 337 7105205</a>
                </li>
                <li>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">WhatsApp Support</span>
                  <a href="https://api.whatsapp.com/send?phone=923377105205" target="_blank" referrerPolicy="no-referrer" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors">+92 337 7105205</a>
                </li>
                <li>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Direct Email</span>
                  <a href="mailto:brainideasdigital@gmail.com" className="text-slate-200 font-bold hover:text-indigo-400 hover:underline transition-colors">brainideasdigital@gmail.com</a>
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

    </div>
  );
}
