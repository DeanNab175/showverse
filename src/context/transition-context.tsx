"use client";

import { createContext, useContext, useRef } from "react";

// Two types of animation functions:
// 1. Timeline-based: receives a timeline to build animations
// 2. Free-form: just executes gsap animations directly
type TimelineAnimationFn = (fn: gsap.core.Timeline) => void;
type FreeAnimationFn = () => void;
type AnimationFn = TimelineAnimationFn | FreeAnimationFn;

interface TransitionContextType {
  setEntryAnimations: (fn: AnimationFn | null) => void;
  getEntryAnimations: () => AnimationFn | null;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const entryAnimations = useRef<AnimationFn | null>(null);
  return (
    <TransitionContext
      value={{
        setEntryAnimations: (fn) => {
          entryAnimations.current = fn;
        },
        getEntryAnimations: () => entryAnimations.current,
      }}
    >
      {children}
    </TransitionContext>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
