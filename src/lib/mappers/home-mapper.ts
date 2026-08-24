import type { Prisma } from "@prisma/client";

import type { HomeSectionType } from "@/types/home-data-types";
import type { EntryAnimationType, ScrollAnimationType } from "@/types/animations-types";

type HomeSectionWithImage = Prisma.HomeSectionGetPayload<{
  include: { image: true };
}>;

export function mapHomeSection(row: HomeSectionWithImage | null): HomeSectionType[] {
  if (!row) return [];

  return [
    {
      id: "home_intro_section",
      name: "home_intro",
      wrapperClass: row.wrapperClass ?? undefined,
      sectionClass: row.sectionClass ?? undefined,
      image: row.image
        ? {
            wrapperId: row.image.wrapperId ?? undefined,
            wrapperClass: row.image.wrapperClass ?? undefined,
            isIllustration: row.image.isIllustration,
            illustration: {
              class: row.image.illustrationClass ?? undefined,
              html: row.image.illustrationHtml ?? "",
            },
            path: row.image.path,
          }
        : undefined,
      content: {
        wrapperClass: row.contentWrapperClass ?? undefined,
        greetMessage: row.greetMessage,
        name: row.name,
        jobTitle: row.jobTitle,
        shortDescription: row.shortDescription,
        viewPage: (row.viewPageLinks as unknown as { url: string; text: string }[]) ?? [],
      },
      entryAnimations: (row.entryAnimations as unknown as EntryAnimationType[]) ?? [],
      scrollAnimations: (row.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
    },
  ];
}
