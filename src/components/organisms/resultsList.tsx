import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useScreenSize, ScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import ResultListItem from '../molecules/resultListItem';
import { createLL } from '../../utils/geo';
import { defaultCoordinates } from '../../consts/map';
import Spinner from '../atoms/spinner';

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

  // TODO: Remove hardcoded items here
  const query = ''; // TODO: Implement query with search text and/or category select
  const ll = createLL(latitude, longitude); // TODO: Make a movable marker for locations... for now just leave at cogent labs coords

  // Memoize search parameters for change detection.
  const searchParams = useMemo(
    () => ({ query, ll, radius }),
    [query, ll, radius],
  );
  const prevSearchParams = useRef(searchParams);

  const containerRef = useRef<HTMLDivElement>(null);

  // on mount, fetch initial results if empty.
  useEffect(() => {
    if (restaurants.length === 0) {
      fetchPlaces(query);
    }
  }, [fetchPlaces, query, restaurants.length]);

  // when search parameters change, scroll the container to the top.
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !loading) {
          fetchPlaces(query, limit, nextCursor);
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
    };
  }, [nextCursor, loading, fetchPlaces, query, limit]);

  return (
    <Container ref={containerRef}>
      <ItemsContainer $screenSize={screenSize}>
        {restaurants.map((restaurant) => (
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
