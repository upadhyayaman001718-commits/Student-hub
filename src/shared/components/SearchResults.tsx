import RecentlyUploadedCard from "@/shared/components/RecentlyUploadedCard";

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
    <section className="mt-12 mb-6 w-full">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Search Results
      </h2>

      {resources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/8 bg-[#18181B]/30 p-10 text-center shadow-sm">
          <p className="text-zinc-500 font-semibold">
            No resources found matching your search.
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