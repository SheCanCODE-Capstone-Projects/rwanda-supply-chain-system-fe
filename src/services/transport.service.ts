import { apiFetch } from "@/services/api";

export type Shipment = {
  id: string;
  orderId: string;
  status: string;
  driverId?: string;
};

export const transportService = {
  listShipments() {
    return apiFetch<Shipment[]>("/shipments");
  },
  getShipment(id: string) {
    return apiFetch<Shipment>(`/shipments/${id}`);
  },
};
