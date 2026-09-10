"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import Divider from "./Divider";
import SocialLoginButton from "./SocialLoginButton";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/shared/context/AuthContext";

export default function LoginForm() {
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
      console.log("Login response:", response);
      if (response.success && response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user);
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
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="email"
          className="block text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] mb-2"
        >
          Email Address
        </label>

        <div className="relative group">
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#666666] transition-colors duration-200 group-focus-within:text-[#B15F2C] pointer-events-none" />

          <input
            id="email"
            type="email"
            placeholder="name@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="w-full h-13 rounded-full border border-[#E2E0DB] bg-white pl-13 pr-5 text-sm text-[#0A0A0A] placeholder:text-[#666666]/60 font-medium outline-none transition-all duration-300 hover:border-[#D4D1C9] focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 shadow-2xs disabled:opacity-60"
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
        <label className="flex items-center gap-2 text-[#666666] cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-[#E2E0DB] bg-white text-[#B15F2C] accent-[#B15F2C] focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <span className="font-semibold text-[#0A0A0A]">Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="font-bold text-[#B15F2C] hover:underline transition-colors duration-200"
        >
          Forgot password?
        </Link>
      </div>

      {/* Primary Sign In Button */}
      <Button
        type="submit"
        variant="accent"
        disabled={loading}
        className="w-full h-13 rounded-full bg-[#B15F2C] hover:bg-[#9E5324] text-white font-extrabold uppercase text-xs tracking-wider shadow-md transition-all duration-300 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
      <p className="pt-3 text-center text-sm text-[#666666] font-medium">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-extrabold text-[#B15F2C] hover:underline transition-all"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}