import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateSocialLink } from "../actions";
import SocialLinkForm from "../social-link-form";

interface EditSocialLinkPageProps {
  params: Promise<{ id: string }>;
}

async function EditSocialLinkPage({ params }: EditSocialLinkPageProps) {
  const { id } = await params;
  const link = await prisma.socialMediaLink.findUnique({ where: { id } });

  if (!link) notFound();

  const boundAction = updateSocialLink.bind(null, id);

  return (
    <div>
      <Link href="/admin/social-links" className="text-sm hover:text-primary">
        &larr; Back to social links
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit social link</h1>
      <SocialLinkForm
        action={boundAction}
        defaultValues={link}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditSocialLinkPage;
