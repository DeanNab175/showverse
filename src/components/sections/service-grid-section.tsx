import { SkillsSectionType } from "@/types/skills-data-types";

import ServiceCard from "@/components/skills/service-card";
import SectionHeading from "@/components/skills/section-heading";

interface ServiceGridSectionProps {
  section: SkillsSectionType;
}

export default function ServiceGridSection({
  section,
}: ServiceGridSectionProps) {
  const { heading, services } = section.content;

  return (
    <article className={section.class}>
      <SectionHeading heading={heading} />

      <div className={services?.wrapperClass}>
        {services?.list?.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            iconClass={service.iconClass}
            description={service.description}
          />
        ))}
      </div>
    </article>
  );
}
