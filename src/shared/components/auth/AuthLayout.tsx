import { ReactNode } from "react";
import AuthVideo from "./AuthVideo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#07080D] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] max-h-[920px] w-full max-w-[1360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0F121E]/80 backdrop-blur-xl shadow-2xl">
        {/* Left Panel: Video / Visual Hero (Desktop 45%) */}
        <div className="hidden w-[45%] lg:block relative border-r border-white/10">
          <AuthVideo />
        </div>

        {/* Right Panel: Form Box (Full width mobile/tablet, 55% desktop) */}
        <div className="flex w-full items-center justify-center bg-[#07080D]/40 p-6 sm:p-10 lg:w-[55%] relative overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}