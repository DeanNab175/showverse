import Link from "next/link";

import { createNavbarLink } from "../actions";
import NavbarLinkForm from "../navbar-link-form";

function NewNavbarLinkPage() {
  return (
    <div>
      <Link href="/admin/navbar" className="text-sm hover:text-primary">
        &larr; Back to navbar links
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add navbar link</h1>
      <NavbarLinkForm action={createNavbarLink} submitLabel="Create" />
    </div>
  );
}

export default NewNavbarLinkPage;
