"use client";

import { useActionState } from "react";

import { updateSiteSettings } from "./actions";

interface SettingsFormProps {
  defaultContactEmail: string;
}

function SettingsForm({ defaultContactEmail }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Contact email
        <input
          name="contactEmail"
          type="email"
          defaultValue={defaultContactEmail}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-primary text-button-primary-txt py-3 font-medium disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

export default SettingsForm;
