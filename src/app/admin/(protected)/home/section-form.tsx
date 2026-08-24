"use client";

import { useActionState } from "react";

import ImageUploadField from "@/components/admin/image-upload-field";
import AnimationsJsonFields from "@/components/admin/animations-json-fields";

import { updateHomeSection } from "./actions";

interface SectionFormProps {
  defaultValues: {
    wrapperClass: string;
    sectionClass: string;
    contentWrapperClass: string;
    greetMessage: string;
    name: string;
    jobTitle: string;
    shortDescription: string;
    viewPageLinks: unknown;
    imageWrapperId: string;
    imageWrapperClass: string;
    isIllustration: boolean;
    illustrationHtml: string;
    illustrationClass: string;
    imagePath: string;
    entryAnimations: unknown;
    scrollAnimations: unknown;
  };
}

function SectionForm({ defaultValues }: SectionFormProps) {
  const [state, formAction, isPending] = useActionState(updateHomeSection, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Greet message
        <input
          name="greetMessage"
          defaultValue={defaultValues.greetMessage}
          required
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="name"
          defaultValue={defaultValues.name}
          required
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Job title (use a newline for a line break)
        <textarea
          name="jobTitle"
          defaultValue={defaultValues.jobTitle}
          required
          rows={2}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Short description
        <textarea
          name="shortDescription"
          defaultValue={defaultValues.shortDescription}
          required
          rows={3}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Content wrapper class
        <input
          name="contentWrapperClass"
          defaultValue={defaultValues.contentWrapperClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Section wrapper class
        <input
          name="wrapperClass"
          defaultValue={defaultValues.wrapperClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Section class
        <input
          name="sectionClass"
          defaultValue={defaultValues.sectionClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        View-page links (JSON array of {"{ url, text }"})
        <textarea
          name="viewPageLinksJson"
          defaultValue={JSON.stringify(defaultValues.viewPageLinks ?? [], null, 2)}
          rows={4}
          spellCheck={false}
          className="rounded-lg bg-surface-bg px-3 py-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <div className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4">
        <p className="text-sm font-medium">Image</p>

        <ImageUploadField
          name="imagePath"
          label="Photo (used as a fallback / non-illustration image)"
          defaultValue={defaultValues.imagePath}
          folder="home"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isIllustration"
            defaultChecked={defaultValues.isIllustration}
          />
          Use the inline SVG illustration instead of the photo
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Illustration SVG markup
          <textarea
            name="illustrationHtml"
            defaultValue={defaultValues.illustrationHtml}
            rows={4}
            spellCheck={false}
            className="rounded-lg bg-page-bg px-3 py-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Illustration class
          <input
            name="illustrationClass"
            defaultValue={defaultValues.illustrationClass}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Image wrapper class
          <input
            name="imageWrapperClass"
            defaultValue={defaultValues.imageWrapperClass}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Image wrapper id
          <input
            name="imageWrapperId"
            defaultValue={defaultValues.imageWrapperId}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <span className="text-xs text-body-txt/60">
            Rendered as this element&apos;s literal DOM id - the entry
            animations below may target it directly (e.g.
            &quot;#home-image&quot;). Renaming it without updating the
            matching animation selector will silently break that animation.
          </span>
        </label>
      </div>

      <AnimationsJsonFields
        defaultEntryAnimations={defaultValues.entryAnimations}
        defaultScrollAnimations={defaultValues.scrollAnimations}
      />

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

export default SectionForm;
