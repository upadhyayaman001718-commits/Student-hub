import UploadForm from "@/shared/components/upload/UploadForm";
import UploadTips from "@/shared/components/upload/UploadTips";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white selection:bg-[#0EA5E9]/30 selection:text-white relative">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-24 w-full relative z-10">
        {/* Background glow decorations */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-[#0EA5E9]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="mb-12">
          <h1 className="text-[40px] font-extrabold tracking-tight text-white leading-[1.2]">
            Upload Resource
          </h1>
          <p className="mt-4 text-[18px] text-zinc-400 font-medium leading-relaxed max-w-2xl">
            Contribute study notes, questions, or manuals to help other students succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12">
          {/* Upload Form on Left */}
          <div className="lg:col-span-7 bg-[#18181B]/40 border border-white/5 p-6 md:p-8 rounded-[16px] shadow-xl">
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