"use client";

import Link from "next/link";
import { GraduationCap, Heart, Radio, ArrowUpRight } from "lucide-react";
import Container from "@/shared/components/layout/Container";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#080A12] mt-auto">
      <Container>
        <div className="pt-16 pb-10">

          {/* ── Top row: tagline + CTAs ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between
                          gap-10 pb-12 border-b border-white/[0.06]">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full
                              bg-emerald-500/8 border border-emerald-500/15
                              px-3 py-1 label-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 dot-pulse" />
                Centralized Academic Repository
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Study smarter with{" "}
                <span className="text-gradient-vivid">Student Hub</span>
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Discover verified lecture notes, previous year questions, and lab manuals
                uploaded by top students — free, forever.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           hover:from-indigo-500 hover:to-purple-500
                           text-white text-sm font-bold transition-all duration-200
                           shadow-md shadow-indigo-500/20 border border-indigo-400/20
                           hover:scale-[1.02]"
              >
                Upload Material
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full
                           glass border border-white/[0.08] text-white text-sm font-bold
                           transition-all duration-150 hover:bg-[#161B2E] hover:scale-[1.02]"
              >
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* ── Links grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-white/[0.06]">
            {/* Brand */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg
                                bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="text-base font-extrabold tracking-tight text-white
                                 group-hover:text-indigo-300 transition-colors">
                  Student<span className="text-gradient-vivid">Hub</span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                Built for students, by students. Supporting CS, ECE, Mechanical, Business,
                and foundational coursework.
              </p>
              <div className="flex items-center gap-2 label-mono text-emerald-400">
                <Radio className="h-3 w-3 dot-pulse" />
                All Systems Operational
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <h4 className="label-mono text-slate-500 mb-1">Navigation</h4>
              {[
                { label: "Home",            href: "/"         },
                { label: "Browse Catalog",  href: "/programs" },
                { label: "Upload Material", href: "/upload"   },
                { label: "Login / Account", href: "/login"    },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-indigo-400
                             transition-colors duration-150 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-3">
              <h4 className="label-mono text-slate-500 mb-1">Platform</h4>
              {["Privacy Policy", "Terms of Service", "Academic Support"].map((item) => (
                <span
                  key={item}
                  className="text-sm text-slate-400 hover:text-indigo-400
                             transition-colors duration-150 cursor-pointer w-fit"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── Copyright ── */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 label-mono text-slate-600">
              © {new Date().getFullYear()} Student Hub. Crafted with{" "}
              <Heart className="h-3 w-3 text-indigo-400 fill-indigo-400 inline" />{" "}
              for students.
            </p>
            <div className="flex gap-6 label-mono">
              {["Privacy", "Terms", "Support"].map((item) => (
                <span
                  key={item}
                  className="text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}
