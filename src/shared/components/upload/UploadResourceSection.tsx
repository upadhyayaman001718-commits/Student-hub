"use client";

import Link from "next/link";
import { Upload, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadResourceSection() {
  return (
    <section className="bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 sm:p-12 md:p-16 my-24 relative overflow-hidden shadow-2xl text-white">
      {/* Decorative ambient background accent */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#B15F2C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
        <div className="space-y-4 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#B15F2C]/20 border border-[#B15F2C]/40 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] text-[#B15F2C] uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#B15F2C]" />
            Community Knowledge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Have something useful to share?{" "}
            <span className="text-[#B15F2C]">Help a classmate today.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Upload your verified lecture notes, previous year question papers, and lab manuals to empower thousands of students across your program.
          </p>
        </div>

        <Link href="/upload" className="shrink-0">
          <Button
            variant="accent"
            size="lg"
            className="bg-[#B15F2C] hover:bg-[#9E5324] text-white font-bold rounded-full px-8 h-14 shadow-lg hover:scale-[1.02] transition-all gap-2.5 cursor-pointer text-sm uppercase tracking-wider"
          >
            <Upload className="h-4.5 w-4.5" />
            Upload a Resource
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

