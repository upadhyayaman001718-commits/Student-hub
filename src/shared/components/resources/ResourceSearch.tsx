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
    <div className="relative w-full max-w-[760px] mx-auto group text-left">
      <div className="relative flex items-center w-full">
        <span className="absolute left-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none">
          <Search className="h-5 w-5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 bg-[#0F121E]/90 backdrop-blur-xl border border-white/10 text-white placeholder:text-slate-400/70 pl-14 pr-24 rounded-full focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 shadow-xl text-sm sm:text-base font-medium"
        />

        <div className="absolute right-4 flex items-center gap-2">
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-[#161A29] text-[11px] font-mono font-semibold text-slate-300">
              <Sparkles className="h-3 w-3 text-indigo-400" /> Instant Search
            </span>
          )}
        </div>
      </div>
      {typeof totalResults === "number" && value.trim() !== "" && (
        <div className="mt-2 text-xs font-mono text-slate-400 pl-5">
          Found <span className="font-bold text-white">{totalResults}</span> {totalResults === 1 ? "result" : "results"} for &quot;<span className="text-indigo-400 font-semibold">{value}</span>&quot;
        </div>
      )}
    </div>
  );
}

