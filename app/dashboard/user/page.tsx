"use client";

import { useEffect, useState, useCallback } from "react";
import { DataTable } from "@/components/dataTable";
import { getDataUsers } from "@/app/api/users/user.api";
import { Metadata, User } from "@/interfaces/user";
import Paginator from "@/components/paginator";
import columns from "./columns";
import { Button } from "@/components/ui/button";
import DialogUser from "@/components/createUserDialog";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, RefreshCw } from "lucide-react";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<Metadata>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await getDataUsers(page);
    setUsers(response.rows);
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

  const handleUserCreated = () => {
    fetchData();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <CardTitle className="text-2xl font-bold">Gestión de Usuarios</CardTitle>
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Crear Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
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
            <DataTable columns={columnsConfig} data={filteredUsers} />
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
        onUserCreated={handleUserCreated}
      />
    </motion.div>
  );
};

export default UserPage;
