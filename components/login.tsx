
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
import { signInAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSpring, animated } from '@react-spring/web'; 
import { useEffect } from "react";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const response = await signInAction(values);
    if (response?.error) {
      toast.error(response.error, {
        className: "bg-red-500 text-white flex items-center p-4 rounded",
      });
    }
    if (response?.success) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // 2 segundos de retraso para la visualización
    }
  };

  // Configuración de la animación
  const [springProps, set] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(20px)",
  }));

  useEffect(() => {
    set({ opacity: 1, transform: "translateY(0px)", config: { tension: 120, friction: 10 } });
  }, [set]);

  return (
    <animated.div style={springProps} className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
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
                      <Input type="password" {...field} />
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
    </animated.div>
  );
}
