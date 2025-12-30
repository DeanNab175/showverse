// Two types of animation functions:
// 1. Timeline-based: receives a timeline to build animations
// 2. Free-form: just executes gsap animations directly
export type TimelineAnimationFn = (tl: gsap.core.Timeline) => void;
export type FreeAnimationFn = () => void;
export type AnimationFn = TimelineAnimationFn | FreeAnimationFn | null;
