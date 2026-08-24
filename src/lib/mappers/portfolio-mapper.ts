import type { Prisma } from "@prisma/client";

import type { PortfolioSectionType } from "@/types/portfolio-data-types";
import type { EntryAnimationType, ScrollAnimationType } from "@/types/animations-types";

type PortfolioSectionWithProjects = Prisma.PortfolioSectionGetPayload<{
  include: { projects: true };
}>;

export function mapPortfolioSection(
  row: PortfolioSectionWithProjects | null
): PortfolioSectionType {
  return {
    id: "portfolio_section",
    name: "portfolio",
    class: row?.sectionClass ?? undefined,
    content: {
      heading:
        row?.headingText && row.headingLevel
          ? {
              text: row.headingText,
              level: row.headingLevel as 1 | 2 | 3 | 4 | 5 | 6,
              class: row.headingClass ?? undefined,
            }
          : undefined,
      projects: {
        wrapperClass: row?.projectsWrapperClass ?? undefined,
        perPage: row?.perPage,
        list: (row?.projects ?? [])
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((project) => ({
            id: project.slug,
            title: project.title,
            description: project.description,
            thumbnail: project.thumbnailUrl,
            previewUrl: project.previewUrl ?? undefined,
          })),
      },
    },
    entryAnimations: (row?.entryAnimations as unknown as EntryAnimationType[]) ?? [],
    scrollAnimations: (row?.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
  };
}
