"use client";

import { isEmptyOrNullish } from "@/lib/utils";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";

import type { AboutSectionType } from "@/types/about-data-types";

import AboutSection from "../sections/about-section";
interface AboutContentProps {
  data: AboutSectionType[];
}

function AboutContent({ data }: AboutContentProps) {
  const { sectionRef } = useSectionAnimations(data);

  return (
    <section ref={sectionRef}>
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        return <AboutSection key={section.name} section={section} />;
      })}
    </section>
  );
}

export default AboutContent;
