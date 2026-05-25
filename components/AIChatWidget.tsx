"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message after mount to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hello! Welcome to DivineCore Technologies. I am **CoreAI**, your virtual assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const suggestions = [
    "What services do you offer?",
    "Who is the founder?",
    "Where is your office?",
    "How are IP rights handled?",
  ];

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Alert user with unread ping if widget is closed when first message is loaded
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnread(true);
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnread(false);
    }
  };

  const getLocalResponse = (msg: string): string => {
    const query = msg.toLowerCase();
    
    if (query.includes("founder") || query.includes("ceo") || query.includes("sasikumar")) {
      return "DivineCore Technologies was founded in **2024** by **Sasikumar S**, who serves as the Founder & CEO. He is a visionary leader dedicated to technical integrity, premium software design, and high-performance digital architectures.";
    }
    if (query.includes("service") || query.includes("what do you do") || query.includes("what you offer") || query.includes("capabilities") || query.includes("offerings")) {
      return "We offer a suite of high-end digital services:\n\n* **Custom Software & Web Development** (Next.js, Node.js, Python, React)\n* **Mobile App Development** (High-performance iOS & Android apps)\n* **Cloud Solutions & DevOps** (AWS, Azure pipelines)\n* **Cybersecurity & Security Auditing** (Vulnerability assessments)\n* **BPO & High-Precision Data Entry** (Digitization, QA operations)\n\nWould you like to learn more about a specific service?";
    }
    if (query.includes("team") || query.includes("members") || query.includes("who works") || query.includes("experts") || query.includes("employees") || query.includes("staff") || query.includes("people")) {
      return "Our core powerhouse consists of dedicated domain experts:\n\n* **Sasikumar S** (Founder & CEO): Driving overall tech architecture & executive vision.\n* **Vimal Raj S** (Lead Web & App Developer): Leading high-performance frontend interfaces & mobile apps.\n* **Aman Shaikh** (Senior Full Stack Web Developer): Engineering secure server APIs & database schemas.\n* **Nivetha M** (Senior Python QA Engineer): Overseeing automated testing pipelines & compliance assurance.\n\nAll our custom code and operations are protected under strict Nondisclosure Agreements (NDAs).";
    }
    if (query.includes("vimal") || query.includes("vimalraj")) {
      return "**Vimal Raj S** is our **Lead Web & App Developer**. He specializes in frontend pipelines, responsive UI, cross-platform mobile apps (React Native), and modern JS environments.";
    }
    if (query.includes("aman") || query.includes("shaikh")) {
      return "**Aman Shaikh** is our **Senior Full Stack Web Developer**. He specializes in backend systems, secure Node.js APIs, database configurations, and systems security.";
    }
    if (query.includes("nivetha")) {
      return "**Nivetha M** is our **Senior Python QA Engineer**. She specializes in automated Python test script frameworks (Selenium, Playwright), quality validation pipelines, and compliance verification.";
    }
    if (query.includes("address") || query.includes("location") || query.includes("office") || query.includes("where") || query.includes("headquarter") || query.includes("headquarters") || query.includes("salem")) {
      return "Our corporate headquarters is located at:\n\n**No 5, 2nd Floor, Kandha Gounder Complex, Opp. Petrol Bunk, Meyyanur Main Road, Salem - 636004, Tamilnadu, India.**\n\nWe enforce strict physical security checkpoints and administrative guidelines to ensure maximum client data protection.";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("call") || query.includes("number") || query.includes("mail") || query.includes("phone number")) {
      return "You can connect with us directly:\n\n* **Email**: info@divinecoretech.in\n* **Phone**: +91 74486 09951 or +91 63690 81530\n\nWe would love to help you build or consult on your next enterprise application!";
    }
    if (query.includes("terms") || query.includes("ip") || query.includes("intellectual") || query.includes("ownership") || query.includes("payment") || query.includes("milestone") || query.includes("milestones") || query.includes("nda") || query.includes("jurisdiction") || query.includes("governing law")) {
      return "Under our service guidelines:\n\n* **IP Ownership**: All custom software IP rights, copyright titles, and clean codes are fully transferred to you **upon complete and final payment** of all project milestones and invoices.\n* **Confidentiality**: All agreements are strictly protected under mutual Nondisclosure Agreements (NDAs).\n* **Governing Law**: Subject to the exclusive jurisdiction of the courts of Salem, Tamilnadu, India.";
    }
    if (query.includes("career") || query.includes("job") || query.includes("hiring") || query.includes("join") || query.includes("work there") || query.includes("vacancy")) {
      return "We are always looking for stellar engineering, creative design, and data operations minds to join our powerhouse in Salem! You can explore open roles on our Careers page or email your resume to **info@divinecoretech.in**.";
    }
    if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("greetings") || query.includes("good morning") || query.includes("good afternoon")) {
      return "Hello! Welcome to DivineCore Technologies. I am **CoreAI**, your virtual assistant. How can I help you today?";
    }
    
    return "I'm sorry, I didn't quite catch that. I am programmed to assist you with inquiries regarding DivineCore Technologies. You can ask about our **Founder (Sasikumar)**, **Services**, **Team**, **Location**, **Contact Details**, or **Terms & IP Rights**.";
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Send API request to server route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
      });

      let botReply = "";

      if (res.ok) {
        const data = await res.json();
        if (data.fallback) {
          // If fallback is triggered, run local keywords matching
          botReply = getLocalResponse(textToSend);
        } else {
          botReply = data.reply;
        }
      } else {
        botReply = getLocalResponse(textToSend);
      }

      // Simulate a small delay for premium typing experience
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "bot",
            text: botReply,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 700);

    } catch (err) {
      console.error("Chat error, using fallback matching.", err);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "bot",
            text: getLocalResponse(textToSend),
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 700);
    }
  };

  // Helper function to format markdown strings inside messages
  const formatMessageText = (text: string) => {
    // Bold parsing (**text**)
    let parts: React.ReactNode[] = [];
    let currentText = text;
    
    // Split by lines to parse lists and paragraphs
    const lines = currentText.split("\n");
    
    return lines.map((line, lineIdx) => {
      // Check if bullet point
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const rawContent = isBullet ? line.trim().substring(2) : line;

      // Parse bold markers inside the line
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;
      const elements: React.ReactNode[] = [];

      while ((match = boldRegex.exec(rawContent)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          elements.push(rawContent.substring(lastIndex, match.index));
        }
        // Add bolded text
        elements.push(
          <strong key={match.index} className="font-extrabold text-white">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < rawContent.length) {
        elements.push(rawContent.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc pl-1 mb-1.5 leading-relaxed text-xs">
            {elements}
          </li>
        );
      } else {
        return (
          <p key={lineIdx} className={`leading-relaxed text-xs ${lineIdx > 0 ? "mt-2" : ""}`}>
            {elements}
          </p>
        );
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans antialiased text-white">
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        id="chat-ai-trigger"
        className="w-16 h-16 rounded-full bg-black border border-gold-primary/30 flex items-center justify-center cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-gold-primary transition-all duration-500 hover:scale-105 active:scale-95 group relative overflow-hidden"
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow pulsing ring around the button */}
        <div className="absolute -inset-1.5 rounded-full border border-gold-primary/20 animate-pulse pointer-events-none" />

        {isOpen ? (
          <svg
            className="w-6 h-6 text-gold-muted transition-transform duration-500 rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-7 h-7 text-gold-muted group-hover:scale-110 transition-transform duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}

        {/* Unread Alert Badge */}
        {unread && !isOpen && (
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-primary border-2 border-black"></span>
          </span>
        )}
      </button>

      {/* Chat Window Panel */}
      <div
        className={`fixed bottom-26 right-6 w-[350px] sm:w-[380px] h-[500px] rounded-[2.5rem] bg-[#0c0c0c]/95 border border-white/10 backdrop-blur-xl shadow-[0_24px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        }`}
      >
        {/* Header Block */}
        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-black via-[#080808] to-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center bg-black/50 shadow-inner group">
              <span className="text-lg animate-pulse">🤖</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black tracking-tight text-white">CoreAI Assistant</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Active & Ready</span>
              </div>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="w-8 h-8 rounded-full border border-white/5 hover:border-white/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            <svg
              className="w-4 h-4 text-white/50 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Message Feed */}
        <div
          ref={feedRef}
          className="flex-grow overflow-y-auto p-5 space-y-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[82%] animate-fade-in ${
                msg.sender === "user" ? "ml-auto text-right items-end" : "mr-auto text-left items-start"
              }`}
            >
              <div
                className={`p-3.5 rounded-[1.5rem] shadow-md border ${
                  msg.sender === "user"
                    ? "bg-white text-black border-black/5 rounded-tr-sm"
                    : "bg-[#181818]/80 text-white/80 border-white/5 rounded-tl-sm"
                }`}
              >
                {formatMessageText(msg.text)}
              </div>
              <span className="text-[8px] font-bold text-white/20 uppercase mt-1 tracking-wider px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex flex-col items-start max-w-[82%] mr-auto animate-pulse">
              <div className="p-4 rounded-[1.5rem] rounded-tl-sm bg-[#181818]/80 border border-white/5 flex gap-1.5 items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-bounce delay-300" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Prompts Section */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 pt-1 flex flex-wrap gap-2 text-left shrink-0">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                className="text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/50 hover:bg-gold-primary/5 transition-all text-white/70 hover:text-white cursor-pointer active:scale-95 shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-4 border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505] flex gap-3 items-center shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-gold-primary transition-colors font-medium shadow-inner"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-2xl bg-gold-primary/90 hover:bg-gold-primary active:scale-95 flex items-center justify-center shadow-lg cursor-pointer hover:shadow-gold-primary/20 transition-all text-black border border-gold-primary/30 font-black shrink-0"
            disabled={!input.trim()}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </form>
        
        {/* Tiny Footer Tag */}
        <div className="pb-2 bg-[#050505] text-[7px] font-black tracking-[0.2em] text-white/10 uppercase shrink-0">
          CoreAI • DivineCore Technologies
        </div>
      </div>
    </div>
  );
}
