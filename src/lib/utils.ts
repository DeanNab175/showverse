import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmptyOrNullish(obj: object | null | undefined): boolean {
  return (
    obj == null || (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}
