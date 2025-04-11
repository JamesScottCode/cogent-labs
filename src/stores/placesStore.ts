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
  currentSearch: CurrentSearch;
  setCurrentSearch: (params: Partial<CurrentSearch>) => void;
  limit: number;
  restaurants: Place[];
  loading: boolean;
  error: string | null;
  nextCursor: string | null;
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
  currentSearch: {
    query: 'restaurant',
    radius: 1000,
    sort: 'relevance',
  },
  setCurrentSearch: (params) =>
    set((state) => ({
      currentSearch: {
        ...state.currentSearch,
        ...params,
      },
    })),
  limit: 10,
  restaurants: [],
  loading: false,
  error: null,
  nextCursor: null,
  hoveredRestaurantId: '',
  selectedRestaurant: null,

  getRandomRestaurant: async () => {
    set({ loading: true, error: null });
    try {
      const { currentSearch } = get();
      const { results } = await apiFetchPlaces(
        currentSearch.query,
        50,
        currentSearch.radius,
        undefined,
        currentSearch.sort,
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

  fetchPlaces: async (cursor?: string) => {
    set({ loading: true, error: null });
    try {
      const { currentSearch, restaurants, limit } = get();
      const { query, radius, sort } = currentSearch;

      const { results, nextCursor } = await apiFetchPlaces(
        query,
        limit,
        radius,
        cursor,
        sort,
      );

      const isSameSearch = cursor != null; // if cursor exists, this is pagination
      const shouldAppend = Boolean(cursor && isSameSearch);

      set({
        restaurants: shouldAppend ? [...restaurants, ...results] : results,
        loading: false,
        nextCursor,
      });
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
