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
  placeholder = "Search notes, PYQs, subjects, lab manuals…",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* Glow halo on focus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100
                   bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10
                   blur-xl transition-opacity duration-300 pointer-events-none scale-110"
      />

      <div className="relative flex items-center w-full">
        {/* Search icon */}
        <span
          className="absolute left-5 pointer-events-none
                     text-slate-500 group-focus-within:text-indigo-400
                     transition-colors duration-200"
        >
          <Search className="h-4.5 w-4.5" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search resources"
          className="w-full h-13 glass text-white placeholder:text-slate-500
                     pl-12 pr-28 rounded-full
                     focus:outline-none focus:border-indigo-500/40
                     focus:ring-2 focus:ring-indigo-500/20
                     transition-all duration-200
                     text-sm font-medium tracking-tight"
        />

        {/* Right side: clear or kbd hint */}
        <div className="absolute right-4 flex items-center gap-2">
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1 rounded-full text-slate-500 hover:text-white
                         hover:bg-white/8 transition-colors duration-150 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span
              className="hidden sm:inline-flex items-center gap-1.5
                         px-2.5 py-1 rounded-md
                         bg-[#111525] border border-white/8
                         label-mono text-slate-500"
            >
              <Sparkles className="h-2.5 w-2.5 text-indigo-400/70" />
              ⌘K
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
