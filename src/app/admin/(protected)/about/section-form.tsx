"use client";

import { useActionState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ImageUploadField from "@/components/admin/image-upload-field";
import AnimationsJsonFields from "@/components/admin/animations-json-fields";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { aboutIntroSectionSchema } from "@/lib/schemas/about-schema";

import { updateAboutIntroSection } from "./actions";

const BUTTON_VARIANTS: NonNullable<ButtonVariant>[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const formSchema = aboutIntroSectionSchema.extend({
  paragraphsBodyJson: z.string(),
  entryAnimationsJson: z.string(),
  scrollAnimationsJson: z.string(),
});

type FormValues = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

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
  const [state, formAction, isActionPending] = useActionState(
    updateAboutIntroSection,
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
      experiencesWrapperClass: defaultValues.experiencesWrapperClass,
      hobbyHeadingText: defaultValues.hobbyHeadingText,
      hobbyHeadingLevel: defaultValues.hobbyHeadingLevel || undefined,
      hobbyHeadingClass: defaultValues.hobbyHeadingClass,
      ctaLabel: defaultValues.ctaLabel,
      ctaVariant: defaultValues.ctaVariant,
      ctaIconClass: defaultValues.ctaIconClass,
      ctaWrapperClass: defaultValues.ctaWrapperClass,
      imageWrapperId: defaultValues.imageWrapperId,
      imageWrapperClass: defaultValues.imageWrapperClass,
      isIllustration: defaultValues.isIllustration,
      illustrationHtml: defaultValues.illustrationHtml,
      illustrationClass: defaultValues.illustrationClass,
      imagePath: defaultValues.imagePath,
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
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md mb-8">
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
                <Textarea rows={5} spellCheck={false} className="font-mono text-xs" {...field} />
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

        <FormField
          control={form.control}
          name="experiencesWrapperClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experiences wrapper class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobbyHeadingText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobby heading text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobbyHeadingLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobby heading level (1-6)</FormLabel>
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
          name="hobbyHeadingClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobby heading class</FormLabel>
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
            name="ctaIconClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon class</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
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

        <div className="rounded-lg bg-surface-bg px-3 py-3 flex flex-col gap-4">
          <p className="text-sm font-medium">Image</p>

          <Controller
            control={form.control}
            name="imagePath"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <ImageUploadField
                  label="Photo (used as a fallback / non-illustration image)"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  folder="about"
                />
                {fieldState.error && (
                  <p className="text-sm text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="isIllustration"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal">
                  Use the inline SVG illustration instead of the photo
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="illustrationHtml"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Illustration SVG markup</FormLabel>
                <FormControl>
                  <Textarea
                    surface="nested"
                    rows={4}
                    spellCheck={false}
                    className="font-mono text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="illustrationClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Illustration class</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageWrapperClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image wrapper class</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageWrapperId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image wrapper id</FormLabel>
                <FormControl>
                  <Input surface="nested" {...field} />
                </FormControl>
                <p className="text-xs text-body-txt/60">
                  Rendered as this element&apos;s literal DOM id - the entry
                  animations below may target it directly (e.g.
                  &quot;#about-image&quot;). Renaming it without updating the
                  matching animation selector will silently break that animation.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
