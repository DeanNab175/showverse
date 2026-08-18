"use client";

import { isEmptyOrNullish } from "@/lib/utils";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";
import type { SkillsSectionType } from "@/types/skills-data-types";

import IconCard from "../skills/icon-card";
import ServiceCard from "../skills/service-card";
import SectionHeading from "../skills/section-heading";

interface SkillsContentProps {
  data: SkillsSectionType[];
}

function SkillsContent({ data }: SkillsContentProps) {
  const { sectionRef } = useSectionAnimations(data);

  return (
    <section ref={sectionRef} className="h-full">
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        const { heading, categories, services } = section.content;

        return (
          <article key={section.name} className={section.class}>
            <SectionHeading heading={heading} />

            {section.name === "skills" && (
              <section className="flex flex-wrap justify-between gap-x-10">
                {categories?.map((category) => (
                  <article
                    key={category.label.text}
                    id={category.id}
                    className={category.items.wrapperClass}
                  >
                    <p className={category.label.class}>
                      {category.label.text}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {category.items.list?.map((item) => (
                        <IconCard
                          key={item.name}
                          name={item.name}
                          path={item.iconPath}
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </section>
            )}

            {section.name === "services" && (
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
            )}
          </article>
        );
      })}
    </section>
  );
}

export default SkillsContent;
