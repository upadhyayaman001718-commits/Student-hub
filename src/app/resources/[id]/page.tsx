import { getResourceById, getResources } from "@/lib/api";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ResourceDetails from "@/shared/components/resources/ResourceDetails";
import Breadcrumb from "@/shared/components/navigation/Breadcrumb";
import RelatedResources from "@/shared/components/resources/RelatedResources";
import EmptyState from "@/shared/components/programs/EmptyState";
import { Resource } from "@/shared/data/resources";

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResourcePage({
  params,
}: ResourcePageProps) {
  const { id } = await params;

  let resource: Resource | null = null;
  let allResources: Resource[] = [];

  try {
    const response = await getResourceById(id);
    resource = response?.data || null;
  } catch (error) {
    console.error("Failed to fetch resource by ID:", error);
    resource = null;
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative">
        <Navbar />
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-16 flex items-center justify-center">
          <EmptyState
            title="Resource Not Found"
            description="The requested academic resource could not be found or may have been removed."
            actionLabel="Back to Resources Catalog"
            actionHref="/resources"
          />
        </main>
        <Footer />
      </div>
    );
  }

  try {
    const allResourcesResponse = await getResources();
    allResources = allResourcesResponse?.data || [];
  } catch (error) {
    console.error("Failed to fetch related resources:", error);
    allResources = [];
  }

  const related = allResources.filter(
    (item) =>
      item.subject === resource?.subject &&
      item.id !== resource?.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-16 relative z-10">
        <Breadcrumb
          program={resource.program || "Computer Science"}
          programSlug={resource.programSlug || "computer-science"}
          resourceTitle={resource.title}
        />

        <ResourceDetails
          resource={resource}
          resourceId={resource.id}
        />

        {related.length > 0 && <RelatedResources resources={related} />}
      </main>

      <Footer />
    </div>
  );
}
