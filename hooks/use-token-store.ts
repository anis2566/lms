import { create } from "zustand";

type ConfettiStore = {
  id_token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useTokenStore = create<ConfettiStore>((set) => ({
  id_token: "",
  setToken: (token) => set({ id_token: token }),
  removeToken: () => set({ id_token: "" }),
}));
