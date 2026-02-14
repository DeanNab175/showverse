import AboutContent from "@/components/contents/about-content";
import { EntryAnimationType } from "@/types/animations-types";

// TODO: fetch this from a database in the future
const scrollAnimationsConfig = [
  {
    selector: "#section-about_hire_banner",
    animation: {
      from: { opacity: 0, y: 100 },
      to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    },
    scrollTrigger: {
      markers: false,
      start: "top bottom",
      toggleActions: "play none none none",
    },
  },
  // Add more configurations here
];

// Entry animations configuration
const entryAnimationsConfig: EntryAnimationType[] = [
  {
    selector: "image", // Special key for imageRef
    animation: {
      opacity: 0,
      xPercent: -100,
      duration: 0.5,
      ease: "circ.out",
    },
  },
  {
    selector: ".text-transition",
    animation: {
      opacity: 0,
      y: 16,
      // rotate: 5,
      duration: 0.3,
      ease: "power2.out",
    },
    stagger: 0.15,
  },
  {
    selector: ".experience-card",
    animation: {
      opacity: 0,
      y: 20,
      rotate: 10,
      duration: 0.3,
      ease: "power2.out",
    },
    stagger: 0.15,
  },
  {
    selector: ".hobby-text-transition",
    animation: {
      opacity: 0,
      y: 16,
      duration: 0.3,
      ease: "power2.out",
    },
  },
  {
    selector: ".hobby-item",
    animation: {
      opacity: 0,
      y: 20,
      rotate: 10,
      duration: 0.3,
      ease: "power2.out",
    },
    stagger: 0.15,
  },
  {
    selector: ".button-link",
    animation: {
      y: 16,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    },
  },
];

export default function AboutPage() {
  return (
    <AboutContent
      entryAnimations={entryAnimationsConfig}
      scrollAnimations={scrollAnimationsConfig}
    />
  );
}
