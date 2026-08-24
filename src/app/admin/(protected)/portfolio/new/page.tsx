import Link from "next/link";

import { createProject } from "../actions";
import ProjectForm from "../project-form";

function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/portfolio" className="text-sm hover:text-primary">
        &larr; Back to portfolio
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add project</h1>
      <ProjectForm action={createProject} submitLabel="Create" />
    </div>
  );
}

export default NewProjectPage;
