"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2 text-left">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
      >
        {label}
      </label>

      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors duration-200 group-focus-within:text-[#0A2A66] pointer-events-none" />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full h-13 rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-400 font-medium outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#0A2A66]/50 focus:ring-4 focus:ring-[#0A2A66]/10 shadow-2xs"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors duration-200 p-1.5 rounded-lg focus:outline-none cursor-pointer"
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