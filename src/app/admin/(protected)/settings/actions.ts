"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/schemas/settings-schema";
import { THEME_COLOR_FIELDS } from "@/lib/theme-settings";

export async function updateSiteSettings(_prevState: unknown, data: SiteSettingsInput) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const parsed = siteSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // An emptied field resets to the globals.css default: null means nothing is
  // injected, so the var() fallback applies.
  const values = {
    contactEmail: parsed.data.contactEmail || null,
    ...Object.fromEntries(
      THEME_COLOR_FIELDS.map((field) => [field.key, parsed.data[field.key] || null])
    ),
  };

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: values,
    create: { id: "singleton", ...values },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
