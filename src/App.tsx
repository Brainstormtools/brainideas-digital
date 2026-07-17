import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import IndustriesSection from './components/IndustriesSection';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active navigation section during scroll
  const [activeSection, setActiveSection] = useState('home');

  // Lead inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phoneOrWhatsApp: '',
    serviceNeeded: 'New Website',
    requirements: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Shared navigation click handler
  const handleNavigation = (id: string) => {
    setMobileMenuOpen(false);
    scrollTo(id as any);
  };

  // Ref for sections to enable scroll tracking
  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    industries: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    packages: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  const [pendingScrollTarget, setPendingScrollTarget] = useState<keyof typeof sectionsRef | null>(null);



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
    
    setFormData({
      name: '',
      businessName: '',
      phoneOrWhatsApp: '',
      serviceNeeded: serviceMapping,
      requirements: `Hi BrainIdeas team! I am interested in building a ${packageName} for my business. Let's connect.`
    });
    
    scrollTo('contact');
  };

  // Handle inquiry form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
- *Phone/WhatsApp:* ${formData.phoneOrWhatsApp}
- *Service Needed:* ${formData.serviceNeeded}
- *Requirements:* ${formData.requirements || "Not provided"}`;

    return `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(text)}`;
  };

  // Reset form to write another submission
  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      phoneOrWhatsApp: '',
      serviceNeeded: 'New Website',
      requirements: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50/50 text-slate-800 selection:bg-indigo-600 selection:text-white">
      
      <Header 
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleNavigation={handleNavigation}
        onMobileMenuExitComplete={handleMobileMenuExitComplete}
      />

      <main className="flex-grow">
        <HeroSection 
          handleNavigation={handleNavigation}
          homeRef={sectionsRef.home}
        />

        <ServicesSection
          handleNavigation={handleNavigation}
          servicesRef={sectionsRef.services}
          setFormData={setFormData}
        />

        <IndustriesSection
          handleNavigation={handleNavigation}
          industriesRef={sectionsRef.industries}
          setFormData={setFormData}
        />

        <ProcessSection
          processRef={sectionsRef.process}
        />

        <PricingSection
          packagesRef={sectionsRef.packages}
          handlePackageSelect={handlePackageSelect}
        />

        <PortfolioSection
          portfolioRef={sectionsRef.portfolio}
        />

        <TestimonialsSection />

        <FAQSection
          faqRef={sectionsRef.faq}
        />

        <ContactSection
          contactRef={sectionsRef.contact}
          formData={formData}
          handleInputChange={handleInputChange}
          formSubmitted={formSubmitted}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          getWhatsAppLink={getWhatsAppLink}
        />
      </main>

      <Footer handleNavigation={handleNavigation} />
      
      <WhatsAppButton />
    </div>
  );
}
