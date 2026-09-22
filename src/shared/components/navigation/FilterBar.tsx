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
  const pillBase = "rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer border whitespace-nowrap";
  const pillActive = "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-sm";
  const pillInactive = "bg-[#111525] text-slate-400 border-white/[0.07] hover:bg-[#161B2E] hover:text-white";

  return (
    <div className="glass-light rounded-2xl p-5 space-y-5 border border-white/[0.07] sticky top-20">
      {/* Semester */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 label-mono text-indigo-400">
          <Layers className="h-3 w-3" />
          Semester
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSemesterChange(null)}
            className={`${pillBase} ${selectedSemester === null ? pillActive : pillInactive}`}
          >
            All
          </button>
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => onSemesterChange(sem)}
              className={`${pillBase} ${selectedSemester === sem ? pillActive : pillInactive}`}
            >
              S{sem}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5 label-mono text-indigo-400">
          <FileText className="h-3 w-3" />
          Format
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onTypeChange(null)}
            className={`${pillBase} ${selectedType === null ? pillActive : pillInactive}`}
          >
            All
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`${pillBase} ${selectedType === type ? pillActive : pillInactive}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
