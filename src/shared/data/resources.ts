export interface Resource {
    id: number;
    title: string;
    subject: string;
    semester: number;
    program?: string | null;
    course?: string | null;
    resourceType?: string | null;
    fileName?: string | null;
    s3Key?: string;
    fileType?: string | null;
    type?: "Notes" | "PYQ" | "Lab Manual" | string;
    uploadedBy?: string;
    description?: string | null;
    programSlug?: string;
}

export const resources: Resource[] = [
    {
        id: 1,
        course: "computer-science",
        semester: 4,
        subject: "Operating Systems",
        title: "Operating Systems Notes",
        type: "Notes",
        uploadedBy: "Aman",
        description: "Complete handwritten notes covering Process Scheduling, Deadlocks, Memory Management and File Systems.",
        program: 'Computer Science',
        programSlug: 'computer-science',
    },
    {
        id: 2,
        course: "computer-science",
        semester: 4,
        subject: "DBMS",
        title: "DBMS PYQs",
        type: "PYQ",
        uploadedBy: "Rahul",
        description: "Previous year questions from 2018-2024 with detailed explanations.",
        program: 'Computer Science',
        programSlug: 'computer-science',
    },
    {
        id: 3,
        course: "ai-ml",
        semester: 1,
        subject: "Introduction to AI",
        title: "AI",
        type: "Notes",
        uploadedBy: "Adi",
        description: "Comprehensive coverage of AI fundamentals and latest trends.",
        program: 'Computer Science',
        programSlug: 'computer-science',
    }

];