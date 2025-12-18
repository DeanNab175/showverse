import React, { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TransitionContext } from "@/context/transition-context";

gsap.registerPlugin(useGSAP);

function Transition({ children }: { children: React.ReactElement }) {
  const [displayChildren, setDisplayChildren] =
    React.useState<React.ReactElement>(children);
  //   const container = useRef<HTMLDivElement>(null);
  const { timeline } = useContext(TransitionContext) as {
    timeline: GSAPTimeline;
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (children?.key !== displayChildren?.key) {
      //   gsap.to(container.current, {
      //     autoAlpha: 0,
      //     x: "100%",
      //     duration: 0.5,
      //     // ease: "power1.in",
      //     onComplete: () => {
      //       setDisplayChildren(children);
      //       gsap.to(container.current, {
      //         autoAlpha: 1,
      //         x: 0,
      //         duration: 0.5,
      //         delay: 0.1,
      //         // ease: "power3.out",
      //       });
      //     },
      //   });

      timeline.play().then(() => {
        console.log("timeline played");
        setDisplayChildren(children);
        timeline?.pause().clear();
      });
    }
  }, [children, displayChildren?.key]);

  //   useGSAP(() => {
  //     gsap.set(container.current, { opacity: 1 });
  //   });

  return (
    <div ref={containerRef} className="h-full">
      {displayChildren}
    </div>
  );
}

export default Transition;
