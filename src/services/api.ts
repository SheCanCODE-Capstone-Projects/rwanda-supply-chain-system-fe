import { API_CONFIG } from "@/config/api";

type ApiFetchOptions = RequestInit & {
  token?: string;
};

export async function apiFetch<T>(
  path: string,
  { token, headers, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const response = await fetch(`${API_CONFIG.baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    // Try to extract a message from the response body first
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (typeof body?.message === "string") message = body.message;
      else if (typeof body?.error === "string") message = body.error;
    } catch {
      // Body wasn't JSON — keep the default message
    }

    // Give developers a clear hint when the backend is unreachable
    if (response.status === 404 && !API_CONFIG.baseUrl) {
      message =
        "Backend URL is not configured. Set NEXT_PUBLIC_API_URL in .env.local.";
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
