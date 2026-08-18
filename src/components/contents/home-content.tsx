"use client";

import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { renderWithLineBreaks } from "@/lib/render-with-line-breaks";
import { isEmptyOrNullish } from "@/lib/utils";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";

import { useTransition } from "@/contexts/transition-context";
import type { HomeSectionType } from "@/types/home-data-types";

import IllustrationComponent from "../illustrations/illustration-component";
import { Button } from "../ui/button";

interface HomeContentProps {
  data: HomeSectionType[];
}

function HomeContent({ data }: HomeContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations } = useTransition();

  // Extract animations from data
  const { entryAnimations, scrollAnimations } = useMemo(() => {
    return {
      entryAnimations: data.flatMap((section) => section.entryAnimations || []),
      scrollAnimations: data.flatMap(
        (section) => section.scrollAnimations || []
      ),
    };
  }, [data]);

  // Set initial states immediately on mount (before paint)
  useLayoutEffect(() => {
    setScrollTriggerInitialStates(scrollAnimations, sectionRef);
  }, [scrollAnimations]);

  const initializeScrollTriggers = useCallback(() => {
    // Kill existing triggers
    killScrollTriggers(scrollTriggersRef.current);
    scrollTriggersRef.current = [];

    // Setup new triggers
    const triggers = setupScrollTriggers({
      scrollAnimations,
      scopeRef: sectionRef,
      scrollerSelector: "main.page-content",
    });

    scrollTriggersRef.current = triggers;
  }, [scrollAnimations]);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setEntryAnimations(null);
        return;
      }

      setEntryAnimations((tl) => {
        setupEntryAnimations({
          entryAnimations,
          timeline: tl,
          scopeRef: sectionRef,
          onComplete: () => {
            // Setup ScrollTriggers after entry animations complete
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              initializeScrollTriggers();
            });
          },
        });
      });

      // Cleanup function
      return () => {
        killScrollTriggers(scrollTriggersRef.current);
        scrollTriggersRef.current = [];
      };
    },
    {
      scope: sectionRef,
      dependencies: [initializeScrollTriggers, entryAnimations],
    }
  );

  return (
    <div className="h-full flex flex-col justify-center">
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        const { name, content, image } = section;

        return (
          <section
            key={name}
            ref={sectionRef}
            id={`section-${name}`}
            className="grid grid-cols-[minmax(0,9fr)_minmax(0,11fr)] gap-4 items-center"
          >
            <article className={content.wrapperClass}>
              <div className="max-w-9/12">
                <h6 className="home-text text-xs">{content.greetMessage}</h6>
                <h1 className="home-text text-4xl -ml-0.5 mb-4 text-primary font-extrabold">
                  {content.name}
                </h1>
                <h2 className="home-text text-base mb-1.5">
                  {renderWithLineBreaks(content.jobTitle)}
                </h2>
                <p className="home-text text-xs mb-7">
                  {content.shortDescription}
                </p>
                <div className="button-link">
                  {content.viewPage.map((p) => (
                    <Button key={p.url} variant="secondary" asChild>
                      <Link href={p.url} className="menu-nav-link">
                        {p.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </article>
            <article id={image?.wrapperId} className={image?.wrapperClass}>
              {image?.isIllustration && image?.illustration?.html && (
                <IllustrationComponent
                  svgString={image.illustration.html}
                  className={image.illustration.class}
                />
              )}
            </article>
          </section>
        );
      })}
    </div>
  );
}

export default HomeContent;
