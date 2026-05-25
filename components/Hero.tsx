import Link from "next/link";
import { ReactNode } from "react";
import TransparentImage from "./TransparentImage";

interface HeroProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  isHome?: boolean;
  image?: ReactNode;
}

const Hero = ({ title, subtitle, children, isHome = false, image }: HeroProps) => {
  if (isHome) {
    return (
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28 bg-[#050505] flex flex-col justify-center min-h-[90vh] z-10">
        {/* Background Arc/Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Large golden ring behind layout */}
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-gold-primary/5 blur-[130px] rounded-full animate-pulse duration-[8s]" />
          {/* Blue/turquoise glow on the lower-right side of laptop */}
          <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in flex flex-col items-start text-left">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-black uppercase tracking-[0.3em] text-gold-primary mb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
                DIVINECORE TECHNOLOGIES
              </div>

              {/* Custom Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white max-w-2xl">
                Engineering the Future of <br className="hidden sm:inline" />
                <span className="gold-text-gradient">Digital Excellence</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-medium">
                {subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/services" className="gold-gradient text-deep-black px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-[0_15px_30px_rgba(212,175,55,0.35)] transition-all active:scale-95 text-center flex items-center justify-center gap-2 group">
                  Explore Services 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link href="/projects" className="bg-white/5 border border-white/10 hover:border-gold-primary/40 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-white/[0.08] transition-all active:scale-95 text-center flex items-center justify-center">
                  View Projects
                </Link>
              </div>

              {/* Core Capabilities Inline Pills */}
              <div className="pt-6 w-full space-y-4">
                <span className="text-[10px] font-black tracking-[0.2em] text-gold-muted uppercase block">Enterprise Pillars</span>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Bespoke Enterprise Software",
                    "Scalable Cloud Systems",
                    "Premium UI/UX Engineering",
                    "Advanced Data Analytics & AI",
                    "Proactive Cybersecurity Solutions"
                  ].map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:border-gold-primary/20 transition-all duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                      <span className="text-xs font-bold text-white/75">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-5) */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end select-none animate-fade-in [animation-delay:300ms] py-6 lg:py-0">
              {/* Subtle Ambient Glow */}
              <div className="absolute inset-0 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />
              
              {/* Premium Abstract Corporate Bezel Frame */}
              <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[380px] h-[480px] sm:h-[540px] lg:h-[640px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <img
                  src="/images/hero_corporate_professional.png"
                  alt="DivineCore Technologies Network Connections"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                {/* Elegant overlay gradient to blend bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* 5. Horizontal Statistics Bar (Bottom integrated panel) */}
          <div className="mt-16 w-full p-6 md:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md shadow-2xl relative overflow-hidden animate-fade-in [animation-delay:600ms]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-primary/2 to-transparent pointer-events-none" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {[
                {
                  value: "25+",
                  label: "Projects Delivered",
                  icon: (
                    <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M4.5 16.5c-1.5 1.26-2 3.38-2 3.38s2.12-.5 3.38-2M22 2l-7.5 7.5M10.5 13.5l-3 3M16.5 7.5l-3 3M19 5.5c-1-1-2.5-1-3.5 0l-5.5 5.5A7.5 7.5 0 0 0 7 17l.5.5A7.5 7.5 0 0 0 13 14.5l5.5-5.5c1-1 1-2.5 0-3.5Z" />
                    </svg>
                  )
                },
                {
                  value: "15+",
                  label: "Happy Clients",
                  icon: (
                    <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  value: "10+",
                  label: "Industries Served",
                  icon: (
                    <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )
                },
                {
                  value: "99%",
                  label: "Client Satisfaction",
                  icon: (
                    <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )
                }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4.5 group pt-6 md:pt-0 md:pl-8 first:pt-0 first:pl-0">
                  <div className="w-11 h-11 rounded-xl bg-gold-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white group-hover:text-gold-primary transition-colors">{stat.value}</h3>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Generic fallback Hero for subpages
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[#050505] z-10">
      {/* Dynamic Background Elements - Kept for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-gold-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 text-left">
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-gold-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
              DivineCore Technologies
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {children}
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-fade-in [animation-delay:300ms]">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              {image || <div className="w-full h-full bg-dark-gray flex items-center justify-center text-white/10 font-bold tracking-widest">DIVINECORE</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
