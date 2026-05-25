import Link from "next/link";
import TransparentImage from "./TransparentImage";

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 relative">
                <TransparentImage 
                  src="/images/logo.png" 
                  alt="DivineCore Logo" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-xl font-black tracking-tight text-white">DivineCore</span>
                <span className="text-[10px] font-bold text-gold-primary tracking-[0.2em] uppercase">Technologies</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Empowering businesses with smart, scalable and future-ready IT solutions to drive growth and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {["Home", "About Us", "Projects Done", "Careers"].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : (item === 'Projects Done' ? '/projects' : `/${item.toLowerCase().replace(" ", "")}`)} className="hover:text-gold-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {[
                "Software Development",
                "BPO & Data Entry",
                "Cloud Solutions",
                "Mobile App Development",
                "Cybersecurity",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="hover:text-gold-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="space-y-1">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <a href="tel:+917448609951" className="hover:text-gold-primary transition-colors">+91 74486 09951</a>
                </div>
                <div className="pl-6">
                  <a href="tel:+916369081530" className="hover:text-gold-primary transition-colors">+91 63690 81530</a>
                </div>
              </li>
              <li className="flex items-center gap-2"><span>✉️</span> <a href="mailto:info@divinecoretech.in" className="hover:text-gold-primary transition-colors">info@divinecoretech.in</a></li>
              <li className="flex items-start gap-2 max-w-[250px]">
                <span className="mt-0.5">📍</span>
                <span>
                  No 5, 2nd Floor, Kandha Gounder Complex, Opp. Petrol Bunk, Meyyanur Main Road, Salem - 636004
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
          <p>© 2026 DivineCore Technologies. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-gold-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
