"use client";
import { useEffect, useState, useCallback } from "react";
import { getDataCustomers } from "@/app/api/customers/customer.api"; 
import { Metadata, Customer } from "@/interfaces/clients"; 
import columns from "./columns"; 
import { Button } from "@/components/ui/button";
import Paginator from "@/components/paginator";
import DialogUser from "@/components/DialogCustomer";
import { DataTableClients } from "@/components/dataTableClients";
const ClientPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Metadata>();
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchData = useCallback(async () => {
    const response = await getDataCustomers(page);
    setCustomers(response.rows);
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

  const handleCustomerCreated = () => {
    fetchData(); 
    setIsDialogOpen(false); 
  };

  const columnsConfig = columns(fetchData); 

  return (
    <>
        <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            Añadir cliente <span className="ml-2">+</span>
          </Button>
        </div>
        <DataTableClients columns={columnsConfig} data={customers} />
        {paginationInfo && (
          <Paginator
            metadata={paginationInfo}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
      </div>
      <DialogUser
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onUserCreated={handleCustomerCreated} 
      />
    </>
  );
};

export default ClientPage;
