import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/AIChatWidget";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DivineCore Technologies | Innovating Today. Transforming Tomorrow.",
  description: "A high-end tech company specializing in Software Development, Cloud Solutions, Cybersecurity, and IT Consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-deep-black text-white font-sans selection:bg-gold-primary selection:text-deep-black">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}
