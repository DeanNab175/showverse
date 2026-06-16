import { SkillsSectionType } from "@/types/skills-data-types";

const skillsData: SkillsSectionType[] = [
  {
    id: "skills_section",
    name: "skills",
    content: {
      heading: {
        text: "Skills",
        level: 2,
      },
      categories: [
        {
          label: "Web developer",
          items: [
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
        {
          label: "UI/UX designer",
          items: [
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
      ],
    },
  },
  {
    id: "services_section",
    name: "services",
    content: {
      heading: {
        text: "Services",
        level: 2,
      },
      services: [
        {
          icon: "FileCode2",
          iconClass: "icon-coding",
          title: "Web Development",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Pen",
          iconClass: "icon-paint-brush",
          title: "UI/UX Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Palette",
          iconClass: "icon-palette",
          title: "Graphic Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Wand2",
          iconClass: "icon-color-bucket",
          title: "Web Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "BarChart2",
          iconClass: "icon-library",
          title: "UX Research",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "SearchCheck",
          iconClass: "icon-search-codes",
          title: "SEO",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
      ],
    },
  },
];

export default skillsData;
