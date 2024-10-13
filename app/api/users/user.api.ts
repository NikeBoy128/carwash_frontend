import { auth } from "@/auth";
import { DataUsers } from "@/interfaces/user";
import { axiosInstance } from "@/lib/axios";
import { createUserSchema, editUserSchema } from "@/lib/zod";
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

export const createUser = async (values: z.infer<typeof createUserSchema>) => {
  const session = await auth();
  try {
    const response = await axios.post("/user/create", values, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        'Content-Type': 'application/json', // Asegúrate de enviar el tipo de contenido correcto
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Error de Axios:", e.response?.data);
      return e.response?.data; // Devolver la respuesta del error
    } else {
      console.error("Error inesperado:", e);
      throw new Error("Error inesperado");
    }
  }
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