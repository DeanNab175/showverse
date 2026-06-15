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
            { name: "HTML5", iconPath: "skill-icons/html5.png" },
            { name: "CSS3", iconPath: "skill-icons/css3.png" },
            { name: "JavaScript", iconPath: "skill-icons/javascript.png" },
            { name: "Sass", iconPath: "skill-icons/sass.png" },
            { name: "React", iconPath: "skill-icons/react.png" },
            { name: "Vue.js", iconPath: "skill-icons/vue.png" },
            { name: "Node.js", iconPath: "skill-icons/nodejs.png" },
            { name: "PHP", iconPath: "skill-icons/php.png" },
            { name: "Git", iconPath: "skill-icons/git.png" },
            { name: "MySQL", iconPath: "skill-icons/mysql.png" },
          ],
        },
        {
          label: "UI/UX designer",
          items: [
            { name: "Figma", iconPath: "skill-icons/figma.png" },
            { name: "Adobe XD", iconPath: "skill-icons/adobe-xd.png" },
            { name: "Photoshop", iconPath: "skill-icons/adobe-photoshop.png" },
            {
              name: "Illustrator",
              iconPath: "skill-icons/adobe-illustrator.png",
            },
            {
              name: "Premiere Pro",
              iconPath: "skill-icons/adobe-premiere.png",
            },
            {
              name: "After Effects",
              iconPath: "skill-icons/adobe-after-effects.png",
            },
            { name: "Animate", iconPath: "skill-icons/adobe-animate.png" },
            {
              name: "Dreamweaver",
              iconPath: "skill-icons/adobe-dreamweaver.png",
            },
            { name: "3ds Max", iconPath: "skill-icons/3ds-max-full.png" },
            { name: "Maya", iconPath: "skill-icons/maya-2017.png" },
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
          title: "Web Development",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Pen",
          title: "UI/UX Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Palette",
          title: "Graphic Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "Wand2",
          title: "Web Design",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "BarChart2",
          title: "UX Research",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
        {
          icon: "SearchCheck",
          title: "SEO",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at porta turpis.",
        },
      ],
    },
  },
];

export default skillsData;
