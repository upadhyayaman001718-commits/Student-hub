import { Download, FileText, Star } from "lucide-react";

interface ResourceStatsProps {
  downloads: number;
  pages: number;
  rating: number;
}

export default function ResourceStats({ downloads, pages, rating }: ResourceStatsProps) {
  const stats = [
    { icon: Download, label: "Downloads", value: downloads, color: "text-indigo-400" },
    { icon: FileText, label: "Pages",     value: pages,     color: "text-purple-400" },
    { icon: Star,     label: "Rating",    value: rating,    color: "text-amber-400"  },
  ];

  return (
    <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
      <h2 className="label-mono text-indigo-400">Resource Analytics</h2>
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.07] bg-[#111525]/60 p-3
                       text-center flex flex-col items-center
                       hover:border-indigo-500/20 transition-colors duration-150"
          >
            <Icon className={`h-3.5 w-3.5 ${color} mb-1`} />
            <span className="text-sm font-bold text-white tracking-tight">{value}</span>
            <span className="label-mono text-slate-600 mt-0.5">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
