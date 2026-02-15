import type { AboutSectionType } from "@/types/about-data-types";

const aboutData: AboutSectionType[] = [
  {
    id: "about_intro_section",
    name: "about_intro",
    type: "image-on-left",
    wrapperClass: "",
    sectionClass: "",
    image: {
      wrapperId: "about-image",
      wrapperClass: "image",
      isIllustration: true,
      illustration: {
        class: "w-[80%] mr-auto h-auto",
        html: "",
      },
      path: "/about-portfolio.jpg",
    },
    content: {
      wrapperClass: "content",
      heading: {
        class: "text-transition text-2xl font-extrabold mb-4 text-primary",
        text: "About",
        level: 1,
      },
      paragraphs: {
        body: [
          "Freelance Web and UI/UX Designer with extensive knowledge and years of experience in the web development and UI/UX design by develivering high standards and quality works.",
          "Sed varius quam quis sem consequat commodo. Pellentesque luctus enim quis orci sodales, in molestie libero auctor. Nam id eleifend urna.",
        ],
        class: "text-transition text-xs-plus mb-3",
      },
      experiences: {
        wrapperClass: "mt-10 mb-7",
        list: [
          { id: 1, total: 8, description: "Years experience" },
          { id: 2, total: 35, description: "Projects completed" },
          { id: 3, total: 4, description: "Companies worked" },
        ],
      },
      hobby: {
        heading: {
          class: "hobby-text-transition text-sm-plus font-medium mb-4",
          text: "My hobbies",
          level: 3,
        },
        list: [
          { id: 1, label: "Game", iconClass: "icon-game" },
          { id: 2, label: "Music", iconClass: "icon-music" },
          { id: 3, label: "Sport", iconClass: "icon-sport" },
          { id: 4, label: "Coding", iconClass: "icon-coding" },
        ],
      },
      cta: {
        label: "Download CV",
        variant: "secondary",
        iconClass: "icon-download",
        wrapperClass: "button-link mt-7",
      },
    },
    entryAnimations: [
      {
        selector: "#about-image",
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
        position: "-=1",
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
    ],
    scrollAnimations: [],
  },
  {
    id: "about_hire_banner_section",
    name: "about_hire_banner",
    type: "banner",
    wrapperClass: "mt-8",
    sectionClass:
      "hire-me-banner grid grid-cols-2 gap-4 items-center rounded-3xl bg-linear-90 from-primary to-secondary p-8 mb-5",
    content: {
      wrapperClass: "content",
      heading: {
        class: "hire-banner-text-transition text-sm-plus font-medium mb-1",
        text: "Do you have any project in mind?",
        level: 2,
      },
      paragraphs: {
        body: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        ],
        class: "hire-banner-text-transition text-xs-plus",
      },
      cta: {
        label: "Hire me",
        variant: "default",
        wrapperClass: "button-link text-right",
      },
    },
    entryAnimations: [],
    scrollAnimations: [
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
    ],
  },
];

export default aboutData;
