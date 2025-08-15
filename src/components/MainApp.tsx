import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import AnimatedSphere from './AnimatedSphere';
import Footer from './Footer';
import FloatingAgentButton from './FloatingAgentButton';
import AnimatedLine from './AnimatedLine';
import BrandMarquee from './BrandMarquee';
import { Shield, Zap, CheckCircle, Users, Brain, FileText, Search, UserPlus, Bot, BellRing, BarChart3, Activity } from 'lucide-react';

const Section = forwardRef<HTMLElement, { id: string; children: React.ReactNode; className?: string }>(
  ({ id, children, className }, ref) => (
    <motion.section
      id={id}
      ref={ref}
      className={`min-h-screen w-full flex items-center justify-center relative px-5 sm:px-10 py-24 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
);
Section.displayName = 'Section';


const MainApp: React.FC = () => {
  const [showAgentButton, setShowAgentButton] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // We only need the ctaRef to determine when to hide the button
      if (ctaRef.current) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const ctaBottom = ctaRef.current.offsetTop + ctaRef.current.offsetHeight;

        // Show the button after the user scrolls down a bit (e.g., half the screen height)
        // and hide it just before the footer comes into view (as the CTA section ends).
        const isVisible = scrollY > windowHeight / 2 && scrollY < ctaBottom - windowHeight;

        setShowAgentButton(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreFeatures = [
    {
      icon: Bot,
      title: 'Aviator Anjura',
      description: 'Navigate smarter with our all new AI assistant.',
      longDescription: 'Your intelligent AI co‑pilot for claims management. Navigate processes with clear guidance, receive personalized support, and always have the latest information to keep claims moving efficiently.'
    },
    {
      icon: BellRing,
      title: 'Exyris',
      description: 'Smart Notification and Alert for approaching claim expiry.',
      longDescription: 'Smart deadline guardian for all claims and policies. Sends timely alerts, helpful reminders, and actionable insights so you remain in control and never miss important dates or renewals.'
    },
    {
      icon: BarChart3,
      title: 'AnalyticsIQ',
      description: 'Turning Data into Intelligent Decisions with powerful Data Analytics and visualization.',
      longDescription: 'Transforms your claims and policy data into clear, actionable insights. Spot emerging trends, identify potential risks, and optimize decisions with beautifully designed, intuitive dashboards and reports.'
    },
    {
      icon: Zap,
      title: 'TurboProcess',
      description: 'Lightning-fast claim processing with optimized workflows and intelligent automation.',
      longDescription: 'Automates repetitive claim management tasks, minimizes costly errors, and ensures full compliance. Achieve faster, more accurate resolutions while empowering your team and improving daily productivity.'
    },
    {
      icon: Activity,
      title: 'ClaimTrack',
      description: 'Monitor your claim every step with real-time status updates and detailed progress tracking.',
      longDescription: 'Track every claim in real time from submission to settlement. See progress, changes, timelines, and assigned handlers for unmatched transparency and confidence in the process.'
    },
    {
      icon: Shield,
      title: 'Secured Claims',
      description: 'Your data is protected with enterprise-grade security and AI-powered fraud prevention.',
      longDescription: 'Safeguards all sensitive claim data with encryption, multi‑factor authentication, and intelligent AI fraud detection—ensuring privacy, security, and complete trust at every single step.'
    }
  ];

  const aboutTags = [
    { icon: Bot, label: 'Aviator Anjura' }, // Corrected typo from Ajura to Anjura
    { icon: BellRing, label: 'Exyris' },
    { icon: BarChart3, label: 'AnalyticsIQ' },
    { icon: Zap, label: 'TurboProcess' },
    { icon: Activity, label: 'ClaimTrack' },
  ];

  return (
    <div className="relative w-full text-brand-secondary bg-gradient-to-br from-brand-bg-start via-brand-bg-mid to-brand-bg-end">
      <div className="fixed inset-0 -z-10">
        <AnimatedSphere />
      </div>
      <Header />
      <FloatingAgentButton isVisible={showAgentButton} />

      <main>
        {/* Hero Section */}
        <Section ref={heroRef} id="hero" className="flex-col text-center z-10 pt-32">
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-brand-primary leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Agile<br />
            Warranty<br />
            Claims
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-brand-secondary max-w-md md:max-w-xl mx-auto mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Revolutionizing Warranty<br />
            Management With AI-Powered<br />
            Claims Processing And<br />
            Customer Experience.
          </motion.p>
          
          <motion.div
            className="flex flex-col items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg w-full max-w-sm justify-center">
              <UserPlus className="w-6 h-6" />
              Register a Product
            </button>
            <div className="flex justify-center">
                <AnimatedLine />
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/80 text-brand-primary font-semibold rounded-full border-2 border-brand-primary/30 backdrop-blur-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 text-lg w-full max-w-sm justify-center">
              <FileText className="w-6 h-6" />
              Submit a Claim
            </button>
            <div className="flex justify-center">
                <AnimatedLine />
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/80 text-brand-primary font-semibold rounded-full border-2 border-brand-primary/30 backdrop-blur-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 text-lg w-full max-w-sm justify-center">
              <Search className="w-6 h-6" />
              Track Your Claim
            </button>
          </motion.div>
        </Section>

        {/* About Section */}
        <Section id="about">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-screen-lg items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary leading-tight mb-6">The Future of Warranty Management</h2>
              <p className="text-lg text-brand-light leading-relaxed">
                Claimmly transforms the traditional warranty experience with <span className="text-brand-accent font-semibold">AI-powered automation</span>. Our platform streamlines claims processing, reduces approval times from days to minutes, and delivers exceptional customer satisfaction through intelligent workflow management.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {aboutTags.map(({ icon: Icon, label }, i) => (
                <div key={label} className="bg-brand-accent/10 text-brand-accent px-6 py-3 rounded-full font-medium border border-brand-accent/20 animate-tag-float flex items-center gap-2" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Why Choose Claimmly Section */}
        <Section id="why-claimmly">
          <div className="max-w-screen-xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-primary leading-tight mb-6">Why Choose Claimmly?</h2>
              <p className="text-lg text-brand-light leading-relaxed max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with intuitive design to deliver results that matter, from AI assistance to lightning-fast processing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map(({ icon: Icon, title, description, longDescription }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="[perspective:1000px]"
                >
                  <motion.div
                    className="relative w-full min-h-[280px] [transform-style:preserve-3d]"
                    whileHover={{ rotateY: 180 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  >
                    {/* Front Face */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col">
                      <div className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center bg-brand-accent/10 text-brand-accent rounded-full">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary mb-3 pr-12">{title}</h3>
                      <p className="text-brand-light flex-grow">{description}</p>
                    </div>

                    {/* Back Face */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col justify-center items-center text-center">
                       <div className="w-12 h-12 flex items-center justify-center bg-brand-accent/10 text-brand-accent rounded-full mb-4">
                         <Icon className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-bold text-brand-primary mb-2">{title}</h3>
                       <p className="text-brand-light text-sm leading-relaxed">
                        {longDescription}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section id="cta" ref={ctaRef} className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
          <div className="text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary leading-tight mb-6">
              Ready to Transform Your Warranty Process?
            </h2>
            <p className="text-lg text-brand-light leading-relaxed mb-8">
              Join thousands of businesses using Claimmly to deliver exceptional warranty experiences. 
              Start your free trial today and see the difference AI-powered warranty management can make.
            </p>
            <div className="flex justify-center">
              <a 
                href="mailto:iamaadi.004@gmail.com"
                className="px-8 py-4 bg-brand-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block"
              >
                Business Support →
              </a>
            </div>
          </div>
        </Section>
        
        <BrandMarquee />

      </main>
      <Footer />
    </div>
  );
};

export default MainApp;
