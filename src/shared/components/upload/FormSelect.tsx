"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
}

export default function FormSelect({
  label,
  error,
  placeholder,
  options,
  children,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div className="w-full space-y-1.5">
      <label className="block label-mono text-slate-400">
        {label}
        {props.required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full h-11 appearance-none bg-[#111525] text-white
                      border border-white/[0.08] rounded-full pl-4 pr-10 text-xs font-medium
                      transition-all duration-150 outline-none cursor-pointer
                      focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${error ? "border-rose-500/50" : ""}
                      ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-[#0C0F1C] text-slate-400">{placeholder}</option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0C0F1C]">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5
                                 text-indigo-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-xs text-rose-400">{error}</p>
      )}
    </div>
  );
}
