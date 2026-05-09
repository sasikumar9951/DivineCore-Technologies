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
        <div className="max-w-5xl mx-auto space-y-6">
          {jobs.map((job, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-between p-8 border border-black/5 rounded-2xl hover:border-gold-primary/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-deep-black">{job.role}</h3>
                  <div className="flex gap-4 text-xs font-bold text-black/40 uppercase tracking-widest mt-1">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 md:mt-0 px-8 py-3 rounded-full border border-gold-primary/30 text-gold-muted font-bold text-sm hover:bg-gold-primary hover:text-deep-black transition-all">
                View Details <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black py-0">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 px-12 glass-card rounded-t-[3rem] gap-8">
          <h2 className="text-xl font-bold text-white">Don't see a role that fits you? Send us your resume at <span className="text-gold-primary">careers@divinecore.com</span></h2>
          <Link href="/contact" className="gold-gradient text-deep-black px-10 py-3.5 rounded-full font-black text-lg flex items-center gap-2">
            Let's Connect <span>→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
