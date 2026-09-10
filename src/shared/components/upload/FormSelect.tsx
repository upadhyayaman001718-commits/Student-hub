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
      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] transition-colors duration-200">
        {label}
        {props.required && <span className="text-[#B15F2C] ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none bg-white text-[#0A0A0A] placeholder:text-[#666666]/60 border border-[#E2E0DB] rounded-full pl-5 pr-12 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
            error ? "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500" : ""
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="" className="bg-white text-[#666666]">{placeholder}</option>}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-[#0A0A0A]">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-[#666666]">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
      {error && (
        <p className="text-xs font-semibold text-rose-500 mt-1">{error}</p>
      )}
    </div>
  );
}

