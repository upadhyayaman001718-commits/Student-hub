"use client";

import Link from "next/link";
import { Upload } from "lucide-react";

export default function UploadResourceSection() {
  return (
    <section className="border border-white/8 bg-[#18181B]/40 rounded-[16px] p-8 md:p-12 my-24 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-4 max-w-2xl text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Got notes that helped you? <span className="text-[#22D3EE]">Share them.</span>
          </h2>
          <p className="text-[18px] text-zinc-400 font-medium leading-relaxed">
            Upload your notes, PYQs, and lab manuals to help thousands of students across your college. It takes less than a minute.
          </p>
        </div>

        <Link
          href="/upload"
          className="inline-flex h-12 items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white rounded-[12px] px-6 text-sm font-bold shadow-lg shadow-[#0EA5E9]/15 hover:shadow-xl hover:shadow-[#0EA5E9]/20 hover:scale-[1.02] transition-all duration-250 cursor-pointer shrink-0"
        >
          <Upload className="h-4.5 w-4.5" />
          Upload a resource
        </Link>
      </div>
    </section>
  );
}
