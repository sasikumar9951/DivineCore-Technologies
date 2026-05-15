"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TransparentImage from "./TransparentImage";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects Done", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full border-b border-white/5 transition-all duration-300 ${isOpen ? "z-[10000] bg-[#050505]" : "z-[100] bg-deep-black/90 backdrop-blur-md"}`}>
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <TransparentImage 
                src="/images/logo.png" 
                alt="DivineCore Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-black tracking-[-0.02em] text-white">DivineCore</span>
              <span className="text-[8px] md:text-[9px] font-black text-gold-primary tracking-[0.4em] uppercase opacity-80">Technologies</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-extrabold text-white/50 transition-all hover:text-white uppercase tracking-[0.2em]"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-xl px-7 py-3 text-[12px] font-black gold-gradient text-deep-black hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all active:scale-95 ml-4"
            >
              Let's Connect
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-gold-primary transition-colors focus:outline-none z-[10001]"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#050505] flex flex-col transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-full"
        }`}
        style={{ zIndex: 9999, backgroundColor: '#050505' }}
      >
        {/* Overlay Content */}
        <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-8 mt-20">
          <div className="flex flex-col items-center space-y-6 w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-black text-white tracking-[0.3em] uppercase hover:text-gold-primary transition-all duration-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className={`pt-8 w-full flex justify-center transition-all duration-500 delay-500 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full max-w-[280px] text-center rounded-2xl py-5 text-lg font-black gold-gradient text-deep-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] transition-all active:scale-95"
            >
              Let's Connect
            </Link>
          </div>
        </div>

        {/* Overlay Footer */}
        <div className="p-10 text-center">
          <p className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">
            Engineering the Future
          </p>
        </div>

        {/* Decorative background blur element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-primary/5 rounded-full blur-[100px] -z-10" />
      </div>
    </>
  );
};

export default Navbar;
