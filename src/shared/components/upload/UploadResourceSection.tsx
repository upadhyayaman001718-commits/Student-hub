"use client";

import Link from "next/link";
import { Upload, ArrowUpRight } from "lucide-react";

export default function UploadResourceSection() {
  return <section className="my-20 border-y border-white/10 py-12 sm:my-28 sm:py-16"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-center"><div className="max-w-2xl"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Contribute to the index</p><h2 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Got notes that helped you? <span className="text-[#22D3EE]">Share them.</span></h2><p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">Upload your notes, PYQs, and lab manuals to help students across your college.</p></div><Link href="/upload" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[#0EA5E9] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0284C7]"><Upload className="size-4" /> Upload a resource <ArrowUpRight className="size-4" /></Link></div></section>;
}
