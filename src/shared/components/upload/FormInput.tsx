"use client";

import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-semibold text-zinc-300 transition-colors duration-200">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`w-full bg-[#18181B]/80 text-white placeholder-zinc-500 border border-white/8 rounded-2xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-red-500/80 focus:ring-red-500/10 focus:border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
