import Link from "next/link";
import type { Experience, Hobby } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";

import { deleteExperience, deleteHobby } from "./actions";
import SectionForm from "./section-form";

async function AboutPage() {
  const section = await prisma.aboutIntroSection.findUnique({
    where: { id: "about_intro_singleton" },
    include: {
      image: true,
      experiences: { orderBy: { sortOrder: "asc" } },
      hobbies: { orderBy: { sortOrder: "asc" } },
    },
  });

  return (
    <div>
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-4">
        About
      </Heading>

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
          experiencesWrapperClass: section?.experiencesWrapperClass ?? "",
          hobbyHeadingText: section?.hobbyHeadingText ?? "",
          hobbyHeadingLevel: section?.hobbyHeadingLevel ?? "",
          hobbyHeadingClass: section?.hobbyHeadingClass ?? "",
          ctaLabel: section?.ctaLabel ?? "",
          ctaVariant: section?.ctaVariant ?? "",
          ctaIconClass: section?.ctaIconClass ?? "",
          ctaWrapperClass: section?.ctaWrapperClass ?? "",
          imageWrapperId: section?.image?.wrapperId ?? "",
          imageWrapperClass: section?.image?.wrapperClass ?? "",
          isIllustration: section?.image?.isIllustration ?? false,
          illustrationHtml: section?.image?.illustrationHtml ?? "",
          illustrationClass: section?.image?.illustrationClass ?? "",
          imagePath: section?.image?.path ?? "",
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-xl font-medium">Experiences</Heading>
        <Button asChild size="sm">
          <Link href="/admin/about/experiences/new">Add experience</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        {(section?.experiences ?? []).map((experience: Experience) => (
          <div
            key={experience.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{experience.total}+</span>
              <span>{experience.description}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/about/experiences/${experience.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteExperience.bind(null, experience.id)}
                confirmMessage={`Delete "${experience.description}"?`}
              />
            </div>
          </div>
        ))}
        {(section?.experiences ?? []).length === 0 && (
          <p className="text-sm text-body-txt/60">No experiences yet.</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-xl font-medium">Hobbies</Heading>
        <Button asChild size="sm">
          <Link href="/admin/about/hobbies/new">Add hobby</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {(section?.hobbies ?? []).map((hobby: Hobby) => (
          <div
            key={hobby.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <i className={`${hobby.iconClass} text-xl`} />
              <span className="font-medium">{hobby.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/about/hobbies/${hobby.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteHobby.bind(null, hobby.id)}
                confirmMessage={`Delete "${hobby.label}"?`}
              />
            </div>
          </div>
        ))}
        {(section?.hobbies ?? []).length === 0 && (
          <p className="text-sm text-body-txt/60">No hobbies yet.</p>
        )}
      </div>
    </div>
  );
}

export default AboutPage;
