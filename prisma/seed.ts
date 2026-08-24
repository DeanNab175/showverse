// Populated domain-by-domain as each is migrated off src/constants/**.
// See the migration plan for the full rollout order.

import "dotenv/config";

import { prisma } from "../src/lib/prisma";
import navbarLinks from "../src/constants/navbar-links";
import socialMediaLinks from "../src/constants/social-media-links";
import pagesMetadata from "../src/constants/data/metadata";
import skillsData from "../src/constants/data/skills";
import portfolioData from "../src/constants/data/portfolio";

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

async function main() {
  await seedNavbarLinks();
  await seedSocialMediaLinks();
  await seedSiteSettings();
  await seedPageMetadata();
  await seedServices();
  await seedPortfolio();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
