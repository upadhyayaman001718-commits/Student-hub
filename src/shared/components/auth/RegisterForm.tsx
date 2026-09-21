"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import Divider from "./Divider";
import SocialLoginButton from "./SocialLoginButton";
import { registerUser, loginUser } from "@/lib/api";
import { useAuth } from "@/shared/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || name.trim().length < 2) {
      setError("Full name must be at least 2 characters long.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const regResponse = await registerUser(name.trim(), email.trim(), password);

      if (regResponse.success) {
        // Auto log in the newly registered user
        try {
          const loginResponse = await loginUser(email.trim(), password);
          if (loginResponse.success && loginResponse.data?.token && loginResponse.data?.user) {
            login(loginResponse.data.token, loginResponse.data.user);
            router.push("/dashboard");
            return;
          }
        } catch (loginErr) {
          console.warn("Auto-login post registration failed, redirecting to login page:", loginErr);
        }

        // Fallback to login route if auto-login token fetch fails
        router.push("/login?registered=true");
      } else {
        throw new Error(regResponse.message || "Registration failed. Please try again.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during registration. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Boolean(name.trim().length >= 2 && email.trim() && password.length >= 6);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="flex items-center gap-2.5 p-3.5 text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in fade-in backdrop-blur-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Full Name Field */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="name"
          className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300 mb-2"
        >
          Full Name
        </label>

        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 transition-colors duration-200 group-focus-within:text-indigo-400 pointer-events-none" />

          <input
            id="name"
            type="text"
            placeholder="Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
            className="w-full h-13 rounded-full border border-white/10 bg-[#161A29] pl-12 pr-5 text-sm text-slate-100 placeholder:text-slate-500 font-medium outline-none transition-all duration-300 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-60"
          />
        </div>
      </div>

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
        placeholder="Create a password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      {/* Primary Create Account Button */}
      <Button
        type="submit"
        disabled={loading || !isFormValid}
        className="w-full h-13 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 text-white font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all duration-300 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Divider */}
      <Divider text="OR" />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <SocialLoginButton provider="Google" />
        <SocialLoginButton provider="GitHub" />
      </div>

      {/* Login Footer Link */}
      <p className="pt-3 text-center text-xs sm:text-sm text-slate-400 font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-extrabold text-indigo-400 hover:text-indigo-300 hover:underline transition-all"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
