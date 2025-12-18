"use client";

import gsap from "gsap";
import React, { createContext } from "react";

type TransitionContextType = {
    timeline: gsap.core.Timeline;
    setTimeline: React.Dispatch<React.SetStateAction<gsap.core.Timeline>>;
};
const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [timeline, setTimeline] = React.useState<GSAPTimeline>(() =>
    gsap.timeline({ paused: true })
  );

  return (
    <TransitionContext value={{ timeline, setTimeline }}>
      {children}
    </TransitionContext>
  );
}

export { TransitionContext, TransitionProvider };
