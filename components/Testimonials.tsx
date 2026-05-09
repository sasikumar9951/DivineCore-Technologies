import Section from "./Section";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The e-commerce platform developed for Revz Clothings completely elevated our brand. The shopping experience is incredibly fast, sleek, and our conversion rates have soared!",
      author: "Selvam",
      role: "Founder, Revz Clothings",
      rating: 5
    },
    {
      quote: "DivineCore transformed our outdated logistics system into a high-performance machine. Their attention to detail and technical expertise is truly unmatched in the industry.",
      author: "Rajesh Kumar",
      role: "CEO, LogiTrans India",
      rating: 5
    },
    {
      quote: "The FinTech wallet they developed for us has been a game-changer. Security and speed were our top priorities, and the team delivered a solution that exceeded our expectations.",
      author: "Sarah Jenifer",
      role: "CTO, NeoPay Global",
      rating: 5
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="light-card p-8 rounded-3xl relative flex flex-col justify-between">
          <div className="absolute -top-4 -left-4 w-12 h-12 gold-gradient rounded-full flex items-center justify-center text-white text-2xl font-serif">
            "
          </div>
          <div className="mb-8">
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i} className="text-gold-primary text-sm">★</span>
              ))}
            </div>
            <p className="text-black/60 italic leading-relaxed">
              "{t.quote}"
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-light-gray border border-gold-primary/20 flex items-center justify-center font-black text-gold-muted text-xs">
              {t.author.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h4 className="font-black text-deep-black text-sm">{t.author}</h4>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
