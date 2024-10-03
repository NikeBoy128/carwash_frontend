"use client";

import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Importar tus componentes de paginación

async function fetchData(page: number, perPage: number, search: string, token: string): Promise<Payment[]> {
  const res = await fetch(
    `http://localhost:3001/user/whit-pagination?page=${page}&perPage=${perPage}&search=${search}`,
    {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await res.json();

  return data.rows.map((payment: Payment) => ({
    id: payment.id,
    amount: payment.amount,
    status: payment.status,
    email: payment.email,
  }));
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Estado para la página actual
  const [perPage] = useState(10); // Número de elementos por página
  const [search, setSearch] = useState(""); // Estado para la búsqueda
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      fetchData(page, perPage, search, token)
        .then((payments) => {
          setData(payments);
          setLoading(false);
          setTotalPages(Math.ceil(payments.length / perPage)); // Ajustar según tus datos
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      console.error("No se encontró el token de autenticación.");
      setLoading(false);
    }
  }, [page, perPage, search]); // Agregar `page`, `perPage`, y `search` como dependencias

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value); // Actualizar el estado de búsqueda
    setPage(1); // Reiniciar a la primera página al cambiar la búsqueda
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearchChange} // Llamar a la función al cambiar el input
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <DataTable columns={columns} data={data} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)}
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
