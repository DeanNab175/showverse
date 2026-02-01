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
        const textItems = q(".home-text");

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
            <h1 className="home-text text-xl mb-4 text-primary">
              {content.pageTitle}
            </h1>

            {content.paragraphs.map((paragraph, i) => (
              <p key={i} className="home-text text-xs mb-3">
                {paragraph}
              </p>
            ))}

            {/* <p className="home-text text-xs mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              euismod erat non erat feugiat, nec volutpat dolor faucibus. In
              pharetra tortor non metus ultrices molestie. Aliquam quis
              sollicitudin velit. Etiam enim tortor, aliquet et fringilla non,
              facilisis in mauris. Maecenas aliquet vel odio in vulputate.
              Vivamus venenatis sed justo et ultrices. Nulla a augue ut urna
              scelerisque imperdiet. Curabitur sed vehicula neque, ut placerat
              sapien. Proin in mauris sodales, hendrerit mi in, varius lacus.
              Maecenas sed cursus magna.
            </p>
            <p className="home-text text-xs mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              euismod erat non erat feugiat, nec volutpat dolor faucibus. In
              pharetra tortor non metus ultrices molestie. Aliquam quis
              sollicitudin velit. Etiam enim tortor, aliquet et fringilla non,
              facilisis in mauris. Maecenas aliquet vel odio in vulputate.
              Vivamus venenatis sed justo et ultrices. Nulla a augue ut urna
              scelerisque imperdiet. Curabitur sed vehicula neque, ut placerat
              sapien. Proin in mauris sodales, hendrerit mi in, varius lacus.
              Maecenas sed cursus magna.
            </p> */}

            {content.experiences && (
              <ExperienceContent experiences={content.experiences} />
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
