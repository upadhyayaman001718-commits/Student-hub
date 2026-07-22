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
  description = "We couldn't find any resources matching your criteria. Try adjusting your search query or filters.",
  onReset,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-white/8 bg-[#18181B]/30 p-12 text-center shadow-lg relative overflow-hidden">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] shadow-md transition-transform duration-300 hover:rotate-6">
        <FileX2 className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm font-medium text-zinc-400 leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {onReset && (
          <button
            onClick={onReset}
            className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-white/8 bg-[#18181B] px-6 text-sm font-semibold text-zinc-300 hover:text-white hover:border-white/20 hover:bg-[#18181B]/80 shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </button>
        )}

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#0EA5E9] px-6 text-sm font-semibold text-white hover:bg-[#0EA5E9]/90 shadow-lg shadow-[#0EA5E9]/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
          >
            <UploadCloud className="h-4 w-4" />
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
