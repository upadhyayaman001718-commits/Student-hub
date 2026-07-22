"use client";

import RecentlyUploadedCard from "@/shared/components/RecentlyUploadedCard";
import ProgramCard from "@/shared/components/ProgramCard";
import UploadResourceSection from "@/shared/components/UploadResourceSection";
import stats from "@/features/browse/data/stats";
import recentlyUploaded from "@/features/browse/data/recentlyUpload";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import SearchResults from "@/shared/components/SearchResults";
import { programs } from "@/shared/data/programs";
import Link from "next/link";
import { Search, Sparkles, Upload } from "lucide-react";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredResources = recentlyUploaded.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white overflow-hidden relative selection:bg-[#0EA5E9]/30 selection:text-white">
      {/* Visual background decorations - ambient glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#0EA5E9]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sticky Premium Navbar */}
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="flex flex-col items-center justify-center min-h-[85vh] py-24 text-center max-w-[1100px] mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#18181B] border border-white/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Built by students, for students
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-[64px] font-extrabold tracking-tight text-white leading-[1.15] mb-8">
            Every resource,{" "}
            <span className="text-[#0EA5E9]">
              one hub.
            </span>
          </h1>

          <p className="max-w-[720px] text-[18px] text-zinc-400 leading-relaxed mx-auto mb-10">
            Your one-stop platform for Notes, PYQs, Lab Manuals, Assignments and study resources &mdash; organized by program and always up to date.
          </p>

          {/* Core Call to Action Buttons - 40px spacing from Description */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-14">
            <Link
              href="/programs"
              className="flex h-12 items-center justify-center gap-2 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white font-bold rounded-[12px] px-6 text-sm transition-all duration-250 hover:scale-[1.02] shadow-lg shadow-[#0EA5E9]/15"
            >
              <Search className="h-4.5 w-4.5" />
              Browse resources
            </Link>
            <Link
              href="/upload"
              className="flex h-12 items-center justify-center gap-2 border border-white/8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[12px] px-6 text-sm transition-all duration-250 hover:scale-[1.02]"
            >
              <Upload className="h-4.5 w-4.5" />
              Upload material
            </Link>
          </div>

          {/* Large Premium Search Bar - 56px spacing from Buttons */}
          <div className="relative w-full max-w-[720px] mx-auto group mb-16">
            <span className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none text-zinc-500 group-focus-within:text-[#0EA5E9] transition-colors duration-200">
              <Search className="h-6 w-6" />
            </span>
            <input
              type="text"
              placeholder="Search study resources, notes, subjects, courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 bg-[#18181B]/70 border border-white/8 text-white placeholder-zinc-500 pl-16 pr-6 rounded-[16px] focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 transition-all duration-300 shadow-2xl text-base font-normal"
            />
          </div>

          {search.trim() !== "" && (
            <div className="w-full mt-8 animate-fade-in">
              <SearchResults resources={filteredResources} />
            </div>
          )}
        </section>

        {/* Stats Grid - 64px from Search Bar, 128px to Popular Courses section below */}
        <div className="py-24 grid grid-cols-2 gap-6 md:grid-cols-4 border-y border-white/5 mb-32">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.subtitle}
                className="border border-white/8 bg-[#18181B]/40 transition-all duration-300 hover:-translate-y-[4px] hover:border-[#0EA5E9]/30 hover:bg-[#18181B] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-[16px] h-full relative overflow-hidden"
              >
                <CardContent className="flex flex-col items-center justify-center p-[28px] h-full text-center">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 mb-4">
                    <Icon className="h-6 w-6 text-[#0EA5E9]" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    {stat.title}
                  </h3>

                  <p className="mt-2 text-[13px] font-bold uppercase tracking-widest text-zinc-500">
                    {stat.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Courses Section - py-24 (96px) */}
        <section
          aria-labelledby="popular-courses-heading"
          className="border-b border-white/5 py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2
                id="popular-courses-heading"
                className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2]"
              >
                Popular Courses
              </h2>
              <p className="mt-2 text-zinc-400 max-w-2xl text-[18px] font-medium leading-relaxed">
                Quick access to academic programs and courses that other students search for and view most often.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:underline"
            >
              All Programs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto mt-12">
            {programs.map((program) => (
              <ProgramCard key={program.course} {...program} />
            ))}

            {/* Explore All Card */}
            <Link href="/programs" className="block h-full">
              <div className="rounded-[16px] border border-dashed border-white/10 bg-[#18181B]/25 p-[28px] transition-all duration-300 hover:border-[#0EA5E9] hover:-translate-y-[4px] hover:bg-[#18181B]/35 hover:shadow-lg flex flex-col justify-between text-center h-full min-h-[240px]">
                <div className="flex flex-col items-center pt-4">
                  <h3 className="text-[22px] font-bold text-white tracking-tight">View All Courses</h3>
                  <p className="mt-3 text-[15px] text-zinc-400 font-medium leading-relaxed">
                    Browse every course available in Student Hub.
                  </p>
                </div>

                <span className="inline-flex h-12 items-center justify-center bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white rounded-[12px] px-6 text-sm font-bold transition-all duration-300 hover:scale-[1.02] mt-6 w-full cursor-pointer">
                  Explore Courses &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Upload Promotional Section */}
        <UploadResourceSection />

        {/* Recently Uploaded Section */}
        <section
          aria-labelledby="recently-uploaded-heading"
          className="border-b border-white/5 py-24"
        >
          <div className="mb-8">
            <h2
              id="recently-uploaded-heading"
              className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2]"
            >
              Recently Uploaded
            </h2>
            <p className="mt-2 text-zinc-400 max-w-2xl text-[18px] font-medium leading-relaxed">
              Explore fresh study resources uploaded by our student community members.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {recentlyUploaded.map((resource) => (
              <RecentlyUploadedCard key={resource.title} {...resource} />
            ))}
          </div>
        </section>

        {/* Recently Opened Section */}
        <section aria-labelledby="recently-opened-heading" className="py-24">
          <div className="mb-8">
            <h2
              id="recently-opened-heading"
              className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2]"
            >
              Recently Opened
            </h2>
            <p className="mt-2 text-zinc-400 max-w-2xl text-[18px] font-medium leading-relaxed">
              Quick access to the study resources you opened and reviewed recently.
            </p>
          </div>
          <div className="rounded-[16px] border border-dashed border-white/8 bg-[#18181B]/20 p-12 text-center mt-12">
            <p className="text-zinc-500 font-semibold text-sm">No recently opened items yet.</p>
          </div>
        </section>
      </main>

      {/* Premium Minimal Footer */}
      <Footer />
    </div>
  );
}
