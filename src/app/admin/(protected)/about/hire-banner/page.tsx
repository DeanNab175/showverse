import Link from "next/link";

import { prisma } from "@/lib/prisma";

import SectionForm from "./section-form";

async function HireBannerPage() {
  const section = await prisma.aboutHireBannerSection.findUnique({
    where: { id: "about_hire_banner_singleton" },
  });

  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">About - Hire banner</h1>
      <SectionForm
        defaultValues={{
          wrapperClass: section?.wrapperClass ?? "",
          sectionClass: section?.sectionClass ?? "",
          contentWrapperClass: section?.contentWrapperClass ?? "",
          headingText: section?.headingText ?? "",
          headingLevel: section?.headingLevel ?? "",
          headingClass: section?.headingClass ?? "",
          paragraphsBody: section?.paragraphsBody ?? [],
          paragraphsClass: section?.paragraphsClass ?? "",
          ctaLabel: section?.ctaLabel ?? "",
          ctaVariant: section?.ctaVariant ?? "",
          ctaWrapperClass: section?.ctaWrapperClass ?? "",
          ctaColumnClass: section?.ctaColumnClass ?? "",
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />
    </div>
  );
}

export default HireBannerPage;
