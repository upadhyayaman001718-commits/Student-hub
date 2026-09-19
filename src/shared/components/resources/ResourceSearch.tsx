"use client";

import { Search, X, Sparkles } from "lucide-react";

interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export default function ResourceSearch({
  value,
  onChange,
  placeholder = "Search by title, subject, course, program, or type...",
  totalResults,
}: ResourceSearchProps) {
  return (
    <div className="relative w-full max-w-[760px] mx-auto group">
      <div className="relative flex items-center w-full">
        <span className="absolute left-5 text-[#666666] group-focus-within:text-[#B15F2C] transition-colors duration-200 pointer-events-none">
          <Search className="h-5 w-5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 bg-white border border-[#E2E0DB] text-[#0A0A0A] placeholder:text-[#666666]/60 pl-14 pr-24 rounded-full focus:outline-none focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 transition-all duration-200 shadow-2xs hover:shadow-xs text-sm sm:text-base font-normal"
        />

        <div className="absolute right-4 flex items-center gap-2">
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
              <Sparkles className="h-3 w-3 text-[#B15F2C]" /> Instant Search
            </span>
          )}
        </div>
      </div>
      {typeof totalResults === "number" && value.trim() !== "" && (
        <div className="mt-2 text-xs font-medium text-[#666666] pl-5">
          Found <span className="font-bold text-[#0A0A0A]">{totalResults}</span> {totalResults === 1 ? "result" : "results"} for &quot;<span className="text-[#B15F2C] font-semibold">{value}</span>&quot;
        </div>
      )}
    </div>
  );
}
