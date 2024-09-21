"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatisticsPage() {
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Estadísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">Aquí se mostrarán las estadísticas del negocio.</p>
      
      </CardContent>
    </Card>
  );
}
