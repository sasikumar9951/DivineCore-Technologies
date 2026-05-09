"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What services does DivineCore Technologies offer?",
      answer: "We offer a wide range of IT services including Custom Software Development, Cloud Infrastructure management, Web & Mobile App development, Cybersecurity, and Strategic Technology Consulting."
    },
    {
      question: "Where is DivineCore Technologies located?",
      answer: "Our primary office is located in Salem, Tamilnadu, India. However, we serve clients globally and offer flexible engagement models including remote collaboration."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Project timelines vary depending on the complexity and scope. A standard web application typically takes 4-8 weeks, while complex enterprise systems may take several months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide support after project completion?",
      answer: "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your systems remain secure, updated, and optimized for performance."
    },
    {
      question: "How can I get a quote for my project?",
      answer: "You can reach out to us via our Contact page or email us at info@divinecoretech.in. Our team will schedule a discovery call to understand your requirements and provide a detailed proposal."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`border rounded-2xl transition-all overflow-hidden ${
            activeIndex === index 
              ? "border-gold-primary/50 bg-gold-primary/5 shadow-lg" 
              : "border-black/5 bg-white hover:border-gold-primary/30"
          }`}
        >
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
          >
            <span className={`text-lg font-black transition-colors ${activeIndex === index ? "text-gold-muted" : "text-deep-black"}`}>
              {faq.question}
            </span>
            <span className={`text-2xl transition-transform duration-300 ${activeIndex === index ? "rotate-45 text-gold-muted" : "text-black/20"}`}>
              +
            </span>
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 pt-0 text-black/60 leading-relaxed border-t border-black/5 mt-0">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
