import { getSiteSettings } from "@/lib/theme-settings";

async function FooterContact() {
  const settings = await getSiteSettings();

  if (!settings?.contactEmail) return null;

  return (
    <p className="footer-contact flex items-center">
      <span className="text-sm">
        <i className="icon-mail"></i>
      </span>
      <span className="ml-2 mb-0.5 text-xs">{settings.contactEmail}</span>
    </p>
  );
}

export default FooterContact;
