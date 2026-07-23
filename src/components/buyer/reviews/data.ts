export type ReviewStatus = "Published" | "Pending" | "Draft";

export type BuyerReview = {
  id: string;
  orderId: string;
  product: string;
  supplier: string;
  rating: number; // 1–5
  title: string;
  body: string;
  status: ReviewStatus;
  date: string;
  helpful: number;
  images?: string[];
};

export const buyerReviews: BuyerReview[] = [
  {
    id: "REV-001",
    orderId: "ORD-1181",
    product: "Fresh Tomatoes",
    supplier: "Gasabo Produce",
    rating: 5,
    title: "Excellent quality, delivered fresh",
    body: "The tomatoes arrived in perfect condition, cold-chain maintained throughout. Will definitely order again. Gasabo Produce is a reliable supplier.",
    status: "Published",
    date: "2026-07-19",
    helpful: 8,
  },
  {
    id: "REV-002",
    orderId: "ORD-1183",
    product: "Premium Arabica Coffee",
    supplier: "Musanze Cooperative",
    rating: 4,
    title: "Great coffee, slight packaging issue",
    body: "The coffee beans are top-notch — rich aroma and consistent grind size. Minor complaint: one of the bags arrived with a small tear. Supplier responded quickly though.",
    status: "Published",
    date: "2026-07-20",
    helpful: 5,
  },
  {
    id: "REV-003",
    orderId: "ORD-1182",
    product: "Long Grain White Rice",
    supplier: "Kigali Grain Hub",
    rating: 0,
    title: "",
    body: "",
    status: "Pending",
    date: "2026-07-21",
    helpful: 0,
  },
];

export const PENDING_REVIEW_ORDERS = buyerReviews.filter((r) => r.status === "Pending");
