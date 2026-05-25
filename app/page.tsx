"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Preloader from "@/components/Preloader";
import Integrations from "@/components/Integrations";
import { useState, useEffect } from "react";

// Final production deployment with SMTP fixes

export default function Home() {
  const services = [
    {
      title: "Custom Software",
      description: "Bespoke enterprise applications designed to streamline your business workflows and drive efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      )
    },
    {
      title: "Cloud Infrastructure",
      description: "Secure and scalable cloud architecture optimized for performance across AWS, Azure, and Google Cloud.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c.3 0 .5 0 .8-.1a4.5 4.5 0 0 0 .4-8.9 7 7 0 1 0-13.4-1.1 5.5 5.5 0 0 0 .7 10.1"></path></svg>
      )
    },
    {
      title: "Web & Mobile Apps",
      description: "High-performance digital experiences that combine stunning design with seamless functionality on all devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      )
    },
    {
      title: "Data Security",
      description: "Proactive threat management and advanced encryption protocols to safeguard your most critical assets.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      )
    },
    {
      title: "BPO & Data Entry",
      description: "Scalable business process outsourcing and precision data management to optimize your operational efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      )
    },
    {
      title: "Digital Strategy",
      description: "Strategic technology roadmaps that align your digital presence with long-term business objectives.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      )
    }
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if it's the first visit in this session to avoid showing loader on every internal navigation
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    
    if (hasLoaded) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3000); // Reduced from 10s to 3s total
      return () => clearTimeout(timer);
    }
  }, []);

  const stats = [
    { label: "Happy Clients", value: "25+", icon: "👥" },
    { label: "Projects Delivered", value: "50+", icon: "🚀" },
    { label: "Founded In", value: "2024", icon: "🏆" },
    { label: "Location", value: "Salem", icon: "🌐" }
  ];

  return (
    <>
      {loading && <Preloader />}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
        <Hero
          title="Engineering the Future of Digital Excellence"
          subtitle="We build high-performance, scalable and secure digital solutions that help businesses innovate, grow and lead in the digital era."
          isHome
        />

        <Section className="bg-white py-16 border-b border-black/5 overflow-hidden">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black tracking-[0.3em] text-gold-muted uppercase">TRUSTED BY BUSINESSES WORLDWIDE</span>
          </div>
          <div className="w-full mask-gradient">
            <div className="animate-marquee gap-16 md:gap-24 py-4 flex items-center">
              {[...["Microsoft", "AWS", "Google Cloud", "ORACLE", "CISCO", "DELL", "vmware", "IBM", "Intel", "Salesforce"], ...["Microsoft", "AWS", "Google Cloud", "ORACLE", "CISCO", "DELL", "vmware", "IBM", "Intel", "Salesforce"]].map((brand, idx) => (
                <span key={idx} className="text-xl md:text-2xl font-black text-deep-black opacity-60 grayscale hover:opacity-100 hover:grayscale-0 tracking-tighter hover:text-gold-primary transition-all duration-300 cursor-pointer shrink-0">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section className="bg-white pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">WHO WE ARE</span>
              <h2 className="text-4xl md:text-5xl font-black text-deep-black mb-8">Empowering Businesses Through Innovation</h2>
              <p className="text-black/60 text-lg leading-relaxed mb-8">
                Based in Salem, Tamilnadu, DivineCore Technologies is a premier IT consulting and software development firm. We specialize in building scalable, secure, and high-performance digital solutions for enterprises worldwide.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-black text-deep-black">2024</h4>
                  <p className="text-gold-muted font-bold text-xs uppercase tracking-widest">Year Founded</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-deep-black">50+</h4>
                  <p className="text-gold-muted font-bold text-xs uppercase tracking-widest">Projects Done</p>
                </div>
              </div>
              <Link href="/about" className="inline-block mt-12 text-deep-black font-black border-b-2 border-gold-primary pb-1 hover:text-gold-muted transition-colors">
                Learn More About Us →
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/images/who_we_are.png" 
                alt="DivineCore Technologies Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Expertise Section */}
        <Section className="bg-white">
          <div className="text-center mb-20">
            <span className="section-tag text-center">OUR EXPERTISE</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-black">Solutions That Drive Real Impact</h2>
            <p className="text-black/40 mt-4 max-w-2xl mx-auto">Scalable, secure, and high-performance digital products engineered for excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div key={index} className="p-8 rounded-3xl bg-light-gray/20 border border-black/5 hover:border-gold-primary/30 transition-all group text-left">
                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-lg font-black text-deep-black mb-3">{service.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Featured Projects Section */}
        <Section className="bg-[#050505] text-white">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl text-left">
              <span className="section-tag border-gold-primary/30 text-gold-primary">PORTFOLIO SHOWCASE</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-4">Engineering <span className="gold-text-gradient">Impact</span></h2>
              <p className="text-white/40 mt-6 leading-relaxed text-lg">A glimpse into the high-performance digital products we've engineered for our global partners.</p>
            </div>
            <Link href="/projects" className="group flex items-center gap-3 text-gold-primary font-black text-xs uppercase tracking-[0.3em] hover:text-white transition-all duration-300">
              Explore All Projects
              <span className="w-8 h-px bg-gold-primary/40 group-hover:w-12 group-hover:bg-white transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Aero Airworthiness",
                category: "Aviation Certification",
                image: "/images/aero.png",
                desc: "Premium aviation certification platform providing full-spectrum FAA support and regulatory expertise."
              },
              {
                title: "Swan Match",
                category: "Mobile Application",
                image: "/images/swan.png",
                desc: "International marriage matchmaking app with real-time chat and advanced profile matching algorithms."
              },
              {
                title: "Revz Clothings",
                category: "E-Commerce",
                image: "/images/revz.png",
                desc: "Fully functional e-commerce platform with seamless payment integration and order management."
              }
            ].map((project, i) => (
              <Link key={i} href="/projects" className="group">
                <div className="flex flex-col h-full bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-gold-primary/30 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] hover:-translate-y-3 relative">
                  <div className="aspect-[16/11] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gold-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 blur-2xl" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-gold-primary z-20">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow relative text-left">
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-gold-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-10 flex-grow group-hover:text-white/60 transition-colors">
                      {project.desc}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-[10px] font-black text-gold-primary uppercase tracking-[0.2em] flex items-center gap-3">
                        View Case Study
                        <div className="w-6 h-6 rounded-full border border-gold-primary/30 flex items-center justify-center group-hover:bg-gold-primary group-hover:text-deep-black transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section className="bg-[#0a0a0a] text-white">
          <div className="text-center mb-16">
            <span className="section-tag border-gold-primary/30 text-gold-primary">WHY DIVINECORE TECHNOLOGIES</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6">
              Built Different, <span className="gold-text-gradient">Delivered Better</span>
            </h2>
            <p className="text-white/40 mt-6 max-w-2xl mx-auto leading-relaxed">
              We combine technical excellence with creative vision to produce digital solutions that truly stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Expert Team",
                desc: "Skilled engineers, designers and strategists with years of industry experience across diverse domains and tech stacks.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              },
              {
                title: "Fast Delivery",
                desc: "Agile workflows and lean processes ensure your project ships on time — without sacrificing quality or attention to detail.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><path d="m13 2-2 10h3L11 22l2-10h-3Z" /></svg>
              },
              {
                title: "Secure & Scalable",
                desc: "Security-first architecture and scalable design ensure your product is ready for growth from day one.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              },
              {
                title: "24/7 Support",
                desc: "Dedicated post-launch support and maintenance plans so your products stay performant and up-to-date always.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M12 7v5l3 3"></path></svg>
              },
              {
                title: "Premium Design",
                desc: "Every pixel is intentional. We craft interfaces that are not only beautiful but delightfully easy to use.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><path d="m12 19 9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              },
              {
                title: "Transparent Process",
                desc: "Clear communication, regular updates, and complete project transparency from kickoff to deployment.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary"><path d="M17 6.1H3" /><path d="M21 12.1H3" /><path d="M15.1 18H3" /></svg>
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-primary/30 transition-all flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Integrations />



        <Section className="bg-white">
          <div className="text-center mb-16">
            <span className="section-tag text-center">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-black">What Our Clients Say</h2>
          </div>
          <Testimonials />
        </Section>

        <Section className="bg-white">
          <div className="text-center mb-16">
            <span className="section-tag text-center">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-deep-black">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </Section>
      </div>
    </>
  );
}
