"use client";

import { useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

import { isEmptyOrNullish } from "@/lib/utils";
import { useTransition } from "@/contexts/transition-context";
import Heading from "@/components/typography/heading";
import type { SkillsSectionType } from "@/types/skills-data-types";
import IconCard from "../skills/icon-card";
import ServiceCard from "../skills/service-card";

interface SkillsContentProps {
  data: SkillsSectionType[];
}

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (
    LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>
  )[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}

function SkillsContent({ data }: SkillsContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setEntryAnimations } = useTransition();

  useEffect(() => {
    setEntryAnimations(null);
  }, [setEntryAnimations]);

  return (
    <section ref={sectionRef} className="h-full flex flex-col justify-between">
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        if (section.name === "skills") {
          return (
            <div key={section.name} className="mb-4">
              {section.content.heading && (
                <Heading
                  level={section.content.heading.level}
                  className={
                    section.content.heading.class ?? "text-xl mb-4 font-medium"
                  }
                >
                  {section.content.heading.text}
                </Heading>
              )}

              <section className="flex flex-wrap justify-between gap-x-10">
                {section.content.categories?.map((category) => (
                  <article key={category.label} className="lg:max-w-[38%]">
                    <p className="text-base mb-3">{category.label}</p>
                    <div className="flex flex-wrap gap-4">
                      {category.items.map((item) => (
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
            </div>
          );
        }

        if (section.name === "services") {
          return (
            <div key={section.name} className="flex-1 py-6">
              {section.content.heading && (
                <Heading
                  level={section.content.heading.level}
                  className={
                    section.content.heading.class ?? "text-xl mb-7 font-medium"
                  }
                >
                  {section.content.heading.text}
                </Heading>
              )}

              <div className="grid grid-cols-3 gap-4">
                {section.content.services?.map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    iconClass={service.iconClass}
                    description={service.description}
                  />
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </section>
  );
}

export default SkillsContent;
