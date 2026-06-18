"use client";

import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

import { useTransition } from "@/contexts/transition-context";
import { isEmptyOrNullish } from "@/lib/utils";
import type { SkillsSectionType } from "@/types/skills-data-types";

import IconCard from "../skills/icon-card";
import ServiceCard from "../skills/service-card";
import SectionHeading from "../skills/section-heading";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";

interface SkillsContentProps {
  data: SkillsSectionType[];
}

function SkillsContent({ data }: SkillsContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations } = useTransition();

  // Extract animations from data
  const { entryAnimations, scrollAnimations } = useMemo(() => {
    return {
      entryAnimations: data.flatMap((section) => section.entryAnimations || []),
      scrollAnimations: data.flatMap(
        (section) => section.scrollAnimations || [],
      ),
    };
  }, [data]);

  // Set initial states immediately on mount (before paint)
  useLayoutEffect(() => {
    setScrollTriggerInitialStates(scrollAnimations, sectionRef);
  }, [scrollAnimations]);

  const initializeScrollTriggers = useCallback(() => {
    // Kill existing triggers
    killScrollTriggers(scrollTriggersRef.current);
    scrollTriggersRef.current = [];

    // Setup new triggers
    const triggers = setupScrollTriggers({
      scrollAnimations,
      scopeRef: sectionRef,
      scrollerSelector: "main.page-content",
    });

    scrollTriggersRef.current = triggers;
  }, [scrollAnimations]);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setEntryAnimations(null);
        return;
      }

      setEntryAnimations((tl) => {
        setupEntryAnimations({
          entryAnimations,
          timeline: tl,
          scopeRef: sectionRef,
          onComplete: () => {
            // Setup ScrollTriggers after entry animations complete
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              initializeScrollTriggers();
            });
          },
        });
      });

      // Cleanup function
      return () => {
        killScrollTriggers(scrollTriggersRef.current);
        scrollTriggersRef.current = [];
      };
    },
    {
      scope: sectionRef,
      dependencies: [initializeScrollTriggers, entryAnimations],
    },
  );

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
