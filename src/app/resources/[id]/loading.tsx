import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-16 space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-10 w-48 bg-[#0F121E] border border-white/10 rounded-full" />

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Panel */}
          <div className="lg:col-span-1 rounded-3xl border border-white/10 bg-[#0F121E]/80 p-8 space-y-6">
            <div className="h-6 w-24 bg-[#161A29] rounded-full" />
            <div className="h-8 w-3/4 bg-[#161A29] rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-[#161A29] rounded-2xl" />
              <div className="h-16 bg-[#161A29] rounded-2xl" />
              <div className="h-16 bg-[#161A29] rounded-2xl" />
              <div className="h-16 bg-[#161A29] rounded-2xl" />
            </div>
            <div className="h-13 bg-[#161A29] rounded-full" />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-36 bg-[#0F121E] border border-white/10 rounded-full" />
            <div className="h-[640px] rounded-3xl border border-white/10 bg-[#0F121E]/80" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
