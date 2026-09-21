"use client";

import Link from "next/link";
import { GraduationCap, Heart, ArrowUpRight, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07080D] text-slate-100 pt-20 pb-12 mt-auto relative z-10 w-full border-t border-white/10">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12 flex flex-col gap-16">
        {/* Top Hero Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Centralized Academic Repository
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Study smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Student Hub</span>
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Discover verified lecture notes, previous year question papers, and laboratory manuals uploaded by top students.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-full px-6 py-3.5 text-sm transition-all shadow-lg shadow-indigo-500/20 border border-indigo-400/30 hover:scale-[1.02]"
            >
              Upload Material
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 border border-white/10 bg-[#0F121E] hover:bg-[#161A29] text-white font-bold rounded-full px-6 py-3.5 text-sm transition-all hover:scale-[1.02]"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Content Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Student<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
              Built for students, by students. Supporting computer science, engineering, business, and foundational academic coursework.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-emerald-400">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>All Systems Operational &bull; Verified Academic Engine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              Navigation
            </h4>
            <Link href="/" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors w-fit">
              Home
            </Link>
            <Link href="/programs" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors w-fit">
              Browse Catalog
            </Link>
            <Link href="/upload" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors w-fit">
              Upload Material
            </Link>
            <Link href="/login" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors w-fit">
              Account / Login
            </Link>
          </div>

          {/* Community & Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              Platform
            </h4>
            <span className="text-sm text-slate-300 hover:text-indigo-400 cursor-pointer transition-colors w-fit">
              Privacy Policy
            </span>
            <span className="text-sm text-slate-300 hover:text-indigo-400 cursor-pointer transition-colors w-fit">
              Terms of Service
            </span>
            <span className="text-sm text-slate-300 hover:text-indigo-400 cursor-pointer transition-colors w-fit">
              Academic Support
            </span>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p className="flex items-center gap-1.5 font-mono">
            &copy; {new Date().getFullYear()} Student Hub. Crafted with{" "}
            <Heart className="h-3.5 w-3.5 text-indigo-400 inline fill-indigo-400" /> for students.
          </p>
          <div className="flex gap-6 text-slate-400 font-semibold">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


