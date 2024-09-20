import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, CarFront, UserPlus, Users } from 'lucide-react'

export default function DashboardPage() {
  const menuItems = [
    { title: 'Ver Estadísticas', icon: BarChart3, href: '/dashboard/statistics' },
    { title: 'Nuevo Lavado', icon: CarFront, href: '/dashboard/new-wash' },
    { title: 'Agregar Trabajador', icon: UserPlus, href: '/dashboard/add-worker' },
    { title: 'Agregar Cliente', icon: Users, href: '/dashboard/add-client' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">CarWash Dashboard</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200">
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Área de contenido principal */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Bienvenido al Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className="block">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Haga clic para acceder</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}