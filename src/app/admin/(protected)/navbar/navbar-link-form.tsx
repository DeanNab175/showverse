"use client";

import { useActionState } from "react";

interface NavbarLinkFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    name: string;
    href: string;
    iconClass: string;
    iconFontSizeClass: string | null;
  };
  submitLabel: string;
}

function NavbarLinkForm({ action, defaultValues, submitLabel }: NavbarLinkFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="name"
          defaultValue={defaultValues?.name}
          required
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Link (href)
        <input
          name="href"
          defaultValue={defaultValues?.href}
          required
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Icon class
        <input
          name="iconClass"
          defaultValue={defaultValues?.iconClass}
          required
          placeholder="icon-home"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Icon font size class (optional)
        <input
          name="iconFontSizeClass"
          defaultValue={defaultValues?.iconFontSizeClass ?? ""}
          placeholder="text-3xl"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-primary text-button-primary-txt py-3 font-medium disabled:opacity-50"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default NavbarLinkForm;
