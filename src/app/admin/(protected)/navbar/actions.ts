"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { navbarLinkSchema } from "@/lib/schemas/navbar-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

function parseFormData(formData: FormData) {
  return navbarLinkSchema.safeParse({
    name: formData.get("name"),
    href: formData.get("href"),
    iconClass: formData.get("iconClass"),
    iconFontSizeClass: formData.get("iconFontSizeClass"),
  });
}

export async function createNavbarLink(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseFormData(formData);
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

export async function updateNavbarLink(
  id: string,
  _prevState: unknown,
  formData: FormData
) {
  await requireAuth();

  const parsed = parseFormData(formData);
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
