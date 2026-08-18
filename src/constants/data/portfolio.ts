import { PortfolioSectionType } from "@/types/portfolio-data-types";

const portfolioData: PortfolioSectionType[] = [
  {
    id: "portfolio_section",
    name: "portfolio",
    class: "mb-4",
    content: {
      heading: {
        text: "Portfolio",
        level: 2,
        class: "text-transition text-xl mb-4 font-medium",
      },
      projects: {
        wrapperClass: "grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-8",
        perPage: 6,
        list: [
          {
            id: "bladify",
            title: "Bladify",
            description:
              "Ecommerce template build with Bootstrap, CSS, HTML, JavaScript",
            thumbnail: "/portfolio/bladify.jpg",
          },
          {
            id: "blogin",
            title: "Blogin",
            description: "Blogin is a jekyll theme",
            thumbnail: "/portfolio/blogin.jpg",
          },
          {
            id: "canvas-particles",
            title: "Canvas Particles",
            description:
              "Animating circles particles in canvas built with JavaScript",
            thumbnail: "/portfolio/canvas-particles.jpg",
          },
          {
            id: "movie-land",
            title: "Movie Land",
            description: "A react movie app",
            thumbnail: "/portfolio/movieland.jpg",
          },
          {
            id: "cloudcafe",
            title: "Cloudcafe",
            description: "Cloud cafe app built with",
            thumbnail: "/portfolio/cloud-cafe.jpg",
          },
          {
            id: "natours",
            title: "Natours",
            description: "An HTML5 template built with SASS",
            thumbnail: "/portfolio/natours.jpg",
          },
          {
            id: "bootstrap-portfolio",
            title: "Bootstrap Porfolio Template",
            description: "Bootstrap theming",
            thumbnail: "/portfolio/bootstrap-portfolio.jpg",
          },
          {
            id: "catering",
            title: "Catering",
            description:
              "A catering template built with HTML5, CSS3, SASS, Compass, Flexbox and JavaScript",
            thumbnail: "/portfolio/catering.jpg",
          },
          {
            id: "faded",
            title: "Faded",
            description:
              "A multipurpose HTML template built with jQuery and Bootstrap",
            thumbnail: "/portfolio/faded.jpg",
          },
          {
            id: "imagelib",
            title: "Imagelib",
            description: "A react app based on pixabay api",
            thumbnail: "/portfolio/imagelib.jpg",
          },
          {
            id: "coinsearch",
            title: "Coinsearch",
            description:
              "Coinsearch is a cryptocurrency app built with JavaScript and coincap API",
            thumbnail: "/portfolio/coinsearch.jpg",
          },
        ],
      },
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
      },
      {
        selector: ".project-item",
        animation: {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out",
        },
        stagger: 0.15,
        position: "<",
      },
    ],
    scrollAnimations: [],
  },
];

export default portfolioData;
