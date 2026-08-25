"use client";

import { useActionState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ImageUploadField from "@/components/admin/image-upload-field";
import AnimationsJsonFields from "@/components/admin/animations-json-fields";
import { Button } from "@/components/ui/button";
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
import { homeSectionSchema } from "@/lib/schemas/home-schema";

import { updateHomeSection } from "./actions";

const formSchema = homeSectionSchema.extend({
  viewPageLinksJson: z.string(),
  entryAnimationsJson: z.string(),
  scrollAnimationsJson: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [state, formAction, isActionPending] = useActionState(updateHomeSection, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wrapperClass: defaultValues.wrapperClass,
      sectionClass: defaultValues.sectionClass,
      contentWrapperClass: defaultValues.contentWrapperClass,
      greetMessage: defaultValues.greetMessage,
      name: defaultValues.name,
      jobTitle: defaultValues.jobTitle,
      shortDescription: defaultValues.shortDescription,
      imageWrapperId: defaultValues.imageWrapperId,
      imageWrapperClass: defaultValues.imageWrapperClass,
      isIllustration: defaultValues.isIllustration,
      illustrationHtml: defaultValues.illustrationHtml,
      illustrationClass: defaultValues.illustrationClass,
      imagePath: defaultValues.imagePath,
      viewPageLinksJson: JSON.stringify(defaultValues.viewPageLinks ?? [], null, 2),
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
          name="greetMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greet message</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title (use a newline for a line break)</FormLabel>
              <FormControl>
                <Textarea rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="viewPageLinksJson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>View-page links (JSON array of {"{ url, text }"})</FormLabel>
              <FormControl>
                <Textarea rows={4} spellCheck={false} className="font-mono text-xs" {...field} />
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
                  value={field.value}
                  onChange={field.onChange}
                  folder="home"
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
                  &quot;#home-image&quot;). Renaming it without updating the
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
