"use client";

import { useActionState } from "react";

import ImageUploadField from "@/components/admin/image-upload-field";

interface ProjectFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    previewUrl: string | null;
  };
  submitLabel: string;
}

function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Slug (used as its identifier - lowercase, hyphens)
        <input
          name="slug"
          defaultValue={defaultValues?.slug}
          required
          placeholder="my-project"
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          name="title"
          defaultValue={defaultValues?.title}
          required
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          defaultValue={defaultValues?.description}
          required
          rows={3}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <ImageUploadField
        name="thumbnailUrl"
        label="Thumbnail"
        defaultValue={defaultValues?.thumbnailUrl}
        folder="portfolio"
      />

      <label className="flex flex-col gap-1 text-sm">
        Preview link (optional)
        <input
          name="previewUrl"
          defaultValue={defaultValues?.previewUrl ?? ""}
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

export default ProjectForm;
