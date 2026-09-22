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
    <div className="w-full space-y-1.5">
      <label className="block label-mono text-slate-400">
        {label}
        {props.required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      <input
        className={`w-full h-11 bg-[#111525] text-white placeholder:text-slate-500
                    border border-white/[0.08] rounded-full px-4 text-xs font-medium
                    transition-all duration-150 outline-none
                    focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15
                    disabled:opacity-40 disabled:cursor-not-allowed
                    ${error ? "border-rose-500/50" : ""}
                    ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1">{error}</p>
      )}
    </div>
  );
}
