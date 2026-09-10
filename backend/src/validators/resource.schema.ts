import { z } from "zod";

export const createResourceScheme = z.object({
    title: z.string().min(1, "Title is required"),

    subject: z.string().min(1, "Subject name is required"),

    semester: z.number().int().min(1).max(8),

    s3Key: z.string().min(1, "S3 key is required"),

    fileName: z.string().optional(),

    fileType: z.string().optional(),

    program: z.string().optional(),

    course: z.string().optional(),

    resourceType: z.string().optional(),
});

export const updateResourceScheme = createResourceScheme.partial();