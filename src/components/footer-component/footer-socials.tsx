import Link from "next/link";

import { prisma } from "@/lib/prisma";

async function FooterSocials() {
  const date = new Date();
  const year = date.getFullYear();

  const socialMediaLinks = await prisma.socialMediaLink.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="grid gap-6 auto-cols-max grid-flow-col items-center">
      <p className="text-xs">&copy; {year} ShowVerse. All rights reserved.</p>
      <p className="footer-social grid grid-flow-col auto-cols-max">
        {socialMediaLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`text-sm mr-4 text-body-txt ${link.hoverColorClass}`}
          >
            <i className={link.iconClass}></i>
          </Link>
        ))}
      </p>
    </div>
  );
}

export default FooterSocials;
