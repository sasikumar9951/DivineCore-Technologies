import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";

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
    { year: "2025", title: "Founded & Growth", description: "Founded in Salem with a vision to deliver premium IT solutions, successfully delivering our first 10+ projects." },
    { year: "2026", title: "Expansion", description: "Expanded our team and service offerings to global clients." },
    { year: "2026+", title: "Leading", description: "Continuing to innovate and empower businesses with modern tech." }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Engineering Tomorrow's Excellence Today"
        subtitle="Founded in 2025, DivineCore Technologies PVT LTD is a premier global software development and digital transformation agency dedicated to creating high-impact technological solutions."
        image={
          <img src="/images/about_hero.png" alt="About DIVINECORE" className="rounded-3xl shadow-2xl border border-white/10" />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">About Us</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="section-tag">OUR IDENTITY</span>
          <h2 className="text-4xl md:text-5xl font-black text-deep-black mb-6">Empowering the Future Through Code</h2>
          <p className="text-black/60 leading-relaxed text-lg">
            DivineCore Technologies PVT LTD is a forward-thinking IT solutions company dedicated to helping businesses navigate the digital world. With a strong focus on innovation, quality and customer success, we deliver solutions that drive impact and create lasting value.
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="section-tag border-gold-primary/30 text-gold-primary">OUR PROGRESS</span>
            <h2 className="text-4xl md:text-5xl font-black">The Journey of Innovation</h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm">Tracing our path from a local startup to a global technology partner.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {milestones.map((m, i) => (
            <div key={i} className="relative pt-8 border-t border-gold-primary/30 group">
              <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full gold-gradient shadow-[0_0_10px_rgba(212,175,55,1)] group-hover:scale-150 transition-transform" />
              <span className="text-3xl font-black gold-text-gradient block mb-4">{m.year}</span>
              <h4 className="text-lg font-black text-white mb-2">{m.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{m.description}</p>
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
              alt="Sasikumar S - Founder of DivineCore Technologies PVT LTD" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="lg:w-2/3 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-primary/10 text-gold-muted text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              Founder's Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-deep-black leading-tight italic">
              "We don't just build software; we engineer the competitive advantage that defines the future of our clients' businesses."
            </h2>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-deep-black">Sasikumar S</h4>
              <p className="text-gold-muted font-bold text-sm uppercase tracking-widest">Founder & CEO, DivineCore Technologies PVT LTD</p>
            </div>
            <p className="text-black/60 leading-relaxed text-lg max-w-2xl">
              At DIVINECORE, our mission is driven by a simple belief: excellence is not an act, but a habit. We've built this company on the foundation of technical integrity and a relentless pursuit of perfection in every line of code we write.
            </p>
          </div>
        </div>
      </Section>



      <Section className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-tag">BUILDING THE FUTURE</span>
          <h2 className="text-4xl font-black text-deep-black mb-6">Scaling Our Impact</h2>
          <p className="text-black/40 leading-relaxed">
            We are currently expanding our core departments to better serve our global clientele. Our focus remains on assembling a team of world-class experts dedicated to technical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Engineering Excellence",
              desc: "Our engineering department focuses on scalable architecture, cloud-native solutions, and robust backend systems.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            },
            {
              title: "Creative Design",
              desc: "Combining aesthetic vision with user-centric functionality to create digital experiences that delight and engage.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
            },
            {
              title: "Strategic Consulting",
              desc: "Aligning technology roadmaps with business objectives to ensure long-term growth and digital maturity.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            }
          ].map((dept, i) => (
            <div key={i} className="p-10 rounded-[2rem] bg-light-gray/30 border border-black/5 hover:border-gold-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary mb-8 group-hover:scale-110 transition-transform">
                {dept.icon}
              </div>
              <h4 className="text-xl font-black text-deep-black mb-4">{dept.title}</h4>
              <p className="text-black/60 text-sm leading-relaxed mb-8">{dept.desc}</p>
              <Link href="/careers" className="text-deep-black font-bold text-xs uppercase tracking-widest border-b border-gold-primary/30 pb-1 hover:border-gold-primary transition-all">
                Join the Team →
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
