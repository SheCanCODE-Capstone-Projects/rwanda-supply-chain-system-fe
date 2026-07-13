import { apiFetch } from "@/services/api";
import type { Order } from "@/types/order";

export const orderService = {
  list() {
    return apiFetch<Order[]>("/orders");
  },
  get(id: string) {
    return apiFetch<Order>(`/orders/${id}`);
  },
  create(payload: Omit<Order, "id">) {
    return apiFetch<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
