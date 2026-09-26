"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResourceDiscovery from "@/shared/components/resources/ResourceDiscovery";
import { Resource } from "@/shared/data/resources";

interface RecentlyUploadedSectionProps {
  resources: Resource[];
}

export default function RecentlyUploadedSection({ resources }: RecentlyUploadedSectionProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="section-label mb-3">
            <span className="text-slate-600">[03]</span>
            Resource Discovery &amp; Catalog
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Explore Resources
          </h2>
          <p className="mt-2 text-slate-500 text-sm max-w-md leading-relaxed">
            Browse, search and filter verified study materials uploaded by the student community.
          </p>
        </div>
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-bold shrink-0
                     text-slate-400 hover:text-indigo-400 transition-colors group"
        >
          Full Catalog
          <ArrowRight className="h-3.5 w-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <ResourceDiscovery resources={resources} />
    </div>
  );
}
