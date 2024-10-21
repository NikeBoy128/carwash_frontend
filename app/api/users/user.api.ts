import { DataUsers } from "@/interfaces/user";
import { axiosInstance } from "@/lib/axios";
import { addUserSchema, editUserSchema } from "@/lib/zod";
import axios from "axios";
import { getSession } from "next-auth/react";
import { z } from "zod";

export const getDataUsers = async (page: number, search?: string) => {
  const session = await getSession();
  const response = await axiosInstance.get<DataUsers>("/user/whit-pagination", {
    params: {
      page: page,
      perPage: 5,
      search: search,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  return response.data;
};

export const createUser = async (values: z.infer<typeof addUserSchema>) => {
  const session = await getSession();

  const userData = {
    name: values.name,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    roles: values.roles
      .map((role) => {
        switch (role) {
          case "Administrador":
            return 1; 
          case "Empleado":
            return 2; 
          default:
            return null; 
        }
      })
      .filter((role) => role !== null), 
  };

  try {
    const response = await axiosInstance.post("/user/create", userData, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Error en la solicitud:", e.response?.data);
      return e.response?.data;
    }
    console.error("Error inesperado:", e);
    return { message: "Error creando usuario" };
  }
};

// Eliminar un usuario
export const deleteUser = async (id: number) => {
  const session = await getSession(); // Obtiene la sesión actual
  try {
    const response = await axiosInstance.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, // Agrega el token de acceso
      },
    });

    return response.data; // Retorna los datos de la respuesta
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data; // Maneja el error y retorna los datos del error
    }
    return { message: "Error eliminando usuario" }; // Manejo de errores genérico
  }
};

// Editar un usuario existente
export const editUser = async (values: z.infer<typeof editUserSchema>) => {
  const roles = values.roles
    .map((role) => {
      switch (role) {
        case "Administrador":
          return 1; // ID para Admin
        case "Empleado":
          return 2; // ID para User
        default:
          return null; // O maneja el caso
      }
    })
    .filter((role) => role !== null);
  const userEditData = { ...values, roles };
  const session = await getSession(); // Obtiene la sesión actual
  try {
    const response = await axiosInstance.patch("/user/update", userEditData, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, // Agrega el token de acceso
      },
    });

    return response.data; // Retorna los datos de la respuesta
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data; // Maneja el error y retorna los datos del error
    }
    return { message: "Error actualizando usuario" }; // Manejo de errores genérico
  }
};
