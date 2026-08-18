import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { useTransition } from "@/contexts/transition-context";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";

import type { BaseSectionType } from "@/types/common-types";

/**
 * Extracts entry/scroll animations from section data, wires them into the
 * shared page-transition timeline, and sets up ScrollTriggers once entry
 * animations complete. Shared by every content component (About, Home,
 * Portfolio, Skills) since they all consume BaseSectionType data.
 */
export function useSectionAnimations<T extends BaseSectionType>(data: T[]) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations, isTransitioning, hasPlayedInitial } =
    useTransition();

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
    killScrollTriggers(scrollTriggersRef.current);
    scrollTriggersRef.current = [];

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

      const armScrollTriggers = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          initializeScrollTriggers();
        });
      };

      // Mirrors PageTransition's own gate for whether it will actually call
      // playEntryAnimation() for this render: either it hasn't played its
      // very first entry yet, or a nav-link transition is in flight.
      const willPlayEntryTimeline =
        !hasPlayedInitial.current || isTransitioning.current;

      if (prefersReducedMotion) {
        setEntryAnimations(null);
      } else {
        setEntryAnimations((tl) => {
          setupEntryAnimations({
            entryAnimations,
            timeline: tl,
            scopeRef: sectionRef,
          });

          // When the entry timeline is about to play, PageTransition's
          // shared .page-content fade still has it sitting at opacity 0 at
          // this point, so arming ScrollTriggers now would let above-the-
          // fold elements finish their reveal while still hidden. Wait for
          // that timeline to actually finish instead.
          if (willPlayEntryTimeline) {
            tl.call(armScrollTriggers);
          }
        });
      }

      // Content-only updates that don't go through PageTransition's
      // nav-link flow (e.g. portfolio pagination via router.push) never
      // play the entry timeline above, so arm directly here too — content
      // is already visible in that case, no reveal to race against.
      if (!willPlayEntryTimeline) {
        armScrollTriggers();
      }

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

  return { sectionRef };
}
