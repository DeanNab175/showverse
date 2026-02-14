import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollAnimationType } from "@/types/animations-types";

interface SetupScrollTriggersOptions {
  scrollAnimations: ScrollAnimationType[];
  scopeRef: React.RefObject<HTMLElement | null>;
  scrollerSelector?: string;
}

/**
 * Sets up scroll-triggered animations for elements
 * @param options Configuration object
 * @returns Array of created ScrollTrigger instances for cleanup
 */
export function setupScrollTriggers({
  scrollAnimations,
  scopeRef,
  scrollerSelector = "main.page-content",
}: SetupScrollTriggersOptions): ScrollTrigger[] {
  const triggers: ScrollTrigger[] = [];

  if (scrollAnimations.length === 0 || !scopeRef.current) {
    return triggers;
  }

  const pageScroller = document.querySelector<HTMLElement>(scrollerSelector);
  if (!pageScroller) {
    console.warn(`Scroller element "${scrollerSelector}" not found`);
    return triggers;
  }

  const q = gsap.utils.selector(scopeRef);

  scrollAnimations.forEach(
    ({ selector, animation, scrollTrigger: stConfig }) => {
      const elements = q(selector);

      elements.forEach((element) => {
        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            scroller: pageScroller,
            invalidateOnRefresh: true,
            ...stConfig,
          },
        });

        tl.to(element, animation.to);

        // Store the trigger for cleanup
        if (tl.scrollTrigger) {
          triggers.push(tl.scrollTrigger);
        }
      });
    }
  );

  return triggers;
}

/**
 * Sets initial states for scroll-triggered elements
 * @param scrollAnimations Array of scroll animation configurations
 * @param scopeRef Reference to the scope element
 */
export function setScrollTriggerInitialStates(
  scrollAnimations: ScrollAnimationType[],
  scopeRef: React.RefObject<HTMLElement | null>
): void {
  if (!scopeRef.current || scrollAnimations.length === 0) return;

  const q = gsap.utils.selector(scopeRef);

  scrollAnimations.forEach(({ selector, animation }) => {
    const elements = q(selector);
    elements.forEach((element) => {
      gsap.set(element, animation.from);
    });
  });
}

/**
 * Kills all scroll triggers
 * @param triggers Array of ScrollTrigger instances to kill
 */
export function killScrollTriggers(triggers: ScrollTrigger[]): void {
  triggers.forEach((trigger) => trigger.kill());
}
