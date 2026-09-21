"use client";

import Link from "next/link";
import { Upload, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadResourceSection() {
  return (
    <section className="bg-[#0F121E]/90 border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 my-10 md:my-14 relative overflow-hidden shadow-2xl text-white">
      {/* Decorative ambient background accent */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-[11px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Community Knowledge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Have something useful to share?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Help a classmate today.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Upload your verified lecture notes, previous year question papers, and lab manuals to empower thousands of students across your program.
          </p>
        </div>

        <Link href="/upload" className="shrink-0">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-full px-8 h-14 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition-all gap-2.5 cursor-pointer text-sm uppercase tracking-wider border border-indigo-400/30"
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


