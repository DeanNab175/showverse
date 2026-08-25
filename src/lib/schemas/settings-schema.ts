import { z } from "zod";

import { CSS_COLOR_PATTERN, THEME_COLOR_FIELDS } from "@/lib/theme-settings";

const colorField = z
  .string()
  .trim()
  .regex(CSS_COLOR_PATTERN, "Enter a valid CSS colour, e.g. #c0eb6a")
  .or(z.literal(""));

const themeColorFields = Object.fromEntries(
  THEME_COLOR_FIELDS.map((field) => [field.key, colorField])
) as Record<(typeof THEME_COLOR_FIELDS)[number]["key"], typeof colorField>;

export const siteSettingsSchema = z.object({
  contactEmail: z.string().trim().email("Enter a valid email").or(z.literal("")),
  ...themeColorFields,
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
