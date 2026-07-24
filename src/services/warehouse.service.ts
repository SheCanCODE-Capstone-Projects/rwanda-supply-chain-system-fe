import { apiFetch } from "@/services/api";
import type { StockItem, Warehouse } from "@/types/warehouse";

export const warehouseService = {
  list() {
    return apiFetch<Warehouse[]>("/warehouses");
  },
  stock(warehouseId: string) {
    return apiFetch<StockItem[]>(`/warehouses/${warehouseId}/stock`);
  },
};
