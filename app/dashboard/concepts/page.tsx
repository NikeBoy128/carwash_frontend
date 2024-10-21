"use client";

import { useEffect, useState, useCallback } from "react";
import { getConceptsPaginated } from "@/app/api/concepts/concepts.api";
import { Metadata } from "@/interfaces/user";
import { DataConcepts, Concept } from "@/interfaces/concepts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Paginator from "@/components/paginator";
import ConceptList from "@/components/cardsConcepts";

export default function ConceptsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const [conceptsData, setConceptsData] = useState<DataConcepts | null>(null);
  const [page, setPage] = useState(Number(searchParams.page) || 1);
  const [search, setSearch] = useState(searchParams.search || "");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const data = await getConceptsPaginated(page, search);
    setConceptsData(data);
    setIsLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Conceptos</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          type="text"
          placeholder="Buscar conceptos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
      </form>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : conceptsData && conceptsData.rows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conceptsData.rows.map((concept: Concept) => (
            <ConceptList key={concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron conceptos.
        </p>
      )}

      {conceptsData && (
        <div className="mt-8 flex justify-between items-center">
          <Paginator
            metadata={conceptsData.metadata}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        </div>
      )}
    </div>
  );
}
