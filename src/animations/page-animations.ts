import gsap from "gsap";
import {
  AnimationFn,
  FreeAnimationFn,
  TimelineAnimationFn,
} from "@/types/page-animations-types";

const ANIMATION_CONFIG = {
  duration: {
    header: 0.3,
    footer: 0.3,
    content: 0.5,
    overlay: 1.2,
    overlayExit: 1,
  },
  ease: {
    header: "power2.inOut",
    footer: "power2.inOut",
    content: "power2.inOut",
    overlay: "power2.inOut",
    overlayExit: "power2.inOut",
  },
} as const;

const PAGE_ELEMENT_SELECTOR = {
  header: ".page-header",
  footer: ".page-footer",
  content: ".page-content",
} as const;

export function createExitTimeline(
  overlayRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void
) {
  return gsap
    .timeline({ onComplete })
    .to(PAGE_ELEMENT_SELECTOR.header, {
      opacity: 0,
      translateY: "-20%",
      duration: ANIMATION_CONFIG.duration.header,
      ease: ANIMATION_CONFIG.ease.header,
    })
    .to(
      PAGE_ELEMENT_SELECTOR.footer,
      {
        opacity: 0,
        translateY: "20%",
        duration: ANIMATION_CONFIG.duration.footer,
        ease: ANIMATION_CONFIG.ease.footer,
      },
      "<"
    )
    .to(PAGE_ELEMENT_SELECTOR.content, {
      opacity: 0,
      duration: ANIMATION_CONFIG.duration.content,
      delay: 0.5,
      ease: ANIMATION_CONFIG.ease.content,
    })
    .to(
      overlayRef.current,
      {
        translateY: "-200%",
        scale: 0.6,
        rotate: -45,
        duration: ANIMATION_CONFIG.duration.overlayExit,
        ease: ANIMATION_CONFIG.ease.overlayExit,
      },
      "-=0.3"
    );
}

export function createEntryTimeline(
  overlayRef: React.RefObject<HTMLDivElement | null>,
  isRouteChange: boolean,
  entryAnimationFn: AnimationFn,
  onComplete: () => void
) {
  const entryTl = gsap.timeline({ onComplete });

  // Overlay reveal for route changes
  if (isRouteChange) {
    entryTl
      .set(overlayRef.current, {
        translateY: "0%",
        translateX: "100%",
        scale: 0.6,
        rotate: -45,
      })
      .to(overlayRef.current, {
        translateY: "0%",
        translateX: "0%",
        scale: 1,
        rotate: 0,
        duration: ANIMATION_CONFIG.duration.overlay,
        ease: ANIMATION_CONFIG.ease.overlay,
      });
  }

  entryTl
    .to(PAGE_ELEMENT_SELECTOR.header, {
      opacity: 1,
      translateY: 0,
      duration: ANIMATION_CONFIG.duration.header,
      ease: ANIMATION_CONFIG.ease.header,
    })
    .to(
      PAGE_ELEMENT_SELECTOR.footer,
      {
        opacity: 1,
        translateY: 0,
        duration: ANIMATION_CONFIG.duration.footer,
        ease: ANIMATION_CONFIG.ease.footer,
      },
      "<"
    )
    .to(PAGE_ELEMENT_SELECTOR.content, {
      opacity: 1,
      duration: ANIMATION_CONFIG.duration.content,
      ease: ANIMATION_CONFIG.ease.content,
    });

  // Add custom page animations if provided
  if (entryAnimationFn) {
    if (entryAnimationFn.length > 0) {
      const pageTl = gsap.timeline();
      const timelineFn = entryAnimationFn as TimelineAnimationFn;
      timelineFn(pageTl);
      entryTl.add(pageTl, "<");
    } else {
      const freeFn = entryAnimationFn as FreeAnimationFn;
      entryTl.call(() => freeFn(), [], "<");
    }
  }

  return entryTl;
}
