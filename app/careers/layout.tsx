import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | DivineCore Technologies",
  description: "Apply for Full-Time and Internship opportunities at DivineCore Technologies. Join our growing team in Salem and build your career in AI and Quality Operations.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
