import type { ID } from "@/types/common";

export type Warehouse = {
  id: ID;
  name: string;
  location: string;
  capacity?: number;
  organizationId: ID;
};

export type StockItem = {
  id: ID;
  productId: ID;
  warehouseId: ID;
  quantity: number;
};
