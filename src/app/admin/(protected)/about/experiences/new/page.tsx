import Link from "next/link";

import { createExperience } from "../../actions";
import ExperienceForm from "../../experience-form";

function NewExperiencePage() {
  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add experience</h1>
      <ExperienceForm action={createExperience} submitLabel="Create" />
    </div>
  );
}

export default NewExperiencePage;
