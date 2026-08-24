import SkillsContent from "@/components/contents/skills-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import { prisma } from "@/lib/prisma";
import { mapServicesSection } from "@/lib/mappers/services-mapper";
import skillsData from "@/constants/data/skills";

export async function generateMetadata() {
  return getPageMetadata("skills");
}

export default async function SkillsPage() {
  const skillsCategoriesSection = skillsData.find((s) => s.id === "skills_section")!;

  const servicesRow = await prisma.skillsServicesSection.findUnique({
    where: { id: "services_singleton" },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });

  const data = [skillsCategoriesSection, mapServicesSection(servicesRow)];

  return <SkillsContent data={data} />;
}
