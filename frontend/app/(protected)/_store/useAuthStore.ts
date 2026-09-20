import { create } from 'zustand';

export type Role = "JR" | "SM";

interface AuthState {
  currentRole: Role;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRole: "JR",
  setRole: (role) => set({ currentRole: role }),
}));
