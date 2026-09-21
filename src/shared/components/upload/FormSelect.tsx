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
    <div className="w-full space-y-2">
      <label className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300">
        {label}
        {props.required && <span className="text-indigo-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none bg-[#161A29] text-slate-100 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
            error ? "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500" : ""
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="" className="bg-[#0F121E] text-slate-400">{placeholder}</option>}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0F121E] text-slate-100">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-slate-400">
          <ChevronDown className="h-4 w-4 text-indigo-400" />
        </span>
      </div>
      {error && (
        <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">{error}</p>
      )}
    </div>
  );
}

