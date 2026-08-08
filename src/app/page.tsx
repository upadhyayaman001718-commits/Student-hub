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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_62%)]" />
      <div className="pointer-events-none absolute right-[-12%] top-[900px] size-[420px] rounded-full bg-[#22D3EE]/5 blur-[130px]" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <section aria-labelledby="hero-heading" className="mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl flex-col items-center justify-center py-20 text-center sm:py-28">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/8 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#7DD3FC]">
            <Sparkles className="size-3.5" />
            Built by students, for students
          </div>
          <h1 id="hero-heading" className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-[-0.055em] text-white sm:text-7xl lg:text-[84px]">
            Every resource, <span className="text-[#38BDF8]">one hub.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
            Your one-stop platform for Notes, PYQs, Lab Manuals, Assignments and study resources — organized by program and always up to date.
          </p>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link href="/programs" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] px-6 text-sm font-bold text-white shadow-xl shadow-[#0EA5E9]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0284C7] sm:w-auto">
              <Search data-icon="inline-start" /> Browse resources <ArrowRight data-icon="inline-end" />
            </Link>
            <Link href="/upload" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] sm:w-auto">
              <Upload data-icon="inline-start" /> Upload material
            </Link>
          </div>
          <div className="group relative mt-14 w-full max-w-3xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-[#38BDF8]" />
            <input type="text" placeholder="Search resources, notes, subjects, courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-16 w-full rounded-2xl border border-white/10 bg-[#18181B]/80 pl-16 pr-5 text-base text-white shadow-2xl shadow-black/30 outline-none transition-all placeholder:text-zinc-500 focus:border-[#0EA5E9]/60 focus:ring-4 focus:ring-[#0EA5E9]/10" />
          </div>
          {search.trim() !== "" && <div className="mt-6 w-full animate-fade-in"><SearchResults resources={filteredResources} /></div>}
        </section>

        <section aria-label="Student Hub statistics" className="grid grid-cols-2 gap-3 border-y border-white/8 py-5 sm:grid-cols-4 sm:gap-4 sm:py-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return <Card key={stat.subtitle} className="border-white/8 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA5E9]/30 hover:bg-white/[0.05]"><CardContent className="flex items-center gap-3 p-4 sm:p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 text-[#38BDF8]"><Icon className="size-5" /></div><div><h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{stat.title}</h3><p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">{stat.subtitle}</p></div></CardContent></Card>;
          })}
        </section>

        <section aria-labelledby="popular-courses-heading" className="border-b border-white/8 py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Explore the library</p><h2 id="popular-courses-heading" className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Popular courses</h2><p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">Quick access to academic programs and courses that students search for most often.</p></div><Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] transition-colors hover:text-white">All programs <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{programs.map((program) => <ProgramCard key={program.course} {...program} />)}<Link href="/programs" className="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-dashed border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0EA5E9]/10"><div><div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-[#0EA5E9] text-white"><ArrowRight className="size-5" /></div><h3 className="text-xl font-bold tracking-tight text-white">View all courses</h3><p className="mt-2 text-sm leading-6 text-zinc-400">Browse every course available in Student Hub.</p></div><span className="text-sm font-bold text-[#38BDF8] transition-transform group-hover:translate-x-1">Explore courses →</span></Link></div>
        </section>

        <UploadResourceSection />

        <section aria-labelledby="recently-uploaded-heading" className="border-b border-white/8 py-20 sm:py-28"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Fresh from the community</p><h2 id="recently-uploaded-heading" className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Recently uploaded</h2><p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">Explore fresh study resources uploaded by student community members.</p></div><div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{recentlyUploaded.map((resource) => <RecentlyUploadedCard key={resource.title} {...resource} />)}</div></section>

        <section aria-labelledby="recently-opened-heading" className="py-20 sm:py-28"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#38BDF8]">Pick up where you left off</p><h2 id="recently-opened-heading" className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Recently opened</h2><p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">Quick access to the study resources you opened and reviewed recently.</p><div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center"><p className="text-sm font-medium text-zinc-500">No recently opened items yet.</p></div></section>
      </main>
      <Footer />
    </div>
  );
}
