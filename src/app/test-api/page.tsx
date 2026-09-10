"use client";

import { useEffect, useState } from "react";
import { getResources } from "@/lib/api";

export default function TestApiPage() {
    const [resources, setResources] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadResources = async () => {
            try {
                const data = await getResources();

                console.log("Backend response:", data);

                setResources(data.data);
            } catch (error) {
                console.error(error);
                setError("Failed to connect to backend");
            }
        };

        loadResources();
    }, []);

    return (
        <div>
            <h1>API Connection Test</h1>

            {error && <p>{error}</p>}

            {resources.map((resource) => (
                <div key={resource.id}>
                    <p>{resource.title}</p>
                    <p>{resource.subject}</p>
                </div>
            ))}
        </div>
    );
}