"use client";

import { useEffect, useState, useCallback } from "react";
import { getConceptsPaginated } from "@/app/api/concepts/concepts.api";
import ConceptList from "@/components/cardsConcepts";
import Paginator from "@/components/paginator";
import { Metadata } from "@/interfaces/user";
import { DataConcepts } from "@/interfaces/concepts";

export default function ConceptsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const [conceptsData, setConceptsData] = useState<DataConcepts | null>(null);
  const [page, setPage] = useState(Number(searchParams.page) || 1);
  const [search, setSearch] = useState(searchParams.search || "");

  const fetchData = useCallback(async () => {
    const data = await getConceptsPaginated(page, search);
    setConceptsData(data);
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

  if (!conceptsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Conceptos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conceptsData.rows.map((concept) => (
          <ConceptList key={concept.id} concept={concept} />
        ))}
      </div>
      <Paginator
        metadata={conceptsData.metadata}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </div>
  );
}
