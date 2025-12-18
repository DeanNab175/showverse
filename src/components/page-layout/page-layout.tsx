import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionContext } from "@/context/transition-context";
interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const container = useRef<HTMLDivElement>(null);
  const { timeline } = useContext(TransitionContext) as {
    timeline: GSAPTimeline;
  };

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.fromTo(
        container.current,
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
      timeline.add(gsap.to(container.current, { opacity: 0 }));
    },
    { scope: container }
  );

  return (
    <article
      ref={container}
      className="border border-gray-200 h-full rounded-[104px] px-16 py-14 grid grid-flow-col grid-rows-9"
    >
      {children}
    </article>
  );
}

export default PageLayout;
