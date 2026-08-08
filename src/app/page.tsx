"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  FlaskConical,
  GraduationCap,
  Search,
  Upload,
} from "lucide-react";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import RecentlyUploadedCard from "@/shared/components/programs/RecentlyUploadedCard";
import UploadResourceSection from "@/shared/components/upload/UploadResourceSection";
import SearchResults from "@/shared/components/navigation/SearchResults";
import stats from "@/features/browse/data/stats";
import recentlyUploaded from "@/features/browse/data/recentlyUpload";
import { programs } from "@/shared/data/programs";

const categories = [
  { label: "Notes", description: "Concept summaries and revision material", icon: FileText },
  { label: "Previous Year Questions", description: "Practice with papers from past semesters", icon: BookOpen },
  { label: "Lab Manuals", description: "Experiments, records and practical guides", icon: FlaskConical },
  { label: "Assignments", description: "Coursework and submitted study material", icon: GraduationCap },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredResources = recentlyUploaded.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <section aria-labelledby="hero-heading" className="border-b border-border/70 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold text-primary">The academic resource library for students</p>
            <h1 id="hero-heading" className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
              Your college resources, <span className="text-primary">all in one place.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Find notes, previous year questions, lab manuals, assignments and course material shared by your student community.
            </p>
          </div>

          <div className="mt-10 max-w-4xl">
            <label htmlFor="resource-search" className="mb-3 block text-sm font-medium text-foreground">Search the library</label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="resource-search"
                type="text"
                placeholder="Search resources, subjects, courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-16 w-full rounded-xl border border-input bg-card pl-14 pr-5 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/20"
              />
            </div>
            {search.trim() !== "" && <div className="mt-4 animate-fade-in"><SearchResults resources={filteredResources} /></div>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/programs" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Browse resources <ArrowRight data-icon="inline-end" />
            </Link>
            <Link href="/upload" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted">
              <Upload data-icon="inline-start" /> Upload material
            </Link>
          </div>
        </section>

        <section aria-labelledby="categories-heading" className="border-b border-border/70 py-14 sm:py-18">
          <div className="flex items-end justify-between gap-4">
            <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Start here</p><h2 id="categories-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse resources</h2></div>
            <Link href="/programs" className="hidden items-center gap-2 text-sm font-semibold text-primary hover:text-foreground sm:inline-flex">View library <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ label, description, icon: Icon }) => (
              <Link key={label} href="/programs" className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-black/10">
                <div className="flex items-center justify-between"><div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></div><ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" /></div>
                <h3 className="mt-5 font-semibold text-foreground">{label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="courses-heading" className="border-b border-border/70 py-14 sm:py-18">
          <div className="flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Find your subject</p><h2 id="courses-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Explore courses</h2><p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">Jump into the programs with the most shared material.</p></div><Link href="/programs" className="hidden items-center gap-2 text-sm font-semibold text-primary hover:text-foreground sm:inline-flex">View all courses <ArrowRight className="size-4" /></Link></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{programs.map((program) => <ProgramCard key={program.course} {...program} />)}</div>
        </section>

        <section aria-labelledby="recently-uploaded-heading" className="py-14 sm:py-18"><div className="flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Fresh from the community</p><h2 id="recently-uploaded-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Recently uploaded</h2><p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">New material to help you prepare for what comes next.</p></div><Link href="/programs" className="hidden items-center gap-2 text-sm font-semibold text-primary hover:text-foreground sm:inline-flex">View all <ArrowRight className="size-4" /></Link></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{recentlyUploaded.map((resource) => <RecentlyUploadedCard key={resource.title} {...resource} />)}</div></section>

        <UploadResourceSection />

        <section aria-labelledby="recently-opened-heading" className="border-t border-border/70 py-14 sm:py-18"><h2 id="recently-opened-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Recently opened</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Resources you open will appear here for quick access.</p><div className="mt-6 rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center"><p className="text-sm text-muted-foreground">No recently opened items yet.</p></div></section>
      </main>
      <Footer />
    </div>
  );
}
