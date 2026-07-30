"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import Divider from "./Divider";
import SocialLoginButton from "./SocialLoginButton";

export default function LoginForm() {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-2 text-left">
                <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2"
                >
                    Email
                </label>

                <div className="relative group">
                    {/* Left Mail Icon */}
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 transition-colors duration-200 group-focus-within:text-[#0EA5E9] pointer-events-none" />

                    <input
                        id="email"
                        type="email"
                        placeholder="name@college.edu"
                        className="
                            w-full
                            h-14
                            rounded-xl
                            border
                            border-white/12
                            bg-[#09090B]/90
                            pl-12
                            pr-4
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
                </div>
            </div>

            {/* Password Field */}
            <PasswordInput
                id="password"
                label="Password"
                placeholder="Enter your password"
            />

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                <label className="flex items-center gap-2.5 text-zinc-400 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/12 bg-zinc-900 text-[#0EA5E9] accent-[#0EA5E9] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Remember me</span>
                </label>

                <Link
                    href="/forgot-password"
                    className="font-semibold text-[#0EA5E9] hover:text-[#38BDF8] transition-colors duration-200 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Primary Gradient Sign In Button */}
            <Button
                type="submit"
                className="
                    w-full
                    h-14
                    rounded-xl
                    bg-gradient-to-r
                    from-[#0EA5E9]
                    via-[#0284C7]
                    to-[#0369A1]
                    hover:brightness-110
                    text-white
                    font-bold
                    text-sm
                    shadow-[0_4px_20px_rgba(14,165,233,0.35)]
                    hover:shadow-[0_6px_28px_rgba(14,165,233,0.45)]
                    hover:-translate-y-0.5
                    active:translate-y-0
                    active:scale-[0.99]
                    transition-all
                    duration-200
                    cursor-pointer
                    mt-2
                "
            >
                Sign In
            </Button>

            {/* Divider */}
            <Divider text="OR" />

            {/* Social Login Buttons */}
            <div className="space-y-3.5">
                <SocialLoginButton provider="Google" />
                <SocialLoginButton provider="GitHub" />
            </div>

            {/* Sign Up Footer Link */}
            <p className="pt-3 text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-bold text-[#0EA5E9] hover:text-[#38BDF8] hover:underline transition-all"
                >
                    Sign Up
                </Link>
            </p>
        </form>
    );
}