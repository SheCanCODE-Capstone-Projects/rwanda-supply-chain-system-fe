export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  timeoutMs: 30_000,
} as const;
