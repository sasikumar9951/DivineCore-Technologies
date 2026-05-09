import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";

export default function Services() {
  const allServices = [
    {
      title: "Bespoke Software Development",
      description: "We engineer high-performance, scalable software architectures tailored to your specific business logic. From legacy system modernization to new product development, we deliver robust solutions that grow with you.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      )
    },
    {
      title: "Cloud & Infrastructure",
      description: "Harness the power of high-availability cloud environments. We specialize in serverless architectures, multi-cloud migrations, and cost-optimized infrastructure management across AWS and GCP.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c.3 0 .5 0 .8-.1a4.5 4.5 0 0 0 .4-8.9 7 7 0 1 0-13.4-1.1 5.5 5.5 0 0 0 .7 10.1"></path></svg>
      )
    },
    {
      title: "Full-Stack Web & Mobile",
      description: "We create immersive digital experiences using modern frameworks like React, Next.js, and Flutter. Our focus is on lightning-fast performance, intuitive UI, and cross-platform compatibility.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      )
    },
    {
      title: "Cybersecurity & Resilience",
      description: "Protect your operations with enterprise-grade security. We provide end-to-end encryption, penetration testing, and zero-trust security audits to ensure your data remains invulnerable.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      )
    },
    {
      title: "Technology Consulting",
      description: "Navigate the digital landscape with confidence. We provide high-level architectural consulting, digital transformation roadmaps, and expert advice on emerging tech stacks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      )
    },
    {
      title: "BPO & Data Entry Services",
      description: "We provide high-accuracy business process outsourcing and professional data management solutions. From large-scale document digitization to complex data entry, we ensure 24/7 reliability and precision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      )
    },
    {
      title: "IT Support & Maintenance",
      description: "Reliable support and maintenance to ensure your systems run smoothly, always.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Solutions for a Digital Future"
        subtitle="We design, build and scale premium digital products that help organizations stay ahead in an ever-evolving technological landscape."
        image={
          <img src="/images/services_hero.png" alt="Our Services" className="rounded-3xl shadow-2xl border border-white/10" />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Services</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allServices.map((service, index) => (
            <div key={index} className="flex gap-8 p-8 border border-black/5 rounded-2xl hover:border-gold-primary/30 hover:shadow-xl transition-all group">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-deep-black mb-3">{service.title}</h3>
                <p className="text-black/60 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black py-0">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 px-12 glass-card rounded-t-[3rem] gap-8">
          <h2 className="text-2xl font-black text-white">Let's build the right solution for your business.</h2>
          <Link href="/contact" className="gold-gradient text-deep-black px-10 py-3.5 rounded-full font-black text-lg flex items-center gap-2">
            Get In Touch <span>→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
