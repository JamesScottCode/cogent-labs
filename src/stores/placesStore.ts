import { create } from 'zustand';
import { safeFetchPlaces as apiFetchPlaces } from '../actions/placesApi';
import { Place } from '../types/places';
import { useLayoutStore } from './layoutStore';

interface CurrentSearch {
  query: string;
  radius: number;
  sort?: string;
}

interface PlacesStore {
  sort: string;
  setSort: (sort: string) => void;
  query: string;
  setQuery: (query: string) => void;
  limit: number;
  radius: number;
  setRadius: (radius: number) => void;
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  nextCursor: string | null;
  currentSearch?: CurrentSearch;
  getRandomRestaurant: () => Promise<Place | null>;
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
  sort: 'relevance',
  setSort: (sort: string) => set({ sort }),
  query: 'restaurant',
  setQuery: (query: string) => set({ query }),
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
  getRandomRestaurant: async () => {
    set({ loading: true, error: null });
    try {
      const { radius } = get();
      const { results } = await apiFetchPlaces(
        'restaurant',
        50,
        radius,
        undefined,
      );

      if (!results.length) {
        set({ loading: false });
        return null;
      }

      const random = results[Math.floor(Math.random() * results.length)];
      set({
        selectedRestaurant: random,
        loading: false,
      });
      return random;
    } catch (error: any) {
      set({ error: error.message || 'error occurred', loading: false });

      useLayoutStore.getState().openToast({
        message:
          error.message || 'Error occurred while fetching a random restaurant',
        visible: true,
        isError: true,
      });

      return null;
    }
  },
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
      // Determine if this is a continuation of the same search (pagination)
      const isSameSearch =
        currentSearch &&
        currentSearch.query === query &&
        currentSearch.radius === radius &&
        currentSearch.sort === sort;
      const shouldAppend = Boolean(cursor && isSameSearch);

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
      useLayoutStore.getState().openToast({
        message: error.message || 'Error occurred while fetching restaurants',
        visible: true,
        isError: true,
      });
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
