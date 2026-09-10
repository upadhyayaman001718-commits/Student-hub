import { Resource } from "@/shared/data/resources";
import ResourceCard from "./ResourceCard";
import { Sparkles } from "lucide-react";

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
    <section className="mt-20 border-t border-[#E2E0DB] pt-16">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-[#B15F2C]" />
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0A0A0A]">
          Related Resources
        </h2>
      </div>

      <p className="text-[#666666] text-base max-w-xl font-normal">
        Explore more notes, PYQs, and study materials from the same subject.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}