import { ReactNode } from "react";
import AuthVideo from "./AuthVideo";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-[#09090B] flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#0EA5E9]/30 selection:text-white">
            {/* Background ambient glows */}
            <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#0EA5E9]/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 flex min-h-[calc(100vh-3rem)] max-h-[920px] w-full max-w-[1360px] overflow-hidden rounded-[28px] border border-white/10 bg-[#121215]/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                {/* Left Panel: Video (Desktop 45%) */}
                <div className="hidden w-[45%] lg:block relative border-r border-white/10">
                    <AuthVideo />
                </div>

                {/* Right Panel: Form (Full width mobile/tablet, 55% desktop) */}
                <div className="flex w-full items-center justify-center bg-[#09090B]/60 p-6 sm:p-10 lg:w-[55%] relative overflow-y-auto">
                    {children}
                </div>
            </div>
        </main>
    );
}