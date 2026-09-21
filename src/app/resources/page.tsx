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
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 sm:px-10 lg:px-12 py-12 sm:py-16 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0F121E] border border-white/10 px-4 py-1 text-[11px] font-mono font-extrabold tracking-[0.2em] uppercase text-indigo-400 shadow-xl shadow-indigo-950/20">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Academic Catalog
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Study Resources</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg font-normal leading-relaxed">
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

