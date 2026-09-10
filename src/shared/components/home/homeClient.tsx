"use client";

import { useState } from "react";
import SearchBar from "@/shared/components/navigation/SearchBar";
import SearchResults from "@/shared/components/navigation/SearchResults";

interface HomeClientProps {
    resources: any[];
}

export default function HomeClient({ resources }: HomeClientProps) {
    const [search, setSearch] = useState("");

    const filteredResources = resources.filter(
        (resource) =>
            resource.title.toLowerCase().includes(search.toLowerCase()) ||
            resource.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search study resources, DBMS, Operating Systems, PYQs..."
            />

            {search.trim() !== "" && (
                <div className="w-full mt-10 animate-in fade-in duration-300">
                    <SearchResults resources={filteredResources} />
                </div>
            )}
        </>
    );
}