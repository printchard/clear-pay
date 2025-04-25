import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const accountNumberSchema = z.string().regex(/^\d{10,12}$/);
export const clabeSchema = z.string().regex(/^\d{18}$/);
export const cardNumberSchema = z.string().regex(/^\d{16}$/);
