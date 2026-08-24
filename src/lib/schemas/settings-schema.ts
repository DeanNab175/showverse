import { z } from "zod";

export const siteSettingsSchema = z.object({
  contactEmail: z.string().trim().email("Enter a valid email").or(z.literal("")),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
