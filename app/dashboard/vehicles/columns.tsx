import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/interfaces/user";
import { deleteUser } from "@/app/api/users/user.api";
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
import EditUserSheet from "@/components/edituserSheet";

const ActionCell: React.FC<{ user: User; refreshData: () => void }> = ({
  user,
  refreshData,
}) => {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleDelete = async (id: number) => {
    const response = await deleteUser(id);

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
      <EditUserSheet
        user={user}
        isOpen={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        onUserUpdated={refreshData}
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
          <DropdownMenuItem onClick={() => handleDelete(Number(user.id))}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const columns = (refreshData: () => void): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rolesUser",
    header: "Roles",
    cell: ({ row }) => (
      <div>
        {row.original.rolesUser
          .map((roleUser) => roleUser.role.name)
          .join(", ")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell user={row.original} refreshData={refreshData} />
    ),
  },
];

export default columns;
