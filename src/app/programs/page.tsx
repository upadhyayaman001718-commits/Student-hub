import { programs } from "@/shared/data/programs";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { BookOpen } from "lucide-react";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200 relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8
                       py-10 sm:py-14 w-full relative z-10">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full
                          bg-indigo-500/8 border border-indigo-500/15
                          px-3.5 py-1 label-mono text-indigo-400 mb-4">
            <BookOpen className="h-3 w-3" />
            Academic Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            All Programmes &amp; Courses
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
            Explore degree programmes and course branches to find verified notes,
            question banks, and lab manuals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
