import type { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState, [["zustand/persist", UserState]]>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: User) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "i-revenue-user",
    }
  )
);