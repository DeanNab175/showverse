"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollHintProps {
  scrollerRef: React.RefObject<HTMLElement | null>;
}

const BASE_OFFSET = 12;
const CLEARANCE = 8;

function ScrollHint({ scrollerRef }: ScrollHintProps) {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(BASE_OFFSET);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateVisibility = () => {
      if (scroller.scrollTop >= 24) dismissedRef.current = true;
      const hasOverflow = scroller.scrollHeight > scroller.clientHeight + 1;
      setVisible(hasOverflow && !dismissedRef.current);
    };

    // Sit above any other sticky-bottom element already docked in the
    // scroller (e.g. portfolio's pagination bar) instead of overlapping it.
    // Only needs recomputing when the content itself changes, not on scroll.
    const updateOffset = () => {
      const dockedHeight = [...scroller.querySelectorAll<HTMLElement>("*")]
        .filter(
          (el) =>
            getComputedStyle(el).position === "sticky" &&
            getComputedStyle(el).bottom !== "auto"
        )
        .reduce((max, el) => Math.max(max, el.offsetHeight), 0);
      setOffset(dockedHeight > 0 ? dockedHeight + CLEARANCE : BASE_OFFSET);
    };

    const update = () => {
      updateVisibility();
      updateOffset();
    };

    // Track the scroller's own box size, but content swaps on navigation
    // (page-content is part of the persistent layout, so it never
    // remounts) replace its child wholesale without changing that box, so
    // we also need to re-track whichever element is currently the content
    // root to catch its height changing.
    const contentObserver = new ResizeObserver(update);
    let observedChild: Element | null = null;

    const trackContent = () => {
      const child = scroller.firstElementChild;
      if (child !== observedChild) {
        if (observedChild) contentObserver.unobserve(observedChild);
        if (child) contentObserver.observe(child);
        observedChild = child;
        // New page content mounted in (page-content itself never
        // remounts) - give it a fresh chance to show the hint.
        dismissedRef.current = false;
      }
      update();
    };

    trackContent();

    const scrollerObserver = new ResizeObserver(update);
    scrollerObserver.observe(scroller);

    const mutationObserver = new MutationObserver(trackContent);
    mutationObserver.observe(scroller, { childList: true });

    scroller.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      contentObserver.disconnect();
      scrollerObserver.disconnect();
      mutationObserver.disconnect();
      scroller.removeEventListener("scroll", updateVisibility);
    };
  }, [scrollerRef]);

  return (
    <div
      aria-hidden
      style={{ bottom: offset }}
      className={`pointer-events-none absolute inset-x-0 flex justify-center transition-[opacity,bottom] duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="flex items-center justify-center size-9.5 rounded-full bg-primary text-button-primary-txt animate-bounce">
        <i className="icon-arrow-down text-[1em]" />
      </span>
    </div>
  );
}

export default ScrollHint;
