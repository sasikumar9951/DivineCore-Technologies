"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CandidateApplication {
  id: string;
  applicationType: "Internship" | "Full-Time";
  role: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  currentLocation: string;
  education: string;
  experience: number;
  resumeUrl: string;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
  status: "New Application" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
  appliedAt: string;
}

const STATUS_OPTIONS: CandidateApplication["status"][] = [
  "New Application",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

export default function CareersAdmin() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filters State
  const [filterType, setFilterType] = useState<string>("All");
  const [filterRole, setFilterRole] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Detail State
  const [selectedApp, setSelectedApp] = useState<CandidateApplication | null>(null);
  
  // Status Update Loading State
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Load from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem("recruitment_passcode");
    if (saved) {
      verifyAndLoad(saved);
    }
  }, []);

  const verifyAndLoad = async (code: string) => {
    setIsLoading(true);
    setLoadError(null);
    setLoginError(null);

    try {
      const res = await fetch("/api/careers/admin", {
        headers: {
          "x-admin-passcode": code,
        },
      });

      if (!res.ok) {
        throw new Error("Invalid passcode or unauthorized access.");
      }

      const data = await res.json();
      setApplications(data);
      setPasscode(code);
      setIsAuthorized(true);
      localStorage.setItem("recruitment_passcode", code);
    } catch (err: any) {
      setLoginError(err.message || "Failed to authenticate.");
      localStorage.removeItem("recruitment_passcode");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setLoginError("Passcode cannot be empty.");
      return;
    }
    verifyAndLoad(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem("recruitment_passcode");
    setIsAuthorized(false);
    setApplications([]);
    setPasscode("");
  };

  const handleStatusChange = async (id: string, newStatus: CandidateApplication["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/careers/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update candidate status.");
      }

      // Update state locally
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      
      // Update selected modal if open
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message || "Failed to save status change.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter logic
  const filteredApps = applications.filter((app) => {
    const matchesType = filterType === "All" || app.applicationType === filterType;
    const matchesRole = 
      filterRole === "All" || 
      (filterRole === "AI Conversations" && app.role.includes("AI Conversations")) ||
      (filterRole === "Quality Checking" && app.role.includes("Quality Checking")) ||
      app.role === filterRole;
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mobileNumber.includes(searchQuery);

    return matchesType && matchesRole && matchesStatus && matchesSearch;
  });

  // Unique roles in list for filter dropdown
  const rolesInList = Array.from(new Set(applications.map((app) => app.role)));

  if (!isAuthorized) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center font-sans p-6 text-slate-900">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm text-center space-y-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto font-black shadow-inner">
            🔑
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900">Recruitment Dashboard</h1>
            <p className="text-xs text-slate-500">DivineCore Technologies Administrative Portal</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-4 rounded-xl text-left">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Admin Passcode</label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Unlock Dashboard"
              )}
            </button>
          </form>

          <div className="pt-2">
            <Link href="/careers" className="text-xs text-slate-500 hover:underline">
              ← Return to Careers Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Analytics Calculations
  const totalApps = applications.length;
  const fullTimeApps = applications.filter((app) => app.applicationType === "Full-Time").length;
  const internshipApps = applications.filter((app) => app.applicationType === "Internship").length;
  const shortlistedApps = applications.filter((app) => app.status === "Shortlisted").length;
  const interviewApps = applications.filter((app) => app.status === "Interview Scheduled").length;
  const selectedApps = applications.filter((app) => app.status === "Selected").length;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Dashboard Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-black">
              📊
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Applicant Tracking Dashboard</h1>
              <p className="text-xs text-slate-500">
                Logged in • <span className="font-bold">{applications.length} applications total</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link 
              href="/careers" 
              className="px-5 py-3 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Recruitment Portal
            </Link>
            <button 
              onClick={handleLogout}
              className="px-5 py-3 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Applications</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{totalApps}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Full-Time</span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">{fullTimeApps}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Internship</span>
            <span className="text-2xl font-black text-cyan-600 mt-1 block">{internshipApps}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Shortlisted</span>
            <span className="text-2xl font-black text-purple-600 mt-1 block">{shortlistedApps}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Interview Scheduled</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{interviewApps}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Selected Candidates</span>
            <span className="text-2xl font-black text-green-600 mt-1 block">{selectedApps}</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="w-full md:flex-grow relative">
              <input
                type="text"
                placeholder="Search candidates by name, email, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
            </div>

            {/* Filter Type */}
            <div className="w-full md:w-48 text-left">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Filter Status */}
            <div className="w-full md:w-48 text-left">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Filter Role */}
            <div className="w-full md:w-56 text-left">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="AI Conversations">AI Conversations</option>
                <option value="Quality Checking">Quality Checking</option>
                {rolesInList.filter(r => r !== "AI Conversations" && r !== "Quality Checking").map((rl) => (
                  <option key={rl} value={rl}>{rl}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Grid / Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider pl-6">ID & Date</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Candidate Info</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Applied Role</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Resume</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 text-xs font-bold">
                      No matching candidate applications found.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
                    const appliedDate = new Date(app.appliedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* ID & Date */}
                        <td className="p-4 pl-6 text-left">
                          <span className="text-xs font-black text-slate-800 block">{app.id}</span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{appliedDate}</span>
                        </td>

                        {/* Name & Contact */}
                        <td className="p-4 text-left">
                          <span className="text-sm font-black text-slate-900 block">{app.fullName}</span>
                          <span className="text-xs text-slate-500 block mt-0.5">{app.emailAddress}</span>
                          <span className="text-xs text-slate-500 block">{app.mobileNumber}</span>
                        </td>

                        {/* Role & Type */}
                        <td className="p-4 text-left">
                          <span className="text-xs font-black text-slate-800 block">{app.role}</span>
                          <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${app.applicationType === "Full-Time" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-cyan-50 text-cyan-700 border border-cyan-100"}`}>
                            {app.applicationType}
                          </span>
                        </td>

                        {/* Status Select */}
                        <td className="p-4 text-left">
                          <div className="relative">
                            <select
                              value={app.status}
                              disabled={updatingId === app.id}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                              className={`text-xs font-extrabold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer ${
                                app.status === "Selected" ? "bg-green-50 text-green-700 border-green-200" :
                                app.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                                app.status === "Shortlisted" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                app.status === "Interview Scheduled" ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                                app.status === "Under Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-white text-slate-900 font-bold">{opt}</option>
                              ))}
                            </select>
                            {updatingId === app.id && (
                              <span className="absolute -right-6 top-2.5 w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            )}
                          </div>
                        </td>

                        {/* Resume Link */}
                        <td className="p-4 text-left">
                          <a
                            href={app.resumeUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            Resume
                          </a>
                        </td>

                        {/* Actions (View Profile) */}
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="px-4 py-2 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 text-slate-600 hover:text-blue-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-fade-in-scale text-left space-y-6">
            
            {/* Modal Title */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{selectedApp.id}</span>
                <h2 className="text-xl font-black text-slate-900 mt-2">{selectedApp.fullName}</h2>
                <p className="text-xs text-slate-500">Applied for {selectedApp.role} ({selectedApp.applicationType})</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-lg p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Candidate Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Contact Info</p>
                <p className="text-xs font-bold text-slate-800 mt-1">📧 {selectedApp.emailAddress}</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">📞 {selectedApp.mobileNumber}</p>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Profile Details</p>
                <p className="text-xs font-bold text-slate-800 mt-1">📍 Location: {selectedApp.currentLocation}</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">🎓 Highest Qualification: {selectedApp.education}</p>
                <p className="text-xs font-bold text-slate-800">💼 Experience: {selectedApp.experience} Years</p>
              </div>
            </div>

            {/* Optional Links */}
            {(selectedApp.linkedIn || selectedApp.portfolio) && (
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Candidate Links</p>
                {selectedApp.linkedIn && (
                  <p className="text-xs text-slate-850">
                    🔗 <strong>LinkedIn:</strong>{" "}
                    <a
                      href={selectedApp.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-bold"
                    >
                      {selectedApp.linkedIn}
                    </a>
                  </p>
                )}
                {selectedApp.portfolio && (
                  <p className="text-xs text-slate-850">
                    🌐 <strong>Portfolio:</strong>{" "}
                    <a
                      href={selectedApp.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-bold"
                    >
                      {selectedApp.portfolio}
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* Cover Letter */}
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cover Letter / Statement</p>
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                {selectedApp.coverLetter || "No cover letter provided."}
              </div>
            </div>

            {/* Application Status Actions */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as any)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-700 focus:outline-none cursor-pointer"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-slate-900 font-bold">{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a
                  href={selectedApp.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors text-center w-full sm:w-auto cursor-pointer"
                >
                  Download Resume
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
