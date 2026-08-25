import Heading from "@/components/typography/heading";
import { getSiteSettings, toThemeColorDefaults } from "@/lib/theme-settings";

import SettingsForm from "./settings-form";

async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-4">
        Site settings
      </Heading>
      <SettingsForm
        defaultValues={{
          contactEmail: settings?.contactEmail ?? "",
          ...toThemeColorDefaults(settings),
        }}
      />
    </div>
  );
}

export default SettingsPage;
