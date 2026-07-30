"use client";

import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
    return (
        <div
            className="
                relative
                overflow-hidden
                w-full
                max-w-[520px]
                rounded-3xl
                border
                border-white/12
                bg-[#18181B]/80
                p-10
                sm:p-12
                shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_60px_rgba(14,165,233,0.08)]
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:border-white/20
                before:absolute
                before:inset-x-0
                before:top-0
                before:h-px
                before:bg-gradient-to-r
                before:from-transparent
                before:via-white/25
                before:to-transparent
            "
        >
            {children}
        </div>
    );
}