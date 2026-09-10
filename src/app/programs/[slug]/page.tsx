import { getResources } from "@/lib/api";
import { programs } from "@/shared/data/programs";
import { Resource } from "@/shared/data/resources";
import CourseResourcesClient from "@/shared/components/programs/CourseResourcesClient";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  // Unwrap Next.js async params
  const { slug } = await params;

  // Fetch all resources from backend API on the server
  let resources: Resource[] = [];
  try {
    const response = await getResources();
    resources = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    resources = [];
  }

  // Find program metadata matching the slug
  const programObj = programs.find((p) => p.slug === slug);
  const courseName = programObj ? programObj.course : slug.replace(/-/g, " ");
  const programName = programObj ? programObj.program : "B.Tech";

  return (
    <CourseResourcesClient
      slug={slug}
      courseName={courseName}
      programName={programName}
      resources={resources}
    />
  );
}