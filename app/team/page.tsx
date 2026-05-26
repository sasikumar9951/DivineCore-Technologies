"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Team() {
  const [activeTab, setActiveTab] = useState("All Departments");

  const tabs = ["All Departments", "Leadership", "Engineering", "Design", "Operations"];

  const team = [
    {
      name: "Sasikumar S",
      role: "Founder & CEO",
      dept: "Leadership",
      bio: "Pioneering technological engineering integrity and establishing robust enterprise service guidelines globally.",
      image: "/images/founder.png",
      email: "founder@divinecoretech.in",
      phone: "+91 74486 09951"
    },
    {
      name: "Vimal Raj S",
      role: "Lead Web & App Developer",
      dept: "Engineering",
      bio: "Coordinates frontend web pipelines, cross-platform mobile apps, and scalable React / React Native architectures.",
      initials: "VR",
      email: "vimal@divinecoretech.in"
    },
    {
      name: "Aman Shaikh",
      role: "Senior Full Stack Web Developer",
      dept: "Engineering",
      bio: "Engineers robust Node.js backend APIs, secures client-server authorization vectors, and manages web app databases.",
      initials: "AS",
      email: "aman@divinecoretech.in"
    },
    {
      name: "Namitha M",
      role: "Senior UI/Frontend Engineer",
      dept: "Engineering",
      bio: "Bridges the gap between creative design concepts and high-performance, pixel-perfect frontend React and Next.js interfaces.",
      initials: "NM",
      email: "namitha@divinecoretech.in"
    },
    {
      name: "Umar Faruk J",
      role: "Lead UI/UX Designer",
      dept: "Design",
      bio: "Crafts luxury user journeys, responsive interface designs, and cohesive visual brand styles for enterprise digital platforms.",
      initials: "UF",
      email: "umar@divinecoretech.in"
    },
    {
      name: "Saranya M",
      role: "Web Project Manager",
      dept: "Leadership",
      bio: "Directs client digital roadmaps, web development sprint cycles, cross-team resource allocations, and project deliveries.",
      image: "/images/saranya.png",
      email: "saranya@divinecoretech.in"
    },
    {
      name: "Nivetha M",
      role: "Senior Python QA Engineer",
      dept: "Engineering",
      bio: "Leads Python-based Selenium/Playwright browser automation frameworks, server API stress scripting, and regression validation pipelines.",
      image: "/images/nivedha.jpg",
      email: "nivetha@divinecoretech.in"
    },
    {
      name: "Rakshaya R",
      role: "Python Web & Operations Developer",
      dept: "Operations",
      bio: "Engineers automated Python backend scripts for web data crawling, database migrations, server operational audits, and API integrations.",
      initials: "RR",
      email: "rakshaya@divinecoretech.in"
    }
  ];

  const filteredTeam = activeTab === "All Departments"
    ? team
    : team.filter(member => member.dept === activeTab);

  return (
    <div>
      <Hero
        title="Meet Our Team"
        subtitle="The experts, innovators, and thinkers building premium digital solutions at DivineCore Technologies."
        image={
          <div className="w-full h-full bg-[#111111] flex items-center justify-center relative overflow-hidden select-none">
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-3 z-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-gold-primary uppercase">DIVINECORE TEAM</span>
              <h2 className="text-3xl font-black text-white">Engineering the Future</h2>
              <p className="text-xs text-white/40">Core Web Development Specialists</p>
            </div>
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-gold-primary transition-colors cursor-pointer">About Us</Link>
          <span>/</span>
          <span className="text-gold-primary">Our Team</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                activeTab === tab
                  ? "gold-gradient text-deep-black shadow-lg shimmer-btn"
                  : "bg-light-gray text-black/40 hover:bg-black/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTeam.map((member, index) => (
            <div key={index} className="group relative rounded-[2rem] p-8 border border-black/5 bg-light-gray/10 hover:border-gold-primary/30 hover-float flex flex-col h-full text-left animate-fade-in-scale">
              {/* Category Badge & Details */}
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-gold-primary/10 border border-gold-primary/20 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-gold-primary">
                    {member.dept}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-deep-black group-hover:text-gold-muted transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-gold-muted font-bold text-xs uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
                <p className="text-black/55 text-sm leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>

              {/* Footer Connect Icons */}
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between gap-4">
                <div className="flex gap-3">
                  {member.phone && (
                    <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-sm text-black/40 hover:text-gold-primary hover:border-gold-primary/30 transition-colors">
                      📞
                    </a>
                  )}
                </div>
                <a href={`mailto:${member.email}`} className="text-[10px] font-black text-gold-muted uppercase tracking-widest hover:text-deep-black transition-colors">
                  Email Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
