import type { Prisma } from "@prisma/client";

import type { SkillsSectionType } from "@/types/skills-data-types";
import type { EntryAnimationType, ScrollAnimationType } from "@/types/animations-types";

type SkillsServicesSectionWithServices = Prisma.SkillsServicesSectionGetPayload<{
  include: { services: true };
}>;

export function mapServicesSection(
  row: SkillsServicesSectionWithServices | null
): SkillsSectionType {
  return {
    id: "services_section",
    name: "services",
    type: "service-grid",
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
      services: {
        wrapperClass: row?.servicesWrapperClass ?? undefined,
        list: (row?.services ?? [])
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((service) => ({
            iconClass: service.iconClass,
            title: service.title,
            description: service.description,
          })),
      },
    },
    entryAnimations: (row?.entryAnimations as unknown as EntryAnimationType[]) ?? [],
    scrollAnimations: (row?.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
  };
}
