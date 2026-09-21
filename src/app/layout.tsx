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
      <body className="flex min-h-full flex-col bg-[#07080D] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-300 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

