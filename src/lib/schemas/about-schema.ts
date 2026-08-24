import { z } from "zod";

export const aboutIntroSectionSchema = z.object({
  wrapperClass: z.string().trim().optional().or(z.literal("")),
  sectionClass: z.string().trim().optional().or(z.literal("")),
  contentWrapperClass: z.string().trim().optional().or(z.literal("")),
  headingText: z.string().trim().optional().or(z.literal("")),
  headingLevel: z.coerce.number().int().min(1).max(6).optional(),
  headingClass: z.string().trim().optional().or(z.literal("")),
  paragraphsClass: z.string().trim().optional().or(z.literal("")),
  experiencesWrapperClass: z.string().trim().optional().or(z.literal("")),
  hobbyHeadingText: z.string().trim().optional().or(z.literal("")),
  hobbyHeadingLevel: z.coerce.number().int().min(1).max(6).optional(),
  hobbyHeadingClass: z.string().trim().optional().or(z.literal("")),
  ctaLabel: z.string().trim().optional().or(z.literal("")),
  ctaVariant: z.string().trim().optional().or(z.literal("")),
  ctaIconClass: z.string().trim().optional().or(z.literal("")),
  ctaWrapperClass: z.string().trim().optional().or(z.literal("")),
  // Rendered as the image wrapper's literal DOM id - entryAnimations
  // selectors (e.g. "#about-image") target it directly, same caveat as
  // SkillCategory.slug / HomeSection's image wrapper id.
  imageWrapperId: z.string().trim().optional().or(z.literal("")),
  imageWrapperClass: z.string().trim().optional().or(z.literal("")),
  isIllustration: z.boolean(),
  illustrationHtml: z.string().trim().optional().or(z.literal("")),
  illustrationClass: z.string().trim().optional().or(z.literal("")),
  imagePath: z.string().trim().min(1, "Image is required"),
});

export type AboutIntroSectionInput = z.infer<typeof aboutIntroSectionSchema>;

export const aboutHireBannerSectionSchema = z.object({
  wrapperClass: z.string().trim().optional().or(z.literal("")),
  sectionClass: z.string().trim().optional().or(z.literal("")),
  contentWrapperClass: z.string().trim().optional().or(z.literal("")),
  headingText: z.string().trim().optional().or(z.literal("")),
  headingLevel: z.coerce.number().int().min(1).max(6).optional(),
  headingClass: z.string().trim().optional().or(z.literal("")),
  paragraphsClass: z.string().trim().optional().or(z.literal("")),
  ctaLabel: z.string().trim().optional().or(z.literal("")),
  ctaVariant: z.string().trim().optional().or(z.literal("")),
  ctaWrapperClass: z.string().trim().optional().or(z.literal("")),
  ctaColumnClass: z.string().trim().optional().or(z.literal("")),
});

export type AboutHireBannerSectionInput = z.infer<typeof aboutHireBannerSectionSchema>;

export const experienceSchema = z.object({
  total: z.coerce.number().int().min(0, "Total must be a non-negative number"),
  description: z.string().trim().min(1, "Description is required"),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const hobbySchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  iconClass: z.string().trim().min(1, "Icon class is required"),
});

export type HobbyInput = z.infer<typeof hobbySchema>;

export function parseParagraphsBodyJson(raw: FormDataEntryValue | null) {
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(typeof raw === "string" && raw.trim() ? raw : "[]");
  } catch {
    return { success: false as const, error: "Invalid JSON" };
  }

  const result = z.array(z.string()).safeParse(parsedJson);
  if (!result.success) {
    return {
      success: false as const,
      error: result.error.issues[0]?.message ?? "Invalid paragraphs",
    };
  }

  return { success: true as const, data: result.data };
}
