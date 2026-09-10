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
    <section className="pt-4 border-t border-slate-100">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        Resource Statistics
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-center flex flex-col items-center justify-center">
          <Download className="h-4 w-4 text-[#0A2A66] mb-1" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {downloads}
          </h3>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Downloads
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-center flex flex-col items-center justify-center">
          <FileText className="h-4 w-4 text-[#6D28D9] mb-1" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {pages}
          </h3>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Pages
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-center flex flex-col items-center justify-center">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500/20 mb-1" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {rating}
          </h3>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Rating
          </p>
        </div>
      </div>
    </section>
  );
}