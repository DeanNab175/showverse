"use client";

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

import { useTransition } from "@/contexts/transition-context";
import { isEmptyOrNullish } from "@/lib/utils";
import type { PortfolioSectionType } from "@/types/portfolio-data-types";

import Heading from "../typography/heading";
import ProjectCard from "../portfolio/project-card";
import Pagination from "../portfolio/pagination";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";

interface PortfolioContentProps {
  data: PortfolioSectionType[];
}

function PortfolioContent({ data }: PortfolioContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations } = useTransition();
  const [currentPage, setCurrentPage] = useState(1);

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

        const { heading, projects } = section.content;
        if (!projects) return null;

        const perPage = projects.perPage ?? projects.list.length;
        const totalPages = Math.max(
          1,
          Math.ceil(projects.list.length / perPage),
        );
        const pageItems = projects.list.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage,
        );

        return (
          <article key={section.name} className={section.class}>
            {heading && (
              <Heading level={heading.level} className={heading.class}>
                {heading.text}
              </Heading>
            )}

            <div className={projects.wrapperClass}>
              {pageItems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </article>
        );
      })}
    </section>
  );
}

export default PortfolioContent;
