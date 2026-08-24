import Link from "next/link";

import { createSocialLink } from "../actions";
import SocialLinkForm from "../social-link-form";

function NewSocialLinkPage() {
  return (
    <div>
      <Link href="/admin/social-links" className="text-sm hover:text-primary">
        &larr; Back to social links
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add social link</h1>
      <SocialLinkForm action={createSocialLink} submitLabel="Create" />
    </div>
  );
}

export default NewSocialLinkPage;
