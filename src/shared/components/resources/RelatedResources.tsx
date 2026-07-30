import { Resource } from "@/shared/data/resources";
import ResourceCard from "./ResourceCard";

interface RelatedResourcesProps {
    resources: Resource[];
}

export default function RelatedResources({
    resources,
}: RelatedResourcesProps) {
    if (resources.length === 0) {
        return null;
    }

    return (
        <section className="mt-20">

            <h2 className="text-3xl font-bold">
                Related Resources
            </h2>

            <p className="mt-2 text-zinc-400">
                Explore more resources from the same subject.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {resources.map((resource) => (

                    <ResourceCard
                        key={resource.id}
                        resource={resource}
                    />

                ))}

            </div>

        </section>
    );
}