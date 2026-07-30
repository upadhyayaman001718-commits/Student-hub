export interface Resource {
    programSlug: string;
    program: string;
    id: number;
    course: string;
    semester: number;
    subject: string;
    title: string;
    type: "Notes" | "PYQ" | "Lab Manual";
    uploadedBy: string;
    description: string;
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