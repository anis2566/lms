import { Category } from "@prisma/client";
import { create } from "zustand";

interface CategoryCreateState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryCreate = create<CategoryCreateState>()((set) => ({
  open: false,
  onOpen: () => set((state) => ({ open: true })),
  onClose: () => set((state) => ({ open: false })),
}));
