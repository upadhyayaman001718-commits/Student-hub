import Link from "next/link";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";

interface BreadcrumbProps {
  program: string;
  resourceTitle: string;
  programSlug: string;
}

export default function Breadcrumb({
  program,
  resourceTitle,
  programSlug,
}: BreadcrumbProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <Link
        href={`/programs/${programSlug}`}
        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#666666] hover:text-[#B15F2C] transition-all hover:-translate-x-1 w-fit group cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#B15F2C]" />
        Back to Resources
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666] bg-white border border-[#E2E0DB] px-4 py-2.5 rounded-full w-fit shadow-2xs">
        <Link href="/" className="hover:text-[#0A0A0A] transition flex items-center gap-1">
          <Home className="h-3.5 w-3.5 text-[#B15F2C]" />
          <span>Home</span>
        </Link>

        <ChevronRight className="h-3.5 w-3.5 text-[#E2E0DB]" />

        <Link href="/programs" className="hover:text-[#0A0A0A] transition font-medium">
          <span>Programs</span>
        </Link>

        <ChevronRight className="h-3.5 w-3.5 text-[#E2E0DB]" />

        <Link href={`/programs/${programSlug}`} className="hover:text-[#0A0A0A] transition font-medium">
          <span>{program}</span>
        </Link>

        <ChevronRight className="h-3.5 w-3.5 text-[#E2E0DB]" />

        <span className="text-[#0A0A0A] font-extrabold truncate max-w-[200px] sm:max-w-[300px]">
          {resourceTitle}
        </span>
      </div>
    </div>
  );
}