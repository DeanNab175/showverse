import SkillsContent from "@/components/contents/skills-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import { prisma } from "@/lib/prisma";
import { mapServicesSection } from "@/lib/mappers/services-mapper";
import { mapSkillsCategoriesSection } from "@/lib/mappers/skills-categories-mapper";

export async function generateMetadata() {
  return getPageMetadata("skills");
}

export default async function SkillsPage() {
  const categoriesRow = await prisma.skillsCategoriesSection.findUnique({
    where: { id: "skills_categories_singleton" },
    include: {
      categories: {
        orderBy: { sortOrder: "asc" },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  const servicesRow = await prisma.skillsServicesSection.findUnique({
    where: { id: "services_singleton" },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });

  const data = [
    mapSkillsCategoriesSection(categoriesRow),
    mapServicesSection(servicesRow),
  ];

  return <SkillsContent data={data} />;
}
