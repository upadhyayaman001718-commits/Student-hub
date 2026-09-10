import { getResourceById, getResources } from "@/lib/api";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import ResourceDetails from "@/shared/components/resources/ResourceDetails";
import Breadcrumb from "@/shared/components/navigation/Breadcrumb";
import RelatedResources from "@/shared/components/resources/RelatedResources";

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResourcePage({
  params,
}: ResourcePageProps) {
  const { id } = await params;

  const response = await getResourceById(id);
  const resource = response.data;

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F0EE] text-[#0A0A0A] font-bold text-lg">
        Resource not found.
      </div>
    );
  }

  const allResourcesResponse = await getResources();
  const allResources = allResourcesResponse.data;

  const related = allResources.filter(
    (item: any) =>
      item.subject === resource.subject &&
      item.id !== resource.id
  );


  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0EE] text-[#0A0A0A] selection:bg-[#B15F2C]/20 selection:text-[#B15F2C] relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-12 py-10 sm:py-16 relative z-10">
        <Breadcrumb
          program={resource.program || "Computer Science"}
          programSlug={resource.programSlug || "computer-science"}
          resourceTitle={resource.title}
        />

        <ResourceDetails resource={resource}
          resourceId={resource.id} />

        <RelatedResources resources={related} />
      </main>

      <Footer />
    </div>
  );
}
