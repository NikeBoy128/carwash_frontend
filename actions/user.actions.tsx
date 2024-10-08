"use server";

import { editUser } from "@/app/api/users/user.api";
import { editUserSchema } from "@/lib/zod";
import { z } from "zod";

export const editUserAction = async (
  values: z.infer<typeof editUserSchema>
) => {
  const response = await editUser(values);
  return response;
};
