import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { deleteNavbarLink } from "./actions";
import DeleteButton from "./delete-button";

async function NavbarLinksPage() {
  const links = await prisma.navbarLink.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium">Navbar links</h1>
        <Link
          href="/admin/navbar/new"
          className="rounded-lg bg-primary text-button-primary-txt px-4 py-2 text-sm font-medium"
        >
          Add link
        </Link>
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
                href={`/admin/navbar/${link.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteNavbarLink.bind(null, link.id)}
                confirmMessage={`Delete "${link.name}"?`}
              />
            </div>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-body-txt/60">No navbar links yet.</p>
        )}
      </div>
    </div>
  );
}

export default NavbarLinksPage;
