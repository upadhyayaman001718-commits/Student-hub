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
    <div className="w-full space-y-6 bg-white border border-[#E2E0DB] p-6 rounded-[28px] shadow-2xs">
      {/* Semester Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#666666]">
          <Layers className="h-3.5 w-3.5 text-[#B15F2C]" />
          Semester Filter
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSemesterChange(null)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              selectedSemester === null
                ? "bg-[#0A0A0A] text-white shadow-2xs"
                : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:border-[#D4D1C9] hover:text-[#0A0A0A] hover:bg-[#EBE9E4]"
            }`}
          >
            All Semesters
          </button>
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => onSemesterChange(sem)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedSemester === sem
                  ? "bg-[#0A0A0A] text-white shadow-2xs"
                  : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:border-[#D4D1C9] hover:text-[#0A0A0A] hover:bg-[#EBE9E4]"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-3 pt-5 border-t border-[#E2E0DB]">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#666666]">
          <FileText className="h-3.5 w-3.5 text-[#B15F2C]" />
          Resource Format
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              selectedType === null
                ? "bg-[#B15F2C] text-white shadow-2xs"
                : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:border-[#D4D1C9] hover:text-[#0A0A0A] hover:bg-[#EBE9E4]"
            }`}
          >
            All Formats
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedType === type
                  ? "bg-[#B15F2C] text-white shadow-2xs"
                  : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:border-[#D4D1C9] hover:text-[#0A0A0A] hover:bg-[#EBE9E4]"
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

