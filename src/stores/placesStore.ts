import { create } from 'zustand';
import { fetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { Place } from '../types/places';

interface PlacesStore {
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  fetchPlaces: () => Promise<void>;
}

export const usePlacesStore = create<PlacesStore>((set) => ({
  restaurants: [],
  places: null,
  loading: false,
  error: null,
  fetchPlaces: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchPlaces();
      set({ restaurants: data.results, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'error occurred', loading: false });
    }
  },
}));
