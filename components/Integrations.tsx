import React from 'react';

const Integrations = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 12 12 17 22 12"></polyline>
              <polyline points="2 17 12 22 22 17"></polyline>
            </svg>
            Integrations
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-black text-[#0c2340] tracking-tight mb-4 uppercase">
            Integrates With
          </h2>
          
          <p className="text-[#4a6b8c] text-lg">
            Seamlessly integrate with your favorite tools
          </p>
        </div>

        {/* Connections Diagram */}
        <div className="max-w-5xl mx-auto relative mt-16 mb-24">
          <div className="flex justify-between items-center w-full relative">
            
            {/* SVG Lines - Desktop only */}
            <div className="absolute inset-0 hidden md:block z-0 pointer-events-none">
              <svg className="w-full h-full" style={{ minHeight: '380px' }}>
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94b8d9" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#4a6b8c" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#94b8d9" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {/* Left side paths */}
                <path d="M 0,40 C 200,40 200,190 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
                <path d="M 0,190 L 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
                <path d="M 0,340 C 200,340 200,190 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
                
                {/* Right side paths */}
                <path d="M 1000,40 C 800,40 800,190 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
                <path d="M 1000,190 L 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
                <path d="M 1000,340 C 800,340 800,190 500,190" fill="none" stroke="#8baabf" strokeWidth="1.5" strokeDasharray="6 4" />
              </svg>
            </div>

            {/* Left Column Icons */}
            <div className="flex flex-col gap-14 z-10 w-full md:w-auto items-center md:items-start mb-12 md:mb-0">
              <IconCard>
                {/* Slack (Hash) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"></line>
                  <line x1="4" y1="15" x2="20" y2="15"></line>
                  <line x1="10" y1="3" x2="8" y2="21"></line>
                  <line x1="16" y1="3" x2="14" y2="21"></line>
                </svg>
              </IconCard>
              <IconCard>
                {/* Code / Development */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </IconCard>
              <IconCard>
                {/* Database (SQL / Postgres) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </IconCard>
            </div>

            {/* Center Logo */}
            <div className="z-20 hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-[0_15px_40px_rgba(12,35,64,0.12)] flex items-center justify-center border border-white relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-blue-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Company Logo */}
                <img src="/images/logo.png" alt="DivineCore Technologies" className="w-16 h-16 object-contain" />
              </div>
            </div>

            {/* Right Column Icons */}
            <div className="flex flex-col gap-14 z-10 w-full md:w-auto items-center md:items-end">
              <IconCard>
                {/* React */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2.5"></circle>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"></ellipse>
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse>
                </svg>
              </IconCard>
              <IconCard>
                {/* UI / UX Layout */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </IconCard>
              <IconCard>
                {/* GitHub */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </IconCard>
            </div>
          </div>
        </div>

        {/* Footer Features */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-20 pt-10 border-t border-blue-200/50">
          <FeatureItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>}
            text="Seamless Automation"
          />
          <div className="hidden md:block w-px h-6 bg-blue-200/60"></div>
          <FeatureItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
            text="Real-Time Data Sync"
          />
          <div className="hidden md:block w-px h-6 bg-blue-200/60"></div>
          <FeatureItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>}
            text="Customizable Solutions"
          />
        </div>
        
      </div>
    </section>
  );
};

const IconCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[84px] h-[84px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(12,35,64,0.06)] flex items-center justify-center border border-white hover:border-blue-200 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(12,35,64,0.12)] hover:-translate-y-1 cursor-pointer">
      {children}
    </div>
  );
};

const FeatureItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
    <div className="flex items-center gap-3 text-[#4a6b8c]">
      <div className="text-blue-600">
        {icon}
      </div>
      <span className="text-sm font-semibold tracking-wide">{text}</span>
    </div>
  );
};

export default Integrations;
