"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All Projects");

  const tabs = ["All Projects", "Web Development", "Mobile Apps", "SaaS / Admin", "WordPress"];

  const projects = [
    {
      title: "Aero Airworthiness",
      category: "Aviation & Certification",
      tab: "Web Development",
      description: "A premium aviation certification platform providing full-spectrum FAA support, regulatory expertise, and advanced aerospace program management for aircraft manufacturers.",
      tech: ["React", "Tailwind CSS", "Node.js"],
      status: "Completed",
      link: "https://aeroairworthiness.com",
      imageUrl: "/images/aero.png"
    },
    {
      title: "Revz Clothings",
      category: "E-Commerce",
      tab: "WordPress",
      description: "A fully functional e-commerce platform for a clothing brand — featuring product catalogs, cart & checkout, payment gateway integration, and order management.",
      tech: ["WordPress", "WooCommerce"],
      status: "Completed",
      link: "https://revzclothings.com",
      imageUrl: "/images/revz.png"
    },
    {
      title: "Swan Match",
      category: "Mobile App",
      tab: "Mobile Apps",
      description: "An international marriage matchmaking app with advanced profile matching, real-time chat, partner preferences, and secure verification — serving users globally.",
      tech: ["Flutter", "Firebase", "Node.js"],
      status: "Ongoing",
      imageUrl: "/images/swan.png"
    },
    {
      title: "Swan Match Admin",
      category: "Admin Panel",
      tab: "SaaS / Admin",
      description: "Comprehensive admin dashboard for the Swan Match marriage app — user management, verification workflows, analytics, content moderation, and reporting tools.",
      tech: ["React", "Node.js", "Firebase"],
      status: "Ongoing",
      imageUrl: "/images/swan.png"
    },
    {
      title: "Lawyer Consultancy",
      category: "Professional Services",
      tab: "Web Development",
      description: "A professional consultancy website for a law firm — featuring practice area pages, attorney profiles, appointment booking, client testimonials, and a contact system.",
      tech: ["Next.js", "Prisma", "Neon PostgreSQL"],
      status: "Completed",
      imageUrl: "/images/lawyer.png"
    },
    {
      title: "Distribution Channel",
      category: "Logistics",
      tab: "Web Development",
      description: "A distribution management website for streamlined supply chain operations — dealer networks, order tracking, inventory management, and channel partner portals.",
      tech: ["Next.js", "Node.js", "Express", "Neon"],
      status: "Completed",
      imageUrl: "/images/distribution.png"
    },
    {
      title: "Bookkeeping Platform",
      category: "SaaS / Finance",
      tab: "SaaS / Admin",
      description: "A comprehensive online bookkeeping application modeled after Zoho Books — invoicing, expense tracking, bank reconciliation, GST reports, and multi-user accounting.",
      tech: ["React", "Node.js", "PostgreSQL"],
      status: "Ongoing",
      imageUrl: "/images/bookkeeping.png"
    },
    {
      title: "20+ WordPress Projects",
      category: "WordPress",
      tab: "WordPress",
      description: "Successfully delivered over 20 WordPress projects — business websites, blogs, portfolios, landing pages, WooCommerce stores, and custom theme development.",
      tech: ["WordPress", "Elementor", "Custom CSS"],
      status: "Completed",
      imageUrl: "/images/wordpress.png"
    }
  ];

  const filteredProjects = activeTab === "All Projects"
    ? projects
    : projects.filter(p => p.tab === activeTab);

  return (
    <div className="bg-white">
      <Hero
        title="Portfolio"
        subtitle="A showcase of our diverse technical expertise and the impactful digital products we've engineered for our clients."
        image={
          <img 
            src="/images/portfolio_hero.png" 
            alt="Portfolio Showcase" 
            className="w-full h-full object-cover"
          />
        }
      >
        <div className="flex gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary">Portfolio</span>
        </div>
      </Hero>

      <Section className="bg-white pt-20">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                  ? "gold-gradient text-deep-black shadow-lg"
                  : "bg-light-gray text-black/40 hover:bg-black/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="flex flex-col border border-black/5 rounded-2xl overflow-hidden hover:border-gold-primary/30 transition-all group bg-white shadow-sm hover:shadow-xl">
              <div className="aspect-[16/10] bg-light-gray relative overflow-hidden border-b border-black/5">
                <div className="absolute inset-0 gold-gradient opacity-5 group-hover:opacity-10 transition-opacity" />
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/5 font-black text-2xl uppercase tracking-tighter text-center px-8">
                    {project.title}
                  </div>
                )}
                <div className="absolute top-4 left-4 gold-gradient px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest text-deep-black z-10">
                  {project.category}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-black text-deep-black group-hover:text-gold-muted transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 ${project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-gold-primary/10 text-gold-muted"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Completed" ? "bg-green-600" : "bg-gold-primary animate-pulse"}`} />
                    {project.status}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-bold text-black/30">{t}</span>
                      ))}
                    </div>
                    {project.link ? (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-black text-gold-muted hover:text-deep-black transition-colors flex items-center gap-1 group/link"
                      >
                        {project.status === "Completed" ? "Visit Site" : "Enquire"}
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    ) : (
                      <span className="text-[9px] font-black text-black/20 uppercase tracking-widest italic">
                        Confidential
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-black py-0">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 px-12 glass-card rounded-t-[3rem] gap-8">
          <h2 className="text-2xl font-black text-white text-center md:text-left">Inspired by our work? Let's talk about yours.</h2>
          <Link href="/contact" className="gold-gradient text-deep-black px-10 py-3.5 rounded-full font-black text-lg flex items-center gap-2 whitespace-nowrap">
            Start A Project <span>→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
