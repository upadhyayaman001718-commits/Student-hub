"use client";

import { Layers, FileText } from "lucide-react";

interface FilterBarProps {
  selectedSemester: number | null;
  onSemesterChange: (semester: number | null) => void;
  selectedType: string | null;
  onTypeChange: (type: "Notes" | "PYQ" | "Lab Manual" | null) => void;
  availableSemesters?: number[];
  availableTypes?: ("Notes" | "PYQ" | "Lab Manual")[];
}

export default function FilterBar({
  selectedSemester,
  onSemesterChange,
  selectedType,
  onTypeChange,
  availableSemesters = [1, 2, 3, 4, 5, 6, 7, 8],
  availableTypes = ["Notes", "PYQ", "Lab Manual"],
}: FilterBarProps) {
  return (
    <div className="w-full space-y-6 bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
      {/* Semester Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.15em] text-indigo-400">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          Semester Filter
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSemesterChange(null)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono font-extrabold transition-all duration-200 cursor-pointer ${
              selectedSemester === null
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                : "bg-[#161A29] text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white hover:bg-[#1E2235]"
            }`}
          >
            All Semesters
          </button>
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => onSemesterChange(sem)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono font-extrabold transition-all duration-200 cursor-pointer ${
                selectedSemester === sem
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                  : "bg-[#161A29] text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white hover:bg-[#1E2235]"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-3 pt-5 border-t border-white/10">
        <div className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.15em] text-indigo-400">
          <FileText className="h-3.5 w-3.5 text-indigo-400" />
          Resource Format
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono font-extrabold transition-all duration-200 cursor-pointer ${
              selectedType === null
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                : "bg-[#161A29] text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white hover:bg-[#1E2235]"
            }`}
          >
            All Formats
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-mono font-extrabold transition-all duration-200 cursor-pointer ${
                selectedType === type
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
                  : "bg-[#161A29] text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white hover:bg-[#1E2235]"
              }`}
            >
              {type === "PYQ" ? "PYQs" : type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

