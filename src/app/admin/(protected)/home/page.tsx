import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

import SectionForm from "./section-form";

async function HomePage() {
  const section = await prisma.homeSection.findUnique({
    where: { id: "home_singleton" },
    include: { image: true },
  });

  return (
    <div>
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-4">
        Home
      </Heading>
      <SectionForm
        defaultValues={{
          wrapperClass: section?.wrapperClass ?? "",
          sectionClass: section?.sectionClass ?? "",
          contentWrapperClass: section?.contentWrapperClass ?? "",
          greetMessage: section?.greetMessage ?? "",
          name: section?.name ?? "",
          jobTitle: section?.jobTitle ?? "",
          shortDescription: section?.shortDescription ?? "",
          viewPageLinks: section?.viewPageLinks,
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
    </div>
  );
}

export default HomePage;
