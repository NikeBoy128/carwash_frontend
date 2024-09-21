"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CarFront, UserPlus, Users } from 'lucide-react';
import '../globals.css'; 

export default function DashboardPage() {
  const menuItems = [
    { title: 'Ver Estadísticas', icon: BarChart3, href: '/dashboard/estadisticas' },
    { title: 'Nuevo Lavado', icon: CarFront, href: '/dashboard/lavado' }, 
    { title: 'Agregar Trabajador', icon: UserPlus, href: '/dashboard/trabajador' },
    { title: 'Agregar Cliente', icon: Users, href: '/dashboard/cliente' },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar hidden md:block">
        <div className="sidebar-header">
          <h2 className="sidebar-title mt-4">System CarWash</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="sidebar-link">
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <h1 className="main-title">Bienvenido administrador, ¿qué deseas hacer hoy?</h1>
        <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="card-link">
              <Card className="card-hover-effect transition-transform transform hover:scale-105 p-6"> 
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{item.title}</CardTitle> 
                  <item.icon className="h-6 w-6 text-muted-foreground" /> 
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Haga clic para acceder</p> 
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
