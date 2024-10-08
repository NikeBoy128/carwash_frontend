"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { success: true };
  } catch (e) {
    if (e instanceof AuthError) {
      console.log(e.cause?.err?.message);
      return { error: e.cause?.err?.message };
    }
  }
};
