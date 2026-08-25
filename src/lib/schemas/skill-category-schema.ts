import { z } from "zod";

export const skillCategorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  labelText: z.string().trim().min(1, "Label is required"),
  labelClass: z.string().trim().optional().or(z.literal("")),
  itemsWrapperClass: z.string().trim().optional().or(z.literal("")),
});

export type SkillCategoryInput = z.infer<typeof skillCategorySchema>;

export const skillItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  iconUrl: z.string().trim().min(1, "Icon is required"),
});

export type SkillItemInput = z.infer<typeof skillItemSchema>;

export const skillsCategoriesSectionSchema = z.object({
  headingText: z.string().trim().optional().or(z.literal("")),
  headingLevel: z.coerce.number().int().min(1).max(6).optional(),
});

export type SkillsCategoriesSectionInput = z.infer<typeof skillsCategoriesSectionSchema>;
