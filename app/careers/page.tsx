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
}

const FULL_TIME_OPENINGS: JobOpening[] = [
  {
    title: "AI Conversations Associate",
    type: "Full-Time",
    salaryOrStipend: "₹20,000 - ₹30,000 per month",
    location: "Salem, Tamil Nadu",
    mode: "Work From Office",
    responsibilities: [
      "Interact with AI systems and voice assistants",
      "Evaluate conversation quality",
      "Review AI responses and outputs",
      "Report issues and improvement suggestions",
    ],
    requirements: [
      "Good communication skills",
      "Basic English proficiency",
      "Interest in AI and technology",
      "Freshers can apply",
    ],
  },
  {
    title: "Quality Checking Associate",
    type: "Full-Time",
    salaryOrStipend: "₹15,000 - ₹30,000 per month",
    location: "Salem, Tamil Nadu",
    mode: "Work From Office",
    responsibilities: [
      "Perform quality checking tasks",
      "Verify data accuracy",
      "Conduct mapping reviews",
      "Maintain quality standards",
    ],
    requirements: [
      "Basic computer knowledge",
      "Attention to detail",
      "Fast learning ability",
      "Freshers can apply",
    ],
  },
];

const INTERNSHIPS: JobOpening[] = [
  {
    title: "AI Conversations Intern",
    type: "Internship",
    salaryOrStipend: "₹10,000 per month",
    location: "Salem, Tamil Nadu",
    mode: "Work From Office",
    duration: "3 Months",
    responsibilities: [
      "Interact with AI models and log conversation flows",
      "Provide feedback on voice assistant interactions",
      "Validate output patterns for accuracy",
    ],
    requirements: [
      "Eagerness to learn AI concepts",
      "Decent communication skills",
      "Adaptable team player",
    ],
    benefits: [
      "Internship Certificate",
      "Real-world industry experience",
      "Performance-based full-time opportunity",
    ],
  },
  {
    title: "Quality Checking Intern",
    type: "Internship",
    salaryOrStipend: "₹10,000 per month",
    location: "Salem, Tamil Nadu",
    mode: "Work From Office",
    duration: "3 Months",
    responsibilities: [
      "Support data validation audits",
      "Inspect mapping lists for errors",
      "Report compliance discrepancies",
    ],
    requirements: [
      "Good eye for spotting details",
      "Basic Microsoft Office capabilities",
      "Positive attitude and coachable",
    ],
    benefits: [
      "Internship Certificate",
      "Hands-on training",
      "Performance-based full-time opportunity",
    ],
  },
];

const FULL_TIME_ROLES = ["AI Conversations Associate", "Quality Checking Associate"];
const INTERNSHIP_ROLES = ["AI Conversations Intern", "Quality Checking Intern"];

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
      setResume(e.target.files[0]);
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
    if (!fullName || !emailAddress || !mobileNumber || !currentLocation || !education || !resume) {
      setErrorMsg("Please fill in all required fields and upload your resume.");
      return;
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
    formData.append("resume", resume);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong during submission.");
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
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      <Hero
        title="Join Our Team at DivineCore Technologies"
        subtitle="Build your career with a fast-growing technology company. We are looking for passionate individuals who are eager to learn, grow, and contribute to innovative projects."
        image={
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center relative overflow-hidden select-none">
            <div className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-blue-400/10 blur-[90px] rounded-full pointer-events-none animate-pulse" />
            <div className="text-center space-y-4 z-10 p-6">
              <span className="text-xs font-black tracking-[0.3em] text-blue-300 uppercase">CAREER OPPORTUNITIES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Join the Core</h2>
              <p className="text-xs text-blue-200/60 max-w-xs mx-auto">Explore technology, QA, and AI jobs at our Salem Hub</p>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px]" />
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-white/70">
          <Link href="/" className="hover:text-blue-400 transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-blue-400 font-bold">Careers</span>
        </div>
      </Hero>

      {/* Main Consolidated Roles & Form Grid */}
      <Section className="bg-white py-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">CAREERS PORTAL</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4">Positions Explorer & Application</h2>
            <p className="text-slate-500 mt-3 text-base max-w-2xl mx-auto">
              Read about our available roles on the left, and click Apply Now or Quick Apply to open the application portal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Open Positions Descriptions & Terms (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-8 text-left">
              
              {/* 1. Full-time Opportunities */}
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center gap-3">
                  <span className="text-xl">💼</span>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Full-Time Openings</h3>
                </div>

                <div className="space-y-6">
                  {FULL_TIME_OPENINGS.map((job) => (
                    <div key={job.title} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-blue-300 transition-all duration-300 relative">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-black text-slate-900">{job.title}</h4>
                          <p className="text-blue-600 font-extrabold text-xs mt-0.5">{job.salaryOrStipend}</p>
                        </div>
                        <button 
                          onClick={() => handleQuickApply(job)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Quick Apply
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200/60 text-xs">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Responsibilities</p>
                          <ul className="space-y-1 text-slate-600">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Requirements</p>
                          <ul className="space-y-1 text-slate-600">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Internship Opportunities */}
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide">Internship Opportunities</h3>
                </div>

                <div className="space-y-6">
                  {INTERNSHIPS.map((job) => (
                    <div key={job.title} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-cyan-400 transition-all duration-300 relative">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-black text-slate-900">{job.title}</h4>
                          <p className="text-cyan-600 font-extrabold text-xs mt-0.5">Stipend: {job.salaryOrStipend} ({job.duration})</p>
                        </div>
                        <button 
                          onClick={() => handleQuickApply(job)}
                          className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-black text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Quick Apply
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200/60 text-xs">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Responsibilities</p>
                          <ul className="space-y-1 text-slate-600">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-cyan-500">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Benefits</p>
                          <ul className="space-y-1 text-slate-600">
                            {job.benefits?.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-cyan-500">✔</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. General Recruitment Terms */}
              <div className="bg-blue-50/40 border border-blue-100 rounded-3xl p-6 space-y-3">
                <h4 className="text-xs font-black text-blue-800 uppercase tracking-wider">Recruitment Terms & Guidelines</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">📍</span>
                    <span>All positions are strictly <strong>Work From Office</strong> located in Salem, Tamil Nadu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">🎓</span>
                    <span>Freshers are eligible to apply for all full-time and internship openings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✉</span>
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
                      Join DivineCore
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
      <Section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-black text-slate-900 mb-2">Need Recruitment Support?</h3>
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            If you encounter any issues during the resume submission process or want to inquire about other vacancies, reach out directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-black">✉</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Email Inquiry</p>
                <a href="mailto:info@divinecoretech.in" className="text-xs font-black text-blue-600 hover:underline">info@divinecoretech.in</a>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-black">🌍</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Corporate Site</p>
                <a href="http://www.divinecoretech.in" target="_blank" rel="noopener noreferrer" className="text-xs font-black text-blue-600 hover:underline">www.divinecoretech.in</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          onClick={(e) => {
            // Close if clicking exact outer overlay
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col animate-fade-in-scale">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center text-sm font-black cursor-pointer z-10"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {successMsg ? (
                <div className="text-center space-y-6 py-6 animate-fade-in-scale">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-4xl border border-green-200">
                    🎉
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
                    <p className="text-xs text-blue-600 font-black tracking-widest bg-blue-50 border border-blue-100 inline-block px-4 py-1.5 rounded-full">
                      APPLICATION ID: {applicationId}
                    </p>
                  </div>
                  
                  <div className="max-w-md mx-auto text-left bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                    <p className="text-slate-600 text-xs leading-relaxed text-center font-medium">
                      {successMsg}
                    </p>
                    <p className="text-slate-400 text-[10px] text-center italic border-t border-slate-200/60 pt-3">
                      A confirmation email has been dispatched to <span className="font-bold text-slate-600">{emailAddress}</span>.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={resetForm}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border-b border-slate-200 pb-4 mb-6 text-left pr-8">
                    <h3 className="text-2xl font-black text-slate-900">Application Form</h3>
                    <p className="text-xs text-slate-500 mt-1">Please select the role type, position, and enter candidate details.</p>
                  </div>

                  {errorMsg && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-750 text-xs rounded-xl p-4 font-semibold text-left">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    
                    {/* Role Type & Position Dropdown Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-200 pb-6">
                      {/* Application Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Application Type *</label>
                        <select
                          required
                          value={appType}
                          onChange={(e) => {
                            setAppType(e.target.value as any);
                            setRole(""); // Reset role on type change
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="">-- Select Type --</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      {/* Select Role */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Position Applied For *</label>
                        <select
                          required
                          disabled={!appType}
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
                        >
                          <option value="">
                            {!appType ? "-- Select Type First --" : "-- Select Role --"}
                          </option>
                          {roleOptions.map((opt) => (
                            <option key={opt} value={opt}>
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
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Anand Kumar"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Mobile Number *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. anand@example.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Current Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Current Location *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Salem, Tamil Nadu"
                          value={currentLocation}
                          onChange={(e) => setCurrentLocation(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Education Qualification */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Education Qualification *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. B.Sc. Computer Science / BCA"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Years of Experience */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Years of Experience (Leave blank or 0 if fresher)</label>
                        <input 
                          type="number" 
                          min="0"
                          placeholder="e.g. 0"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Upload Resume (PDF/DOC/DOCX) *</label>
                      <input 
                        type="file" 
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      {resume && <p className="text-xs text-blue-600 font-bold">Selected: {resume.name}</p>}
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Cover Letter (Optional)</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell us why you would be a great fit for this position..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Submission Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all disabled:bg-blue-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
