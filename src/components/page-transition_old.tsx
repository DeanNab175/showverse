"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const firstMount = useRef(true);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const ctx = gsap.context(() => {
      if (firstMount.current) {
        // initial enter animation
        gsap.fromTo(
          wrapper,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" }
        );
        firstMount.current = false;
        return;
      }

      // on subsequent pathname changes: quick out -> in sequence
      const tl = gsap.timeline();
      tl.to(wrapper, {
        autoAlpha: 0,
        x: "100%",
        duration: 0.3,
        ease: "power1.in",
      });
      tl.fromTo(
        wrapper,
        { autoAlpha: 0, x: "100%" },
        { autoAlpha: 1, x: 0, duration: 0.36, ease: "power3.out" },
        // start the in-animation immediately after the out animation
        ">-0"
      );
    }, wrapper);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {children}
    </div>
  );
}
