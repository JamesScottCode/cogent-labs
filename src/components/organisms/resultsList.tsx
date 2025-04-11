import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useScreenSize, ScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import ResultListItem from '../molecules/resultListItem';
import { createLL } from '../../utils/geo';
import { defaultCoordinates } from '../../consts/map';
import Spinner from '../atoms/spinner';
import { Place } from '../../types/places';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useDelayedToggle } from '../../hooks/useDelayedToggle';

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
  const query = 'restaurant'; // TODO: hardcoded for now.
  const ll = createLL(latitude, longitude);

  // memoize search parameters for efficient change detection.
  const searchParams = useMemo(
    () => ({ query, ll, radius }),
    [query, ll, radius],
  );
  const prevSearchParams = useRef(searchParams);
  const containerRef = useRef<HTMLDivElement>(null);

  const infiniteScrollEnabled = useDelayedToggle(false, 2000);

  useEffect(() => {
    if (restaurants.length === 0) {
      fetchPlaces(query);
    }
  }, [fetchPlaces, query, restaurants.length]);

  // scroll container to top when search parameters change.
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

  // scroll the corresponding list item into view when a map marker is selected.
  useEffect(() => {
    if (selectedRestaurantId) {
      const element = document.getElementById(selectedRestaurantId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedRestaurantId]);

  // use the custom infinite scroll hook.
  // when the sentinel is intersecting, it triggers the callback (fetchPlaces).
  const sentinelRef = useInfiniteScroll(
    () => {
      // ensure there is a next page and we're not already loading.
      if (nextCursor && !loading) {
        fetchPlaces(query, limit, nextCursor);
      }
    },
    infiniteScrollEnabled,
    { delay: 2000, threshold: 0.1 },
  );

  if (restaurants.length <= 0) return <></>; // TODO: Add a skeleton.

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
      {/* TODO: Add a skeleton for when no restaurants error */}
      {error && <div>Error loading restaurants: {error}</div>}
      <Sentinel ref={sentinelRef} data-testid="sentinel" />
    </Container>
  );
};

export default ResultsList;
