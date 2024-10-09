import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const editUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  roles: z.array(z.string()),
  password: z.string().min(6).max(50).nullable().optional(),
});
