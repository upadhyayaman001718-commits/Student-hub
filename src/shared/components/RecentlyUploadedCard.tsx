"use client";

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
  // Select color config based on resource type
  const getTypeBadgeStyles = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized.includes("note")) {
      return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
    if (normalized.includes("pyq")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (normalized.includes("lab") || normalized.includes("manual")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
    // Default Assignment/Presentation style
    return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  };

  const badgeClass = getTypeBadgeStyles(sub);

  return (
    <div className="group rounded-[16px] border border-white/8 bg-[#18181B]/60 p-[28px] flex flex-col justify-between h-full min-h-[180px] transition-all duration-300 hover:border-[#0EA5E9]/30 hover:bg-[#18181B] hover:-translate-y-[4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] shadow-md relative overflow-hidden cursor-pointer">
      {/* Subtle ambient hover glow */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#0EA5E9]/3 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${badgeClass}`}>
            {sub}
          </span>
          <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-bold text-zinc-400 border border-white/5 uppercase tracking-wide">
            {filetype}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-[16px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-200">
          {title}
        </h4>
      </div>

      {/* Bottom meta row */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[13px] font-semibold text-zinc-500">
        <span>by {author}</span>
        <span className="mx-2">•</span>
        <span>{uploadedTime}</span>
      </div>
    </div>
  );
}