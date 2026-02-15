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

  entryAnimations.forEach(({ selector, animation, stagger, position }) => {
    const elements = q(selector);

    if (elements.length === 0) return;

    const animationConfig =
      stagger !== undefined ? { ...animation, stagger } : animation;

    // Use the provided position, otherwise let timeline handle default positioning
    if (position !== undefined) {
      timeline.from(elements, animationConfig, position);
    } else {
      timeline.from(elements, animationConfig);
    }
  });

  // Add completion callback if provided
  if (onComplete) {
    timeline.call(onComplete);
  }
}
