"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { socialLinkSchema, type SocialLinkInput } from "@/lib/schemas/social-link-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function createSocialLink(_prevState: unknown, data: SocialLinkInput) {
  await requireAuth();

  const parsed = socialLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.socialMediaLink.aggregate({
    _max: { sortOrder: true },
  });

  await prisma.socialMediaLink.create({
    data: {
      ...parsed.data,
      hoverColorClass: parsed.data.hoverColorClass || null,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: string, _prevState: unknown, data: SocialLinkInput) {
  await requireAuth();

  const parsed = socialLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.socialMediaLink.update({
    where: { id },
    data: {
      ...parsed.data,
      hoverColorClass: parsed.data.hoverColorClass || null,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function deleteSocialLink(id: string) {
  await requireAuth();

  await prisma.socialMediaLink.delete({ where: { id } });

  revalidatePath("/", "layout");
  revalidatePath("/admin/social-links");
}
