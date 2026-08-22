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
    // ScrollTrigger caches this scroller's position internally through its
    // own registered proxy, separate from the DOM's real scrollTop. Setting
    // scroll natively (or via a plain gsap.set({scrollTop}), which treats it
    // as a generic property) never touches that proxy, so the cache goes
    // stale - and ScrollTrigger's own refresh (its later auto-refresh from
    // e.g. images loading, or even a refresh() called manually right after
    // the native write, before the cache has a tick to invalidate) reads
    // that stale value and restores it, undoing the reset. Setting through
    // an existing trigger's own .scroll() goes through that same proxy, so
    // the cache is correct from the moment it's set - nothing to restore.
    const resetScroll = () => {
      const scroller = document.querySelector("main.page-content");
      if (!scroller) return;
      const trigger = ScrollTrigger.getAll().find(
        (st) => st.scroller === scroller
      );
      if (trigger) {
        trigger.scroll(0);
      } else {
        scroller.scrollTo({ top: 0, behavior: "instant" });
      }
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
