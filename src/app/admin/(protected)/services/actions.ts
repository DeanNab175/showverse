"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema, servicesSectionSchema } from "@/lib/schemas/service-schema";
import {
  entryAnimationsArraySchema,
  scrollAnimationsArraySchema,
  parseAnimationsJson,
} from "@/lib/schemas/animations-schema";

async function requireAuth() {
  const session = await auth();
  if (!session) redirect("/admin/login");
}

export async function updateServicesSection(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = servicesSectionSchema.safeParse({
    headingText: formData.get("headingText"),
    headingLevel: formData.get("headingLevel"),
    servicesWrapperClass: formData.get("servicesWrapperClass"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const entryAnimations = parseAnimationsJson(
    formData.get("entryAnimationsJson"),
    entryAnimationsArraySchema
  );
  if (!entryAnimations.success) {
    return { error: `Entry animations: ${entryAnimations.error}` };
  }

  const scrollAnimations = parseAnimationsJson(
    formData.get("scrollAnimationsJson"),
    scrollAnimationsArraySchema
  );
  if (!scrollAnimations.success) {
    return { error: `Scroll animations: ${scrollAnimations.error}` };
  }

  await prisma.skillsServicesSection.update({
    where: { id: "services_singleton" },
    data: {
      headingText: parsed.data.headingText || null,
      headingLevel: parsed.data.headingLevel ?? null,
      servicesWrapperClass: parsed.data.servicesWrapperClass || null,
      entryAnimations: JSON.parse(JSON.stringify(entryAnimations.data)),
      scrollAnimations: JSON.parse(JSON.stringify(scrollAnimations.data)),
    },
  });

  revalidatePath("/skills");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

function parseServiceFormData(formData: FormData) {
  return serviceSchema.safeParse({
    iconClass: formData.get("iconClass"),
    title: formData.get("title"),
    description: formData.get("description"),
  });
}

export async function createService(_prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseServiceFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const maxOrder = await prisma.service.aggregate({
    where: { skillsServicesSectionId: "services_singleton" },
    _max: { sortOrder: true },
  });

  await prisma.service.create({
    data: {
      ...parsed.data,
      skillsServicesSectionId: "services_singleton",
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidatePath("/skills");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, _prevState: unknown, formData: FormData) {
  await requireAuth();

  const parsed = parseServiceFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.service.update({ where: { id }, data: parsed.data });

  revalidatePath("/skills");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAuth();

  await prisma.service.delete({ where: { id } });

  revalidatePath("/skills");
  revalidatePath("/admin/services");
}
