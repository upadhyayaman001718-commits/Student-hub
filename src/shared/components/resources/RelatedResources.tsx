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
    <section className="mt-20 border-t border-white/10 pt-16">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-indigo-400" />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Related Resources
        </h2>
      </div>

      <p className="text-slate-400 text-sm sm:text-base max-w-xl font-normal">
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