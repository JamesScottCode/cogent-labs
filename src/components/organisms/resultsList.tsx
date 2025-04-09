import React from 'react';
import styled from 'styled-components';
import { useScreenSize, ScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import ResultListItem from '../molecules/resultListItem';

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

const ResultsList: React.FC = () => {
  const { screenSize } = useScreenSize();
  const { restaurants, loading, error } = usePlacesStore();
  return (
    <Container>
      <ItemsContainer $screenSize={screenSize}>
        {restaurants.map((restaurant) => (
          <ResultListItem
            data={restaurant}
            id={restaurant.fsq_id}
            key={restaurant.fsq_id}
          />
        ))}
      </ItemsContainer>
      {loading && <div>TODO: Loader</div>}
      {error && <div>Error loading restaurants: {error}</div>}
    </Container>
  );
};

export default ResultsList;
