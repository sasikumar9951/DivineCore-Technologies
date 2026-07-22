"use client";

import { useState, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Link from "next/link";

interface JobOpening {
  title: string;
  type: "Full-Time" | "Internship";
  salaryOrStipend: string;
  location: string;
  mode: string;
  duration?: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  interviewDate?: string;
  status: "Open" | "Closed";
}

const FULL_TIME_OPENINGS: JobOpening[] = [];

const INTERNSHIPS: JobOpening[] = [
  {
    title: "WordPress Developer Intern",
    type: "Internship",
    salaryOrStipend: "Performance-Based",
    location: "Salem, Tamil Nadu",
    mode: "Work From Office",
    duration: "3 Months",
    interviewDate: "15th July 2026",
    status: "Open",
    responsibilities: [
      "Design, develop, and maintain WordPress websites",
      "Customize WordPress themes and plugins",
      "Ensure website responsiveness, performance, and security",
      "Collaborate with design and development teams on layouts",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, JavaScript, and PHP",
      "Familiarity with WordPress dashboard and theme page builders (e.g., Elementor)",
      "Strong problem-solving skills and eagerness to learn",
      "Freshers can apply",
    ],
    benefits: [
      "Internship Certificate",
      "Real-world industry experience",
      "Performance-based full-time opportunity",
    ],
  },
];

const FULL_TIME_ROLES = ["General Application (Full-Time)"];
const INTERNSHIP_ROLES = ["WordPress Developer Intern", "General Application (Internship)"];

export default function Careers() {
  // Form State
  const [appType, setAppType] = useState<"Full-Time" | "Internship" | "">("");
  const [role, setRole] = useState<string>("");
  
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Auto-fill form and open modal
  const handleQuickApply = (job: JobOpening) => {
    setAppType(job.type);
    setRole(job.title);
    setIsModalOpen(true);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
      if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
        setErrorMsg("Only PDF files are accepted. Please upload a .pdf resume.");
        e.target.value = "";
        return;
      }
      if (file.size > MAX_SIZE) {
        setErrorMsg(`Resume exceeds the 2 MB file size limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB. Please compress or re-save the PDF.`);
        e.target.value = "";
        return;
      }
      setErrorMsg(null);
      setResume(file);
    }
  };

  const resetForm = () => {
    setAppType("");
    setRole("");
    setFullName("");
    setMobileNumber("");
    setEmailAddress("");
    setCurrentLocation("");
    setEducation("");
    setExperience("");
    setResume(null);
    setCoverLetter("");
    setLinkedIn("");
    setPortfolio("");
    setApplicationId(null);
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!appType) {
      setErrorMsg("Please select whether you are applying for an Internship or Full-Time role.");
      return;
    }
    if (!role) {
      setErrorMsg("Please select the position you are applying for.");
      return;
    }
    if (!fullName || !emailAddress || !mobileNumber || !currentLocation || !education || experience === "" || !resume || !linkedIn) {
      setErrorMsg("Please fill in all required fields and upload your resume.");
      return;
    }

    // Double-check file constraints before submitting
    const MAX_SIZE = 2 * 1024 * 1024;
    if (resume.size > MAX_SIZE) {
      setErrorMsg(`Resume exceeds the 2 MB file size limit (${(resume.size / (1024 * 1024)).toFixed(2)} MB). Please compress your PDF.`);
      return;
    }
    if (!resume.name.toLowerCase().endsWith(".pdf") && resume.type !== "application/pdf") {
      setErrorMsg("Only PDF files are accepted for resume uploads.");
      return;
    }

    // Client-side quick duplicate check
    if (typeof window !== "undefined") {
      const previouslyAppliedEmail = localStorage.getItem("dct_applied_email");
      if (previouslyAppliedEmail && previouslyAppliedEmail === emailAddress.toLowerCase().trim()) {
        setErrorMsg("You have already submitted an application using this email address.");
        return;
      }
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("emailAddress", emailAddress);
    formData.append("mobileNumber", mobileNumber);
    formData.append("currentLocation", currentLocation);
    formData.append("education", education);
    formData.append("experience", experience);
    formData.append("applicationType", appType);
    formData.append("role", role);
    formData.append("coverLetter", coverLetter);
    formData.append("linkedIn", linkedIn);
    formData.append("portfolio", portfolio);
    formData.append("resume", resume);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data.details 
          ? `${data.error} Details: ${data.details}` 
          : (data.error || "Something went wrong during submission.");
        throw new Error(msg);
      }

      // Store in localStorage to prevent double submission
      if (typeof window !== "undefined") {
        localStorage.setItem("dct_applied_email", emailAddress.toLowerCase().trim());
      }

      setApplicationId(data.applicationId);
      setSuccessMsg(data.message);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleOptions = appType === "Full-Time" 
    ? FULL_TIME_ROLES 
    : appType === "Internship" 
      ? INTERNSHIP_ROLES 
      : [];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans relative overflow-hidden">
      {/* Glow ambient effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Hero
        title="Join Our Team at DivineCore Technologies PVT LTD"
        subtitle="Build your career with a fast-growing technology company. We are looking for passionate individuals who are eager to learn, grow, and contribute to innovative projects."
        image={
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center relative overflow-hidden select-none border border-white/5">
            <div className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-gold-primary/10 blur-[90px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-4 z-10 p-6">
              <span className="text-xs font-black tracking-[0.3em] text-gold-primary uppercase">CAREER OPPORTUNITIES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Join the Core</h2>
              <p className="text-xs text-white/50 max-w-xs mx-auto">Explore technology, QA, and AI jobs at our Salem Hub</p>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px]" />
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/70">
          <Link href="/" className="hover:text-gold-primary transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-gold-primary font-bold">Careers</span>
        </div>
      </Hero>

      {/* Main Consolidated Roles & Form Grid */}
      <Section className="bg-transparent py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-gold-primary font-black text-xs uppercase tracking-widest bg-gold-primary/10 border border-gold-primary/20 px-4 py-2 rounded-full">CAREERS PORTAL</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-4">Positions Explorer & Application</h2>
            <p className="text-white/50 mt-3 text-base max-w-2xl mx-auto">
              Explore available roles below and apply online. Our team will review your profile.
            </p>
          </div>

          {/* Hiring Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-gold-primary/30 p-6 md:p-8 rounded-3xl text-center mb-12 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-gold-primary text-xs font-black tracking-[0.25em] uppercase bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded-full inline-block">
                🚀 Join DivineCore Technologies PVT LTD
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">
                Now Hiring: WordPress Developer Intern
              </h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed font-light">
                We are actively looking for a WordPress Developer Intern who is passionate about creating high-quality web experiences and eager to grow their skills at our Salem Hub.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Open Positions Descriptions & Terms (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-8 text-left">
              
              {/* 1. Full-time Opportunities */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="text-xl">💼</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">Full-Time Openings</h3>
                </div>

                {FULL_TIME_OPENINGS.length > 0 ? (
                  <div className="space-y-6">
                    {FULL_TIME_OPENINGS.map((job) => (
                      <div 
                        key={job.title} 
                        className={`backdrop-blur-md rounded-3xl p-6 transition-all duration-500 relative text-left border ${job.status === "Closed" ? "bg-[#0e0e0e]/40 border-white/[0.03] opacity-40 hover:opacity-50 saturate-50" : "bg-[#0e0e0e] border-white/10 hover:border-gold-primary/40 hover-float shadow-2xl"}`}
                      >
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <div className="space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-black text-white">{job.title}</h4>
                              {job.status === "Closed" && (
                                <span className="text-[10px] font-bold text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  Filled
                                </span>
                              )}
                            </div>
                            <span className="inline-block text-xs font-black text-gold-primary bg-gold-primary/10 border border-gold-primary/20 px-3.5 py-1.5 rounded-full">
                              💰 {job.salaryOrStipend}
                            </span>
                          </div>
                          <button 
                            disabled={job.status === "Closed"}
                            onClick={() => handleQuickApply(job)}
                            className={`font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0 font-bold ${job.status === "Closed" ? "bg-white/[0.02] border border-white/[0.04] text-white/20 cursor-not-allowed shadow-none" : "gold-gradient hover:opacity-90 text-deep-black shadow-gold-primary/10 hover:scale-[1.03]"}`}
                          >
                            {job.status === "Closed" ? "Filled" : "Apply Now"}
                          </button>
                        </div>

                        {/* Job Metadata tags */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 border-y border-white/5 py-3.5 my-4 text-xs font-bold text-white/60">
                          <div className="flex items-center gap-1.5">
                            <span>📍</span>
                            <span><strong>Location:</strong> Salem, TN</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>🏢</span>
                            <span><strong>Work Mode:</strong> WFO</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>🎓</span>
                            <span>Freshers Can Apply</span>
                          </div>
                          {job.interviewDate && (
                            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg w-fit">
                              <span>📅</span>
                              <span>Interview: {job.interviewDate}</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-wider mb-1.5">Responsibilities</p>
                            <ul className="space-y-1 text-white/70">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-gold-primary">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-wider mb-1.5">Requirements</p>
                            <ul className="space-y-1 text-white/70">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-gold-primary">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#0e0e0e]/40 border border-dashed border-white/10 rounded-3xl p-8 text-center">
                    <p className="text-sm font-bold text-white/70">No active full-time openings at the moment.</p>
                    <p className="text-xs text-white/40 mt-2 font-medium">You can still submit a general application for future opportunities.</p>
                  </div>
                )}
              </div>

              {/* 2. Internship Opportunities */}
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">Internship Opportunities</h3>
                </div>

                {INTERNSHIPS.length > 0 ? (
                  <div className="space-y-6">
                    {INTERNSHIPS.map((job) => (
                      <div 
                        key={job.title} 
                        className={`backdrop-blur-md rounded-3xl p-6 transition-all duration-300 relative text-left border ${job.status === "Closed" ? "bg-[#0e0e0e]/40 border-white/[0.03] opacity-40 hover:opacity-50 saturate-50" : "bg-[#0e0e0e] border-white/10 hover:border-cyan-400/40 hover-float shadow-2xl"}`}
                      >
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <div className="space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-black text-white">{job.title}</h4>
                              {job.status === "Closed" && (
                                <span className="text-[10px] font-bold text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  Filled
                                </span>
                              )}
                            </div>
                            <span className="inline-block text-xs font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3.5 py-1.5 rounded-full">
                              💰 Stipend: {job.salaryOrStipend} ({job.duration})
                            </span>
                          </div>
                          <button 
                            disabled={job.status === "Closed"}
                            onClick={() => handleQuickApply(job)}
                            className={`font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0 font-bold ${job.status === "Closed" ? "bg-white/[0.02] border border-white/[0.04] text-white/20 cursor-not-allowed shadow-none" : "bg-cyan-500 hover:bg-cyan-600 text-black hover:shadow-cyan-500/20 hover:scale-[1.03]"}`}
                          >
                            {job.status === "Closed" ? "Filled" : "Apply Now"}
                          </button>
                        </div>

                        {/* Job Metadata tags */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 border-y border-white/5 py-3.5 my-4 text-xs font-bold text-white/60">
                          <div className="flex items-center gap-1.5">
                            <span>📍</span>
                            <span><strong>Location:</strong> Salem, TN</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>🏢</span>
                            <span><strong>Work Mode:</strong> WFO</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>🎓</span>
                            <span>Freshers Can Apply</span>
                          </div>
                          {job.interviewDate && (
                            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg w-fit">
                              <span>📅</span>
                              <span>Interview: {job.interviewDate}</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-wider mb-1.5">Responsibilities</p>
                            <ul className="space-y-1 text-white/70">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-cyan-400">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-wider mb-1.5">Benefits</p>
                            <ul className="space-y-1 text-white/70">
                              {job.benefits?.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-cyan-400">✔</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#0e0e0e]/40 border border-dashed border-white/10 rounded-3xl p-8 text-center">
                    <p className="text-sm font-bold text-white/70">No active internship openings at the moment.</p>
                    <p className="text-xs text-white/40 mt-2 font-medium">You can still submit a general application for future opportunities.</p>
                  </div>
                )}
              </div>

              {/* 3. General Recruitment Terms */}
              <div className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-black text-gold-primary uppercase tracking-wider">Recruitment Terms & Guidelines</h4>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">📍</span>
                    <span>All positions are strictly <strong>Work From Office</strong> located in Salem, Tamil Nadu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">🎓</span>
                    <span>Freshers are eligible to apply for all full-time and internship openings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-primary">✉</span>
                    <span>Confirm your email address: A confirmation email with your unique <strong>Application ID</strong> is dispatched immediately upon form submission.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* RIGHT COLUMN: CTA Card (lg:col-span-6) */}
            <div className="lg:col-span-6 lg:sticky lg:top-8">
              <div className="bg-deep-black rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl gold-border-glow">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold-primary/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gold-muted/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 space-y-8 text-left">
                  <div className="space-y-4">
                    <span className="text-gold-primary text-xs font-black tracking-[0.2em] uppercase bg-gold-muted/10 border border-gold-primary/30 px-3.5 py-1.5 rounded-full inline-block">
                      Join DIVINECORE
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black leading-tight text-white">
                      Ready to build the <span className="gold-text-gradient">future</span>?
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      We're looking for passionate individuals to join our Salem team. Even if you don't fit the exact criteria of open positions, we want to hear from you.
                    </p>
                  </div>

                  {/* Highlights/Perks list */}
                  <div className="space-y-4 border-y border-white/10 py-6 my-6">
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary text-sm">💡</span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Learning Curve</h4>
                        <p className="text-white/50 text-[11px] mt-0.5 font-medium">Work directly with state-of-the-art AI systems & technologies.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary text-sm">📍</span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Salem Tech Hub</h4>
                        <p className="text-white/50 text-[11px] mt-0.5 font-medium">Collaborative Work From Office environment in Salem, TN.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary text-sm">🏆</span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Career Acceleration</h4>
                        <p className="text-white/50 text-[11px] mt-0.5 font-medium">Performance-driven promotions and full-time conversions.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                      }}
                      className="w-full gold-gradient hover:opacity-90 text-deep-black font-black text-xs uppercase tracking-widest py-4.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-gold-primary/20 transform hover:-translate-y-0.5 cursor-pointer text-center font-bold"
                    >
                      Apply Now
                    </button>
                    <p className="text-[10px] text-white/40 text-center mt-3 italic">
                      Takes less than 5 minutes to submit your details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* Support recruitment contact details */}
      <Section className="bg-[#090909]/60 py-16 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-black text-white mb-2">Need Recruitment Support?</h3>
          <p className="text-white/50 text-xs leading-relaxed mb-6">
            If you encounter any issues during the resume submission process or want to inquire about other vacancies, reach out directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-white/[0.02] border border-white/[0.05] hover:border-gold-primary/20 transition-all rounded-2xl p-4 flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 text-gold-primary flex items-center justify-center text-lg font-black">✉</div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-wider">Email Inquiry</p>
                <a href="mailto:info@DIVINECOREtech.in" className="text-xs font-black text-gold-primary hover:underline">info@DIVINECOREtech.in</a>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] hover:border-gold-primary/20 transition-all rounded-2xl p-4 flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 text-gold-primary flex items-center justify-center text-lg font-black">🌍</div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-wider">Corporate Site</p>
                <a href="http://www.DIVINECOREtech.in" target="_blank" rel="noopener noreferrer" className="text-xs font-black text-gold-primary hover:underline">www.DIVINECOREtech.in</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917448609951?text=Hello%20DIVINECORE%20Technologies%2C%20I%20would%20like%20to%20know%20more%20about%20the%20current%20job%20openings."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center group border-2 border-white/20"
        aria-label="Contact recruitment on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.48 1.974 14.007 1.95 12.01 1.95c-5.437 0-9.862 4.371-9.866 9.8.001 2.029.531 4.02 1.543 5.779L2.732 21.03l3.915-1.876zm13.111-7.79c-.318-.159-1.884-.93-2.176-1.037-.291-.106-.503-.159-.715.159-.211.318-.819 1.037-1.004 1.248-.186.213-.37.24-.689.081-1.156-.479-1.923-.974-2.69-2.28-.182-.312-.182-.537-.024-.716.143-.162.318-.371.477-.556.16-.186.213-.318.318-.53.106-.213.053-.4-.027-.559-.079-.16-.715-1.722-.979-2.36-.258-.622-.519-.538-.715-.548-.185-.01-.397-.011-.61-.011-.211 0-.556.08-.847.4-.291.318-1.111 1.087-1.111 2.65 0 1.563 1.139 3.076 1.297 3.289.16.213 2.24 3.42 5.426 4.795.758.328 1.348.524 1.81.67.76.241 1.451.207 2.001.125.613-.092 1.884-.77 2.148-1.478.265-.708.265-1.313.186-1.438-.08-.125-.292-.212-.61-.371z"/>
        </svg>
        <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-black px-3.5 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap pointer-events-none uppercase tracking-widest border border-slate-800">
          WhatsApp Support
        </span>
      </a>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          onClick={(e) => {
            // Close if clicking exact outer overlay
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-[#0d0d0d] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10 flex flex-col animate-fade-in-scale text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center text-sm font-black cursor-pointer z-10"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {successMsg ? (
                <div className="text-center space-y-6 py-6 animate-fade-in-scale">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-4xl border border-emerald-500/20 text-emerald-400">
                    🎉
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Application Submitted!</h3>
                    <p className="text-xs text-gold-primary font-black tracking-widest bg-gold-primary/10 border border-gold-primary/20 inline-block px-4 py-1.5 rounded-full">
                      APPLICATION ID: {applicationId}
                    </p>
                  </div>
                  
                  <div className="max-w-md mx-auto text-left bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 space-y-3">
                    <p className="text-white/80 text-xs leading-relaxed text-center font-bold">
                      Thank you for applying to DivineCore Technologies PVT LTD.
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed text-center font-medium">
                      Your application has been received successfully. Our recruitment team will review your profile and contact shortlisted candidates.
                    </p>
                    <p className="text-white/40 text-[10px] text-center italic border-t border-white/5 pt-3">
                      A confirmation email has been dispatched to <span className="font-bold text-white/80">{emailAddress}</span>.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={resetForm}
                      className="gold-gradient hover:opacity-90 text-deep-black font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border-b border-white/10 pb-4 mb-6 text-left pr-8">
                    <h3 className="text-2xl font-black text-white">Application Form</h3>
                    <p className="text-xs text-white/50 mt-1">Please select the role type, position, and enter candidate details.</p>
                  </div>

                  {errorMsg && (
                    <div className="mb-6 bg-red-950/20 border border-red-900/40 text-red-400 text-xs rounded-xl p-4 font-semibold text-left">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    
                    {/* Role Type & Position Dropdown Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-white/10 pb-6">
                      {/* Application Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Application Type *</label>
                        <select
                          required
                          value={appType}
                          onChange={(e) => {
                            setAppType(e.target.value as any);
                            setRole(""); // Reset role on type change
                          }}
                          className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary cursor-pointer"
                        >
                          <option value="" className="bg-[#0d0d0d]">-- Select Type --</option>
                          <option value="Full-Time" className="bg-[#0d0d0d]">Full-Time</option>
                          <option value="Internship" className="bg-[#0d0d0d]">Internship</option>
                        </select>
                      </div>

                      {/* Select Role */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Position Applied For *</label>
                        <select
                          required
                          disabled={!appType}
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary disabled:bg-white/[0.02] disabled:text-white/20 cursor-pointer"
                        >
                          <option value="" className="bg-[#0d0d0d]">
                            {!appType ? "-- Select Type First --" : "-- Select Role --"}
                          </option>
                          {roleOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0d0d0d]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Candidate Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Anand Kumar"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Mobile Number *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. anand@example.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Current Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Current Location *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Salem, Tamil Nadu"
                          value={currentLocation}
                          onChange={(e) => setCurrentLocation(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Highest Qualification */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Highest Qualification *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. B.Sc. Computer Science / BCA"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Years of Experience */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Years of Experience * (Enter 0 if fresher)</label>
                        <input 
                          type="number" 
                          required
                          min="0"
                          placeholder="e.g. 0"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>
                    </div>

                    {/* Required LinkedIn & Optional Portfolio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* LinkedIn */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">LinkedIn Profile *</label>
                        <input 
                          type="url" 
                          required
                          placeholder="e.g. https://linkedin.com/in/username"
                          value={linkedIn}
                          onChange={(e) => setLinkedIn(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>

                      {/* Portfolio */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Portfolio Website (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="e.g. https://myportfolio.com"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Upload Resume (PDF Only) *</label>
                      <input 
                        type="file" 
                        required
                        accept=".pdf,application/pdf"
                        onChange={handleResumeChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-450 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-gold-primary/10 file:text-gold-primary hover:file:bg-gold-primary/20 cursor-pointer"
                      />
                      <p className="text-[10px] text-white/40 font-medium">PDF only · Max file size: 2 MB</p>
                      {resume && <p className="text-xs text-gold-primary font-bold">✓ {resume.name} ({(resume.size / (1024 * 1024)).toFixed(2)} MB)</p>}
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-white/70 uppercase tracking-wider block">Cover Letter (Optional)</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell us why you would be a great fit for this position..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30"
                      />
                    </div>

                    {/* Submission Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full gold-gradient hover:opacity-90 text-deep-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
