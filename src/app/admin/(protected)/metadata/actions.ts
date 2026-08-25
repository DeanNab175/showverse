"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pageMetadataSchema, type PageMetadataInput } from "@/lib/schemas/metadata-schema";

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  skills: "/skills",
  portfolio: "/portfolio",
  contact: "/contact",
};

export async function updatePageMetadata(
  pageKey: string,
  _prevState: unknown,
  data: PageMetadataInput
) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const parsed = pageMetadataSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.pageMetadata.upsert({
    where: { pageKey },
    update: parsed.data,
    create: { pageKey, ...parsed.data },
  });

  const path = PAGE_PATHS[pageKey];
  if (path) revalidatePath(path);
  revalidatePath("/admin/metadata");
  redirect("/admin/metadata");
}
