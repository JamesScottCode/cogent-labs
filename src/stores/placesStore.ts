import { create } from 'zustand';
import { fetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { FoursquarePlacesResponse } from '../types/places';

interface PlacesStore {
  places: FoursquarePlacesResponse | null;
  loading: boolean;
  error: string | null;
  fetchPlaces: () => Promise<void>;
}

export const usePlacesStore = create<PlacesStore>((set) => ({
  places: null,
  loading: false,
  error: null,
  fetchPlaces: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchPlaces();
      set({ places: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'error occurred', loading: false });
    }
  },
}));
