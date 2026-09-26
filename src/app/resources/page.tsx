import { getResources } from "@/lib/api";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
import ResourceDiscovery from "@/shared/components/resources/ResourceDiscovery";
import { Resource } from "@/shared/data/resources";

export default async function ResourcesPage() {
  let resources: Resource[] = [];
  try {
    const response = await getResources();
    resources = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch resources for /resources page:", error);
  }

  return (
    <div className="flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <Container>
            {/* Header */}
            <div className="max-w-2xl mb-14">
              <p className="section-label mb-3">
                <span className="text-slate-600">[—]</span>
                Academic Catalog
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                Discover{" "}
                <span className="text-gradient-vivid">Study Resources</span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Browse, search, and filter verified lecture notes, previous year questions,
                and lab manuals across all courses and semesters.
              </p>
            </div>

            <ResourceDiscovery resources={resources} />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
