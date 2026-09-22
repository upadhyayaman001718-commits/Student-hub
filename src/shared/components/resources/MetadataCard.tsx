import { LucideIcon } from "lucide-react";

interface MetadataCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function MetadataCard({ icon: Icon, label, value }: MetadataCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111525]/80 p-3
                    hover:border-indigo-500/25 hover:bg-[#161B2E]/80
                    transition-all duration-150 group">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-indigo-400 shrink-0
                         group-hover:scale-110 transition-transform duration-150" />
        <span className="label-mono text-slate-500 truncate">{label}</span>
      </div>
      <p className="text-xs font-semibold text-white truncate" title={value}>{value}</p>
    </div>
  );
}
