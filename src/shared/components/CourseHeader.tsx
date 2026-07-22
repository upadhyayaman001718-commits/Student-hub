"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Files, GraduationCap } from "lucide-react";

interface CourseHeaderProps {
  courseName: string;
  programName?: string;
  description?: string;
  resourceCount?: number;
  semesterCount?: number;
}

export default function CourseHeader({
  courseName,
  programName = "B.Tech",
  description,
  resourceCount = 0,
  semesterCount = 8,
}: CourseHeaderProps) {
  const defaultDescription = `Browse and download study resources, notes, previous year question papers (PYQs), and lab manuals for ${courseName}.`;

  return (
    <div className="border-b border-white/5 bg-gradient-to-b from-[#0EA5E9]/5 to-transparent pb-12 pt-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#0EA5E9] transition-all duration-200 hover:-translate-x-1 mb-8 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Title and Meta */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#0EA5E9]/10 px-3 py-1 text-xs font-bold text-[#0EA5E9] border border-[#0EA5E9]/20">
              {programName}
            </span>
          </div>

          <h1 className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2] capitalize">
            {courseName}
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {description || defaultDescription}
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-6 bg-[#18181B] border border-white/8 p-6 rounded-[16px] shadow-lg min-w-[280px] lg:min-w-[340px]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] mb-2">
              <Files className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">{resourceCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Resources</span>
          </div>

          <div className="flex flex-col items-center text-center border-x border-white/5 px-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">{semesterCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Semesters</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">3</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Types</span>
          </div>
        </div>
      </div>
    </div>
  );
}
