import AboutContent from "@/components/contents/about-content";

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

export default function AboutPage() {
  return <AboutContent scrollAnimations={scrollAnimationsConfig} />;
}
