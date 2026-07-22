"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search study resources, notes, PYQs...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-[720px] mx-auto group">
      <span className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none text-zinc-500 group-focus-within:text-[#0EA5E9] transition-colors duration-200">
        <Search className="h-5 w-5" />
      </span>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 bg-[#18181B]/80 border border-white/8 text-white placeholder-zinc-500 pl-16 pr-12 rounded-[16px] focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 transition-all duration-300 shadow-md text-base font-normal"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-6 text-zinc-500 hover:text-white focus:outline-none transition-colors duration-200 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
