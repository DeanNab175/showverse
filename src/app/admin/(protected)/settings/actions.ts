"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema } from "@/lib/schemas/settings-schema";

export async function updateSiteSettings(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const parsed = siteSettingsSchema.safeParse({
    contactEmail: formData.get("contactEmail"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: { contactEmail: parsed.data.contactEmail || null },
    create: { id: "singleton", contactEmail: parsed.data.contactEmail || null },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
