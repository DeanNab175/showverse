"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  aboutIntroSectionSchema,
  aboutHireBannerSectionSchema,
  experienceSchema,
  hobbySchema,
  parseParagraphsBodyJson,
  type AboutIntroSectionInput,
  type AboutHireBannerSectionInput,
  type ExperienceInput,
  type HobbyInput,
} from "@/lib/schemas/about-schema";
import {
  entryAnimationsArraySchema,
  scrollAnimationsArraySchema,
  parseAnimationsJson,
} from "@/lib/schemas/animations-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export interface UpdateAboutIntroSectionInput extends AboutIntroSectionInput {
  paragraphsBodyJson: string;
  entryAnimationsJson: string;
  scrollAnimationsJson: string;
}

export async function updateAboutIntroSection(
  _prevState: unknown,
  data: UpdateAboutIntroSectionInput
) {
  await requireAuth();

  const parsed = aboutIntroSectionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const paragraphsBody = parseParagraphsBodyJson(data.paragraphsBodyJson);
  if (!paragraphsBody.success) {
    return { error: `Paragraphs: ${paragraphsBody.error}` };
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

  const existing = await prisma.aboutIntroSection.findUnique({
    where: { id: "about_intro_singleton" },
  });

  const imageData = {
    wrapperId: parsed.data.imageWrapperId || null,
    wrapperClass: parsed.data.imageWrapperClass || null,
    isIllustration: parsed.data.isIllustration,
    illustrationHtml: parsed.data.illustrationHtml || null,
    illustrationClass: parsed.data.illustrationClass || null,
    path: parsed.data.imagePath,
  };

  const sharedData = {
    wrapperClass: parsed.data.wrapperClass || null,
    sectionClass: parsed.data.sectionClass || null,
    contentWrapperClass: parsed.data.contentWrapperClass || null,
    headingText: parsed.data.headingText || null,
    headingLevel: parsed.data.headingLevel ?? null,
    headingClass: parsed.data.headingClass || null,
    paragraphsBody: paragraphsBody.data,
    paragraphsClass: parsed.data.paragraphsClass || null,
    experiencesWrapperClass: parsed.data.experiencesWrapperClass || null,
    hobbyHeadingText: parsed.data.hobbyHeadingText || null,
    hobbyHeadingLevel: parsed.data.hobbyHeadingLevel ?? null,
    hobbyHeadingClass: parsed.data.hobbyHeadingClass || null,
    ctaLabel: parsed.data.ctaLabel || null,
    ctaVariant: parsed.data.ctaVariant || null,
    ctaIconClass: parsed.data.ctaIconClass || null,
    ctaWrapperClass: parsed.data.ctaWrapperClass || null,
    entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
    scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
  };

  await prisma.aboutIntroSection.upsert({
    where: { id: "about_intro_singleton" },
    update: {
      ...sharedData,
      image: existing?.imageId ? { update: imageData } : { create: imageData },
    },
    create: {
      id: "about_intro_singleton",
      ...sharedData,
      image: { create: imageData },
    },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}

export interface UpdateAboutHireBannerSectionInput extends AboutHireBannerSectionInput {
  paragraphsBodyJson: string;
  entryAnimationsJson: string;
  scrollAnimationsJson: string;
}

export async function updateAboutHireBannerSection(
  _prevState: unknown,
  data: UpdateAboutHireBannerSectionInput
) {
  await requireAuth();

  const parsed = aboutHireBannerSectionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const paragraphsBody = parseParagraphsBodyJson(data.paragraphsBodyJson);
  if (!paragraphsBody.success) {
    return { error: `Paragraphs: ${paragraphsBody.error}` };
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

  await prisma.aboutHireBannerSection.upsert({
    where: { id: "about_hire_banner_singleton" },
    update: {
      wrapperClass: parsed.data.wrapperClass || null,
      sectionClass: parsed.data.sectionClass || null,
      contentWrapperClass: parsed.data.contentWrapperClass || null,
      headingText: parsed.data.headingText || null,
      headingLevel: parsed.data.headingLevel ?? null,
      headingClass: parsed.data.headingClass || null,
      paragraphsBody: paragraphsBody.data,
      paragraphsClass: parsed.data.paragraphsClass || null,
      ctaLabel: parsed.data.ctaLabel || null,
      ctaVariant: parsed.data.ctaVariant || null,
      ctaWrapperClass: parsed.data.ctaWrapperClass || null,
      ctaColumnClass: parsed.data.ctaColumnClass || null,
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
    },
    create: {
      id: "about_hire_banner_singleton",
      wrapperClass: parsed.data.wrapperClass || null,
      sectionClass: parsed.data.sectionClass || null,
      contentWrapperClass: parsed.data.contentWrapperClass || null,
      headingText: parsed.data.headingText || null,
      headingLevel: parsed.data.headingLevel ?? null,
      headingClass: parsed.data.headingClass || null,
      paragraphsBody: paragraphsBody.data,
      paragraphsClass: parsed.data.paragraphsClass || null,
      ctaLabel: parsed.data.ctaLabel || null,
      ctaVariant: parsed.data.ctaVariant || null,
      ctaWrapperClass: parsed.data.ctaWrapperClass || null,
      ctaColumnClass: parsed.data.ctaColumnClass || null,
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
    },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about/hire-banner");
  redirect("/admin/about/hire-banner");
}

export async function createExperience(_prevState: unknown, data: ExperienceInput) {
  await requireAuth();

  const parsed = experienceSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.experience.aggregate({
    where: { aboutIntroSectionId: "about_intro_singleton" },
    _max: { sortOrder: true },
  });

  await prisma.experience.create({
    data: {
      ...parsed.data,
      aboutIntroSectionId: "about_intro_singleton",
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}

export async function updateExperience(id: string, _prevState: unknown, data: ExperienceInput) {
  await requireAuth();

  const parsed = experienceSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.experience.update({ where: { id }, data: parsed.data });

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}

export async function deleteExperience(id: string) {
  await requireAuth();

  await prisma.experience.delete({ where: { id } });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function createHobby(_prevState: unknown, data: HobbyInput) {
  await requireAuth();

  const parsed = hobbySchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.hobby.aggregate({
    where: { aboutIntroSectionId: "about_intro_singleton" },
    _max: { sortOrder: true },
  });

  await prisma.hobby.create({
    data: {
      ...parsed.data,
      aboutIntroSectionId: "about_intro_singleton",
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}

export async function updateHobby(id: string, _prevState: unknown, data: HobbyInput) {
  await requireAuth();

  const parsed = hobbySchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.hobby.update({ where: { id }, data: parsed.data });

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}

export async function deleteHobby(id: string) {
  await requireAuth();

  await prisma.hobby.delete({ where: { id } });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}
