import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateNavbarLink } from "../actions";
import NavbarLinkForm from "../navbar-link-form";

interface EditNavbarLinkPageProps {
  params: Promise<{ id: string }>;
}

async function EditNavbarLinkPage({ params }: EditNavbarLinkPageProps) {
  const { id } = await params;
  const link = await prisma.navbarLink.findUnique({ where: { id } });

  if (!link) notFound();

  const boundAction = updateNavbarLink.bind(null, id);

  return (
    <div>
      <Link href="/admin/navbar" className="text-sm hover:text-primary">
        &larr; Back to navbar links
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit navbar link</h1>
      <NavbarLinkForm
        action={boundAction}
        defaultValues={link}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditNavbarLinkPage;
