"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowUpRight } from "lucide-react";

interface RecentlyUploadedCardProps {
  title: string;
  sub: string; // e.g. "Notes" | "PYQ" | "Lab Manual" | "Assignment"
  program: string;
  course: string;
  sem: number;
  filetype?: string; // e.g. "CSE" | "MECH" | "ECE" | "MBA"
  uploadedTime?: string; // e.g. "2h ago"
  author?: string; // e.g. "Haris S."
}

export default function RecentlyUploadedCard({
  title,
  sub,
  filetype = "CSE",
  uploadedTime = "2h ago",
  author = "Student",
}: RecentlyUploadedCardProps) {
  const getTypeBadgeStyle = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized.includes("note")) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (normalized.includes("pyq")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (normalized.includes("lab") || normalized.includes("manual")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  };

  const badgeStyle = getTypeBadgeStyle(sub);

  return (
    <Card className="group relative flex flex-col justify-between h-full min-h-[210px] bg-[#0F121E]/80 backdrop-blur-md border border-white/10 p-7 rounded-[28px] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-indigo-950/40 cursor-pointer overflow-hidden">
      <div className="space-y-4">
        {/* Top Row: Format badge & Course code */}
        <div className="flex items-center justify-between gap-2">
          <Badge className={`font-mono font-extrabold tracking-wider uppercase text-[10px] px-3 py-1 border ${badgeStyle}`}>
            {sub}
          </Badge>
          <span className="inline-flex items-center rounded-full bg-[#161A29] px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-300 border border-white/10 uppercase">
            {filetype}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h4>
      </div>

      {/* Footer meta row */}
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-1.5 truncate">
          <User className="h-3.5 w-3.5 text-slate-400" />
          <span className="truncate">{author}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-slate-400 font-mono">
            <Clock className="h-3.5 w-3.5" />
            <span>{uploadedTime}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </Card>
  );
}