'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, ChevronDown, ChevronRight, Menu, X, MessageCircle, Instagram, Star, CheckCircle, Shield, Users, BookOpen, Plane, FileText, GraduationCap, Clock, Heart, Globe, ArrowRight, Building2, Stethoscope, Award, ChevronUp } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_medbridge-global/artifacts/042n3hxo_569646AC-56FE-4B0A-806B-E4DB908FB83B.png';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudHN8ZW58MHx8fHwxNzgxNTM3NzM0fDA&ixlib=rb-4.1.0&q=85',
  vietnam: 'https://images.unsplash.com/photo-1658298044866-566882b0ed62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxIYSUyMExvbmclMjBCYXl8ZW58MHx8fGJsdWV8MTc4MTUzNzY5M3ww&ixlib=rb-4.1.0&q=85',
  russia: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxNb3Njb3clMjBLcmVtbGlufGVufDB8fHxibHVlfDE3ODE1Mzc2OTN8MA&ixlib=rb-4.1.0&q=85',
  georgia: 'https://images.unsplash.com/photo-1707907776310-0f22fe906a08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxUYmlsaXNpJTIwR2VvcmdpYXxlbnwwfHx8Ymx1ZXwxNzgxNTM3Njk0fDA&ixlib=rb-4.1.0&q=85',
  timorLeste: 'https://images.unsplash.com/photo-1709775533092-9dd5263d35a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwyfHxUaW1vciUyMExlc3RlfGVufDB8fHxibHVlfDE3ODE1Mzc3MDV8MA&ixlib=rb-4.1.0&q=85',
  campus1: 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwyfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MTUzNzczNHww&ixlib=rb-4.1.0&q=85',
  campus2: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHw0fHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MTUzNzczNHww&ixlib=rb-4.1.0&q=85',
  stethoscope: 'https://images.unsplash.com/photo-1655313719493-16ebe4906441?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZXxlbnwwfHx8fDE3ODE1Mzc3MzR8MA&ixlib=rb-4.1.0&q=85',
};

const WHATSAPP_NUMBER = '919960360549';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20MedBridge%20Educare,%20I%20am%20interested%20in%20MBBS%20abroad.`;
const PHONE_NUMBER = '+91 99603 60549';
const INSTAGRAM_LINK = 'https://www.instagram.com/medbridge_educare';

const countries = [
  {
    name: 'Vietnam',
    image: IMAGES.vietnam,
    flag: '🇻🇳',
    universities: ['Dong A University', 'Hong Bang International University'],
    highlights: ['Affordable Fees', 'NMC Recognized', 'English Medium', 'Safe Environment'],
    duration: '6 Years (incl. internship)',
    fees: 'Tuition: ~USD 4,500/year',
  },
  {
    name: 'Russia',
    image: IMAGES.russia,
    flag: '🇷🇺',
    universities: ['Crimea Federal University'],
    highlights: ['World-Class Education', 'NMC Listed', 'Rich Medical Heritage', 'Affordable Living'],
    duration: '6 Years (incl. internship)',
    fees: 'Total: ~₹25-26 Lakhs (6 Years)',
  },
  {
    name: 'Georgia',
    image: IMAGES.georgia,
    flag: '🇬🇪',
    universities: ['SEU (Georgian National University)'],
    highlights: ['European Standard', 'NMC Approved', 'No Donation', 'Global Recognition'],
    duration: '6 Years (incl. internship)',
    fees: 'Tuition: ~USD 5,900/year',
  },
  {
    name: 'Timor-Leste',
    image: IMAGES.timorLeste,
    flag: '🇹🇱',
    universities: ['UCT (Universidade Cristal Timor)'],
    highlights: ['Emerging Destination', 'NMC Compliant', 'Low Cost of Living', 'Tropical Climate'],
    duration: '5 Years (incl. internship)',
    fees: 'Total: ~₹14.5-18 Lakhs (Full Course)',
  },
];

const universities = [
  {
    name: 'Dong A University',
    country: 'Vietnam',
    image: IMAGES.campus1,
    highlights: ['NMC Approved', 'English Medium', 'Modern Campus', 'Clinical Training'],
    tuitionPerYear: '~USD 4,500/year',
    totalTuition: '~USD 27,000 (6 Years)',
    hostelFood: '~USD 1,200-1,500/year',
    estimatedTotal: '~₹30-35 Lakhs (incl. tuition, hostel, food)',
    intake: 'September',
    duration: '6 Years',
  },
  {
    name: 'Hong Bang International University',
    country: 'Vietnam',
    image: IMAGES.campus2,
    highlights: ['WHO Listed', 'International Faculty', 'Hospital Attached', 'Research-Oriented'],
    tuitionPerYear: 'USD 5,500-7,019/year (increases yearly)',
    totalTuition: '~USD 37,410 (6 Years)',
    hostelFood: '~USD 1,200-1,500/year',
    estimatedTotal: '~₹35-40 Lakhs (incl. tuition, hostel, food)',
    intake: 'September',
    duration: '6 Years',
  },
  {
    name: 'Crimea Federal University',
    country: 'Russia',
    image: IMAGES.russia,
    highlights: ['Government University', 'NMC Listed', 'Established Legacy', 'Advanced Labs'],
    tuitionPerYear: '~RUB 300,000-344,000/year',
    totalTuition: '~₹25.7 Lakhs (6 Years incl. hostel)',
    hostelFood: 'Hostel included; Indian mess ~USD 120/month',
    estimatedTotal: '~₹25-28 Lakhs (incl. tuition & hostel)',
    intake: 'September',
    duration: '6 Years',
  },
  {
    name: 'SEU - Georgian National University',
    country: 'Georgia',
    image: IMAGES.georgia,
    highlights: ['European Curriculum', 'NMC Approved', 'Global Recognition', 'Modern Infrastructure'],
    tuitionPerYear: '~USD 5,900/year',
    totalTuition: '~USD 35,400 (6 Years)',
    hostelFood: '~USD 3,000-3,500/year',
    estimatedTotal: '~₹35-45 Lakhs (incl. tuition, hostel, food)',
    intake: 'October',
    duration: '6 Years',
  },
  {
    name: 'UCT - Universidade Cristal Timor',
    country: 'Timor-Leste',
    image: IMAGES.timorLeste,
    highlights: ['NMC Compliant', 'Most Affordable', 'English Medium', 'Supportive Community'],
    tuitionPerYear: 'Year 1: USD 6,200; Year 2+: ~USD 3,180/year',
    totalTuition: '~USD 18,000-20,000 (Full Course)',
    hostelFood: '~USD 225-275/month (AC hostel + Indian food)',
    estimatedTotal: '~₹14.5-18 Lakhs (incl. tuition, hostel, food)',
    intake: 'March / September',
    duration: '5 Years',
  },
];

const admissionSteps = [
  { step: 1, title: 'Free Counseling', desc: 'Speak with our expert counselors to understand your options', icon: Phone },
  { step: 2, title: 'University Selection', desc: 'Choose the right university based on your preferences and budget', icon: Building2 },
  { step: 3, title: 'Application', desc: 'We handle your complete application process', icon: FileText },
  { step: 4, title: 'Admission Letter', desc: 'Receive your official university admission letter', icon: Award },
  { step: 5, title: 'Visa Processing', desc: 'Complete visa documentation and processing support', icon: Globe },
  { step: 6, title: 'Travel & Arrival', desc: 'Pre-departure briefing and travel assistance', icon: Plane },
  { step: 7, title: 'Enrollment', desc: 'University enrollment and settling-in support', icon: GraduationCap },
];

const faqs = [
  {
    q: 'Is MBBS abroad recognized in India?',
    a: 'Yes, MBBS degrees from NMC-listed universities are recognized in India. After completing your degree, you need to clear the FMGE/NExT exam to practice in India. All universities we recommend are NMC compliant.'
  },
  {
    q: 'What is the eligibility for MBBS abroad?',
    a: 'You need to have completed 10+2 with Physics, Chemistry, and Biology with a minimum of 50% marks (40% for reserved categories). You must also have a valid NEET qualification score.'
  },
  {
    q: 'What is the total cost of studying MBBS abroad?',
    a: 'The total cost varies by country and university. For example: UCT Timor-Leste costs approximately ₹14.5-18 Lakhs total, Crimea Federal University Russia around ₹25-28 Lakhs, Dong A University Vietnam around ₹30-35 Lakhs, and SEU Georgia around ₹35-45 Lakhs. These estimates include tuition, hostel, and basic living expenses. We provide complete transparent fee breakdowns for every university before you commit.'
  },
  {
    q: 'Is NEET required for MBBS abroad?',
    a: 'Yes, as per NMC guidelines, NEET qualification is mandatory for Indian students seeking MBBS admission abroad. You need a valid NEET scorecard for the eligibility certificate from NMC.'
  },
  {
    q: 'What is the medium of instruction?',
    a: 'All our partner universities offer MBBS programs in English medium. Some universities also offer optional local language courses to help students communicate with patients during clinical rotations.'
  },
  {
    q: 'Do you charge any hidden fees?',
    a: 'Absolutely not. MedBridge Educare is committed to 100% transparency. Every student receives a complete fee breakdown before admission. There are no hidden charges, no last-minute surprises. What we quote is what you pay.'
  },
  {
    q: 'What support do you provide after admission?',
    a: 'We provide end-to-end support including airport pickup, hostel arrangement, university enrollment assistance, local SIM and banking support, and ongoing academic guidance throughout your course duration.'
  },
  {
    q: 'What is the FMGE/NExT exam?',
    a: 'FMGE (Foreign Medical Graduate Examination) is a licensing exam conducted by NMC for doctors who completed MBBS abroad. It is being replaced by NExT (National Exit Test). Clearing this exam is mandatory to practice medicine in India.'
  },
];

const whyUsFeatures = [
  { icon: Shield, title: 'Transparent Fee Structure', desc: 'Complete fee disclosure with no hidden charges. Know exactly what you pay before committing.' },
  { icon: Users, title: 'Personalized Counseling', desc: 'One-on-one sessions with experienced counselors who understand your unique needs and aspirations.' },
  { icon: CheckCircle, title: 'NMC Guidance', desc: 'Expert guidance on NMC regulations, eligibility certificates, and compliance requirements.' },
  { icon: Plane, title: 'Visa Assistance', desc: 'End-to-end visa processing support with documentation guidance and interview preparation.' },
  { icon: BookOpen, title: 'Pre-Departure Support', desc: 'Comprehensive briefing on culture, climate, academics, and everything you need to know.' },
  { icon: Heart, title: 'Ongoing Student Assistance', desc: 'We stay with you throughout your journey — from admission to graduation and beyond.' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Countries', href: '#countries' },
    { label: 'Universities', href: '#universities' },
    { label: 'Process', href: '#process' },
    { label: 'NMC Info', href: '#nmc' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-24">
          <a href="#home" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="MedBridge Educare" className="h-14 md:h-16 w-auto" />
          </a>
          
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled ? 'text-navy-600 hover:text-teal-500 hover:bg-teal-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
            >
              Book Free Counseling
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy-600' : 'text-white'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-navy-600 hover:bg-teal-50 hover:text-teal-600 rounded-lg font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 bg-teal-500 text-white text-center px-5 py-3 rounded-lg font-semibold"
            >
              Book Free Counseling
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100vh] md:min-h-screen flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJIMjR2LTJoMTJ6TTM2IDI0djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">NMC-Compliant Universities Across 4 Countries</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Trusted Partner for{' '}
              <span className="text-teal-300">MBBS Abroad</span>{' '}
              Admissions
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              NMC-Compliant Universities, Transparent Guidance, and End-to-End Admission Support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-2xl hover:shadow-teal-500/25 hover:-translate-y-0.5"
              >
                <MessageCircle size={20} />
                Book Free Counseling
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                <Phone size={20} />
                WhatsApp Us
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 text-white/70">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} />
                <span className="text-sm">{PHONE_NUMBER}</span>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Instagram size={16} />
                <span className="text-sm">@medbridge_educare</span>
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.hero}
                alt="Medical Students"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-teal-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">4 Countries</p>
                  <p className="text-sm text-gray-500">5+ Universities</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                  <Shield className="text-gold-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">NMC</p>
                  <p className="text-sm text-gray-500">Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Why MedBridge Educare?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">We go beyond admissions. Our commitment is to your entire medical education journey.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {whyUsFeatures.map((feature, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
              <div className="w-14 h-14 bg-teal-50 group-hover:bg-teal-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                <feature.icon className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountriesSection() {
  return (
    <section id="countries" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Destinations</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Countries We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Explore top MBBS destinations with NMC-recognized universities and world-class medical education.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="aspect-[3/4] relative">
                <img
                  src={country.image}
                  alt={country.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="country-card-overlay absolute inset-0"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-3xl mb-2">{country.flag}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{country.name}</h3>
                  <div className="space-y-1 mb-3">
                    {country.universities.map((uni, i) => (
                      <p key={i} className="text-white/80 text-sm flex items-center gap-1">
                        <GraduationCap size={14} />
                        {uni}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {country.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-gold-300 font-semibold text-sm">{country.fees}</p>
                    <p className="text-white/60 text-xs">{country.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UniversitiesSection() {
  return (
    <section id="universities" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Our Partners</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Featured Universities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Each university is carefully vetted for NMC compliance, quality education, and student support.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {universities.map((uni, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative h-48 overflow-hidden">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-navy/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {uni.country}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>{uni.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {uni.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">{h}</span>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuition/Year</span>
                    <span className="font-semibold text-navy text-xs text-right max-w-[60%]">{uni.tuitionPerYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Tuition</span>
                    <span className="font-semibold text-navy text-xs text-right max-w-[60%]">{uni.totalTuition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hostel & Food</span>
                    <span className="font-semibold text-navy text-xs text-right max-w-[60%]">{uni.hostelFood}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Est. Total Cost</span>
                      <span className="font-bold text-teal-600 text-xs text-right max-w-[60%]">{uni.estimatedTotal}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Intake</span>
                    <span className="font-semibold text-navy">{uni.intake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-navy">{uni.duration}</span>
                  </div>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  Enquire Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdmissionProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Admission Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">A simple, guided journey from your first consultation to university enrollment.</p>
        </div>
        
        <div className="relative">
          {/* Desktop timeline line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-teal to-teal-200"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-4">
            {admissionSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-16 h-16 bg-white border-2 border-teal-200 group-hover:border-teal-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 mb-4">
                  <step.icon className="text-teal-600" size={24} />
                </div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8 bg-navy text-white text-xs font-bold rounded-full flex items-center justify-center -mt-2 -ml-5 z-20 shadow-md">
                  {step.step}
                </div>
                <h4 className="font-bold text-navy text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed px-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NMCSection() {
  return (
    <section id="nmc" className="py-16 md:py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-teal-300 font-semibold text-sm uppercase tracking-wider mb-3">Important Information</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">NMC Eligibility & Study Abroad Rules</h2>
            <p className="text-white/70 text-lg mb-8">Understanding NMC regulations is crucial for your MBBS abroad journey. Here's everything you need to know.</p>
            
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <MessageCircle size={20} />
              Get NMC Guidance
            </a>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'NEET Qualification Required', desc: 'All Indian students must qualify NEET before seeking MBBS admission abroad. A valid NEET scorecard is mandatory for the NMC eligibility certificate.' },
              { title: 'Eligibility Certificate from NMC', desc: 'Students must obtain an Eligibility Certificate from NMC before taking admission in any foreign medical university.' },
              { title: 'NMC Foreign Medical Graduate Regulations', desc: 'The university must be listed in the NMC/WHO directory. The course duration must be at least 54 months including internship.' },
              { title: 'Internship Requirements', desc: 'After completing MBBS abroad, students must complete a mandatory internship of 12 months in India under an NMC-recognized institution.' },
              { title: 'Licensing Pathway After Graduation', desc: 'Graduates must clear the FMGE/NExT examination to obtain a license to practice medicine in India. MedBridge provides guidance for exam preparation.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="text-teal-400" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="text-white" size={40} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Transparency Promise</h2>
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
          "Every student receives complete fee disclosure before admission. No hidden charges. No last-minute surprises. What we promise is what you get."
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all hover:-translate-y-0.5"
          >
            <MessageCircle size={20} />
            Request Fee Breakdown
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Priya Sharma', location: 'Delhi', text: 'MedBridge made my dream of studying MBBS abroad a reality. Their transparent approach and constant support gave my parents the confidence to send me overseas.', university: 'Dong A University, Vietnam', rating: 5 },
    { name: 'Rahul Patel', location: 'Gujarat', text: 'I was confused about NMC rules and eligibility. The counselors at MedBridge explained everything clearly. No hidden charges, just honest guidance.', university: 'Crimea Federal University, Russia', rating: 5 },
    { name: 'Ananya Reddy', location: 'Hyderabad', text: 'From application to arrival, MedBridge handled everything. The pre-departure support was especially helpful. I felt prepared for everything.', university: 'SEU, Georgia', rating: 5 },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Student Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">What Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Real experiences from students who trusted MedBridge Educare for their MBBS abroad journey.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="text-gold fill-gold" size={18} />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-navy" style={{ fontFamily: 'Inter, sans-serif' }}>{t.name}</p>
                    <p className="text-sm text-gray-500">{t.university}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faqs" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Got Questions?</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Find answers to the most common questions about MBBS abroad.</p>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIdx === idx ? 'border-teal-200 shadow-md bg-teal-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-semibold text-navy pr-4" style={{ fontFamily: 'Inter, sans-serif' }}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-teal-600 flex-shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build WhatsApp message with form data
    const parts = [
      `Hi MedBridge Educare, I'm interested in MBBS abroad.`,
      ``,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
    ];
    if (formData.email) parts.push(`Email: ${formData.email}`);
    if (formData.message) parts.push(`Message: ${formData.message}`);
    
    const whatsappMsg = encodeURIComponent(parts.join('\n'));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    
    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-3">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">Start Your MBBS Abroad Journey</h2>
            <p className="text-gray-600 text-lg mb-8">Fill out the form or reach us directly. Our counselors are available to guide you every step of the way.</p>
            
            <div className="space-y-5">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-navy" style={{ fontFamily: 'Inter, sans-serif' }}>WhatsApp</p>
                  <p className="text-gray-500">{PHONE_NUMBER}</p>
                </div>
              </a>
              
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-navy" style={{ fontFamily: 'Inter, sans-serif' }}>Call Us</p>
                  <p className="text-gray-500">{PHONE_NUMBER}</p>
                </div>
              </a>
              
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <Instagram className="text-pink-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-navy" style={{ fontFamily: 'Inter, sans-serif' }}>Instagram</p>
                  <p className="text-gray-500">@medbridge_educare</p>
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>Book Free Counseling Session</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none resize-none"
                    placeholder="Tell us about your interest or any questions..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} /> Send via WhatsApp
                </button>
              </div>
              
              {submitted && (
                <div className="mt-4 p-4 rounded-xl text-sm bg-green-50 text-green-700 border border-green-200">
                  Your enquiry has been opened in WhatsApp. If it didn't open, please message us directly at {PHONE_NUMBER}.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy to-navy-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <span className="inline-block text-teal-300 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Founded on Trust & Transparency</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              MedBridge Educare was founded with a simple mission — to provide honest, transparent, and reliable guidance to Indian students aspiring to study MBBS abroad. We believe every student deserves accurate information, fair pricing, and genuine support throughout their medical education journey.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              We partner with NMC-compliant universities across Vietnam, Russia, Georgia, and Timor-Leste. We don't just place students — we build long-term relationships based on trust and accountability. Every family that works with us receives complete transparency from day one.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-300">4</p>
                <p className="text-white/60 text-sm">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-300">5</p>
                <p className="text-white/60 text-sm">Partner Universities</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-300">100%</p>
                <p className="text-white/60 text-sm">Fee Transparency</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-300">End-to-End</p>
                <p className="text-white/60 text-sm">Support Provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="MedBridge Educare" className="h-16 w-auto mb-4" />
            <p className="text-white/60 text-sm leading-relaxed mb-4">Connecting You to Medical Careers. Your trusted partner for MBBS abroad admissions.</p>
            <div className="flex gap-3">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'Why Us', 'Countries', 'Universities', 'Process', 'NMC Info', 'FAQs', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-teal-300 text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Countries</h4>
            <ul className="space-y-2.5">
              {countries.map((c) => (
                <li key={c.name}>
                  <span className="text-white/60 text-sm flex items-center gap-2">{c.flag} {c.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-white/60 hover:text-white text-sm transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-teal-400" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-teal-400" />
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition-colors">@medbridge_educare</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} MedBridge Educare. All rights reserved.</p>
          <p className="text-white/40 text-sm">Connecting You to Medical Careers</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="text-white" size={28} />
      <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex gap-2">
      <a
        href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
        className="flex-1 bg-navy text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        <Phone size={16} /> Call Now
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-green-500 text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 md:bottom-8 left-4 md:left-8 z-50 w-12 h-12 bg-navy/80 hover:bg-navy rounded-full flex items-center justify-center shadow-lg transition-all"
    >
      <ChevronUp className="text-white" size={24} />
    </button>
  );
}

export default function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <CountriesSection />
      <UniversitiesSection />
      <AdmissionProcessSection />
      <NMCSection />
      <TransparencySection />
      <TestimonialsSection />
      <FounderSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
      <ScrollToTop />
    </main>
  );
}