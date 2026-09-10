import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/shared/context/AuthContext";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Hub — Academic Resource Platform",
  description:
    "Centralized academic resource platform for Notes, PYQs, Lab Manuals, and Study Resources — organized by program and community-driven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", onest.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col bg-[#F1F0EE] text-[#0A0A0A] font-sans selection:bg-[#B15F2C]/20 selection:text-[#B15F2C]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

