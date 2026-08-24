// Populated domain-by-domain as each is migrated off src/constants/**.
// See the migration plan for the full rollout order.

import "dotenv/config";

import { prisma } from "../src/lib/prisma";
import navbarLinks from "../src/constants/navbar-links";
import socialMediaLinks from "../src/constants/social-media-links";
import pagesMetadata from "../src/constants/data/metadata";
import skillsData from "../src/constants/data/skills";
import portfolioData from "../src/constants/data/portfolio";
import homeData from "../src/constants/data/home";
import aboutData from "../src/constants/data/about";

async function seedNavbarLinks() {
  const count = await prisma.navbarLink.count();
  if (count > 0) return;

  await prisma.navbarLink.createMany({
    data: navbarLinks.map((link, index) => ({
      name: link.name,
      href: link.href,
      iconClass: link.iconClass,
      iconFontSizeClass: link.iconFontSizeClass,
      sortOrder: index,
    })),
  });
  console.log(`Seeded ${navbarLinks.length} navbar links.`);
}

async function seedSocialMediaLinks() {
  const count = await prisma.socialMediaLink.count();
  if (count > 0) return;

  await prisma.socialMediaLink.createMany({
    data: socialMediaLinks.map((link, index) => ({
      name: link.name,
      href: link.href,
      iconClass: link.iconClass,
      hoverColorClass: link.hoverColorClass,
      sortOrder: index,
    })),
  });
  console.log(`Seeded ${socialMediaLinks.length} social media links.`);
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", contactEmail: "dsmith@gmail.com" },
  });
  console.log("Seeded site settings.");
}

async function seedPageMetadata() {
  const count = await prisma.pageMetadata.count();
  if (count > 0) return;

  await prisma.pageMetadata.createMany({
    data: Object.entries(pagesMetadata).map(([pageKey, meta]) => ({
      pageKey,
      title: String(meta.title ?? ""),
      description: String(meta.description ?? ""),
    })),
  });
  console.log(`Seeded ${Object.keys(pagesMetadata).length} page metadata rows.`);
}

async function seedServices() {
  const existing = await prisma.skillsServicesSection.findUnique({
    where: { id: "services_singleton" },
  });
  if (existing) return;

  const section = skillsData.find((s) => s.id === "services_section");
  const services = section?.content.services?.list ?? [];
  const heading = section?.content.heading;

  await prisma.skillsServicesSection.create({
    data: {
      id: "services_singleton",
      sectionClass: section?.class ?? null,
      headingText: heading?.text ?? null,
      headingLevel: heading?.level ?? null,
      headingClass: heading?.class ?? null,
      servicesWrapperClass: section?.content.services?.wrapperClass ?? null,
      entryAnimations: JSON.parse(JSON.stringify(section?.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section?.scrollAnimations ?? [])),
      services: {
        create: services.map((service, index) => ({
          iconClass: service.iconClass,
          title: service.title,
          description: service.description,
          sortOrder: index,
        })),
      },
    },
  });
  console.log(`Seeded services section with ${services.length} services.`);
}

async function seedPortfolio() {
  const existing = await prisma.portfolioSection.findUnique({
    where: { id: "portfolio_singleton" },
  });
  if (existing) return;

  const section = portfolioData[0];
  const projects = section?.content.projects?.list ?? [];
  const heading = section?.content.heading;

  await prisma.portfolioSection.create({
    data: {
      id: "portfolio_singleton",
      sectionClass: section?.class ?? null,
      headingText: heading?.text ?? null,
      headingLevel: heading?.level ?? null,
      headingClass: heading?.class ?? null,
      projectsWrapperClass: section?.content.projects?.wrapperClass ?? null,
      perPage: section?.content.projects?.perPage ?? 6,
      entryAnimations: JSON.parse(JSON.stringify(section?.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section?.scrollAnimations ?? [])),
      projects: {
        // Images stay as their existing /public paths for now - the Blobs
        // pipeline only touches an image once an admin re-uploads it.
        create: projects.map((project, index) => ({
          slug: project.id,
          title: project.title,
          description: project.description,
          thumbnailUrl: project.thumbnail,
          previewUrl: project.previewUrl ?? null,
          sortOrder: index,
        })),
      },
    },
  });
  console.log(`Seeded portfolio section with ${projects.length} projects.`);
}

async function seedSkillCategories() {
  const existing = await prisma.skillsCategoriesSection.findUnique({
    where: { id: "skills_categories_singleton" },
  });
  if (existing) return;

  const section = skillsData.find((s) => s.id === "skills_section");
  const categories = section?.content.categories ?? [];
  const heading = section?.content.heading;

  await prisma.skillsCategoriesSection.create({
    data: {
      id: "skills_categories_singleton",
      sectionClass: section?.class ?? null,
      headingText: heading?.text ?? null,
      headingLevel: heading?.level ?? null,
      headingClass: heading?.class ?? null,
      entryAnimations: JSON.parse(JSON.stringify(section?.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section?.scrollAnimations ?? [])),
      categories: {
        create: categories.map((category, index) => ({
          slug: category.id,
          labelText: category.label.text,
          labelClass: category.label.class ?? null,
          itemsWrapperClass: category.items.wrapperClass ?? null,
          sortOrder: index,
          items: {
            create: category.items.list.map((item, itemIndex) => ({
              name: item.name,
              iconUrl: item.iconPath,
              sortOrder: itemIndex,
            })),
          },
        })),
      },
    },
  });
  console.log(
    `Seeded skill categories section with ${categories.length} categories.`
  );
}

async function seedHomeSection() {
  const existing = await prisma.homeSection.findUnique({
    where: { id: "home_singleton" },
  });
  if (existing) return;

  const section = homeData[0];
  const content = section.content;
  const image = section.image;

  await prisma.homeSection.create({
    data: {
      id: "home_singleton",
      wrapperClass: section.wrapperClass ?? null,
      sectionClass: section.sectionClass ?? null,
      contentWrapperClass: content.wrapperClass ?? null,
      greetMessage: content.greetMessage,
      name: content.name,
      jobTitle: content.jobTitle,
      shortDescription: content.shortDescription,
      viewPageLinks: JSON.parse(JSON.stringify(content.viewPage ?? [])),
      entryAnimations: JSON.parse(JSON.stringify(section.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section.scrollAnimations ?? [])),
      image: image
        ? {
            create: {
              wrapperId: image.wrapperId ?? null,
              wrapperClass: image.wrapperClass ?? null,
              isIllustration: image.isIllustration ?? false,
              illustrationHtml: image.illustration?.html ?? null,
              illustrationClass: image.illustration?.class ?? null,
              path: image.path,
            },
          }
        : undefined,
    },
  });
  console.log("Seeded home section.");
}

async function seedAboutIntroSection() {
  const existing = await prisma.aboutIntroSection.findUnique({
    where: { id: "about_intro_singleton" },
  });
  if (existing) return;

  const section = aboutData.find((s) => s.id === "about_intro_section");
  if (!section) return;

  const content = section.content;
  const image = section.image;
  const experiences = content.experiences?.list ?? [];
  const hobbies = content.hobby?.list ?? [];

  await prisma.aboutIntroSection.create({
    data: {
      id: "about_intro_singleton",
      wrapperClass: section.wrapperClass ?? null,
      sectionClass: section.sectionClass ?? null,
      contentWrapperClass: content.wrapperClass ?? null,
      headingText: content.heading?.text ?? null,
      headingLevel: content.heading?.level ?? null,
      headingClass: content.heading?.class ?? null,
      paragraphsBody: content.paragraphs?.body ?? [],
      paragraphsClass: content.paragraphs?.class ?? null,
      experiencesWrapperClass: content.experiences?.wrapperClass ?? null,
      hobbyHeadingText: content.hobby?.heading?.text ?? null,
      hobbyHeadingLevel: content.hobby?.heading?.level ?? null,
      hobbyHeadingClass: content.hobby?.heading?.class ?? null,
      ctaLabel: content.cta?.label ?? null,
      ctaVariant: content.cta?.variant ?? null,
      ctaIconClass: content.cta?.iconClass ?? null,
      ctaWrapperClass: content.cta?.wrapperClass ?? null,
      entryAnimations: JSON.parse(JSON.stringify(section.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section.scrollAnimations ?? [])),
      image: image
        ? {
            create: {
              wrapperId: image.wrapperId ?? null,
              wrapperClass: image.wrapperClass ?? null,
              isIllustration: image.isIllustration ?? false,
              illustrationHtml: image.illustration?.html ?? null,
              illustrationClass: image.illustration?.class ?? null,
              path: image.path,
            },
          }
        : undefined,
      experiences: {
        create: experiences.map((experience, index) => ({
          total: experience.total,
          description: experience.description,
          sortOrder: index,
        })),
      },
      hobbies: {
        create: hobbies.map((hobby, index) => ({
          label: hobby.label,
          iconClass: hobby.iconClass,
          sortOrder: index,
        })),
      },
    },
  });
  console.log(
    `Seeded about intro section with ${experiences.length} experiences and ${hobbies.length} hobbies.`
  );
}

async function seedAboutHireBannerSection() {
  const existing = await prisma.aboutHireBannerSection.findUnique({
    where: { id: "about_hire_banner_singleton" },
  });
  if (existing) return;

  const section = aboutData.find((s) => s.id === "about_hire_banner_section");
  if (!section) return;

  const content = section.content;

  await prisma.aboutHireBannerSection.create({
    data: {
      id: "about_hire_banner_singleton",
      wrapperClass: section.wrapperClass ?? null,
      sectionClass: section.sectionClass ?? null,
      contentWrapperClass: content.wrapperClass ?? null,
      headingText: content.heading?.text ?? null,
      headingLevel: content.heading?.level ?? null,
      headingClass: content.heading?.class ?? null,
      paragraphsBody: content.paragraphs?.body ?? [],
      paragraphsClass: content.paragraphs?.class ?? null,
      ctaLabel: content.cta?.label ?? null,
      ctaVariant: content.cta?.variant ?? null,
      ctaWrapperClass: content.cta?.wrapperClass ?? null,
      ctaColumnClass: section.ctaWrapperClass ?? null,
      entryAnimations: JSON.parse(JSON.stringify(section.entryAnimations ?? [])),
      scrollAnimations: JSON.parse(JSON.stringify(section.scrollAnimations ?? [])),
    },
  });
  console.log("Seeded about hire banner section.");
}

async function main() {
  await seedNavbarLinks();
  await seedSocialMediaLinks();
  await seedSiteSettings();
  await seedPageMetadata();
  await seedServices();
  await seedPortfolio();
  await seedSkillCategories();
  await seedHomeSection();
  await seedAboutIntroSection();
  await seedAboutHireBannerSection();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
