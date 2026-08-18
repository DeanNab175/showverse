import type { Metadata } from "next";

type PageKey = "home" | "about" | "portfolio" | "skills" | "contact";

const pagesMetadata: Record<PageKey, Metadata> = {
  home: {
    title: "Home",
    description:
      "Hello, I'm Donald Smith — Freelance Web & UI/UX Designer who builds digital experiences that work beautifully and feel effortless.",
  },
  about: {
    title: "About",
    description:
      "Learn about Donald Smith, a Freelance Web & UI/UX Designer with 8 years of experience and 35 completed projects, passionate about crafting great digital experiences.",
  },
  portfolio: {
    title: "Portfolio",
    description:
      "Browse selected web and UI/UX design projects by Donald Smith — from concept to polished, production-ready experiences.",
  },
  skills: {
    title: "Skills",
    description:
      "Technical and design skills of Donald Smith — web development, UI/UX design, and the tools behind every project.",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with Donald Smith for freelance web development and UI/UX design projects.",
  },
};

export default pagesMetadata;
