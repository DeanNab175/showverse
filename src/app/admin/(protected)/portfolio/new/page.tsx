import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createProject } from "../actions";
import ProjectForm from "../project-form";

function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/portfolio" className="text-sm hover:text-primary">
        &larr; Back to portfolio
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add project
      </Heading>
      <ProjectForm action={createProject} submitLabel="Create" />
    </div>
  );
}

export default NewProjectPage;
