import { apiFetch } from "@/services/api";
import type { Product } from "@/types/product";

export const productService = {
  list() {
    return apiFetch<Product[]>("/products");
  },
  get(id: string) {
    return apiFetch<Product>(`/products/${id}`);
  },
  create(payload: Omit<Product, "id">) {
    return apiFetch<Product>("/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
