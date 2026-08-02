import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL"),

  customAlias: z
    .string()
    .min(3, "Alias must be at least 3 characters")
    .max(20, "Alias cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only letters, numbers, - and _ are allowed"
    )
    .optional()
    .or(z.literal("")),

  expiresAt: z
    .string()
    .datetime()
    .optional()
    .or(z.literal("")),
});

export const updateUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL"),

  customAlias: z
    .string()
    .min(3, "Alias must be at least 3 characters")
    .max(20, "Alias cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Only letters, numbers, - and _ are allowed"
    )
    .optional()
    .or(z.literal("")),

  expiresAt: z
    .string()
    .datetime()
    .optional()
    .or(z.literal("")),
});