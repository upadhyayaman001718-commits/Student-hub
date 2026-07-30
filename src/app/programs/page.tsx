import { programs } from "@/shared/data/programs";
import ProgramCard from "@/shared/components/programs/ProgramCard";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white selection:bg-[#0EA5E9]/30 selection:text-white relative">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-24 w-full relative z-10">
        {/* Background glow decorator */}
        <div className="absolute top-0 right-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-[#0EA5E9]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="mb-12">
          <h1 className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2]">
            All Programs
          </h1>

          <p className="mt-4 text-zinc-400 text-[18px] font-medium leading-relaxed max-w-2xl">
            Browse all available academic programs and find lecture notes, previous papers, and laboratory documents.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
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