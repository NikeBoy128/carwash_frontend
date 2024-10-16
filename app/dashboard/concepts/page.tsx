"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Droplet, Zap, Home, Star, Bike, Car, Truck, Plus, Sparkles, Shield, Wrench, Coffee } from "lucide-react";

export default function Component() {
  const services = [
    { title: "Lavado Completo", icon: Droplet, color: "text-black", bgColor: "bg-blue-100" },
    { title: "Lavado Express", icon: Zap, color: "text-black", bgColor: "bg-yellow-100" },
    { title: "Lavado Interior", icon: Home, color: "text-black", bgColor: "bg-green-100" },
    { title: "Lavado Premium", icon: Star, color: "text-black", bgColor: "bg-purple-100" },
    { title: "Lavado Detallado", icon: Sparkles, color: "text-black", bgColor: "bg-pink-100" },
    { title: "Lavado Protector", icon: Shield, color: "text-black", bgColor: "bg-indigo-100" },
    { title: "Mantenimiento Básico", icon: Wrench, color: "text-black", bgColor: "bg-orange-100" },
    { title: "Lavado y Café", icon: Coffee, color: "text-black", bgColor: "bg-amber-100" },
  ];

  const vehicles = [
    { name: "Motos", icon: Bike },
    { name: "Carro", icon: Car },
    { name: "Moto Carro", icon: Truck },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const servicesPerPage = 4;

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handleAddService = () => {
    console.log("Añadir nuevo servicio");
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8 p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" /> Añadir servicio
        </Button>
      </div>

      <div className="flex justify-center flex-wrap gap-6">
        {currentServices.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="w-[300px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardFooter className={`${service.bgColor} p-4 flex items-center justify-center`}>
                <service.icon className={`mr-2 ${service.color}`} />
                <h3 className={`text-xl font-bold ${service.color}`}>{service.title}</h3>
              </CardFooter>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {vehicles.map((vehicle, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-lg font-medium flex items-center">
                        <vehicle.icon className="mr-2 h-5 w-5" />
                        {vehicle.name}
                      </span>
                      <span className="text-lg font-bold">
                        ${(10000 + (index + indexOfFirstService) * 2000 + idx * 5000).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredServices.length > servicesPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePreviousPage}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={handleNextPage}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}