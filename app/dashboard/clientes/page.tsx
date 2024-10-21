"use client";
import { useEffect, useState, useCallback } from "react";
import { getDataCustomers } from "@/app/api/customers/customer.api";
import { Metadata, Customer } from "@/interfaces/clients";
import columns from "./columns";
import { Button } from "@/components/ui/button";
import Paginator from "@/components/paginator";
import DialogUser from "@/components/DialogCustomer";
import { DataTableClients } from "@/components/dataTableClients";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, UserPlus } from "lucide-react";
import { debounce } from "lodash";

const ClientPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Metadata>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (searchTerm: string = "") => {
      setIsLoading(true);
      const response = await getDataCustomers(page, searchTerm);
      setCustomers(response.rows);
      setPaginationInfo(response.metadata);
      setIsLoading(false);
    },
    [page]
  );

  const debouncedFetchData = useCallback(
    debounce((searchTerm: string) => {
      fetchData(searchTerm);
    }, 500),
    [fetchData]
  );

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

  const columnsConfig = columns(() => fetchData(searchTerm));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedFetchData(e.target.value);
  };

  return (
    <>
      <Card className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <CardTitle className="text-2xl font-bold">
            Gestión de Clientes
          </CardTitle>
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Añadir Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
          <div className="rounded-md border">
            <DataTableClients columns={columnsConfig} data={customers} />
          </div>
          {paginationInfo && (
            <div className="mt-4">
              <Paginator
                metadata={paginationInfo}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <DialogUser
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUserCreated={handleCustomerCreated}
      />
    </>
  );
};

export default ClientPage;
