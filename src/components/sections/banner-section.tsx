import { cn } from "@/lib/utils";

import { AboutSectionType } from "@/types/about-data-types";

import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";

interface BannerSectionProps {
  section: AboutSectionType;
}

export default function BannerSection({ section }: BannerSectionProps) {
  const {
    content: sectionContent,
    name: sectionName,
    sectionClass,
    wrapperClass: sectionWrapperClass,
    ctaWrapperClass,
  } = section;

  return (
    <div
      className={cn("h-full flex flex-col justify-center", sectionWrapperClass)}
    >
      <section id={`section-${sectionName}`} className={sectionClass}>
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
        </article>
        <article className={ctaWrapperClass}>
          {sectionContent.cta && (
            <div className={sectionContent.cta.wrapperClass}>
              <Button variant={sectionContent.cta.variant}>
                {sectionContent.cta.label}
              </Button>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
