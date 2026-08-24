import { prisma } from "@/lib/prisma";

import SettingsForm from "./settings-form";

async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Site settings</h1>
      <SettingsForm defaultContactEmail={settings?.contactEmail ?? ""} />
    </div>
  );
}

export default SettingsPage;
