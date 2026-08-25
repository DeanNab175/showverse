import { z } from "zod";

export const serviceSchema = z.object({
  iconClass: z.string().trim().min(1, "Icon class is required"),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const servicesSectionSchema = z.object({
  headingText: z.string().trim().optional().or(z.literal("")),
  headingLevel: z.coerce.number().int().min(1).max(6).optional(),
  servicesWrapperClass: z.string().trim().optional().or(z.literal("")),
});

export type ServicesSectionInput = z.infer<typeof servicesSectionSchema>;
