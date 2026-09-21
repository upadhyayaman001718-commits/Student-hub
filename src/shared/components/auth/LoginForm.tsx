"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import Divider from "./Divider";
import SocialLoginButton from "./SocialLoginButton";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/shared/context/AuthContext";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isJustRegistered = searchParams.get("registered") === "true";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      if (response.success && response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {isJustRegistered && !error && (
        <div className="flex items-center gap-2.5 p-3.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in fade-in backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Account created successfully! Please sign in with your password.</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2.5 p-3.5 text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in fade-in backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="email"
          className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300 mb-2"
        >
          Email Address
        </label>

        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 transition-colors duration-200 group-focus-within:text-indigo-400 pointer-events-none" />

          <input
            id="email"
            type="email"
            placeholder="name@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="w-full h-13 rounded-full border border-white/10 bg-[#161A29] pl-12 pr-5 text-sm text-slate-100 placeholder:text-slate-500 font-medium outline-none transition-all duration-300 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-60"
          />
        </div>
      </div>

      {/* Password Field */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
        <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/10 bg-[#161A29] text-indigo-500 accent-indigo-600 focus:ring-0 cursor-pointer"
          />
          <span className="font-semibold text-slate-300 text-xs">Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="font-bold text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
        >
          Forgot password?
        </Link>
      </div>

      {/* Primary Sign In Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-13 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 text-white font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all duration-300 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {/* Divider */}
      <Divider text="OR" />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <SocialLoginButton provider="Google" />
        <SocialLoginButton provider="GitHub" />
      </div>

      {/* Sign Up Footer Link */}
      <p className="pt-3 text-center text-xs sm:text-sm text-slate-400 font-medium">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-extrabold text-indigo-400 hover:text-indigo-300 hover:underline transition-all"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="text-center py-6 text-xs text-[#666666]">Loading login form...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}