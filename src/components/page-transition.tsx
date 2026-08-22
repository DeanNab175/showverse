"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useTransition } from "@/contexts/transition-context";
import { ScrollTrigger } from "@/lib/gsap";
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
  const {
    getEntryAnimations,
    setEntryAnimations,
    isTransitioning,
    hasPlayedInitial,
  } = useTransition();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const previousPathname = useRef<string | null>(null);

  const playEntryAnimation = useCallback(() => {
    const entryAnimationFn = getEntryAnimations();
    const isRouteChange = previousPathname.current !== null;

    // Only reached for real page navigations (or the initial mount), never
    // for content-only updates like portfolio pagination, which bypass this
    // entry timeline entirely - see usePageTransitionLinks/useSectionAnimations.
    //
    // ScrollTrigger caches this scroller's position internally and restores
    // that cache on its own auto-refresh (e.g. triggered later by images -
    // Skills' many icon SVGs - loading and shifting layout), which silently
    // overwrites a plain scroll write with a stale pre-navigation value.
    // A plain gsap.set({scrollTop}) doesn't help either: it treats scrollTop
    // as a generic property, bypassing ScrollTrigger's own scroller proxy
    // entirely. Calling ScrollTrigger.refresh() right after the native write
    // forces it to adopt 0 as the current baseline instead.
    const resetScroll = () => {
      const scroller = document.querySelector("main.page-content");
      if (!scroller) return;
      scroller.scrollTo({ top: 0, behavior: "instant" });
      ScrollTrigger.refresh();
    };

    resetScroll();

    const handleComplete = () => {
      // Reapply at the very end too, in case anything (e.g. a deferred
      // ScrollTrigger.refresh from the new page's own animations) still
      // races the early reset above.
      resetScroll();
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
