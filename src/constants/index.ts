// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
  verifyOtp: "/auth/verify-otp",
  unauthorized: "/unauthorized",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  bookDemo: "/book-demo",
  // role homes
  admin: "/admin",
  government: "/government",
  farmer: "/farmer",
  cooperative: "/cooperative",
  manufacturer: "/manufacturer",
  supplier: "/supplier",
  buyer: "/buyer",
  retailer: "/retailer",
  warehouse: "/warehouse",
  transport: "/transport",
  driver: "/driver",
  bank: "/bank",
} as const;

// ─── Status ───────────────────────────────────────────────────────────────────
export const STATUS_TONE = {
  Active:      "success",
  Confirmed:   "success",
  Delivered:   "success",
  Available:   "success",
  Inactive:    "muted",
  Suspended:   "danger",
  Cancelled:   "danger",
  Pending:     "warning",
  "In Transit":"info",
  "On Trip":   "info",
  "Off Duty":  "muted",
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ─── App ──────────────────────────────────────────────────────────────────────
export const APP_NAME = "RSCN";
export const APP_FULL_NAME = "Rwanda Supply Chain Network";
export const APP_TAGLINE = "Connecting every product, every business, every movement.";
