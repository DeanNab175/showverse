"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AnimationsJsonFields from "@/components/admin/animations-json-fields";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aboutHireBannerSectionSchema } from "@/lib/schemas/about-schema";

import { updateAboutHireBannerSection } from "../actions";

const formSchema = aboutHireBannerSectionSchema.extend({
  paragraphsBodyJson: z.string(),
  entryAnimationsJson: z.string(),
  scrollAnimationsJson: z.string(),
});

type FormValues = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const BUTTON_VARIANTS: NonNullable<ButtonVariant>[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];

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
    ctaLabel: string;
    ctaVariant: string;
    ctaWrapperClass: string;
    ctaColumnClass: string;
    entryAnimations: unknown;
    scrollAnimations: unknown;
  };
}

function SectionForm({ defaultValues }: SectionFormProps) {
  const [state, formAction, isActionPending] = useActionState(
    updateAboutHireBannerSection,
    undefined
  );
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<FormValues, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wrapperClass: defaultValues.wrapperClass,
      sectionClass: defaultValues.sectionClass,
      contentWrapperClass: defaultValues.contentWrapperClass,
      headingText: defaultValues.headingText,
      headingLevel: defaultValues.headingLevel || undefined,
      headingClass: defaultValues.headingClass,
      paragraphsClass: defaultValues.paragraphsClass,
      ctaLabel: defaultValues.ctaLabel,
      ctaVariant: defaultValues.ctaVariant,
      ctaWrapperClass: defaultValues.ctaWrapperClass,
      ctaColumnClass: defaultValues.ctaColumnClass,
      paragraphsBodyJson: JSON.stringify(defaultValues.paragraphsBody ?? [], null, 2),
      entryAnimationsJson: JSON.stringify(defaultValues.entryAnimations ?? [], null, 2),
      scrollAnimationsJson: JSON.stringify(defaultValues.scrollAnimations ?? [], null, 2),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
        <FormField
          control={form.control}
          name="headingText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headingLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading level (1-6)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  {...field}
                  value={(field.value as number | string | undefined) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headingClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paragraphsBodyJson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraphs (JSON array of strings)</FormLabel>
              <FormControl>
                <Textarea rows={4} spellCheck={false} className="font-mono text-xs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paragraphsClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraphs class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4">
          <p className="text-sm font-medium">CTA button</p>

          <FormField
            control={form.control}
            name="ctaLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ctaVariant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger surface="nested">
                      <SelectValue placeholder="Select a variant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUTTON_VARIANTS.map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ctaWrapperClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wrapper class</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ctaColumnClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Column class (the grid column wrapping the button)</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contentWrapperClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content wrapper class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wrapperClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section wrapper class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AnimationsJsonFields />

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}

export default SectionForm;
