import { getResources } from "@/lib/api";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ResourceDiscovery from "@/shared/components/resources/ResourceDiscovery";
import { Resource } from "@/shared/data/resources";

export default async function ResourcesPage() {
  let resources: Resource[] = [];
  try {
    const response = await getResources();
    resources = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch resources for /resources page:", error);
    resources = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] selection:bg-[#B15F2C]/20 selection:text-[#B15F2C] relative">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 sm:px-10 lg:px-12 py-12 sm:py-16 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E0DB] px-4 py-1 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#0A0A0A] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#B15F2C] animate-pulse" />
            Academic Catalog
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
            Discover <span className="text-[#B15F2C]">Study Resources</span>
          </h1>
          <p className="text-[#666666] text-base sm:text-lg font-normal leading-relaxed">
            Browse, search, and filter verified lecture notes, previous year questions (PYQs), and lab manuals across all courses and semesters.
          </p>
        </div>

        {/* Discovery Component */}
        <ResourceDiscovery resources={resources} />
      </main>

      <Footer />
    </div>
  );
}
