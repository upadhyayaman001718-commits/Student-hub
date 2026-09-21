import { LucideIcon } from "lucide-react";

interface MetadataCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function MetadataCard({
  icon: Icon,
  label,
  value,
}: MetadataCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#161A29]/80 backdrop-blur-sm p-3.5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#1E2235]/90 hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className="flex items-center gap-1.5 text-indigo-400">
        <Icon className="h-3.5 w-3.5 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.12em] text-slate-400 truncate">
          {label}
        </span>
      </div>

      <p className="mt-1.5 font-extrabold text-white text-xs sm:text-sm truncate tracking-tight" title={value}>
        {value}
      </p>
    </div>
  );
}