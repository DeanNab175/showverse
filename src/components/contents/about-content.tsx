"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useTransition } from "@/contexts/transition-context";
import { Button } from "../ui/button";
import AboutIllustration from "../illustrations/about-illustration";

import aboutData from "@/constants/data/about";
import ExperienceContent from "../experience/experience-content";
import HobbyContent from "../hobby/hobby-content";

gsap.registerPlugin(useGSAP);

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
    },
    { scope: sectionRef }
  );

  return (
    <div className="h-full flex flex-col justify-center">
      {aboutData.map(({ name, content }) => (
        <section
          key={name}
          ref={sectionRef}
          id={`section-${name}`}
          className="grid grid-cols-[minmax(0,11fr)_minmax(0,9fr)] gap-4 items-center"
        >
          <article ref={imageRef} className="image">
            <AboutIllustration className="w-[80%] mr-auto h-auto" />
          </article>

          <article className="content">
            <h1 className="text-transition text-2xl font-extrabold mb-4 text-primary">
              {content.pageTitle}
            </h1>

            {content.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-transition text-xs-plus mb-3">
                {paragraph}
              </p>
            ))}

            {content.experiences && (
              <div className="mt-10 mb-5">
                <ExperienceContent experiences={content.experiences} />
              </div>
            )}

            <h2 className="hobby-text-transition text-sm-plus font-medium mb-4">
              {content.hobby.title}
            </h2>

            {content.hobby.list.length > 0 && (
              <HobbyContent hobbies={content.hobby.list} />
            )}

            {/* <div className="button-link">
            <Button variant="secondary" asChild>
              <Link href="/portfolio" className="menu-nav-link">
                View Portfolio
              </Link>
            </Button>
          </div> */}
          </article>
        </section>
      ))}
    </div>
  );
}

export default AboutContent;
