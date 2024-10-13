import { editUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { User, Role } from "@/interfaces/user";
import { editUserAction } from "@/actions/user.actions";
import { toast } from "sonner";
import * as Select from "@radix-ui/react-select";



interface EditUserSheetProps {
  user: User;
  rolesList: Role[]; 
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}

const EditUserSheet = ({
  user,
  rolesList,
  isOpen,
  onOpenChange,
  onUserUpdated,
}: EditUserSheetProps) => {
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      id: Number(user.id),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      roles: user.rolesUser.map((roleUser) => Number(roleUser.role.id)),
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        id: Number(user.id),
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        roles: user.rolesUser.map((roleUser) => Number(roleUser.role.id)),
        password: "",
      });
    }
  }, [isOpen, user, form]);

  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
    try {
      const response = await editUserAction(values);
      if (response.statusCode === 200) {
        toast.success(response.message, {
          className: "bg-green-500 text-white flex items-center p-4 rounded",
        });
        onUserUpdated();
        onOpenChange(false);
      } else {
        toast.error(response.message, {
          className: "bg-red-500 text-white flex items-center p-4 rounded",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario", {
        className: "bg-red-500 text-white flex items-center p-4 rounded",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Editar Usuario</SheetTitle>
          <SheetDescription>
            Realiza cambios en la información del usuario aquí. Haz clic en
            guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
<FormField
  control={form.control}
  name="roles"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Roles</FormLabel>
      <FormControl>
        <Select.Root
          value={field.value.length > 0 ? field.value[0].toString() : ""} // Asegúrate de pasar un string
          onValueChange={(value: string) => {
            const selectedValue = Number(value);
            if (!field.value.includes(selectedValue)) {
              field.onChange([...field.value, selectedValue]); // Agrega el nuevo rol
            }
          }}
        >
          <Select.Trigger className="w-full">
            <Select.Value placeholder="Selecciona un rol" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              {rolesList && rolesList.length > 0 ? (
                rolesList.map((role) => (
                  <Select.Item key={role.id} value={role.id.toString()}>
                    <Select.ItemText>{role.name}</Select.ItemText>
                  </Select.Item>
                ))
              ) : (
                <p>No roles available</p>
              )}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
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

export default EditUserSheet;
