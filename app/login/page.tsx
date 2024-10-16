"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD:components/login.tsx
import { signInAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const roter = useRouter();
=======
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 

export default function LoginForm() {
  const router = useRouter(); 
>>>>>>> e7b67dfb72ffcbe671dc7f932c4db86eb7efe1dc:app/login/page.tsx
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

<<<<<<< HEAD:components/login.tsx
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const response = await signInAction(values);
    if (response?.error) {
      toast.error(response.error, {
        className: "bg-red-500 text-white flex items-center p-4 rounded",
      });
    }
    if (response?.success) {
      roter.push("/dashboard");
=======
  const localUser = {
    email: "admin@gmail.com",
    password: "",
  };

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;

  
    if (email === localUser.email && password === localUser.password) {
   
      router.push("/dashboard")
    } else {
     
      alert("Usuario o contraseña incorrectos");
>>>>>>> e7b67dfb72ffcbe671dc7f932c4db86eb7efe1dc:app/login/page.tsx
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="logo-container">
          <Image 
            src="/images/car.png" 
            alt="Logo" 
            width={100} 
            height={100} 
            className="logo"
            priority
          />
        </div>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
<<<<<<< HEAD:components/login.tsx
                    <Input type="email" {...field} />
=======
                    <Input type="text" {...field} placeholder="User" />
>>>>>>> e7b67dfb72ffcbe671dc7f932c4db86eb7efe1dc:app/login/page.tsx
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
<<<<<<< HEAD:components/login.tsx
                    <Input type="password" {...field} />
=======
                    <Input type="password" {...field} placeholder="Password" />
>>>>>>> e7b67dfb72ffcbe671dc7f932c4db86eb7efe1dc:app/login/page.tsx
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
