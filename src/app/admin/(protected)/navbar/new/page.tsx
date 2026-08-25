import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createNavbarLink } from "../actions";
import NavbarLinkForm from "../navbar-link-form";

function NewNavbarLinkPage() {
  return (
    <div>
      <Link href="/admin/navbar" className="text-sm hover:text-primary">
        &larr; Back to navbar links
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add navbar link
      </Heading>
      <NavbarLinkForm action={createNavbarLink} submitLabel="Create" />
    </div>
  );
}

export default NewNavbarLinkPage;
