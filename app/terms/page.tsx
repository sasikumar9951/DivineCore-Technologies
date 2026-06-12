import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function TermsAndConditions() {
  const sections = [
    {
      num: "01",
      title: "Agreement to Terms",
      content: "Welcome to DivineCore Technologies. By accessing or using our websites, consulting services, custom software engineering integrations, or data processing solutions, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must immediately cease all access and use of our corporate services."
    },
    {
      num: "02",
      title: "Intellectual Property & Ownership",
      content: "All custom software, custom-designed graphic interfaces, proprietary database schemas, and clean API implementations engineered by DivineCore Technologies are custom-built for our clients. All intellectual property, ownership rights, copyrights, and titles for client-commissioned deliverables shall be legally and fully transferred to the client only upon complete, successful, and final payment of all outstanding invoices. DivineCore reserves all rights to proprietary frameworks, base code libraries, and general software utilities developed prior to or independently of individual project statements."
    },
    {
      num: "03",
      title: "Service Prohibitions",
      content: "Clients and platform users are strictly prohibited from using our services, corporate infrastructure, or digital platforms to execute any malicious, unauthorized, or illegal acts. This includes, but is not limited to, reverse-engineering pre-release frameworks, attempting unauthorized server access, performing denial-of-service (DoS) attacks, or distributing copyrighted assets without explicit corporate authorization."
    },
    {
      num: "04",
      title: "Billing, Payments & Invoicing",
      content: "Engaging DivineCore Technologies for custom engineering or data processing operates under structured Professional Billing scopes and client-agreed Statements of Work (SOWs). Invoices are rendered in accordance with project quotes, recurring support cycles, or specified hourly rates. Payments must be processed within the timelines stipulated in the service agreement. Late payments may result in a temporary suspension of active development or data delivery pipelines."
    },
    {
      num: "05",
      title: "Project Milestones & Revisions",
      content: "Custom development programs are structured under progressive Project Milestones. Each milestone represents a precise, deliverable phase of the software development lifecycle (SDLC) or data processing pipeline. Review, feedback, and formal sign-offs are required from the client at each milestone stage before subsequent development phases commence. Any alterations to agreed milestone boundaries will be treated as out-of-scope and managed via formal Change Requests."
    },
    {
      num: "06",
      title: "NDAs & Governing Law",
      content: "To ensure complete confidentiality, all custom engineering agreements, proprietary algorithms, and client digital records are fully governed by legally binding Nondisclosure Agreements (NDAs). These Terms and Conditions, alongside any supplementary SOWs or service agreements, are governed by and construed in accordance with the laws of India. Any legal actions, disputes, or proceedings arising out of these terms shall be subject to the exclusive jurisdiction of the courts of Salem, Tamilnadu, India."
    }
  ];

  return (
    <div>
      <Hero
        title="Terms & Conditions"
        subtitle="Understand the legal framework governing our development services, custom intellectual property delivery, and business agreements."
        image={
          <div className="w-full h-full bg-[#111111] flex items-center justify-center relative overflow-hidden select-none">
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-3 z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-gold-primary uppercase">TERMS OF USE</span>
              <h2 className="text-3xl font-black text-white">Service Agreement</h2>
              <p className="text-xs text-white/40">Intellectual Property & Licensing</p>
            </div>
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Terms & Conditions</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 pb-8 border-b border-black/5 text-left">
            <p className="text-sm font-black text-gold-muted uppercase tracking-widest mb-2">LAST UPDATED: MAY 25, 2026</p>
            <h2 className="text-3xl font-black text-deep-black">General Service Policies</h2>
          </div>

          <div className="space-y-16 text-left">
            {sections.map((sec) => (
              <div key={sec.num} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="text-3xl font-black gold-text-gradient shrink-0 tracking-tighter">
                  {sec.num}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-deep-black">{sec.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{sec.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Panel Card */}
          <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-light-gray/30 border border-black/5 text-left space-y-6">
            <span className="bg-gold-primary/10 border border-gold-primary/20 px-3.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-gold-primary">
              Legal Operations
            </span>
            <h4 className="text-2xl font-black text-deep-black">Need Legal Clarifications?</h4>
            <p className="text-black/55 text-sm leading-relaxed max-w-2xl">
              If you have any questions regarding these Terms & Conditions, intellectual property delivery schedules, or our milestone agreements, please reach out to our legal operations desk:
            </p>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-black text-deep-black">
              <div className="space-y-2">
                <p className="text-gold-muted text-xs uppercase tracking-wider font-bold">Email Address</p>
                <a href="mailto:info@divinecoretech.in" className="hover:text-gold-primary transition-colors">info@divinecoretech.in</a>
              </div>
              <div className="space-y-2">
                <p className="text-gold-muted text-xs uppercase tracking-wider font-bold">Salem Headquarters</p>
                <p className="text-black/60 font-bold leading-relaxed max-w-xs">
                  No. 48, 1st Floor, Tamil Sangam Road, Opposite Arignar Anna Library, Shankar Nagar, Salem, Tamil Nadu – 636007
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
