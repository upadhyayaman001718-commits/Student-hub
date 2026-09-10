import { programs } from "@/shared/data/programs";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { BookOpen } from "lucide-react";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] selection:bg-[#B15F2C]/20 selection:text-[#B15F2C] relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 w-full relative z-10">
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E0DB] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#B15F2C] shadow-2xs">
            <BookOpen className="h-3.5 w-3.5" />
            Academic Catalog
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight">
            All Programs & Courses
          </h1>

          <p className="text-[#666666] text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
            Explore degree programs and course branches to locate verified lecture notes, question banks, and practical lab manuals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
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