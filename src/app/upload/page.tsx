import UploadForm from "@/shared/components/upload/UploadForm";
import UploadTips from "@/shared/components/upload/UploadTips";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-20 w-full relative z-10">
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-[11px] font-mono font-extrabold tracking-[0.15em] uppercase text-indigo-400 shadow-none">
            <UploadCloud className="h-4 w-4 text-indigo-400" />
            Community Contributions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Upload Resource
          </h1>
          <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
            Contribute study notes, previous year question papers, or lab manuals to help other students succeed across programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-8">
          {/* Upload Form on Left */}
          <div className="lg:col-span-7 bg-[#0F121E]/80 border border-white/10 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl">
            <UploadForm />
          </div>

          {/* Guidelines on Right */}
          <div className="lg:col-span-5">
            <UploadTips />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}