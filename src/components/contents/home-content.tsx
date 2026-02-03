"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "../ui/button";
import HomeIllustration from "../illustrations/home-illustration";
import { useTransition } from "@/contexts/transition-context";
import homeData from "@/constants/data/home";

gsap.registerPlugin(useGSAP);

function HomeContent() {
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

        tl.from(textItems, {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.15,
        }).from(".button-link", {
          y: 16,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        if (imageRef.current) {
          tl.from(
            imageRef.current,
            {
              opacity: 0,
              xPercent: 100,
              duration: 0.5,
              ease: "circ.out",
            },
            "<"
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className="h-full flex flex-col justify-center">
      {homeData.map(({ name, content }) => (
        <section
          key={name}
          ref={sectionRef}
          id={`section-${name}`}
          className="grid grid-cols-[minmax(0,9fr)_minmax(0,11fr)] gap-4 items-center"
        >
          <article className="content">
            <div className="max-w-9/12">
              <h6 className="home-text text-xs">{content.greetMessage}</h6>
              <h1 className="home-text text-4xl -ml-0.5 mb-4 text-primary font-extrabold">
                {content.name}
              </h1>
              <h2 className="home-text text-base mb-1.5">{content.jobTitle}</h2>
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
          <article ref={imageRef} className="image">
            <HomeIllustration className="w-[95%] ml-auto h-auto" />
          </article>
        </section>
      ))}
    </div>
  );
}

export default HomeContent;
