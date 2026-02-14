"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import Image from "next/image";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useTransition } from "@/contexts/transition-context";
import aboutData from "@/constants/data/about";
import { cn, isEmptyOrNullish } from "@/lib/utils";
import AboutIllustration from "../illustrations/about-illustration";

import type {
  EntryAnimationType,
  ScrollAnimationType,
} from "@/types/animations-types";

import { Button } from "../ui/button";
import Heading from "../typography/heading";
import ExperienceContent from "../experience/experience-content";
import HobbyContent from "../hobby/hobby-content";
import {
  killScrollTriggers,
  setScrollTriggerInitialStates,
  setupScrollTriggers,
} from "@/lib/scroll-trigger-utils";
import { setupEntryAnimations } from "@/lib/entry-animations-utils";
interface AboutContentProps {
  entryAnimations?: EntryAnimationType[];
  scrollAnimations?: ScrollAnimationType[];
}

function AboutContent({
  entryAnimations = [],
  scrollAnimations = [],
}: AboutContentProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLElement | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const { setEntryAnimations } = useTransition();

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
        // Process entry animations and replace "image" selector with imageRef
        const processedEntryAnimations = entryAnimations.map((anim) => {
          if (anim.selector === "image") {
            return { ...anim, selector: imageRef };
          }
          return anim;
        });

        setupEntryAnimations({
          entryAnimations: processedEntryAnimations,
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
    <section ref={sectionRef}>
      {aboutData.map((section) => {
        const {
          content: sectionContent,
          image: sectionImage,
          name: sectionName,
          sectionClass,
          type: sectionType,
          wrapperClass: sectionWrapperClass,
        } = section;

        if (isEmptyOrNullish(sectionContent)) return null;

        if (sectionType === "image-on-left") {
          return (
            <div
              key={sectionName}
              className={cn(
                "h-full flex flex-col justify-center",
                sectionWrapperClass
              )}
            >
              <section
                id={`section-${sectionName}`}
                className={cn(
                  "grid grid-cols-[minmax(0,11fr)_minmax(0,9fr)] gap-4 items-center",
                  sectionClass
                )}
              >
                <article ref={imageRef} className={sectionImage?.wrapperClass}>
                  {sectionImage?.isIllustration ? (
                    <AboutIllustration
                      className={cn(
                        "w-[80%] mr-auto h-auto",
                        sectionImage?.illustration?.class
                      )}
                    />
                  ) : (
                    <Image
                      src={sectionImage?.path as string}
                      alt="About portfolio image"
                      width={500}
                      height={500}
                    />
                  )}
                </article>

                <article className={sectionContent.wrapperClass}>
                  {sectionContent.heading && (
                    <Heading
                      level={sectionContent.heading.level}
                      className={sectionContent.heading.class}
                    >
                      {sectionContent.heading.text}
                    </Heading>
                  )}

                  {sectionContent.paragraphs?.body.map((paragraph, i) => (
                    <p key={i} className={sectionContent.paragraphs?.class}>
                      {paragraph}
                    </p>
                  ))}

                  {sectionContent.experiences && (
                    <div className={sectionContent.experiences.wrapperClass}>
                      <ExperienceContent
                        experiences={sectionContent.experiences.list}
                      />
                    </div>
                  )}

                  {sectionContent.hobby?.heading && (
                    <Heading
                      level={sectionContent.hobby?.heading.level}
                      className={sectionContent.hobby?.heading.class}
                    >
                      {sectionContent.hobby?.heading.text}
                    </Heading>
                  )}

                  {sectionContent.hobby?.list &&
                    sectionContent.hobby.list.length > 0 && (
                      <HobbyContent hobbies={sectionContent.hobby?.list} />
                    )}

                  {sectionContent.cta && (
                    <div className={sectionContent.cta.wrapperClass}>
                      <Button variant={sectionContent.cta.variant}>
                        {sectionContent.cta.label}
                        {sectionContent.cta.iconClass && (
                          <span className="text-base">
                            <i className={sectionContent.cta.iconClass}></i>
                          </span>
                        )}
                      </Button>
                    </div>
                  )}
                </article>
              </section>
            </div>
          );
        }

        if (sectionType === "banner") {
          return (
            <div
              key={sectionName}
              className={cn(
                "h-full flex flex-col justify-center",
                sectionWrapperClass
              )}
            >
              <section
                key={sectionName}
                id={`section-${sectionName}`}
                className={sectionClass}
              >
                <article className={sectionContent.wrapperClass}>
                  {sectionContent.heading && (
                    <Heading
                      level={sectionContent.heading.level}
                      className={sectionContent.heading.class}
                    >
                      {sectionContent.heading.text}
                    </Heading>
                  )}
                  {sectionContent.paragraphs?.body.map((paragraph, i) => (
                    <p key={i} className={sectionContent.paragraphs?.class}>
                      {paragraph}
                    </p>
                  ))}
                </article>
                <article className={section.ctaWrapperClass}>
                  {sectionContent.cta && (
                    <div className={sectionContent.cta.wrapperClass}>
                      <Button variant={sectionContent.cta.variant}>
                        {sectionContent.cta.label}
                      </Button>
                    </div>
                  )}
                </article>
              </section>
            </div>
          );
        }

        return null;
      })}
    </section>
  );
}

export default AboutContent;
