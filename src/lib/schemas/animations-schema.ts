import { z } from "zod";

const entryAnimationSchema = z.object({
  selector: z.string().min(1),
  animation: z.record(z.string(), z.unknown()),
  stagger: z.number().optional(),
  position: z.union([z.string(), z.number()]).optional(),
});

const scrollAnimationSchema = z.object({
  selector: z.string().min(1),
  animation: z.object({
    from: z.record(z.string(), z.unknown()),
    to: z.record(z.string(), z.unknown()),
  }),
  scrollTrigger: z
    .object({
      start: z.string(),
      toggleActions: z.string().optional(),
    })
    .catchall(z.unknown()),
  stagger: z.number().optional(),
});

export const entryAnimationsArraySchema = z.array(entryAnimationSchema);
export const scrollAnimationsArraySchema = z.array(scrollAnimationSchema);

export function parseAnimationsJson(
  raw: FormDataEntryValue | null,
  schema: typeof entryAnimationsArraySchema | typeof scrollAnimationsArraySchema
) {
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(typeof raw === "string" && raw.trim() ? raw : "[]");
  } catch {
    return { success: false as const, error: "Invalid JSON" };
  }

  const result = schema.safeParse(parsedJson);
  if (!result.success) {
    return { success: false as const, error: result.error.issues[0]?.message ?? "Invalid animation config" };
  }

  return { success: true as const, data: result.data };
}
