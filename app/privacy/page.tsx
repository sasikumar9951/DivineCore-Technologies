import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      num: "01",
      title: "Introduction",
      content: "DivineCore Technologies (\"we\", \"our\", or \"us\") respects your privacy and is committed to protecting your personal data. This Privacy Policy details how we handle, collect, secure, and process information obtained when you interact with our website, request custom software solutions, or engage in digital operations at our corporate headquarters in Salem, Tamilnadu."
    },
    {
      num: "02",
      title: "Information We Collect",
      content: "We collect information you directly provide to us, such as when you fill out a contact form, request a service consultation, or communicate with our operations teams. This includes your name, company name, email address, phone number, and project descriptions. Additionally, our server logs automatically collect device information, IP address, and standard usage metrics to ensure security and platform performance."
    },
    {
      num: "03",
      title: "How We Use Your Information",
      content: "We utilize your personal data to engineer and deliver custom software deliverables, manage project scopes, process inquiries, and coordinate client communications. We also process this data to comply with legal compliance directives under the Indian Information Technology Act, perform platform security checks, and optimize platform responsiveness."
    },
    {
      num: "04",
      title: "Data Security & Auditing",
      content: "We deploy state-of-the-art secure socket layers (SSL), database access control systems, and strict encryption protocols. Furthermore, our Salem headquarters enforces physical security checkpoints and strict administrative guidelines. All client software code and BPO data processing files are governed by individual Nondisclosure Agreements (NDAs)."
    },
    {
      num: "05",
      title: "Cookies & Tracking",
      content: "Our website uses essential and analytical cookies to remember user preferences, ensure server session security, and collect aggregated website traffic statistics. You can adjust your browser settings to decline cookies; however, some sections of our digital interfaces may not function optimally as a result."
    },
    {
      num: "06",
      title: "Your Rights & Inquiries",
      content: "Depending on your jurisdiction (such as rights under the IT Act in India or international privacy guidelines), you have the right to access, rectify, or request the deletion of the personal data we hold. To exercise these rights, please contact our data privacy officer at the contact details provided below."
    }
  ];

  return (
    <div>
      <Hero
        title="Privacy Policy"
        subtitle="How we protect your corporate assets, project files, and personal data at DivineCore Technologies."
        image={
          <div className="w-full h-full bg-[#111111] flex items-center justify-center relative overflow-hidden select-none">
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-3 z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-gold-primary uppercase">COMPLIANCE</span>
              <h2 className="text-3xl font-black text-white">Asset Security</h2>
              <p className="text-xs text-white/40">GDPR & Indian IT Act Compliant</p>
            </div>
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Privacy Policy</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 pb-8 border-b border-black/5 text-left">
            <p className="text-sm font-black text-gold-muted uppercase tracking-widest mb-2">LAST UPDATED: MAY 25, 2026</p>
            <h2 className="text-3xl font-black text-deep-black">General Compliance Policies</h2>
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
              Data Privacy Officer
            </span>
            <h4 className="text-2xl font-black text-deep-black">Questions or Concerns?</h4>
            <p className="text-black/55 text-sm leading-relaxed max-w-2xl">
              If you have any questions regarding this Privacy Policy, your personal data holdings, or our corporate security guidelines, please contact us:
            </p>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-black text-deep-black">
              <div className="space-y-2">
                <p className="text-gold-muted text-xs uppercase tracking-wider font-bold">Email Address</p>
                <a href="mailto:info@divinecoretech.in" className="hover:text-gold-primary transition-colors">info@divinecoretech.in</a>
              </div>
              <div className="space-y-2">
                <p className="text-gold-muted text-xs uppercase tracking-wider font-bold">Salem Headquarters</p>
                <p className="text-black/60 font-bold leading-relaxed max-w-xs">
                  1st Floor, No. 48, Tamil Sangam Road, Opposite Arignar Anna Library, Shankar Nagar, Salem, Tamil Nadu – 636007
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
