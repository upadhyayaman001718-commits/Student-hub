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
  const pillBase = "rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer border";
  const pillActive = "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-sm shadow-indigo-500/20";
  const pillInactive = "bg-[#111525] text-slate-400 border-white/[0.07] hover:bg-[#161B2E] hover:text-white";

  return (
    <div className="glass-light rounded-2xl p-5 space-y-5 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-indigo-400" />
          <span className="label-mono text-white">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center h-4 w-4 rounded-full
                             bg-indigo-600 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400
                       hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Program */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 label-mono text-slate-500">
          <GraduationCap className="h-3 w-3 text-indigo-400" />
          Programme
        </label>
        <select
          value={selectedProgram || ""}
          onChange={(e) => onProgramChange(e.target.value || null)}
          className="w-full h-9 px-3 bg-[#111525] border border-white/[0.07] rounded-xl
                     text-xs font-medium text-white
                     focus:outline-none focus:border-indigo-500/40
                     focus:ring-1 focus:ring-indigo-500/20
                     transition-all cursor-pointer"
        >
          <option value="" className="bg-[#0C0F1C]">All Programmes</option>
          {availablePrograms.map((p) => (
            <option key={p} value={p} className="bg-[#0C0F1C]">{p}</option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 label-mono text-slate-500">
          <BookOpen className="h-3 w-3 text-indigo-400" />
          Subject
        </label>
        <select
          value={selectedSubject || ""}
          onChange={(e) => onSubjectChange(e.target.value || null)}
          className="w-full h-9 px-3 bg-[#111525] border border-white/[0.07] rounded-xl
                     text-xs font-medium text-white
                     focus:outline-none focus:border-indigo-500/40
                     focus:ring-1 focus:ring-indigo-500/20
                     transition-all cursor-pointer"
        >
          <option value="" className="bg-[#0C0F1C]">All Subjects</option>
          {availableSubjects.map((s) => (
            <option key={s} value={s} className="bg-[#0C0F1C]">{s}</option>
          ))}
        </select>
      </div>

      {/* Semester pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 label-mono text-slate-500">
            <Layers className="h-3 w-3 text-indigo-400" />
            Semester
          </label>
          {selectedSemester !== null && (
            <button
              onClick={() => onSemesterChange(null)}
              className="text-[10px] font-semibold text-slate-500 hover:text-white
                         transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
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

      {/* Type pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 label-mono text-slate-500">
            <FileText className="h-3 w-3 text-indigo-400" />
            Type
          </label>
          {selectedType !== null && (
            <button
              onClick={() => onTypeChange(null)}
              className="text-[10px] font-semibold text-slate-500 hover:text-white
                         transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
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
