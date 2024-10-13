"use client";
import { editCustomerSchema } from "@/lib/zod"; // Importa el esquema de validación para clientes
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"; 
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Customer } from "@/interfaces/clients";
import { editCustomer } from "@/app/api/customers/customer.api"; 

interface EditCustomerSheetProps {
  customer: Customer; 
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerUpdated: () => void;
}

const EditCustomerSheet = ({
  customer,
  isOpen,
  onOpenChange,
  onCustomerUpdated,
}: EditCustomerSheetProps) => {
  const form = useForm<z.infer<typeof editCustomerSchema>>({
    resolver: zodResolver(editCustomerSchema),
    defaultValues: {
      name: customer.name,
      lastName: customer.lastName,
      phone: customer.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof editCustomerSchema>) => {
    const response = await editCustomer(values); 
    if (response.statusCode === 200) {
      toast.success(response.message, {
        className: "bg-green-500 text-white flex items-center p-4 rounded",
      });
    } else {
      toast.error(response.message, {
        className: "bg-red-500 text-white flex items-center p-4 rounded",
      });
    }
    onCustomerUpdated();
    onOpenChange(false);
  };
  

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Editar Cliente</SheetTitle>
          <SheetDescription>
            Realiza cambios en la información del cliente aquí. Haz clic en
            guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>celular</FormLabel>
                  <FormControl>
                    <Input type="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit">Guardar cambios</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditCustomerSheet;
