import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

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
        <div className="mb-8">

            <Link
                href={`/programs/${programSlug}`}
                className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-500">

                <span>Programs</span>

                <ChevronRight className="h-4 w-4" />

                <span>{program}</span>

                <ChevronRight className="h-4 w-4" />

                <span className="text-white font-medium">
                    {resourceTitle}
                </span>

            </div>

        </div>
    );
}