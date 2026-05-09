import Link from "next/link";
import TransparentImage from "./TransparentImage";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-deep-black/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-16 h-16 relative">
            <TransparentImage 
              src="/images/logo.png" 
              alt="DivineCore Logo" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-white">DivineCore</span>
            <span className="text-[10px] font-bold text-gold-primary tracking-[0.2em] uppercase">Technologies</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Services", href: "/services" },
            { name: "Projects Done", href: "/projects" },
            { name: "Careers", href: "/careers" },
            { name: "Contact Us", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold text-white/70 transition-colors hover:text-gold-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="rounded-full px-6 py-2.5 text-[13px] font-black gold-gradient text-deep-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95"
        >
          Let's Connect
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
