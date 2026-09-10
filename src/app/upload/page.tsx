import UploadForm from "@/shared/components/upload/UploadForm";
import UploadTips from "@/shared/components/upload/UploadTips";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] selection:bg-[#B15F2C]/20 selection:text-[#B15F2C] relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 w-full relative z-10">
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E0DB] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#B15F2C] shadow-2xs">
            <UploadCloud className="h-3.5 w-3.5" />
            Community Contributions
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight">
            Upload Resource
          </h1>
          <p className="text-[#666666] text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
            Contribute study notes, previous year question papers, or lab manuals to help other students succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
          {/* Upload Form on Left */}
          <div className="lg:col-span-7 bg-white border border-[#E2E0DB] p-6 sm:p-10 rounded-[32px] shadow-2xs">
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