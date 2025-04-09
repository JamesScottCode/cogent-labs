import { create } from 'zustand';
import { fetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { Place } from '../types/places';

interface PlacesStore {
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  fetchPlaces: () => Promise<void>;
  hoveredRestaurantId: string;
  setHoveredRestaurantId: (hoveredRestaurantId: string) => void;
}

export const usePlacesStore = create<PlacesStore>((set) => ({
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
  hoveredRestaurantId: '',
  loading: false,
  restaurants: [],
  setHoveredRestaurantId: (hoveredRestaurantId: string) =>
    set({ hoveredRestaurantId }),
}));
