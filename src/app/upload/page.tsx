import UploadForm from "@/shared/components/upload/UploadForm";
import UploadTips from "@/shared/components/upload/UploadTips";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200 relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8
                       py-10 sm:py-14 w-full relative z-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full
                          bg-indigo-500/8 border border-indigo-500/15
                          px-3.5 py-1 label-mono text-indigo-400 mb-4">
            <UploadCloud className="h-3 w-3" />
            Community Contributions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
            Upload a Resource
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
            Contribute notes, previous year papers, or lab manuals to help students across programmes.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form */}
          <div className="lg:col-span-7 glass-light rounded-2xl p-6 sm:p-8 border border-white/[0.07]">
            <UploadForm />
          </div>

          {/* Tips */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <UploadTips />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
