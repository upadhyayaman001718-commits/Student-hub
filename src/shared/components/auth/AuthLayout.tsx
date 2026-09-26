import { ReactNode } from "react";
import AuthVideo from "./AuthVideo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#080A12] text-slate-100
                     flex items-center justify-center
                     p-4 sm:p-6 lg:p-8
                     relative overflow-hidden font-sans
                     selection:bg-indigo-500/25 selection:text-indigo-200">

      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[500px] glow-mesh pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[400px] glow-mesh-purple pointer-events-none -z-10" />

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-[1100px] overflow-hidden
                      rounded-2xl border border-white/[0.07] glass shadow-2xl
                      min-h-[560px]">

        {/* Left: video panel */}
        <div className="hidden lg:block w-[42%] relative border-r border-white/[0.06] shrink-0">
          <AuthVideo />
        </div>

        {/* Right: form — perfectly centered */}
        <div className="flex flex-1 items-center justify-center
                        bg-[#080A12]/50 p-8 sm:p-12 overflow-y-auto">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
