"use client";

import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function AnimationsJsonFields() {
  const { register } = useFormContext();

  return (
    <details className="rounded-lg bg-surface-bg px-3 py-2">
      <summary className="cursor-pointer text-sm font-medium">
        Advanced: animations
      </summary>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="entryAnimationsJson">Entry animations (JSON)</Label>
          <Textarea
            id="entryAnimationsJson"
            surface="nested"
            rows={8}
            spellCheck={false}
            className="font-mono text-xs"
            {...register("entryAnimationsJson")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="scrollAnimationsJson">Scroll animations (JSON)</Label>
          <Textarea
            id="scrollAnimationsJson"
            surface="nested"
            rows={8}
            spellCheck={false}
            className="font-mono text-xs"
            {...register("scrollAnimationsJson")}
          />
        </div>
        <p className="text-xs text-body-txt/60">
          Tied to CSS selectors in the corresponding component - edit with care,
          an unmatched selector just won&apos;t animate rather than error.
        </p>
      </div>
    </details>
  );
}

export default AnimationsJsonFields;
