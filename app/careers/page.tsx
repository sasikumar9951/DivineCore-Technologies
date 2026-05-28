import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Careers() {
  return (
    <div className="bg-white">
      <Hero
        title="Join Our Network"
        subtitle="Explore active openings for internal engineering roles, sales specialists, and long-term enterprise vendor partnerships."
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

      {/* 1. Active Openings (Employees/Interns) Section */}
      <Section className="bg-white pt-20 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-left">
            <span className="section-tag">EMPLOYEE OPENINGS</span>
            <h2 className="text-4xl font-black text-deep-black">Active Career Opportunities</h2>
            <p className="text-black/60 mt-2 text-base leading-relaxed">
              Join our remote-first corporate team and work with international clients across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scope */}
            <div className="lg:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-light-gray/30 border border-black/5 text-left space-y-6 hover-float">
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gold-primary/10 border border-gold-primary/20 text-[9px] font-black text-gold-primary uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                  Remote / Work From Home
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 border border-black/5 text-[9px] font-black text-black/60 uppercase tracking-widest">
                  Full-Time / Internship
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 border border-black/5 text-[9px] font-black text-black/60 uppercase tracking-widest">
                  0–2 Years Experience
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-deep-black">Lead Generation Executive (UK Market)</h3>
              
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <p className="text-xs font-black text-gold-muted uppercase tracking-wider">Key Responsibilities</p>
                  <ul className="space-y-2 text-xs text-black/70">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-primary">•</span>
                      <span>Research, map, and identify potential B2B enterprise clients in the UK market.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-primary">•</span>
                      <span>Leverage <strong>Apollo.io</strong>, <strong>LinkedIn Sales Navigator</strong>, Hunter, and Lusha to extract data and build prospect databases.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-primary">•</span>
                      <span>Coordinate and conduct highly professional cold email outreach and LinkedIn message sequences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-primary">•</span>
                      <span>Engage prospects, follow up consistently, and schedule qualified meetings with target decision-makers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-primary">•</span>
                      <span>Maintain, log, and update active pipelines across spreadsheets and central CRM systems.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-black text-gold-muted uppercase tracking-wider">Required Skills</p>
                  <p className="text-xs text-black/75 leading-relaxed font-medium">
                    Excellent English communication skills • Familiarity with lead generation tools (Apollo.io, LinkedIn Sales Navigator, Lusha, Hunter) • Strong internet research skills • Ability to draft professional cold emails • Self-motivated and target-oriented mindset.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-black text-gold-muted uppercase tracking-wider">Why Join DivineCore?</p>
                  <p className="text-xs text-black/75 leading-relaxed font-medium">
                    Direct exposure to international B2B sales cycles • Practical skill development in global outreach strategies • Flexible remote work environment • Clear growth-oriented career development path.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Connect Panel */}
            <div className="p-8 rounded-[2.5rem] bg-black text-white text-left flex flex-col justify-between hover-float border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/5 to-transparent pointer-events-none" />
              
              <div className="space-y-6">
                <span className="bg-gold-primary/20 border border-gold-primary/30 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-gold-primary">
                  Careers Desk
                </span>
                <h4 className="text-xl font-black">Ready to Apply?</h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  Send your resume and a brief introductory cover letter to our recruitment department. Please mention the job title in the email subject.
                </p>
              </div>

              <div className="space-y-4 pt-8">
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Email Application</p>
                  <a href="mailto:info@divinecoretech.in?subject=Application%20for%20Lead%20Generation%20Executive%20(UK%20Market)" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    info@divinecoretech.in
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Inquiries Phone</p>
                  <a href="tel:+917448609951" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    +91 74486 09951
                  </a>
                </div>

                <a 
                  href="mailto:info@divinecoretech.in?subject=Application%20for%20Lead%20Generation%20Executive%20(UK%20Market)"
                  className="w-full text-center inline-block bg-white text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-colors shimmer-btn mt-2 cursor-pointer"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Vendor Hiring Section */}
      <Section className="bg-light-gray/20 pt-16 pb-20 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-left">
            <span className="section-tag">PARTNERSHIPS</span>
            <h2 className="text-4xl font-black text-deep-black">Vendor & Outsourcing Contracts</h2>
            <p className="text-black/60 mt-2 text-base leading-relaxed">
              We collaborate with premium specialized agencies and vendor teams on high-volume digitization and validation tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scope */}
            <div className="lg:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-white border border-black/5 text-left space-y-6 hover-float shadow-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gold-primary/10 border border-gold-primary/20 text-[9px] font-black text-gold-primary uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                Long-Term Project SOW
              </div>
              <h3 className="text-2xl font-black text-deep-black">PDF Accessibility Remediation</h3>
              
              <div className="space-y-2 pt-2">
                <p className="text-xs font-black text-gold-muted uppercase tracking-wider">Required Deliverables & Compliance</p>
                <ul className="space-y-2 text-xs text-black/70">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Document Tagging, Structure Sections & Reading Order Verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span>Alternative Text setups, Metadata parameters & Contrast fixes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✔</span>
                    <span><strong>PAC 2026 Validation</strong> (Zero Critical Errors, PDF/UA & WCAG Compliance)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-black/5">
                <div className="space-y-1">
                  <p className="text-gold-muted text-[10px] uppercase tracking-wider font-black">Required Tools</p>
                  <p className="text-xs text-black/60 leading-relaxed font-bold">
                    Adobe Acrobat Pro DC • PAC 2026 Engine
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gold-muted text-[10px] uppercase tracking-wider font-black">Engagement Model</p>
                  <p className="text-xs text-black/60 leading-relaxed font-bold">
                    Service Digitization Agreement (SDA)
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Connect Panel */}
            <div className="p-8 rounded-[2.5rem] bg-[#0c0c0c] text-white text-left flex flex-col justify-between hover-float border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/5 to-transparent pointer-events-none" />
              
              <div className="space-y-6">
                <span className="bg-gold-primary/20 border border-gold-primary/30 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-gold-primary">
                  Vendor Desk
                </span>
                <h4 className="text-xl font-black">Submit Proposal</h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  Connect with our operational management to request the task sample sheet and submit your team's SOW rate details.
                </p>
              </div>

              <div className="space-y-4 pt-8">
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Proposal Email</p>
                  <a href="mailto:info@divinecoretech.in?subject=PDF%20Accessibility%20Vendor%20Proposal" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    info@divinecoretech.in
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-gold-primary text-[8px] uppercase tracking-wider font-bold">Partner Hotlines</p>
                  <a href="tel:+917448609951" className="text-sm font-bold text-white hover:text-gold-primary transition-colors block">
                    +91 74486 09951
                  </a>
                </div>

                <a 
                  href="mailto:info@divinecoretech.in?subject=PDF%20Accessibility%20Vendor%20Proposal"
                  className="w-full text-center inline-block bg-white text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold-primary hover:text-black transition-colors shimmer-btn mt-2 cursor-pointer"
                >
                  Connect Digitization
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. General Open Application Section */}
      <Section className="bg-white pt-10 pb-20 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center py-16 px-8 border border-black/5 rounded-[3rem] bg-light-gray/30">
          <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto text-3xl mb-6">
            ✨
          </div>
          <h3 className="text-2xl font-black text-deep-black mb-3">Don't See a Matching Role?</h3>
          <p className="text-black/60 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            We are always eager to connect with premium web engineers, mobile app developers, and BPO operations experts. Send your details for general open applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="mailto:info@divinecoretech.in?subject=General%20Careers%20Open%20Application" 
              className="gold-gradient text-deep-black px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-xl transition-all cursor-pointer"
            >
              Submit Open Application
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

      {/* 4. Follow Us Section */}
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
