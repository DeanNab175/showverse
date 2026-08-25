import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createExperience } from "../../actions";
import ExperienceForm from "../../experience-form";

function NewExperiencePage() {
  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add experience
      </Heading>
      <ExperienceForm action={createExperience} submitLabel="Create" />
    </div>
  );
}

export default NewExperiencePage;
