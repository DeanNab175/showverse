import { SkillsSectionType } from "@/types/skills-data-types";

const skillsData: SkillsSectionType[] = [
  {
    id: "skills_section",
    name: "skills",
    class: "mb-4",
    content: {
      heading: {
        text: "Skills",
        level: 2,
        class: "text-transition text-xl mb-4 font-medium",
      },
      categories: [
        {
          id: "web-developer-category",
          label: {
            text: "Web developer",
            class: "category-label-text text-base mb-3",
          },
          items: {
            wrapperClass: "max-w-full lg:max-w-[38%] mb-4 lg:mb-0",
            list: [
              { name: "HTML5", iconPath: "/skill-icons/html5.svg" },
              { name: "CSS3", iconPath: "/skill-icons/css3.svg" },
              { name: "JavaScript", iconPath: "/skill-icons/javascript.svg" },
              { name: "Sass", iconPath: "/skill-icons/sass.svg" },
              { name: "React", iconPath: "/skill-icons/react.svg" },
              { name: "Vue.js", iconPath: "/skill-icons/vue.svg" },
              { name: "Node.js", iconPath: "/skill-icons/node-js.svg" },
              { name: "PHP", iconPath: "/skill-icons/php.svg" },
              { name: "Git", iconPath: "/skill-icons/git.svg" },
              { name: "MySQL", iconPath: "/skill-icons/mysql.svg" },
            ],
          },
        },
        {
          id: "ui-ux-category",
          label: {
            text: "UI/UX designer",
            class: "category-label-text text-base mb-3",
          },
          items: {
            wrapperClass: "max-w-full lg:max-w-[38%]",
            list: [
              { name: "Figma", iconPath: "/skill-icons/figma.svg" },
              { name: "Adobe XD", iconPath: "/skill-icons/adobe-xd.svg" },
              {
                name: "Photoshop",
                iconPath: "/skill-icons/adobe-photoshop.svg",
              },
              {
                name: "Illustrator",
                iconPath: "/skill-icons/adobe-illustrator.svg",
              },
              {
                name: "Premiere Pro",
                iconPath: "/skill-icons/adobe-premiere.svg",
              },
              {
                name: "After Effects",
                iconPath: "/skill-icons/adobe-after-effects.svg",
              },
              { name: "Animate", iconPath: "/skill-icons/adobe-animate.svg" },
              {
                name: "Dreamweaver",
                iconPath: "/skill-icons/adobe-dreamweaver.svg",
              },
              { name: "3ds Max", iconPath: "/skill-icons/3ds-max-full.svg" },
              { name: "Maya", iconPath: "/skill-icons/maya-2017.svg" },
            ],
          },
        },
      ],
    },
    entryAnimations: [
      {
        selector: ".text-transition",
        animation: {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
        },
        position: "-=1",
      },
      {
        selector: "#web-developer-category .category-label-text",
        animation: {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
        },
        position: "<",
      },
      {
        selector: "#web-developer-category .category-item",
        animation: {
          opacity: 0,
          y: 20,
          rotate: 10,
          duration: 0.3,
          ease: "power2.out",
        },
        stagger: 0.15,
        position: "<",
      },
      {
        selector: "#ui-ux-category .category-label-text",
        animation: {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
        },
      },
      {
        selector: "#ui-ux-category .category-item",
        animation: {
          opacity: 0,
          y: 20,
          rotate: 10,
          duration: 0.3,
          ease: "power2.out",
        },
        stagger: 0.15,
        position: "<",
      },
    ],
    scrollAnimations: [],
  },
  {
    id: "services_section",
    name: "services",
    class: "py-6",
    content: {
      heading: {
        text: "Services",
        level: 2,
        class: "service-text-transition text-xl mb-7 font-medium",
      },
      services: {
        wrapperClass: "grid grid-cols-2 lg:grid-cols-3 gap-5",
        list: [
          {
            iconClass: "icon-coding",
            title: "Web Development",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
          {
            iconClass: "icon-paint-brush",
            title: "UI/UX Design",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
          {
            iconClass: "icon-palette",
            title: "Graphic Design",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
          {
            iconClass: "icon-color-bucket",
            title: "Web Design",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
          {
            iconClass: "icon-library",
            title: "UX Research",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
          {
            iconClass: "icon-search-codes",
            title: "SEO",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
          },
        ],
      },
    },
    entryAnimations: [
      {
        selector: ".service-text-transition",
        animation: {
          opacity: 0,
          y: 16,
          duration: 0.3,
          ease: "power2.out",
        },
        stagger: 0.15,
      },
    ],
    scrollAnimations: [
      {
        selector: ".service-item",
        animation: {
          from: { opacity: 0, y: 20, rotate: 2 },
          to: {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
          },
        },
        scrollTrigger: {
          start: "75% bottom",
          toggleActions: "play none none none",
        },
        stagger: 0.15,
      },
    ],
  },
];

export default skillsData;
