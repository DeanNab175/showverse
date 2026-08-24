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

export async function updateAboutIntroSection(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = aboutIntroSectionSchema.safeParse({
    wrapperClass: formData.get("wrapperClass"),
    sectionClass: formData.get("sectionClass"),
    contentWrapperClass: formData.get("contentWrapperClass"),
    headingText: formData.get("headingText"),
    headingLevel: formData.get("headingLevel"),
    headingClass: formData.get("headingClass"),
    paragraphsClass: formData.get("paragraphsClass"),
    experiencesWrapperClass: formData.get("experiencesWrapperClass"),
    hobbyHeadingText: formData.get("hobbyHeadingText"),
    hobbyHeadingLevel: formData.get("hobbyHeadingLevel"),
    hobbyHeadingClass: formData.get("hobbyHeadingClass"),
    ctaLabel: formData.get("ctaLabel"),
    ctaVariant: formData.get("ctaVariant"),
    ctaIconClass: formData.get("ctaIconClass"),
    ctaWrapperClass: formData.get("ctaWrapperClass"),
    imageWrapperId: formData.get("imageWrapperId"),
    imageWrapperClass: formData.get("imageWrapperClass"),
    isIllustration: formData.get("isIllustration") === "on",
    illustrationHtml: formData.get("illustrationHtml"),
    illustrationClass: formData.get("illustrationClass"),
    imagePath: formData.get("imagePath"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const paragraphsBody = parseParagraphsBodyJson(formData.get("paragraphsBodyJson"));
  if (!paragraphsBody.success) {
    return { error: `Paragraphs: ${paragraphsBody.error}` };
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

export async function updateAboutHireBannerSection(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = aboutHireBannerSectionSchema.safeParse({
    wrapperClass: formData.get("wrapperClass"),
    sectionClass: formData.get("sectionClass"),
    contentWrapperClass: formData.get("contentWrapperClass"),
    headingText: formData.get("headingText"),
    headingLevel: formData.get("headingLevel"),
    headingClass: formData.get("headingClass"),
    paragraphsClass: formData.get("paragraphsClass"),
    ctaLabel: formData.get("ctaLabel"),
    ctaVariant: formData.get("ctaVariant"),
    ctaWrapperClass: formData.get("ctaWrapperClass"),
    ctaColumnClass: formData.get("ctaColumnClass"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const paragraphsBody = parseParagraphsBodyJson(formData.get("paragraphsBodyJson"));
  if (!paragraphsBody.success) {
    return { error: `Paragraphs: ${paragraphsBody.error}` };
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

function parseExperienceFormData(formData: FormData) {
  return experienceSchema.safeParse({
    total: formData.get("total"),
    description: formData.get("description"),
  });
}

export async function createExperience(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseExperienceFormData(formData);
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

export async function updateExperience(id: string, _prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseExperienceFormData(formData);
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

function parseHobbyFormData(formData: FormData) {
  return hobbySchema.safeParse({
    label: formData.get("label"),
    iconClass: formData.get("iconClass"),
  });
}

export async function createHobby(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseHobbyFormData(formData);
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

export async function updateHobby(id: string, _prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseHobbyFormData(formData);
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
