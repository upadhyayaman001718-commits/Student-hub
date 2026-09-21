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
    <div className="w-full bg-[#0F121E]/80 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-[28px] shadow-xl space-y-6 text-left">
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-[0.15em] text-white">
          <Filter className="h-4 w-4 text-indigo-400" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center h-5 px-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
        {/* Program Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.12em] text-slate-400">
            <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
            Program
          </label>
          <select
            value={selectedProgram || ""}
            onChange={(e) => onProgramChange(e.target.value ? e.target.value : null)}
            className="w-full h-10 px-3 py-2 bg-[#161A29] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="" className="bg-[#0F121E]">All Programs</option>
            {availablePrograms.map((prog) => (
              <option key={prog} value={prog} className="bg-[#0F121E]">
                {prog}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.12em] text-slate-400">
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            Subject
          </label>
          <select
            value={selectedSubject || ""}
            onChange={(e) => onSubjectChange(e.target.value ? e.target.value : null)}
            className="w-full h-10 px-3 py-2 bg-[#161A29] border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="" className="bg-[#0F121E]">All Subjects</option>
            {availableSubjects.map((subj) => (
              <option key={subj} value={subj} className="bg-[#0F121E]">
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.12em] text-slate-400">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              Semester
            </span>
            {selectedSemester !== null && (
              <button
                onClick={() => onSemesterChange(null)}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-[#161A29] text-slate-300 border border-white/10 hover:bg-[#1E2235] hover:text-white"
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
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-[#161A29] text-slate-300 border border-white/10 hover:bg-[#1E2235] hover:text-white"
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
            <span className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.12em] text-slate-400">
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
              Resource Type
            </span>
            {selectedType !== null && (
              <button
                onClick={() => onTypeChange(null)}
                className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-[#161A29] text-slate-300 border border-white/10 hover:bg-[#1E2235] hover:text-white"
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
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-[#161A29] text-slate-300 border border-white/10 hover:bg-[#1E2235] hover:text-white"
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

