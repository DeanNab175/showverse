import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createSocialLink } from "../actions";
import SocialLinkForm from "../social-link-form";

function NewSocialLinkPage() {
  return (
    <div>
      <Link href="/admin/social-links" className="text-sm hover:text-primary">
        &larr; Back to social links
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add social link
      </Heading>
      <SocialLinkForm action={createSocialLink} submitLabel="Create" />
    </div>
  );
}

export default NewSocialLinkPage;
