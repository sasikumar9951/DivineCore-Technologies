import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  variant?: "glass" | "light";
}

const Card = ({ children, className = "", title, icon, variant = "glass" }: CardProps) => {
  const baseStyles = variant === "light" ? "light-card" : "glass-card gold-border-glow";
  
  return (
    <div className={`${baseStyles} p-8 rounded-2xl group transition-all duration-300 ${className}`}>
      {icon && (
        <div className={`mb-6 h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${variant === 'light' ? 'bg-gold-primary/10 text-gold-primary' : 'gold-gradient text-deep-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'}`}>
          {icon}
        </div>
      )}
      {title && <h3 className={`text-xl font-bold mb-4 transition-colors ${variant === 'light' ? 'text-deep-black group-hover:text-gold-primary' : 'text-white group-hover:text-gold-primary'}`}>{title}</h3>}
      <div className={`leading-relaxed ${variant === 'light' ? 'text-black/60' : 'text-white/60'}`}>{children}</div>
    </div>
  );
};

export default Card;
