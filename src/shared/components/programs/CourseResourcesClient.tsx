"use client";

import React, { useState } from "react";
import { Resource } from "@/shared/data/resources";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import CourseHeader from "@/shared/components/programs/CourseHeader";
import SearchBar from "@/shared/components/navigation/SearchBar";
import FilterBar from "@/shared/components/navigation/FilterBar";
import ResourceGrid from "@/shared/components/resources/ResourceGrid";
import EmptyState from "@/shared/components/programs/EmptyState";

interface CourseResourcesClientProps {
  slug: string;
  courseName: string;
  programName: string;
  resources: Resource[];
}

export default function CourseResourcesClient({
  slug,
  courseName,
  programName,
  resources,
}: CourseResourcesClientProps) {
  // States for search and filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"Notes" | "PYQ" | "Lab Manual" | null>(null);

  // Filter backend resources by comparing resource.course against actual course name (programObj.course / courseName) or slug
  const courseResources = resources.filter((resource) => {
    if (!resource.course) return false;
    const resCourse = resource.course.trim().toLowerCase();
    const targetCourse = courseName.trim().toLowerCase();
    const targetSlug = slug.trim().toLowerCase();

    return (
      resCourse === targetCourse ||
      resCourse === targetSlug ||
      resCourse.replace(/\s+/g, "-") === targetSlug ||
      targetSlug.replace(/-/g, " ") === resCourse
    );
  });

  // Apply stateful search/filter constraints on course resources
  const filteredResources = courseResources.filter((resource) => {
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesSemester = selectedSemester !== null ? resource.semester === selectedSemester : true;
    const matchesType = selectedType !== null
      ? (resource.resourceType === selectedType || resource.type === selectedType)
      : true;
    return matchesSearch && matchesSemester && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-mesh opacity-50 pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-0" />

      <Navbar />

      <main className="flex-grow max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16 w-full relative z-10">
        <CourseHeader
          courseName={courseName}
          programName={programName}
          resourceCount={courseResources.length}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left panel: Filters */}
          <div className="lg:col-span-1">
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

