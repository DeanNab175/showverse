import { gsap } from "gsap";
import type { EntryAnimationType } from "@/types/animations-types";

interface SetupEntryAnimationsOptions {
  entryAnimations: EntryAnimationType[];
  timeline: gsap.core.Timeline;
  scopeRef: React.RefObject<HTMLElement | null>;
  onComplete?: () => void;
}

/**
 * Sets up entry animations from configuration
 * @param options Configuration object
 */
export function setupEntryAnimations({
  entryAnimations,
  timeline,
  scopeRef,
  onComplete,
}: SetupEntryAnimationsOptions): void {
  if (!scopeRef.current) return;

  const q = gsap.utils.selector(scopeRef);

  entryAnimations.forEach(({ selector, animation, stagger }) => {
    // Handle ref objects
    if (
      typeof selector === "object" &&
      selector !== null &&
      "current" in selector
    ) {
      if (selector.current) {
        timeline.from(selector.current, animation);
      }
      return;
    }

    // Handle string selectors
    const elements = q(selector as string);

    if (elements.length === 0) return;

    const animationConfig =
      stagger !== undefined ? { ...animation, stagger } : animation;

    timeline.from(elements, animationConfig);
  });

  // Add completion callback if provided
  if (onComplete) {
    timeline.call(onComplete);
  }
}
