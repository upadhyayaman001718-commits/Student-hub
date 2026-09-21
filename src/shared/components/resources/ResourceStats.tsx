import { Download, FileText, Star } from "lucide-react";

interface ResourceStatsProps {
  downloads: number;
  pages: number;
  rating: number;
}

export default function ResourceStats({
  downloads,
  pages,
  rating,
}: ResourceStatsProps) {
  return (
    <section className="pt-6 border-t border-white/10 space-y-3">
      <h2 className="text-[11px] font-mono font-extrabold uppercase tracking-[0.15em] text-indigo-400">
        Resource Analytics
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-[#161A29]/60 backdrop-blur-sm p-3.5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#161A29]/90">
          <Download className="h-4 w-4 text-indigo-400 mb-1" />
          <h3 className="text-base font-extrabold text-white tracking-tight">
            {downloads}
          </h3>
          <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            Downloads
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161A29]/60 backdrop-blur-sm p-3.5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-500/30 hover:bg-[#161A29]/90">
          <FileText className="h-4 w-4 text-purple-400 mb-1" />
          <h3 className="text-base font-extrabold text-white tracking-tight">
            {pages}
          </h3>
          <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            Pages
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#161A29]/60 backdrop-blur-sm p-3.5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-amber-500/30 hover:bg-[#161A29]/90">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400/20 mb-1" />
          <h3 className="text-base font-extrabold text-white tracking-tight">
            {rating}
          </h3>
          <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            Rating
          </p>
        </div>
      </div>
    </section>
  );
}