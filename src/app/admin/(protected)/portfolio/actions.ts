"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema, portfolioSectionSchema } from "@/lib/schemas/project-schema";
import {
  entryAnimationsArraySchema,
  scrollAnimationsArraySchema,
  parseAnimationsJson,
} from "@/lib/schemas/animations-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function updatePortfolioSection(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = portfolioSectionSchema.safeParse({
    headingText: formData.get("headingText"),
    headingLevel: formData.get("headingLevel"),
    perPage: formData.get("perPage"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const entryAnimations = parseAnimationsJson(
    formData.get("entryAnimationsJson"),
    entryAnimationsArraySchema
  );
  if (!entryAnimations.success) {
    return { error: `Entry animations: ${entryAnimations.error}` };
  }

  const scrollAnimations = parseAnimationsJson(
    formData.get("scrollAnimationsJson"),
    scrollAnimationsArraySchema
  );
  if (!scrollAnimations.success) {
    return { error: `Scroll animations: ${scrollAnimations.error}` };
  }

  await prisma.portfolioSection.update({
    where: { id: "portfolio_singleton" },
    data: {
      headingText: parsed.data.headingText || null,
      headingLevel: parsed.data.headingLevel ?? null,
      perPage: parsed.data.perPage,
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
    },
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

function parseProjectFormData(formData: FormData) {
  return projectSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    thumbnailUrl: formData.get("thumbnailUrl"),
    previewUrl: formData.get("previewUrl"),
  });
}

export async function createProject(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseProjectFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.project.aggregate({
    where: { portfolioSectionId: "portfolio_singleton" },
    _max: { sortOrder: true },
  });

  try {
    await prisma.project.create({
      data: {
        ...parsed.data,
        previewUrl: parsed.data.previewUrl || null,
        portfolioSectionId: "portfolio_singleton",
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "A project with that slug already exists" };
    }
    throw err;
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function updateProject(id: string, _prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseProjectFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: { ...parsed.data, previewUrl: parsed.data.previewUrl || null },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "A project with that slug already exists" };
    }
    throw err;
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  redirect("/admin/portfolio");
}

export async function deleteProject(id: string) {
  await requireAuth();

  await prisma.project.delete({ where: { id } });

  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}
