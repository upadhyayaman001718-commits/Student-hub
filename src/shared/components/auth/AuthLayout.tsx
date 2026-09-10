import { ReactNode } from "react";
import AuthVideo from "./AuthVideo";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F1F0EE] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-[#B15F2C]/20 selection:text-[#B15F2C]">
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] max-h-[920px] w-full max-w-[1360px] overflow-hidden rounded-[32px] border border-[#E2E0DB] bg-white shadow-2xl">
        {/* Left Panel: Video / Visual Hero (Desktop 45%) */}
        <div className="hidden w-[45%] lg:block relative border-r border-[#E2E0DB]">
          <AuthVideo />
        </div>

        {/* Right Panel: Form Box (Full width mobile/tablet, 55% desktop) */}
        <div className="flex w-full items-center justify-center bg-[#F1F0EE]/40 p-6 sm:p-10 lg:w-[55%] relative overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}