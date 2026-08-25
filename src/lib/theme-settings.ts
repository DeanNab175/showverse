import { cache } from "react";
import type { SiteSettings } from "@prisma/client";

import { prisma } from "@/lib/prisma";

/**
 * Allowlist for any colour that reaches the injected <style> block.
 *
 * This is a security boundary, not just a UX check: values are interpolated
 * into CSS, so a string like `red; } body { display: none } .x {` would break
 * out of the rule. The pattern structurally cannot contain `;`, `{`, `}` or
 * `url(`. It admits oklch()/oklab() so the defaults already in globals.css can
 * be pasted back verbatim.
 */
export const CSS_COLOR_PATTERN =
  /^(#[0-9a-fA-F]{3,8}|(rgb|rgba|hsl|hsla|oklch|oklab)\([0-9a-zA-Z.,%/\s+-]*\))$/;

/**
 * The single source of truth for editable theme colours: the Zod schema, the
 * admin form, and the style injector all derive from this list, so adding a
 * colour means adding one entry here (plus its column and its `var(--cms-*)`
 * fallback in globals.css).
 *
 * `fallbackHex` is a hex approximation of the current globals.css default. It
 * is used *only* to seed the native colour swatch's appearance when a field is
 * empty - it is never written to the database and never injected.
 */
export const THEME_COLOR_FIELDS = [
  {
    key: "primaryColor",
    cssVar: "--cms-primary",
    label: "Primary / brand colour",
    description:
      "Buttons, headings, active nav indicator, focus rings, and brand-coloured illustration parts.",
    fallbackHex: "#c0eb6a",
  },
  {
    key: "secondaryColor",
    cssVar: "--cms-secondary",
    label: "Secondary colour",
    description:
      "Secondary buttons and the hire-banner gradient. Body text is unaffected.",
    fallbackHex: "#485550",
  },
  {
    key: "surfaceLightColor",
    cssVar: "--cms-surface-light",
    label: "Surface tint (light mode)",
    description: "Cards, panels, and form inputs in light mode.",
    fallbackHex: "#f4f6f0",
  },
  {
    key: "pageDarkColor",
    cssVar: "--cms-page-dark",
    label: "Page background (dark mode)",
    description: "The page backdrop in dark mode.",
    fallbackHex: "#131615",
  },
  {
    key: "surfaceDarkColor",
    cssVar: "--cms-surface-dark",
    label: "Surface background (dark mode)",
    description: "Cards, panels, and form inputs in dark mode.",
    fallbackHex: "#1e2422",
  },
] as const;

export type ThemeColorKey = (typeof THEME_COLOR_FIELDS)[number]["key"];

/**
 * Reads the settings singleton. Wrapped in React's `cache()` so the root
 * layout, the public footer, and the admin settings page share one query per
 * request instead of each issuing their own.
 */
export const getSiteSettings = cache(async () => {
  return prisma.siteSettings.findUnique({ where: { id: "singleton" } });
});

/**
 * Colour values shaped for the admin form, with null mapped to "" so an unset
 * colour renders as an empty field rather than the string "null".
 */
export function toThemeColorDefaults(
  settings: SiteSettings | null
): Record<ThemeColorKey, string> {
  return Object.fromEntries(
    THEME_COLOR_FIELDS.map((field) => [field.key, settings?.[field.key] ?? ""])
  ) as Record<ThemeColorKey, string>;
}

function isValidColor(value: string | null | undefined): value is string {
  return typeof value === "string" && CSS_COLOR_PATTERN.test(value.trim());
}

/**
 * Builds the `:root { ... }` override block, or null when nothing is set.
 *
 * Every value is re-validated here rather than trusted from the database, so a
 * row edited outside the admin form still cannot inject CSS.
 */
export function buildThemeStyle(settings: SiteSettings | null): string | null {
  if (!settings) return null;

  const declarations: string[] = [];

  for (const field of THEME_COLOR_FIELDS) {
    const value = settings[field.key];
    if (isValidColor(value)) {
      declarations.push(`${field.cssVar}:${value.trim()}`);
    }
  }

  // The navbar's hover colour comes from --clr-accent-1-light/-dark, which are
  // hardcoded HSL in globals.css rather than derived from the primary. Without
  // this, changing the brand colour would leave navbar hover on the old lime.
  const primary = settings.primaryColor;
  if (isValidColor(primary)) {
    const trimmed = primary.trim();
    declarations.push(
      `--cms-primary-light:color-mix(in oklch, ${trimmed}, white 40%)`,
      `--cms-primary-dark:color-mix(in oklch, ${trimmed}, black 22%)`
    );
  }

  if (declarations.length === 0) return null;

  return `:root{${declarations.join(";")}}`;
}
