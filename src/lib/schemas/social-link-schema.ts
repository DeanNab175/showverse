import { z } from "zod";

export const socialLinkSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  href: z.string().trim().min(1, "Link is required"),
  iconClass: z.string().trim().min(1, "Icon class is required"),
  hoverColorClass: z.string().trim().optional().or(z.literal("")),
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
