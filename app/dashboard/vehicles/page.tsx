"use client";
import { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/dataTable";
import { getDataUsers } from "@/app/api/users/user.api";
import { Metadata, User } from "@/interfaces/user";
import Paginator from "@/components/paginator";
import { Button } from "@/components/ui/button";
import DialogUser from "@/components/createUserDialog";
import columns from "./columns";

const VehiclePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Metadata>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await getDataUsers(page);
    setUsers(response.rows);
    setPaginationInfo(response.metadata);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleUserCreated = () => {
    fetchData();
  };

  const columnsConfig = columns(fetchData);

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Vehiculos</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            Añadir veihiculo <span className="ml-2">+</span>
          </Button>
        </div>
        <DataTable columns={columnsConfig} data={users} />
        {paginationInfo && (
          <Paginator
            metadata={paginationInfo}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
      </div>

    </>
  );
};

export default VehiclePage;
