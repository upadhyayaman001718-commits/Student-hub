export interface Resource {
    id: number;
    course: string;
    semester: number;
    subject: string;
    title: string;
    type: "Notes" | "PYQ" | "Lab Manual";
    uploadedBy: string;
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
    },
    {
        id: 2,
        course: "computer-science",
        semester: 4,
        subject: "DBMS",
        title: "DBMS PYQs",
        type: "PYQ",
        uploadedBy: "Rahul",
    },
    {
        id: 3,
        course: "ai-ml",
        semester: 1,
        subject: "Introduction to AI",
        title: "AI",
        type: "Notes",
        uploadedBy: "Adi"
    }

];