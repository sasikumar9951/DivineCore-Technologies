import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Careers() {
  return (
    <div className="bg-white">
      <Hero
        title="Join Our Network"
        subtitle="Explore active openings for internal engineering roles and long-term enterprise vendor partnerships."
        image={
          <div className="w-full h-full bg-[#111111] flex items-center justify-center relative overflow-hidden select-none">
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-3 z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-gold-primary uppercase">CAREERS & PARTNERSHIPS</span>
              <h2 className="text-3xl font-black text-white">Active Rosters</h2>
              <p className="text-xs text-white/40">Opportunities & Vendor SOWs</p>
            </div>
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Careers</span>
        </div>
      </Hero>

      {/* 1. Vendor Hiring Section */}
      <Section className="bg-white pt-20 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-left">
            <span className="section-tag">PARTNERSHIPS</span>
            <h2 className="text-4xl font-black text-deep-black">We Are Hiring Vendor Teams</h2>
            <p className="text-black/60 mt-2 text-base leading-relaxed">
              DivineCore Technologies is seeking reliable, experienced vendor teams for long-term project collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scope */}
            <div className="lg:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-light-gray/30 border border-black/5 text-left space-y-6 hover-float">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gold-primary/10 border border-gold-primary/20 text-[9px] font-black text-gold-primary uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                Long-Term Opportunity
              </div>
              <h3 className="text-2xl font-black text-deep-black">PDF Accessibility Remediation</h3>
              
              <div className="space-y-2 pt-2">
                <p className="text-xs font-black text-gold-muted uppercase tracking-wider">Scope of Work</p>
                <ul className="space-y-2 text-xs text-black/70">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Document Tagging & Structural Section Correction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Reading Order Verification & Flow Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Configure & Verify Descriptive Alternative Text for Images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Metadata Configuration, Tab Orders & Document Properties Setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Accessibility Audits, Contrast Fixes & Check Issue Resolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span><strong>PAC 2026 Validation</strong> (Guaranteeing Zero Critical Validation Errors)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-black/5">
                <div className="space-y-1">
                  <p className="text-gold-muted text-[10px] uppercase tracking-wider font-black">Required Software</p>
                  <p className="text-xs text-black/60 leading-relaxed font-bold">
                    • Adobe Acrobat Pro DC<br />
                    • PAC 2026 Validation Engine
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gold-muted text-[10px] uppercase tracking-wider font-black">Compliance Deliverables</p>
                  <p className="text-xs text-black/60 leading-relaxed font-bold">
                    • Accessible & Tagged PDFs<br />
                    • PDF/UA & WCAG Compliance Standards
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Connect Panel */}
            <div className="p-8 rounded-[2.5rem] bg-black text-white text-left flex flex-col justify-between hover-float border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/5 to-transparent pointer-events-none" />
              
              <div className="space-y-6">
                <span className="bg-gold-primary/20 border border-gold-primary/30 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-gold-primary">
                  Connect With Us
                </span>
                <h4 className="text-xl font-black">Interested Vendor Teams?</h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  We are actively scheduling introductory calls and issuing SOW quotes. Connect with our digitization team to submit your proposal:
                </p>
              </div>

              <div className="space-y-4 pt-8">
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Email Proposal</p>
                  <a href="mailto:info@divinecoretech.in?subject=PDF%20Accessibility%20Vendor%20Proposal" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    info@divinecoretech.in
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Contact Number</p>
                  <a href="tel:+917448609951" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    +91 74486 09951
                  </a>
                </div>

                <a 
                  href="mailto:info@divinecoretech.in?subject=PDF%20Accessibility%20Vendor%20Proposal"
                  className="w-full text-center inline-block bg-white text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-colors shimmer-btn mt-2 cursor-pointer"
                >
                  Send Proposal Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. General Submission Section */}
      <Section className="bg-white pt-10 pb-20 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center py-16 px-8 border border-black/5 rounded-[3rem] bg-light-gray/30">
          <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto text-3xl mb-6">
            🔍
          </div>
          <h3 className="text-2xl font-black text-deep-black mb-3">No Active Employee Openings</h3>
          <p className="text-black/60 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            While we don't have active internal full-time listings at this moment, we are always eager to connect with premium developers and designers. Submit your details for future roles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="mailto:info@divinecoretech.in" 
              className="gold-gradient text-deep-black px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-xl transition-all cursor-pointer"
            >
              Submit Your Resume
            </Link>
            <Link 
              href="/contact" 
              className="border border-black/10 text-deep-black px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              Contact Recruiting
            </Link>
          </div>
        </div>
      </Section>

      {/* 3. Follow Us Section */}
      <Section className="bg-black py-0">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 px-12 glass-card rounded-t-[3rem] gap-8">
          <h2 className="text-lg font-bold text-white text-center md:text-left">Follow us for updates on future opportunities and career news.</h2>
          <div className="flex gap-4">
            {["LinkedIn", "Twitter", "GitHub"].map((social) => (
              <a 
                href="#"
                key={social} 
                className="px-5 py-2.5 rounded-xl bg-white/5 flex items-center justify-center text-gold-primary text-xs font-black uppercase tracking-wider hover:bg-gold-primary hover:text-deep-black transition-all cursor-pointer"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
