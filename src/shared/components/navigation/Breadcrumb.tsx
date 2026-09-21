import Link from "next/link";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";

interface BreadcrumbProps {
  program: string;
  resourceTitle: string;
  programSlug: string;
  backHref?: string;
}

export default function Breadcrumb({
  program,
  resourceTitle,
  programSlug,
  backHref = "/resources",
}: BreadcrumbProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 text-left">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-all hover:-translate-x-1 w-fit group cursor-pointer"
        aria-label="Back to Resources"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-indigo-400" />
        Back to Resources
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-[#0F121E]/80 border border-white/10 px-4 py-2.5 rounded-full w-fit shadow-xl backdrop-blur-md">
        <Link href="/" className="hover:text-white transition flex items-center gap-1">
          <Home className="h-3.5 w-3.5 text-indigo-400" />
          <span>Home</span>
        </Link>

        <ChevronRight className="h-3.5 w-3.5 text-slate-600" />

        <Link href="/resources" className="hover:text-white transition font-medium">
          <span>Resources</span>
        </Link>

        {program && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href={`/programs/${programSlug || "computer-science"}`} className="hover:text-white transition font-medium">
              <span>{program}</span>
            </Link>
          </>
        )}

        <ChevronRight className="h-3.5 w-3.5 text-slate-600" />

        <span className="text-white font-extrabold truncate max-w-[200px] sm:max-w-[300px]">
          {resourceTitle}
        </span>
      </div>
    </div>
  );
}