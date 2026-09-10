"use client";

import { Search, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search study resources, notes, subjects, PYQs...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-[720px] mx-auto group">
      <div className="relative flex items-center w-full">
        <span className="absolute left-6 text-[#666666] group-focus-within:text-[#B15F2C] transition-colors duration-300 pointer-events-none">
          <Search className="h-5 w-5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-15 bg-white border border-[#E2E0DB] text-[#0A0A0A] placeholder:text-[#666666]/60 pl-15 pr-24 rounded-full focus:outline-none focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 transition-all duration-300 shadow-sm hover:shadow-md text-base font-normal"
        />

        <div className="absolute right-5 flex items-center gap-2">
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 text-[#666666] hover:text-[#0A0A0A] rounded-full hover:bg-[#F1F0EE] transition-colors duration-200 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E2E0DB] bg-[#F1F0EE] text-[11px] font-mono font-semibold text-[#0A0A0A]/70">
              <Sparkles className="h-3 w-3 text-[#B15F2C]" /> Quick Search
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

