"use client";

import { useActionState } from "react";

import AnimationsJsonFields from "@/components/admin/animations-json-fields";

import { updateServicesSection } from "./actions";

interface SectionFormProps {
  defaultValues: {
    headingText: string;
    headingLevel: number | "";
    servicesWrapperClass: string;
    entryAnimations: unknown;
    scrollAnimations: unknown;
  };
}

function SectionForm({ defaultValues }: SectionFormProps) {
  const [state, formAction, isPending] = useActionState(updateServicesSection, undefined);

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
        Services grid wrapper class
        <input
          name="servicesWrapperClass"
          defaultValue={defaultValues.servicesWrapperClass}
          className="rounded-lg bg-surface-bg px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>

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
        {isPending ? "Saving..." : "Save section settings"}
      </button>
    </form>
  );
}

export default SectionForm;
