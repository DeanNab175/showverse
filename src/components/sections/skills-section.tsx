import { SkillsSectionType } from "@/types/skills-data-types";

import SkillCategoriesSection from "./skill-categories-section";
import ServiceGridSection from "./service-grid-section";

interface SkillsSectionProps {
  section: SkillsSectionType;
}

export default function SkillsSection({ section }: SkillsSectionProps) {
  switch (section.type) {
    case "skill-categories":
      return <SkillCategoriesSection section={section} />;
    case "service-grid":
      return <ServiceGridSection section={section} />;
    default:
      return null;
  }
}
