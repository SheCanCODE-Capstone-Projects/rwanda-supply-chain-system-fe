export type PaymentInvoice = {
  id: string;
  supplier: string;
  orderId: string;
  amount: string;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
  products: string;
  date: string;
};

export type PaymentTransaction = {
  id: string;
  invoiceId: string;
  orderId: string;
  amount: string;
  method: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
};

export type PaymentMethodItem = {
  id: string;
  type: "Bank Account" | "Mobile Money" | "Card";
  name: string;
  detail: string;
  status: string;
};

export type RefundItem = {
  id: string;
  orderId: string;
  product: string;
  amount: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
};

export const paymentInvoices: PaymentInvoice[] = [
  { id: "INV-1001", supplier: "Kigali Cooperative", orderId: "#2345", amount: "500,000 RWF", dueDate: "25 Jul", status: "Pending", products: "Rice x 500kg", date: "2026-07-21" },
  { id: "INV-1002", supplier: "Musanze Farmers Union", orderId: "#2346", amount: "1,200,000 RWF", dueDate: "27 Jul", status: "Paid", products: "Coffee x 250kg", date: "2026-07-19" },
  { id: "INV-1003", supplier: "Gasabo Produce", orderId: "#2347", amount: "320,000 RWF", dueDate: "30 Jul", status: "Overdue", products: "Tomatoes x 300kg", date: "2026-07-10" },
];

export const paymentTransactions: PaymentTransaction[] = [
  { id: "TX-401", invoiceId: "INV-1002", orderId: "#2346", amount: "1,200,000 RWF", method: "Bank Transfer", date: "2026-07-20", status: "Completed" },
  { id: "TX-402", invoiceId: "INV-1001", orderId: "#2345", amount: "500,000 RWF", method: "Mobile Money", date: "2026-07-21", status: "Pending" },
];

export const paymentMethods: PaymentMethodItem[] = [
  { id: "pm-1", type: "Bank Account", name: "Bank of Kigali", detail: "Account • 0012345678", status: "Verified" },
  { id: "pm-2", type: "Mobile Money", name: "MTN MoMo", detail: "Phone • 0782 111 222", status: "Active" },
  { id: "pm-3", type: "Card", name: "Visa Debit", detail: "•••• 4242", status: "Active" },
];

export const refundItems: RefundItem[] = [
  { id: "RF-101", orderId: "#2347", product: "Tomatoes", amount: "120,000 RWF", reason: "Damaged on arrival", status: "Pending" },
  { id: "RF-102", orderId: "#2348", product: "Coffee", amount: "80,000 RWF", reason: "Quality mismatch", status: "Approved" },
];
