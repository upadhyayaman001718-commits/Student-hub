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
      <label className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300">
        {label}
        {props.required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      <input
        className={`w-full bg-[#161A29] text-slate-100 placeholder:text-slate-500 border border-white/10 rounded-full px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed ${
          error ? "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">{error}</p>
      )}
    </div>
  );
}

