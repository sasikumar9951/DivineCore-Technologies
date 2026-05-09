"use client";

import { useEffect, useState } from "react";
import TransparentImage from "./TransparentImage";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    // Faster progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Reduced exit delay for snappier feel
          setTimeout(() => setIsExit(true), 800); 
          return 100;
        }
        // Random but faster increments (target ~2s total)
        return prev + Math.random() * 8 + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-all duration-1000 ease-in-out ${
        isExit ? "opacity-0 invisible scale-110" : "opacity-100 visible scale-100"
      }`}
    >
      {/* Background Decorative Elements - Enhanced for premium feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-primary/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative w-40 h-40 mb-12 group">
          {/* Outer Rotating Rings */}
          <div className="absolute inset-0 rounded-full border border-gold-primary/20 animate-[spin_6s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-gold-primary/30 animate-[spin_4s_linear_infinite_reverse]" />
          <div className="absolute inset-[-10px] rounded-full border-[0.5px] border-gold-primary/10 animate-[spin_10s_linear_infinite]" />
          
          {/* Main Logo Container with Glassmorphism */}
          <div className="absolute inset-2 rounded-full bg-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)] overflow-hidden">
            <div className="w-[75%] h-[75%] relative z-10">
              <TransparentImage 
                src="/images/logo.png" 
                alt="DivineCore Logo" 
                className="w-full h-full object-contain"
                threshold={240}
              />
            </div>
            
            {/* Inner Glow and Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/10 via-transparent to-white/5 opacity-40" />
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
          
          {/* Pulsing Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-gold-primary/5 animate-ping-slow opacity-20" />
        </div>

        {/* Text and Progress - Staggered Reveal */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-white font-black text-2xl tracking-[0.4em] uppercase opacity-90 animate-[fade-in_1s_ease-out]">
              DivineCore
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-gold-primary/30" />
              <p className="text-gold-primary/60 font-bold text-[11px] tracking-[0.6em] uppercase">
                Engineering Excellence
              </p>
              <div className="h-[1px] w-8 bg-gold-primary/30" />
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="w-64 h-[3px] bg-white/5 rounded-full overflow-hidden relative">
              <div 
                className="h-full gold-gradient transition-all duration-300 ease-out relative z-10"
                style={{ width: `${progress}%` }}
              >
                {/* Progress Light Tip */}
                <div className="absolute right-0 top-0 h-full w-4 bg-white blur-sm opacity-50" />
              </div>
            </div>
            <div className="flex justify-between w-64 text-[10px] font-black text-gold-primary/40 tracking-widest uppercase">
              <span>Initializing</span>
              <span className="text-white/60">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 opacity-30">
        <div className="flex items-center gap-6">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-primary" />
          <div className="w-2 h-2 rotate-45 border border-gold-primary" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-primary" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.8em] text-white/50 uppercase">Salem &bull; Tamilnadu</span>
      </div>
    </div>
  );
};

export default Preloader;

