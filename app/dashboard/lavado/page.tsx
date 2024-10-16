"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  vehicleType: z.string().min(1, { message: "Seleccione el tipo de vehículo" }),
  brand: z.string().min(1, { message: "Ingrese la marca del vehículo" }),
  licensePlate: z.string().min(1, { message: "Ingrese el número de placa" }),
  ownerName: z.string().min(1, { message: "Ingrese el nombre del propietario" }),
  ownerPhone: z.string().min(1, { message: "Ingrese el teléfono del propietario" }),
  condition: z.string().min(1, { message: "Seleccione la condición del vehículo" }),
  service: z.string().min(1, { message: "Seleccione el servicio a realizar" }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewWashPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Nuevo Lavado</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Tipo de Vehículo</Label>
              <select
                id="vehicleType"
                {...register('vehicleType')}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione el tipo</option>
                <option value="car">Automóvil</option>
                <option value="suv">SUV</option>
                <option value="truck">Camioneta</option>
                <option value="motorcycle">Motocicleta</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" {...register('brand')} />
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="licensePlate">Número de Placa</Label>
            <Input id="licensePlate" {...register('licensePlate')} />
            {errors.licensePlate && <p className="text-red-500 text-xs mt-1">{errors.licensePlate.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nombre del Propietario</Label>
              <Input id="ownerName" {...register('ownerName')} />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Teléfono del Propietario</Label>
              <Input id="ownerPhone" {...register('ownerPhone')} />
              {errors.ownerPhone && <p className="text-red-500 text-xs mt-1">{errors.ownerPhone.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Condición del Vehículo</Label>
            <select
              id="condition"
              {...register('condition')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione la condición</option>
              <option value="good">Bueno</option>
              <option value="minor_defects">Con defectos menores</option>
              <option value="major_defects">Con defectos mayores</option>
            </select>
            {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Servicio a Realizar</Label>
            <select
              id="service"
              {...register('service')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione el servicio</option>
              <option value="basic_wash">Lavado Básico</option>
              <option value="full_wash">Lavado Completo</option>
              <option value="premium_wash">Lavado Premium</option>
              <option value="interior_cleaning">Limpieza de Interiores</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Input id="notes" {...register('notes')} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Registrar Nuevo Lavado"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
