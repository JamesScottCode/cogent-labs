import { create } from 'zustand';
import { fetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { Place } from '../types/places';

interface CurrentSearch {
  query: string;
  radius: number;
  sort?: string;
}

interface PlacesStore {
  limit: number;
  radius: number;
  setRadius: (radius: number) => void;
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  nextCursor: string | null;
  currentSearch?: CurrentSearch;
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
  limit: 10,
  radius: 1000,
  setRadius: (radius: number) => set({ radius }),
  restaurants: [],
  loading: false,
  error: null,
  nextCursor: null,
  currentSearch: undefined,
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
      const { radius, restaurants, currentSearch } = get();
      const { results, nextCursor } = await apiFetchPlaces(
        query,
        limit,
        radius,
        cursor,
        sort,
      );
      console.log({ results });
      // Determine if this is a continuation of the same search (pagination)
      const isSameSearch =
        currentSearch &&
        currentSearch.query === query &&
        currentSearch.radius === radius &&
        currentSearch.sort === sort;
      const shouldAppend = Boolean(cursor && isSameSearch);
      console.log({ shouldAppend });

      if (shouldAppend) {
        set({
          restaurants: [...restaurants, ...results],
          loading: false,
          nextCursor,
          currentSearch: { query, radius, sort },
        });
      } else {
        set({
          restaurants: results,
          loading: false,
          nextCursor,
          currentSearch: { query, radius, sort },
        });
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
