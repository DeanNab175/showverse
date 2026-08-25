import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";

import { deleteSocialLink } from "./actions";

async function SocialLinksPage() {
  const links = await prisma.socialMediaLink.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Heading level={1} className="text-2xl font-extrabold text-primary">
          Social links
        </Heading>
        <Button asChild size="sm">
          <Link href="/admin/social-links/new">Add link</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <i className={`${link.iconClass} text-xl`} />
              <span className="font-medium">{link.name}</span>
              <span className="text-sm text-body-txt/60">{link.href}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/social-links/${link.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteSocialLink.bind(null, link.id)}
                confirmMessage={`Delete "${link.name}"?`}
              />
            </div>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-body-txt/60">No social links yet.</p>
        )}
      </div>
    </div>
  );
}

export default SocialLinksPage;
