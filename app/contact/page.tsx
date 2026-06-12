"use client";

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";
import { useState } from "react";
import { sendEmail } from "./actions";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white">
      <Hero
        title="Connect With Our Global Network"
        subtitle="Ready to transform your business vision into a high-performance digital reality? Let's start a conversation today."
        image={
          <img src="/images/contact_hero.png" alt="Contact Us" className="rounded-3xl shadow-2xl border border-white/10" />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Contact Us</span>
        </div>
      </Hero>

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-deep-black">Let's Connect</h3>
            <p className="text-black/40 -mt-4">We'd love to hear from you. Reach out to us for any inquiries or partnership.</p>
            
            {isSuccess ? (
              <div className="bg-gold-primary/10 border border-gold-primary/20 p-8 rounded-3xl animate-fade-in text-center space-y-4">
                <div className="text-4xl">✅</div>
                <h4 className="text-xl font-black text-deep-black">Message Sent Successfully!</h4>
                <p className="text-black/60">Thank you for reaching out. We will get back to you at info@divinecoretech.in shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-gold-muted font-bold text-sm uppercase tracking-widest hover:text-gold-primary transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-light-gray border border-black/5 rounded-xl px-6 py-4 text-deep-black focus:outline-none focus:border-gold-primary transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-light-gray border border-black/5 rounded-xl px-6 py-4 text-deep-black focus:outline-none focus:border-gold-primary transition-colors"
                />
                <select
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full bg-light-gray border border-black/5 rounded-xl px-6 py-4 text-deep-black focus:outline-none focus:border-gold-primary transition-colors appearance-none cursor-pointer pr-12"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4AF37' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                    backgroundSize: '1.2rem'
                  }}
                >
                  <option value="" disabled>Select Subject</option>
                  <option value="Custom Software">Custom Software Development</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Web & Mobile Apps">Web & Mobile Apps</option>
                  <option value="Data Security">Data Security</option>
                  <option value="BPO & Data Entry">BPO & Data Entry</option>
                  <option value="Digital Strategy">Digital Strategy</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-light-gray border border-black/5 rounded-xl px-6 py-4 text-deep-black focus:outline-none focus:border-gold-primary transition-colors resize-none"
                ></textarea>
                <button 
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-12 py-4 rounded-xl gold-gradient text-deep-black font-black hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <span>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-12 lg:pl-12">
            <h3 className="text-2xl font-black text-deep-black">Contact Information</h3>
            <div className="space-y-8">
              {[
                { 
                  label: "Phone", 
                  value: (
                    <span className="flex flex-col gap-1.5">
                      <a href="tel:+917448609951" className="hover:text-gold-primary transition-colors">+91 74486 09951</a>
                      <a href="tel:+916369081530" className="hover:text-gold-primary transition-colors">+91 63690 81530</a>
                    </span>
                  ), 
                  icon: "📞" 
                },
                { label: "Email", value: <a href="mailto:info@divinecoretech.in" className="hover:text-gold-primary transition-colors">info@divinecoretech.in</a>, icon: "✉️" },
                { label: "Address", value: "1st Floor, No. 48, Tamil Sangam Road, Opposite Arignar Anna Library, Shankar Nagar, Salem, Tamil Nadu – 636007", icon: "📍" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-deep-black font-black text-sm mb-1">{item.label}</h4>
                    <p className="text-black/60 text-sm leading-relaxed max-w-xs">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-4">
              <h4 className="text-sm font-black text-deep-black uppercase tracking-widest">Follow Us</h4>
              <div className="flex gap-4">
                {["in", "tw", "fb", "ig"].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-lg bg-light-gray border border-black/5 flex items-center justify-center text-gold-muted font-bold hover:bg-gold-primary hover:text-white transition-all cursor-pointer">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-0 px-0">
        <div className="w-full h-[450px] relative grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125061.3857500366!2d78.0772718!3d11.6611103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf059bc474663%3A0x897939626b01b63e!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714670000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" />
        </div>
      </Section>
    </div>
  );
}
