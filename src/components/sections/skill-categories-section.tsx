import { SkillsSectionType } from "@/types/skills-data-types";

import IconCard from "@/components/skills/icon-card";
import SectionHeading from "@/components/skills/section-heading";

interface SkillCategoriesSectionProps {
  section: SkillsSectionType;
}

export default function SkillCategoriesSection({
  section,
}: SkillCategoriesSectionProps) {
  const { heading, categories } = section.content;

  return (
    <article className={section.class}>
      <SectionHeading heading={heading} />

      <section className="flex flex-wrap justify-between gap-x-10">
        {categories?.map((category) => (
          <article
            key={category.label.text}
            id={category.id}
            className={category.items.wrapperClass}
          >
            <p className={category.label.class}>{category.label.text}</p>
            <div className="flex flex-wrap gap-4">
              {category.items.list?.map((item) => (
                <IconCard key={item.name} name={item.name} path={item.iconPath} />
              ))}
            </div>
          </article>
        ))}
      </section>
    </article>
  );
}
