import { auth } from "@/auth";
import { DataConcepts } from "@/interfaces/concepts";
import { axiosInstance } from "@/lib/axios";
import { getSession } from "next-auth/react";
export const getConceptsPaginated = async (page: number, search: string) => {
  const session = await getSession();
  const response = await axiosInstance.get<DataConcepts>(
    "/concepts/whit-pagination",
    {
      params: {
        page: page,
        perPage: 5,
        search: search,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );

  return response.data;
};
