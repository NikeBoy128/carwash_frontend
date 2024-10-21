import { DataConcepts } from "@/interfaces/concepts"; 
import { axiosInstance } from "@/lib/axios";
import { addConceptSchema, editConceptSchema } from "@/lib/zod";
import axios from "axios";
import { getSession } from "next-auth/react";
import { z } from "zod";

export const getDataConcepts = async (page: number, search: string = "") => {
    const session = await getSession();
    
    if (!session?.user?.accessToken) {
        console.error("No se pudo obtener el accessToken de la sesión.");
        return { message: "No se pudo obtener el token de sesión." };
    }

    try {
        const response = await axiosInstance.get<DataConcepts>("/concepts/whit-pagination", {
            params: {
                page: page,
                perPage: 10,
                search: search,
            },
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
            },
        });

        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error("Error en la solicitud de paginación:", e.response?.data);
            return e.response?.data;
        }
        console.error("Error inesperado:", e);
        return { message: "Error obteniendo datos de conceptos" };
    }
};

export const createConcept = async (values: z.infer<typeof addConceptSchema>) => {
    const session = await getSession();

    const parsedData = addConceptSchema.safeParse(values);
    if (!parsedData.success) {
        console.error("Validación fallida:", parsedData.error.format());
        return { message: "Validación fallida" };
    }

    const conceptData = {
        description: values.description,
        conceptTypeVehicule: values.conceptTypeVehicule,
    };

    try {
        const response = await axiosInstance.post("/concepts", conceptData, {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            },
        });
        console.log("Concepto creado con éxito:", response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error("Error en la solicitud:", e.response?.data);
            return e.response?.data;
        }
        console.error("Error inesperado:", e);
        return { message: "Error creando concepto" };
    }
};

export const deleteConcept = async (id: number) => {
    const session = await getSession();
    try {
        const response = await axiosInstance.delete(`/concepts/${id}`, {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            },
        });

        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return e.response?.data;
        }
        return { message: "Error eliminando concepto" };
    }
};

export const editConcept = async (values: z.infer<typeof editConceptSchema>) => {
    const session = await getSession();

    const conceptData = {
        id: values.id,
        description: values.description,
        conceptTypeVehicule: values.conceptTypeVehicule,
    };

    try {
        const response = await axiosInstance.patch("/concepts", conceptData, {
            headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
            },
        });

        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return e.response?.data;
        }
        return { message: "Error actualizando concepto" };
    }
};