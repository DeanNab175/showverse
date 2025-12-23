import Link from "next/link";
import socialMediaLinks from "@/constants/social-media-links";

function FooterSocials() {
  return (
    <p className="footer-social">
      {socialMediaLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`text-sm mr-4 ${link.hoverColorClass} transition-colors`}
        >
          <i className={link.iconClass}></i>
        </Link>
      ))}
    </p>
  );
}

export default FooterSocials;
