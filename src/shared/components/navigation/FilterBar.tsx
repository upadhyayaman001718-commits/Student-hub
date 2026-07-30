"use client";

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
    <div className="w-full space-y-6">
      {/* Semester Filter */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Semester
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
          <button
            onClick={() => onSemesterChange(null)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none ${
              selectedSemester === null
                ? "bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/15"
                : "bg-[#18181B]/80 text-zinc-400 border border-white/5 hover:border-white/10 hover:text-white hover:bg-[#18181B]"
            }`}
          >
            All Semesters
          </button>
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              onClick={() => onSemesterChange(sem)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none ${
                selectedSemester === sem
                  ? "bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/15"
                  : "bg-[#18181B]/80 text-zinc-400 border border-white/5 hover:border-white/10 hover:text-white hover:bg-[#18181B]"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Resource Type
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
          <button
            onClick={() => onTypeChange(null)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none ${
              selectedType === null
                ? "bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/15"
                : "bg-[#18181B]/80 text-zinc-400 border border-white/5 hover:border-white/10 hover:text-white hover:bg-[#18181B]"
            }`}
          >
            All Types
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none ${
                selectedType === type
                  ? "bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/15"
                  : "bg-[#18181B]/80 text-zinc-400 border border-white/5 hover:border-white/10 hover:text-white hover:bg-[#18181B]"
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
