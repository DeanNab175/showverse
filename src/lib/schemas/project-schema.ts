import { z } from "zod";

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  thumbnailUrl: z.string().trim().min(1, "Thumbnail is required"),
  previewUrl: z.string().trim().optional().or(z.literal("")),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const portfolioSectionSchema = z.object({
  headingText: z.string().trim().optional().or(z.literal("")),
  headingLevel: z.coerce.number().int().min(1).max(6).optional(),
  perPage: z.coerce.number().int().min(1),
});
