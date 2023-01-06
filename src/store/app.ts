import type { FavoriteTracklist } from "@utils/schemas/review";
import type { AlbumTracksItem } from "@utils/types/albumTracks";
import create from "zustand";

interface AppState {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  currentTracklist: AlbumTracksItem[];
  setCurrentTracklist: (value: AlbumTracksItem[]) => void;
  favoriteTracks: FavoriteTracklist[];
  setFavoriteTracks: (value: FavoriteTracklist[]) => void;
}

export const useStore = create<AppState>((set) => ({
  searchFilter: "album",
  setSearchFilter: (value: string) => set({ searchFilter: value }),
  favoriteTracks: [],
  setFavoriteTracks: (value: FavoriteTracklist[]) =>
    set({ favoriteTracks: value }),
  currentTracklist: [],
  setCurrentTracklist: (value: AlbumTracksItem[]) =>
    set({ currentTracklist: value }),
}));
