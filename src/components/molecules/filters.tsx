import { FC } from 'react';
import styled from 'styled-components';
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import Slider from '../atoms/slider';
import Search from '../atoms/search';
import SortOptions from '../atoms/sort';
import ThemedButton from '../atoms/button';
import { useLayoutStore } from '../../stores/layoutStore';
import ItemDetails from '../organisms/itemDetails';

const Container = styled.div<{ $screenSize: ScreenSize }>`
  display: flex;
  flex-direction: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? 'column' : 'row'};
  justify-content: space-evenly;
  height: ${({ $screenSize }) =>
    $screenSize === 'mobile' || $screenSize === 'tablet' ? '200px' : 'auto'};
  width: ${({ $screenSize }) =>
    $screenSize === 'mobile'
      ? '300px'
      : $screenSize === 'tablet'
        ? '400px'
        : 'auto'};
`;

const Filters: FC = () => {
  const { getRandomRestaurant, fetchPlaces, currentSearch, setCurrentSearch } =
    usePlacesStore();
  const { radius, query } = currentSearch;
  const { openModal } = useLayoutStore();
  const { screenSize } = useScreenSize();

  const handleSubmit = () => {
    fetchPlaces();
  };

  const onSliderFinished = () => {
    fetchPlaces();
  };

  const handleGetRandomRestaurant = async () => {
    const restaurant = await getRandomRestaurant();
    if (restaurant) {
      openModal(<ItemDetails />);
    }
  };

  return (
    <Container $screenSize={screenSize}>
      <Search
        value={query}
        onChange={(e) => {
          setCurrentSearch({ query: e.target.value });
        }}
        onSubmit={handleSubmit}
        placeholder="Search..."
      />
      <SortOptions />
      <ThemedButton onClick={handleGetRandomRestaurant} text="Random" />
      <Slider
        value={radius}
        onChange={(e) => setCurrentSearch({ radius: e })}
        onFinished={onSliderFinished}
      />
    </Container>
  );
};

export default Filters;
