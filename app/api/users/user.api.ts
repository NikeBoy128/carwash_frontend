import { auth } from "@/auth";
import { DataUsers } from "@/interfaces/user";
import { axiosInstance } from "@/lib/axios";
import { editUserSchema } from "@/lib/zod";
import axios from "axios";
import { getSession } from "next-auth/react";
import { z } from "zod";
export const getDataUsers = async (page: number) => {
  const session = await getSession();
  const response = await axiosInstance.get<DataUsers>("/user/whit-pagination", {
    params: {
      page: page,
      perPage: 5,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  return response.data;
};
export const deleteUser = async (id: number) => {
  const session = await getSession();
  try {
    const response = await axiosInstance.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

export const editUser = async (values: z.infer<typeof editUserSchema>) => {
  const session = await auth();
  try {
    const response = await axiosInstance.patch("/user/update", values, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};
