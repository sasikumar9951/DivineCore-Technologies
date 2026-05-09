import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";

export default function About() {
  const values = [
    {
      title: "Our Mission",
      text: "To bridge the gap between business challenges and digital solutions by engineering high-performance software that empowers organizations to reach their full potential.",
      icon: "🎯"
    },
    {
      title: "Our Vision",
      text: "To become a global benchmark for technological innovation, where every solution we build sets a new standard for efficiency, security, and user experience.",
      icon: "👁️"
    },
    {
      title: "Our Values",
      text: "We are driven by a commitment to technical excellence, transparent collaboration, and a relentless pursuit of innovation that delivers measurable value to our clients.",
      icon: "🤝"
    }
  ];

  const milestones = [
    { year: "2025", title: "Founded", description: "Founded in Salem with a vision to deliver premium IT solutions." },
    { year: "2025", title: "Growth", description: "Successfully delivered our first 10+ projects for local enterprises." },
    { year: "2026", title: "Expansion", description: "Expanded our team and service offerings to global clients." },
    { year: "2026+", title: "Leading", description: "Continuing to innovate and empower businesses with modern tech." }
  ];

  const team = [
    { name: "Sasikumar S", role: "CEO & Founder" },
    { name: "Srinivasan R", role: "CTO" },
    { name: "Meera Krishnan", role: "Head of Design" },
    { name: "Rajesh V", role: "Lead Engineer" }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Engineering Tomorrow's Excellence Today"
        subtitle="Founded in 2025, DivineCore Technologies is a premier global software development and digital transformation agency dedicated to creating high-impact technological solutions."
        image={
          <img src="/images/about_hero.png" alt="About DivineCore" className="rounded-3xl shadow-2xl border border-white/10" />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <span className="hover:text-gold-primary transition-colors cursor-pointer">Home</span>
          <span>/</span>
          <span className="text-gold-primary">About Us</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-black text-deep-black mb-6">Who We Are</h2>
          <p className="text-black/60 leading-relaxed text-lg">
            DivineCore Technologies is a forward-thinking IT solutions company dedicated to helping businesses navigate the digital world. With a strong focus on innovation, quality and customer success, we deliver solutions that drive impact and create lasting value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Card key={i} title={v.title} variant="light" icon={<span className="text-2xl">{v.icon}</span>}>
              {v.text}
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-black text-white">
        <h2 className="text-3xl font-black mb-16">Our Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {milestones.map((m, i) => (
            <div key={i} className="relative pt-8 border-t border-gold-primary/30">
              <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full gold-gradient shadow-[0_0_10px_rgba(212,175,55,1)]" />
              <span className="text-2xl font-black gold-text-gradient block mb-4">{m.year}</span>
              <p className="text-sm text-white/60">{m.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-light-gray/30">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 aspect-[4/5] rounded-3xl bg-dark-gray relative overflow-hidden shadow-2xl border border-gold-primary/20 group">
            <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-10 transition-opacity z-10" />
            <img 
              src="/images/founder.png" 
              alt="Sasikumar S - Founder of DivineCore Technologies" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="lg:w-2/3 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-primary/10 text-gold-muted text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
              Founder's Vision
            </div>
            <h2 className="text-4xl font-black text-deep-black leading-tight italic">
              "We don't just build software; we engineer the competitive advantage that defines the future of our clients' businesses."
            </h2>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-deep-black">Sasikumar S</h4>
              <p className="text-gold-muted font-bold text-sm uppercase tracking-widest">Founder & CEO, DivineCore Technologies</p>
            </div>
            <p className="text-black/60 leading-relaxed text-lg max-w-2xl">
              At DivineCore, our mission is driven by a simple belief: excellence is not an act, but a habit. We've built this company on the foundation of technical integrity and a relentless pursuit of perfection in every line of code we write.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mb-16">
          <h2 className="text-3xl font-black text-deep-black mb-4">Our Leadership</h2>
          <p className="text-black/40">Meet the people who drive our vision forward.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((person, i) => (
            <div key={i} className="text-center group">
              <div className="aspect-[4/5] rounded-xl bg-light-gray mb-6 overflow-hidden relative border border-gold-primary/10 group-hover:border-gold-primary/40 transition-all">
                {person.name === "Sasikumar S" ? (
                  <img 
                    src="/images/founder.png" 
                    alt={person.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/10 font-bold uppercase tracking-widest bg-dark-gray">
                    [ {person.name.split(" ")[0]} ]
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-lg font-black text-deep-black">{person.name}</h4>
              <p className="text-gold-muted text-xs font-bold uppercase tracking-widest mt-1">{person.role}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
