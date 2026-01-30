import Link from "next/link";
import socialMediaLinks from "@/constants/social-media-links";

function FooterSocials() {
  const date = new Date();
  const year = date.getFullYear();

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
