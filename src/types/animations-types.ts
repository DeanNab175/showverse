// Two types of animation functions:
// 1. Timeline-based: receives a timeline to build animations
export type TimelineAnimationFn = (tl: gsap.core.Timeline) => void;
// 2. Free-form: just executes gsap animations directly
export type FreeAnimationFn = () => void;
export type AnimationFn = TimelineAnimationFn | FreeAnimationFn | null;

// Scroll animation configuration for content sections
export interface ScrollAnimationType {
  selector: string;
  animation: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
  };
  scrollTrigger: {
    start: string;
    toggleActions?: string;
    [key: string]: any;
  };
}

// Entry animation configuration for page load
export interface EntryAnimationType {
  selector: string | React.RefObject<HTMLElement | null>;
  animation: gsap.TweenVars;
  stagger?: number;
}
