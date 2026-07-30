"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
    id: string;
    label: string;
    placeholder: string;
}

export default function PasswordInput({
    id,
    label,
    placeholder,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2 text-left">
            <label
                htmlFor={id}
                className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2"
            >
                {label}
            </label>

            <div className="relative group">
                {/* Left Lock Icon */}
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 transition-colors duration-200 group-focus-within:text-[#0EA5E9] pointer-events-none" />

                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="
                        w-full
                        h-14
                        rounded-xl
                        border
                        border-white/12
                        bg-[#09090B]/90
                        pl-12
                        pr-12
                        text-sm
                        text-white
                        placeholder:text-zinc-500
                        font-normal
                        outline-none
                        transition-all
                        duration-200
                        hover:border-white/20
                        focus:border-[#0EA5E9]
                        focus:ring-4
                        focus:ring-[#0EA5E9]/15
                        focus:bg-[#09090B]
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]
                    "
                />

                {/* Right Password Visibility Toggle */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-zinc-400
                        hover:text-white
                        transition-colors
                        duration-200
                        p-1.5
                        rounded-lg
                        focus:outline-none
                        cursor-pointer
                    "
                >
                    {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                        <Eye className="h-4.5 w-4.5" />
                    )}
                </button>
            </div>
        </div>
    );
}