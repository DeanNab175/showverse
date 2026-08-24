"use client";

import { useActionState } from "react";

import ImageUploadField from "@/components/admin/image-upload-field";
import AnimationsJsonFields from "@/components/admin/animations-json-fields";

import { updateAboutIntroSection } from "./actions";

interface SectionFormProps {
  defaultValues: {
    wrapperClass: string;
    sectionClass: string;
    contentWrapperClass: string;
    headingText: string;
    headingLevel: number | "";
    headingClass: string;
    paragraphsBody: string[];
    paragraphsClass: string;
    experiencesWrapperClass: string;
    hobbyHeadingText: string;
    hobbyHeadingLevel: number | "";
    hobbyHeadingClass: string;
    ctaLabel: string;
    ctaVariant: string;
    ctaIconClass: string;
    ctaWrapperClass: string;
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
  const [state, formAction, isPending] = useActionState(updateAboutIntroSection, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md mb-8">
      <label className="flex flex-col gap-1 text-sm">
        Heading text
        <input
          name="headingText"
          defaultValue={defaultValues.headingText}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Heading level (1-6)
        <input
          name="headingLevel"
          type="number"
          min={1}
          max={6}
          defaultValue={defaultValues.headingLevel}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Heading class
        <input
          name="headingClass"
          defaultValue={defaultValues.headingClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Paragraphs (JSON array of strings)
        <textarea
          name="paragraphsBodyJson"
          defaultValue={JSON.stringify(defaultValues.paragraphsBody ?? [], null, 2)}
          rows={5}
          spellCheck={false}
          className="rounded-lg bg-surface-bg px-3 py-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Paragraphs class
        <input
          name="paragraphsClass"
          defaultValue={defaultValues.paragraphsClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Experiences wrapper class
        <input
          name="experiencesWrapperClass"
          defaultValue={defaultValues.experiencesWrapperClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hobby heading text
        <input
          name="hobbyHeadingText"
          defaultValue={defaultValues.hobbyHeadingText}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hobby heading level (1-6)
        <input
          name="hobbyHeadingLevel"
          type="number"
          min={1}
          max={6}
          defaultValue={defaultValues.hobbyHeadingLevel}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Hobby heading class
        <input
          name="hobbyHeadingClass"
          defaultValue={defaultValues.hobbyHeadingClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

      <div className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4">
        <p className="text-sm font-medium">CTA button</p>

        <label className="flex flex-col gap-1 text-sm">
          Label
          <input
            name="ctaLabel"
            defaultValue={defaultValues.ctaLabel}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Variant
          <input
            name="ctaVariant"
            defaultValue={defaultValues.ctaVariant}
            placeholder="default, secondary, outline, ghost, link, destructive"
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Icon class
          <input
            name="ctaIconClass"
            defaultValue={defaultValues.ctaIconClass}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Wrapper class
          <input
            name="ctaWrapperClass"
            defaultValue={defaultValues.ctaWrapperClass}
            className="rounded-lg bg-page-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
      </div>

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

      <div className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4">
        <p className="text-sm font-medium">Image</p>

        <ImageUploadField
          name="imagePath"
          label="Photo (used as a fallback / non-illustration image)"
          defaultValue={defaultValues.imagePath}
          folder="about"
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
            &quot;#about-image&quot;). Renaming it without updating the
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
