import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { createCustomer } from "@/app/api/customers/customer.api";


interface DialogUserProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUserCreated: () => void;
}


const customerSchema = z.object({

  name: z.string().nonempty("El nombre es obligatorio"),
  lastName: z.string().nonempty("El apellido es obligatorio"),
  phone: z.string().nonempty("El teléfono es obligatorio"),
});

const DialogUser: React.FC<DialogUserProps> = ({
  isOpen,
  onOpenChange,
  onUserCreated,
}) => {
  const form = useForm({
    resolver: zodResolver(customerSchema), 
    defaultValues: {
      name: "",
      lastName: "",
      phone: "", 
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: "",
        lastName: "",
        phone: "", 
      });
    }
  }, [isOpen, form]);
 
  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    try {
    
      const response = await createCustomer({
        name: values.name,
        lastName: values.lastName,
        phone: values.phone,
      });
  
      if (response.statusCode === 200) {
        console.log("Cliente creado:", response);
        onUserCreated(); 
      } else {
        console.error( response.message);
      }
    } catch (error) {
      console.error("Error en la creación del cliente:", error);
    }
  
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Creación de clientes</DialogTitle>
          <DialogDescription>Crea clientes aquí</DialogDescription>
        </DialogHeader>
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
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUser;
