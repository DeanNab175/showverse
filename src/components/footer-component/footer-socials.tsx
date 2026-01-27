import Link from "next/link";
import socialMediaLinks from "@/constants/social-media-links";

function FooterSocials() {
  return (
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
  );
}

export default FooterSocials;
