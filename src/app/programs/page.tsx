import { programs } from "@/shared/data/programs";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { BookOpen } from "lucide-react";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-20 w-full relative z-10">
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[11px] font-mono font-extrabold tracking-[0.15em] uppercase text-indigo-400 shadow-none">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Academic Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            All Programs & Courses
          </h1>

          <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
            Explore degree programs and course branches to locate verified lecture notes, question banks, and practical lab manuals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {programs.map((program) => (
            <ProgramCard
              key={program.course}
              course={program.course}
              program={program.program}
              slug={program.slug}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}