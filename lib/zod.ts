import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const editUserSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  roles: z.array(z.string()),
  password: z.string().min(6).max(50).nullable().optional(),
});

export const addUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  roles: z.array(z.string()),
  password: z.string().min(6).max(50).nullable().optional(),
});

export const editCustomerSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
});

export const addCustomerSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
});
