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
import HomeHero from "@/shared/components/home/HomeHero";
import RecentlyUploadedSection from "@/shared/components/home/RecentlyUploadedSection";
import { getResources } from "@/lib/api";

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
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-300 relative">
      {/* Sticky Top Navbar */}
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 sm:px-10 lg:px-12 relative z-10">
        {/* ================================================== */}
        {/* HERO SECTION - ASCEND SAAS DESIGN */}
        {/* ================================================== */}
        <HomeHero resources={resources} />

        {/* ================================================== */}
        {/* DISCOVERY / RESOURCE TYPES SECTION */}
        {/* ================================================== */}
        <section aria-labelledby="discovery-heading" className="py-10 md:py-14 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
                <span className="text-slate-400 font-mono">[01]</span>
                Discovery Categories
              </div>
              <h2
                id="discovery-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                Resource Types
              </h2>
            </div>
            <p className="text-slate-400 text-base max-w-md">
              Find exactly what you need for exam preparation, class assignments, and lab work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoveryCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.title} href={cat.href} className="group block h-full">
                  <div className="bg-[#0F121E]/80 backdrop-blur-md border border-white/10 rounded-[28px] p-6 flex flex-col justify-between h-full min-h-[200px] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-indigo-950/40 hover:border-indigo-500/40">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono font-extrabold text-slate-400 group-hover:text-indigo-400 transition-colors">
                          {cat.num}
                        </span>
                        <div className="h-10 w-10 rounded-xl bg-[#161A29] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white">
                      <span className="text-slate-400 font-mono">{cat.count}</span>
                      <ArrowUpRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* ASCEND STATS GRID */}
        {/* ================================================== */}
        <section aria-label="Platform Statistics" className="py-10 md:py-12 border-y border-white/10 my-8 md:my-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.subtitle}
                className="bg-[#0F121E]/80 border border-white/10 rounded-[28px] p-6 sm:p-7 text-center flex flex-col items-center justify-center shadow-xl backdrop-blur-md hover:border-indigo-500/30 transition-all duration-300"
              >
                <span className="text-xs font-mono text-indigo-400 font-extrabold mb-1.5">
                  0{idx + 1}
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {stat.title}
                </h3>
                <p className="mt-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-slate-400">
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
          className="py-10 md:py-14 border-b border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
                <span className="text-slate-400 font-mono">[02]</span>
                Featured Catalog
              </div>
              <h2
                id="popular-courses-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                Popular Courses
              </h2>
              <p className="mt-2.5 text-slate-400 max-w-2xl text-base font-normal leading-relaxed">
                Direct access to core academic programs and branches searched most frequently by students.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 hover:text-indigo-400 transition-colors group"
            >
              All Programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-indigo-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.course} {...program} />
            ))}

            {/* Explore All Card */}
            <Link href="/programs" className="block h-full group">
              <div className="rounded-[28px] border border-dashed border-white/10 bg-[#0F121E]/60 p-6 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between text-center h-full min-h-[190px]">
                <div className="flex flex-col items-center pt-2">
                  <div className="h-11 w-11 rounded-xl bg-[#161A29] border border-white/10 flex items-center justify-center text-indigo-400 mb-3">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                    View All Courses
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 font-normal leading-relaxed">
                    Browse every branch and semester available in Student Hub.
                  </p>
                </div>

                <span className="inline-flex h-11 items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white rounded-full px-6 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 mt-5 w-full cursor-pointer shadow-lg shadow-indigo-500/20">
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
        <section aria-labelledby="recently-opened-heading" className="py-10 md:py-14">
          <div className="mb-6 md:mb-8">
            <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
              <span className="text-slate-400 font-mono">[04]</span>
              Personal Workspace
            </div>
            <h2
              id="recently-opened-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Recently Opened
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl text-base font-normal leading-relaxed">
              Quick access to study materials and documents you reviewed recently.
            </p>
          </div>
          <div className="rounded-[28px] border border-dashed border-white/10 bg-[#0F121E]/60 p-8 md:p-10 text-center shadow-xl">
            <p className="text-slate-400 font-bold text-sm">
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


