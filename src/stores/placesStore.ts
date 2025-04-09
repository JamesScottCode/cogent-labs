import { create } from 'zustand';
import { fetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { Place } from '../types/places';

interface PlacesStore {
  radius: number;
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  nextCursor: string | null;
  fetchPlaces: (
    query?: string,
    limit?: number,
    cursor?: string,
    sort?: string,
  ) => Promise<void>;
  hoveredRestaurantId: string;
  setHoveredRestaurantId: (hoveredRestaurantId: string) => void;
  selectedRestaurant: Place | null;
  setSelectedRestaurant: (id: string | null) => Promise<void>;
}

export const usePlacesStore = create<PlacesStore>((set, get) => ({
  radius: 1000,
  restaurants: [],
  loading: false,
  error: null,
  nextCursor: null,
  hoveredRestaurantId: '',
  selectedRestaurant: null,
  fetchPlaces: async (
    query = 'restaurant', // Default query if none is provided
    limit = 10,
    cursor,
    sort,
  ) => {
    set({ loading: true, error: null });
    try {
      const { radius, restaurants } = get();
      const { results, nextCursor } = await apiFetchPlaces(
        query,
        limit,
        radius,
        cursor,
        sort,
      );
      console.log({ results });
      if (cursor) {
        set({
          restaurants: [...restaurants, ...results],
          loading: false,
          nextCursor,
        });
      } else {
        set({ restaurants: results, loading: false, nextCursor });
      }
    } catch (error: any) {
      set({ error: error.message || 'error occurred', loading: false });
    }
  },
  setSelectedRestaurant: async (id: string | null) => {
    const { restaurants } = get();
    const selectedRestaurant =
      restaurants.find((restaurant: Place) => restaurant.fsq_id === id) || null;
    set({ selectedRestaurant });
  },
  setHoveredRestaurantId: (hoveredRestaurantId: string) =>
    set({ hoveredRestaurantId }),
}));
