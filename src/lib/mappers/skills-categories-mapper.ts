import type { Prisma } from "@prisma/client";

import type { SkillsSectionType } from "@/types/skills-data-types";
import type { EntryAnimationType, ScrollAnimationType } from "@/types/animations-types";

type SkillsCategoriesSectionWithCategories = Prisma.SkillsCategoriesSectionGetPayload<{
  include: { categories: { include: { items: true } } };
}>;

export function mapSkillsCategoriesSection(
  row: SkillsCategoriesSectionWithCategories | null
): SkillsSectionType {
  const categories = (row?.categories ?? []).slice().sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: "skills_section",
    name: "skills",
    type: "skill-categories",
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
      categories: categories.map((category) => ({
        id: category.slug,
        label: {
          text: category.labelText,
          class: category.labelClass ?? "",
        },
        items: {
          wrapperClass: category.itemsWrapperClass ?? undefined,
          list: category.items
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => ({
              name: item.name,
              iconPath: item.iconUrl,
            })),
        },
      })),
    },
    entryAnimations: (row?.entryAnimations as unknown as EntryAnimationType[]) ?? [],
    scrollAnimations: (row?.scrollAnimations as unknown as ScrollAnimationType[]) ?? [],
  };
}
