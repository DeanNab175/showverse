"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  /**
   * Hex approximation of the globals.css default, shown in the swatch while the
   * field is empty. Never written to the form value on its own - the swatch
   * only writes when the user actually picks a colour.
   */
  fallbackHex: string;
  /** Human label of the field this control edits, used for the reset button's
   * accessible name so the five reset buttons are distinguishable. */
  label: string;
}

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

function ColorField({
  value,
  onChange,
  fallbackHex,
  label,
  placeholder,
  ...props
}: ColorFieldProps) {
  // <input type="color"> only accepts #rrggbb. The stored value may be oklch()
  // or empty, so fall back to the default swatch rather than letting the
  // browser silently coerce it to black.
  const swatchValue = HEX_PATTERN.test(value.trim()) ? value.trim() : fallbackHex;
  const isCustomised = value.trim() !== "";

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label="Colour picker"
        value={swatchValue}
        onChange={(e) => onChange(e.target.value)}
        className="size-9 shrink-0 cursor-pointer rounded-lg border border-body-txt/20 bg-transparent p-1"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? fallbackHex}
        spellCheck={false}
        className="font-mono text-xs"
        {...props}
      />
      {/* Clears the field rather than writing fallbackHex: an empty value is
          stored as null, so the colour keeps tracking the globals.css default
          instead of being pinned to this hex approximation of it. */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={!isCustomised}
        onClick={() => onChange("")}
        aria-label={`Reset ${label} to default`}
      >
        Reset
      </Button>
    </div>
  );
}

export default ColorField;
