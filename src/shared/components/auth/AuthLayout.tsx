import { ReactNode } from "react";
import AuthVideo from "./AuthVideo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#080A12] text-slate-100
                     flex items-center justify-center p-4 sm:p-6 lg:p-8
                     relative overflow-hidden font-sans
                     selection:bg-indigo-500/25 selection:text-indigo-200">

      {/* Background effects */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[500px] glow-mesh pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[400px] glow-mesh-purple pointer-events-none -z-10" />

      <div className="relative z-10 flex w-full max-w-[1240px] overflow-hidden
                      rounded-2xl border border-white/[0.07] glass shadow-2xl
                      min-h-[540px] max-h-[860px]">

        {/* Left: visual panel (desktop only) */}
        <div className="hidden lg:block w-[42%] relative border-r border-white/[0.06]">
          <AuthVideo />
        </div>

        {/* Right: form */}
        <div className="flex w-full lg:w-[58%] items-center justify-center
                        bg-[#080A12]/50 p-6 sm:p-10 relative overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
