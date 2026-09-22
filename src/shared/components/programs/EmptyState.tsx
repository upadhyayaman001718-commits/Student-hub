"use client";

import { FileX2, RotateCcw, UploadCloud } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = "No resources found",
  description = "We couldn't find any resources matching your criteria. Try adjusting your search or filters.",
  onReset,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center glass-light rounded-2xl
                    border border-dashed border-white/[0.07] px-8 py-14 text-center">
      <div className="h-12 w-12 rounded-2xl bg-[#111525] border border-white/[0.07]
                      flex items-center justify-center text-indigo-400 mb-5">
        <FileX2 className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 leading-relaxed">{description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full
                       glass border border-white/[0.08] text-slate-300 text-xs font-semibold
                       hover:text-white hover:bg-[#161B2E] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-indigo-400" />
            Reset Filters
          </button>
        )}
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white text-xs font-bold
                       shadow-md shadow-indigo-500/20 border border-indigo-400/15
                       hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
