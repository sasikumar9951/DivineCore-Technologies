import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Careers() {
  const jobs = [
    {
      role: "Senior Full-Stack Developer",
      location: "Salem, Tamilnadu",
      type: "Full Time",
    },
    {
      role: "Lead UI/UX Designer",
      location: "Remote / Hybrid",
      type: "Full Time",
    },
    {
      role: "Cloud Systems Architect",
      location: "Salem, Tamilnadu",
      type: "Full Time",
    }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Join Our Core Team"
        subtitle="Be part of a vision-driven team that values innovation, creative freedom, and technical excellence above all else."
        image={
          <img src="/images/careers_hero.png" alt="Join Our Team" className="rounded-3xl shadow-2xl border border-white/10" />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Careers</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="max-w-4xl mx-auto text-center py-16 px-8 border border-black/5 rounded-[3rem] bg-light-gray/30">
          <div className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto text-4xl mb-8 animate-pulse">
            🔍
          </div>
          <h3 className="text-3xl font-black text-deep-black mb-4">No Current Openings</h3>
          <p className="text-black/60 max-w-xl mx-auto leading-relaxed mb-10">
            While we don't have any active job postings at this moment, we are always interested in connecting with passionate and talented individuals who want to be part of the DivineCore journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="mailto:info@divinecoretech.in" 
              className="gold-gradient text-deep-black px-10 py-4 rounded-full font-black hover:shadow-xl transition-all"
            >
              Submit Your Resume
            </Link>
            <Link 
              href="/contact" 
              className="border border-black/10 text-deep-black px-10 py-4 rounded-full font-black hover:bg-black hover:text-white transition-all"
            >
              Contact HR
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-black py-0">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 px-12 glass-card rounded-t-[3rem] gap-8">
          <h2 className="text-xl font-bold text-white text-center md:text-left">Follow us for updates on future opportunities and career news.</h2>
          <div className="flex gap-4">
            {["in", "tw", "fb"].map((social) => (
              <div key={social} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gold-primary font-bold hover:bg-gold-primary hover:text-deep-black transition-all cursor-pointer">
                {social}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
