import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit navbar link
      </Heading>
      <NavbarLinkForm
        action={boundAction}
        defaultValues={link}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditNavbarLinkPage;
