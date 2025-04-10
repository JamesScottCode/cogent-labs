import { FC, useState } from 'react';
import styled from 'styled-components';
import { ScreenSize, useScreenSize } from '../../contexts/screenSizeContext';
import { usePlacesStore } from '../../stores/placesStore';
import Slider from '../atoms/slider';
import Search from '../atoms/search';
import SortOptions from '../atoms/sort';
import ThemedButton from '../atoms/button';
import { useModalStore } from '../../stores/layoutStore';
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

// TODO(BUG): If at end of a list, then sort, fetches new list, but will be at bottom of scroll, so lots of loads
const Filters: FC = () => {
  const { getRandomRestaurant, sort, radius, setRadius, limit, fetchPlaces } =
    usePlacesStore();
  const { openModal } = useModalStore();
  const [searchText, setSearchText] = useState('');
  const { screenSize } = useScreenSize();

  const handleSubmit = () => {
    const query = searchText ?? 'restaurant';
    fetchPlaces(query, limit, undefined, sort);
  };

  const onSliderFinished = () => {
    const query = searchText ?? 'restaurant';
    fetchPlaces(query, limit);
  };

  const handleGetRandomRestaurant = async () => {
    console.log('handleGetRandomRestaurant');
    const restaurant = await getRandomRestaurant();
    if (restaurant) {
      openModal(<ItemDetails />);
    }
  };

  return (
    <Container $screenSize={screenSize}>
      <Search
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onSubmit={handleSubmit}
        placeholder="Search..."
      />
      <SortOptions />
      <ThemedButton onClick={handleGetRandomRestaurant} text="Random" />
      <Slider
        value={radius}
        onChange={setRadius}
        onFinished={onSliderFinished}
      />
    </Container>
  );
};

export default Filters;
