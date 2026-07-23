import type { User } from "@/types/user";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
  refreshToken?: string;
};
