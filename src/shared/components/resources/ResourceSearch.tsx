"use client";

import { Search, X } from "lucide-react";

interface ResourceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export default function ResourceSearch({
  value,
  onChange,
  placeholder = "Search by title, subject, course, programme, or type…",
  totalResults,
}: ResourceSearchProps) {
  return (
    <div className="relative w-full group">
      {/* Focus glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100
                   bg-gradient-to-r from-indigo-500/8 via-purple-500/8 to-cyan-500/8
                   blur-xl transition-opacity duration-300 pointer-events-none scale-105"
      />
      <div className="relative flex items-center w-full">
        <span className="absolute left-5 pointer-events-none text-slate-500
                         group-focus-within:text-indigo-400 transition-colors duration-200">
          <Search className="h-4 w-4" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search resources"
          className="w-full h-12 glass text-white placeholder:text-slate-500
                     pl-11 pr-10 rounded-full
                     focus:outline-none focus:border-indigo-500/40
                     focus:ring-2 focus:ring-indigo-500/15
                     transition-all duration-200 text-sm font-medium"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 p-1 rounded-full text-slate-500
                       hover:text-white hover:bg-white/8
                       transition-colors duration-150 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {typeof totalResults === "number" && value.trim() !== "" && (
        <p className="mt-2 text-xs label-mono text-slate-500 pl-4">
          Found{" "}
          <span className="text-white font-bold">{totalResults}</span>{" "}
          {totalResults === 1 ? "result" : "results"} for{" "}
          &ldquo;<span className="text-indigo-400">{value}</span>&rdquo;
        </p>
      )}
    </div>
  );
}
