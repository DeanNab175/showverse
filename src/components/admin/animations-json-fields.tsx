"use client";

interface AnimationsJsonFieldsProps {
  defaultEntryAnimations: unknown;
  defaultScrollAnimations: unknown;
}

function AnimationsJsonFields({
  defaultEntryAnimations,
  defaultScrollAnimations,
}: AnimationsJsonFieldsProps) {
  return (
    <details className="rounded-lg bg-surface-bg px-3 py-2">
      <summary className="cursor-pointer text-sm font-medium">
        Advanced: animations
      </summary>
      <div className="flex flex-col gap-3 mt-3">
        <label className="flex flex-col gap-1 text-sm">
          Entry animations (JSON)
          <textarea
            name="entryAnimationsJson"
            defaultValue={JSON.stringify(defaultEntryAnimations ?? [], null, 2)}
            rows={8}
            spellCheck={false}
            className="rounded-lg bg-page-bg px-3 py-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Scroll animations (JSON)
          <textarea
            name="scrollAnimationsJson"
            defaultValue={JSON.stringify(defaultScrollAnimations ?? [], null, 2)}
            rows={8}
            spellCheck={false}
            className="rounded-lg bg-page-bg px-3 py-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        <p className="text-xs text-body-txt/60">
          Tied to CSS selectors in the corresponding component - edit with care,
          an unmatched selector just won&apos;t animate rather than error.
        </p>
      </div>
    </details>
  );
}

export default AnimationsJsonFields;
