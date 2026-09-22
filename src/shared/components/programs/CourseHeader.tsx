"use client";

import Link from "next/link";
import { ArrowLeft, Files, GraduationCap, BookOpen, Sparkles } from "lucide-react";
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
  const defaultDescription = `Browse verified notes, PYQs, and lab manuals for ${courseName}.`;

  return (
    <div className="glass-light rounded-2xl p-6 sm:p-8 border border-white/[0.07] mb-8">
      {/* Back */}
      <Link
        href="/programs"
        className="inline-flex items-center gap-1.5 label-mono text-slate-500
                   hover:text-indigo-400 transition-colors duration-150 mb-5 group"
      >
        <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
        Back to Programmes
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="space-y-3 max-w-xl">
          <Badge className="label-mono bg-indigo-500/8 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 shadow-none">
            <Sparkles className="h-2.5 w-2.5 mr-1.5 inline" />
            {programName}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
            {courseName}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {description || defaultDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 glass rounded-2xl p-4
                        min-w-[260px] border border-white/[0.06]">
          {[
            { icon: Files,         value: resourceCount, label: "Resources", color: "text-indigo-400" },
            { icon: GraduationCap, value: semesterCount,  label: "Semesters", color: "text-purple-400" },
            { icon: BookOpen,      value: 3,              label: "Formats",   color: "text-sky-400"    },
          ].map(({ icon: Icon, value, label, color }, i) => (
            <div key={label} className={`flex flex-col items-center text-center
                                         ${i === 1 ? "border-x border-white/[0.06] px-2" : ""}`}>
              <Icon className={`h-4 w-4 ${color} mb-1.5`} />
              <span className="text-xl font-extrabold text-white tracking-tight">{value}</span>
              <span className="label-mono text-slate-600 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
