import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

const Section = ({ title, subtitle, children, className = "", dark = false }: SectionProps) => {
  const bgClass = className.includes('bg-') ? '' : (dark ? 'bg-black' : 'bg-deep-black');
  
  return (
    <section className={`py-24 ${bgClass} ${className}`}>
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-20 max-w-3xl mx-auto">
            {title && <h2 className={`text-4xl md:text-5xl font-black mb-6 ${className.includes('bg-white') ? 'text-deep-black' : 'text-white'}`}>{title}</h2>}
            {subtitle && <p className={`text-lg ${className.includes('bg-white') ? 'text-black/60' : 'text-white/60'}`}>{subtitle}</p>}
            <div className="h-1 w-20 gold-gradient mx-auto mt-8 rounded-full" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
