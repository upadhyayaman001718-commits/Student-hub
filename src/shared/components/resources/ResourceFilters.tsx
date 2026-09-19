"use client";

import { Filter, Layers, FileText, BookOpen, GraduationCap, RotateCcw } from "lucide-react";

interface ResourceFiltersProps {
  selectedProgram: string | null;
  onProgramChange: (program: string | null) => void;
  selectedSemester: number | null;
  onSemesterChange: (semester: number | null) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedSubject: string | null;
  onSubjectChange: (subject: string | null) => void;
  availablePrograms: string[];
  availableSemesters: number[];
  availableTypes: string[];
  availableSubjects: string[];
  activeFilterCount: number;
  onResetFilters: () => void;
}

export default function ResourceFilters({
  selectedProgram,
  onProgramChange,
  selectedSemester,
  onSemesterChange,
  selectedType,
  onTypeChange,
  selectedSubject,
  onSubjectChange,
  availablePrograms = [],
  availableSemesters = [1, 2, 3, 4, 5, 6, 7, 8],
  availableTypes = ["Notes", "PYQ", "Lab Manual", "Study Material"],
  availableSubjects = [],
  activeFilterCount,
  onResetFilters,
}: ResourceFiltersProps) {
  return (
    <div className="w-full bg-white border border-[#E2E0DB] p-5 sm:p-6 rounded-[28px] shadow-2xs space-y-6">
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between border-b border-[#F1F0EE] pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#0A0A0A]">
          <Filter className="h-4 w-4 text-[#B15F2C]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center h-5 px-2 rounded-full bg-[#B15F2C] text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B15F2C] hover:text-[#9E5324] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
        {/* Program Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#666666]">
            <GraduationCap className="h-3.5 w-3.5 text-[#B15F2C]" />
            Program
          </label>
          <select
            value={selectedProgram || ""}
            onChange={(e) => onProgramChange(e.target.value ? e.target.value : null)}
            className="w-full h-10 px-3 py-2 bg-[#F1F0EE] border border-[#E2E0DB] rounded-2xl text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#B15F2C] focus:ring-2 focus:ring-[#B15F2C]/15 transition-all cursor-pointer"
          >
            <option value="">All Programs</option>
            {availablePrograms.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#666666]">
            <BookOpen className="h-3.5 w-3.5 text-[#B15F2C]" />
            Subject
          </label>
          <select
            value={selectedSubject || ""}
            onChange={(e) => onSubjectChange(e.target.value ? e.target.value : null)}
            className="w-full h-10 px-3 py-2 bg-[#F1F0EE] border border-[#E2E0DB] rounded-2xl text-xs font-bold text-[#0A0A0A] focus:outline-none focus:border-[#B15F2C] focus:ring-2 focus:ring-[#B15F2C]/15 transition-all cursor-pointer"
          >
            <option value="">All Subjects</option>
            {availableSubjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#666666]">
              <Layers className="h-3.5 w-3.5 text-[#B15F2C]" />
              Semester
            </span>
            {selectedSemester !== null && (
              <button
                onClick={() => onSemesterChange(null)}
                className="text-[10px] font-bold text-[#666666] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onSemesterChange(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedSemester === null
                  ? "bg-[#0A0A0A] text-white shadow-2xs"
                  : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:bg-[#EBE9E4] hover:text-[#0A0A0A]"
              }`}
            >
              All
            </button>
            {availableSemesters.map((sem) => (
              <button
                key={sem}
                onClick={() => onSemesterChange(sem)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedSemester === sem
                    ? "bg-[#0A0A0A] text-white shadow-2xs"
                    : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:bg-[#EBE9E4] hover:text-[#0A0A0A]"
                }`}
              >
                Sem {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Type Filter */}
        <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#666666]">
              <FileText className="h-3.5 w-3.5 text-[#B15F2C]" />
              Resource Type
            </span>
            {selectedType !== null && (
              <button
                onClick={() => onTypeChange(null)}
                className="text-[10px] font-bold text-[#666666] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onTypeChange(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedType === null
                  ? "bg-[#B15F2C] text-white shadow-2xs"
                  : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:bg-[#EBE9E4] hover:text-[#0A0A0A]"
              }`}
            >
              All Types
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedType === type
                    ? "bg-[#B15F2C] text-white shadow-2xs"
                    : "bg-[#F1F0EE] text-[#0A0A0A]/70 border border-[#E2E0DB] hover:bg-[#EBE9E4] hover:text-[#0A0A0A]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
