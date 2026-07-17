// No imports needed, we store icon names as strings and do not use imported icon components.

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface IndustryItem {
  name: string;
  benefit: string;
  iconName: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  startingPrice: string;
  features: string[];
  ctaText: string;
  popular: boolean;
}

export interface PortfolioProject {
  id: number;
  name: string;
  businessType: string;
  description: string;
  features: string[];
  platform: 'Vercel' | 'Netlify';
  link: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChangeRequestType {
  title: string;
  description: string;
  iconName: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Local Business Website Design",
    description: "Professional websites custom-tailored for salons, clinics, restaurants, gyms, academies, real estate firms, and service-based local operations.",
    iconName: "Layers"
  },
  {
    id: 2,
    title: "Google Business Profile Website Conversion",
    description: "We use your existing Google Business Profile, reviews, photos, services, and location details to create a robust, trust-focused website structure.",
    iconName: "MapPin"
  },
  {
    id: 3,
    title: "Landing Pages",
    description: "High-converting, lightning-fast single pages tailored for specific services, special seasonal offers, direct ad campaigns, and seasonal promotions.",
    iconName: "FileText"
  },
  {
    id: 4,
    title: "Website Redesign",
    description: "Transform outdated or slow websites into modern, mobile-first, professional designs built specifically to prompt phone calls and inquiries.",
    iconName: "Paintbrush"
  },
  {
    id: 5,
    title: "Local SEO Setup",
    description: "Local keyword targeting, optimized meta tags, dedicated service schema, location descriptions, and a search-engine friendly codebase.",
    iconName: "Search"
  },
  {
    id: 6,
    title: "WhatsApp Lead Integration",
    description: "Direct-action booking triggers, sticky click-to-call buttons, customized WhatsApp template routing, and user-friendly lead forms.",
    iconName: "MessageSquareCode"
  },
  {
    id: 7,
    title: "Website Maintenance",
    description: "Hassle-free monthly updates for prices, seasonal deals, fresh photography, positive Google reviews, branch details, and content tweaks.",
    iconName: "RefreshCw"
  },
  {
    id: 8,
    title: "Portfolio & Branding Pages",
    description: "Polished online portfolios and personal brands designed for local freelancers, independent consultants, service providers, and agencies.",
    iconName: "Sparkles"
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    name: "Beauty Salons",
    benefit: "Show services, summer/seasonal deals, team gallery, real reviews, branches, and responsive WhatsApp booking buttons.",
    iconName: "Scissors"
  },
  {
    name: "Aesthetic Clinics",
    benefit: "Present procedures, safety guidelines, consulting notes, client reviews, price tables, before/after galleries, and appointment forms.",
    iconName: "Stethoscope"
  },
  {
    name: "Restaurants & Cafes",
    benefit: "Display interactive food menus, primary locations, opening hours, kitchen photos, dining reviews, and online order or reservation pathways.",
    iconName: "Utensils"
  },
  {
    name: "Gyms & Fitness Clubs",
    benefit: "Highlight membership tiers, group class schedules, trainer profiles, client transformations, physical location, and signup links.",
    iconName: "Dumbbell"
  },
  {
    name: "Doctors & Clinics",
    benefit: "Feature specialties, clinical backgrounds, clinic directions, patient testimonials, consultation procedures, and inquiry forms.",
    iconName: "Stethoscope"
  },
  {
    name: "Real Estate Agencies",
    benefit: "Highlight local property listings, neighborhood specialties, customer reviews, agent profiles, contact channels, and valuation bookings.",
    iconName: "Building"
  },
  {
    name: "Schools & Academies",
    benefit: "Share curriculum details, facility tours, age groups, parent success stories, registration instructions, and direct telephone contact.",
    iconName: "GraduationCap"
  },
  {
    name: "Law Firms",
    benefit: "Establish legal authority with practice areas, case reviews, lawyer credentials, localized maps, and secure consultation requests.",
    iconName: "Scale"
  },
  {
    name: "Repair Services",
    benefit: "Present quick repair types (AC, phone, plumbing), transparent pricing, service guarantees, fast calling options, and booking schedules.",
    iconName: "Wrench"
  },
  {
    name: "Construction Companies",
    benefit: "Showcase solid structural projects, material quality details, crew credentials, client reviews, safety badges, and estimate request triggers.",
    iconName: "Construction"
  },
  {
    name: "Event Planners",
    benefit: "Display elegant past events, decor catalog, custom catering packages, testimonial sliders, budget queries, and initial contact buttons.",
    iconName: "Calendar"
  },
  {
    name: "Local Shops",
    benefit: "Promote retail catalogues, in-store product launches, branch locations, directions, seasonal sales, reviews, and click-and-collect triggers.",
    iconName: "ShoppingBag"
  },
  {
    name: "Dental Clinics",
    benefit: "Outline specialized dental care treatments, staff smiles, sterile environment badges, transparent pricing structures, and booking portals.",
    iconName: "Stethoscope"
  },
  {
    name: "Hotels & Guest Houses",
    benefit: "Render gorgeous room selections, tourist guide recommendations, dynamic Google reviews, check-in options, and booking links.",
    iconName: "Hotel"
  },
  {
    name: "Car Services",
    benefit: "Highlight specialized mechanic services, tuning pricing, quick oil changes, visual repairs, real reviews, and call buttons for emergencies.",
    iconName: "Wrench"
  },
  {
    name: "Coaching Institutes",
    benefit: "Organize lesson structures, course pricing options, success rates, instructor experience details, parent ratings, and contact info.",
    iconName: "GraduationCap"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Google Business Profile Research",
    description: "We collect your public business details, positive reviews, authentic photos, services list, ratings, exact location, and analyze main local competitors."
  },
  {
    step: 2,
    title: "Client Information Confirmation",
    description: "We clarify and confirm key details with you: core services, updated pricing tiers, priority photos, phone numbers, WhatsApp links, business hours, and goals."
  },
  {
    step: 3,
    title: "Website Structure & SEO Planning",
    description: "We map out the conversion hierarchy, design the information flow, plan localized SEO keywords, and define target call-to-actions (CTAs)."
  },
  {
    step: 4,
    title: "Premium Design & Development",
    description: "We write clean code to build a modern, high-contrast, fully responsive website loaded with your validated business data, optimization features, and speed assets."
  },
  {
    step: 5,
    title: "GitHub & Vercel Deployment",
    description: "We hook your website up to a professional, serverless deployment chain on Vercel, ensuring global speed, security certificates, and 100% uptime."
  },
  {
    step: 6,
    title: "Mobile Optimization & Verification",
    description: "We rigorously test the live site on various mobile devices. We verify buttons, sticky elements, form submissions, navigation flow, and paint performance."
  },
  {
    step: 7,
    title: "Client Review & Live Handover",
    description: "We walk you through the site, execute immediate change requests, optimize assets, hand over project access, and set up your ongoing update system."
  }
];

export const PACKAGES: PackageItem[] = [
  {
    id: "starter",
    name: "Starter Website",
    tagline: "Best for growing sole proprietors and new local startups.",
    startingPrice: "Rs. 25,000 / $120",
    features: [
      "Modern, responsive single-page structure",
      "Tailwind optimized speed & aesthetic flow",
      "Comprehensive Services & Offerings sections",
      "Integrated review showcase & rating cards",
      "Sticky Call & WhatsApp direct action buttons",
      "Dynamic interactive Google Map embedding",
      "Local SEO foundation (meta tags & headings)",
      "Vercel global hosting deployment setup"
    ],
    ctaText: "Start Starter Website",
    popular: false
  },
  {
    id: "business",
    name: "Business Website",
    badge: "Most Popular",
    tagline: "Designed for established clinics, salons, and service brands.",
    startingPrice: "Rs. 45,000 / $220",
    features: [
      "Premium, multi-section/one-page flow layout",
      "Google Business Profile content extraction",
      "Structured services, packages, and pricing tables",
      "Interactive customized online contact/booking form",
      "Branch-by-branch location structures with maps",
      "High-contrast review carousel & rating badges",
      "Intermediate local SEO (keywords & site structures)",
      "GitHub source repository + Vercel deployment chain",
      "Prioritized post-launch startup support"
    ],
    ctaText: "Build Business Website",
    popular: true
  },
  {
    id: "growth",
    name: "Growth Website + Local SEO",
    tagline: "Perfect for dominant businesses seeking to maximize calls and leads.",
    startingPrice: "Rs. 75,000 / $350",
    features: [
      "Strategic conversion-first responsive design",
      "Comprehensive content sync from G-profile reviews",
      "Localized SEO keyword expansion and targeting",
      "Custom service-specific page configurations",
      "On-page schema markup for local SEO rankings",
      "Subtle micro-interactions & premium assets",
      "Monthly update cycles (pricing, deals, text)",
      "Regular speed audits and monthly analytics report",
      "Continuous support & change request response"
    ],
    ctaText: "Get Growth Plan",
    popular: false
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    name: "TR Signature Salon",
    businessType: "Beauty salon / multi-location salon website",
    description: "A premium salon website for TR Signature Salon, covering Burewala and Vehari branches with services, packages, gallery, reviews, booking form, and location information.",
    features: [
      "Salon Website",
      "Multi-location",
      "Booking Form"
    ],
    platform: "Vercel",
    link: "https://tr-signature-salon-burewala-seven.vercel.app/"
  },
  {
    id: 2,
    name: "Tohfa Sweets and Nazarah Cafe",
    businessType: "Sweets, bakery, and cafe website",
    description: "A modern food business website presenting bakery items, cafe branding, menu-style sections, gallery, and customer-focused business information.",
    features: [
      "Cafe Website",
      "Food Business",
      "Gallery"
    ],
    platform: "Vercel",
    link: "https://tofa-sweets-and-nazarah-cafe.vercel.app/"
  },
  {
    id: 3,
    name: "Tutors and Teachers Hub",
    businessType: "Education / tutor platform website",
    description: "An education-focused website designed for tutor discovery, teaching services, and academic support presentation.",
    features: [
      "Education Website",
      "Tutor Platform",
      "Lead Form"
    ],
    platform: "Vercel",
    link: "https://tutors-and-teachers-hub.vercel.app/"
  },
  {
    id: 4,
    name: "Syncora Systems",
    businessType: "Software / technology company website",
    description: "A professional technology business website for Syncora Systems with modern service sections and lead-generation structure.",
    features: [
      "Tech Website",
      "Services",
      "Modern UI"
    ],
    platform: "Vercel",
    link: "https://syncora-systems.vercel.app/"
  },
  {
    id: 5,
    name: "Super Burewala",
    businessType: "Local business / community-style website",
    description: "A local business website built for Super Burewala with responsive sections and business information presentation.",
    features: [
      "Local Business",
      "Responsive Design"
    ],
    platform: "Netlify",
    link: "https://superburewala.netlify.app/"
  },
  {
    id: 6,
    name: "Alfalah Engineering Works",
    businessType: "Engineering / industrial services website",
    description: "A professional website for Alfalah Engineering Works, presenting engineering services, business information, and contact options.",
    features: [
      "Engineering Website",
      "Industrial Services"
    ],
    platform: "Netlify",
    link: "https://alfalahengineringworks.netlify.app/"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a website if I already have a Google Business Profile?",
    answer: "Yes. A Google Business Profile helps people find your business name and hours on Maps, but a professional website gives customers structured pricing tables, organized lists of services, full photo galleries, active reviews, and easy booking forms in a branded environment. It builds unmatched local credibility and converts casual searches into actual customers."
  },
  {
    question: "Can you build a website using my Google Business Profile?",
    answer: "Yes, absolutely! We can extract your Google Business Profile information, verified reviews, photos, location map, and list of services as a starting point. We then verify and organize everything with you to construct a complete, high-converting professional website."
  },
  {
    question: "Do you build websites for all industries?",
    answer: "We focus specifically on local business industries. This includes aesthetic clinics, beauty salons, restaurants, guest houses, schools, gym systems, law firms, coaching institutes, clinics, dental centers, home repair providers, automotive service shops, and other local service providers."
  },
  {
    question: "Can you add WhatsApp booking?",
    answer: "Yes. Since local customers prefer instant replies, we place high-impact call-to-actions like floating call buttons, WhatsApp booking buttons, and quick consultation forms across your site. When a user clicks, they are routed straight to your phone or your direct WhatsApp chat with a pre-written message."
  },
  {
    question: "Can I request changes later?",
    answer: "Yes! Websites are not static. We provide a simple change-request workflow. If your hours change, you adjust your service prices, add dynamic seasonal bundles, or add fresh photos, you can submit an update and we'll apply it immediately."
  },
  {
    question: "Do you handle hosting and deployment?",
    answer: "Yes, we handle everything! We set up a secure GitHub repository and deploy your website to Vercel's global CDN. This gives your local business 100% free hosting for normal traffic, an automatic SSL lock (HTTPS), and extreme loading speeds on mobile devices."
  },
  {
    question: "How long does a website take to build?",
    answer: "Our standard turnaround time is incredibly fast, typically taking between 5 to 10 business days. The timeline depends on the overall size of the project and how quickly you can share or confirm your business details, prices, and photo preferences."
  }
];

export const WHY_CHOOSE_US: string[] = [
  "We understand local business websites and what triggers local inquiries",
  "We save you time by using your existing Google Business Profile data",
  "We build with direct conversion tools (sticky call buttons, booking forms, & WhatsApp routing)",
  "We create mobile-first, lightweight designs that load in milliseconds on cellular networks",
  "We organize complex lists of services, pricing matrices, and photo galleries professionally",
  "We provide full post-launch support with an easy, frictionless change request system",
  "We deploy using top-tier developer platforms (GitHub & Vercel) for maximum security and uptime",
  "We build completely custom and tailored layouts, entirely avoiding slow or generic templates"
];

export const UPDATE_TYPES: ChangeRequestType[] = [
  {
    title: "Price Changes",
    description: "Update your pricing catalog, treatment rates, or service fees in minutes.",
    iconName: "RefreshCw"
  },
  {
    title: "New Service Additions",
    description: "Add new treatments, products, courses, or service sectors as your business grows.",
    iconName: "Layers"
  },
  {
    title: "Gallery Updates",
    description: "Keep your gallery fresh with recent salon cuts, clinic rooms, or completed works.",
    iconName: "Paintbrush"
  },
  {
    title: "Offer & Deal Updates",
    description: "Launch temporary seasonal deals, summer sales, holiday packages, or discounts.",
    iconName: "Sparkles"
  },
  {
    title: "Phone & Address Changes",
    description: "Instantly update your contact numbers, business hours, or support email addresses.",
    iconName: "Smartphone"
  },
  {
    title: "Branch Additions",
    description: "Expanding? We seamlessly integrate your new branches, maps, and local indicators.",
    iconName: "MapPin"
  },
  {
    title: "Review Updates",
    description: "Showcase fresh 5-star testimonials from your Google Business Profile to build trust.",
    iconName: "MessageSquareCode"
  },
  {
    title: "Section Customizations",
    description: "Introduce new visual dividers, FAQ details, booking widgets, or staff biographies.",
    iconName: "Wrench"
  }
];
