"use client";

import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { useTransition } from "@/contexts/transition-context";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isEmptyOrNullish } from "@/lib/utils";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";

import type { AboutSectionType } from "@/types/about-data-types";

import AboutSection from "../sections/about-section";
interface AboutContentProps {
  data: AboutSectionType[];
}

function AboutContent({ data }: AboutContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations } = useTransition();

  // Extract animations from data
  const { entryAnimations, scrollAnimations } = useMemo(() => {
    return {
      entryAnimations: data.flatMap((section) => section.entryAnimations || []),
      scrollAnimations: data.flatMap(
        (section) => section.scrollAnimations || []
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
    }
  );

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
