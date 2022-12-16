import create from "zustand";

interface AppState {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

export const useStore = create<AppState>((set) => ({
  searchFilter: "",
  setSearchFilter: (value: string) => set({ searchFilter: value }),
}));
