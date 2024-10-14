import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import { Customer } from "@/interfaces/clients";
import { deleteCustomer } from "@/app/api/customers/customer.api";
import EditCustomerSheet from "@/components/EditCustomerSheet";

const ActionCell: React.FC<{ customer: Customer; refreshData: () => void }> = ({
  customer,
  refreshData,
}) => {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleDelete = async (id: number) => {
    const response = await deleteCustomer(id);

    if (response.statusCode === 200) {
      toast.success(response.message, {
        className: "bg-green-500 text-white flex items-center p-4 rounded",
      });
      refreshData();
    } else {
      toast.error(response.message, {
        className: "bg-red-500 text-white flex items-center p-4 rounded",
      });
    }
  };

  return (
    <>
      <EditCustomerSheet
        customer={customer}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        onCustomerUpdated={refreshData}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(customer.id)}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const columns = (refreshData: () => void): ColumnDef<Customer>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell customer={row.original} refreshData={refreshData} />
    ),
  },
];

export default columns;
