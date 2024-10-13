interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface RolesUser {
  id: string;
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: Role;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  rolesUser: RolesUser[];
}

export interface Metadata {
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  nextPage: string | null;
  searchTerm: string;
}

export interface DataUsers {
  rows: User[];
  metadata: Metadata;
}
