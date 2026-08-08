"use client";

import RecentlyUploadedCard from "@/shared/components/programs/RecentlyUploadedCard";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import UploadResourceSection from "@/shared/components/upload/UploadResourceSection";
import stats from "@/features/browse/data/stats";
import recentlyUploaded from "@/features/browse/data/recentlyUpload";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import SearchResults from "@/shared/components/navigation/SearchResults";
import { programs } from "@/shared/data/programs";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, Upload } from "lucide-react";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredResources = recentlyUploaded.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#09090B] text-white selection:bg-[#0EA5E9]/30 selection:text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <section aria-labelledby="hero-heading" className="relative grid min-h-[calc(100vh-72px)] items-center gap-14 py-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-20 xl:py-24">
          <div className="pointer-events-none absolute -left-40 top-20 size-[420px] rounded-full bg-[#0EA5E9]/6 blur-[120px]" />
          <div className="relative z-10 max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 border-l-2 border-[#22D3EE] pl-3 text-xs font-bold uppercase tracking-[0.22em] text-[#7DD3FC]">
              <Sparkles className="size-3.5" /> Built by students, for students
            </div>
            <h1 id="hero-heading" className="max-w-3xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-white sm:text-7xl lg:text-7xl xl:text-[88px]">
              The knowledge base for your next <span className="text-[#38BDF8]">breakthrough.</span>
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-zinc-400">
              Notes, PYQs, lab manuals and assignments — organized by program, searchable in seconds, and shared by the student community.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/programs" className="inline-flex h-12 items-center justify-center gap-2 bg-[#0EA5E9] px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0284C7] hover:shadow-lg hover:shadow-[#0EA5E9]/15">
                Browse resources <ArrowRight className="size-4" />
              </Link>
              <Link href="/upload" className="inline-flex h-12 items-center justify-center gap-2 border border-white/15 px-6 text-sm font-bold text-white transition-colors hover:border-[#38BDF8]/60 hover:text-[#7DD3FC]"><Upload className="size-4" /> Upload material</Link>
            </div>
          </div>
          <div className="relative z-10 border border-white/10 bg-[#111114] p-5 shadow-2xl shadow-black/30 sm:p-7">
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4"><span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Student Hub / Index</span><span className="size-2 rounded-full bg-[#22D3EE]" /></div>
            <div className="space-y-5"><p className="text-sm text-zinc-500">Find the signal in the noise.</p><div className="group relative"><Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#38BDF8]" /><input id="resource-search" type="text" placeholder="Search resources, subjects, courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-16 w-full border border-white/10 bg-[#09090B] pl-14 pr-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#0EA5E9]/70" /></div>{search.trim() !== "" && <div className="animate-fade-in"><SearchResults resources={filteredResources} /></div>}</div>
            <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs text-zinc-500"><span>01 / Discover</span><span>02 / Learn</span><span>03 / Contribute</span><span className="text-right text-[#7DD3FC]">Always growing →</span></div>
          </div>
        </section>

        <section aria-label="Student Hub statistics" className="grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
          {stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.subtitle} className="rounded-none border-0 border-r border-white/10 bg-transparent last:border-r-0"><CardContent className="flex items-center gap-3 p-5 sm:p-7"><Icon className="size-5 text-[#38BDF8]" /><div><h3 className="text-2xl font-bold tracking-tight text-white">{stat.title}</h3><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{stat.subtitle}</p></div></CardContent></Card>; })}
        </section>

        <section aria-labelledby="popular-courses-heading" className="border-b border-white/10 py-20 sm:py-28"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Explore the library</p><h2 id="popular-courses-heading" className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-6xl">Popular courses</h2><p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">Quick access to academic programs and courses students search for most often.</p></div><Link href="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-[#38BDF8] hover:text-white">All programs <ArrowRight className="size-4" /></Link></div><div className="mt-12 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{programs.map((program) => <ProgramCard key={program.course} {...program} />)}<Link href="/programs" className="group flex min-h-[220px] flex-col justify-between bg-[#0F0F12] p-6 transition-colors hover:bg-[#15151A]"><div><div className="mb-8 flex size-10 items-center justify-center bg-[#0EA5E9] text-white"><ArrowRight className="size-5" /></div><h3 className="text-xl font-bold text-white">View all courses</h3><p className="mt-2 text-sm leading-6 text-zinc-400">Browse every course available in Student Hub.</p></div><span className="text-sm font-bold text-[#38BDF8]">Explore courses →</span></Link></div></section>

        <UploadResourceSection />
        <section aria-labelledby="recently-uploaded-heading" className="border-b border-white/10 py-20 sm:py-28"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Fresh from the community</p><h2 id="recently-uploaded-heading" className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-6xl">Recently uploaded</h2><p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">Explore fresh study resources uploaded by student community members.</p><div className="mt-12 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{recentlyUploaded.map((resource) => <RecentlyUploadedCard key={resource.title} {...resource} />)}</div></section>
        <section aria-labelledby="recently-opened-heading" className="py-20 sm:py-28"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Pick up where you left off</p><h2 id="recently-opened-heading" className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-6xl">Recently opened</h2><p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">Quick access to the study resources you opened and reviewed recently.</p><div className="mt-12 border border-dashed border-white/15 px-6 py-16 text-center"><p className="text-sm font-medium text-zinc-500">No recently opened items yet.</p></div></section>
      </main>
      <Footer />
    </div>
  );
}
