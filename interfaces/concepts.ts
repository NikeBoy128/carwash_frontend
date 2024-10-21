export interface ConceptTypeVehicule {
    id: number;  
    conceptId: number; 
    typeVehiculeId: number;  
    value: number; 
}

export interface Concept {
    id: number; 
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    conceptTypeVehicule: ConceptTypeVehicule[];
}

export interface Metadata {
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
    currentPage: number;
    nextPage: string | null;
    searchTerm: string;
}

export interface DataConcepts {
    rows: Concept[];
    metadata: Metadata;
}
