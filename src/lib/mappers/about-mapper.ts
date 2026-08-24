import type { Prisma } from "@prisma/client";

import type { AboutSectionType } from "@/types/about-data-types";
import type { EntryAnimationType, ScrollAnimationType } from "@/types/animations-types";
import type { ButtonVariant } from "@/components/ui/button";

type AboutIntroSectionWithRelations = Prisma.AboutIntroSectionGetPayload<{
  include: { image: true; experiences: true; hobbies: true };
}>;

type AboutHireBannerSectionRow = Prisma.AboutHireBannerSectionGetPayload<object>;

export function mapAboutIntroSection(
  row: AboutIntroSectionWithRelations | null
): AboutSectionType | null {
  if (!row) return null;

  const experiences = row.experiences
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((experience, index) => ({
      id: index + 1,
      total: experience.total,
      description: experience.description,
    }));

  const hobbies = row.hobbies
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((hobby, index) => ({
      id: index + 1,
      label: hobby.label,
      iconClass: hobby.iconClass,
    }));

  return {
    id: "about_intro_section",
    name: "about_intro",
    type: "image-on-left",
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
      heading:
        row.headingText && row.headingLevel
          ? {
              text: row.headingText,
              level: row.headingLevel as 1 | 2 | 3 | 4 | 5 | 6,
              class: row.headingClass ?? undefined,
            }
          : undefined,
      paragraphs: {
        body: row.paragraphsBody,
        class: row.paragraphsClass ?? undefined,
      },
      experiences: {
        wrapperClass: row.experiencesWrapperClass ?? undefined,
        list: experiences,
      },
      hobby: {
        heading:
          row.hobbyHeadingText && row.hobbyHeadingLevel
            ? {
                text: row.hobbyHeadingText,
                level: row.hobbyHeadingLevel as 1 | 2 | 3 | 4 | 5 | 6,
                class: row.hobbyHeadingClass ?? undefined,
              }
            : undefined,
        list: hobbies,
      },
      cta: row.ctaLabel
        ? {
            label: row.ctaLabel,
            variant: (row.ctaVariant ?? undefined) as ButtonVariant,
            iconClass: row.ctaIconClass ?? undefined,
            wrapperClass: row.ctaWrapperClass ?? undefined,
          }
        : undefined,
    },
    entryAnimations: (row.entryAnimations as unknown as EntryAnimationType[]) ?? [],
    scrollAnimations: (row.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
  };
}

export function mapAboutHireBannerSection(
  row: AboutHireBannerSectionRow | null
): AboutSectionType | null {
  if (!row) return null;

  return {
    id: "about_hire_banner_section",
    name: "about_hire_banner",
    type: "banner",
    wrapperClass: row.wrapperClass ?? undefined,
    sectionClass: row.sectionClass ?? undefined,
    ctaWrapperClass: row.ctaColumnClass ?? undefined,
    content: {
      wrapperClass: row.contentWrapperClass ?? undefined,
      heading:
        row.headingText && row.headingLevel
          ? {
              text: row.headingText,
              level: row.headingLevel as 1 | 2 | 3 | 4 | 5 | 6,
              class: row.headingClass ?? undefined,
            }
          : undefined,
      paragraphs: {
        body: row.paragraphsBody,
        class: row.paragraphsClass ?? undefined,
      },
      cta: row.ctaLabel
        ? {
            label: row.ctaLabel,
            variant: (row.ctaVariant ?? undefined) as ButtonVariant,
            wrapperClass: row.ctaWrapperClass ?? undefined,
          }
        : undefined,
    },
    entryAnimations: (row.entryAnimations as unknown as EntryAnimationType[]) ?? [],
    scrollAnimations: (row.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
  };
}
