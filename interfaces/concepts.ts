interface VehicleType {
  id: string;
  label: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ConceptTypeVehicule {
  id: string;
  conceptId: string;
  typeVehiculeId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  vehicleType: VehicleType;
}

export interface Concept {
  id: string;
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
