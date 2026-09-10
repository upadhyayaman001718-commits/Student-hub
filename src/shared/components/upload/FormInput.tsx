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
      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] transition-colors duration-200">
        {label}
        {props.required && <span className="text-[#B15F2C] ml-1">*</span>}
      </label>
      <input
        className={`w-full bg-white text-[#0A0A0A] placeholder:text-[#666666]/60 border border-[#E2E0DB] rounded-full px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-semibold text-rose-500 mt-1">{error}</p>
      )}
    </div>
  );
}

