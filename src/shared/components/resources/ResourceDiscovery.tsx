"use client";

import { useState, useMemo } from "react";
import { Resource } from "@/shared/data/resources";
import ResourceSearch from "./ResourceSearch";
import ResourceFilters from "./ResourceFilters";
import ResourceList from "./ResourceList";
import EmptyState from "@/shared/components/programs/EmptyState";
import { Sparkles, Layers } from "lucide-react";

interface ResourceDiscoveryProps {
  resources: Resource[];
  title?: string;
  description?: string;
}

export default function ResourceDiscovery({
  resources = [],
  title = "Resource Discovery",
  description = "Search, filter, and explore all verified academic study materials across programs and semesters.",
}: ResourceDiscoveryProps) {
  // Client state for search and active filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Dynamically extract filter options from available resources
  const availablePrograms = useMemo(() => {
    const set = new Set<string>();
    resources.forEach((r) => {
      if (r.program) set.add(r.program);
    });
    return Array.from(set).sort();
  }, [resources]);

  const availableSemesters = useMemo(() => {
    const set = new Set<number>();
    resources.forEach((r) => {
      if (r.semester) set.add(r.semester);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [resources]);

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    resources.forEach((r) => {
      const typeVal = r.resourceType || r.type;
      if (typeVal) set.add(typeVal);
    });
    return Array.from(set).sort();
  }, [resources]);

  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    resources.forEach((r) => {
      if (r.subject) set.add(r.subject);
    });
    return Array.from(set).sort();
  }, [resources]);

  // Combined client-side search and filtering logic
  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      // 1. Search Query Check across title, subject, course, program, resourceType/type
      if (query) {
        const matchesTitle = resource.title?.toLowerCase().includes(query) ?? false;
        const matchesSubject = resource.subject?.toLowerCase().includes(query) ?? false;
        const matchesCourse = resource.course?.toLowerCase().includes(query) ?? false;
        const matchesProgram = resource.program?.toLowerCase().includes(query) ?? false;
        const resType = (resource.resourceType || resource.type || "").toLowerCase();
        const matchesType = resType.includes(query);

        if (!matchesTitle && !matchesSubject && !matchesCourse && !matchesProgram && !matchesType) {
          return false;
        }
      }

      // 2. Program Filter Check
      if (selectedProgram !== null && resource.program !== selectedProgram) {
        return false;
      }

      // 3. Semester Filter Check
      if (selectedSemester !== null && resource.semester !== selectedSemester) {
        return false;
      }

      // 4. Resource Type Filter Check
      if (selectedType !== null) {
        const resType = resource.resourceType || resource.type;
        if (resType !== selectedType) {
          return false;
        }
      }

      // 5. Subject Filter Check
      if (selectedSubject !== null && resource.subject !== selectedSubject) {
        return false;
      }

      return true;
    });
  }, [resources, searchQuery, selectedProgram, selectedSemester, selectedType, selectedSubject]);

  const activeFilterCount =
    (selectedProgram ? 1 : 0) +
    (selectedSemester !== null ? 1 : 0) +
    (selectedType ? 1 : 0) +
    (selectedSubject ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedProgram(null);
    setSelectedSemester(null);
    setSelectedType(null);
    setSelectedSubject(null);
  };

  if (resources.length === 0) {
    return (
      <EmptyState
        title="No resources available"
        description="There are currently no resources available in the library. Be the first to upload study material!"
        actionLabel="Upload Resource"
        actionHref="/upload"
      />
    );
  }

  return (
    <section className="w-full space-y-8">
      {/* Search Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <ResourceSearch
          value={searchQuery}
          onChange={setSearchQuery}
          totalResults={filteredResources.length}
        />
      </div>

      {/* Main Layout: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Filters */}
        <div className="lg:col-span-1">
          <ResourceFilters
            selectedProgram={selectedProgram}
            onProgramChange={setSelectedProgram}
            selectedSemester={selectedSemester}
            onSemesterChange={setSelectedSemester}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            availablePrograms={availablePrograms}
            availableSemesters={availableSemesters}
            availableTypes={availableTypes}
            availableSubjects={availableSubjects}
            activeFilterCount={activeFilterCount}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Right Column: Resource Listing */}
        <div className="lg:col-span-3 space-y-6 w-full">
          {/* Active Filter Summary / Status */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-sm font-extrabold text-white">
              <Layers className="h-4 w-4 text-indigo-400" />
              Showing {filteredResources.length} of {resources.length} resources
            </div>
            {activeFilterCount > 0 && (
              <span className="text-xs font-mono font-extrabold text-indigo-400">
                {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} applied
              </span>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <ResourceList resources={filteredResources} />
          ) : (
            <EmptyState
              title="No matching resources found"
              description="No study materials match your active search and filter criteria. Try adjusting keywords or clearing applied filters."
              onReset={handleResetFilters}
              actionLabel="Upload Material"
              actionHref="/upload"
            />
          )}
        </div>
      </div>
    </section>
  );
}
