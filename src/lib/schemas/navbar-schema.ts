import { z } from "zod";

export const navbarLinkSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  href: z.string().trim().min(1, "Link is required"),
  iconClass: z.string().trim().min(1, "Icon class is required"),
  iconFontSizeClass: z.string().trim().optional().or(z.literal("")),
});

export type NavbarLinkInput = z.infer<typeof navbarLinkSchema>;
