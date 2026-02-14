"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useTransition } from "@/contexts/transition-context";
import PageLayout from "./page-layout/page-layout";
import {
  createEntryTimeline,
  createExitTimeline,
} from "@/animations/page-animations";
import { usePageTransitionLinks } from "@/hooks/usePageTransitionLinks";

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

    const handleComplete = () => {
      isTransitioning.current = false;
      previousPathname.current = pathname;
      setEntryAnimations(null);
    };

    const timeline = createEntryTimeline(
      overlayRef,
      isRouteChange,
      entryAnimationFn,
      handleComplete
    );

    timeline.play();
  }, [getEntryAnimations, pathname, setEntryAnimations]);

  const exitPage = useCallback(
    (url: string) => {
      const timeline = createExitTimeline(overlayRef, () => router.push(url));
      timeline.play();
    },
    [router]
  );

  // Play entry animation on mount and route changes
  useEffect(() => {
    if (hasPlayedInitial.current && !isTransitioning.current) return;

    playEntryAnimation();
    hasPlayedInitial.current = true;
  }, [pathname, playEntryAnimation]);

  // Handle link clicks for page transitions
  usePageTransitionLinks({
    currentPathname: pathname,
    isTransitioning,
    hasPlayedInitial,
    onNavigate: exitPage,
  });

  return <PageLayout ref={overlayRef}>{children}</PageLayout>;
}
