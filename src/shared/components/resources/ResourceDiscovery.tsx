"use client";

import { useState, useMemo } from "react";
import { Resource } from "@/shared/data/resources";
import ResourceSearch from "./ResourceSearch";
import ResourceFilters from "./ResourceFilters";
import ResourceList from "./ResourceList";
import EmptyState from "@/shared/components/programs/EmptyState";
import { Layers } from "lucide-react";

interface ResourceDiscoveryProps {
  resources: Resource[];
  title?: string;
  description?: string;
}

export default function ResourceDiscovery({ resources = [] }: ResourceDiscoveryProps) {
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedProgram, setSelectedProgram]   = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [selectedType, setSelectedType]         = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject]   = useState<string | null>(null);

  const availablePrograms = useMemo(() => {
    const s = new Set<string>();
    resources.forEach((r) => { if (r.program) s.add(r.program); });
    return Array.from(s).sort();
  }, [resources]);

  const availableSemesters = useMemo(() => {
    const s = new Set<number>();
    resources.forEach((r) => { if (r.semester) s.add(r.semester); });
    return Array.from(s).sort((a, b) => a - b);
  }, [resources]);

  const availableTypes = useMemo(() => {
    const s = new Set<string>();
    resources.forEach((r) => { const t = r.resourceType || r.type; if (t) s.add(t); });
    return Array.from(s).sort();
  }, [resources]);

  const availableSubjects = useMemo(() => {
    const s = new Set<string>();
    resources.forEach((r) => { if (r.subject) s.add(r.subject); });
    return Array.from(s).sort();
  }, [resources]);

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources.filter((r) => {
      if (q) {
        const resType = (r.resourceType || r.type || "").toLowerCase();
        const hits =
          r.title?.toLowerCase().includes(q) ||
          r.subject?.toLowerCase().includes(q) ||
          r.course?.toLowerCase().includes(q) ||
          r.program?.toLowerCase().includes(q) ||
          resType.includes(q);
        if (!hits) return false;
      }
      if (selectedProgram  !== null && r.program !== selectedProgram)          return false;
      if (selectedSemester !== null && r.semester !== selectedSemester)        return false;
      if (selectedType     !== null && (r.resourceType || r.type) !== selectedType) return false;
      if (selectedSubject  !== null && r.subject !== selectedSubject)          return false;
      return true;
    });
  }, [resources, searchQuery, selectedProgram, selectedSemester, selectedType, selectedSubject]);

  const activeFilterCount =
    (selectedProgram  ? 1 : 0) +
    (selectedSemester !== null ? 1 : 0) +
    (selectedType     ? 1 : 0) +
    (selectedSubject  ? 1 : 0);

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
        description="There are currently no resources in the library. Be the first to upload study material!"
        actionLabel="Upload Resource"
        actionHref="/upload"
      />
    );
  }

  return (
    <section className="w-full space-y-6">
      {/* Search bar */}
      <ResourceSearch
        value={searchQuery}
        onChange={setSearchQuery}
        totalResults={filteredResources.length}
      />

      {/* Layout: Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
        {/* Filters sidebar */}
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

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Status bar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              Showing{" "}
              <span className="text-white font-bold">{filteredResources.length}</span>
              {" "}of{" "}
              <span className="text-white font-bold">{resources.length}</span>
              {" "}resources
            </div>
            {activeFilterCount > 0 && (
              <span className="label-mono text-indigo-400">
                {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} active
              </span>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <ResourceList resources={filteredResources} />
          ) : (
            <EmptyState
              title="No matching resources"
              description="No study materials match your search and filter criteria. Try adjusting keywords or clearing filters."
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
