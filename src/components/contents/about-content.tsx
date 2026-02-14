"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

import { useTransition } from "@/contexts/transition-context";
import { Button } from "../ui/button";
import AboutIllustration from "../illustrations/about-illustration";

import aboutData from "@/constants/data/about";
import ExperienceContent from "../experience/experience-content";
import HobbyContent from "../hobby/hobby-content";
import { cn, isEmptyOrNullish } from "@/lib/utils";
import Image from "next/image";
import Heading from "../typography/heading";

function AboutContent() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLElement | null>(null);
  const { setEntryAnimations } = useTransition();

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
        const q = gsap.utils.selector(sectionRef);
        const textItems = q(".text-transition");
        const cards = q(".experience-card");
        const hobbyTitle = q(".hobby-text-transition");
        const hobbyItem = q(".hobby-item");

        if (imageRef.current) {
          tl.from(imageRef.current, {
            opacity: 0,
            xPercent: -100,
            duration: 0.5,
            ease: "circ.out",
          });
        }

        tl.from(textItems, {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.15,
        });

        tl.from(cards, {
          opacity: 0,
          y: 20,
          rotate: 10,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.15,
        });

        tl.from(hobbyTitle, {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
        });

        tl.from(hobbyItem, {
          opacity: 0,
          y: 20,
          rotate: 10,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.15,
        });
      });

      const q = gsap.utils.selector(sectionRef);
      const hireBanner = q("#section-about_hire_banner")[0];
      const pageScroller =
        document.querySelector<HTMLElement>("main.page-content");

      if (hireBanner && pageScroller) {
        const bannerTl = gsap.timeline({
          scrollTrigger: {
            trigger: hireBanner,
            scroller: pageScroller,
            start: "top bottom",
            toggleActions: "play none none none",
            // markers: true,
            invalidateOnRefresh: true,
          },
        });

        bannerTl.from(hireBanner, {
          opacity: 0,
          y: 100,
        });
      }
    },
    { scope: sectionRef }
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
