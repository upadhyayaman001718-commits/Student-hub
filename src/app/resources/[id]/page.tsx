import { resources } from "@/shared/data/resources";
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

    const resource = resources.find(
        (item) => item.id === Number(id)
    );

    if (!resource) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Resource not found.
            </div>
        );



    }

    return (
        <div className="min-h-screen flex flex-col bg-[#09090B] text-white">
            <Navbar />

            <Breadcrumb
                program={resource.program}
                programSlug={resource.programSlug}
                resourceTitle={resource.title}
            />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-20">
                <ResourceDetails resource={resource} />
                <section className="mt-20">



                </section>
            </main>

            <Footer />
        </div>
    );
}