"use client";

import { createContext, useContext, useRef } from "react";
import { AnimationFn } from "@/types/animations-types";

interface TransitionContextType {
  setEntryAnimations: (fn: AnimationFn) => void;
  getEntryAnimations: () => AnimationFn;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const entryAnimations = useRef<AnimationFn>(null);
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
