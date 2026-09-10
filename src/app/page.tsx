"use client";

import Link from "next/link";
import {
  Search,
  Upload,
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  FolderArchive,
  BookMarked,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import SearchBar from "@/shared/components/navigation/SearchBar";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import RecentlyUploadedCard from "@/shared/components/programs/RecentlyUploadedCard";
import UploadResourceSection from "@/shared/components/upload/UploadResourceSection";
import stats from "@/features/browse/data/stats";
import { programs } from "@/shared/data/programs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { getResources } from "@/lib/api";
import RecentlyUploadedSection from "@/shared/components/home/RecentlyUploadedSection";
import HomeClient from "@/shared/components/home/homeClient";

export default async function Home() {
  const response = await getResources();
  const resources = response.data;


  const discoveryCategories = [
    {
      num: "01",
      title: "Lecture Notes",
      count: "4,200+ files",
      desc: "Classroom notes, chapter summaries & handwritten sheets",
      icon: FileText,
      tag: "Notes",
      href: "/programs",
    },
    {
      num: "02",
      title: "Previous Year Questions",
      count: "3,800+ papers",
      desc: "University exam papers, answer keys & mid-term PYQs",
      icon: HelpCircle,
      tag: "PYQ",
      href: "/programs",
    },
    {
      num: "03",
      title: "Lab Manuals & Code",
      count: "2,400+ manuals",
      desc: "Practical manuals, experiment setups & code repositories",
      icon: FolderArchive,
      tag: "Lab Manual",
      href: "/programs",
    },
    {
      num: "04",
      title: "Study Material & Guides",
      count: "2,000+ resources",
      desc: "Formula sheets, reference books & syllabus roadmaps",
      icon: BookMarked,
      tag: "Study Material",
      href: "/programs",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] overflow-x-hidden selection:bg-[#B15F2C]/20 selection:text-[#B15F2C] relative">
      {/* Sticky Top Navbar */}
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 sm:px-10 lg:px-12 relative z-10">
        {/* ================================================== */}
        {/* HERO SECTION - LUMORA EDITORIAL DESIGN */}
        {/* ================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="flex flex-col items-center justify-center pt-16 sm:pt-24 pb-20 text-center max-w-[1020px] mx-auto relative"
        >
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-white border border-[#E2E0DB] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8 shadow-2xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#B15F2C] animate-pulse" />
            Academic Resource Platform
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-[#0A0A0A] leading-[1.02] mb-8"
          >
            Everything you need <br />
            <span className="text-[#B15F2C]">to study better.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[760px] text-lg sm:text-2xl text-[#666666] leading-relaxed mx-auto mb-12 font-normal"
          >
            Discover verified Notes, PYQs, Lab Manuals, and Study Material — organized by program and curated by top engineering & degree students.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/programs"
              className="flex h-14 items-center justify-center gap-2.5 bg-[#B15F2C] hover:bg-[#9E5324] text-white font-extrabold tracking-wide uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-md"
            >
              <Search className="h-4 w-4" />
              Explore Resources
            </Link>
            <Link
              href="/upload"
              className="flex h-14 items-center justify-center gap-2.5 border border-[#E2E0DB] bg-white hover:bg-[#F1F0EE] text-[#0A0A0A] font-extrabold tracking-wide uppercase text-xs rounded-full px-8 transition-all duration-300 hover:scale-[1.02] shadow-2xs"
            >
              <Upload className="h-4 w-4 text-[#B15F2C]" />
              Upload Resource
            </Link>
          </motion.div>

          {/* Large Pill Search Bar */}
          <HomeClient resources={resources} />
        </section>

        {/* ================================================== */}
        {/* DISCOVERY / RESOURCE TYPES SECTION */}
        {/* ================================================== */}
        <section aria-labelledby="discovery-heading" className="py-16 border-t border-[#E2E0DB]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#B15F2C] mb-2 flex items-center gap-2">
                <span className="text-[#0A0A0A] font-mono">[01]</span>
                Discovery Categories
              </div>
              <h2
                id="discovery-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight"
              >
                Resource Types
              </h2>
            </div>
            <p className="text-[#666666] text-base max-w-md">
              Find exactly what you need for exam preparation, class assignments, and lab work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoveryCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.title} href={cat.href} className="group block h-full">
                  <div className="bg-white border border-[#E2E0DB] rounded-[28px] p-7 flex flex-col justify-between h-full min-h-[260px] shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B15F2C]/40">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono font-extrabold text-[#666666] group-hover:text-[#B15F2C] transition-colors">
                          {cat.num}
                        </span>
                        <div className="h-10 w-10 rounded-full bg-[#F1F0EE] border border-[#E2E0DB] flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#B15F2C] group-hover:text-white transition-all duration-300">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight group-hover:text-[#B15F2C] transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#666666] font-normal leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#F1F0EE] flex items-center justify-between text-xs font-bold text-[#0A0A0A]">
                      <span className="text-[#666666]">{cat.count}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#B15F2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* EDITORIAL STATS GRID */}
        {/* ================================================== */}
        <section aria-label="Platform Statistics" className="py-16 border-y border-[#E2E0DB] my-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.subtitle}
                className="bg-white border border-[#E2E0DB] rounded-[28px] p-8 text-center flex flex-col items-center justify-center shadow-2xs hover:border-[#B15F2C]/30 transition-all duration-300"
              >
                <span className="text-xs font-mono text-[#B15F2C] font-extrabold mb-2">
                  0{idx + 1}
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
                  {stat.title}
                </h3>
                <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#666666]">
                  {stat.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================== */}
        {/* FEATURED PROGRAMS / POPULAR COURSES SECTION */}
        {/* ================================================== */}
        <section
          aria-labelledby="popular-courses-heading"
          className="py-16 border-b border-[#E2E0DB]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#B15F2C] mb-2 flex items-center gap-2">
                <span className="text-[#0A0A0A] font-mono">[02]</span>
                Featured Catalog
              </div>
              <h2
                id="popular-courses-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight"
              >
                Popular Courses
              </h2>
              <p className="mt-3 text-[#666666] max-w-2xl text-base font-normal leading-relaxed">
                Direct access to core academic programs and branches searched most frequently by students.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] hover:text-[#B15F2C] transition-colors group"
            >
              All Programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-[#B15F2C]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.course} {...program} />
            ))}

            {/* Explore All Card */}
            <Link href="/programs" className="block h-full group">
              <div className="rounded-[28px] border border-dashed border-[#E2E0DB] bg-white p-7 transition-all duration-300 hover:border-[#B15F2C] hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between text-center h-full min-h-[230px]">
                <div className="flex flex-col items-center pt-4">
                  <div className="h-12 w-12 rounded-full bg-[#F1F0EE] border border-[#E2E0DB] flex items-center justify-center text-[#B15F2C] mb-4">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0A0A0A] tracking-tight group-hover:text-[#B15F2C] transition-colors">
                    View All Courses
                  </h3>
                  <p className="mt-2 text-xs text-[#666666] font-normal leading-relaxed">
                    Browse every branch and semester available in Student Hub.
                  </p>
                </div>

                <span className="inline-flex h-12 items-center justify-center bg-[#0A0A0A] group-hover:bg-[#B15F2C] text-white rounded-full px-6 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 mt-6 w-full cursor-pointer shadow-2xs">
                  Explore Catalog &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ================================================== */}
        {/* UPLOAD PROMOTIONAL BANNER SECTION */}
        {/* ================================================== */}
        <UploadResourceSection />

        {/* ================================================== */}
        {/* RECENTLY UPLOADED SECTION */}
        {/* ================================================== */}
        <RecentlyUploadedSection resources={resources} />

        {/* ================================================== */}
        {/* RECENTLY OPENED SECTION */}
        {/* ================================================== */}
        <section aria-labelledby="recently-opened-heading" className="py-16">
          <div className="mb-8">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#B15F2C] mb-2 flex items-center gap-2">
              <span className="text-[#0A0A0A] font-mono">[04]</span>
              Personal Workspace
            </div>
            <h2
              id="recently-opened-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight"
            >
              Recently Opened
            </h2>
            <p className="mt-2 text-[#666666] max-w-2xl text-base font-normal leading-relaxed">
              Quick access to study materials and documents you reviewed recently.
            </p>
          </div>
          <div className="rounded-[28px] border border-dashed border-[#E2E0DB] bg-white p-12 text-center shadow-2xs">
            <p className="text-[#666666] font-bold text-sm">
              No recently opened items in your active session yet.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

