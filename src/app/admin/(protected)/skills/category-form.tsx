"use client";

import { useActionState } from "react";

interface CategoryFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    slug: string;
    labelText: string;
    labelClass: string | null;
    itemsWrapperClass: string | null;
  };
  submitLabel: string;
}

function CategoryForm({ action, defaultValues, submitLabel }: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Slug (used as this category&apos;s DOM id - see note above about
        animation selectors)
        <input
          name="slug"
          defaultValue={defaultValues?.slug}
          required
          placeholder="web-developer-category"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Label
        <input
          name="labelText"
          defaultValue={defaultValues?.labelText}
          required
          placeholder="Web developer"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Label class (optional)
        <input
          name="labelClass"
          defaultValue={defaultValues?.labelClass ?? ""}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Items wrapper class (optional)
        <input
          name="itemsWrapperClass"
          defaultValue={defaultValues?.itemsWrapperClass ?? ""}
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

export default CategoryForm;
