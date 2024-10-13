
import { DataCustomers } from "@/interfaces/clients";
import { axiosInstance } from "@/lib/axios"; 
import { addCustomerSchema, editCustomerSchema } from "@/lib/zod"; 
import axios from "axios"; 
import { getSession } from "next-auth/react"; 
import { z } from "zod";


export const getDataCustomers = async (page: number) => {
  const session = await getSession(); // Obtiene la sesión actual
  const response = await axiosInstance.get<DataCustomers>("/customer/whit-pagination", {
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


export const createCustomer = async (values: z.infer<typeof addCustomerSchema>) => {
  const session = await getSession(); 

  const customerData = {
    name: values.name,
    lastName: values.lastName,
    phone: values.phone,  
  };

  console.log("Datos del cliente a enviar:", customerData);

  try {
    const response = await axiosInstance.post("/customer/create", customerData, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, 
      },
    });
    console.log("Cliente creado con éxito:", response.data);
    return response.data; 
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Error en la solicitud:", e.response?.data); 
      return e.response?.data; 
    }
    console.error("Error inesperado:", e); 
    return { message: "Error creando cliente" }; 
  }
};


export const deleteCustomer = async (id: string) => {
  const session = await getSession(); 
  try {
    const response = await axiosInstance.delete(`/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, 
      },
    });

    return response.data; 
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data; 
    }
    return { message: "Error eliminando cliente" }; 
  }
};


export const editCustomer = async (values: z.infer<typeof editCustomerSchema>) => {
  const session = await getSession(); 

  const customerData = {
    name: values.name,
    lastName: values.lastName,
    phone: values.phone,  
  };

  try {
    const response = await axiosInstance.patch("/customer/update", customerData, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, 
      },
    });

    return response.data; 
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data; 
    }
    return { message: "Error actualizando cliente" }; 
  }
};