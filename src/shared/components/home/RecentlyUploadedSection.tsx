"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResourceDiscovery from "@/shared/components/resources/ResourceDiscovery";
import { Resource } from "@/shared/data/resources";

interface RecentlyUploadedSectionProps {
  resources: Resource[];
}

export default function RecentlyUploadedSection({
  resources,
}: RecentlyUploadedSectionProps) {
  return (
    <section
      aria-labelledby="recently-uploaded-heading"
      className="py-16 border-b border-white/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
            <span className="text-slate-400 font-mono">[03]</span>
            Resource Discovery & Catalog
          </div>

          <h2
            id="recently-uploaded-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Explore Resources
          </h2>

          <p className="mt-3 text-slate-400 max-w-2xl text-base font-normal leading-relaxed">
            Browse, search, and filter verified study materials uploaded by members of our student community across semesters and programs.
          </p>
        </div>

        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 hover:text-indigo-400 transition-colors group"
        >
          Browse Full Catalog
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-indigo-400" />
        </Link>
      </div>

      <ResourceDiscovery resources={resources} />
    </section>
  );
}