import { getResourceById, getResources } from "@/lib/api";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
import ResourceDetails from "@/shared/components/resources/ResourceDetails";
import Breadcrumb from "@/shared/components/navigation/Breadcrumb";
import RelatedResources from "@/shared/components/resources/RelatedResources";
import EmptyState from "@/shared/components/programs/EmptyState";
import { Resource } from "@/shared/data/resources";

interface ResourcePageProps {
  params: Promise<{ id: string }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;

  let resource: Resource | null = null;
  let allResources: Resource[] = [];

  try {
    const response = await getResourceById(id);
    resource = response?.data || null;
  } catch (error) {
    console.error("Failed to fetch resource by ID:", error);
  }

  if (!resource) {
    return (
      <div className="flex flex-col bg-[#080A12] text-slate-100">
        <Navbar />
        <main className="flex-1 py-20">
          <Container>
            <div className="flex items-center justify-center py-20">
              <EmptyState
                title="Resource Not Found"
                description="The requested academic resource could not be found or may have been removed."
                actionLabel="Back to Resources Catalog"
                actionHref="/resources"
              />
            </div>
          </Container>
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
  }

  const related = allResources.filter(
    (item) => item.subject === resource?.subject && item.id !== resource?.id
  );

  return (
    <div className="flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[500px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <Container>
          <Breadcrumb
            program={resource.program || "Computer Science"}
            programSlug={resource.programSlug || "computer-science"}
            resourceTitle={resource.title}
          />

          <ResourceDetails resource={resource} resourceId={resource.id} />

          {related.length > 0 && (
            <div className="mt-16 md:mt-20">
              <RelatedResources resources={related} />
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
