"use client";

import Link from "next/link";
import { GraduationCap, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F1F0EE] pt-20 pb-12 mt-auto relative z-10 w-full border-t border-white/10">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12 flex flex-col gap-16">
        {/* Top Hero Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-neutral-800">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#B15F2C]/10 border border-[#B15F2C]/30 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B15F2C]">
              <span className="w-2 h-2 rounded-full bg-[#B15F2C] animate-pulse" />
              Centralized Academic Repository
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Study smarter with <span className="text-[#B15F2C]">Student Hub</span>
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed">
              Discover verified lecture notes, previous year question papers, and laboratory manuals uploaded by top students.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-[#B15F2C] hover:bg-[#9E5324] text-white font-bold rounded-full px-6 py-3.5 text-sm transition-all shadow-md hover:scale-[1.02]"
            >
              Upload Material
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-full px-6 py-3.5 text-sm transition-all hover:scale-[1.02]"
            >
              Browse Programs
            </Link>
          </div>
        </div>

        {/* Content Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B15F2C] text-white shadow-sm group-hover:bg-[#9E5324] transition-colors">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Student<span className="text-[#B15F2C]">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed font-normal">
              Built for students, by students. Supporting computer science, engineering, business, and foundational academic coursework.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">
              Navigation
            </h4>
            <Link href="/" className="text-sm text-neutral-300 hover:text-[#B15F2C] transition-colors w-fit">
              Home
            </Link>
            <Link href="/programs" className="text-sm text-neutral-300 hover:text-[#B15F2C] transition-colors w-fit">
              Browse Catalog
            </Link>
            <Link href="/upload" className="text-sm text-neutral-300 hover:text-[#B15F2C] transition-colors w-fit">
              Upload Material
            </Link>
            <Link href="/login" className="text-sm text-neutral-300 hover:text-[#B15F2C] transition-colors w-fit">
              Account / Login
            </Link>
          </div>

          {/* Community & Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">
              Community
            </h4>
            <span className="text-sm text-neutral-300 hover:text-[#B15F2C] cursor-pointer transition-colors w-fit">
              Privacy Policy
            </span>
            <span className="text-sm text-neutral-300 hover:text-[#B15F2C] cursor-pointer transition-colors w-fit">
              Terms of Service
            </span>
            <span className="text-sm text-neutral-300 hover:text-[#B15F2C] cursor-pointer transition-colors w-fit">
              Contact Support
            </span>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <p className="flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Student Hub. Crafted with{" "}
            <Heart className="h-3.5 w-3.5 text-[#B15F2C] inline fill-[#B15F2C]" /> for students.
          </p>
          <div className="flex gap-6 text-neutral-400 font-semibold">
            <span className="hover:text-[#B15F2C] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#B15F2C] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#B15F2C] cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

