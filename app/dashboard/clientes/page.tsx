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

const ClientPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Metadata>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await getDataCustomers(page);
    setCustomers(response.rows);
    setPaginationInfo(response.metadata);
    setIsLoading(false);
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

  
  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  const columnsConfig = columns(fetchData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <CardTitle className="text-2xl font-bold">Gestión de Clientes</CardTitle>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={fetchData} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
          <div className="rounded-md border">
            <DataTableClients columns={columnsConfig} data={filteredCustomers} />
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
    </motion.div>
  );
};

export default ClientPage;
