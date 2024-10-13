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
import { editUserSchema } from "@/lib/zod";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiSelect";
import { createUser } from "@/app/api/users/user.api";

interface DialogUserProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUserCreated: () => void;
}

const DialogUser: React.FC<DialogUserProps> = ({
  isOpen,
  onOpenChange,
  onUserCreated,
}) => {
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      id: undefined,
      name: "",
      lastName: "",
      email: "",
      roles: [], // Cambiar a vacío para la selección de roles
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: undefined,
        name: "",
        lastName: "",
        email: "",
        roles: [],
        password: "",
      });
    }
  }, [isOpen, form]);

  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
    const response = await createUser(values); 
    if (response) {
      console.log("Usuario creado:", response); 
      onUserCreated(); 
    } else {
      console.log("Error creando usuario:", values)
    }
    onOpenChange(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Creación de usuarios</DialogTitle>
          <DialogDescription>Crea Usuarios aquí</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="roles" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Roles</FormLabel>
                  <MultiSelector onValuesChange={field.onChange} values={field.value}>
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Selecciona roles" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {["Admin", "User"].map((role) => (
                          <MultiSelectorItem key={role} value={role}>
                            <span>{role}</span>
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
