"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  homeSectionSchema,
  parseViewPageLinksJson,
  type HomeSectionInput,
} from "@/lib/schemas/home-schema";
import {
  entryAnimationsArraySchema,
  scrollAnimationsArraySchema,
  parseAnimationsJson,
} from "@/lib/schemas/animations-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export interface UpdateHomeSectionInput extends HomeSectionInput {
  viewPageLinksJson: string;
  entryAnimationsJson: string;
  scrollAnimationsJson: string;
}

export async function updateHomeSection(_prevState: unknown, data: UpdateHomeSectionInput) {
  await requireAuth();

  const parsed = homeSectionSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const viewPageLinks = parseViewPageLinksJson(data.viewPageLinksJson);
  if (!viewPageLinks.success) {
    return { error: `View page links: ${viewPageLinks.error}` };
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

  const existing = await prisma.homeSection.findUnique({
    where: { id: "home_singleton" },
  });

  const imageData = {
    wrapperId: parsed.data.imageWrapperId || null,
    wrapperClass: parsed.data.imageWrapperClass || null,
    isIllustration: parsed.data.isIllustration,
    illustrationHtml: parsed.data.illustrationHtml || null,
    illustrationClass: parsed.data.illustrationClass || null,
    path: parsed.data.imagePath,
  };

  await prisma.homeSection.upsert({
    where: { id: "home_singleton" },
    update: {
      wrapperClass: parsed.data.wrapperClass || null,
      sectionClass: parsed.data.sectionClass || null,
      contentWrapperClass: parsed.data.contentWrapperClass || null,
      greetMessage: parsed.data.greetMessage,
      name: parsed.data.name,
      jobTitle: parsed.data.jobTitle,
      shortDescription: parsed.data.shortDescription,
      viewPageLinks: JSON.parse(JSON.stringify(viewPageLinks.data)),
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
      image: existing?.imageId
        ? { update: imageData }
        : { create: imageData },
    },
    create: {
      id: "home_singleton",
      wrapperClass: parsed.data.wrapperClass || null,
      sectionClass: parsed.data.sectionClass || null,
      contentWrapperClass: parsed.data.contentWrapperClass || null,
      greetMessage: parsed.data.greetMessage,
      name: parsed.data.name,
      jobTitle: parsed.data.jobTitle,
      shortDescription: parsed.data.shortDescription,
      viewPageLinks: JSON.parse(JSON.stringify(viewPageLinks.data)),
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
      image: { create: imageData },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/home");
  redirect("/admin/home");
}
