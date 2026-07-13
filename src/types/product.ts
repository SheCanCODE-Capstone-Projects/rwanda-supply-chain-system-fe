import type { ID } from "@/types/common";

export type Product = {
  id: ID;
  name: string;
  description?: string;
  sku?: string;
  unitPrice: number;
  quantityAvailable: number;
  ownerId: ID;
  createdAt?: string;
  updatedAt?: string;
};
