"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RecentlyUploadedCard from "@/shared/components/programs/RecentlyUploadedCard";
import SearchBar from "@/shared/components/navigation/SearchBar";
import SearchResults from "@/shared/components/navigation/SearchResults";

interface Resource {
    id: number;
    title: string;
    subject: string;
    semester: number;
    fileType?: string | null;
}

interface RecentlyUploadedSectionProps {
    resources: Resource[];
}

export default function RecentlyUploadedSection({
    resources,
}: RecentlyUploadedSectionProps) {
    const [search, setSearch] = useState("");

    const filteredResources = resources.filter((resource) =>
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.subject.toLowerCase().includes(search.toLowerCase()) ||
        resource.fileType?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section
            aria-labelledby="recently-uploaded-heading"
            className="py-16 border-b border-[#E2E0DB]"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#B15F2C] mb-2 flex items-center gap-2">
                        <span className="text-[#0A0A0A] font-mono">[03]</span>
                        Community Submissions
                    </div>

                    <h2
                        id="recently-uploaded-heading"
                        className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A] leading-tight"
                    >
                        Recently Uploaded
                    </h2>

                    <p className="mt-3 text-[#666666] max-w-2xl text-base font-normal leading-relaxed">
                        Fresh study materials uploaded by members of our student community across semesters.
                    </p>
                </div>

                <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] hover:text-[#B15F2C] transition-colors group"
                >
                    Browse All
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-[#B15F2C]" />
                </Link>
            </div>

            <div className="mb-8">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search recently uploaded resources..."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredResources.map((resource) => (

                    <Link
                        key={resource.id}
                        href={`/resources/${resource.id}`}
                    >
                        <RecentlyUploadedCard
                            key={resource.id}
                            title={resource.title}
                            sub={resource.subject}
                            program=""
                            course=""
                            sem={resource.semester}
                            filetype={resource.fileType || undefined}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}