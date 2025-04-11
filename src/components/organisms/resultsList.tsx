import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useScreenSize, ScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import ResultListItem from '../molecules/resultListItem';
import { createLL } from '../../utils/geo';
import { defaultCoordinates } from '../../consts/map';
import Spinner from '../atoms/spinner';
import { Place } from '../../types/places';

const { latitude, longitude } = defaultCoordinates;

const Container = styled.div`
  border-radius: 8px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  width: 100%;
`;

const itemsContainerColumnNum = ($screenSize = 'desktop') =>
  $screenSize === 'mobile'
    ? '1fr'
    : $screenSize === 'desktop'
      ? 'repeat(2, 1fr)'
      : $screenSize === 'desktop2k'
        ? 'repeat(3, 1fr)'
        : $screenSize === 'desktop4k'
          ? 'repeat(4, 1fr)'
          : 'repeat(2, 1fr)';

const ItemsContainer = styled.div<{ $screenSize: ScreenSize }>`
  display: grid;
  gap: 1rem;
  grid-template-columns: ${({ $screenSize }) =>
    itemsContainerColumnNum($screenSize)};
`;

// Sentinel element for triggering next page load.
const Sentinel = styled.div`
  height: 1px;
`;

const ResultsList: React.FC = () => {
  const { screenSize } = useScreenSize();
  const {
    radius,
    restaurants,
    loading,
    error,
    selectedRestaurant,
    nextCursor,
    fetchPlaces,
    limit,
  } = usePlacesStore();

  const selectedRestaurantId = selectedRestaurant?.fsq_id;
  const query = 'restaurant'; //TODO:  hardcoded for now
  const ll = createLL(latitude, longitude);

  // memoize search parameters for change detection.
  const searchParams = useMemo(
    () => ({ query, ll, radius }),
    [query, ll, radius],
  );
  const prevSearchParams = useRef(searchParams);

  const containerRef = useRef<HTMLDivElement>(null);

  // for rate limiting the fetch in infinite scrolling:
  const lastFetchTimeRef = useRef(0);
  // for scheduling a pending fetch when delay hasn't passed yet.
  const scheduledTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // on mount, fetch initial results if empty.
  useEffect(() => {
    if (restaurants.length === 0) {
      fetchPlaces(query);
    }
  }, [fetchPlaces, query, restaurants.length]);

  // When search parameters change, scroll the container to the top.
  useEffect(() => {
    if (
      prevSearchParams.current.query !== searchParams.query ||
      prevSearchParams.current.ll !== searchParams.ll ||
      prevSearchParams.current.radius !== searchParams.radius
    ) {
      containerRef.current?.scrollTo(0, 0);
    }
    prevSearchParams.current = searchParams;
  }, [searchParams]);

  // when a map marker is clicked, scroll the corresponding list item into view.
  useEffect(() => {
    if (selectedRestaurantId) {
      const element = document.getElementById(selectedRestaurantId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedRestaurantId]);

  // intersection observer to load more results when scrolling.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const delay = 2000; // set delay to 2 seconds
    const observer = new IntersectionObserver(
      (entries) => {
        // if there is no next page or we're loading, don't do anything.
        if (!nextCursor || loading) return;

        const entry = entries[0];
        if (entry.isIntersecting) {
          const now = Date.now();
          const timeSinceLastFetch = now - lastFetchTimeRef.current;
          if (timeSinceLastFetch >= delay) {
            // enough time has passed: clear any pending timeout and fetch immediately.
            if (scheduledTimeoutRef.current) {
              clearTimeout(scheduledTimeoutRef.current);
              scheduledTimeoutRef.current = null;
            }
            lastFetchTimeRef.current = now;
            fetchPlaces(query, limit, nextCursor);
          } else {
            // not enough time has passed: schedule a fetch for when the delay is over.
            if (!scheduledTimeoutRef.current) {
              scheduledTimeoutRef.current = setTimeout(() => {
                // double-check that the sentinel is still intersecting before fetching.
                lastFetchTimeRef.current = Date.now();
                fetchPlaces(query, limit, nextCursor);
                scheduledTimeoutRef.current = null;
              }, delay - timeSinceLastFetch);
            }
          }
        } else {
          // sentinel is not in view, so cancel any scheduled fetch.
          if (scheduledTimeoutRef.current) {
            clearTimeout(scheduledTimeoutRef.current);
            scheduledTimeoutRef.current = null;
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current);
      }
      // cleanup any pending timeout on unmount.
      if (scheduledTimeoutRef.current) {
        clearTimeout(scheduledTimeoutRef.current);
      }
    };
  }, [nextCursor, loading, fetchPlaces, query, limit]);

  if (restaurants?.length <= 0) return <></>; // TODO: Add some kind of placeholder for no restaurants.

  return (
    <Container ref={containerRef}>
      <ItemsContainer $screenSize={screenSize}>
        {restaurants.map((restaurant: Place) => (
          <ResultListItem
            data={restaurant}
            id={restaurant.fsq_id}
            key={restaurant.fsq_id}
          />
        ))}
      </ItemsContainer>
      {loading && <Spinner />}
      {error && <div>Error loading restaurants: {error}</div>}
      <Sentinel ref={sentinelRef} data-testid="sentinel" />
    </Container>
  );
};

export default ResultsList;
