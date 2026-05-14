import Section from "./Section";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Working with DivineCore Technologies has been an outstanding experience from day one. Their team demonstrated professionalism, technical expertise, responsiveness, and a true commitment to delivering high-quality results. They consistently handled complex requirements with precision and exceeded expectations throughout the development process. One of the best technology companies I have ever worked with, and I highly recommend them to anyone looking for serious, high-level development support.",
      author: "Mohammed El Imadi",
      role: "CEO, Aero Airworthiness Certification LLC",
      rating: 5
    },
    {
      quote: "The e-commerce platform developed for Revz Clothings completely elevated our brand and redefined our digital presence. The shopping experience is incredibly fast, sleek, and our conversion rates have soared since launch! The team's ability to blend high-end design with robust performance was exactly what we needed to scale our operations globally. We couldn't be happier with the technical support and creative vision DivineCore brought to this project.",
      author: "Selvam",
      role: "Founder, Revz Clothings",
      rating: 5
    },
    {
      quote: "DivineCore transformed our outdated logistics system into a high-performance machine that handles complex routing and real-time tracking with ease. Their attention to detail and technical expertise is truly unmatched in the industry today. They delivered a scalable infrastructure that has significantly reduced our operational overhead while increasing transparency across our entire supply chain. A truly professional partner for enterprise-grade solutions.",
      author: "Rajesh Kumar",
      role: "CEO, LogiTrans India",
      rating: 5
    },
    {
      quote: "The FinTech wallet they developed for us has been a game-changer for our international user base. Security and speed were our top priorities, and the team delivered a solution that exceeded our highest expectations. From the intuitive user interface to the complex backend encryption, every aspect of the platform reflects their commitment to excellence. We look forward to continuing our partnership on future innovations.",
      author: "Sarah Jenifer",
      role: "CTO, NeoPay Global",
      rating: 5
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
