import type { User } from "@/types/user";

export type UserState = {
  users: User[];
  selectedUser: User | null;
};

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
};
