// Populated domain-by-domain as each is migrated off src/constants/**.
// See the migration plan for the full rollout order.

import "dotenv/config";

import { prisma } from "../src/lib/prisma";
import navbarLinks from "../src/constants/navbar-links";
import socialMediaLinks from "../src/constants/social-media-links";

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

async function main() {
  await seedNavbarLinks();
  await seedSocialMediaLinks();
  await seedSiteSettings();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
