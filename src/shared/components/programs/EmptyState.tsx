"use client";

import { FileX2, RotateCcw, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0F121E]/80 backdrop-blur-xl p-12 text-center shadow-2xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#161A29] border border-white/10 text-indigo-400 shadow-inner">
        <FileX2 className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm font-normal text-slate-400 leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="h-11 border-white/10 bg-[#161A29] hover:bg-[#1E2235] hover:border-indigo-500/30 text-slate-200 rounded-full gap-2 px-6 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-indigo-400" />
            Reset Filters
          </Button>
        )}

        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button className="h-11 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 text-white font-extrabold rounded-full px-6 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 gap-2 cursor-pointer">
              <UploadCloud className="h-4 w-4" />
              {actionLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

