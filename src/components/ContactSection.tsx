import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  contactRef: React.RefObject<HTMLDivElement | null>;
  formData: {
    name: string;
    businessName: string;
    phoneOrWhatsApp: string;
    serviceNeeded: string;
    requirements: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  formSubmitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
  getWhatsAppLink: () => string;
}

export default function ContactSection({
  contactRef,
  formData,
  handleInputChange,
  formSubmitted,
  handleSubmit,
  resetForm,
  getWhatsAppLink
}: ContactSectionProps) {
  return (
    <section 
      ref={contactRef}
      id="contact" 
      className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60 relative transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/40 to-transparent z-0" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Immediate Connection</span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-slate-950 dark:text-white mt-2">
            Request a Website Consultation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
            Share a few details about your business and website requirements. After reviewing them, select the WhatsApp button to send your enquiry directly to BrainIdeas Digital.
          </p>
          <div className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-4 rounded-full" aria-hidden="true"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left informational block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-950 text-white rounded-2xl p-8 shadow-sm relative overflow-hidden border border-slate-900">
              <div className="absolute right-0 bottom-0 w-40 h-40 bg-indigo-600/10 rounded-full blur-2xl" aria-hidden="true"></div>
              
              <span className="bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-mono mb-6 inline-block">Direct Support</span>
              <h3 className="text-xl font-bold font-display text-white mb-4">BrainIdeas Support Desk</h3>
              
              <div className="space-y-4">
                <a 
                  id="contact-call-link"
                  href="tel:+923377105205"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
                >
                  <div className="bg-slate-900 p-2 rounded-xl text-indigo-400">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Call Us Directly</span>
                    <span className="font-bold text-slate-200">+92 337 7105205</span>
                  </div>
                </a>

                <a 
                  id="contact-whatsapp-link"
                  href="https://api.whatsapp.com/send?phone=923377105205"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-1"
                >
                  <div className="bg-slate-900 p-2 rounded-xl text-emerald-400">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Live WhatsApp Support</span>
                    <span className="font-bold text-slate-200">+92 337 7105205</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="bg-slate-900 p-2 rounded-xl text-indigo-400 font-bold text-xs uppercase font-mono">@</div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Send Email Request</span>
                    <span className="font-bold text-slate-200">brainideasdigital@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono" htmlFor="contact-name">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium transition-all"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono" htmlFor="contact-biz-name">Business Name *</label>
                      <input
                        id="contact-biz-name"
                        type="text"
                        name="businessName"
                        required
                        placeholder="My Local Salon / Cafe"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone or WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono" htmlFor="contact-phone-whatsapp">Phone or WhatsApp Number *</label>
                      <input
                        id="contact-phone-whatsapp"
                        type="tel"
                        name="phoneOrWhatsApp"
                        required
                        placeholder="e.g. +92 300 1234567"
                        value={formData.phoneOrWhatsApp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium transition-all"
                      />
                    </div>

                    {/* Service Needed Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono" htmlFor="contact-service-needed">Service Needed *</label>
                      <select
                        id="contact-service-needed"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-medium cursor-pointer"
                      >
                        <option value="New Website" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">New Website</option>
                        <option value="Website Redesign" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Website Redesign</option>
                        <option value="Landing Page" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Landing Page</option>
                        <option value="Local SEO" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Local SEO</option>
                        <option value="Website Maintenance" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Website Maintenance</option>
                        <option value="Not Sure Yet" className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">Not Sure Yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Brief requirements */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-mono" htmlFor="contact-requirements">Brief requirements</label>
                    <textarea
                      id="contact-requirements"
                      name="requirements"
                      rows={4}
                      placeholder="Tell us about your services, locations, or special features you'd like on your website..."
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-slate-800 dark:text-slate-100 font-normal"
                    ></textarea>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-button"
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-sm text-sm cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>Request Website Consultation</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-100 dark:border-indigo-900/60">
                    <CheckCircle2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display text-slate-950 dark:text-white mb-2">Your WhatsApp Message Is Ready</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-8 max-w-md mx-auto font-normal">
                    Thank you, <span className="font-bold text-slate-950 dark:text-white">{formData.name}</span>. Your details have not been sent yet. Select ‘Send Details on WhatsApp’ to deliver them to BrainIdeas Digital.
                  </p>

                  {/* Captured details preview */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800/80 rounded-2xl p-6 text-left text-xs mb-8 space-y-2 max-w-md mx-auto font-mono text-slate-800 dark:text-slate-200">
                    <p><span className="text-slate-400 dark:text-slate-500 font-medium">Name:</span> {formData.name}</p>
                    <p><span className="text-slate-400 dark:text-slate-500 font-medium">Business:</span> {formData.businessName}</p>
                    <p><span className="text-slate-400 dark:text-slate-500 font-medium">Service Needed:</span> {formData.serviceNeeded}</p>
                    <p><span className="text-slate-400 dark:text-slate-500 font-medium">Phone/WhatsApp:</span> {formData.phoneOrWhatsApp}</p>
                  </div>

                  <div className="space-y-4 max-w-md mx-auto">
                    <a 
                      id="success-whatsapp-link"
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-sm inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <MessageSquare className="w-5 h-5" aria-hidden="true" />
                      <span>Send Details on WhatsApp</span>
                    </a>

                    <button 
                      id="submit-another-inquiry"
                      onClick={resetForm}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline font-semibold block mx-auto cursor-pointer focus:outline-none"
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
  );
}
