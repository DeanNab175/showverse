"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

import { useTransition } from "@/context/transition-context";
import PageLayout from "./page-layout/page-layout";

interface PageTransitionProps {
  children: React.ReactNode;
}
export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getEntryAnimations, setEntryAnimations } = useTransition();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isTransitioning = useRef(false);
  const hasPlayedInitial = useRef(false);
  const previousPathname = useRef<string | null>(null);

  const playEntryAnimation = useCallback(() => {
    const entryAnimationFn = getEntryAnimations();
    const isRouteChange = previousPathname.current !== null;

    const entryTl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        previousPathname.current = pathname;
        // Clear animations after they're played
        setEntryAnimations(null);
      },
    });

    // Overlay reveal (always the same)
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
          duration: 1.2,
          ease: "power2.inOut",
        });
    }

    entryTl.to(".page-header", {
      opacity: 1,
      translateY: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    entryTl.to(
      ".page-footer",
      {
        opacity: 1,
        translateY: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "<"
    );

    // Global page-content opacity (always happens)
    entryTl.to(".page-content", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    if (entryAnimationFn) {
      if (entryAnimationFn.length > 0) {
        const pageTl = gsap.timeline();

        const timelineFn = entryAnimationFn as (tl: gsap.core.Timeline) => void;
        timelineFn(pageTl);
        entryTl.add(pageTl, "<");
      } else {
        const freeFn = entryAnimationFn as () => void;
        entryTl.call(() => freeFn(), [], "<");
      }
    }

    entryTl.play();
  }, [getEntryAnimations, pathname, setEntryAnimations]);

  const exitPage = useCallback(
    (url: string) => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          router.push(url);
        },
      });

      exitTl.to(".page-header", {
        opacity: 0,
        translateY: "-20%",
        duration: 0.3,
        ease: "power2.inOut",
      });

      exitTl.to(
        ".page-footer",
        {
          opacity: 0,
          translateY: "20%",
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );

      exitTl.to(".page-content", {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.inOut",
      });

      exitTl.to(
        overlayRef.current,
        {
          translateY: "-200%",
          scale: 0.6,
          rotate: -45,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      exitTl.play();
    },
    [router]
  );

  useEffect(() => {
    if (hasPlayedInitial.current && !isTransitioning.current) return;

    playEntryAnimation();
    hasPlayedInitial.current = true;
  }, [pathname, playEntryAnimation]);

  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (href) {
        const url = new URL(href, window.location.origin).pathname;
        if (url !== pathname && !isTransitioning.current) {
          isTransitioning.current = true;
          hasPlayedInitial.current = false;
          exitPage(url);
        }
      }
    };

    const links = document.querySelectorAll(".menu-nav-link"); //a[href^='/']
    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, [pathname, exitPage]);

  return <PageLayout ref={overlayRef}>{children}</PageLayout>;
}
