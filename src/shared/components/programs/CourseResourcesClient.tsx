"use client";

import React, { useState } from "react";
import { Resource } from "@/shared/data/resources";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import Container from "@/shared/components/layout/Container";
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
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedType, setSelectedType]     = useState<"Notes" | "PYQ" | "Lab Manual" | null>(null);

  const courseResources = resources.filter((resource) => {
    if (!resource.course) return false;
    const resCourse    = resource.course.trim().toLowerCase();
    const targetCourse = courseName.trim().toLowerCase();
    const targetSlug   = slug.trim().toLowerCase();
    return (
      resCourse === targetCourse ||
      resCourse === targetSlug ||
      resCourse.replace(/\s+/g, "-") === targetSlug ||
      targetSlug.replace(/-/g, " ") === resCourse
    );
  });

  const filteredResources = courseResources.filter((resource) => {
    const matchesSearch = searchQuery
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesSemester = selectedSemester !== null
      ? resource.semester === selectedSemester : true;
    const matchesType = selectedType !== null
      ? (resource.resourceType === selectedType || resource.type === selectedType)
      : true;
    return matchesSearch && matchesSemester && matchesType;
  });

  return (
    <div className="flex flex-col bg-[#080A12] text-slate-100
                    selection:bg-indigo-500/25 selection:text-indigo-200">
      <div aria-hidden="true" className="fixed inset-0 bg-grid pointer-events-none -z-10" />
      <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[400px] glow-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <Container>
          <CourseHeader
            courseName={courseName}
            programName={programName}
            resourceCount={courseResources.length}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Filters */}
            <div className="lg:col-span-1">
              <FilterBar
                selectedSemester={selectedSemester}
                onSemesterChange={setSelectedSemester}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />
            </div>

            {/* Search + Grid */}
            <div className="lg:col-span-3 space-y-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              {filteredResources.length > 0 ? (
                <ResourceGrid resources={filteredResources} />
              ) : (
                <EmptyState
                  title="No resources match filters"
                  description="Try clearing your search, selecting a different semester, or adjusting your filters."
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
        </Container>
      </main>

      <Footer />
    </div>
  );
}
