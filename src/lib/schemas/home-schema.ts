import { z } from "zod";

export const homeSectionSchema = z.object({
  wrapperClass: z.string().trim().optional().or(z.literal("")),
  sectionClass: z.string().trim().optional().or(z.literal("")),
  contentWrapperClass: z.string().trim().optional().or(z.literal("")),
  greetMessage: z.string().trim().min(1, "Greet message is required"),
  name: z.string().trim().min(1, "Name is required"),
  // Browsers normalize textarea line endings to CRLF on submit; normalize
  // back to LF so stored values match what renderWithLineBreaks expects.
  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .transform((v) => v.replace(/\r\n/g, "\n")),
  shortDescription: z.string().trim().min(1, "Short description is required"),
  // Rendered as the image wrapper's literal DOM id - entryAnimations
  // selectors (e.g. "#home-image") target it directly, same caveat as
  // SkillCategory.slug.
  imageWrapperId: z.string().trim().optional().or(z.literal("")),
  imageWrapperClass: z.string().trim().optional().or(z.literal("")),
  isIllustration: z.boolean(),
  illustrationHtml: z.string().trim().optional().or(z.literal("")),
  illustrationClass: z.string().trim().optional().or(z.literal("")),
  imagePath: z.string().trim().min(1, "Image is required"),
});

export type HomeSectionInput = z.infer<typeof homeSectionSchema>;

export const viewPageLinkSchema = z.object({
  url: z.string().trim().min(1, "URL is required"),
  text: z.string().trim().min(1, "Text is required"),
});

export const viewPageLinksArraySchema = z.array(viewPageLinkSchema);

export function parseViewPageLinksJson(raw: FormDataEntryValue | null) {
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(typeof raw === "string" && raw.trim() ? raw : "[]");
  } catch {
    return { success: false as const, error: "Invalid JSON" };
  }

  const result = viewPageLinksArraySchema.safeParse(parsedJson);
  if (!result.success) {
    return {
      success: false as const,
      error: result.error.issues[0]?.message ?? "Invalid view page links",
    };
  }

  return { success: true as const, data: result.data };
}
