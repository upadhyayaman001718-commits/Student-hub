"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Files, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="border border-[#E2E0DB] bg-white pb-12 pt-8 rounded-[32px] p-6 sm:p-10 shadow-2xs mb-10">
      {/* Back Button */}
      <Link
        href="/programs"
        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#666666] hover:text-[#B15F2C] transition-all duration-200 hover:-translate-x-1 mb-6 cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#B15F2C]" />
        Back to Programs
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Title and Description */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em]">
              <Sparkles className="h-3 w-3 mr-1 text-white" />
              {programName}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight capitalize">
            {courseName}
          </h1>

          <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-2xl font-normal">
            {description || defaultDescription}
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-3 gap-4 bg-[#F1F0EE] border border-[#E2E0DB] p-6 rounded-[24px] min-w-[280px] lg:min-w-[340px]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E2E0DB] text-[#B15F2C] mb-2 shadow-2xs">
              <Files className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">{resourceCount}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666666] mt-1">Resources</span>
          </div>

          <div className="flex flex-col items-center text-center border-x border-[#E2E0DB] px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E2E0DB] text-[#0A0A0A] mb-2 shadow-2xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">{semesterCount}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666666] mt-1">Semesters</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E2E0DB] text-[#B15F2C] mb-2 shadow-2xs">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold text-[#0A0A0A] tracking-tight">3</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#666666] mt-1">Formats</span>
          </div>
        </div>
      </div>
    </div>
  );
}

