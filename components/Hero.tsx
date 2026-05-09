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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32 bg-deep-black">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 text-left">
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {children}
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-fade-in [animation-delay:300ms]">
            {isHome ? (
              <div className="relative w-full aspect-square max-w-[700px] mx-auto flex items-center justify-center scale-110 lg:scale-125">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/hero_full_graphic.jpg" 
                    alt="DivineCore Hero Design" 
                    className="w-full h-full object-contain relative z-10 mix-blend-screen contrast-125 brightness-110"
                    style={{
                      maskImage: "radial-gradient(circle, black 50%, transparent 95%)",
                      WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 95%)"
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden gold-border-glow">
                {image || <div className="w-full h-full bg-dark-gray flex items-center justify-center text-white/10 font-bold">IMAGE_PLACEHOLDER</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
