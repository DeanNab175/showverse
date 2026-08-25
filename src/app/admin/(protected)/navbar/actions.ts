"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { navbarLinkSchema, type NavbarLinkInput } from "@/lib/schemas/navbar-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function createNavbarLink(_prevState: unknown, data: NavbarLinkInput) {
  await requireAuth();

  const parsed = navbarLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.navbarLink.aggregate({
    _max: { sortOrder: true },
  });

  await prisma.navbarLink.create({
    data: {
      ...parsed.data,
      iconFontSizeClass: parsed.data.iconFontSizeClass || null,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/navbar");
  redirect("/admin/navbar");
}

export async function updateNavbarLink(id: string, _prevState: unknown, data: NavbarLinkInput) {
  await requireAuth();

  const parsed = navbarLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.navbarLink.update({
    where: { id },
    data: {
      ...parsed.data,
      iconFontSizeClass: parsed.data.iconFontSizeClass || null,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/navbar");
  redirect("/admin/navbar");
}

export async function deleteNavbarLink(id: string) {
  await requireAuth();

  await prisma.navbarLink.delete({ where: { id } });

  revalidatePath("/", "layout");
  revalidatePath("/admin/navbar");
}
