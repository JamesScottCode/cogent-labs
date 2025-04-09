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
  selectedRestaurant: Place | null;
  setSelectedRestaurant: (id: string | null) => Promise<void>;
}

export const usePlacesStore = create<PlacesStore>((set, get) => ({
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
  selectedRestaurant: null,
  setSelectedRestaurant: async (id: string | null) => {
    const { restaurants } = get();
    const selectedRestaurant =
      restaurants.find((restaurant: Place) => restaurant.fsq_id === id) || null;
    set({ selectedRestaurant });
  },
  setHoveredRestaurantId: (hoveredRestaurantId: string) =>
    set({ hoveredRestaurantId }),
}));
