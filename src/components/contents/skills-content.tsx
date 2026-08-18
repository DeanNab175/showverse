"use client";

import { isEmptyOrNullish } from "@/lib/utils";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";
import type { SkillsSectionType } from "@/types/skills-data-types";

import SkillsSection from "../sections/skills-section";

interface SkillsContentProps {
  data: SkillsSectionType[];
}

function SkillsContent({ data }: SkillsContentProps) {
  const { sectionRef } = useSectionAnimations(data);

  return (
    <section ref={sectionRef} className="h-full">
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        return <SkillsSection key={section.name} section={section} />;
      })}
    </section>
  );
}

export default SkillsContent;
