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
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-[#E2E0DB] bg-white p-12 text-center shadow-2xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F0EE] border border-[#E2E0DB] text-[#B15F2C] shadow-2xs">
        <FileX2 className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm font-normal text-[#666666] leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="h-11 border-[#E2E0DB] bg-white hover:bg-[#F1F0EE] text-[#0A0A0A] rounded-full gap-2 px-6"
          >
            <RotateCcw className="h-4 w-4 text-[#B15F2C]" />
            Reset Filters
          </Button>
        )}

        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button variant="accent" className="h-11 bg-[#B15F2C] hover:bg-[#9E5324] text-white font-bold rounded-full px-6 shadow-2xs gap-2">
              <UploadCloud className="h-4 w-4" />
              {actionLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

