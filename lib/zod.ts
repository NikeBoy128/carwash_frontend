import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


export const editUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  email: z.string().email("Email no es válido"),
  roles: z.array(z.number()),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(50).nullable().optional(),
});


export const createUserSchema = z.object({
  id: z.number().optional(), 
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(50).nullable().optional(),
  
  email: z.string().email("El correo electrónico no es válido"),
});
