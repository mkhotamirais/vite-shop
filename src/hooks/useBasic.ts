import { create } from "zustand";

interface BasicState {
  nav: boolean;
  openNav: () => void;
  closeNav: () => void;
}

export const useBasic = create<BasicState>((set) => ({
  nav: false,
  openNav: () => set({ nav: true }),
  closeNav: () => set({ nav: false }),
}));
