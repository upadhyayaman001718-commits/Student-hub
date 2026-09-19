import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] relative">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-16 space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-10 w-48 bg-white border border-[#E2E0DB] rounded-full" />

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Panel */}
          <div className="lg:col-span-1 rounded-[28px] border border-[#E2E0DB] bg-white p-8 space-y-6">
            <div className="h-6 w-24 bg-[#F1F0EE] rounded-full" />
            <div className="h-8 w-3/4 bg-[#F1F0EE] rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-[#F1F0EE] rounded-2xl" />
              <div className="h-16 bg-[#F1F0EE] rounded-2xl" />
              <div className="h-16 bg-[#F1F0EE] rounded-2xl" />
              <div className="h-16 bg-[#F1F0EE] rounded-2xl" />
            </div>
            <div className="h-13 bg-[#F1F0EE] rounded-full" />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-36 bg-white border border-[#E2E0DB] rounded-full" />
            <div className="h-[640px] rounded-[28px] border border-[#E2E0DB] bg-white" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
