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
        <span className="absolute left-6 text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-300 pointer-events-none">
          <Search className="h-5 w-5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-15 bg-[#0F121E]/90 backdrop-blur-xl border border-white/10 text-white placeholder:text-slate-400/70 pl-15 pr-24 rounded-full focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-xl shadow-indigo-950/20 text-base font-medium"
        />

        <div className="absolute right-5 flex items-center gap-2">
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
              <Sparkles className="h-3 w-3 text-indigo-400" /> ⌘K Search
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


