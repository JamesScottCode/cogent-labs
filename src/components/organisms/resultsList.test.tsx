/* eslint-disable import/first */
jest.mock('../molecules/staticMap', () => {
  const React = require('react');
  const DummyStaticMap = (props: any) => (
    <div data-testid="dummy-static-map" {...props} />
  );
  return DummyStaticMap;
});

import { render, act } from '@testing-library/react';
import ResultsList from './resultsList';
import '@testing-library/jest-dom';

jest.useFakeTimers();

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

interface Restaurant {
  fsq_id: string;
  name: string;
  location: { address: string };
  photos: Array<{ url: string }>;
}

// dummy IntersectionObserver for simulating intersections.
class IntersectionObserverMock {
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => void;
  elements: Element[] = [];
  constructor(callback: any, options?: any) {
    this.callback = callback;
  }
  observe(element: Element) {
    this.elements.push(element);
  }
  unobserve(element: Element) {
    this.elements = this.elements.filter((el) => el !== element);
  }
  disconnect() {
    this.elements = [];
  }
  // helper to manually trigger the callback.
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

// overide the global IntersectionObserver.
(global as any).IntersectionObserver = IntersectionObserverMock;

const mockFetchPlaces = jest.fn();
const mockUsePlacesStore: {
  radius: number;
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  selectedRestaurant: Restaurant | null;
  nextCursor: string | null;
  fetchPlaces: typeof mockFetchPlaces;
  limit: number;
} = {
  radius: 100,
  restaurants: [] as Restaurant[],
  loading: false,
  error: null,
  selectedRestaurant: null,
  nextCursor: 'test_next_cursor',
  fetchPlaces: mockFetchPlaces,
  limit: 10,
};

jest.mock('../../stores/placesStore', () => ({
  usePlacesStore: () => mockUsePlacesStore,
}));

jest.mock('../../contexts/screenSizeContext', () => ({
  useScreenSize: () => ({ screenSize: 'desktop' }),
}));

jest.mock('../../utils/geo', () => ({
  createLL: (lat: number, lng: number) => `${lat},${lng}`,
}));

describe('ResultsList component', () => {
  let observerInstance: IntersectionObserverMock | null = null;

  // fix Date.now for rate-limiter tests.
  const baseTime = 1000000;
  let currentTime = baseTime;
  const originalDateNow = Date.now;
  beforeAll(() => {
    Date.now = () => currentTime;
  });
  afterAll(() => {
    Date.now = originalDateNow;
  });

  beforeEach(() => {
    mockFetchPlaces.mockClear();
    // for infinite scrolling tests, prepopulate restaurants so the on-mount fetch does not run.
    mockUsePlacesStore.restaurants = [
      {
        fsq_id: '1',
        name: 'Test Restaurant',
        location: { address: 'Test Address' },
        photos: [{ url: 'dummy-url' }],
      },
    ];
    mockUsePlacesStore.nextCursor = 'test_next_cursor';
    mockUsePlacesStore.loading = false;
    mockUsePlacesStore.error = null;
    mockUsePlacesStore.selectedRestaurant = null;
    currentTime = baseTime; // reset currentTime before each test

    // override IntersectionObserver to capture its instance.
    observerInstance = null;
    (global as any).IntersectionObserver = class extends (
      IntersectionObserverMock
    ) {
      constructor(callback: any, options?: any) {
        super(callback, options);
        observerInstance = this;
      }
    };
  });

  test('fetches places on mount if restaurants is empty', () => {
    mockUsePlacesStore.restaurants = [];
    render(<ResultsList />);
    expect(mockFetchPlaces).toHaveBeenCalledWith('restaurant');
  });

  test('does not fetch places on mount if restaurants are present', () => {
    render(<ResultsList />);
    expect(mockFetchPlaces).not.toHaveBeenCalled();
  });

  test('scrolls selected restaurant into view when selectedRestaurant is set', () => {
    const testRestaurant: Restaurant = {
      fsq_id: 'selected_id',
      name: 'Selected Restaurant',
      location: { address: 'Some Address' },
      photos: [{ url: 'dummy-url' }],
    };
    mockUsePlacesStore.selectedRestaurant = testRestaurant;

    const dummyEl = document.createElement('div');
    dummyEl.id = 'selected_id';
    dummyEl.scrollIntoView = jest.fn();
    document.body.appendChild(dummyEl);

    render(<ResultsList />);
    // give time for useEffect to run.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {});
    expect(dummyEl.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(dummyEl);
  });

  test('placeholder for scrolling to top when search parameters change', () => {
    expect(true).toBe(true);
  });

  describe('Infinite scrolling with rate limiting', () => {
    test('triggers fetchPlaces immediately if delay has passed', () => {
      render(<ResultsList />);
      // sim a sentinel intersection after 3000ms (delay is 2000ms).
      act(() => {
        currentTime = baseTime + 3000;
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      expect(mockFetchPlaces).toHaveBeenCalledWith(
        'restaurant',
        10,
        'test_next_cursor',
      );
    });

    test('schedules fetchPlaces when delay has not passed and triggers after timeout', () => {
      render(<ResultsList />);
      // trigger first intersection; this should call fetchPlaces immediately
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      expect(mockFetchPlaces).toHaveBeenCalledTimes(1);

      // immediately trigger a second intersection before the delay has passed
      act(() => {
        // currentTime remains at baseTime; so timeSinceLastFetch is small
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      expect(mockFetchPlaces).toHaveBeenCalledTimes(1);

      // inc time by the remaining 2000ms
      act(() => {
        currentTime += 2000;
        jest.advanceTimersByTime(2000);
      });
      // The scheduled fetch should now fire, so total calls become 2.
      expect(mockFetchPlaces).toHaveBeenCalledTimes(2);
    });

    test('cancels scheduled fetch if the sentinel goes out of view', () => {
      render(<ResultsList />);
      // Trigger first intersection to set lastFetchTime.
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      expect(mockFetchPlaces).toHaveBeenCalledTimes(1);

      // immediately trigger a second intersection to schedule a fetch.
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      // now simulate the sentinel leaving view to cancel the scheduled fetch.
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: false } as IntersectionObserverEntry,
        ]);
      });
      // inc time by 2000ms
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(mockFetchPlaces).toHaveBeenCalledTimes(1);
    });

    test('does not trigger fetchPlaces if nextCursor is null', () => {
      // set nextCursor to null.
      mockUsePlacesStore.nextCursor = null;
      render(<ResultsList />);
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      // with no nextCursor, expect no new fetch (0 calls).
      expect(mockFetchPlaces).not.toHaveBeenCalled();
    });

    test('does not trigger fetchPlaces if loading is true', () => {
      // set loading to true.
      mockUsePlacesStore.loading = true;
      render(<ResultsList />);
      act(() => {
        observerInstance?.trigger([
          { isIntersecting: true } as IntersectionObserverEntry,
        ]);
      });
      expect(mockFetchPlaces).not.toHaveBeenCalled();
    });
  });
});
