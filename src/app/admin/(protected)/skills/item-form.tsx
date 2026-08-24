"use client";

import { useActionState } from "react";

import ImageUploadField from "@/components/admin/image-upload-field";

interface ItemFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    name: string;
    iconUrl: string;
  };
  submitLabel: string;
}

function ItemForm({ action, defaultValues, submitLabel }: ItemFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="name"
          defaultValue={defaultValues?.name}
          required
          placeholder="React"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <ImageUploadField
        name="iconUrl"
        label="Icon"
        defaultValue={defaultValues?.iconUrl}
        folder="skill-icons"
      />

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

export default ItemForm;
