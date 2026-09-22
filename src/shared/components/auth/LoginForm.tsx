"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isJustRegistered && !error && (
        <div className="flex items-center gap-2 p-3 text-xs text-emerald-300
                        bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>Account created! Please sign in with your password.</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-300
                        bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="email" className="block label-mono text-slate-400">
          Email Address
        </label>
        <div className="relative group">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4
                           text-slate-500 group-focus-within:text-indigo-400
                           transition-colors duration-150 pointer-events-none" />
          <input
            id="email"
            type="email"
            placeholder="name@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="w-full h-11 rounded-full border border-white/[0.08]
                       bg-[#111525] pl-10 pr-4 text-xs font-medium text-white
                       placeholder:text-slate-500 outline-none
                       focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15
                       transition-all duration-150 disabled:opacity-60"
          />
        </div>
      </div>

      {/* Password */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-white/10 bg-[#111525]
                       accent-indigo-600 focus:ring-0 cursor-pointer"
          />
          <span className="text-slate-300 text-xs">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="font-semibold text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Primary submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 rounded-full
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:from-indigo-500 hover:to-purple-500
                   text-white font-bold text-xs uppercase tracking-wider
                   shadow-md shadow-indigo-500/20 border border-indigo-400/20
                   transition-all duration-200 cursor-pointer disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      {/* Divider */}
      <Divider text="OR" />

      {/* Social login */}
      <div className="space-y-2">
        <SocialLoginButton provider="Google" />
        <SocialLoginButton provider="GitHub" />
      </div>

      {/* Footer link */}
      <p className="pt-2 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-indigo-400 hover:text-indigo-300">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="text-center py-4 text-xs text-slate-500">Loading form…</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
