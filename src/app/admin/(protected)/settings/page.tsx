import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

import SettingsForm from "./settings-form";

async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div>
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-4">
        Site settings
      </Heading>
      <SettingsForm defaultContactEmail={settings?.contactEmail ?? ""} />
    </div>
  );
}

export default SettingsPage;
