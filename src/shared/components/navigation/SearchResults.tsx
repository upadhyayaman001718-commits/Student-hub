import RecentlyUploadedCard from "@/shared/components/programs/RecentlyUploadedCard";
import { Sparkles, SearchX } from "lucide-react";

type Resource = {
  title: string;
  sub: string;
  program: string;
  course: string;
  sem: number;
};

type SearchResultsProps = {
  resources: Resource[];
};

export default function SearchResults({ resources }: SearchResultsProps) {
  return (
    <section className="mt-10 mb-6 w-full animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-[#B15F2C]" />
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A0A0A]">
          Search Results ({resources.length})
        </h2>
      </div>

      {resources.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#E2E0DB] bg-white p-12 text-center flex flex-col items-center justify-center gap-3 shadow-2xs">
          <SearchX className="h-10 w-10 text-[#666666]/60" />
          <p className="text-[#0A0A0A] font-bold text-lg">
            No resources found matching your search.
          </p>
          <p className="text-[#666666] text-sm max-w-sm">
            Try searching for a different subject code, course name, or keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <RecentlyUploadedCard
              key={resource.title}
              {...resource}
            />
          ))}
        </div>
      )}
    </section>
  );
}