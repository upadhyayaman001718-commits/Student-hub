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
      <label className="block text-sm font-semibold text-zinc-300 transition-colors duration-200">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none bg-[#18181B]/80 text-white placeholder-zinc-500 border border-white/8 rounded-2xl pl-5 pr-12 py-4 text-base transition-all duration-300 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
            error ? "border-red-500/80 focus:ring-red-500/10 focus:border-red-500" : ""
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="" className="bg-[#18181B] text-zinc-400">{placeholder}</option>}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#18181B] text-white">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-zinc-400">
          <ChevronDown className="h-5 w-5" />
        </span>
      </div>
      {error && (
        <p className="text-sm font-medium text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
