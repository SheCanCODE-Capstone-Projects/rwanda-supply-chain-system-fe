export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderLine = {
  product: string;
  qty: string;
  unitPrice: string;
  lineTotal: string;
};

export type BuyerOrder = {
  id: string;
  product: string;
  supplier: string;
  supplierLocation: string;
  quantity: string;
  amount: string;
  status: OrderStatus;
  date: string;
  expectedDelivery: string;
  lines: OrderLine[];
  paymentStatus: "Unpaid" | "Paid" | "Partial";
  trackingRef: string;
  notes?: string;
};

export const buyerOrders: BuyerOrder[] = [
  {
    id: "ORD-1183",
    product: "Premium Arabica Coffee",
    supplier: "Musanze Cooperative",
    supplierLocation: "Musanze",
    quantity: "250 kg",
    amount: "RWF 875,000",
    status: "Shipped",
    date: "2026-07-20",
    expectedDelivery: "2026-07-24",
    paymentStatus: "Paid",
    trackingRef: "TRK-7821",
    lines: [{ product: "Arabica Coffee Beans", qty: "250 kg", unitPrice: "RWF 3,500/kg", lineTotal: "RWF 875,000" }],
  },
  {
    id: "ORD-1182",
    product: "Long Grain White Rice",
    supplier: "Kigali Grain Hub",
    supplierLocation: "Kigali",
    quantity: "500 kg",
    amount: "RWF 1,150,000",
    status: "Processing",
    date: "2026-07-21",
    expectedDelivery: "2026-07-26",
    paymentStatus: "Unpaid",
    trackingRef: "TRK-7822",
    lines: [{ product: "Long Grain White Rice", qty: "500 kg", unitPrice: "RWF 2,300/kg", lineTotal: "RWF 1,150,000" }],
    notes: "Deliver to Warehouse WH-03",
  },
  {
    id: "ORD-1181",
    product: "Fresh Tomatoes",
    supplier: "Gasabo Produce",
    supplierLocation: "Gasabo",
    quantity: "300 kg",
    amount: "RWF 240,000",
    status: "Delivered",
    date: "2026-07-15",
    expectedDelivery: "2026-07-18",
    paymentStatus: "Paid",
    trackingRef: "TRK-7815",
    lines: [{ product: "Fresh Tomatoes", qty: "300 kg", unitPrice: "RWF 800/kg", lineTotal: "RWF 240,000" }],
  },
  {
    id: "ORD-1180",
    product: "Maize Flour",
    supplier: "Rwanda Foods Ltd",
    supplierLocation: "Rubavu",
    quantity: "200 kg",
    amount: "RWF 330,000",
    status: "Confirmed",
    date: "2026-07-22",
    expectedDelivery: "2026-07-27",
    paymentStatus: "Partial",
    trackingRef: "TRK-7823",
    lines: [{ product: "Refined Maize Flour", qty: "200 kg", unitPrice: "RWF 1,650/kg", lineTotal: "RWF 330,000" }],
    notes: "Requires cold storage on arrival",
  },
  {
    id: "ORD-1179",
    product: "Irish Potatoes",
    supplier: "Musanze Farm Coop",
    supplierLocation: "Musanze",
    quantity: "800 kg",
    amount: "RWF 520,000",
    status: "Cancelled",
    date: "2026-07-10",
    expectedDelivery: "2026-07-14",
    paymentStatus: "Unpaid",
    trackingRef: "TRK-7800",
    lines: [{ product: "Irish Potatoes Grade A", qty: "800 kg", unitPrice: "RWF 650/kg", lineTotal: "RWF 520,000" }],
    notes: "Cancelled due to quality dispute",
  },
  {
    id: "ORD-1178",
    product: "Hass Avocado",
    supplier: "Nyagatare Farm",
    supplierLocation: "Nyagatare",
    quantity: "600 pcs",
    amount: "RWF 240,000",
    status: "Pending",
    date: "2026-07-23",
    expectedDelivery: "2026-07-28",
    paymentStatus: "Unpaid",
    trackingRef: "TRK-7824",
    lines: [{ product: "Hass Avocado Export Grade", qty: "600 pcs", unitPrice: "RWF 400/pc", lineTotal: "RWF 240,000" }],
  },
];

export const ORDER_STATUSES: OrderStatus[] = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

export function statusColor(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    Confirmed: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    Processing: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
    Shipped: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    Delivered: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    Cancelled: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  };
  return map[status] ?? "bg-slate-500/10 text-slate-600";
}

export function paymentColor(status: string): string {
  if (status === "Paid") return "bg-emerald-500/10 text-emerald-700";
  if (status === "Partial") return "bg-amber-500/10 text-amber-700";
  return "bg-rose-500/10 text-rose-700";
}
