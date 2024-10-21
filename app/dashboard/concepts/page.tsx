"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Droplet, Plus, Trash } from "lucide-react";
import { getDataConcepts, createConcept } from "@/app/api/concepts/concepts.api";
import { z } from "zod";

interface ConceptTypeVehicule {
  id: number;
  conceptId: number;
  typeVehiculeId: number; // Cambiado a number
  value: number;
}

interface Concept {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  conceptTypeVehicule: ConceptTypeVehicule[];
}

const addConceptSchema = z.object({
  description: z.string().min(1, "Descripción es requerida"),
  conceptTypeVehicule: z.array(
    z.object({
      id: z.number().optional(), // id opcional para nuevas entradas
      conceptId: z.number().optional(), // conceptId opcional para nuevas entradas
      typeVehiculeId: z.number(),
      value: z.number(),
    })
  ),
});

export default function Component() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const servicesPerPage = 4;
  const [services, setServices] = React.useState<Concept[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [newConcept, setNewConcept] = React.useState<{
    description: string;
    conceptTypeVehicule: ConceptTypeVehicule[];
  }>({
    description: "",
    conceptTypeVehicule: [{ id: 0, conceptId: 0, typeVehiculeId: 0, value: 0 }],
  });


  React.useEffect(() => {
    const fetchServices = async () => {
      const data = await getDataConcepts(currentPage); 
      setServices(data.rows); 
      setTotalPages(data.metadata.totalPages); 
    };

    fetchServices(); 
  }, [currentPage]);

  const filteredServices = services.filter(service =>
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const handleAddService = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewConcept({ description: "", conceptTypeVehicule: [{ id: 0, conceptId: 0, typeVehiculeId: 0, value: 0 }] }); 
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewConcept((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeVehiculeChange = (index: number, field: keyof ConceptTypeVehicule, value: number) => {
    const updatedConceptTypeVehicule = [...newConcept.conceptTypeVehicule];
    updatedConceptTypeVehicule[index][field] = value;
    setNewConcept((prev) => ({ ...prev, conceptTypeVehicule: updatedConceptTypeVehicule }));
  };

  const handleAddTypeVehicule = () => {
    setNewConcept((prev) => ({
      ...prev,
      conceptTypeVehicule: [
        ...prev.conceptTypeVehicule,
        { id: 0, conceptId: 0, typeVehiculeId: 0, value: 0 },
      ],
    }));
  };

  const handleRemoveTypeVehicule = (index: number) => {
    const updatedConceptTypeVehicule = newConcept.conceptTypeVehicule.filter((_, i) => i !== index);
    setNewConcept((prev) => ({ ...prev, conceptTypeVehicule: updatedConceptTypeVehicule }));
  };

  const handleCreateConcept = async () => {
    try {
      await createConcept(newConcept);
      handleDialogClose();
      const data = await getDataConcepts(currentPage);
      setServices(data.rows);
      setTotalPages(data.metadata.totalPages);
    } catch (error) {
      console.error("Error creando concepto:", error);
    }
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
        {currentServices.map((service) => (
          <motion.div
            key={service.id} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="w-[300px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardFooter className="bg-blue-100 p-4 flex items-center justify-center">
                <Droplet className="mr-2 text-black" />
                <h3 className="text-xl font-bold text-black">{service.description}</h3>
              </CardFooter>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {service.conceptTypeVehicule.map((vehicle) => (
                    <div key={vehicle.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-lg font-medium flex items-center">
                        {vehicle.typeVehiculeId}
                      </span>
                      <span className="text-lg font-bold">
                        ${(vehicle.value).toLocaleString()} 
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <div className="modal-dialog"> 
              <DialogTitle className="text-xl font-semibold">Crear Nuevo Concepto</DialogTitle>
              <div className="flex flex-col mt-4">
                <Input
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  value={newConcept.description}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                {newConcept.conceptTypeVehicule.map((typeVehicule, index) => (
                  <div key={index} className="flex mb-2 items-center">
                    <Input
                      type="number"
                      placeholder="ID Tipo Vehículo"
                      value={typeVehicule.typeVehiculeId || ""}
                      onChange={(e) => handleTypeVehiculeChange(index, "typeVehiculeId", Number(e.target.value))}
                      className="w-1/2 mr-2"
                    />
                    <Input
                      type="number"
                      placeholder="Valor"
                      value={typeVehicule.value || ""}
                      onChange={(e) => handleTypeVehiculeChange(index, "value", Number(e.target.value))}
                      className="w-1/2 mr-2"
                    />
                    <Button onClick={() => handleRemoveTypeVehicule(index)} variant="outline" className="text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddTypeVehicule} className="mt-2" variant="outline">
                  Añadir Tipo Vehículo
                </Button>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={handleDialogClose} className="mr-2">Cancelar</Button>
                <Button onClick={handleCreateConcept}>Crear Concepto</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}
