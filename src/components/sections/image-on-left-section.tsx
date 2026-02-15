import Image from "next/image";
import { cn } from "@/lib/utils";

import { AboutSectionType } from "@/types/about-data-types";

import AboutIllustration from "@/components/illustrations/about-illustration";
import Heading from "@/components/typography/heading";
import ExperienceContent from "@/components/experience/experience-content";
import HobbyContent from "@/components/hobby/hobby-content";
import { Button } from "@/components/ui/button";

interface ImageOnLeftSectionProps {
  section: AboutSectionType;
}

export default function ImageOnLeftSection({
  section,
}: ImageOnLeftSectionProps) {
  const {
    content: sectionContent,
    image: sectionImage,
    name: sectionName,
    sectionClass,
    wrapperClass: sectionWrapperClass,
  } = section;

  return (
    <div
      className={cn("h-full flex flex-col justify-center", sectionWrapperClass)}
    >
      <section
        id={`section-${sectionName}`}
        className={cn(
          "grid grid-cols-[minmax(0,11fr)_minmax(0,9fr)] gap-4 items-center",
          sectionClass
        )}
      >
        <article
          id={sectionImage?.wrapperId}
          className={sectionImage?.wrapperClass}
        >
          {sectionImage?.isIllustration ? (
            <AboutIllustration
              className={cn(
                "w-[80%] mr-auto h-auto",
                sectionImage?.illustration?.class
              )}
            />
          ) : (
            <Image
              src={sectionImage?.path as string}
              alt="About portfolio image"
              width={500}
              height={500}
            />
          )}
        </article>

        <article className={sectionContent.wrapperClass}>
          {sectionContent.heading && (
            <Heading
              level={sectionContent.heading.level}
              className={sectionContent.heading.class}
            >
              {sectionContent.heading.text}
            </Heading>
          )}

          {sectionContent.paragraphs?.body.map((paragraph, i) => (
            <p key={i} className={sectionContent.paragraphs?.class}>
              {paragraph}
            </p>
          ))}

          {sectionContent.experiences && (
            <div className={sectionContent.experiences.wrapperClass}>
              <ExperienceContent
                experiences={sectionContent.experiences.list}
              />
            </div>
          )}

          {sectionContent.hobby?.heading && (
            <Heading
              level={sectionContent.hobby?.heading.level}
              className={sectionContent.hobby?.heading.class}
            >
              {sectionContent.hobby?.heading.text}
            </Heading>
          )}

          {sectionContent.hobby?.list &&
            sectionContent.hobby.list.length > 0 && (
              <HobbyContent hobbies={sectionContent.hobby?.list} />
            )}

          {sectionContent.cta && (
            <div className={sectionContent.cta.wrapperClass}>
              <Button variant={sectionContent.cta.variant}>
                {sectionContent.cta.label}
                {sectionContent.cta.iconClass && (
                  <span className="text-base">
                    <i className={sectionContent.cta.iconClass}></i>
                  </span>
                )}
              </Button>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
