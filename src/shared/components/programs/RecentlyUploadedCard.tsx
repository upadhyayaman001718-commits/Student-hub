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
  const getTypeBadgeVariant = (type: string): "accent" | "default" | "secondary" | "orange" => {
    const normalized = type.toLowerCase();
    if (normalized.includes("note")) return "accent";
    if (normalized.includes("pyq")) return "default";
    if (normalized.includes("lab") || normalized.includes("manual")) return "orange";
    return "secondary";
  };

  const badgeVariant = getTypeBadgeVariant(sub);

  return (
    <Card className="group relative flex flex-col justify-between h-full min-h-[210px] bg-white border border-[#E2E0DB] p-7 rounded-[28px] shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B15F2C]/40 cursor-pointer overflow-hidden">
      <div className="space-y-4">
        {/* Top Row: Format badge & Course code */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={badgeVariant} className="font-extrabold tracking-wide uppercase text-[10px] px-3 py-1">
            {sub}
          </Badge>
          <span className="inline-flex items-center rounded-full bg-[#F1F0EE] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#0A0A0A] border border-[#E2E0DB] uppercase">
            {filetype}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-[#0A0A0A] leading-snug line-clamp-2 group-hover:text-[#B15F2C] transition-colors duration-300">
          {title}
        </h4>
      </div>

      {/* Footer meta row */}
      <div className="mt-8 pt-4 border-t border-[#F1F0EE] flex items-center justify-between text-xs text-[#666666] font-medium">
        <div className="flex items-center gap-1.5 truncate">
          <User className="h-3.5 w-3.5 text-[#666666]/70" />
          <span className="truncate">{author}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#666666]/70">
            <Clock className="h-3.5 w-3.5" />
            <span>{uploadedTime}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[#B15F2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </Card>
  );
}