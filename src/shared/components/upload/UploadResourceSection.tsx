"use client";

import Link from "next/link";
import { Upload, ArrowRight } from "lucide-react";

export default function UploadResourceSection() {
  return (
    <div className="relative overflow-hidden
                    glass-light rounded-2xl p-8 sm:p-10 md:p-12
                    border border-white/[0.07] shadow-xl">
      {/* Glow accent */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 w-72 h-72
                   bg-gradient-to-tr from-indigo-600/15 to-purple-600/10
                   rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center
                      justify-between gap-8">
        {/* Copy */}
        <div className="space-y-3 max-w-xl">
          <p className="section-label">Community Knowledge</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
            Have something useful to share?{" "}
            <span className="text-gradient-vivid">
              Help a classmate today.
            </span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Upload verified notes, PYQs, and lab manuals to empower thousands of
            students across your programme.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/upload"
          className="shrink-0 inline-flex items-center gap-2.5 h-12 px-8
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-500 hover:to-purple-500
                     text-white font-bold text-sm rounded-full
                     shadow-lg shadow-indigo-500/20 border border-indigo-400/15
                     transition-all duration-200 hover:scale-[1.02]"
        >
          <Upload className="h-4 w-4" />
          Upload a Resource
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
