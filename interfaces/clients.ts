export interface Customer {
    id: string;         
    name: string;       
    lastName: string;   
    phone: string;      
    email: string;     
    createdAt: string;  
    updatedAt: string; 
    deletedAt: string | null; 
  }
  
 
  export interface Metadata {
    itemsPerPage: number; 
    totalPages: number;    
    totalItems: number;    
    currentPage: number;   
    nextPage: string | null; 
    searchTerm: string;  
  }
  
 
  export interface DataCustomers {
    rows: Customer[]; 
    metadata: Metadata; 
  }