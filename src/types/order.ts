import type { ID } from "@/types/common";

export type OrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "fulfilled"
  | "cancelled";

export type OrderLine = {
  productId: ID;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: ID;
  buyerId: ID;
  sellerId: ID;
  status: OrderStatus;
  lines: OrderLine[];
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
};
