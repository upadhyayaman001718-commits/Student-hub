import Link from "next/link";
import {
  ArrowRight,
  FileText,
  HelpCircle,
  FolderArchive,
  BookMarked,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
import ProgramCard from "@/shared/components/programs/ProgramCard";
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
      count: "4,200+",
      desc: "Classroom notes, chapter summaries & handwritten sheets",
      icon: FileText,
      href: "/programs",
      color: "indigo",
    },
    {
      num: "02",
      title: "Previous Year Questions",
      count: "3,800+",
      desc: "University exam papers, answer keys & mid-term PYQs",
      icon: HelpCircle,
      href: "/programs",
      color: "emerald",
    },
    {
      num: "03",
      title: "Lab Manuals & Code",
      count: "2,400+",
      desc: "Practical manuals, experiment setups & code repos",
      icon: FolderArchive,
      href: "/programs",
      color: "cyan",
    },
    {
      num: "04",
      title: "Study Guides",
      count: "2,000+",
      desc: "Formula sheets, reference books & syllabus roadmaps",
      icon: BookMarked,
      href: "/programs",
      color: "purple",
    },
  ];

  type ColorKey = "indigo" | "emerald" | "cyan" | "purple";
  const colorMap: Record<ColorKey, { icon: string; border: string; text: string; bg: string }> = {
    indigo:  { icon: "text-indigo-400",  border: "border-indigo-500/20",  text: "text-indigo-300",  bg: "bg-indigo-500/8"  },
    emerald: { icon: "text-emerald-400", border: "border-emerald-500/20", text: "text-emerald-300", bg: "bg-emerald-500/8" },
    cyan:    { icon: "text-cyan-400",    border: "border-cyan-500/20",    text: "text-cyan-300",    bg: "bg-cyan-500/8"    },
    purple:  { icon: "text-purple-400",  border: "border-purple-500/20",  text: "text-purple-300",  bg: "bg-purple-500/8"  },
  };

  return (
    <div className="flex flex-col bg-[#080A12] text-slate-100 overflow-x-hidden
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      {/* ── Fixed background layer ── */}
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[600px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — full viewport width, content centered
      ══════════════════════════════════════════════ */}
      <HomeHero resources={resources} />

      {/* ══════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════ */}
      <section aria-label="Platform statistics" className="border-y border-white/[0.06] py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <div
                key={stat.subtitle}
                className="glass-light rounded-2xl px-6 py-6 text-center
                           hover:border-indigo-500/20 transition-colors duration-200"
              >
                <span className="label-mono text-indigo-500 block mb-2">0{idx + 1}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {stat.title}
                </h3>
                <p className="mt-1.5 label-mono text-slate-500">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          RESOURCE TYPES
      ══════════════════════════════════════════════ */}
      <section aria-labelledby="discovery-heading" className="py-20 md:py-28 border-b border-white/[0.06]">
        <Container>
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="section-label mb-3">
                <span className="text-slate-600">[01]</span>
                Discovery
              </p>
              <h2 id="discovery-heading"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Resource Types
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Find exactly what you need for exams, assignments, and lab work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {discoveryCategories.map((cat) => {
              const Icon = cat.icon;
              const c = colorMap[cat.color as ColorKey];
              return (
                <Link key={cat.title} href={cat.href} className="group block">
                  <div className={`glass-light rounded-2xl p-6 h-full border ${c.border}
                                  card-hover flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="label-mono text-slate-600">{cat.num}</span>
                        <div className={`h-10 w-10 rounded-xl ${c.bg} border ${c.border}
                                         flex items-center justify-center ${c.icon}
                                         group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>
                      <h3 className={`text-base font-bold text-white tracking-tight mb-2
                                      group-hover:${c.text} transition-colors duration-200`}>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/[0.06]
                                    flex items-center justify-between">
                      <span className="label-mono text-slate-500">{cat.count} files</span>
                      <ArrowUpRight className={`h-3.5 w-3.5 ${c.icon}
                                                group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                                transition-transform duration-200`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          POPULAR COURSES
      ══════════════════════════════════════════════ */}
      <section aria-labelledby="programs-heading" className="py-20 md:py-28 border-b border-white/[0.06]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="section-label mb-3">
                <span className="text-slate-600">[02]</span>
                Featured Catalog
              </p>
              <h2 id="programs-heading"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Popular Courses
              </h2>
              <p className="mt-2 text-slate-500 text-sm max-w-md leading-relaxed">
                Direct access to the most-searched academic programmes.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-xs font-bold shrink-0
                         text-slate-400 hover:text-indigo-400 transition-colors group"
            >
              All Programs
              <ArrowRight className="h-3.5 w-3.5 text-indigo-400
                                     group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.course} {...program} />
            ))}

            {/* Explore all card */}
            <Link href="/programs" className="block group">
              <div className="rounded-2xl border border-dashed border-white/[0.08]
                              bg-[#0C0F1C]/40 p-6 transition-all duration-200
                              hover:border-indigo-500/30 hover:-translate-y-0.5
                              hover:bg-[#111525]/60 flex flex-col items-center
                              justify-center gap-4 text-center min-h-[155px]">
                <div className="h-10 w-10 rounded-xl bg-[#111525] border border-white/[0.07]
                                flex items-center justify-center text-indigo-400">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300
                                  transition-colors">
                    View All Courses
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Browse every branch and semester.
                  </p>
                </div>
                <span className="inline-flex h-9 items-center justify-center w-full
                                  bg-gradient-to-r from-indigo-600 to-purple-600
                                  text-white rounded-full text-xs font-bold
                                  shadow-md shadow-indigo-500/15">
                  Explore Catalog →
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          UPLOAD CTA
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <Container>
          <UploadResourceSection />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          RESOURCE DISCOVERY
      ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <Container>
          <RecentlyUploadedSection resources={resources} />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          RECENTLY OPENED
      ══════════════════════════════════════════════ */}
      <section aria-labelledby="recent-heading" className="py-20 md:py-24">
        <Container>
          <p className="section-label mb-3">
            <span className="text-slate-600">[04]</span>
            Personal Workspace
          </p>
          <h2 id="recent-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Recently Opened
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-md">
            Quick access to documents you reviewed recently.
          </p>

          {/* Empty state */}
          <div className="glass-light rounded-2xl border border-dashed border-white/[0.07]
                          py-16 px-8 flex flex-col items-center gap-4 text-center max-w-md mx-auto">
            <div className="h-10 w-10 rounded-xl bg-[#111525] border border-white/[0.07]
                            flex items-center justify-center text-slate-600">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              No recently opened items in your session yet.
              <br />
              <span className="text-slate-600 text-xs">Items you open will appear here.</span>
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
