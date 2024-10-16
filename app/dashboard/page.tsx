import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiDashboardLine, RiCarWashingLine, RiUserSmileLine, RiSettings4Line } from "react-icons/ri";

const DashboardWelcome = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <RiDashboardLine className="w-10 h-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold">Bienvenido al Dashboard de Lavado de Autos</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">
            Esta aplicación te permite administrar eficientemente tu negocio de lavado de autos. 
            Gestiona clientes, servicios, y mantén un seguimiento detallado de tus operaciones diarias.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <RiCarWashingLine className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Gestión de Servicios</h3>
                <p className="text-center text-sm text-muted-foreground">Administra tus servicios de lavado y sus precios</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <RiUserSmileLine className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Clientes</h3>
                <p className="text-center text-sm text-muted-foreground">Gestiona tu base de clientes y sus preferencias</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <RiSettings4Line className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Configuración</h3>
                <p className="text-center text-sm text-muted-foreground">Personaliza la aplicación según tus necesidades</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Button className="w-full md:w-auto">Comenzar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardWelcome;