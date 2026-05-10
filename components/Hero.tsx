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
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[#050505]">
      {/* Dynamic Background Elements - Kept for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
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
            {isHome ? (
              <div className="relative w-full aspect-square max-w-[650px] mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-gold-primary/5 blur-[100px] rounded-full animate-pulse" />
                <img 
                  src="/images/hero_full_graphic.jpg" 
                  alt="DivineCore Tech Graphic" 
                  className="w-full h-full object-contain relative z-10 mix-blend-screen contrast-125 brightness-110"
                  style={{
                    maskImage: "radial-gradient(circle, black 60%, transparent 95%)",
                    WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 95%)"
                  }}
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                {image || <div className="w-full h-full bg-dark-gray flex items-center justify-center text-white/10 font-bold tracking-widest">DIVINECORE</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
