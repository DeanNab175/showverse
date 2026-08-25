"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  skillCategorySchema,
  skillItemSchema,
  skillsCategoriesSectionSchema,
  type SkillCategoryInput,
  type SkillItemInput,
  type SkillsCategoriesSectionInput,
} from "@/lib/schemas/skill-category-schema";
import {
  entryAnimationsArraySchema,
  scrollAnimationsArraySchema,
  parseAnimationsJson,
} from "@/lib/schemas/animations-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export interface UpdateSkillsCategoriesSectionInput extends SkillsCategoriesSectionInput {
  entryAnimationsJson: string;
  scrollAnimationsJson: string;
}

export async function updateSkillsCategoriesSection(
  _prevState: unknown,
  data: UpdateSkillsCategoriesSectionInput
) {
  await requireAuth();

  const parsed = skillsCategoriesSectionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const entryAnimations = parseAnimationsJson(
    data.entryAnimationsJson,
    entryAnimationsArraySchema
  );
  if (!entryAnimations.success) {
    return { error: `Entry animations: ${entryAnimations.error}` };
  }

  const scrollAnimations = parseAnimationsJson(
    data.scrollAnimationsJson,
    scrollAnimationsArraySchema
  );
  if (!scrollAnimations.success) {
    return { error: `Scroll animations: ${scrollAnimations.error}` };
  }

  await prisma.skillsCategoriesSection.update({
    where: { id: "skills_categories_singleton" },
    data: {
      headingText: parsed.data.headingText || null,
      headingLevel: parsed.data.headingLevel ?? null,
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
    },
  });

  revalidatePath("/skills");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function createSkillCategory(_prevState: unknown, data: SkillCategoryInput) {
  await requireAuth();

  const parsed = skillCategorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.skillCategory.aggregate({
    where: { skillsCategoriesSectionId: "skills_categories_singleton" },
    _max: { sortOrder: true },
  });

  try {
    await prisma.skillCategory.create({
      data: {
        ...parsed.data,
        labelClass: parsed.data.labelClass || null,
        itemsWrapperClass: parsed.data.itemsWrapperClass || null,
        skillsCategoriesSectionId: "skills_categories_singleton",
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "A category with that slug already exists" };
    }
    throw err;
  }

  revalidatePath("/skills");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkillCategory(
  id: string,
  _prevState: unknown,
  data: SkillCategoryInput
) {
  await requireAuth();

  const parsed = skillCategorySchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await prisma.skillCategory.update({
      where: { id },
      data: {
        ...parsed.data,
        labelClass: parsed.data.labelClass || null,
        itemsWrapperClass: parsed.data.itemsWrapperClass || null,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "A category with that slug already exists" };
    }
    throw err;
  }

  revalidatePath("/skills");
  revalidatePath(`/admin/skills/${id}`);
  redirect(`/admin/skills/${id}`);
}

export async function deleteSkillCategory(id: string) {
  await requireAuth();

  await prisma.skillCategory.delete({ where: { id } });

  revalidatePath("/skills");
  revalidatePath("/admin/skills");
}

export async function createSkillItem(
  categoryId: string,
  _prevState: unknown,
  data: SkillItemInput
) {
  await requireAuth();

  const parsed = skillItemSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.skillItem.aggregate({
    where: { skillCategoryId: categoryId },
    _max: { sortOrder: true },
  });

  await prisma.skillItem.create({
    data: {
      ...parsed.data,
      skillCategoryId: categoryId,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/skills");
  revalidatePath(`/admin/skills/${categoryId}`);
  redirect(`/admin/skills/${categoryId}`);
}

export async function updateSkillItem(
  categoryId: string,
  id: string,
  _prevState: unknown,
  data: SkillItemInput
) {
  await requireAuth();

  const parsed = skillItemSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.skillItem.update({ where: { id }, data: parsed.data });

  revalidatePath("/skills");
  revalidatePath(`/admin/skills/${categoryId}`);
  redirect(`/admin/skills/${categoryId}`);
}

export async function deleteSkillItem(categoryId: string, id: string) {
  await requireAuth();

  await prisma.skillItem.delete({ where: { id } });

  revalidatePath("/skills");
  revalidatePath(`/admin/skills/${categoryId}`);
}
