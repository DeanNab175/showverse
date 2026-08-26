"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ColorField from "@/components/admin/color-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/schemas/settings-schema";
import { THEME_COLOR_FIELDS, THEME_COLOR_GROUPS } from "@/lib/theme-settings";

import { updateSiteSettings } from "./actions";

interface SettingsFormProps {
  defaultValues: SiteSettingsInput;
}

function SettingsForm({ defaultValues }: SettingsFormProps) {
  const [state, formAction, isActionPending] = useActionState(updateSiteSettings, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  const watched = form.watch();
  const hasCustomColors = THEME_COLOR_FIELDS.some(
    (field) => (watched[field.key] ?? "").trim() !== ""
  );

  const resetAllColors = () => {
    for (const field of THEME_COLOR_FIELDS) {
      form.setValue(field.key, "", { shouldDirty: true, shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Theme colours</p>
            <p className="text-xs text-body-txt/60 mt-1">
              Reset a colour (or leave it empty) to fall back to the
              site&apos;s default. Accepts hex, rgb(), hsl(), or oklch(). Text
              colours apply to the public site only, so the admin stays readable.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!hasCustomColors}
            onClick={resetAllColors}
          >
            Reset all
          </Button>
        </div>

        {THEME_COLOR_GROUPS.map((group) => (
          <div
            key={group}
            className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4"
          >
            <p className="text-sm font-medium">{group}</p>

            {THEME_COLOR_FIELDS.filter((themeField) => themeField.group === group).map(
              (themeField) => (
                <FormField
                  key={themeField.key}
                  control={form.control}
                  name={themeField.key}
                  render={({ field }) => (
                    <FormItem className={"indent" in themeField ? "pl-4" : undefined}>
                      <FormLabel>{themeField.label}</FormLabel>
                      <FormControl>
                        <ColorField
                          name={field.name}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          surface="nested"
                          fallbackHex={themeField.fallbackHex}
                          label={themeField.label}
                        />
                      </FormControl>
                      <p className="text-xs text-body-txt/60">{themeField.description}</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
          </div>
        ))}

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
