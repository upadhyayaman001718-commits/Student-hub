"use client";

import React, { useState } from "react";
import { resources } from "@/shared/data/resources";
import { programs } from "@/shared/data/programs";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import CourseHeader from "@/shared/components/CourseHeader";
import SearchBar from "@/shared/components/SearchBar";
import FilterBar from "@/shared/components/FilterBar";
import ResourceGrid from "@/shared/components/ResourceGrid";
import EmptyState from "@/shared/components/EmptyState";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  // React 19 unwrapping of params Promise
  const { slug } = React.use(params);

  // States for search and filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"Notes" | "PYQ" | "Lab Manual" | null>(null);

  // Find program metadata matching the slug
  const programObj = programs.find((p) => p.slug === slug);
  const courseName = programObj ? programObj.course : slug.replace(/-/g, " ");
  const programName = programObj ? programObj.program : "B.Tech";

  // Filter resources by course first
  const courseResources = resources.filter((resource) => resource.course === slug);

  // Apply stateful search/filter constraints
  const filteredResources = courseResources.filter((resource) => {
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesSemester = selectedSemester !== null ? resource.semester === selectedSemester : true;
    const matchesType = selectedType !== null ? resource.type === selectedType : true;
    return matchesSearch && matchesSemester && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-white selection:bg-[#0EA5E9]/30 selection:text-white relative">
      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-24 w-full relative z-10">
        {/* Background glow overlay */}
        <div className="absolute top-0 right-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-[#0EA5E9]/3 rounded-full blur-[100px] pointer-events-none" />

        <CourseHeader
          courseName={courseName}
          programName={programName}
          resourceCount={courseResources.length}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left panel: Filters */}
          <div className="lg:col-span-1 bg-[#18181B]/40 border border-white/5 rounded-[16px] p-6 space-y-6">
            <FilterBar
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>

          {/* Right panel: Search and Grid */}
          <div className="lg:col-span-3 space-y-8 w-full">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {filteredResources.length > 0 ? (
              <ResourceGrid resources={filteredResources} />
            ) : (
              <EmptyState
                title="No resources match filters"
                description="Try clearing your search keyword, selecting a different semester, or adjusting your filter controls."
                onReset={() => {
                  setSearchQuery("");
                  setSelectedSemester(null);
                  setSelectedType(null);
                }}
                actionLabel="Upload a Resource"
                actionHref="/upload"
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}