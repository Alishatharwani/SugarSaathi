import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Import assets
import logo from './assets/logo.png';
import landingscreen from './assets/landingscreen.png';
import languagePhone from './assets/language-phone.png';
import voicePhone from './assets/voice-phone.png';
import foodPhone from './assets/food-phone.png';
import foodUpload from './assets/foodupload-phone.png';
import foodUpload2 from './assets/foodupload2-phone.png';
import founderPhoto from './assets/founder.jpg'; // Add your founder image to assets folder
import whyWeBuiltImage from './assets/built.png'; // Add image for why we built section

const colors = {
  navy: '#2c3e50',        // Primary Navy
  actionRed: '#e74c3c',   // Action Red
  lightGray: '#f8f9fa',   // Light Gray
  white: '#ffffff',       // Pure White
};



// App Screenshots Data
const appScreenshots = [
  {
    src: languagePhone,
    alt: 'Language Selection Screen',
    caption: 'Speak in your language',
  },
  {
    src: voicePhone,
    alt: 'Voice Interaction Screen',
    caption: 'Voice-Powered Interaction',
  },
  {
    src: foodPhone,
    alt: 'Food Tracking Main Screen',
    caption: 'Track meals effortlessly',
  },
  {
    src: foodUpload,
    alt: 'Meal Photo Upload Screen',
    caption: 'Snap and upload meals',
  },
  {
    src: foodUpload2,
    alt: 'Instant Meal Feedback Screen',
    caption: 'Get instant feedback',
  },
];

// Feature Showcase Component with Phone
const FeatureShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* App Screenshots Display */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative" style={{ aspectRatio: '9/19', maxHeight: 650 }}>
          {/* Clean Screenshot Display */}
          <motion.img
            key={activeIndex}
            src={appScreenshots[activeIndex].src}
            alt={appScreenshots[activeIndex].alt}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Feature Tabs with Enhanced Design */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {appScreenshots.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-full text-left p-6 rounded-2xl transition-all duration-500 border-2 group relative overflow-hidden ${
              activeIndex === index 
                ? 'shadow-xl transform scale-[1.02]' 
                : 'hover:shadow-lg hover:transform hover:scale-[1.01] border-gray-200'
            }`}
            style={{
              backgroundColor: activeIndex === index ? '#1e3a8a' : colors.white,
              color: activeIndex === index ? colors.white : colors.navy,
              borderColor: activeIndex === index ? '#1e3a8a' : 'transparent',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Background Gradient Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-500 ${
              activeIndex === index 
                ? 'from-blue-800 to-blue-900 opacity-100' 
                : 'from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100'
            }`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
              {/* Icon/Number */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-white/20 text-white' 
                  : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
              }`}>
                {index + 1}
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1">{item.caption}</div>
                <div className={`text-sm transition-colors duration-300 ${
                  activeIndex === index 
                    ? 'text-white/80' 
                    : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {item.alt}
                </div>
              </div>
              
              {/* Arrow Indicator */}
              <div className={`transition-all duration-300 ${
                activeIndex === index 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// FAQ Accordion Component
const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      question: 'Will it recognize Indian meals like roti, sabzi, or dosa?',
      answer: 'Yes! Our meal analysis is trained on thousands of Indian dishes and cooking methods to ensure accurate nutritional insights.'
    },
    {
      question: 'How do I log my meals using the app?',
      answer: 'Just click a photo, scan a barcode, or speak the dish name. The AI recognizes Indian foods and provides a full nutritional breakdown based on ingredients and cooking method.'
    },
    {
      question: 'Can my family or caregiver track my health through this app?',
      answer: 'Yes. You can grant secure access to caregivers or family members, allowing them to receive updates, reports, and emergency alerts.'
    },
    {
      question: "I can't understand English. What should I do?",
      answer: 'No worries! You can change the app to your language, just speak or select it, and everything will appear in that language.'
    },
    {
      question: 'Can I upload existing medical documents?',
      answer: 'Yes. Upload photos or PDFs anytime. The AI reads your reports and updates your health data regularly.'
    }
  ];

  return (
    <div className="space-y-5">
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="bg-white overflow-hidden mb-4 rounded-xl shadow-sm"
        >
          <button
            className="w-full text-left py-5 px-7 font-medium text-lg flex justify-between items-center focus:outline-none transition-all duration-200 rounded-xl border border-gray-200"
            style={{ 
              color: openIndex === idx ? colors.white : colors.navy,
              backgroundColor: openIndex === idx ? colors.navy : 'transparent',
              fontFamily: 'Manrope, sans-serif'
            }}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            {faq.question}
            <span className={`ml-4 text-2xl transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : 'rotate-0'}`}>
              &#9660;
            </span>
          </button>
          {openIndex === idx && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pb-5 px-7 text-base leading-relaxed"
              style={{ color: colors.navy }}
            >
              {faq.answer}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const waitlistRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    try {
      // Sanitize email input
      const sanitizedEmail = email.trim().toLowerCase();
      
      // Add new email
      await addDoc(collection(db, 'waitlist'), {
        email: sanitizedEmail,
        timestamp: new Date(),
        source: 'landing-page'
      });
      
      setShowSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Error saving email:', error);
      alert('Error saving email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      
      {/* Header */}
      <header className="px-6 md:px-12 py-5 border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SugarSaathi Logo" className="h-9 w-auto" />
          </div>
          <nav className="hidden md:flex gap-8 text-base">
            <a href="#" className="font-medium transition-colors" style={{ color: colors.navy }} onMouseEnter={(e) => e.currentTarget.style.color = colors.actionRed} onMouseLeave={(e) => e.currentTarget.style.color = colors.navy}>Home</a>
            <a href="#why-sugarsaathi" className="font-medium transition-colors" style={{ color: colors.navy }} onMouseEnter={(e) => e.currentTarget.style.color = colors.actionRed} onMouseLeave={(e) => e.currentTarget.style.color = colors.navy}>Why SugarSaathi</a>
            <a href="#footer" className="font-medium transition-colors" style={{ color: colors.navy }} onMouseEnter={(e) => e.currentTarget.style.color = colors.actionRed} onMouseLeave={(e) => e.currentTarget.style.color = colors.navy}>Contact Us</a>
            <a href="#features" className="font-medium transition-colors" style={{ color: colors.navy }} onMouseEnter={(e) => e.currentTarget.style.color = colors.actionRed} onMouseLeave={(e) => e.currentTarget.style.color = colors.navy}>Features</a>
            <button
              onClick={() => waitlistRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300"
              style={{ backgroundColor: colors.actionRed }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F6 0%, #FFE8E4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >

            <div className="mb-6">
              <img 
                src={logo} 
                alt="SugarSaathi" 
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <p className="text-2xl mb-8" style={{ color: colors.navy }}>
              Track less, live more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => waitlistRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${colors.actionRed} 0%, #B85A4A 100%)` }}
              >
                Claim Your Free 3-Month Plan
              </button>
              <button 
                onClick={() => document.getElementById('learn-about-us')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-300"
                style={{ color: colors.actionRed, borderColor: colors.actionRed }}>
                Learn More
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <img
              src={landingscreen}
              alt="SugarSaathi App"
              className="max-h-[500px] w-auto drop-shadow-2xl"
            />

          </motion.div>
        </div>
      </section>

      {/* A Glimpse Into Your Health Journey - Enhanced */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-800 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-700 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 relative inline-block" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>
              A Glimpse Into Your{' '}
              <span className="relative">
                Health
                {/* Scribbly Underline SVG */}
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-4" 
                  viewBox="0 0 200 20" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                >
                  <motion.path 
                    d="M5 15 Q25 5 45 12 T85 8 Q105 15 125 10 T165 12 Q185 8 195 15" 
                    stroke={colors.actionRed} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                    }}
                  />
                </motion.svg>
              </span>
              {' '}Journey
            </h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              See How SugarSaathi Simplifies Your Day.
            </motion.p>
          </motion.div>
          
          <FeatureShowcase />
        </div>
      </section>

      {/* Why We Built Section - V3 */}
      <section id="why-sugarsaathi" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>
              Why We Built SugarSaathi for You
            </h2>
            <p className="text-xl leading-relaxed mb-4" style={{ color: colors.navy, fontFamily: 'Manrope, sans-serif' }}>
              We created SugarSaathi to be your trusted health partner, understanding Indian foods, languages, and your health. Our mission is to help you manage diabetes simply and personally every day, so you can focus on living your best life.
            </p>
            <p className="text-xl font-bold" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>
              Finally, a Health App That Listens.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full h-80 rounded-xl shadow-sm overflow-hidden">
              <img 
                src={whyWeBuiltImage} 
                alt="Why We Built SugarSaathi" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - V3 */}
      <section id="features" style={{ backgroundColor: colors.lightGray }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>
            Everything You Need for a Healthier Life
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '', title: 'Effortless Voice Logging', desc: 'Use your voice or tap to log meals, insulin, and sugar.' },
              { icon: '', title: 'Quick 2-Minute Tracking', desc: 'Track everything you need in under 2 minutes, freeing up your time to focus on living.' },
              { icon: '', title: 'Smart Photo Analysis', desc: 'Snap your meals, and we\'ll help you estimate carbs, making tracking even simpler.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-6" style={{ color: colors.navy }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: colors.navy, fontFamily: 'Manrope, sans-serif' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section - V3 */}
      <section 
        ref={waitlistRef}
        id="waitlist"
        className="py-24 text-white"
        style={{ backgroundColor: colors.navy }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Join the SugarSaathi Waitlist</h2>
            <p className="mb-6 font-bold text-xl" style={{ color: colors.actionRed }}>FREE 3 MONTH PLAN FOR FIRST 100 USERS</p>
            <p className="mb-8 text-lg leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Be among the first to experience SugarSaathi with exclusive early access and onboarding support.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6 max-w-lg">
              <input
                type="email"
                required
                placeholder="Your Email Here"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-5 py-4 rounded-xl text-lg flex-grow focus:outline-none border-0 shadow-sm"
                style={{ color: colors.navy, minWidth: '300px', fontFamily: 'Manrope, sans-serif' }}
              />
              <button
                type="submit"
                className="font-semibold text-lg px-10 py-4 rounded-xl shadow-sm transition-all duration-300"
                style={{ backgroundColor: colors.actionRed, color: 'white', fontFamily: 'Manrope, sans-serif' }}
              >
                Join Now
              </button>
            </form>
            {showSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-700 text-sm">Thank you for joining! We'll notify you when SugarSaathi launches.</p>
              </div>
            )}
            <p className="font-medium text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Any Queries? Write Us At:{' '}
              <a href="mailto:sugarsaathi@gmail.com" className="underline hover:opacity-75 transition">
                sugarsaathi@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - V3 */}
      <section id="learn-about-us" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left" style={{ color: colors.navy, fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Note from Founder */}
      <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F6 0%, #FFE8E4 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-lg font-semibold tracking-wider uppercase mb-12" style={{ color: colors.navy }}>
            Note from Founder
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-lg md:text-xl mb-8 leading-relaxed text-justify" 
                   style={{ color: colors.navy, fontFamily: 'Manrope, sans-serif' }}>
                <p className="mb-4">
                  My family's personal journey with diabetes is the heart behind SugarSaathi. I saw the daily questions, the small frustrations, and the need for a guide that truly understands.
                </p>
                <p className="mb-4">
                  SugarSaathi was born from that experience. My mission is simple: to build the companion I wished my family had. <span className="underline" style={{ textDecorationColor: colors.actionRed }}>A 'Saathi' that speaks your language, simplifies the complex, and supports you, always.</span>
                </p>
                <p className="mb-4">
                  We are building this so that no one has to live in fear of sudden heart attacks or the devastating health consequences of this disease, all while wishing they just knew what was happening in their body.
                </p>
                <p className="font-semibold mb-4">
                  You are not alone in this.
                </p>
                <p className="text-lg md:text-xl mb-2" style={{ color: colors.navy, fontFamily: 'Manrope, sans-serif' }}>
                  With heartfelt support,
                </p>
                <p className="text-2xl" style={{ color: colors.actionRed, fontFamily: 'Manrope, sans-serif' }}>
                  Alisha Tharwani
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-end items-start -mt-32"
            >
              <div className="w-96 h-96 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={founderPhoto} 
                  alt="Alisha Tharwani - Founder of SugarSaathi" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="px-6 md:px-12 py-12 border-t border-gray-200 mt-12" style={{ backgroundColor: colors.lightGray, color: colors.navy }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="text-base text-left md:w-1/3 flex flex-col items-start">
            <img src={logo} alt="SugarSaathi Logo" className="h-12 w-auto mb-4" />
            <div id="contact" className="flex flex-col gap-3 w-full">
              <div className="font-semibold text-lg mb-2" style={{ color: colors.navy }}>Contact Us:</div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: colors.actionRed }}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.09 7.09a2.25 2.25 0 01-3.182 0l-7.09-7.09A2.25 2.25 0 012.25 6.993V6.75" /></svg>
                <a href="mailto:contact@sugarsaathi.com" className="hover:underline" style={{ color: colors.navy }}>contact@sugarsaathi.com</a>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: colors.actionRed }}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.09 7.09a2.25 2.25 0 01-3.182 0l-7.09-7.09A2.25 2.25 0 012.25 6.993V6.75" /></svg>
                <a href="mailto:sugarsaathi@gmail.com" className="hover:underline" style={{ color: colors.navy }}>sugarsaathi@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:w-1/3" style={{ color: colors.navy }}>
            <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline transition-colors duration-200">Home</a></li>
              <li><a href="#features" className="hover:underline transition-colors duration-200">Features</a></li>
              <li><a href="#learn-about-us" className="hover:underline transition-colors duration-200">About Us</a></li>
              <li><a href="#waitlist" className="hover:underline transition-colors duration-200">Join Waitlist</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm" style={{ color: colors.navy }}>
          SugarSaathi. Designed with <span style={{ color: colors.actionRed }}>♥</span>
        </div>
      </footer>
    </div>
  );
};

export default App;