"use client";

import { useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

import { isEmptyOrNullish } from "@/lib/utils";
import { useTransition } from "@/contexts/transition-context";
import Heading from "@/components/typography/heading";
import type { SkillsSectionType } from "@/types/skills-data-types";

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
            <div
              key={section.name}
              className="flex flex-col justify-center flex-1 py-6"
            >
              {section.content.heading && (
                <Heading
                  level={section.content.heading.level}
                  className={
                    section.content.heading.class ?? "text-xl mb-6 font-medium"
                  }
                >
                  {section.content.heading.text}
                </Heading>
              )}

              <div className="grid grid-cols-2 gap-40">
                {section.content.categories?.map((category) => (
                  <div key={category.label}>
                    <p className="text-base mb-3 text-muted-foreground">
                      {category.label}
                    </p>
                    <div className="grid grid-cols-5 gap-8">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          title={item.name}
                          className="flex items-center justify-center bg-primary/20 rounded-xl p-3 aspect-square"
                        >
                          <img
                            src={item.iconPath}
                            alt={item.name}
                            width={32}
                            height={32}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                    section.content.heading.class ??
                    "text-2xl font-extrabold mb-6 text-primary"
                  }
                >
                  {section.content.heading.text}
                </Heading>
              )}

              <div className="grid grid-cols-3 gap-4">
                {section.content.services?.map((service) => (
                  <div
                    key={service.title}
                    className="bg-secondary rounded-2xl p-5 flex flex-col gap-2"
                  >
                    <DynamicIcon
                      name={service.icon}
                      size={20}
                      className="text-muted-foreground"
                    />
                    <h3 className="font-bold text-sm">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
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
